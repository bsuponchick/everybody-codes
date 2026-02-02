interface Pair {
    first: string;
    second: string;
}

export const determinePotionCount = (creature: string): number => {
    if (creature === 'A') {
        return 0;
    } else if (creature === 'B') {
        return 1;
    } else if (creature === 'C') {
        return 3;
    } else if (creature === 'D') {
        return 5;
    }
    return 0;
};

export const determinePotionCountForPair = (pair: Pair): number => {
    let count = determinePotionCount(pair.first) + determinePotionCount(pair.second);


    console.log(`Pair: ${pair.first} ${pair.second}`);
    console.log(`Potion count: ${determinePotionCount(pair.first)} + ${determinePotionCount(pair.second)} = ${determinePotionCount(pair.first) + determinePotionCount(pair.second)}`);
    
    if (pair.first === 'x' || pair.second === 'x') {
        return count;
    }

    return count + 2;
};