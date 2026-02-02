import { determinePotionCountForPair } from './1.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Pair {
    first: string;
    second: string;
}

const pairs: Pair[] = [];

const execute = () => {
    let countOfPotions = 0;

    console.log(`Pairs: ${JSON.stringify(pairs)}`);

    pairs.forEach((pair, index) => {
        countOfPotions += determinePotionCountForPair(pair);
    });

    console.log(`Count of potions: ${countOfPotions}`);
}

const parseLine = (line: string) => {
    for (let i = 0; i < line.length; i += 2) {
        pairs.push({ first: line[i], second: line[i + 1] });
    }
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