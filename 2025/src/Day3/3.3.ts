import { determineLargestDecliningSubset } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let numbers: number[];

const execute = () => {
    const sets: number[][] = [];

    const sortedNumbers = numbers.sort((a, b) => a - b);

    for (const number of sortedNumbers) {
        if (sets.length === 0) {
            sets.push([number]);
        } else {
            let added = false;

            for (const set of sets) {
                if (added) {
                    break;
                }

                if (set[set.length - 1] < number) {
                    set.push(number);
                    added = true;
                }
            }

            if (!added) {
                sets.push([number]);
            }
        }
    }

    console.log(JSON.stringify(sets));
    console.log(`The number of sets is ${sets.length}`);
}

const parseLine = (line: string) => {
    numbers = line.split(',').map(Number);
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