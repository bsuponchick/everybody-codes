export const determineLargestDecliningSubset = (numbers: number[]): number[] => {
    const sortedNumbers = numbers.sort((a, b) => b - a);
    const largestDecliningSubset = [];

    for (const number of sortedNumbers) {
        if (largestDecliningSubset.length === 0) {
            largestDecliningSubset.push(number);
        } else {
            if (number < largestDecliningSubset[largestDecliningSubset.length - 1]) {
                largestDecliningSubset.push(number);
            }
        }
    }

    return largestDecliningSubset;
}