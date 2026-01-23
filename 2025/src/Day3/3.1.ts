import { determineLargestDecliningSubset } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let numbers: number[];

const execute = () => {
    const largestSubset = determineLargestDecliningSubset(numbers);
    const sumOfNumbers = largestSubset.reduce((acc, curr) => acc + curr, 0);
    console.log(`The sum of the numbers is ${sumOfNumbers}`);
}

const parseLine = (line: string) => {
    numbers = line.split(',').map(Number);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};