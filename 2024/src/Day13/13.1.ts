import { Node, Graph, Edge } from '../utils/dijkstra/dijkstra';
import { determineWeight } from './13.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: string[][] = [];
const nodeMap: Node[][] = [];

const execute = () => {
    const graph: Graph = new Graph();
    let startingNode: Node = null;
    let endingNode: Node = null;
    let nodeIndex = 0;

    map.forEach((row, rowIndex) => {
        nodeMap.push([]);
        row.forEach((cell, colIndex) => {
            if (cell === '#' || cell === ' ') {
                nodeMap[rowIndex].push(null);
            } else {
                const node = new Node({ id: nodeIndex });
                nodeMap[rowIndex].push(node);
                graph.addNode(node);

                if (cell === 'S') {
                    startingNode = node;
                    map[rowIndex][colIndex] = '0';
                }
                if (cell === 'E') {
                    endingNode = node;
                    map[rowIndex][colIndex] = '0';
                }
                
                nodeIndex++;
            }
        });
    });

    nodeMap.forEach((row, rowIndex) => {
        row.forEach((node, colIndex) => {
            if (node !== null) {
                const currentElevation = Number(map[rowIndex][colIndex]);

                // Add north edge if not on top row and north node is not null
                if (rowIndex > 0 && nodeMap[rowIndex - 1][colIndex] !== null) {
                    const northNode = nodeMap[rowIndex - 1][colIndex];

                    if (!node.alreadyConnectedTo(northNode)) {
                        const northElevation = Number(map[rowIndex - 1][colIndex]);
                        const weight = determineWeight(currentElevation, northElevation);
                        graph.addEdge(new Edge({ start: node, end: northNode, weight }));
                    }
                }
                // Add east edge if not on right column and east node is not null
                if (colIndex < row.length - 1 && nodeMap[rowIndex][colIndex + 1] !== null) {
                    const eastNode = nodeMap[rowIndex][colIndex + 1];
                    
                    if (!node.alreadyConnectedTo(eastNode)) {
                        const eastElevation = Number(map[rowIndex][colIndex + 1]);
                        const weight = determineWeight(currentElevation, eastElevation);
                        graph.addEdge(new Edge({ start: node, end: eastNode, weight }));
                    }
                }
                // Add south edge if not on bottom row and south node is not null
                if (rowIndex < nodeMap.length - 1 && nodeMap[rowIndex + 1][colIndex] !== null) {
                    const southNode = nodeMap[rowIndex + 1][colIndex];

                    if (!node.alreadyConnectedTo(southNode)) {
                        const southElevation = Number(map[rowIndex + 1][colIndex]);
                        const weight = determineWeight(currentElevation, southElevation);
                        graph.addEdge(new Edge({ start: node, end: southNode, weight }));
                    }
                }
                // Add west edge if not on left column and west node is not null
                if (colIndex > 0 && nodeMap[rowIndex][colIndex - 1] !== null) {
                    const westNode = nodeMap[rowIndex][colIndex - 1];

                    if (!node.alreadyConnectedTo(westNode)) {
                        const westElevation = Number(map[rowIndex][colIndex - 1]);
                        const weight = determineWeight(currentElevation, westElevation);
                        graph.addEdge(new Edge({ start: node, end: westNode, weight }));
                    }
                }
            }
        });
    });

    const shortestPath = graph.findShortestPath(startingNode, endingNode);
    console.log(`The shortest path is ${shortestPath.distance}`);
    console.log(`The path is ${shortestPath.path.map((node) => node.id).join(', ')}`);
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