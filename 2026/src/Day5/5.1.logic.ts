export enum MapCellState {
    Light = '0',
    Dark = '1',
    Land = '#'
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
        this.state = newState;
        this.notifyNeighborsOfStateChange();
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

    notifyNeighborsOfStateChange = () => {
        let actualNeighbors = this.getNeighbors();
        actualNeighbors.forEach((neighbor) => {
            neighbor.consumeStateChangeEvent();
        });
    }

    consumeStateChangeEvent = () => {
        if (this.state !== MapCellState.Land) {
            let actualNeighbors = this.getNeighbors();

            if (actualNeighbors.length >= 5) {
                let countOfLandOrDarkNeighbors = 0;

                actualNeighbors.forEach((neighbor) => {
                    if (neighbor.state === MapCellState.Land || neighbor.state === MapCellState.Dark) {
                        countOfLandOrDarkNeighbors += 1;
                    }
                });

                if (countOfLandOrDarkNeighbors >= 5) {
                    this.setState(MapCellState.Land);
                }
            }
        }
    }

    getNeighbors = (): MapCell[] => {
        let actualNeighbors = [];

        if (this.neighbors.north !== null) {
            actualNeighbors.push(this.neighbors.north);
        }

        if (this.neighbors.east !== null) {
            actualNeighbors.push(this.neighbors.east);
        }

        if (this.neighbors.south !== null) {
            actualNeighbors.push(this.neighbors.south);
        }

        if (this.neighbors.west !== null) {
            actualNeighbors.push(this.neighbors.west);
        }

        if (this.neighbors.northeast !== null) {
            actualNeighbors.push(this.neighbors.northeast);
        }

        if (this.neighbors.southeast !== null) {
            actualNeighbors.push(this.neighbors.southeast);
        }

        if (this.neighbors.northwest !== null) {
            actualNeighbors.push(this.neighbors.northwest);
        }

        if (this.neighbors.southwest !== null) {
            actualNeighbors.push(this.neighbors.southwest);
        }

        return actualNeighbors;
    }
}

export const connectNeighbors = (initialMap: MapCell[][]): void => {
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
    let xPosition = ((initialMap[0].length - 1) / 2) + 1;
    let yPosition = ((initialMap.length - 1) / 2) + 1;

    console.log(`Center point is ${xPosition},${yPosition}`);
    return initialMap[yPosition][xPosition];
}