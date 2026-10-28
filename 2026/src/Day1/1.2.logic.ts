export const determineSmallestPineconesNeededForSquarePermiter = (pinecones: number) : number => {
    // Accounts for a 3x3 as the smallest possible square frame allowed
    let currentSideLength = 3;
    let currentPermiterLength = determinePerimeterCount(currentSideLength);

    while (pinecones > currentPermiterLength) {
        currentSideLength++;
        currentPermiterLength = determinePerimeterCount(currentSideLength);
    }

    return currentPermiterLength;
}

export const determinePerimeterCount = (sideLength: number) : number => {
    return (sideLength * 2) + ((sideLength - 2) * 2);
}