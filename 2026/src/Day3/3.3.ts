import { VoteParams } from './3.2.logic';
import { determineValueOfVote } from './3.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const votes: VoteParams[] = [];

const execute = () => {
    let sumOfVotes = 0;

    votes.forEach((vote) => {
        sumOfVotes = sumOfVotes + determineValueOfVote(vote);
    });

    console.log(`The sum of the votes is ${sumOfVotes}`);
}

const parseLine = (line: string) => {
    const lineMinusIso = line.replace(`ISO2-`, '');
    const lineParts = lineMinusIso.split(' ');

    votes.push({
        iso: lineParts[0],
        vote: lineParts[1]
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