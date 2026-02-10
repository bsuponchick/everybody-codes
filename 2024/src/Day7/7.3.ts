import { TrackInput, connectTrackInputs, determineTrackActionsInOrder, runTheTrack, permute } from './7.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Result {
    id: string;
    energies: number[];
    totalEnergy: number;
}

const trackInput: TrackInput[][] = [];
let countWinningStrategies = 0;

let opponentStrategy: string[] = [];
const checkecStrategies: Map<string, boolean> = new Map();

const execute = () => {
    connectTrackInputs(trackInput);

    const trackActions = determineTrackActionsInOrder(trackInput);

    if (debug) {
        console.log(`There are ${trackActions.length} track actions`);
        console.log(`The track actions are ${trackActions.join('')}`);
    }

    const opponentTotalEnergy = runTheTrack(trackActions, opponentStrategy);
    console.log(`The opponent total energy is ${opponentTotalEnergy}`);

    for (const permutation of permute(['+', '+', '+', '+', '+', '-', '-', '-', '=', '=', '='])) {
        let hash = permutation.join('');
        if (!checkecStrategies.has(hash)) {
            checkecStrategies.set(hash, true);

            if (debug) {
                console.log(`Evaluating permutation: ${permutation.join('')}`);
            }
            const totalEnergy = runTheTrack(trackActions, permutation);
            if (totalEnergy > opponentTotalEnergy) {
                countWinningStrategies++;
                if (debug) {
                    console.log(`Winning strategy found`);
                }
            }
        }
    }

    console.log(`There are ${countWinningStrategies} winning strategies`);
}

const parseLine = (line: string) => {
    const parts = line.split(':');
    opponentStrategy = parts[1].split(',');
};

const parseTrackLine = (line: string) => {
    if (debug) {
        console.log(`Parsing track line: ${line}`);
    }

    let row: TrackInput[] = [];
    line.split('').forEach((char) => {
        if (char !== ' ') {
            row.push({ value: char, visited: false, neighbors: [] });
        } else {
            row.push(null);
        }
    });
    trackInput.push(row);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt')
});



lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    var trackReader = require('readline').createInterface({
        input: require('fs').createReadStream('./track3.txt')
    });

    trackReader.on('line', (line) => {
        parseTrackLine(line);
    }).on('close', () => {
        execute();
    });
});

export {};