import { Spine } from './5.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Sword {
    identifier: number;
    values: number[];
    quality: number;
    spine: Spine;
}

let swords: Sword[] = [];

const execute = () => {
    for (const sword of swords) {
        for (const value of sword.values) {
            sword.spine.add(value);
        }
        sword.quality = sword.spine.getQuality();
    }
    
    swords.sort((a, b) => {
        if (b.quality > a.quality) {
            return 1;
        } else if (a.quality > b.quality) {
            return -1;
        } else {
            // The swords have the same quality, continue logic for comparison
            const aTriplets = a.spine.getTriplets();
            const bTriplets = b.spine.getTriplets();

            for (let i = 0; i < aTriplets.length; i++) {
                const aTriplet = Number.parseInt(`${aTriplets[i].getLeft() || ''}${aTriplets[i].getCenter()}${aTriplets[i].getRight() || ''}`);
                const bTriplet = Number.parseInt(`${bTriplets[i].getLeft() || ''}${bTriplets[i].getCenter()}${bTriplets[i].getRight() || ''}`);
                if (bTriplet > aTriplet) {
                    return 1;
                } else if (aTriplet > bTriplet) {
                    return -1;
                }
            }

            // If the b sword has more triplets after comparison to all the a triplets, then b is better
            if (bTriplets.length > aTriplets.length) {
                return 1;
            }

            // At this point, the swords have the same quality and the same triplets, so we need to compare the identifiers
            return b.identifier - a.identifier;
        }
    });

    console.log(`Swords: ${swords.map(sword => `${sword.identifier}: ${sword.quality}`).join(', ')}`);
    
    // Now we need to calculate the checksums
    let sumOfChecksums = 0;

    for (let i = 0; i < swords.length; i++) {
        sumOfChecksums += swords[i].identifier * (i + 1);
    }

    console.log(`The sum of checksums is ${sumOfChecksums}`);
}

const parseLine = (line: string) => {
    const parts = line.split(':');
    swords.push({
        identifier: parseInt(parts[0], 10),
        values: parts[1].split(',').map(value => parseInt(value, 10)),
        quality: 0,
        spine: new Spine()
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