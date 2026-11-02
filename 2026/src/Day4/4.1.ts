import { QuestResults, QuestResult, scoreQuest } from './4.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let questResults = {};

const execute = () => {
    let checksum = scoreQuest(questResults[1].results);
    console.log(`The final checksum is ${checksum}`);
};

const parseLine = (line: string) => {
    let parts = line.split(' ');
    const contestantId = Number.parseInt(parts[0].replace('id=', ''));
    const questId = Number.parseInt(parts[1].replace('quest=', ''));
    const part = Number.parseInt(parts[2].replace('part=', ''));
    const time = Number.parseInt(parts[3].replace('time=', ''));

    if (questResults[questId]) {
        questResults[questId].results.push({
            id: contestantId,
            quest: questId,
            part,
            time,
        });
    } else {
        questResults[questId] = {
            id: questId,
            results: [
                {
                    id: contestantId,
                    quest: questId,
                    part,
                    time,
                },
            ],
        };
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
