const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const numberOfTurns: number[] = [];
const wheels: string[][] = [];
const TURNS = 100;

const execute = () => {
    if (debug) {
        console.log(`Number of turns: ${numberOfTurns.join(', ')}`);
        console.log(`Wheels: ${wheels.map(wheel => wheel.join(', ')).join('\n')}`);
    }

    let sequence: string[] = [];

    wheels.forEach((wheel, index) => {
        const wheelTurns = numberOfTurns[index] * TURNS;
        const result = wheel[wheelTurns % wheel.length];
        sequence.push(result);
    });

    console.log(`Sequence: ${sequence.join(' ')}`);
}

const parseLine = (line: string) => {
    if (line.charAt(0).match(/[0-9]/)) {
        const numberParts = line.split(',');
        for (const numberPart of numberParts) {
            numberOfTurns.push(parseInt(numberPart));
            wheels.push([]);
        }
    } else if (line.trim().length > 0) {
        for (let i = 0; i < line.length; i+=4) {
            const segment = line.substring(i, i + 3);
            if (segment.trim().length > 0) {
                // This is a valid segment
                wheels[i / 4].push(segment);
            }
        }
    }
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