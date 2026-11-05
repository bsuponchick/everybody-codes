import { parseChainsOfEnts, determineEnergyFromChain } from './8.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let field: string[][] = [];

const execute = () => {
    let chainsOfEnts: number[][] = parseChainsOfEnts(field);

    console.log(`There are ${chainsOfEnts.length} chains of ents`);
    console.log(`Chains are ${JSON.stringify(chainsOfEnts)}`);

    let countEntsReceivingEnergy = 0;

    chainsOfEnts.forEach((chain) => {
        console.log(`Evaluating chain ${JSON.stringify(chain)}`);
        countEntsReceivingEnergy += determineEnergyFromChain(chain);
    });

    console.log(`The total count of ents receiving energy is ${countEntsReceivingEnergy}`);
}

const parseLine = (line: string) => {
   field.push(line.split(''));
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