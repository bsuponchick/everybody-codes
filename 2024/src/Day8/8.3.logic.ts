interface CalculateNextThicknessParams {
    previousThickness: number;
    countOfPriests: number;
    countOfAcolytes: number;
}

export const calculateNextThickness = (params: CalculateNextThicknessParams): number => {
    const { previousThickness, countOfPriests, countOfAcolytes } = params;
    const product = previousThickness * countOfPriests;
    const remainder = product % countOfAcolytes;
    return remainder + countOfAcolytes;
}


interface CalculateEmptyBlocksParams {
    heightOfColumn: number;
    widthOfStructure: number;
    countOfAcolytes: number;
    countOfPriests: number;
}

export const calculateEmptyBlocks = (params: CalculateEmptyBlocksParams): number => {
    const { heightOfColumn, widthOfStructure, countOfAcolytes, countOfPriests } = params;
    const product = (countOfPriests * widthOfStructure) * heightOfColumn;
    const remainder = product % countOfAcolytes;
    return remainder;
}

export interface Level {
    height: number;
    width: number;
}

export const calculateTotalArea = (levels: Level[], countOfAcolytes: number, countOfPriests: number): number => {
    const widthOfStructure = levels[levels.length - 1].width;
    let middle = Math.ceil(widthOfStructure / 2) - 1;
    let totalBlocksToRemove = 0;
    console.log(`Middle is ${middle}`);

    let totalHeights = 0;
    for (let i = 1; i <= middle; i++) {
        let heightOfColumn = 0;
        for (let j = 0; j <= i; j++) {
            heightOfColumn += levels[levels.length - 1 - j].height;
        }

        const blocksToRemoveThisLevel = calculateEmptyBlocks({ heightOfColumn, widthOfStructure, countOfAcolytes, countOfPriests });
        if (i === middle) {                
            totalBlocksToRemove += blocksToRemoveThisLevel;
            totalHeights += heightOfColumn;
        } else {
            totalBlocksToRemove += blocksToRemoveThisLevel * 2;
            totalHeights += heightOfColumn * 2;
        }
    }

    totalHeights += levels[levels.length - 1].height * 2;

    return totalHeights - totalBlocksToRemove;
}