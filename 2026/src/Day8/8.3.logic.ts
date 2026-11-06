export class Ent {
    height: number;
    isSeed: boolean;
    seedCountdown: number;

    constructor (height: number) {
        this.height = height;
        this.isSeed = false;
        this.seedCountdown = 0;
    }

    shouldBecomeWarrior = (): boolean => {
        return this.height === 10;
    }

    grow = (): void => {
        this.height += 1;
    }

    becomeSeed = (): void => {
        this.height = 0;
        this.isSeed = true;
        this.seedCountdown = 3;
    }

    sprout = (): void => {
        this.height = 1;
        this.isSeed = false;
        this.seedCountdown = 0;
    }

    decrementSeedCountdown = (): void => {
        this.seedCountdown -= 1;
        if (this.seedCountdown === 0) {
            this.sprout();
        }
    }
}

export const parseChainsOfEntsFromNorthwest = (field: Ent[][]): Ent[][] => {
    const chains: Ent[][] = [];

    for (let row = 0; row < (field.length / 2); row++) {
        if (row === 0) {
            // all non '.'s in this row are the start of chains
            for (let col = 0; col < field[row].length; col++) {
                if (field[row][col] !== null) {
                    // start of a chain identified
                    chains.push(getChainOfEntsFromNorthwest(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = 0;

            while (field[row][col] === null) {
                col += 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromNorthwest(field, row, col));
        }
    }

    return chains;
}

export const parseChainsOfEntsFromNortheast = (field: Ent[][]): Ent[][] => {
    const chains: Ent[][] = [];

    for (let row = 0; row < (field.length / 2); row++) {
        if (row === 0) {
            // all non '.'s in this row are the start of chains
            for (let col = field[row].length - 1; col > 0; col--) {
                if (field[row][col] !== null) {
                    // start of chain identified;
                    chains.push(getChainOfEntsFromNortheast(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = field[row].length - 1;

            while (field[row][col] === null) {
                col -= 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromNortheast(field, row, col));
        }
    }

    return chains;
}

export const parseChainsOfEntsFromSouthwest = (field: Ent[][]): Ent[][] => {
    const chains: Ent[][] = [];

    for (let row = field.length - 1; row > (field.length / 2) - 1; row--) {
        if (row === field.length - 1) {
            // all non '.'s in this row are the start of chains
            for (let col = 0; col < field[row].length - 1; col++) {
                if (field[row][col] !== null) {
                    // start of a chain identified
                    chains.push(getChainOfEntsFromSouthwest(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = 0;

            while (field[row][col] === null) {
                col += 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromSouthwest(field, row, col));
        }
    }

    return chains;
}

export const parseChainsOfEntsFromSoutheast = (field: Ent[][]): Ent[][] => {
    const chains: Ent[][] = [];

    for (let row = field.length - 1; row > (field.length / 2) - 1; row--) {
        if (row === field.length - 1) {
            // all non '.'s in this row are the start of chains
            for (let col = field[row].length - 1; col >= 0; col--) {
                if (field[row][col] !== null) {
                    // start of a chain identified
                    chains.push(getChainOfEntsFromSoutheast(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = field[row].length - 1;

            while (field[row][col] === null) {
                col -= 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromSoutheast(field, row, col));
        }
    }

    return chains;
}

export const parseChainsOfEntsFromEast = (field: Ent[][]): Ent[][] => {
    const chains: Ent[][] = [];

    for (let row = 0; row < field.length; row++) {
        const chain: Ent[] = [];

        for (let col = field[row].length - 1; col >= 0; col--) {
            if (field[row][col] !== null) {
                chain.push(field[row][col]);
            }    
        }

        chains.push(chain);
    }

    return chains;
}

export const parseChainsOfEntsFromWest = (field: Ent[][]): Ent[][] => {
    const chains: Ent[][] = [];

    for (let row = 0; row < field.length; row++) {
        const chain: Ent[] = [];

        for (let col = 0; col < field[row].length; col++) {
            if (field[row][col] !== null) {
                chain.push(field[row][col]);
            }    
        }

        chains.push(chain);
    }

    return chains;
}

const getChainOfEntsFromNorthwest = (field: Ent[][], startingRow: number, startingColumn: number): Ent[] => {
    const chain: Ent[] = [field[startingRow][startingColumn]];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow < field.length - 1) && (currentCol < field[0].length - 1)) {
        currentRow += 1;
        currentCol += 1;

        if (field[currentRow][currentCol] !== null) {
            chain.push(field[currentRow][currentCol]);
        }
    }

    return chain;
}

const getChainOfEntsFromSouthwest = (field: Ent[][], startingRow: number, startingColumn: number): Ent[] => {
    const chain: Ent[] = [field[startingRow][startingColumn]];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow > 0) && (currentCol < field[0].length - 1)) {
        currentRow -= 1;
        currentCol += 1;

        if (field[currentRow][currentCol] !== null) {
            chain.push(field[currentRow][currentCol]);
        }
    }

    return chain;
}

const getChainOfEntsFromNortheast = (field: Ent[][], startingRow: number, startingColumn: number): Ent[] => {
    const chain: Ent[] = [field[startingRow][startingColumn]];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow < field.length - 1) && (currentCol > 0)) {
        currentRow += 1;
        currentCol -= 1;

        if (field[currentRow][currentCol] !== null) {
            chain.push(field[currentRow][currentCol]);
        }
    }

    return chain;
}

const getChainOfEntsFromSoutheast = (field: Ent[][], startingRow: number, startingColumn: number): Ent[] => {
    const chain: Ent[] = [field[startingRow][startingColumn]];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow > 0) && (currentCol > 0)) {
        currentRow -= 1;
        currentCol -= 1;

        if (field[currentRow][currentCol] !== null) {
            chain.push(field[currentRow][currentCol]);
        }
    }

    return chain;
}

export const determineEnergyFromChain = (chain: Ent[]): number => {
    let currentShadowHeight = chain[0].height;
    let energy = 0;
    
    // console.log(`===== Evaluating chain ${JSON.stringify(chain)}`);

    if (chain[0].isSeed === false) {
        energy += 1;
        // console.log(`Position 0, height ${chain[0].height} received energy`);
        chain[0].grow();
    }

    for (let i = 1; i < chain.length; i++) {
        if (currentShadowHeight > 0) {
            currentShadowHeight -= 1;
        }

        if (chain[i].height > currentShadowHeight) {
            // console.log(`Position ${i}, height ${chain[i].height} received energy`);
            energy += 1;
            currentShadowHeight = chain[i].height;
            chain[i].grow();
        }
    }

    return energy;
};

export const growWarriors = (field: Ent[][]): number => {
    let grownWarriors = 0;

    field.forEach((row) => {
        row.forEach((ent) => {
            if (ent !== null) {
                if (ent.shouldBecomeWarrior()) {
                    ent.becomeSeed();
                    grownWarriors += 1;
                } else if (ent.isSeed) {
                    ent.decrementSeedCountdown();
                }
            }
        });
    });

    return grownWarriors;
}