import { Graph, Node, Edge } from '../utils/dijkstra/dijkstra';

export const constructGraph = (size: number): Graph => {
    const graph = new Graph();

    for (let i = 1; i <= size; i++) {
        graph.addNode(new Node({ id: `${i}`}));
    }

    for (let i = 1; i <= size; i++) {
        const currentNode = graph.getNode(`${i}`);
        // Fill to the closest 3 to the right
        const nodesToTheRight = [];


        let nextIndex = i + 1;
        while(nodesToTheRight.length < 3) {
            if (nextIndex > size) {
                nextIndex = 1;
            }
            nodesToTheRight.push(graph.getNode(`${nextIndex}`));
            nextIndex += 1;
        }
        
        nodesToTheRight.forEach((node) => {
            graph.addEdge(new Edge({
                start: currentNode,
                end: node,
                weight: 1
            }));
        });
    }

    return graph;
}

export const getShortestTotalDistanceToAllNodesFrom = (graph: Graph, start: Node): number => {
    let totalDistance = 0;

    graph.nodes.forEach((node) => {
        if (start.id !== node.id) {
            const distance = graph.findShortestPath(start, node).distance;
            // console.log(`The shortest distance from ${start.id} to ${node.id} is ${distance}`);
            totalDistance += distance;
        }
    });

    console.log(`Total distance from node ${start.id} is ${totalDistance}`);
    return totalDistance;
}

export const calculateShortestDistancesAroundTheRing = (graph: Graph): number => {
    let totalDistance = 0;

    graph.nodes.forEach((node) => {
        totalDistance += getShortestTotalDistanceToAllNodesFrom(graph, node); 
    });

    return totalDistance;
}

export const findLowestDistancesByAddingOneEdge = (graph: Graph): number => {
    let shortestTotalDistance = 999999999999;

    graph.nodes.forEach((currentNode) => {
        graph.nodes.forEach((nextNode) => {
            if (currentNode.id !== nextNode.id) {
                //Create a temporary edge
                const tempEdge = new Edge({
                    start: currentNode,
                    end: nextNode,
                    weight: 1
                });

                graph.addEdge(tempEdge);

                const totalDistance = calculateShortestDistancesAroundTheRing(graph);
                if (totalDistance < shortestTotalDistance) {
                    shortestTotalDistance = totalDistance;
                }

                graph.removeEdge(tempEdge);
            }
        });
    });

    return shortestTotalDistance;
}