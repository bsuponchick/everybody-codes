import { Coordinate } from "../utils/interfaces/coordinate";
import { Catapult } from "./12.1.logic";
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const tiles: string[][] = [];

const execute = () => {
    const targets: Coordinate[] = [];
    const firingPositions: Coordinate[] = [];

    tiles.reverse().forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            if (tile === 'T') {
                targets.push({ x: colIndex, y: rowIndex});
            } else if (tile !== '.') {
                firingPositions.push({ x: colIndex, y: rowIndex});
            }
        });
    });

    targets.sort((a, b) => {
        if (a.y > b.y) {
            return -1;
        } else if (a.y < b.y) {
            return 1;
        } else {
            if (a.x > b.x) {
                return 1;
            } else if (a.x < b.x) {
                return -1;
            } else {
                return 0;
            }
        }
    });

    const catapultA = new Catapult(firingPositions[0]);
    const catapultB = new Catapult(firingPositions[1]);
    const catapultC = new Catapult(firingPositions[2]);

    const catapultOrder = [catapultC, catapultB, catapultA];
    const officialRankings: number[] = [];
    
    targets.forEach((target, index) => {
        let targetRanking = -1;
        catapultOrder.forEach((catapult) => {
            const ranking = catapult.determineRankingToReachTargets([target]);
            if (ranking[0] !== -1) {
                if (targetRanking !== -1) {
                    throw new Error(`Multiple catapults can reach target ${target.x},${target.y}`);
                }
                targetRanking = ranking[0];
            }

        });

        if (targetRanking !== -1) {
            officialRankings.push(targetRanking);
        }
    });

    console.log(`The sum of the official rankings is ${officialRankings.reduce((a, b) => a + b, 0)}`);
}

const parseLine = (line: string) => {
    if (line.indexOf('=') === -1) {
        tiles.push(line.split(''));
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

export { };
