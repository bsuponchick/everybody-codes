import { TreeSegment, TreeSegmentDirection } from './14.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Instruction {
    direction: TreeSegmentDirection;
    distance: number;
}

const instructions: Instruction[] = [];
const treeSegments: TreeSegment[] = [];

const execute = () => {
    console.log(`There are ${instructions.length} instructions`);

    const startingSegment = new TreeSegment({
        x: 0,
        y: 0,
        z: 0,
        t: 0,
    });

    treeSegments.push(startingSegment);
    let currentSegment = startingSegment;
    
    for (const instruction of instructions) {
        for (let i = 0; i < instruction.distance; i++) {
            currentSegment = currentSegment.grow(instruction.direction);
            treeSegments.push(currentSegment);
        }
    }

    console.log(`There are ${treeSegments.length} tree segments`);
    treeSegments.sort((a, b) => {
        if (a.z > b.z) {
            return 1;
        } else if (a.z < b.z) {
            return -1;
        } else {
            return 0;
        }
    });

    console.log(`The highest z value is ${treeSegments[treeSegments.length - 1].z}`);
}

const parseLine = (line: string) => {
    const parts = line.split(',');

    parts.forEach((part) => {
        instructions.push({
            direction: part.charAt(0) as TreeSegmentDirection,
            distance: parseInt(part.substring(1)),
        });
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