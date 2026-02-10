const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Result {
    id: string;
    energies: number[];
    totalEnergy: number;
}


const chariots: Map<string, string[]> = new Map();
const results: Result[] = [];

const MAX_ROUNDS = 10;
const STARTING_ENERGY = 10;

const execute = () => {
    chariots.forEach((moves, id) => {
        let currentEnergy = STARTING_ENERGY;
        let energiesByRound: number[] = [];

        for (let round = 0; round < MAX_ROUNDS; round++) {
            const move = moves[round % moves.length];

            if (move === '+') {
                currentEnergy++;
            } else if (move === '-' && currentEnergy > 0) {
                currentEnergy--;
            } else if (move === '=') {
                // Do nothing
            }

            energiesByRound.push(currentEnergy);
        }

        results.push({
            id,
            energies: energiesByRound,
            totalEnergy: energiesByRound.reduce((a, b) => a + b, 0)
        });
    });

    if (debug) {
        results.forEach((result) => {
            console.log(`${result.id}: ${result.energies.join(',')} = ${result.totalEnergy}`);
        });
    }

    results.sort((a, b) => b.totalEnergy - a.totalEnergy);
    console.log(`The order of action plans is ${results.map((result) => result.id).join('')}`);
}

const parseLine = (line: string) => {
   const parts = line.split(':');
   const moves = parts[1].split(',');
   chariots.set(parts[0], moves);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};