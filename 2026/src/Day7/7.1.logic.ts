export class GraphNode {
    id: string;
    energy: number;
    connectionIds: string[];
    connections: GraphNode[];

    constructor (id: string, energy: number, connectionIds: string[]) {
        this.id = id;
        this.energy = energy;
        this.connectionIds = connectionIds;
        this.connections = [];
    }

    addConnection = (connection: GraphNode): void => {
        this.connections.push(connection);
    }

    propogateEnergy = (strength: number): void => {
        this.energy += strength;

        if (strength > 1) {
            this.connections.forEach((connection) => {
                connection.propogateEnergy(strength - 1);
            });
        }
    }
}

export class Graph {
    nodes: GraphNode[];

    constructor () {
        this.nodes = [];
    }

    addNode = (node: GraphNode): void => {
        if (!this.nodes.find((n) => {
            return n.id === node.id
        })) {
            this.nodes.push(node);
        }
    }

    getNode = (id: string): GraphNode => {
        return this.nodes.find((node) => {
            return node.id === id;
        });
    }

    connectNodes = (): void => {
        this.nodes.forEach((node) => {
            node.connectionIds.forEach((id) => {
                node.addConnection(this.getNode(id));
            });
        });
    }

    getNodeWithMostConnections = (): GraphNode => {
        let maxConnections = 0;
        let mostConnectedNode;

        this.nodes.forEach((node) => {
            if (node.connections.length > maxConnections) {
                maxConnections = node.connections.length;
                mostConnectedNode = node;
            }
        });

        return mostConnectedNode;
    }

    getTotalAccumulatedEnergy = (): number => {
        let totalEnergy = 0;

        this.nodes.forEach((node) => {
            totalEnergy += node.energy;
        });

        return totalEnergy;
    }
}