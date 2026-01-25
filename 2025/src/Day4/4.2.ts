import { add } from './4.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let gears: number[] = [];
const goal = 10000000000000;

const execute = () => {
    console.log(`There are ${gears.length} gears`);
    const ratios: number[] = [];

    for (let i = 0; i < gears.length - 1; i++) {
        ratios.push(gears[i] / gears[i + 1]);
    }

    console.log(JSON.stringify(ratios));
    const productOfRatios = ratios.reduce((acc, curr) => acc * curr, 1);
    console.log(`The product of the ratios is ${productOfRatios}`);

    console.log(`The last gear will need to turn ${Math.ceil(goal / productOfRatios)} times`);
}

const parseLine = (line: string) => {
   gears.push(Number(line));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};