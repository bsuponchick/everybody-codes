import { dance, printDancers, shout } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let dancers: number[][] = [];
const ROUNDS = 10;

const execute = () => {
    printDancers(dancers);

    for (let i = 0; i < ROUNDS; i++) {
        const clapperIndex = i % dancers.length;
        const lineIndex = (i + 1) % dancers.length;


        console.log(`Round ${i} will evaluate line ${lineIndex} which has ${JSON.stringify(dancers[lineIndex])} and the clapper is ${dancers[clapperIndex][0]}`);
        const clapper = dancers[clapperIndex].shift();

        dancers[lineIndex] = dance(dancers[lineIndex], clapper);
        printDancers(dancers);
        console.log(`Round ${i} has the following shout: ${shout(dancers)}`);
    }
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
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};