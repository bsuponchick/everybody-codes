import { Forest, generateForestFromStamps } from './9.2.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const sparkballs: number[] = [];
const stamps: number[] = [30, 25, 24, 20, 16, 15, 10, 5, 3, 1];

const execute = () => {
    let totalBeetlesRequired = 0;
    sparkballs.sort((a, b) => b - a);
    const highestSparkball = sparkballs[0];

    console.log(`Highest sparkball: ${highestSparkball}`);

    const forest = generateForestFromStamps({ stamps, maxValue: highestSparkball });

    sparkballs.forEach((sparkball) => {
        const shortestPathLength = forest.getShortestPathLengthFromRootToNodeValue(sparkball);
        if (debug) {
            console.log(`Shortest path length for sparkball ${sparkball}: ${shortestPathLength}`);
        }
        totalBeetlesRequired += shortestPathLength;
    });

    console.log(`Total beetles required: ${totalBeetlesRequired}`);
}

const parseLine = (line: string) => {
   sparkballs.push(Number(line));
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