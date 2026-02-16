import { Coordinate } from "../utils/interfaces/coordinate";

export interface GridSegment {
    topLeft: Coordinate;
    bottomRight: Coordinate;
}

export class Grid {
    values: string[][];

    constructor() {
        this.values = [];
    }

    addRow(row: string[]) {
        this.values.push(row);
    }

    determineRunicWords(gridSegments: GridSegment[]): string[] {
        let runicWords: string[] = [];

        for (const gridSegment of gridSegments) {
            let runicWord = '';
            for (let row = gridSegment.topLeft.y + 2; row < gridSegment.bottomRight.y - 2; row++) {
                for (let column = gridSegment.topLeft.x + 2; column < gridSegment.bottomRight.x - 2; column++) {
                    runicWord += this.values[row][column];
                }
            }

            console.log(`Runic word: ${runicWord}`);
            if (runicWord.indexOf('.') === -1) {
                runicWords.push(runicWord);
            }
        }

        return runicWords;
    }

    determineAllGridSegments(): GridSegment[] {
        let gridSegments: GridSegment[] = [];
        const gridSize = 8;
        const gridOverlap = 2;

        for (let row = 0; row < this.values.length - gridOverlap; row+= (gridSize - gridOverlap)) {
            for (let col = 0; col < this.values[row].length - gridOverlap; col+= (gridSize - gridOverlap)) {
                gridSegments.push({ topLeft: { x: col, y: row }, bottomRight: { x: col + gridSize, y: row + gridSize } });
            }
        }
        
        return gridSegments;
    }

    determinePossibleValuesForCoordinate(gridSegment: GridSegment, coordinate: Coordinate): string[] {
        const columnValues: string[] = [];
        const rowValues: string[] = [];
        const possibleValues: string[] = [];
        const invalidFillValues: string[] = ['.', '*', '?'];
    
        // Start by filling in the possible values for the column of the coordinate
        for (let row = gridSegment.topLeft.y; row < gridSegment.bottomRight.y; row++) {
            // if (!invalidFillValues.includes(this.values[row][coordinate.x])) {
                columnValues.push(this.values[row][coordinate.x]);
            // }
        }
    
        // Next fill in the possible values for the row of the coordinate
        for (let column = gridSegment.topLeft.x; column < gridSegment.bottomRight.x; column++) {
            // if (!invalidFillValues.includes(this.values[coordinate.y][column])) {
                rowValues.push(this.values[coordinate.y][column]);
            // }
        }
    
        //Finally, only return values that are in both the column and row values
        for (const value of columnValues) {
            if (rowValues.includes(value)) {
                if (!possibleValues.includes(value) && !invalidFillValues.includes(value)) {
                    possibleValues.push(value);
                }
            }
        }
    
        return possibleValues;
    }

    determinePossibleValuesForCoordinateV2(gridSegment: GridSegment, coordinate: Coordinate): string[] {
        const columnValues: string[] = [];
        const rowValues: string[] = [];
        let possibleValues: string[] = [];
        const invalidFillValues: string[] = ['.', '*', '?'];
    
        // Start by filling in the possible values for the column of the coordinate
        for (let row = gridSegment.topLeft.y; row < gridSegment.bottomRight.y; row++) {
            if (!invalidFillValues.includes(this.values[row][coordinate.x])) {
                columnValues.push(this.values[row][coordinate.x]);
            }
        }
    
        // Next fill in the possible values for the row of the coordinate
        for (let column = gridSegment.topLeft.x; column < gridSegment.bottomRight.x; column++) {
            if (!invalidFillValues.includes(this.values[coordinate.y][column])) {
                rowValues.push(this.values[coordinate.y][column]);
            }
        }
    
        //Finally, only return values that are in both the column and row values
        for (const value of columnValues) {
            // Only add the value to the possible values if it's in the column values only once
            if (columnValues.filter(v => v === value).length === 1) {
                possibleValues.push(value);
            }
        }

        for (const value of rowValues) {
            // Only add the value to the possible values if it's in the row values only once
            if (rowValues.filter(v => v === value).length === 1) {
                possibleValues.push(value);
            }
        }
    
        return possibleValues;
    }

