export class GraphNode {
    id: string;
    children: GraphNode[];

    constructor (id: string) {
        this.id = id;
        this.children = [];
    }

    addChild = (child: GraphNode): void => {
        this.children.push(child);
    }

    getChildren = (): GraphNode[] => {
        return this.children;
    }

    // visited is shared across the whole traversal so cycles terminate and each node is returned once
    getDescendents = (visited: Set<string> = new Set()): GraphNode[] => {
        let descendents: GraphNode[] = [];

        visited.add(this.id);

        this.children.forEach((child) => {
            if (!visited.has(child.id)) {
                descendents.push(child);
                descendents.push(...child.getDescendents(visited));
            }
        });

        return descendents;
    }
}

export class Graph {
    nodes: GraphNode[];

    constructor () {
        this.nodes = [];
    }

    addNode = (node: GraphNode): void => {
        this.nodes.push(node);
    }

    getNode = (id: string): GraphNode => {
        return this.nodes.find((node) => {
            return node.id === id;
        });
    }

    getNodes = (): GraphNode[] => {
        return this.nodes;
    }
}