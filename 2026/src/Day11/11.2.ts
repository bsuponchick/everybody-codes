import { Graph, Edge } from '../utils/dijkstra/dijkstra';
import { constructGraph, calculateShortestDistancesAroundTheRing } from './11.2.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let graph: Graph;;
let portalCount: number = 0;
interface Shortcut {
    start: number;
    end: number;
}

const shortcuts: Shortcut[] = [];

const execute = () => {
    console.log(`The ring has ${portalCount} portals`);
    console.log(`The shortcuts are ${JSON.stringify(shortcuts)}`);

    graph = constructGraph(portalCount);

    console.log(`There are ${graph.nodes.length} nodes and ${graph.edges.length} edges.`);
    const totalDistanceBeforeShortcuts = calculateShortestDistancesAroundTheRing(graph);

    console.log(`The total distance before shortcuts is ${totalDistanceBeforeShortcuts}`);

    shortcuts.forEach((shortcut) => {
        graph.addEdge(new Edge({
            start: graph.getNode(`${shortcut.start}`),
            end: graph.getNode(`${shortcut.end}`),
            weight: 1
        }));
    });

    // NEED TO ADD MOST OPTIMAL NEW EDGE NEXT...
    //const totalDistanceAfterShortcuts = calculateShortestDistancesAroundTheRing(graph);
    //console.log(`The total distance after shortcuts is ${totalDistanceAfterShortcuts}`);

    //console.log(`The resonance is ${totalDistanceBeforeShortcuts - totalDistanceAfterShortcuts}`);
}

const parseLine = (line: string) => {
   if (line.indexOf('portals: ') > -1) {
        portalCount = Number.parseInt(line.replace('portals: ', ''));
   } else if (line.trim().length > 0) {
        const parts = line.split(' ');
        shortcuts.push({
            start: Number.parseInt(parts[0]),
            end: Number.parseInt(parts[1])
        });
   }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test2.txt' : './input2.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};