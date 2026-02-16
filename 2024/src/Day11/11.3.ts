const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const lifecycles: Map<string, string[]> = new Map();
const MAX_LIFECYCLE = 20;

const execute = () => {
    let highestPopulation = 0;
    let lowestPopulation = Infinity;

    lifecycles.forEach((value, startingTermite) => {
        console.log(`Checking with starting termite: ${startingTermite}`);
        let currentGeneration: Map<string, number> = new Map();
        currentGeneration.set(startingTermite, 1);

        for (let lifecycle = 0; lifecycle < MAX_LIFECYCLE; lifecycle++) {
            const nextGeneration: Map<string, number> = new Map();
        
            currentGeneration.forEach((value, termite) => {
                const newTermites = lifecycles.get(termite);

                newTermites.forEach((newTermite) => {
                    if (nextGeneration.has(newTermite)) {
                        nextGeneration.set(newTermite, nextGeneration.get(newTermite) + value);
                    } else {
                        nextGeneration.set(newTermite, value);
                    }
                });      
            });
            currentGeneration = nextGeneration;
        }

        const population = Array.from(currentGeneration.values()).reduce((a, b) => a + b, 0);

        if (population > highestPopulation) {
            highestPopulation = population;
        }

        if (population < lowestPopulation) {
            lowestPopulation = population;
        }

        console.log(`Starting termite: ${startingTermite} led to population of ${population}`);
    });
    
    console.log(`The highest population is ${highestPopulation}`);
    console.log(`The lowest population is ${lowestPopulation}`);
    console.log(`The difference in population is ${highestPopulation - lowestPopulation}`);
}

const parseLine = (line: string) => {
   const parts = line.split(':');
   lifecycles.set(parts[0], parts[1].split(','));
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