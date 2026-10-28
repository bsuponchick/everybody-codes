import { calculateScore } from './16.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const numberOfTurns: number[] = [];
const wheels: string[][] = [];
const TURNS = test2 ? 100: 202420242024;

const execute = () => {
    if (debug) {
        console.log(`Number of turns: ${numberOfTurns.join(', ')}`);
        console.log(`Wheels: ${wheels.map(wheel => wheel.join(', ')).join('\n')}`);
    }

    let turn = 1;
    // let cacheHit = false;
    // let repeatedCacheKey = '';
    let byteCoinsWon = 0;

    // while (!cacheHit) {
    while (turn <= TURNS) {
        let sequences: string[] = [];

        wheels.forEach((wheel, index) => {
            const wheelTurns = numberOfTurns[index] * turn;
            const result = wheel[wheelTurns % wheel.length];
            sequences.push(result);
        });

        const score = calculateScore(sequences);

        // if (keyToTurnCache.has(cacheKey)) {
        //     cache.set(turn, score);
        //     console.log(`Cache hit for ${cacheKey} on pull ${turn} with score ${score}, matched turn ${keyToTurnCache.get(cacheKey)}`);
        //     // cacheHit = true;
        //     repeatedCacheKey = cacheKey;
        // } else {
    //              // console.log(`Cache miss for ${cacheKey} on pull ${turn} with score ${score}`);

            byteCoinsWon += score;

            const turnsToLog = [0, 1, 2, 3, 4, 5, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000];
            if (turnsToLog.includes(turn)) {
                console.log(`${turn}: total byte coins won: ${byteCoinsWon}`);
            }

            turn++;
        // }
    }

    // if (cacheHit) {
    //     let byteCoinsWon = 0;
    //     let turnsIterated = 0;
    //     const matchedTurn = keyToTurnCache.get(repeatedCacheKey);
    //     const turnDiff = turn - matchedTurn;

    //     for (let i = 1; i <= turn; i++) {
    //         byteCoinsWon += cache.get(i);
    //         turnsIterated++;
    //     }

    //     if (debug) {
    //         console.log(`Byte coins from before iterations: ${byteCoinsWon}.  Turns iterated: ${turnsIterated}`);
    //     }

    //     const turnsRemaining = TURNS - turnsIterated;
    //     const iterations = Math.floor(turnsRemaining / turnDiff);
    //     const remainder = turnsRemaining % (turnDiff);

    //     for (let j = matchedTurn + 1; j <= turn; j++) {
    //         if (debug) {
    //             console.log(`Byte coins for turn ${j}: ${cache.get(j)}`);
    //         }
    //         byteCoinsWon += (cache.get(j) * iterations);
    //         console.log(`Adding ${iterations} turns of ${cache.get(j)} = ${cache.get(j) * iterations}`);
    //         turnsIterated += iterations;
    //     }

    //     if (debug) {
    //         console.log(`Byte coins after iterations: ${byteCoinsWon}.  Turns iterated: ${turnsIterated}`);
    //     }

    //     for (let i = 1; i <= remainder; i++) {
    //         if (debug) {
    //             console.log(`Byte coins for turn ${matchedTurn + i}: ${cache.get(matchedTurn + i)}`);
    //         }
    //         byteCoinsWon += cache.get(matchedTurn + i);
    //         turnsIterated++;
    //     }
       
    //     if (debug) {
    //         console.log(`Byte coins after remainder: ${byteCoinsWon}.  Turns iterated: ${turnsIterated}`);
    //     }

       


    //     console.log(`Matched turn: ${matchedTurn}`);
    //     console.log(`Turn diff: ${turnDiff}`);
    //     console.log(`Turns remaining: ${turnsRemaining}`);
    //     console.log(`Total iterations: ${iterations}`);
    //     console.log(`Total remainder: ${remainder}`);

    //     console.log(`Total Byte coins won: ${byteCoinsWon}`);
    // }

    console.log(`Total Byte coins won: ${byteCoinsWon}`);
}

const parseLine = (line: string) => {
    if (line.charAt(0).match(/[0-9]/)) {
        const numberParts = line.split(',');
        for (const numberPart of numberParts) {
            numberOfTurns.push(parseInt(numberPart));
            wheels.push([]);
        }
    } else if (line.trim().length > 0) {
        for (let i = 0; i < line.length; i+=4) {
            const segment = line.substring(i, i + 3);
            if (segment.trim().length > 0) {
                // This is a valid segment
                wheels[i / 4].push(segment);
            }
        }
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