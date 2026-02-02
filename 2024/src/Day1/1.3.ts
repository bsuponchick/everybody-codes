import { determinePotionCountForTriplet } from './1.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Triplet {
    first: string;
    second: string;
    third: string;
}

const triplets: Triplet[] = [];

const execute = () => {
    let countOfPotions = 0;

    console.log(`Triplets: ${JSON.stringify(triplets)}`);

    triplets.forEach((triplet, index) => {
        countOfPotions += determinePotionCountForTriplet(triplet);
    });

    console.log(`Count of potions: ${countOfPotions}`);
}

const parseLine = (line: string) => {
    for (let i = 0; i < line.length; i += 3) {
        triplets.push({ first: line[i], second: line[i + 1], third: line[i + 2] });
    }
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