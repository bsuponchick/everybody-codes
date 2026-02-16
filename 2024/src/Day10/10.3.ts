import { Grid, GridSegment, determinePowerOfRunicWord } from './10.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let grid: Grid = new Grid();

const execute = () => {
    const gridSegments = grid.determineAllGridSegments();
    grid.print();

    console.log('===============================================');

    grid.solve();

    grid.print();

    console.log(`There are ${gridSegments.length} grid segments`);

    const runicWords = grid.determineRunicWords(gridSegments);

    let powerOfRunicWords = 0;
    for (const runicWord of runicWords) {
        powerOfRunicWords += determinePowerOfRunicWord(runicWord);
    }

    console.log(`The runic words are ${runicWords.join(', ')}`);
    console.log(`The power of the runic words is ${powerOfRunicWords}`);
}

const parseLine = (line: string) => {
    grid.addRow(line.split(''));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};