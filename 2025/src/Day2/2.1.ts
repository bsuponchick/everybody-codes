import { cycle } from './2.1.logic';
import { Coordinate } from '../utils/interfaces/coordinate';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let message: string = '';
let note: Coordinate = null;

const execute = () => {
    let currentCoordinate: Coordinate = { x: 0, y: 0 };

    for (let i = 1; i <= 3; i++) {
        currentCoordinate = cycle(currentCoordinate, note, i);
    }

    console.log(`The message is ${currentCoordinate.x},${currentCoordinate.y}`);
}

const parseLine = (line: string) => {
    const parts = line.split(',');
    note = {
        x: parseInt(parts[0].replace('A=[', '')),
        y: parseInt(parts[1].replace(']', '')),
    };
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