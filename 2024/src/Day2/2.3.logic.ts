export class Rune {
    value: string;
    matched: boolean;
    north: Rune;
    east: Rune;
    south: Rune;
    west: Rune;

    constructor(value: string) {
        this.value = value;
        this.matched = false;
        this.north = null;
        this.east = null;
        this.south = null;
        this.west = null;
    }

    setMatched(matched: boolean) {
        this.matched = matched;
    }

    getMatched() {
        return this.matched;
    }

    getValue() {
        return this.value;
    }

    setNorth(north: Rune) {
        this.north = north;
    }

    setEast(east: Rune) {
        this.east = east;
    }

    setSouth(south: Rune) {
        this.south = south;
    }

    setWest(west: Rune) {
        this.west = west;
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
}

export const connectRunes = (runes: Rune[][]) => {
    for (let y = 0; y < runes.length; y++) {
        for (let x = 0; x < runes[y].length; x++) {
            if (y > 0) {
                runes[y][x].setNorth(runes[y - 1][x]);
            }

            if (y < runes.length - 1) {
                runes[y][x].setSouth(runes[y + 1][x]);
            }

            if (x > 0) {
                runes[y][x].setWest(runes[y][x - 1]);
            } else {
                runes[y][x].setWest(runes[y][runes[y].length - 1]);
            }

            if (x < runes[y].length - 1) {
                runes[y][x].setEast(runes[y][x + 1]);
            } else {
                runes[y][x].setEast(runes[y][0]);
            }
        }
    }
}