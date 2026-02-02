const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const creatures: string[] = [];

const execute = () => {
    let countOfPotions = 0;

    creatures.forEach((creature, index) => {
        if (creature === 'A') {
            // No potions needed
        } else if (creature === 'B') {
            // 1 potion needed
            countOfPotions++;
        } else if (creature === 'C') {
            // 3 potions needed
            countOfPotions += 3;
        }
    });

    console.log(`Count of potions: ${countOfPotions}`);
}

const parseLine = (line: string) => {
    line.split('').map(creature => creatures.push(creature));
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