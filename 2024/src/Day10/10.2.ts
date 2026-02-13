import { Grid, determinePowerOfRunicWord } from './10.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let gridStrings: string[] = [];
let grids: Grid[] = [];
let gridMultiplier = 0;

const execute = () => {
    let runicWords: string[] = [];

    for (const gridString of gridStrings) {
        console.log(`Grid string: ${gridString}`);
        const grid = new Grid();
        for (const row of gridString.split('|')) {
            grid.addRow(row.split(''));
        }
        grids.push(grid);
    }

    for (const grid of grids) {
        runicWords.push(grid.determineRunicWord());
    }

    let powerOfRunicWords = 0;
    for (const runicWord of runicWords) {
        powerOfRunicWords += determinePowerOfRunicWord(runicWord);
    }

    console.log(`The runic words are ${runicWords.join(', ')}`);
    console.log(`The power of the runic words is ${powerOfRunicWords}`);
}

const parseLine = (line: string) => {
    if (line.length === 0) {
        gridMultiplier++;
        return;
    }

    const gridParts = line.split(' ');

    for (let i = 0; i < gridParts.length; i++) {
        let index = (15 * gridMultiplier) + i;
        if (gridStrings[index] === undefined) {
            gridStrings.push(gridParts[i]);
        } else {
            gridStrings[index] = gridStrings[index] + '|' + gridParts[i];
        }
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test1.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};