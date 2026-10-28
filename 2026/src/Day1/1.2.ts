import { determineSmallestPineconesNeededForSquarePermiter } from './1.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';
const outposts: number[] = [];
let sumOfNeededPinecones = 0;

const execute = () => {
    outposts.forEach((outpost) => {
        let lengthOfPerimeterNeeded = determineSmallestPineconesNeededForSquarePermiter(outpost);
        sumOfNeededPinecones = sumOfNeededPinecones + (lengthOfPerimeterNeeded - outpost);
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
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};