import { shout } from './5.1.logic';
import { dance, generateHash } from './5.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let dancers: number[][] = [];
const cache: Map<string, boolean> = new Map();

const execute = () => {
    let currentRound = 0;
    let highestShout = 0;
    let keepGoing = true;

    while (keepGoing) {
        const clapperIndex = currentRound % dancers.length;
        const lineIndex = (currentRound + 1) % dancers.length;
        const currentHash = generateHash(dancers);

        if (cache.has(currentHash)) {
            // We have already seen this situation so we can stop
            keepGoing = false;
        } else {
            const clapper = dancers[clapperIndex].shift();
            dancers[lineIndex] = dance(dancers[lineIndex], clapper);
            const currentShout = shout(dancers);
            if (currentShout > highestShout) {
                highestShout = currentShout;
                console.log(`The highest shout is ${highestShout} at round ${currentRound}`);
            }
            cache.set(currentHash, true);
        }

        currentRound++;
    }

    console.log(`The highest shout is ${highestShout} after ${currentRound} rounds`);
}

const parseLine = (line: string) => {
    if (dancers.length === 0) {
        const values = line.split(' ');
        values.forEach((value) => {
            dancers.push([Number(value)]);
        });
    } else {
        const values = line.split(' ');
        values.forEach((value, index) => {
            dancers[index].push(Number(value));
        });
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};