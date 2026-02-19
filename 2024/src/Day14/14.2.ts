import { TreeSegment, TreeSegmentDirection } from './14.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Instruction {
    direction: TreeSegmentDirection;
    distance: number;
}

const plans: Instruction[][] = [];
const treeSegments: TreeSegment[] = [];

const execute = () => {
    const startingSegment = new TreeSegment({
        x: 0,
        y: 0,
        z: 0,
        t: 0,
    });

    let planIndex = 1;
    for (const plan of plans) {
        let currentSegment = startingSegment;
        let countOfSegmentsInPlan = 0;

        for (const instruction of plan) {
            for (let i = 0; i < instruction.distance; i++) {
                currentSegment = currentSegment.grow(instruction.direction);
                if (!treeSegments.find((segment) => segment.x === currentSegment.x && segment.y === currentSegment.y && segment.z === currentSegment.z)) {
                    treeSegments.push(currentSegment);
                    countOfSegmentsInPlan++;
                }
            }
        }

        console.log(`There are ${countOfSegmentsInPlan} tree segments in plan ${planIndex}`);
        planIndex++;
    }

    console.log(`There are ${treeSegments.length} tree segments in total`);

}

const parseLine = (line: string) => {
    const parts = line.split(',');
    const plan: Instruction[] = [];
    parts.forEach((part) => {
        plan.push({
            direction: part.charAt(0) as TreeSegmentDirection,
            distance: parseInt(part.substring(1)),
        });
    });
    plans.push(plan);
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