export enum MapCellState {
    Light = '0',
    Dark = '1',
    Land = '#',
    Sand = '=',
    Water = '.',
    Tree = '@'
}

interface Neighbors {
    north: MapCell | null;
    south: MapCell | null;
    east: MapCell | null;
    west: MapCell | null;
    northeast: MapCell | null;
    southeast: MapCell | null;
    northwest: MapCell | null;
    southwest: MapCell | null;
}

interface StateChangeEvent {
    cell: MapCell;
    newState: MapCellState;
}

const pendingEvents: StateChangeEvent[] = [];

export class MapCell {
    state: MapCellState;
    neighbors: Neighbors;

    constructor (initialState: MapCellState) {
        this.state = initialState;
        this.neighbors = {
            north: null,
            south: null,
            east: null,
            west: null,
            northeast: null,
            southeast: null,
            northwest: null,
            southwest: null
        };
    }

    setState = (newState: MapCellState): void => {
        if (this.state === newState) {
            return;
        }

        this.state = newState;
        pendingEvents.push({ cell: this, newState });
    }

    setNorth = (cell: MapCell): void => {
        this.neighbors.north = cell;
    }

    setEast = (cell: MapCell): void => {
        this.neighbors.east = cell;
    }

    setSouth = (cell: MapCell): void => {
        this.neighbors.south = cell;
    }

    setWest = (cell: MapCell): void => {
        this.neighbors.west = cell;
    }

    setNortheast = (cell: MapCell): void => {
        this.neighbors.northeast = cell;
    }

    setSoutheast = (cell: MapCell): void => {
        this.neighbors.southeast = cell;
    }

    setNorthwest = (cell: MapCell): void => {
        this.neighbors.northwest = cell;
    }

    setSouthwest = (cell: MapCell): void => {
        this.neighbors.southwest = cell;
    }

    notifyNeighborsOfLandStateChange = () => {
        let actualNeighbors = this.getNeighbors([MapCellState.Dark, MapCellState.Light]);
        actualNeighbors.forEach((neighbor) => {
            if (neighbor.state !== MapCellState.Land) {
                neighbor.consumeLandStateChangeEvent();
            }
        });
    }

    notifyNeighborsOfSandStateChange = () => {
        let actualNeighbors = this.getNeighbors([MapCellState.Land]);
        actualNeighbors.forEach((neighbor) => {
            if (neighbor.state !== MapCellState.Sand && neighbor.state !== MapCellState.Water) {
                neighbor.consumeSandStateChangeEvent();
            }
        });
    }

    notifyNeighborsOfWaterStateChange = () => {
        let actualNeighbors = this.getNeighbors([MapCellState.Dark, MapCellState.Light]);
        actualNeighbors.forEach((neighbor) => {
            if (neighbor.state !== MapCellState.Land && neighbor.state !== MapCellState.Water) {
                neighbor.consumeWaterStateChangeEvent();
            }
        });
    }

    consumeLandStateChangeEvent = () => {
        if (this.state !== MapCellState.Land) {
            let matchingNeighbors = this.getNeighbors([MapCellState.Land, MapCellState.Dark]);

            if (matchingNeighbors.length >= 5) {
                this.setState(MapCellState.Land);
            }
        }
    }

    consumeSandStateChangeEvent = () => {
        if (this.state === MapCellState.Land) {
            let actualNeighbors = this.getNeighbors([MapCellState.Sand]);

            if (actualNeighbors.length >= 5) {
                this.setState(MapCellState.Sand);
            }
        }
    }

    consumeWaterStateChangeEvent = () => {
        if (this.state !== MapCellState.Land) {
            this.setState(MapCellState.Water);
        }
    }

