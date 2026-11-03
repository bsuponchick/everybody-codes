import { MapCell, MapCellState, connectNeighbors, printMap, getCenterCell } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const mapOfCells: MapCell[][] = [];

const execute = () => {
    connectNeighbors(mapOfCells);
    const centerCell = getCenterCell(mapOfCells);
    centerCell.setState(MapCellState.Land);

    printMap(mapOfCells);

    let countOfLandCells = 0;

    mapOfCells.forEach((row) => {
        row.forEach((cell) => {
            if (cell.state === MapCellState.Land) {
                countOfLandCells += 1;
            }
        });
    });

    console.log(`There are ${countOfLandCells} land cells in the map`);
};

const parseLine = (line: string) => {
    const row: MapCell[] = [];
    line.split('').forEach((character) => {
        row.push(new MapCell(character as MapCellState));
    });

    mapOfCells.push(row);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
