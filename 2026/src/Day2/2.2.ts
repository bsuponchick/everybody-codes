import { sortAlloys, parseRules, Rule } from './2.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let alloyGroups: string[] = [];
let checksum = 0;

const execute = () => {
    alloyGroups.forEach((group, index) => {
        let groupRules: Rule[] = parseRules(group);
        let sortedAlloys = sortAlloys(groupRules);

        if (debug) {
            console.log(`The sorted alloys for group ${index} is ${JSON.stringify(sortedAlloys)}`);
        }
        
        checksum = checksum + (Number.parseInt(sortedAlloys.toString().replaceAll(',', '')));
    });

    console.log(`The final checksum is ${checksum}`);
}

const parseLine = (line: string) => {
   alloyGroups.push(line);
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