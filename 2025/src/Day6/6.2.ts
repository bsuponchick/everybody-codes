import { isValidMentor } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const knights: string[] = [];

const execute = () => {
    let countOfValidMentorPairs = 0;
    const swordsmen = knights.filter((knight) => knight.toLowerCase() === 'a');
    const archers = knights.filter((knight) => knight.toLowerCase() === 'b');
    const magicians = knights.filter((knight) => knight.toLowerCase() === 'c');

    [swordsmen, archers, magicians].forEach((knights) => {
        for (let i = 0; i < knights.length; i++) {
            const knight = knights[i];

            // Determine if the knight is mentor or a student
            if (knight.charCodeAt(0) >= 65 && knight.charCodeAt(0) <= 90) {
                // The knight is a mentor, do nothing
            } else {
                // The knight is a student
                console.log(`Student at index ${i}: ${knight}`);
                for (let j = 0; j < i; j++) {
                    console.log(`Checking mentor at index ${j}: ${knights[j]}`);
                    if (isValidMentor({ mentor: knights[j], student: knight})) {
                        console.log(`Valid mentor pair found: ${knights[j]} at index ${j}`);
                        countOfValidMentorPairs++;
                    }
                }
            }
        }
    });

    console.log(`The count of valid mentor pairs is ${countOfValidMentorPairs}`);
}

const parseLine = (line: string) => {
    line.split('').forEach(char => {
        knights.push(char);
    });
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