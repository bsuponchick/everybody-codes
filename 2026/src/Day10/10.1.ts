import { Grid, Tile, Nullghost, TileType, Direction } from './10.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const grid: Grid = new Grid();
const MAX_ROUNDS = 10;

const execute = () => {
    grid.connectTiles();

    for (let i = 0; i < MAX_ROUNDS; i++) {
        grid.nextRound();
        grid.print();
        console.log(`As of round ${i + 1}, there have been ${grid.getCountOfCollisions()} collissions`);
    }

    console.log(`There were a total of ${grid.getCountOfCollisions()} collisions.`);
};

const parseLine = (line: string) => {
    const row: Tile[] = [];
    line.split('').forEach((character) => {
        switch (character) {
            case '#':
                row.push(new Tile(TileType.Wall));
                break;
            case '.': 
                row.push(new Tile(TileType.Empty));
                break;
            default:
                const tile = new Tile(TileType.Empty);
                let ghost;

                if (character === '^') {
                    ghost = new Nullghost(Direction.north, tile);
                } else if (character === '>') {
                    ghost = new Nullghost(Direction.east, tile);
                } else if (character === 'v') {
                    ghost = new Nullghost(Direction.south, tile);
                } else if (character === '<') {
                    ghost = new Nullghost(Direction.west, tile);
                }

                row.push(tile);
                grid.addGhost(ghost);
                break;
        }
    });

    grid.addRow(row);
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
