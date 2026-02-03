
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const words: string[] = [];
let message: string = '';

const execute = () => {
    let countOfRunicWords = 0;

    console.log(`The words are ${words}`);
    console.log(`The message is ${message}`);

    for (let word of words) {
        const regex = new RegExp(`(${word})`, 'g');
        const matches = message.match(regex);
        console.log(`The matches for ${word} are ${matches}`);
        if (matches) {
            countOfRunicWords += matches.length;
        }
    }

    console.log(`The count of runic words is ${countOfRunicWords}`);
}

const parseLine = (line: string) => {
    if (line.startsWith('WORDS:')) {
        line = line.replace('WORDS:', '').trim();
        line.split(',').map(word => words.push(word.trim()));
    } else if (line.trim().length > 0) {
        message = line;
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
