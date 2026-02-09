import { Tree, Node } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const nodeStrings: Map<string, string> = new Map();

const execute = () => {
    const root = new Node('RR');
    const tree = new Tree(root);

    const nodes: string[] = ['RR'];

    while (nodes.length > 0) {
        const current = nodes.shift();
        const currentNode = tree.getNode(current);

        if (currentNode) {
            if (nodeStrings.has(current)) {
                const children = nodeStrings.get(current).split(',');
                for (const child of children) {
                    const childNode = new Node(child);
                    tree.addNode(childNode, current);
                    nodes.push(child);
                }
            }
        } else {
            throw new Error(`Current node ${current} not found`);
        }
    }

    const fruits = tree.getAllFruits();
    const depthCache: Map<number, Node[][]> = new Map();

    for (const fruit of fruits) {
        const path = tree.getPathFromLeafToRoot(fruit);
        let depth = path.length - 1;
        if (depthCache.has(depth)) {
            depthCache.get(depth).push(path);
        } else {
            depthCache.set(depth, [path]);
        }
    }
    
    depthCache.forEach((nodes, depth) => {
        console.log(`Depth ${depth}: ${nodes.map((node) => node.map((n) => n.getId()).join('')).join('|')}`);
    });
}

const parseLine = (line: string) => {
    const parts = line.split(':');
    nodeStrings.set(parts[0], parts[1]);
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