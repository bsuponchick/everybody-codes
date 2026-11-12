import { identifyPolygons, calculateHeightOfRectangle, calculateWidthOfRectangle } from './12.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let map: string[][] = [];

const execute = () => {
    const polygons = identifyPolygons(map);

    console.log(`There are ${polygons.length} polygons in the map`);

    let spellsRequired = 0;

    polygons.forEach((polygon) => {
        const heightOfPolygon = calculateHeightOfRectangle(polygon);
        const widthOfPolygon = calculateWidthOfRectangle(polygon);

        if (debug) {
            console.log(`Evaluating polygon ${JSON.stringify(polygon)}`);
            console.log(`Height: ${heightOfPolygon}`);
            console.log(`Width: ${widthOfPolygon}`);
        }

        if (heightOfPolygon < widthOfPolygon) {
            spellsRequired += heightOfPolygon;
        } else {
            spellsRequired += widthOfPolygon;
        }
    });

    console.log(`${spellsRequired} spells are required.`);
}

const parseLine = (line: string) => {
   map.push(line.split(''));
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