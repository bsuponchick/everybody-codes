import { add } from './2.1.logic';
import { shouldEngrave } from './2.2.logic';
import { Coordinate } from '../utils/interfaces/coordinate';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let startingCoordinate: Coordinate = null;

const execute = () => {
    const finalCoordinate = add(startingCoordinate, { x: 1000, y: 1000 });
    const granularity = 101;

    const diffX = finalCoordinate.x - startingCoordinate.x;
    const diffY = finalCoordinate.y - startingCoordinate.y;

    const xSteps = diffX / granularity > 0 ? Math.ceil(diffX / granularity) : Math.floor(diffX / granularity);
    const ySteps = diffY / granularity > 0 ? Math.ceil(diffY / granularity) : Math.floor(diffY / granularity);

    // Setup an array of arrays of coordinates of size xSteps * ySteps
    const engravings: boolean[][] = [];

    for (let y = 0; y < granularity; y++) {
        engravings[y] = [];
        for (let x = 0; x < granularity; x++) {
            engravings[y].push(shouldEngrave({ x: startingCoordinate.x + x * xSteps, y: startingCoordinate.y + y * ySteps }));
        }
    }

    for (let y = 0; y < granularity; y++) {
        let line = '';
        for (let x = 0; x < granularity; x++) {
            line += engravings[y][x] ? 'x' : '.';
        }
        console.log(line);
    }

    console.log(`The number of engravings is ${engravings.flat().filter(Boolean).length}`);
}

const parseLine = (line: string) => {
    const parts = line.split(',');
    startingCoordinate = {
        x: parseInt(parts[0].replace('A=[', '')),
        y: parseInt(parts[1].replace(']', '')),
    };
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