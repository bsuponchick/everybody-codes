import { Grid, GridSegment, determinePowerOfRunicWord } from './10.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let grid: Grid = new Grid();
const RETRIES = 100000;

const execute = () => {
    let maxRunicWordPower = 0;

    grid.snapshot();

    const gridSegments = grid.determineAllGridSegments();
    for (let i = 0; i < RETRIES; i++) {
        console.log(`Retrying ${i + 1} of ${RETRIES}`);
        grid.solve();

        const runicWords = grid.determineRunicWords(gridSegments);

        let powerOfRunicWords = 0;
        for (const runicWord of runicWords) {
            powerOfRunicWords += determinePowerOfRunicWord(runicWord);
        }

        if (powerOfRunicWords > maxRunicWordPower) {
            maxRunicWordPower = powerOfRunicWords;
        }

        grid.restore();
    }
    
    console.log(`The max power of the runic words is ${maxRunicWordPower}`);
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