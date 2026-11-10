import { Graph, Node, Edge } from '../utils/dijkstra/dijkstra';

export const constructGraph = (size: number): Graph => {
    const graph = new Graph();

    for (let i = 1; i <= size; i++) {
        graph.addNode(new Node({ id: `${i}`}));
    }

    for (let i = 1; i <= size; i++) {
        if (i < size) {
            graph.addEdge(new Edge({
                start: graph.getNode(`${i}`),
                end: graph.getNode(`${i + 1}`),
                weight: 1
            }));
        } else {
            graph.addEdge(new Edge({
                start: graph.getNode(`${i}`),
                end: graph.getNode(`1`),
                weight: 1
            }));
        }
    }

    return graph;
}

export const getShortestTotalDistanceToAllNodesFrom = (graph: Graph, start: Node): number => {
    let totalDistance = 0;

    graph.nodes.forEach((node) => {
        if (start.id !== node.id) {
            totalDistance += graph.findShortestPath(start, node).distance;
        }
    });

    return totalDistance;
}

export const calculateShortestDistancesAroundTheRing = (graph: Graph): number => {
    let totalDistance = 0;

    graph.nodes.forEach((node) => {
        totalDistance += getShortestTotalDistanceToAllNodesFrom(graph, node); 
    });

    return totalDistance;
}