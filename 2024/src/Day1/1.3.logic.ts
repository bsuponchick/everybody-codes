interface Triplet {
    first: string;
    second: string;
    third: string;
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

export const determinePotionCountForTriplet = (triplet: Triplet): number => {
    let count = determinePotionCount(triplet.first) + determinePotionCount(triplet.second) + determinePotionCount(triplet.third);


    console.log(`Triplet: ${triplet.first} ${triplet.second} ${triplet.third}`);
    
    let countOfCreatures = 0;

    if (triplet.first !== 'x') {
        countOfCreatures++;
    }
    if (triplet.second !== 'x') {
        countOfCreatures++;
    }
    if (triplet.third !== 'x') {
        countOfCreatures++;
    }

    if (countOfCreatures === 2) {
        count += 2;
    } else if (countOfCreatures === 3) {
        count += 6;
    }

    console.log(`Potion count: ${determinePotionCount(triplet.first)} + ${determinePotionCount(triplet.second)} + ${determinePotionCount(triplet.third)} = ${count}`);

    return count;
};