    getNeighbors = (states: MapCellState[]): MapCell[] => {
        let actualNeighbors = [];

        if (this.neighbors.north !== null && states.indexOf(this.neighbors.north.state) > -1) {
            actualNeighbors.push(this.neighbors.north); 
        }

        if (this.neighbors.east !== null && states.indexOf(this.neighbors.east.state) > -1) {
            actualNeighbors.push(this.neighbors.east);
        }

        if (this.neighbors.south !== null && states.indexOf(this.neighbors.south.state) > -1) {
            actualNeighbors.push(this.neighbors.south);
        }

        if (this.neighbors.west !== null && states.indexOf(this.neighbors.west.state) >-1) {
            actualNeighbors.push(this.neighbors.west);
        }

        if (this.neighbors.northeast !== null && states.indexOf(this.neighbors.northeast.state) > -1) {
            actualNeighbors.push(this.neighbors.northeast);
        }

        if (this.neighbors.southeast !== null && states.indexOf(this.neighbors.southeast.state) > -1) {
            actualNeighbors.push(this.neighbors.southeast);
        }

        if (this.neighbors.northwest !== null && states.indexOf(this.neighbors.northwest.state) > -1) {
            actualNeighbors.push(this.neighbors.northwest);
        }

        if (this.neighbors.southwest !== null && states.indexOf(this.neighbors.southwest.state) > -1) {
            actualNeighbors.push(this.neighbors.southwest);
        }

        return actualNeighbors;
    }
}

export const processPendingEvents = (): void => {
    // Index-based so events added while processing are picked up without shift() copies
    for (let i = 0; i < pendingEvents.length; i++) {
        const { cell, newState } = pendingEvents[i];

        if (newState === MapCellState.Land) {
            cell.notifyNeighborsOfLandStateChange();
        } else if (newState === MapCellState.Sand) {
            cell.notifyNeighborsOfSandStateChange();
        } else if (newState === MapCellState.Water) {
            cell.notifyNeighborsOfWaterStateChange();
        }
    }

    pendingEvents.length = 0;
}

export const connectNeighbors =(initialMap: MapCell[][]): void => {
    for (let y = 0; y < initialMap.length; y++) {
        for (let x = 0; x < initialMap[y].length; x++) {
            if (y > 0) {
                initialMap[y][x].setNorth(initialMap[y - 1][x]);
            }

            if (y < initialMap.length - 1) {
                initialMap[y][x].setSouth(initialMap[y + 1][x]);
            }

            if (x > 0) {
                initialMap[y][x].setWest(initialMap[y][x - 1]);
            }

            if (x < initialMap[y].length - 1) {
                initialMap[y][x].setEast(initialMap[y][x + 1]);
            }

            if (y > 0 && x > 0) {
                initialMap[y][x].setNorthwest(initialMap[y - 1][x - 1]);
            }

            if (y > 0 && x < initialMap[y].length - 1) {
                initialMap[y][x].setNortheast(initialMap[y - 1][x + 1]);
            }

            if (y < initialMap.length - 1 && x > 0) {
                initialMap[y][x].setSouthwest(initialMap[y + 1][x - 1]);
            }

            if (y < initialMap.length - 1 && x < initialMap[y].length - 1) {
                initialMap[y][x].setSoutheast(initialMap[y + 1][x + 1]);
            }
        }
    }
}

export const printMap = (initialMap: MapCell[][]): void => {
    for (let y = 0; y < initialMap.length; y++) {
        console.log(initialMap[y].map((cell) => cell.state).join(''));
    }
}

export const getCenterCell = (initialMap: MapCell[][]): MapCell => {
    let xPosition = Math.floor(initialMap[0].length / 2);
    let yPosition = Math.floor(initialMap.length / 2);

    return initialMap[yPosition][xPosition];
}

