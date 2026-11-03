import { MapCell, MapCellState, connectNeighbors, printMap, getCenterCell, fillInWaterOnCoastline, fillInSandOnCoastline, processPendingEvents } from './5.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const mapOfCells: MapCell[][] = [];

const execute = () => {
    connectNeighbors(mapOfCells);
    const centerCell = getCenterCell(mapOfCells);
    centerCell.setState(MapCellState.Land);
    processPendingEvents();

    fillInWaterOnCoastline(mapOfCells);
    fillInSandOnCoastline(mapOfCells);

    printMap(mapOfCells);

    let countOfSandCells = 0;

    mapOfCells.forEach((row) => {
        row.forEach((cell) => {
            if (cell.state === MapCellState.Sand) {
                countOfSandCells += 1;
            }
        });
    });

    console.log(`There are ${countOfSandCells} sand cells in the map`);
};

const parseLine = (line: string) => {
    const row: MapCell[] = [];
    line.split('').forEach((character) => {
        row.push(new MapCell(character as MapCellState));
    });

    mapOfCells.push(row);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
