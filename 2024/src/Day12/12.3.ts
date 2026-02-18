import { Catapult, Meteor} from "./12.3.logic";

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const meteors: Meteor[] = [];

const execute = () => {
    console.log(`There are ${meteors.length} meteors`);

    const catapultA = new Catapult({ x: 0, y: 0});
    const catapultB = new Catapult({ x: 0, y: 1});
    const catapultC = new Catapult({ x: 0, y: 2});

    const officialRankings: number[] = [];
    let remainingMeteors: Meteor[] = [...meteors];
    
    while (remainingMeteors.length > 0) {
        const meteor = remainingMeteors.shift();
        const trajectory = meteor.getAllPositions();

        const catapultAHighestElevation = catapultA.determineHighestElevationToReachFallingMeteor(trajectory);
        const catapultBHighestElevation = catapultB.determineHighestElevationToReachFallingMeteor(trajectory);
        const catapultCHighestElevation = catapultC.determineHighestElevationToReachFallingMeteor(trajectory);

        const highestElevation = Math.max(catapultAHighestElevation.elevation, catapultBHighestElevation.elevation, catapultCHighestElevation.elevation);
        
        if (highestElevation === -1) {
            remainingMeteors.push(new Meteor({ x: meteor.startingPosition.x - 1, y: meteor.startingPosition.y - 1 }));
        } else {
            const potentialRankings: number[] = [];
        
            if (highestElevation === catapultAHighestElevation.elevation) {
                potentialRankings.push(catapultAHighestElevation.ranking);
            } 
            
            if (highestElevation === catapultBHighestElevation.elevation) {
                potentialRankings.push(catapultBHighestElevation.ranking);
            }
            
            if (highestElevation === catapultCHighestElevation.elevation) {
                potentialRankings.push(catapultCHighestElevation.ranking);
            }

            potentialRankings.sort((a, b) => a - b);

            console.log(`The potential rankings are ${potentialRankings}`);
            officialRankings.push(potentialRankings[0]);
        }
    }

    console.log(`The sum of the official rankings is ${officialRankings.reduce((a, b) => a + b, 0)}`);
}

const parseLine = (line: string) => {
    const parts = line.split(' ');
    meteors.push(new Meteor({ x: parseInt(parts[0]), y: parseInt(parts[1]) }));
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export { };
