const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let nails: number[] = [];

const execute = () => {
    console.log(`There are ${nails.length} nails`);

    nails.sort((a, b) => a - b);

    let lowestDifference = Number.MAX_VALUE;

    for (let i = 0; i < nails.length; i++) {
        let totalDifference = 0;
        for (let j = 0; j < nails.length; j++) {
            totalDifference += Math.abs(nails[i] - nails[j]);
        }
        if (totalDifference < lowestDifference) {
            lowestDifference = totalDifference;
        }
    }

    console.log(`The lowest difference is ${lowestDifference}`);
}

const parseLine = (line: string) => {
   nails.push(Number(line));
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