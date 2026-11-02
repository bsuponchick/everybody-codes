import { ParticipantQuestResults, scoreTotalParts } from './4.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let questResults: ParticipantQuestResults[] = [];

const execute = () => {
    console.log(`questResults is ${JSON.stringify(questResults)}`);
    let checksum = scoreTotalParts(questResults);
    console.log(`The final checksum is ${checksum}`);
};

const parseLine = (line: string) => {
    let parts = line.split(' ');
    const contestantId = Number.parseInt(parts[0].replace('id=', ''));
    const questId = Number.parseInt(parts[1].replace('quest=', ''));
    const part = Number.parseInt(parts[2].replace('part=', ''));
    const time = Number.parseInt(parts[3].replace('time=', ''));

    let existingParticipantResult = questResults.find((result) => result.participantId === contestantId);

    if (existingParticipantResult) {
        existingParticipantResult.partsCompleted +=1;
        existingParticipantResult.totalTime += time;
    } else {
        questResults.push({
            participantId: contestantId,
            partsCompleted: 1,
            totalTime: time
        });
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
