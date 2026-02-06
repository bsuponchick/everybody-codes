const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let nails: number[] = [];

const execute = () => {
    console.log(`There are ${nails.length} nails`);

    nails.sort((a, b) => a - b);

    const lowestNail = nails[0];

    let totalDifferenceBetweenNails = 0;
    nails.forEach((nail, index) => {
        if (index !== 0) {
            totalDifferenceBetweenNails += (nail - nails[0]);
        }
    });

    console.log(`The total difference between the nails is ${totalDifferenceBetweenNails}`);
}

const parseLine = (line: string) => {
   nails.push(Number(line));
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