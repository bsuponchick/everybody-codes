import { GraphNode, Graph } from './7.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const graph = new Graph();

const execute = () => {
    graph.connectNodes();
    const mostConnectedNode = graph.getNodeWithMostConnections();
    mostConnectedNode.propogateEnergy(10);
    const totalEnergy = graph.getTotalAccumulatedEnergy();

    console.log(`There is a total of ${totalEnergy} accumulated energy`);
};

const parseLine = (line: string) => {
    const parts = line.split(', ');
    const id = parts[0].replace('id=', '');
    const energy = parts[1].replace('energy=', '');
    const connections = parts[2].replace('connections=', '').split(',');

    let node = new GraphNode(id, Number.parseInt(energy), connections);
    graph.addNode(node);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
