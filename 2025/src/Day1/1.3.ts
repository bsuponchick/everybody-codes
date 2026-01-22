const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const names: string[] = [];
const instructions: string[] = [];

const print = (names: string[]) => {
    console.log(names.join(', '));
}

const execute = () => {
    console.log(`Names: ${names.join(', ')}`);
    console.log(`Instructions: ${instructions.join(', ')}`);
    
    const steps: number[] = [];

    for (const instruction of instructions) {
        if (instruction.startsWith('L')) {
            steps.push(parseInt(instruction.substring(1)) * -1);
        } else if (instruction.startsWith('R')) {
            steps.push(parseInt(instruction.substring(1)));
        }
    }

    print(names);

    steps.forEach((step) => {
        let index = 0;

        if (step > 0) {
            for (let i = 0; i < step; i++) {
                index++;

                if (index > names.length - 1) {
                    index = 0;
                }
            }
        } else {
            for (let i = step; i < 0; i++) {
                index--;

                if (index < 0) {
                    index = names.length - 1;
                }
            }
        }

        console.log(`Current node: ${names[index]}`);
        
        const firstName = names[0];
        const nameToReplace = names[index];
        names[index] = firstName;
        names[0] = nameToReplace;

        print(names);
    });

    console.log(`Our parent's name is ${names[0]}`);
}

const parseLine = (line: string) => {
    if (line.length === 0) {
        return;
    }
    if (names.length === 0) {
        line.split(',').map(name => names.push(name.trim()));
    } else {
        line.split(',').map(instruction => instructions.push(instruction.trim()));
    }

};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input3.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export { };