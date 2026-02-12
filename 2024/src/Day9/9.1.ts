const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const sparkballs: number[] = [];

const execute = () => {
    let totalBeetlesRequired = 0;

    sparkballs.forEach((sparkball) => {
        let currentSpark = 0;

        while (currentSpark < sparkball) {
            let difference = sparkball - currentSpark;

            if (difference >= 10) {
                currentSpark += 10;
            } else if (difference >= 5) {
                currentSpark += 5;
            } else if (difference >= 3) {
                currentSpark += 3;
            } else {
                currentSpark += 1;
            }

            totalBeetlesRequired++;
        }
    });

    console.log(`Total beetles required: ${totalBeetlesRequired}`);
}

const parseLine = (line: string) => {
   sparkballs.push(Number(line));
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