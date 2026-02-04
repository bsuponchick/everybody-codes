import { Tile, connectTiles, printTiles, setInitialDepth, digTiles, getTotalDepth } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let tiles: Tile[][] = [];

const execute = () => {
    connectTiles(tiles);
    setInitialDepth(tiles);
    printTiles(tiles);

    let currentDepth = 1;
    let digCount = digTiles(tiles, currentDepth);

    // Just keep digging...just keep digging...
    while (digCount > 0) {
        currentDepth++;
        digCount = digTiles(tiles, currentDepth);
    }

    printTiles(tiles);
    console.log(`The total depth of the tiles is ${getTotalDepth(tiles)}`);
}

const parseLine = (line: string) => {
   const row: Tile[] = [];
   line.split('').forEach((symbol) => {
    row.push(new Tile(symbol));
   });
   tiles.push(row);
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