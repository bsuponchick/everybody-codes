import { GraphNode, Graph } from './7.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const graph = new Graph();
const MAX_ENERGY = test ? 100 : 1000000;

const execute = () => {
    graph.connectNodes();
    const cloud = graph.getNode('1');
    cloud.propogateEnergy(10);

    while (graph.countPendingExplosions() > 0) {
        graph.generateExplosions();
    }
    
    const totalEnergy = graph.getTotalAccumulatedEnergy();

    console.log(`There is a total of ${totalEnergy} accumulated energy`);
};

const parseLine = (line: string) => {
    const parts = line.split(', ');
    const id = parts[0].replace('id=', '');
    const energy = parts[1].replace('energy=', '');
    const connectionIds = parts[2].replace('connections=', '').split(',');

    let node = new GraphNode({id, energy: Number.parseInt(energy), connectionIds, maxEnergy: MAX_ENERGY});
    graph.addNode(node);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
