import { dance, printDancers, shout } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let dancers: number[][] = [];
const REPEAT_GOAL = 2024;
const cache: Map<number, number> = new Map();

const execute = () => {
    let currentRound = 0;
    let currentShout = 0;
    let keepGoing = true;

    while (keepGoing) {
        const clapperIndex = currentRound % dancers.length;
        const lineIndex = (currentRound + 1) % dancers.length;

        const clapper = dancers[clapperIndex].shift();
        dancers[lineIndex] = dance(dancers[lineIndex], clapper);
        currentShout = shout(dancers);

        if (cache.has(currentShout)) {
            let currentCount = cache.get(currentShout);

            if (currentCount === (REPEAT_GOAL - 1)) {
                keepGoing = false;
            } else {
                cache.set(currentShout, currentCount + 1);
            }
        } else {
            cache.set(currentShout, 1);
        }

        currentRound++;
    }

    console.log(`The shout ${currentShout} is the first to repeat ${REPEAT_GOAL} times`);
    console.log(`The round number is ${currentRound}`);

    console.log(`The product of the round number and the shout is ${currentRound * currentShout}`);
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
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};