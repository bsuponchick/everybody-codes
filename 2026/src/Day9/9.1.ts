import { Plant } from './9.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const plants: Plant[] = [];

const execute = () => {
    let totalGrowthTime = 0;

    plants.forEach((plant, index) => {
        const plantGrowthTime = plant.growToFullSize();

        console.log(`Plant ${index + 1}: ${plantGrowthTime} seconds`);

        totalGrowthTime += plantGrowthTime;
    });

    console.log(`The total required time for all plants to grow to full size it ${totalGrowthTime}`);
}

const parseLine = (line: string) => {
   const parts = line.split(', ');
   plants.push(new Plant({
        id: Number.parseInt(parts[0].replace(`id=`, '')),
        growth: Number.parseInt(parts[1].replace(`growth=`, '')),
        limit: Number.parseInt(parts[2].replace(`limit=`, ''))
   }));
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