import {
    parseChainsOfEntsFromNorthwest,
    parseChainsOfEntsFromEast,
    parseChainsOfEntsFromNortheast,
    parseChainsOfEntsFromSoutheast,
    parseChainsOfEntsFromSouthwest,
    parseChainsOfEntsFromWest,
    determineEnergyFromChain,
    Ent,
    growWarriors
} from './8.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let field: Ent[][] = [];
const REQUIRED_ENT_WARRIORS = 100000;

const execute = () => {
    let totalEnergyRequired = 0;
    let totalEntWarriorsGrown = 0;
    let directionOrder = ['nw', 'ne', 'e', 'se', 'sw', 'w'];
    let currentDirectionIndex = 0;
    let roundCounter = 1;

    while (totalEntWarriorsGrown < REQUIRED_ENT_WARRIORS) {
        console.log(`Executing round ${roundCounter}, direction ${directionOrder[currentDirectionIndex]}`);
        let nextDirection = directionOrder[currentDirectionIndex];
        let energyFromRound = 0;

        if (nextDirection === 'nw') {
            parseChainsOfEntsFromNorthwest(field).forEach((chain) => {           
                energyFromRound += determineEnergyFromChain(chain);
            });
        } else if (nextDirection === 'ne') {
            parseChainsOfEntsFromNortheast(field).forEach((chain) => {
                energyFromRound += determineEnergyFromChain(chain);
            });
        } else if (nextDirection === 'e') {
            parseChainsOfEntsFromEast(field).forEach((chain) => {
                energyFromRound += determineEnergyFromChain(chain);
            });
        } else if (nextDirection === 'se') {
            parseChainsOfEntsFromSoutheast(field).forEach((chain) => {
                energyFromRound += determineEnergyFromChain(chain);
            });
        } else if (nextDirection === 'sw') {
            parseChainsOfEntsFromSouthwest(field).forEach((chain) => {
                energyFromRound += determineEnergyFromChain(chain);
            });
        } else if (nextDirection === 'w') {
            parseChainsOfEntsFromWest(field).forEach((chain) => {
                energyFromRound += determineEnergyFromChain(chain);
            });
        } else {
            throw new Error(`Invalid direction detected ${nextDirection}`);
        }

        totalEnergyRequired += energyFromRound;

        const newWarriors = growWarriors(field);
        totalEntWarriorsGrown += newWarriors;
        console.log(`New warriors from the round: ${newWarriors}, total: ${totalEntWarriorsGrown}, energy: ${energyFromRound}`);

        if (currentDirectionIndex === directionOrder.length - 1) {
            currentDirectionIndex = 0;
        } else {
            currentDirectionIndex += 1;
        }

        roundCounter += 1;
    }

    console.log(`The total energy required to grow ${REQUIRED_ENT_WARRIORS} ent warriors is ${totalEnergyRequired}`);
};

const parseLine = (line: string) => {
    const row: Ent[] = [];
    line.split('').forEach((character) => {
        if (character === '.') {
            row.push(null);
        } else {
            row.push(new Ent(Number.parseInt(character)));
        }
    });

    field.push(row);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
