import { Grid, Tile, Nullghost, TileType, Direction } from './10.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const grid: Grid = new Grid();
const MAX_HEALTH = test ? 10 : 10000;

const execute = () => {
    grid.connectTiles();
    let round = 0;

    while (grid.getGhosts().length > 0) {
        round += 1;
        grid.nextRound();
        grid.print();
    }

    console.log(`There were a total of ${round} rounds before the final ghost disappeared.`);
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
                    ghost = new Nullghost(Direction.north, tile, MAX_HEALTH);
                } else if (character === '>') {
                    ghost = new Nullghost(Direction.east, tile, MAX_HEALTH);
                } else if (character === 'v') {
                    ghost = new Nullghost(Direction.south, tile, MAX_HEALTH);
                } else if (character === '<') {
                    ghost = new Nullghost(Direction.west, tile, MAX_HEALTH);
                }

                row.push(tile);
                grid.addGhost(ghost);
                break;
        }
    });

    grid.addRow(row);
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
