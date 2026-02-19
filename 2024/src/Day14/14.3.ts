import { TreeSegment, TreeSegmentDirection } from './14.1.logic';
import { Node, Graph, Edge } from '../utils/dijkstra/dijkstra';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

interface Instruction {
    direction: TreeSegmentDirection;
    distance: number;
}

const plans: Instruction[][] = [];
const leaves: TreeSegment[] = [];
const trunk: Node[] = [];
const leafNodes: Node[] = [];
const cache: Map<string, TreeSegment> = new Map();

const execute = () => {
    const startingSegment = new TreeSegment({
        x: 0,
        y: 0,
        z: 0,
        t: 0,
    });

    let planIndex = 1;
    for (const plan of plans) {
        let currentSegment = startingSegment;
        let countOfSegmentsInPlan = 0;

        for (const instruction of plan) {
            for (let i = 0; i < instruction.distance; i++) {
                currentSegment = currentSegment.grow(instruction.direction);
                if (!cache.has(`${currentSegment.x},${currentSegment.y},${currentSegment.z}`)) {
                    cache.set(`${currentSegment.x},${currentSegment.y},${currentSegment.z}`, currentSegment);
                } 
                countOfSegmentsInPlan++;
            }
        }

        if (debug) {
            console.log(`There are ${countOfSegmentsInPlan} tree segments in plan ${planIndex}`);
        }
        planIndex++;
        leaves.push(currentSegment);
    }

    if (debug) {
        console.log(`There are ${Array.from(cache.keys()).length} tree segments in total`);
        console.log(`There are ${leaves.length} leaves in total`);
        leaves.forEach((leaf) => {  
            console.log(`Leaf: ${leaf.x},${leaf.y},${leaf.z}`);
        });
    }

    const graph: Graph = new Graph();

    cache.forEach((segment) => {
        const node: Node = new Node({id: `${segment.x},${segment.y},${segment.z}`});

        if (segment.x === 0 && segment.y === 0) {
            trunk.push(node);
        }

        if (leaves.find((leaf) => leaf.x === segment.x && leaf.y === segment.y && leaf.z === segment.z)) {
            leafNodes.push(node);
        }

        graph.addNode(node);
    });

    // Connect up the graph
    graph.getNodes().forEach((node) => {
        const [x, y, z] = node.id.split(',').map(Number);

        // Add edges to the node for any adjacent node in the cache.
        const upSegment = cache.get(`${x},${y},${z + 1}`);
        const downSegment = cache.get(`${x},${y},${z - 1}`);
        const leftSegment = cache.get(`${x - 1},${y},${z}`);
        const rightSegment = cache.get(`${x + 1},${y},${z}`);
        const frontSegment = cache.get(`${x},${y + 1},${z}`);
        const backSegment = cache.get(`${x},${y - 1},${z}`);

        if (upSegment) {
            const upNode = graph.getNode(`${upSegment.x},${upSegment.y},${upSegment.z}`);

            if (!node.alreadyConnectedTo(upNode)) {
                graph.addEdge(new Edge({start: node, end: upNode, weight: 1}));
            }
        }

        if (downSegment) {
            const downNode = graph.getNode(`${downSegment.x},${downSegment.y},${downSegment.z}`);

            if (!node.alreadyConnectedTo(downNode)) {
                graph.addEdge(new Edge({start: node, end: downNode, weight: 1}));
            }
        }

        if (leftSegment) {
            const leftNode = graph.getNode(`${leftSegment.x},${leftSegment.y},${leftSegment.z}`);

            if (!node.alreadyConnectedTo(leftNode)) {
                graph.addEdge(new Edge({start: node, end: leftNode, weight: 1}));
            }
        }

        if (rightSegment) {
            const rightNode = graph.getNode(`${rightSegment.x},${rightSegment.y},${rightSegment.z}`);

            if (!node.alreadyConnectedTo(rightNode)) {
                graph.addEdge(new Edge({start: node, end: rightNode, weight: 1}));
            }
        }

        if (frontSegment) {
            const frontNode = graph.getNode(`${frontSegment.x},${frontSegment.y},${frontSegment.z}`);

            if (!node.alreadyConnectedTo(frontNode)) {
                graph.addEdge(new Edge({start: node, end: frontNode, weight: 1}));
            }
        }

        if (backSegment) {
            const backNode = graph.getNode(`${backSegment.x},${backSegment.y},${backSegment.z}`);

            if (!node.alreadyConnectedTo(backNode)) {
                graph.addEdge(new Edge({start: node, end: backNode, weight: 1}));
            }
        }
    });

    let lowestMurkiness = Infinity;

    if (debug) {
        console.log(`There are ${trunk.length} trunk nodes`);
        console.log(`There are ${leafNodes.length} leaf nodes`);
    }
    
    trunk.forEach((node) => {
        let murkiness = 0;

        leafNodes.forEach((leafNode) => {
            const path = graph.findShortestPath(node, leafNode);
            murkiness += path.distance;
        });

        if (debug) {
            console.log(`Murkiness for node ${node.id}: ${murkiness}`);
        }

        if (murkiness < lowestMurkiness) {
            lowestMurkiness = murkiness;
        }
    });

    console.log(`The murkiness is ${lowestMurkiness}`);
}

const parseLine = (line: string) => {
    const parts = line.split(',');
    const plan: Instruction[] = [];
    parts.forEach((part) => {
        plan.push({
            direction: part.charAt(0) as TreeSegmentDirection,
            distance: parseInt(part.substring(1)),
        });
    });
    plans.push(plan);
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