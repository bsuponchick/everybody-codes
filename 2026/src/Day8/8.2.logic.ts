export const parseChainsOfEntsFromNorthwest = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = 0; row < (field.length / 2); row++) {
        if (row === 0) {
            // all non '.'s in this row are the start of chains
            for (let col = 0; col < field[row].length; col++) {
                if (field[row][col] !== '.') {
                    // start of a chain identified
                    chains.push(getChainOfEntsFromNorthwest(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = 0;

            while (field[row][col] === '.') {
                col += 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromNorthwest(field, row, col));
        }
    }

    console.log(`Chains from northwest are ${JSON.stringify(chains)}`);

    return chains;
}

export const parseChainsOfEntsFromNortheast = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = 0; row < (field.length / 2); row++) {
        if (row === 0) {
            // all non '.'s in this row are the start of chains
            for (let col = field[row].length - 1; col > 0; col--) {
                if (field[row][col] !== '.') {
                    // start of chain identified;
                    chains.push(getChainOfEntsFromNortheast(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = field[row].length - 1;

            while (field[row][col] === '.') {
                col -= 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromNortheast(field, row, col));
        }
    }

    console.log(`Chains from northeast are ${JSON.stringify(chains)}`);

    return chains;
}

export const parseChainsOfEntsFromSouthwest = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = field.length - 1; row > (field.length / 2) - 1; row--) {
        if (row === field.length - 1) {
            // all non '.'s in this row are the start of chains
            for (let col = 0; col < field[row].length - 1; col++) {
                if (field[row][col] !== '.') {
                    // start of a chain identified
                    chains.push(getChainOfEntsFromSouthwest(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = 0;

            while (field[row][col] === '.') {
                col += 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromSouthwest(field, row, col));
        }
    }

    console.log(`Chains from southwest are ${JSON.stringify(chains)}`);

    return chains;
}

export const parseChainsOfEntsFromSoutheast = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = field.length - 1; row > (field.length / 2) - 1; row--) {
        if (row === field.length - 1) {
            // all non '.'s in this row are the start of chains
            for (let col = field[row].length - 1; col >= 0; col--) {
                if (field[row][col] !== '.') {
                    // start of a chain identified
                    chains.push(getChainOfEntsFromSoutheast(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = field[row].length - 1;

            while (field[row][col] === '.') {
                col -= 1;
            }

            // start of chain identified
            chains.push(getChainOfEntsFromSoutheast(field, row, col));
        }
    }

    console.log(`Chains from southeast are ${JSON.stringify(chains)}`);

    return chains;
}

export const parseChainOfEntsFromEast = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = 0; row < field.length; row++) {
        const chain: number[] = [];

        for (let col = field[row].length - 1; col >= 0; col--) {
            if (field[row][col] !== '.') {
                chain.push(Number.parseInt(field[row][col]));
            }    
        }

        chains.push(chain);
    }

    console.log(`Chains from east are ${JSON.stringify(chains)}`);

    return chains;
}

export const parseChainsOfEntsFromWest = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = 0; row < field.length; row++) {
        const chain: number[] = [];

        for (let col = 0; col < field[row].length; col++) {
            if (field[row][col] !== '.') {
                chain.push(Number.parseInt(field[row][col]));
            }    
        }

        chains.push(chain);
    }

    console.log(`Chains from west are ${JSON.stringify(chains)}`);

    return chains;
}

const getChainOfEntsFromNorthwest = (field: string[][], startingRow: number, startingColumn: number): number[] => {
    const chain: number[] = [Number.parseInt(field[startingRow][startingColumn])];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow < field.length - 1) && (currentCol < field[0].length - 1)) {
        currentRow += 1;
        currentCol += 1;

        if (field[currentRow][currentCol] !== '.') {
            chain.push(Number.parseInt(field[currentRow][currentCol]));
        }
    }

    return chain;
}

const getChainOfEntsFromSouthwest = (field: string[][], startingRow: number, startingColumn: number): number[] => {
    const chain: number[] = [Number.parseInt(field[startingRow][startingColumn])];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow > 0) && (currentCol < field[0].length - 1)) {
        currentRow -= 1;
        currentCol += 1;

        if (field[currentRow][currentCol] !== '.') {
            chain.push(Number.parseInt(field[currentRow][currentCol]));
        }
    }

    return chain;
}

const getChainOfEntsFromNortheast = (field: string[][], startingRow: number, startingColumn: number): number[] => {
    const chain: number[] = [Number.parseInt(field[startingRow][startingColumn])];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow < field.length - 1) && (currentCol > 0)) {
        currentRow += 1;
        currentCol -= 1;

        if (field[currentRow][currentCol] !== '.') {
            chain.push(Number.parseInt(field[currentRow][currentCol]));
        }
    }

    return chain;
}

const getChainOfEntsFromSoutheast = (field: string[][], startingRow: number, startingColumn: number): number[] => {
    const chain: number[] = [Number.parseInt(field[startingRow][startingColumn])];
    let currentRow = startingRow;
    let currentCol = startingColumn;

    while ((currentRow > 0) && (currentCol > 0)) {
        currentRow -= 1;
        currentCol -= 1;

        if (field[currentRow][currentCol] !== '.') {
            chain.push(Number.parseInt(field[currentRow][currentCol]));
        }
    }

    return chain;
}


export const determineEnergyFromChain = (chain: number[]): number => {
    let energy = 1;
    let currentShadowHeight = chain[0];

    console.log(`Starting ent at height ${chain[0]} received energy...`);

    for (let i = 1; i < chain.length; i++) {
        currentShadowHeight -= 1;

        if (chain[i] > currentShadowHeight) {
            console.log(`Ent at position ${i} with height of ${chain[i]} received energy...`);
            energy += 1;
            currentShadowHeight = chain[i];
        }
    }

    return energy;
};