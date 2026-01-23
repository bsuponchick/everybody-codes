import { Coordinate } from '../utils/interfaces/coordinate';

export const add = (a: Coordinate, b: Coordinate): Coordinate => {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export const multiply = (a: Coordinate, b: Coordinate): Coordinate => {
    return { 
        x: (a.x * b.x) - (a.y * b.y),
        y: (a.x * b.y) + (a.y * b.x),
    };
}

export const divide = (a: Coordinate, b: Coordinate): Coordinate => {
    return {
        x: (a.x / b.x) > 0 ? Math.floor(a.x / b.x) : Math.ceil(a.x / b.x),
        y: (a.y / b.y) > 0 ? Math.floor(a.y / b.y) : Math.ceil(a.y / b.y),
    };
}

export const cycle = (start: Coordinate, note: Coordinate, cycle: number): Coordinate => {
    console.log(`Cycle ${cycle}`);

    const productOfItself = multiply(start, start);
    const divBy1010 = divide(productOfItself, { x: 10, y: 10 });
    const addNote = add(divBy1010, note);

    console.log(`R = R * R = [${productOfItself.x}, ${productOfItself.y}]`);
    console.log(`R = R / [10, 10] = [${divBy1010.x}, ${divBy1010.y}]`);
    console.log(`R = R + A = [${addNote.x}, ${addNote.y}]`);

    return addNote;
}