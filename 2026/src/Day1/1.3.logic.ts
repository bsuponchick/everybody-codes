import { calculateAreaOfSquare } from './1.1.logic';
 
export const determineSmallestOutpostAreaPossible = (pinecones: number): number => {
    let smallestSideLength = 3;
    let areaOfOutpostNeeded = calculateAreaOfSquare(smallestSideLength) - 1;

    while (pinecones > areaOfOutpostNeeded) {
        smallestSideLength += 2;
        areaOfOutpostNeeded = calculateAreaOfSquare(smallestSideLength) - 1;
    }

    return areaOfOutpostNeeded;
};