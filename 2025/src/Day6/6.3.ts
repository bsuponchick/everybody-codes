import { isValidMentor } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const tents: string[] = [];
const knights: string[] = [];

const REPEATS = 1000;
const RANGE = 1000;

const execute = () => {
    for (let i = 0; i < REPEATS; i++) {
        knights.push(...tents);
    }

    let countOfValidMentorPairs = 0;

    for (let i = 0; i < knights.length; i++) {
        const knight = knights[i];

        // Determine if the knight is mentor or a student
        if (knight.charCodeAt(0) >= 65 && knight.charCodeAt(0) <= 90) {
            // The knight is a mentor, do nothing
        } else {
            // The knight is a student
            // console.log(`Student at index ${i}: ${knight}`);
            let studentCount = 0;
            for (let j = i - RANGE; j < i; j++) {
                if (j >= 0) {
                    // console.log(`Checking mentor at index ${j}: ${knights[j]}`);
                    if (isValidMentor({ mentor: knights[j], student: knight})) {
                        // console.log(`Valid mentor pair found: ${knights[j]} at index ${j}`);
                        countOfValidMentorPairs++;
                        studentCount++;
                    }
                }
            }

            for (let j = i + 1; j <= i + RANGE; j++) {
                // console.log(`Checking mentor at index ${j}: ${knights[j]}`);
                if (knights.length >= j) {
                    // console.log(`Checking mentor at index ${j}: ${knights[j]}`);
                    if (isValidMentor({ mentor: knights[j], student: knight})) {
                        // console.log(`Valid mentor pair found: ${knights[j]} at index ${j}`);
                        countOfValidMentorPairs++;
                        studentCount++;
                    }
                }
            }

            console.log(`Student ${knight} at index ${i} has ${studentCount} valid mentor pairs`);
        }
    }

    console.log(`The count of valid mentor pairs is ${countOfValidMentorPairs}`);
}

const parseLine = (line: string) => {
    line.split('').forEach(char => {
        tents.push(char);
    });
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