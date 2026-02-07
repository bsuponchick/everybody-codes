export const dance = (dancers: number[], clapper: number): number[] => {
    let newDancers: number[] = [];

    if (clapper > dancers.length) {
        // Will circle back to the right
        let indexFromRight = clapper - (dancers.length + 1);
        newDancers = dancers.slice(0, dancers.length - indexFromRight);
        newDancers.push(clapper);
        newDancers = newDancers.concat(dancers.slice(dancers.length - indexFromRight));
    } else {
        // Will stop on the left
        newDancers = dancers.slice(0, clapper - 1);
        newDancers.push(clapper);
        newDancers = newDancers.concat(dancers.slice(clapper - 1));
    }

    return newDancers;
}

export const printDancers = (dancers: number[][]): void => {
    for (let i = 0; i < dancers.length; i++) {
        console.log(`Line ${i}: `);
        let line = ''; 

        for (let j = 0; j < dancers[i].length; j++) {
            line += `${dancers[i][j]} `; 
        }

        console.log(line);
    }
}

export const shout = (dancers: number[][]): number => {
    let shoutString = '';

    for (let i = 0; i < dancers.length; i++) {
        shoutString += dancers[i][0].toString();
    }

    return Number(shoutString);

}