import { determineNextIndex } from './1.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';
const names: string[] = [];
const instructions: string[] = [];

const execute = () => {
    console.log(`Names: ${names.join(', ')}`);
    console.log(`Instructions: ${instructions.join(', ')}`);

    let currentIndex = 0;
    const steps: number[] = [];

    for (const instruction of instructions) {
        if (instruction.startsWith('L')) {
            steps.push(parseInt(instruction.substring(1)) * -1);
        } else if (instruction.startsWith('R')) {
            steps.push(parseInt(instruction.substring(1)));
        }
    }

    steps.forEach((step) => {
        currentIndex = determineNextIndex(currentIndex, names.length - 1, step);
    });

    console.log(`Our name is ${names[currentIndex]}`);
}

const parseLine = (line: string) => {
    if (line.length === 0) {
        return;
    }
    if (names.length === 0) {
        line.split(',').map(name => names.push(name.trim()));
    } else {
        line.split(',').map(instruction => instructions.push(instruction.trim()));
    }

};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export { };