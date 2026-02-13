import { determinePossibleValuesForCoordinate, determineCoordinatesToFill } from './10.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let grid: string[][] = [];

const execute = () => {
    let coordinatesToFill = determineCoordinatesToFill(grid);
    const originalCoordinatesToFill = [...coordinatesToFill];

    console.log(`There are ${coordinatesToFill.length} coordinates to fill`);

    while (coordinatesToFill.length > 0) {
        const coordinate = coordinatesToFill.shift();
        const possibleValues = determinePossibleValuesForCoordinate(grid, coordinate);
        console.log(`Possible values for coordinate ${coordinate.x}, ${coordinate.y}: ${possibleValues.join(', ')}`);
        
        if (possibleValues.length === 1) {
            grid[coordinate.y][coordinate.x] = possibleValues[0];
            coordinatesToFill = determineCoordinatesToFill(grid);
        }
    }

    let runicWord = '';
    for (const coordinate of originalCoordinatesToFill) {
        runicWord += grid[coordinate.y][coordinate.x];
    }
    console.log(`The runic word is ${runicWord}`);
}

const parseLine = (line: string) => {
   grid.push(line.split(''));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};