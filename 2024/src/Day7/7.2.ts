const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Result {
    id: string;
    energies: number[];
    totalEnergy: number;
}


const chariots: Map<string, string[]> = new Map();
const track: string[] = [];
const trackActions: string[] = [];
const results: Result[] = [];

const MAX_ROUNDS = 10;
const STARTING_ENERGY = 10;

const execute = () => {
    track[0].split('').forEach((char, index) => {
        if (char !== 'S') {
            trackActions.push(char);
        }
    });

    // Now get the right side actions
    for (let i = 1; i < track.length - 1; i++) {
        trackActions.push(track[i][track[i].length - 1]);
    };

    // Now invert the final track actions and push them in
    track[track.length - 1].split('').reverse().forEach((char) => {
        trackActions.push(char);
    });

    // Now go back up the right side actions
    for (let i = track.length - 2; i > 0; i--) {
        trackActions.push(track[i][0]);
    };

    trackActions.push('S');

    if (debug) {
        console.log(trackActions.join(''));
    }

    chariots.forEach((moves, id) => {
        if (debug) {
            console.log(`========== Calculating energy for ${id} ==========`);
        }
        let currentEnergy = STARTING_ENERGY;
        let energiesByRound: number[] = [];
        let stepsSoFar = 0;

        for (let round = 0; round < MAX_ROUNDS; round++) {
            for (let step = 0; step < trackActions.length; step++) {
                const move = moves[stepsSoFar % moves.length];
                const override = trackActions[step];

                if (override === 'S' || override === '=') {
                    if (move === '+') {
                        currentEnergy++;
                    } else if ((move === '-') && (currentEnergy > 0)) {
                        currentEnergy--;
                    } else if (move === '=') {
                        // Do nothing
                    }
                } else if (override === '+') {
                    currentEnergy++;
                } else if ((override === '-') && (currentEnergy > 0)) {
                    currentEnergy--;
                }

                if (energiesByRound.length <= round) {
                    if (debug) {
                        console.log(`Adding energy for round ${round} = (override ${override}, move ${move}) = ${currentEnergy}`);
                    }
                    energiesByRound.push(currentEnergy);
                } else {
                    energiesByRound[round] += currentEnergy;
                    if (debug) {
                        console.log(`Adding energy for round ${round} = (override ${override}, move ${move}) = ${currentEnergy}, total = ${energiesByRound[round]}`);
                    }
                }

                stepsSoFar++;
            }
        }

        results.push({
            id,
            energies: energiesByRound,
            totalEnergy: energiesByRound.reduce((a, b) => a + b, 0)
        });
    });

    results.sort((a, b) => b.totalEnergy - a.totalEnergy);

    if (debug) {
        results.forEach((result) => {
            console.log(`${result.id}: ${result.energies.join(',')} = ${result.totalEnergy}`);
        });
    }

    console.log(`The order of action plans is ${results.map((result) => result.id).join('')}`);
}

const parseLine = (line: string) => {
    if (line.indexOf(':') !== -1) {
        const parts = line.split(':');
        const moves = parts[1].split(',');
        chariots.set(parts[0], moves);
    } else if (line.length > 0) {
        track.push(line);
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};