export const fillInWaterOnCoastline = (initialMap: MapCell[][]): void => {
    for (let i = 0; i < initialMap[0].length; i++) {
        const topRowCell = initialMap[0][i];
        const bottomRowCell = initialMap[initialMap.length - 1][i];

        if ((topRowCell.state !== MapCellState.Land) && (topRowCell.state !== MapCellState.Water)) {
            topRowCell.setState(MapCellState.Water);
        }

        if ((bottomRowCell.state !== MapCellState.Land) && (bottomRowCell.state !== MapCellState.Water)) {
            bottomRowCell.setState(MapCellState.Water);
        }
    }

    for (let i = 0; i < initialMap.length; i++) {
        const leftColumnCell = initialMap[i][0];
        const rightColumnCell = initialMap[i][initialMap[i].length - 1];

        if ((leftColumnCell.state !== MapCellState.Land) && (leftColumnCell.state !== MapCellState.Water)) {
            leftColumnCell.setState(MapCellState.Water);
        }

        if ((rightColumnCell.state !== MapCellState.Land) && (rightColumnCell.state !== MapCellState.Water)) {
            rightColumnCell.setState(MapCellState.Water);
        }
    }

    processPendingEvents();

    // Inner lakes enclosed by land are never reached by the flood from the edges, but still count as water
    for (let row = 0; row < initialMap.length; row++) {
        for (let col = 0; col < initialMap[row].length; col++) {
            const cell = initialMap[row][col];

            if (cell.state === MapCellState.Light || cell.state === MapCellState.Dark) {
                cell.state = MapCellState.Water;
            }
        }
    }
}

export const fillInSandOnCoastline = (initialMap: MapCell[][]): void => {
    const coastline: MapCell[] = [];

    for (let row = 0; row < initialMap.length; row++) {
        for (let col = 0; col < initialMap[row].length; col++) {
            const cell = initialMap[row][col];
            // Land on a border is treated as touching the water beyond the map edge
            const onBorder = (row === 0) || (row === initialMap.length - 1) || (col === 0) || (col === initialMap[row].length - 1);

            if (cell.state === MapCellState.Land && (onBorder || cell.getNeighbors([MapCellState.Water]).length > 0)) {
                coastline.push(cell);
            }
        }
    }

    coastline.forEach((cell) => {
        cell.setState(MapCellState.Sand);
    });

    processPendingEvents();
}

export const fillInitialTrees = (initialMap: MapCell[][]): void => {
    const trees: MapCell[] = [];

    for (let row = 2; row < initialMap.length - 2; row++) {
        for (let col = 2; col < initialMap[row].length - 2; col++) {
            const cell = initialMap[row][col];

            // Get a 5x5 area around the current cell.  
            const surroundingArea: MapCell[][] = [];

            for (let areaRow = row - 2; areaRow <= row + 2; areaRow++) {
                surroundingArea.push(initialMap[areaRow].slice(col - 2, col + 3));
            }

            // Determine if the cell should be a tree
            let possibleTree = true;

            surroundingArea.forEach((cellRow, index) => {
                if (possibleTree) {
                    let cellsToEvaluate: MapCell[] = [];

                    if (index === 0 || index === 4) {
                        // Don't care about first and last cells in this row
                        cellsToEvaluate.push(...cellRow.slice(1, -1));
                    } else {
                        cellsToEvaluate.push(...cellRow);
                    }

                    cellsToEvaluate.forEach((neighbor) => {
                        if (neighbor.state !== MapCellState.Land && neighbor.state !== MapCellState.Tree) {
                            possibleTree = false;
                        }
                    });
                }
            });

            if (possibleTree) {
                trees.push(cell);
            }
        }
    }

    trees.forEach((cell) => {
        cell.setState(MapCellState.Tree);
    });
}

export const growTheForest = (initialMap: MapCell[][]): void => {
    const newTrees: MapCell[] = [];

    for (let row = 0; row < initialMap.length; row++) {
        for (let col = 0; col < initialMap[row].length; col++) {
            const cell = initialMap[row][col];

            const sandNeighbors = cell.getNeighbors([MapCellState.Sand]);
            const treeNeighbors = cell.getNeighbors([MapCellState.Tree]);

            if (sandNeighbors.length === 0 && treeNeighbors.length >= 4) {
                newTrees.push(cell);
            }
        }
    }

    newTrees.forEach((cell) => {
        cell.setState(MapCellState.Tree);
    });
}