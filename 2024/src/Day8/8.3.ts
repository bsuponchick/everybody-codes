import { calculateNextThickness, calculateTotalArea, Level } from './8.3.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let countOfPriests = 0;
const countOfAcolytes = test ? 5 : 10;
const initialBlocks = test ? 160 : 202400000;



const levels: Level[] = [];

const execute = () => {
    console.log(`There are ${countOfPriests} priests`);
    console.log(`There are ${countOfAcolytes} acolytes`);
    console.log(`There are ${initialBlocks} starting materials`);

    let thicknessOfPreviousLevel = 1;
    let widthOfPreviousLevel = 1;
    let totalArea = 1;

    levels.push({ height: thicknessOfPreviousLevel, width: widthOfPreviousLevel });

    while (initialBlocks > totalArea) {
        widthOfPreviousLevel += 2;
        thicknessOfPreviousLevel = calculateNextThickness({ previousThickness: thicknessOfPreviousLevel, countOfPriests, countOfAcolytes });
        
        levels.push({ height: thicknessOfPreviousLevel, width: widthOfPreviousLevel });
        totalArea = calculateTotalArea(levels, countOfAcolytes, countOfPriests);
        if (debug) {
            console.log(`Layer ${levels.length} has a total area of ${totalArea}`);
        }
    }

    const additionalBlocksRequired = totalArea - initialBlocks;
    console.log(`Additional blocks required: ${additionalBlocksRequired}`);
}

const parseLine = (line: string) => {
   countOfPriests = Number(line);
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