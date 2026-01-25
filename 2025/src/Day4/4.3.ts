import { Coordinate } from '../utils/interfaces/coordinate';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let gears: Coordinate[] = [];

const execute = () => {
    console.log(`There are ${gears.length} gears`);
    let turns = 100;

    for (let i = 1; i < gears.length; i++) {
        turns *= gears[i-1].y / gears[i].x;
    }

    console.log(`After 100 full turns, the final gear will have turned ${Math.floor(turns)} times`);
}

const parseLine = (line: string) => {
    const parts = line.split('|');
    gears.push({
        x: Number(parts[0]),
        y: Number(parts[1]) || Number(parts[0]) ,
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

export { };