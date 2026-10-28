export const determineSmallestOutpostAreaFromPineconeCount = (count: number) : number => {
    let currentLength = 1;
    let currentArea = calculateAreaOfSquare(currentLength);
    
    while (count > currentArea) {
        currentLength++;
        currentArea = calculateAreaOfSquare(currentLength);
    }
    
    return currentArea;
}

export const calculateAreaOfSquare = (length: number): number => {
    return Math.pow(length, 2);
}