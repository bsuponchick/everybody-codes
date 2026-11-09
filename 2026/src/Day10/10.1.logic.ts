export enum TileType {
    Wall = '#',
    Empty = '.'
}

export enum Direction {
    north = '^',
    south = 'v',
    east = '>',
    west = '<'
}

export class Tile {
    north: Tile;
    south: Tile;
    east: Tile;
    west: Tile;
    type: TileType;
    ghosts: Nullghost[];

    constructor(type: TileType) {
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;

        this.type = type;
        this.ghosts = [];
    }

    getNorth = (): Tile => {
        return this.north;
    }

    getSouth = (): Tile => {
        return this.south;
    }

    getEast = (): Tile => {
        return this.east;
    }

    getWest = (): Tile => {
        return this.west;
    }

    setNorth = (tile: Tile) => {
        this.north = tile;
    }

    setEast = (tile: Tile) => {
        this.east = tile;
    }

    setSouth = (tile: Tile) => {
        this.south = tile;
    }

    setWest = (tile: Tile) => {
        this.west = tile;
    }

    addGhost = (ghost: Nullghost): void => {
        this.ghosts.push(ghost);
    }

    removeGhost = (ghost: Nullghost): void => {
        this.ghosts = this.ghosts.filter((g) => g !== ghost);
    }

    getGhosts = (): Nullghost[] => {
        return this.ghosts;
    }

    isType = (type: TileType): boolean => {
        return this.type === type;
    }
}

export class Nullghost {
    direction: Direction;
    tile: Tile;
    collisionCount: number;

    constructor (direction: Direction, tile: Tile) {
        this.direction = direction;
        this.tile = tile;
        this.collisionCount = 0;

        this.tile.addGhost(this);
    }

    getCollisionCount = (): number => {
        return this.collisionCount;
    }

    incrementCollisionCount = (count: number): void => {
        this.collisionCount += count;
    }

    getTile = (): Tile => {
        return this.tile;
    }

    setTile = (tile: Tile): void => {
        this.tile = tile;
        tile.addGhost(this);
    }

    getDirection = (): Direction => {
        return this.direction;
    }

    setDirection = (direction: Direction): void => {
        this.direction = direction;
    }

    rotate90 = (): void => {
        if (this.direction === Direction.north) {
            this.setDirection(Direction.east);
        } else if (this.direction === Direction.east) {
            this.setDirection(Direction.south);
        } else if (this.direction === Direction.south) {
            this.setDirection(Direction.west);
        } else {
            this.setDirection(Direction.north);
        }
    }

    rotate180 = (): void => {
        this.rotate90();
        this.rotate90();
    }

    canMove = (): boolean => {
        if (this.getTile() === null) {
            return false;
        }

        if (this.direction === Direction.north) {
            return this.getTile().getNorth().isType(TileType.Empty);
        } else if (this.direction === Direction.east) {
            return this.getTile().getEast().isType(TileType.Empty);
        } else if (this.direction === Direction.south) {
            return this.getTile().getSouth().isType(TileType.Empty);
        } else {
            return this.getTile().getWest().isType(TileType.Empty);
        }
    }

    move = (): void => {
        if (this.canMove()) {
             this.getTile().removeGhost(this);

            let newTile: Tile;

            if (this.direction === Direction.north) {
                newTile = this.getTile().getNorth();
            } else if (this.direction === Direction.east) {
                newTile = this.getTile().getEast();
            } else if (this.direction === Direction.south) {
                newTile = this.getTile().getSouth();
            } else {
                newTile = this.getTile().getWest();
            }

            this.setTile(newTile);
        } else {
            this.incrementCollisionCount(1);
            this.rotate90();   
        }
    }
}

export class Grid {
    tiles: Tile[][];
    ghosts: Nullghost[];

    constructor() {
        this.tiles = [];
        this.ghosts = [];
    }

    addRow = (row: Tile[]): void => {
        this.tiles.push(row);
    }

    addGhost = (ghost: Nullghost): void => {
        this.ghosts.push(ghost);
    }

    getGhosts = (): Nullghost[] => {
        return this.ghosts;
    }

    connectTiles = () => {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                if (y > 0) {
                    this.tiles[y][x].setNorth(this.tiles[y - 1][x]);
                }

                if (y < this.tiles.length - 1) {
                    this.tiles[y][x].setSouth(this.tiles[y + 1][x]);
                }

                if (x > 0) {
                    this.tiles[y][x].setWest(this.tiles[y][x - 1]);
                } else {
                    this.tiles[y][x].setWest(this.tiles[y][this.tiles[y].length - 1]);
                }

                if (x < this.tiles[y].length - 1) {
                    this.tiles[y][x].setEast(this.tiles[y][x + 1]);
                } else {
                    this.tiles[y][x].setEast(this.tiles[y][0]);
                }
            }
        }
    }

    nextRound = (): void => {
        this.ghosts.forEach((ghost) => {
            ghost.move();
        });

        // Next determine tiles with more than one ghost and increment collisions appropriately
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.isType(TileType.Empty)) {
                    const ghostsOnTile = tile.getGhosts();
                    
                    if (ghostsOnTile.length > 1) {
                        ghostsOnTile.forEach((ghost) => {
                            ghost.incrementCollisionCount(1);
                            ghost.rotate180();
                        });
                    }
                }
            });
        });
    }

    getCountOfCollisions = (): number => {
        let collisions = 0;

        this.ghosts.forEach((ghost) => {
            collisions += ghost.getCollisionCount();
        });

        return collisions;
    }

    print = (): void => {
        console.log(`------------------------------------------`);
        this.tiles.forEach((row) => {
            const line = row.map((tile) => {
                if (tile.isType(TileType.Wall)) {
                    return TileType.Wall;
                }

                const ghostsOnTile = tile.getGhosts();

                if (ghostsOnTile.length === 0) {
                    return TileType.Empty;
                }

                if (ghostsOnTile.length === 1) {
                    return ghostsOnTile[0].getDirection();
                }

                return ghostsOnTile.length.toString();
            }).join('');

            console.log(line);
        });
        console.log(`------------------------------------------`);
    }
}