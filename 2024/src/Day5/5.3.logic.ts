export const generateHash = (dancers: number[][]): string => {
    let hash = '';

    for (let i = 0; i < dancers.length; i++) {
        for (let j = 0; j < dancers[i].length; j++) {
            hash += `${dancers[i][j]}`;
        }

        hash += '-';
    }

    return hash;
}

export const dance = (dancers: number[], clapper: number): number[] => {
    let newDancers: number[] = [];

    const remainder = (clapper - 1) % (dancers.length * 2);

    let index = Math.min(remainder, (dancers.length * 2) - remainder);
    newDancers = dancers.slice(0, index);
    newDancers.push(clapper);
    newDancers = newDancers.concat(dancers.slice(index));
    

    return newDancers;
}