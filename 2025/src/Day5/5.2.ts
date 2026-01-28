import { Spine } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Sword {
    identifier: number;
    values: number[];
    quality: number;
}

let swords: Sword[] = [];

const execute = () => {
    for (const sword of swords) {
        const spine = new Spine();
        for (const value of sword.values) {
            spine.add(value);
        }
        sword.quality = spine.getQuality();
    }
    
    swords.sort((a, b) => b.quality - a.quality);
    const diffInQuality = swords[0].quality - swords[swords.length - 1].quality;
    console.log(`The difference in quality is ${diffInQuality}`);
}

const parseLine = (line: string) => {
    const parts = line.split(':');
    swords.push({
        identifier: parseInt(parts[0], 10),
        values: parts[1].split(',').map(value => parseInt(value, 10)),
        quality: 0
    });
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