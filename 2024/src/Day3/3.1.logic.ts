export class Tile {
    symbol: string;
    depth: number;
    north: Tile | null;
    east: Tile | null;
    south: Tile | null;
    west: Tile | null;

    constructor(symbol: string) {
        this.symbol = symbol;
        this.depth = 0;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
    }

    setDepth(depth: number) {
        this.depth = depth;
    }

    getDepth() {
        return this.depth;
    }

    getSymbol() {
        return this.symbol;
    }

    getNorth() {
        return this.north;
    }

    getEast() {
        return this.east;
    }
    
    getSouth() {
        return this.south;
    }

    getWest() {
        return this.west;
    }

    setNorth(north: Tile) {
        this.north = north;
    }

    setEast(east: Tile) {
        this.east = east;
    }

    setSouth(south: Tile) {
        this.south = south;
    }
    
    setWest(west: Tile) {
        this.west = west;
    }
}

export const connectTiles = (tiles: Tile[][]) => {
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (y > 0) {
                tiles[y][x].setNorth(tiles[y - 1][x]);
            }

            if (y < tiles.length - 1) {
                tiles[y][x].setSouth(tiles[y + 1][x]);
            }

            if (x > 0) {
                tiles[y][x].setWest(tiles[y][x - 1]);
            }

            if (x < tiles[y].length - 1) {
                tiles[y][x].setEast(tiles[y][x + 1]);
            }
        }
    }
}

export const printTiles = (tiles: Tile[][]) => {
    for (let y = 0; y < tiles.length; y++) {
        let line = '';
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x].getDepth() > 0) {
                line += tiles[y][x].getDepth();
            } else {
                line += tiles[y][x].getSymbol();
            }
        }
        console.log(line);
    }
}

export const setInitialDepth = (tiles: Tile[][]) => {
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x].getSymbol() === '#') {
                tiles[y][x].setDepth(1);
            }
        }
    }
}

export const digTiles = (tiles: Tile[][], currentDepth: number): number => {
    let digCount = 0;

    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            const tile = tiles[y][x];
            if (tile.getDepth() === currentDepth) {
                // Keep digging if this tile is surrounded by tiles with the same depth
                if (tile.getNorth() !== null && tile.getNorth().getDepth() >= currentDepth &&
                    tile.getEast() !== null && tile.getEast().getDepth() >= currentDepth &&
                    tile.getSouth() !== null && tile.getSouth().getDepth() >= currentDepth &&
                    tile.getWest() !== null && tile.getWest().getDepth() >= currentDepth) {
                    tile.setDepth(currentDepth + 1);
                    digCount++;
                }
            }
        }
    }

    return digCount;
}

export const getTotalDepth = (tiles: Tile[][]): number => {
    let depth = 0;
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            if (tiles[y][x].getDepth() > 0) {
                depth += tiles[y][x].getDepth();
            }
        }
    }
    return depth;
}