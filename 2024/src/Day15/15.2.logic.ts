import { Graph, Node } from "../utils/dijkstra/dijkstra";

interface ShortestRouteParams {
    graph: Graph;
    startingNode: Node;
    groups: Node[][];
    debug: boolean;
}

export const findShortestRoute = (params: ShortestRouteParams): number => {
    const { graph, startingNode, groups, debug } = params;

    // Find the shortest path to any goal node
    let shortestPath = Infinity;
    const permutations = permute(groups);

    group1Nodes.forEach((aHerbNode) => {
        graph.reset();

        let pathToA = graph.findShortestPath(startingNode, aHerbNode);

        if (pathToA.distance < Infinity) {
            // There is a validat path to A, start looking for paths to Bs
            if (debug) {
                console.log(`Path to A: ${pathToA.distance}`);
            }

            group2Nodes.forEach((bHerbNode) => {
                graph.reset();

                let pathToB = graph.findShortestPath(aHerbNode, bHerbNode);

                if (pathToB.distance < Infinity) {
                    if (debug) {
                        console.log(`Path to B: ${pathToB.distance}`);
                    }

                    // There is a valid path to B, start looking for paths to Cs
                    group3Nodes.forEach((cHerbNode) => {
                        graph.reset();

                        let pathToC = graph.findShortestPath(bHerbNode, cHerbNode);

                        if (pathToC.distance < Infinity) {
                            if (debug) {
                                console.log(`Path to C: ${pathToC.distance}`);
                            }

                            // There is a valid path to C, start looking for paths to starting node
                            graph.reset();

                            let pathToStartingNode = graph.findShortestPath(cHerbNode, startingNode);

                            if (pathToStartingNode.distance < Infinity) {
                                if (debug) {
                                    console.log(`Path to starting node: ${pathToStartingNode.distance}`);
                                }

                                // There is a valid path to starting node, check if it's the shortest path
                                let pathLength = pathToA.distance + pathToB.distance + pathToC.distance + pathToStartingNode.distance;

                                if (pathLength < shortestPath) {
                                    shortestPath = pathLength;
                                }
                            }

                            graph.reset();
                        }
                    });
                }
            });
        }
    });

    return shortestPath;
}


export function* permute(permutation: Node[][]): Generator<Node[][]> {
    var length = permutation.length,
        c = Array(length).fill(0),
        i = 1, k, p;

    yield permutation.slice();
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            yield permutation.slice();
        } else {
            c[i] = 0;
            ++i;
        }
    }
}