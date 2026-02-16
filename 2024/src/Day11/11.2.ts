const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const lifecycles: Map<string, string[]> = new Map();
const MAX_LIFECYCLE = 10;

const execute = () => {
    let termites: string[] = ['Z'];
    
    for (let lifecycle = 0; lifecycle < MAX_LIFECYCLE; lifecycle++) {
        const newTermites: string[] = [];

        while (termites.length > 0) {
            const termite = termites.shift();
            newTermites.push(...lifecycles.get(termite));
        }

        termites = newTermites;
    }

    console.log(`The termites are ${termites.join(', ')}`);
    console.log(`The number of termites is ${termites.length}`);
}

const parseLine = (line: string) => {
   const parts = line.split(':');
   lifecycles.set(parts[0], parts[1].split(','));
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