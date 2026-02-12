export class Node {
    value: number;
    children: Node[];
    parent: Node | null;

    constructor(value: number) {
        this.value = value;
        this.children = [];
        this.parent = null;
    }

    addChild(child: Node) {
        this.children.push(child);
        child.parent = this;
    }
    
    getChildren() {
        return this.children;
    }

    getParent() {
        return this.parent;
    }

    setParent(parent: Node) {
        this.parent = parent;
    }

    getValue() {
        return this.value;
    }

    getDepth(): number {
        let depth = 0;
        let current: Node = this;
        while (current.getParent() !== null) {
            depth++;
            current = current.getParent();
        }
        return depth + 1;
    }
}

export class Tree {
    root: Node;
    nodes: Node[];

    constructor(root: Node) {
        this.root = root;
        this.nodes = [];
        this.nodes.push(root);
    }

    getRoot() {
        return this.root;
    }

    addNode(node: Node, parent: Node) {
        if (parent) {
            parent.addChild(node);
            this.nodes.push(node);
        }
        else {
            throw new Error(`Parent node not provided`);
        }
    }

    getAllNodesWithValue(value: number): Node[] {
        return this.nodes.filter((n) => n.getValue() === value);
    }
}

export class Forest {
    trees: Tree[];

    constructor() {
        this.trees = [];
    }

    addTree(tree: Tree) {
        this.trees.push(tree);
    }

    getTrees() {
        return this.trees;
    }

   getShortestPathLengthFromRootToNodeValue(value: number): number {
        const nodes = this.trees.flatMap((t) => t.getAllNodesWithValue(value));
        if (nodes.length === 0) {
            throw new Error(`Node with value ${value} not found`);
        }
        let shortestDepth = Infinity;
        for (const node of nodes) {
            const depth = node.getDepth();
            if (depth < shortestDepth) {
                shortestDepth = depth;
            }
        }
        return shortestDepth;
   }
}

interface GenerateTreeFromStampsParams {
    stamps: number[];
    rootValue: number;
    maxValue: number;
}

export const generateTreeFromStamps = (params: GenerateTreeFromStampsParams): Tree => {
    const { stamps, rootValue, maxValue } = params;
    const root = new Node(rootValue);
    const tree = new Tree(root);
    const queue: Node[] = [root];
    const visited: Set<number> = new Set();

    while (queue.length > 0) {
        const current = queue.shift();

        for (const stamp of stamps) {
            const newNodeValue = current.getValue() + stamp;
            if (visited.has(newNodeValue)) {
                continue;
            }

            if (newNodeValue <= maxValue) {
                const newNode = new Node(newNodeValue);
                tree.addNode(newNode, current);
                queue.push(newNode);
                visited.add(newNodeValue);
            }
        }
    }

    return tree;
}

interface GenerateForestFromStampsParams {
    stamps: number[];
    maxValue: number;
}

export const generateForestFromStamps = (params: GenerateForestFromStampsParams): Forest => {
    const { stamps, maxValue } = params;
    const forest = new Forest();
    for (const stamp of stamps) {
        const tree = generateTreeFromStamps({ stamps, rootValue: stamp, maxValue });
        forest.addTree(tree);
    }
    return forest;
}