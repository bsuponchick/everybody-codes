import { parseChainsOfEntsFromNorthwest, parseChainOfEntsFromEast, parseChainsOfEntsFromNortheast, parseChainsOfEntsFromSoutheast, parseChainsOfEntsFromSouthwest, parseChainsOfEntsFromWest, determineEnergyFromChain } from './8.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let field: string[][] = [];

const execute = () => {
    let energyFromNorthwest = 0;
    let energyFromNortheast = 0;
    let energyFromEast = 0;
    let energyFromSoutheast = 0;
    let energyFromSouthwest = 0;
    let energyFromWest = 0;
    
    parseChainsOfEntsFromNorthwest(field).forEach((chain) => {
        energyFromNorthwest += determineEnergyFromChain(chain);
    });

    parseChainsOfEntsFromNortheast(field).forEach((chain) => {
        energyFromNortheast += determineEnergyFromChain(chain);
    });

    parseChainOfEntsFromEast(field).forEach((chain) => {
        energyFromEast += determineEnergyFromChain(chain);
    });

    parseChainsOfEntsFromSoutheast(field).forEach((chain) => {
        energyFromSoutheast += determineEnergyFromChain(chain);
    });

    parseChainsOfEntsFromSouthwest(field).forEach((chain) => {
        energyFromSouthwest += determineEnergyFromChain(chain);
    });

    parseChainsOfEntsFromWest(field).forEach((chain) => {
        energyFromWest += determineEnergyFromChain(chain);
    });

    

    console.log(`The total count of ents receiving energy from the northwest is ${energyFromNorthwest}`);
    console.log(`The total count of ents receiving energy from the northeast is ${energyFromNortheast}`);
    console.log(`The total count of ents receiving energy from the east is ${energyFromEast}`);
    console.log(`The total count of ents receiving energy from the southeast is ${energyFromSoutheast}`);
    console.log(`The total count of ents receiving energy from the southwest is ${energyFromSouthwest}`);
    console.log(`The total count of ents receiving energy from the west is ${energyFromWest}`);

    console.log(`The total count of ents receiving energy is ${
        energyFromNorthwest + energyFromNortheast + energyFromEast + energyFromSoutheast + energyFromSouthwest + energyFromWest
    }`);
}

const parseLine = (line: string) => {
   field.push(line.split(''));
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