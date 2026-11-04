import { GraphNode, Graph } from './6.1.logic';

const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

let graph: Graph = new Graph();

const execute = () => {
    const nodes = graph.getNodes();
    console.log(`There are ${nodes.length} nodes in the graph`);
    console.log(`The nodes are ${nodes.map((node) => node.id).join(',')}`);
    const root = graph.getNode('NULL');
    console.log(`The root is ${root.id}`);
    const ingredients = root.getDescendents();

    console.log(`There are ${ingredients.length} ingredents in NULL`);
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
    input: require('fs').createReadStream(test ? './test1.txt' : './input1.txt'),
});

lineReader
    .on('line', (line) => {
        parseLine(line);
    })
    .on('close', () => {
        execute();
    });

export {};
