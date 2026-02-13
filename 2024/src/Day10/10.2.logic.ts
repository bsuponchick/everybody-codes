import { determineCoordinatesToFill, determinePossibleValuesForCoordinate } from "./10.1.logic";

export class Grid {
    values: string[][];

    constructor() {
        this.values = [];
    }

    addRow(row: string[]) {
        this.values.push(row);
    }

    determineRunicWord(): string {
        let coordinatesToFill = determineCoordinatesToFill(this.values);
        const originalCoordinatesToFill = [...coordinatesToFill];

        console.log(`There are ${coordinatesToFill.length} coordinates to fill`);

        while (coordinatesToFill.length > 0) {
            const coordinate = coordinatesToFill.shift();
            const possibleValues = determinePossibleValuesForCoordinate(this.values, coordinate);
            console.log(`Possible values for coordinate ${coordinate.x}, ${coordinate.y}: ${possibleValues.join(', ')}`);
            
            if (possibleValues.length === 1) {
                this.values[coordinate.y][coordinate.x] = possibleValues[0];
                coordinatesToFill = determineCoordinatesToFill(this.values);
            }
        }

        let runicWord = '';
        for (const coordinate of originalCoordinatesToFill) {
            runicWord += this.values[coordinate.y][coordinate.x];
        }
        
        return runicWord;
    }
}

export const determinePowerOfRunicWord = (runicWord: string): number => {
    let power = 0;
    

    for (let i = 0; i < runicWord.length; i++) {
        let character = runicWord[i];
        const basePower = character.charCodeAt(0) - 64;

        power += (basePower * (i + 1));
    }

    return power;
}