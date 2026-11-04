import { GraphNode, Graph } from './6.2.logic';
import { getIntersection } from './6.3.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let graph: Graph = new Graph();

const execute = () => {
    const nodes = graph.getNodes();
    console.log(`There are ${nodes.length} nodes in the graph`);
    console.log(`The nodes are ${nodes.map((node) => node.id).join(',')}`);

    const nullV1 = graph.getNode('NULLv1');
    const productsUsingNullv1 = nullV1.getAncestors();

    const nullV2 = graph.getNode('NULLv2');
    const productsUsingNullv2 = nullV2.getAncestors();

    const nullV3 = graph.getNode('NULLv3');
    const productsUsingNullv3 = nullV3.getAncestors();

    const intersectionV1V2 = getIntersection(productsUsingNullv1, productsUsingNullv2);
    const intersectionV1V3 = getIntersection(productsUsingNullv1, productsUsingNullv3);
    const intersectionV2V3 = getIntersection(productsUsingNullv2, productsUsingNullv3);

    const uniqueProducts = new Set([...intersectionV1V2, ...intersectionV1V3, ...intersectionV2V3]);

    console.log(`There are ${uniqueProducts.size} products that used at least two versions NULL`);
};

const parseLine = (line: string) => {
    const parts = line.split(':');
    const ingredientParts = parts[1].split(',');
    let ingredient;

    if (graph.getNode(parts[0])) {
        ingredient = graph.getNode(parts[0]);    
    } else {
        ingredient = new GraphNode(parts[0]);
        graph.addNode(ingredient);
        console.log(`Added ${ingredient.id} to the graph`);
    }

    ingredientParts.forEach((part) => {
        let childIngredient;

        if (graph.getNode(part)) {
            childIngredient = graph.getNode(part); 
        } else {
            childIngredient = new GraphNode(part);
            graph.addNode(childIngredient);
            console.log(`Added ${childIngredient.id} to the graph`);
        }

        console.log(`Adding ${childIngredient.id} to ${ingredient.id}`);
        ingredient.addChild(childIngredient);
    });
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test3.txt' : './input3.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
