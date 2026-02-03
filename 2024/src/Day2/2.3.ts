import { connectRunes, Rune } from './2.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const words: string[] = [];
let messages: string[] = [];

const execute = () => {
    const runes: Rune[][] = [];
    for (let y = 0; y < messages.length; y++) {
        runes.push([]);
        for (let x = 0; x < messages[y].length; x++) {
            runes[y].push(new Rune(messages[y][x]));
        }
    }
    console.log(`The runes are ${JSON.stringify(runes)}`);

    connectRunes(runes);

    for (const word of words) {
        console.log(`Evaluating word: ${word}`);

        runes.forEach((row) => {
            row.forEach((rune) => {
                // Start off by evaluating the runes for a matching word to the right
                let runesToCheck: Rune[] = [];
                for (let i = 0; i < word.length; i++) {
                    let runeToCheck = rune;
                    for (let j = 0; j < runesToCheck.length; j++) {
                        runeToCheck = runeToCheck.getEast();
                    }
                    runesToCheck.push(runeToCheck);
                }

                let match = true;
                runesToCheck.forEach((runeToCheck, index) => {
                    if (runeToCheck.getValue() !== word[index]) {
                        match = false;
                    }
                });

                if (match) {
                    console.log(`The word ${word} was found in the runes going left to right.`);
                    runesToCheck.forEach((runeToCheck) => {
                        runeToCheck.setMatched(true);
                    });
                }

                // Now evaluate the runes for a matching word going right to left
                runesToCheck = [];
                for (let i = 0; i < word.length; i++) {
                    let runeToCheck = rune;
                    for (let j = 0; j < runesToCheck.length; j++) {
                        runeToCheck = runeToCheck.getWest();
                    }
                    runesToCheck.push(runeToCheck);
                }

                match = true;
                runesToCheck.forEach((runeToCheck, index) => {
                    if (runeToCheck.getValue() !== word[index]) {
                        match = false;
                    }
                });

                if (match) {
                    console.log(`The word ${word} was found in the runes going right to left.`);
                    runesToCheck.forEach((runeToCheck) => {
                        runeToCheck.setMatched(true);
                    });
                }

                // Now evaluate the runes for a matching word going up
                runesToCheck = [];
                for (let i = 0; i < word.length; i++) {
                    let runeToCheck = rune;
                    for (let j = 0; j < runesToCheck.length; j++) {
                        runeToCheck = runeToCheck.getNorth();
                    }
                    if (runeToCheck !== null) {
                        runesToCheck.push(runeToCheck);
                    }
                }
                
                match = runesToCheck.length >= word.length;
                runesToCheck.forEach((runeToCheck, index) => {
                    if (runeToCheck.getValue() !== word[index]) {
                        match = false;
                    }
                });
                
                if (match) {
                    console.log(`The word ${word} was found in the runes going up.`);
                    runesToCheck.forEach((runeToCheck) => {
                        runeToCheck.setMatched(true);
                    });
                }

                // Now evaluate the runes for a matching word going down
                runesToCheck = [];
                for (let i = 0; i < word.length; i++) {
                    let runeToCheck = rune;
                    for (let j = 0; j < runesToCheck.length; j++) {
                        runeToCheck = runeToCheck.getSouth();
                    }
                    if (runeToCheck !== null) {
                        runesToCheck.push(runeToCheck);
                    }
                }
                
                match = runesToCheck.length >= word.length;
                runesToCheck.forEach((runeToCheck, index) => {
                    if (runeToCheck.getValue() !== word[index]) {
                        match = false;
                    }
                });
                
                
                if (match) {
                    console.log(`The word ${word} was found in the runes going down.`);
                    runesToCheck.forEach((runeToCheck) => {
                        runeToCheck.setMatched(true);
                    });
                }
            });
        });
    }

    let countOfMatchedRuness = 0;
    runes.forEach((row) => {
        row.forEach((rune) => {
            if (rune.getMatched()) {
                countOfMatchedRuness++;
            }
        });
    });
    console.log(`The count of matched runes is ${countOfMatchedRuness}`);
}

const parseLine = (line: string) => {
    if (line.startsWith('WORDS:')) {
        line = line.replace('WORDS:', '').trim();
        line.split(',').map(word => {
            words.push(word.trim());
        });
    } else if (line.trim().length > 0) {
        messages.push(line);
    }
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
