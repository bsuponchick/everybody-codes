const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let blocksRemaining: number = 0;

const execute = () => {
    console.log(`There are ${blocksRemaining} blocks to begin with`);

    let blocksRequiredForNextLevel = 1;

    while (blocksRemaining >= blocksRequiredForNextLevel) {
        blocksRemaining -= blocksRequiredForNextLevel;
        blocksRequiredForNextLevel += 2;
    }

    const additionalBlocksRequired = blocksRequiredForNextLevel - blocksRemaining;
    console.log(`Additional blocks required: ${additionalBlocksRequired}`);

    const product = additionalBlocksRequired * blocksRequiredForNextLevel;
    console.log(`The product is ${product}`);
}

const parseLine = (line: string) => {
    blocksRemaining = Number(line);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};