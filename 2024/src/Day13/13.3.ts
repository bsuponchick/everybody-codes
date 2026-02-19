import { Node, Graph, Edge } from '../utils/dijkstra/dijkstra';
import { determineWeight } from './13.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const map: string[][] = [];
const nodeMap: Node[][] = [];

const execute = () => {
    const graph: Graph = new Graph();
    let endingNode: Node = null;
    let nodeIndex = 0;

    map.forEach((row, rowIndex) => {
        nodeMap.push([]);
        row.forEach((cell, colIndex) => {
            if (cell === '#' || cell === ' ' || cell === 'S') {
                nodeMap[rowIndex].push(null);
            } else {
                const node = new Node({ id: nodeIndex });
                nodeMap[rowIndex].push(node);
                graph.addNode(node);

                if (cell === 'E') {
                    endingNode = node;
                    map[rowIndex][colIndex] = '0';
                }
                
                nodeIndex++;
            }
        });
    });

    for (let rowIndex = 1; rowIndex < nodeMap.length - 1; rowIndex++) {
        const row = nodeMap[rowIndex];
        for (let colIndex = 1; colIndex < nodeMap[rowIndex].length - 1; colIndex++) {
            const node = nodeMap[rowIndex][colIndex];
            if (node !== null) {
                const currentElevation = Number(map[rowIndex][colIndex]);

                // Add north edge if not on top row and north node is not null
                if (rowIndex > 1 && nodeMap[rowIndex - 1][colIndex] !== null) {
                    const northNode = nodeMap[rowIndex - 1][colIndex];

                    if (!node.alreadyConnectedTo(northNode)) {
                        const northElevation = Number(map[rowIndex - 1][colIndex]);
                        const weight = determineWeight(currentElevation, northElevation);
                        graph.addEdge(new Edge({ start: node, end: northNode, weight }));
                    }
                }
                // Add east edge if not on right column and east node is not null
                if (colIndex < row.length - 2 && nodeMap[rowIndex][colIndex + 1] !== null) {
                    const eastNode = nodeMap[rowIndex][colIndex + 1];
                    
                    if (!node.alreadyConnectedTo(eastNode)) {
                        const eastElevation = Number(map[rowIndex][colIndex + 1]);
                        const weight = determineWeight(currentElevation, eastElevation);
                        graph.addEdge(new Edge({ start: node, end: eastNode, weight }));
                    }
                }
                // Add south edge if not on bottom row and south node is not null
                if (rowIndex < nodeMap.length - 2 && nodeMap[rowIndex + 1][colIndex] !== null) {
                    const southNode = nodeMap[rowIndex + 1][colIndex];

                    if (!node.alreadyConnectedTo(southNode)) {
                        const southElevation = Number(map[rowIndex + 1][colIndex]);
                        const weight = determineWeight(currentElevation, southElevation);
                        graph.addEdge(new Edge({ start: node, end: southNode, weight }));
                    }
                }
                // Add west edge if not on left column and west node is not null
                if (colIndex > 1 && nodeMap[rowIndex][colIndex - 1] !== null) {
                    const westNode = nodeMap[rowIndex][colIndex - 1];

                    if (!node.alreadyConnectedTo(westNode)) {
                        const westElevation = Number(map[rowIndex][colIndex - 1]);
                        const weight = determineWeight(currentElevation, westElevation);
                        graph.addEdge(new Edge({ start: node, end: westNode, weight }));
                    }
                }
            }
        }
    }

    let shortestPath: {distance: number, path: Node[]} = {distance: Infinity, path: []};

    console.log(`Starting to test for starting nodes...`);
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        for (let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
            console.log(`Testing for starting node at row ${rowIndex} and column ${colIndex}`);
            if (rowIndex === 0 && (colIndex === 0 || colIndex === map[rowIndex].length - 1)) {
                console.log(`Skipping starting node at row ${rowIndex} and column ${colIndex} because it is on the edge`);
                continue;
            }

            if (rowIndex === map.length - 1 && (colIndex === 0 || colIndex === map[rowIndex].length - 1)) {
                console.log(`Skipping starting node at row ${rowIndex} and column ${colIndex} because it is on the edge`);
                continue;
            }

            if (map[rowIndex][colIndex] === 'S') {
                graph.reset();
                const startingNode = new Node({ id: nodeIndex });
                nodeIndex++;

                graph.addNode(startingNode);

                if (rowIndex === 0) {
                    // Add the south edge
                    const southNode = nodeMap[rowIndex + 1][colIndex];
                    if (southNode !== null) {
                        const southElevation = Number(map[rowIndex + 1][colIndex]);
                        const weight = determineWeight(0, southElevation);
                        graph.addEdge(new Edge({ start: startingNode, end: southNode, weight }));
                    }
                } else if (rowIndex === nodeMap.length - 1) {
                    // Add the north edge
                    const northNode = nodeMap[rowIndex - 1][colIndex];
                    if (northNode !== null) {
                        const northElevation = Number(map[rowIndex - 1][colIndex]);
                        const weight = determineWeight(0, northElevation);
                        graph.addEdge(new Edge({ start: startingNode, end: northNode, weight }));
                    }
                } else if (colIndex === 0) {
                    // Add the east edge
                    const eastNode = nodeMap[rowIndex][colIndex + 1];
                    if (eastNode !== null) {
                    const eastElevation = Number(map[rowIndex][colIndex + 1]);
                        const weight = determineWeight(0, eastElevation);
                        graph.addEdge(new Edge({ start: startingNode, end: eastNode, weight }));
                    }
                } else if (colIndex === nodeMap[rowIndex].length - 1) {
                    // Add the west edge
                    const westNode = nodeMap[rowIndex][colIndex - 1];
                    if (westNode !== null) {
                        const westElevation = Number(map[rowIndex][colIndex - 1]);
                        const weight = determineWeight(0, westElevation);
                        graph.addEdge(new Edge({ start: startingNode, end: westNode, weight }));
                    }
                }

                if (startingNode.edges.length > 0) {
                    const path = graph.findShortestPath(startingNode, endingNode);
                    console.log(`Path distance: ${path.distance}`);
                    if (path.distance < shortestPath.distance) {
                        shortestPath = path;
                    }
                }

                graph.removeNode(startingNode);
            }
        }
    }
    
    console.log(`The shortest path is ${shortestPath.distance}`);
    console.log(`The path is ${shortestPath.path.map((node) => node.id).join(', ')}`);
}

const parseLine = (line: string) => {
   map.push(line.split(''));
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