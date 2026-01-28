import { Spine } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let unused: number;
let values: number[] = [];

const execute = () => {
    const spine = new Spine();
    for (const value of values) {
        spine.add(value);
    }
    const quality = spine.getQuality();
    console.log(`The quality is ${quality}`);
}

const parseLine = (line: string) => {
    const parts = line.split(':');
    unused = parseInt(parts[0], 10);
    values = parts[1].split(',').map(value => parseInt(value, 10));
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