import { determineLargestDecliningSubset } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let numbers: number[];

const execute = () => {
    const largestSubset = determineLargestDecliningSubset(numbers);
    console.log(JSON.stringify(largestSubset));

    const smallest20 = largestSubset.slice(-20);
    console.log(JSON.stringify(smallest20));

    const sumOfNumbers = smallest20.reduce((acc, curr) => acc + curr, 0);
    console.log(`The sum of the numbers is ${sumOfNumbers}`);
}

const parseLine = (line: string) => {
    numbers = line.split(',').map(Number);
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