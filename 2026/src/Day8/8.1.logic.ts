export const parseChainsOfEnts = (field: string[][]): number[][] => {
    const chains: number[][] = [];

    for (let row = 0; row < (field.length / 2); row++) {
        if (row === 0) {
            // all non '.'s in this row are the start of chains
            for (let col = 0; col < field[row].length; col++) {
                if (field[row][col] !== '.') {
                    // start of a chain identified
                    chains.push(getChainOfEnts(field, row, col));
                }
            }
        } else {
            // find the first non '.', this is the start of the only chain in this row
            let col = 0;

            while (field[row][col] === '.') {
                col += 1;
            }

            // start of chain identified
            chains.push(getChainOfEnts(field, row, col));
        }
    }

    return chains;
}

const getChainOfEnts = (field: string[][], startingRow: number, startingColumn: number): number[] => {
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