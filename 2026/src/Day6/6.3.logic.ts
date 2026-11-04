import { GraphNode } from './6.2.logic';

export const getIntersection = (...arrays: GraphNode[][]): GraphNode[] => {
    if (arrays.length === 0) {
        return [];
    }

    return arrays.reduce((accumulator, currentArray) => {
        const currentSet = new Set(currentArray);
        return accumulator.filter((item) => {
            return currentSet.has(item);
        });
    });
}