    solve() {
        const gridSegments = this.determineAllGridSegments();
        let continueFilling = true;

        while (continueFilling) {
            continueFilling = false;
            for (const gridSegment of gridSegments) {
                let continueFillingSegment = true;

                while (continueFillingSegment) {
                    const filledDots = this.attemptToFillGridSegments(gridSegment);
                    const filledQuestionMarks = this.attemptToFillQuestionMarks(gridSegment);
                    continueFillingSegment = filledDots || filledQuestionMarks;
                    continueFilling = continueFilling || filledDots || filledQuestionMarks;
                }
            }
        }
    }

    attemptToFillGridSegments(gridSegment: GridSegment): boolean {
        let filled = false;

        let coordinatesToFill = this.determineCoordinatesToFill(gridSegment);
        while (coordinatesToFill.length > 0) {
            const coordinate = coordinatesToFill.shift();
            const possibleValues = this.determinePossibleValuesForCoordinate(gridSegment, coordinate);
            console.log(`Possible values for coordinate ${coordinate.x}, ${coordinate.y}: ${possibleValues.join(', ')}`);

            if (possibleValues.length === 1) {
                this.values[coordinate.y][coordinate.x] = possibleValues[0];
                filled = true;
            }
        }
        return filled;
    }

    attemptToFillQuestionMarks(gridSegment: GridSegment): boolean {
        let filled = false;
        
        let coordinatesOfQuestionMarks: Coordinate[] = [];
        for (let row = gridSegment.topLeft.y; row < gridSegment.bottomRight.y; row++) {
            for (let column = gridSegment.topLeft.x; column < gridSegment.bottomRight.x; column++) {
                if (this.values[row][column] === '?') {
                    coordinatesOfQuestionMarks.push({ x: column, y: row });
                }
            }
        }


        for (const coordinateOfQuestionMark of coordinatesOfQuestionMarks) {
            // Find the unknown values in the column or row of the question mark.
            const coordinatesOfUnknownValues: Coordinate[] = [];

            if (coordinateOfQuestionMark.x > gridSegment.topLeft.x + 1 && coordinateOfQuestionMark.x < gridSegment.bottomRight.x - 1) {
                for (let row = gridSegment.topLeft.y + 1; row < gridSegment.bottomRight.y - 1; row++) {
                    if (this.values[row][coordinateOfQuestionMark.x] === '.') {
                        coordinatesOfUnknownValues.push({ x: coordinateOfQuestionMark.x, y: row });
                    }
                }
            } else {
                for (let column = gridSegment.topLeft.x + 1; column < gridSegment.bottomRight.x - 1; column++) {
                    if (this.values[coordinateOfQuestionMark.y][column] === '.') {
                        coordinatesOfUnknownValues.push({ x: column, y: coordinateOfQuestionMark.y });
                    }
                }
            }

            console.log(`There are ${coordinatesOfUnknownValues.length} unknown values in the column or row of the question mark ${coordinateOfQuestionMark.x}, ${coordinateOfQuestionMark.y}`);
            for (const coordinateOfUnknownValue of coordinatesOfUnknownValues) {
                const possibleValues = this.determinePossibleValuesForCoordinateV2(gridSegment, coordinateOfUnknownValue);
                console.log(`Possible values for coordinate ${coordinateOfUnknownValue.x}, ${coordinateOfUnknownValue.y}: ${possibleValues.join(', ')}`);

                if (possibleValues.length === 1) {
                    this.values[coordinateOfUnknownValue.y][coordinateOfUnknownValue.x] = possibleValues[0];
                    this.values[coordinateOfQuestionMark.y][coordinateOfQuestionMark.x] = possibleValues[0];
                    filled = true;
                }
            }
        }

        return filled;
    }
    
    determineCoordinatesToFill(gridSegment: GridSegment): Coordinate[] {
        const coordinatesToFill: Coordinate[] = [];
    
        for (let row = gridSegment.topLeft.y; row < gridSegment.bottomRight.y; row++) {
            for (let column = gridSegment.topLeft.x; column < gridSegment.bottomRight.x; column++) {
                if (this.values[row][column] === '.') {
                    coordinatesToFill.push({ x: column, y: row });
                }
            }
        }
        return coordinatesToFill;
    }

    print() {
        for (const row of this.values) {
            let line = '';
            for (const cell of row) {
                line += cell;
            }
            console.log(line);
        }
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