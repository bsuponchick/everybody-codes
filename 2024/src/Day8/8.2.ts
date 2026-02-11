import { calculateNextThickness } from './8.2.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let countOfPriests = 0;
const countOfAcolytes = test ? 5 : 1111;
let blocksRemaining = test ? 50 : 20240000;

const execute = () => {
    console.log(`There are ${countOfPriests} priests`);
    console.log(`There are ${countOfAcolytes} acolytes`);
    console.log(`There are ${blocksRemaining} starting materials`);

    let thicknessOfNextLevel = 1;
    let widthOfNextLevel = 1;

    while (blocksRemaining >= (widthOfNextLevel * thicknessOfNextLevel)) {
        blocksRemaining -= (widthOfNextLevel * thicknessOfNextLevel);
        widthOfNextLevel += 2;
        thicknessOfNextLevel = calculateNextThickness({ previousThickness: thicknessOfNextLevel, countOfPriests, countOfAcolytes });
    }

    const additionalBlocksRequired = (widthOfNextLevel * thicknessOfNextLevel) - blocksRemaining;
    console.log(`Additional blocks required: ${additionalBlocksRequired}`);

    const product = additionalBlocksRequired * widthOfNextLevel;
    console.log(`The product is ${product}`);
}

const parseLine = (line: string) => {
   countOfPriests = Number(line);
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