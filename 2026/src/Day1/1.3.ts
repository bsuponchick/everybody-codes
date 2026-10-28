import { determineSmallestOutpostAreaPossible } from './1.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';
const outposts: number[] = [];
let sumOfNeededPinecones = 0;

const execute = () => {
    outposts.forEach((outpost) => {
        let areaOfOutpostNeeded = determineSmallestOutpostAreaPossible(outpost);
        sumOfNeededPinecones = sumOfNeededPinecones + (areaOfOutpostNeeded - outpost);
    });

    console.log(`The total number of pinecones needed to be collected is ${sumOfNeededPinecones}`);
}

const parseLine = (line: string) => {
    const pineconeSizesAsStrings = line.split(',');
    pineconeSizesAsStrings.forEach((size) => {
        outposts.push(Number.parseInt(size));
    });
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