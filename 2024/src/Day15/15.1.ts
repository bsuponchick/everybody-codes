import { Node, Graph, Edge } from '../utils/dijkstra/dijkstra';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let map: string[][] = [];
let nodeMap: Node[][] = [];
const graph: Graph = new Graph();

const execute = () => {
    let nodeIndex = 1;
    let startingNode: Node = null;
    const goalNodes: Node[] = [];
    
    // Generate the graph and node map
    map.forEach((row, rowIndex) => {
        const nodeRow: Node[] = [];

        row.forEach((cell) => {
            if (cell === '#') {
                nodeRow.push(null);
            } else {
                const node = new Node({ id: nodeIndex });
                graph.addNode(node);
                nodeRow.push(node);
                nodeIndex++;

                if (rowIndex === 0 && cell === '.') {
                    startingNode = node;
                }

                if (cell === 'H') {
                    goalNodes.push(node);
                }
            }
        });

        nodeMap.push(nodeRow);
    });

    // Connect the graph
    nodeMap.forEach((nodeRow, rowIndex) => {
        nodeRow.forEach((node, colIndex) => {
            if (node !== null) {
                if (rowIndex > 0 && nodeMap[rowIndex - 1][colIndex] !== null) {
                    const northNode = nodeMap[rowIndex - 1][colIndex];
                    if (!node.alreadyConnectedTo(northNode)) {
                        graph.addEdge(new Edge({ start: node, end: northNode, weight: 1 }));
                    }
                }
                if (colIndex < nodeRow.length - 1 && nodeMap[rowIndex][colIndex + 1] !== null) {
                    const eastNode = nodeMap[rowIndex][colIndex + 1];
                    if (!node.alreadyConnectedTo(eastNode)) {
                        graph.addEdge(new Edge({ start: node, end: eastNode, weight: 1 }));
                    }
                }
                if (rowIndex < nodeMap.length - 1 && nodeMap[rowIndex + 1][colIndex] !== null) {
                    const southNode = nodeMap[rowIndex + 1][colIndex];
                    if (!node.alreadyConnectedTo(southNode)) {
                        graph.addEdge(new Edge({ start: node, end: southNode, weight: 1 }));
                    }
                }
                if (colIndex > 0 && nodeMap[rowIndex][colIndex - 1] !== null) {
                    const westNode = nodeMap[rowIndex][colIndex - 1];
                    if (!node.alreadyConnectedTo(westNode)) {
                        graph.addEdge(new Edge({ start: node, end: westNode, weight: 1 }));
                    }
                }
            }
        });
    });

    // Find the shortest path to any goal node
    let shortestPath = Infinity;

    goalNodes.forEach((goalNode) => {
        graph.reset();

        const path = graph.findShortestPath(startingNode, goalNode);
        if (path.distance < shortestPath) {
            shortestPath = path.distance;
        }
    });

    console.log(`The shortest path to an herb an back is ${shortestPath * 2}`);
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