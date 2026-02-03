const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const words: string[] = [];
let messages: string[] = [];

const execute = () => {
    let countOfRunicSymbols = 0;

    console.log(`The words are ${words}`);
    console.log(`The messages are ${JSON.stringify(messages)}`);

    messages.forEach(message => {
        console.log(`Evaluating message: ${message}`);
        const symbolsMatched: boolean[] = message.split('').map(symbol => false);

        for (let word of words) {
            let countOfMatches = 0;
            const regex = new RegExp(`(?=(${word}))`, 'g');
            const matches = message.matchAll(regex);
            if (matches) {
                for (const match of matches) {
                    for (let i = 0; i < word.length; i++) {
                        symbolsMatched[i + match.index] = true;
                    }
                    countOfMatches++;
                }
            }

            console.log(`The count of matches for word ${word} is ${countOfMatches}`);
        }

        const countOfRunicSymbolsForMessage = symbolsMatched.filter(symbol => symbol).length;

        console.log(`${message}`);
        let symbolsMatchedString = '';
        symbolsMatched.forEach(symbol => {
            symbolsMatchedString += symbol ? '1' : '0';
        });
        console.log(`Symbols matched: ${symbolsMatchedString}`);

        console.log(`The count of runic symbols for message ${message} is ${countOfRunicSymbolsForMessage}`);
        countOfRunicSymbols += countOfRunicSymbolsForMessage;
    });

    console.log(`The count of runic sumbols is ${countOfRunicSymbols}`);
}

const parseLine = (line: string) => {
    if (line.startsWith('WORDS:')) {
        line = line.replace('WORDS:', '').trim();
        line.split(',').map(word => {
            words.push(word.trim());
            words.push(word.trim().split('').reverse().join(''));
        });
    } else if (line.trim().length > 0) {
        messages.push(line);
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export { };
