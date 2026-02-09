export class Node {
    id: string;
    children: Node[];
    parent: Node | null;

    constructor(id: string) {
        this.id = id;
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

    getId() {
        return this.id;
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

    addNode(node: Node, parentId: string) {
        const parent = this.nodes.find((n) => n.getId() === parentId);
        if (parent) {
            parent.addChild(node);
            this.nodes.push(node);
        }
        else {
            throw new Error(`Parent node ${parentId} not found`);
        }
    }

    getNode(id: string): Node {
        return this.nodes.find((n) => n.getId() === id);
    }

    getNearestLeaf(): Node {
        // BFS to find the shortest path to a leaf
        const queue: Node[] = [this.root];
        const visited: Set<string> = new Set();

        while (queue.length > 0) {
            const current = queue.shift();
            visited.add(current.getId());
            console.log(`Visiting ${current.getId()}`);

            if (current.getId() === '@') {
                return current;
            }

            for (const child of current.getChildren()) {
                if (!visited.has(child.getId())) {
                    queue.push(child);
                }
            }
        }
        return null;
    }

    getAllFruits(): Node[] {
        return this.nodes.filter((n) => n.getId() === '@');
    }

    getPathFromLeafToRoot(leaf: Node): Node[] {
        const path: Node[] = [];
        let current: Node = leaf;
        while (current !== null) {
            path.push(current);
            current = current.getParent();
        }
        return path.reverse();
    }
}