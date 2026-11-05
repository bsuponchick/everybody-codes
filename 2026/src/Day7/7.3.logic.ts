export class GraphNode {
    id: string;
    energy: number;
    startingEnergy: number;
    maxEnergy: number;
    connectionIds: string[];
    connections: GraphNode[];
    exploded: boolean;

    constructor (params: {id: string, energy: number, connectionIds: string[], maxEnergy: number}) {
        this.id = params.id;
        this.startingEnergy = params.energy;
        this.energy = params.energy;
        this.maxEnergy = params.maxEnergy;
        this.connectionIds = params.connectionIds;
        this.connections = [];
        this.exploded = false;
    }

    addConnection = (connection: GraphNode): void => {
        this.connections.push(connection);
    }

    propogateEnergy = (strength: number): void => {
        this.addEnergy(strength);

        if (strength > 1) {
            this.sendImpulse(strength - 1);
        }
    }

    sendImpulse = (strength: number): void => {
        this.connections.forEach((connection) => {
            if (connection.exploded === false) {
                connection.propogateEnergy(strength);
            }
        });    
    }

    addEnergy = (amount: number): void => {
        this.energy += amount;
    }

    reset = (): void => {
        this.exploded = false;
        this.energy = this.startingEnergy;
    }

    explode = (): void => {
        this.exploded = true;
    }

    shouldExplode = (): boolean => {
        return this.exploded === false && this.energy >= this.maxEnergy;
    }
}

export class Graph {
    nodes: GraphNode[];
    pendingExplosions: GraphNode[];

    constructor () {
        this.nodes = [];
        this.pendingExplosions = [];
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

    countPendingExplosions = (): number => {
        let count = 0;

        this.nodes.forEach((node) => {
            if (node.shouldExplode()) {
                count += 1;
            }
        });

        return count;
    }

    generateExplosions = (): void => {
        this.nodes.forEach((node) => {
            if (node.shouldExplode()) {
                this.pendingExplosions.push(node);
            }
        });

        this.pendingExplosions.forEach((pendingExplosion) => {
            pendingExplosion.explode();
        });

        this.pendingExplosions.forEach((pendingExplosion) => {
            pendingExplosion.sendImpulse(10);
        });

        this.pendingExplosions = [];
    }

    getTotalAccumulatedEnergy = (): number => {
        let totalEnergy = 0;

        this.nodes.forEach((node) => {
            // Only count clouds who haven't exploded in the total 
            if (node.exploded === false) {
                totalEnergy += node.energy;
            }
        });

        return totalEnergy;
    }

    resetAllNodes = (): void => {
        this.nodes.forEach((node) => node.reset());
    }
}