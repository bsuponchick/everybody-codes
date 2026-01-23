import { Coordinate } from '../utils/interfaces/coordinate';
import { add, multiply, divide } from './2.1.logic';

export const shouldEngrave = (coordinate: Coordinate): boolean => {
    const maxCycles = 100;
    let result: Coordinate = { x: 0, y: 0 };

    for (let i = 1; i <= maxCycles; i++) {
        const productOfItself = multiply(result, result);
        const divBy100k = divide(productOfItself, { x: 100000, y: 100000 });
        result = add(divBy100k, coordinate);

        if (result.x > 1000000 || result.y > 1000000 || result.x < -1000000 || result.y < -1000000) {
            console.log(`The coordinate ${coordinate.x},${coordinate.y} should not be engraved, exited at cycle ${i}.`);
            return false;
        }
    }

    console.log(`The coordinate ${coordinate.x},${coordinate.y} should be engraved.`);
    return true;
};
