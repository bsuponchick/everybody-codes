import { generateCacheFromStamps } from './9.3.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const sparkballs: number[] = [];
const stamps: number[] = [101, 100, 75, 74, 50, 49, 38, 37, 30, 25, 24, 20, 16, 15, 10, 5, 3, 1];

const execute = () => {
    let totalBeetlesRequired = 0;
    sparkballs.sort((a, b) => b - a);
    const highestSparkball = sparkballs[0];

    console.log(`Highest sparkball: ${highestSparkball}`);

    const halfHighestSparkballPlus100 = Math.ceil(highestSparkball / 2) + 100;
    console.log(`Half highest sparkball plus 100: ${halfHighestSparkballPlus100}`);

    const cache = generateCacheFromStamps({ stamps, maxValue: halfHighestSparkballPlus100 });
    if (debug) {
        console.log(`Cache has ${cache.size} entries`);
        cache.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
    }

    sparkballs.forEach((sparkball) => {
        let shortestPathLength = Infinity;
        const halfSparkball = Math.floor(sparkball / 2);

        for (let i = halfSparkball - 100; i <= halfSparkball + 100; i++) {
            let pathLength = cache.get(i);

            if (pathLength < Infinity) {
                const remainder = sparkball - i;

                if (halfSparkball - remainder <= 100) {
                    let remainderPathLength = cache.get(remainder);

                    if (remainderPathLength < Infinity) {
                        const totalPathLength = pathLength + remainderPathLength;
                        if (totalPathLength < shortestPathLength) {
                            shortestPathLength = totalPathLength;
                        }
                    }
                }
            }
        }

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
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};