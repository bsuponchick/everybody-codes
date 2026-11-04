import { MapCell, MapCellState, connectNeighbors, printMap, getCenterCell, fillInWaterOnCoastline, fillInSandOnCoastline, processPendingEvents, fillInitialTrees, growTheForest } from './5.3.logic';

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
    fillInitialTrees(mapOfCells);
    growTheForest(mapOfCells);
    growTheForest(mapOfCells);

    printMap(mapOfCells);

    let countOfTreeCells = 0;

    mapOfCells.forEach((row) => {
        row.forEach((cell) => {
            if (cell.state === MapCellState.Tree) {
                countOfTreeCells += 1;
            }
        });
    });

    console.log(`There are ${countOfTreeCells} tree cells in the map`);
};

const parseLine = (line: string) => {
    const row: MapCell[] = [];
    line.split('').forEach((character) => {
        row.push(new MapCell(character as MapCellState));
    });

    mapOfCells.push(row);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
