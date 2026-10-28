export const calculateScore = (sequences: string[]): number => {
    let score = 0;

    const symbols: Map<string, number> = new Map();

    sequences.forEach((sequence) => {
        sequence.split('').forEach((symbol, index) => {
            if (index !== 1) {
                if (symbols.has(symbol)) {
                    symbols.set(symbol, symbols.get(symbol) + 1);
                } else {
                    symbols.set(symbol, 1);
                }
            }
        });
    });

    symbols.forEach((value, key) => {
        if (value === 3) {
            score += 1;
        } else if (value > 3) {
            score += (1 + (value - 3));
        }
    });

    return score;
}