import { calculateValueOfVote, VoteParams } from './3.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const votes: VoteParams[] = [];

const execute = () => {
    let sumOfVotes = 0;

    votes.forEach((vote) => {
        sumOfVotes = sumOfVotes + calculateValueOfVote(vote);
    });

    console.log(`The sum of the votes is ${sumOfVotes}`);
}

const parseLine = (line: string) => {
    const lineMinusIso = line.replace(`ISO-`, '');
    const lineParts = lineMinusIso.split(' ');

    votes.push({
        iso: lineParts[0],
        vote: lineParts[1]
    });
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