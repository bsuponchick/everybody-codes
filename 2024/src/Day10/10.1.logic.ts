import { Coordinate } from '../utils/interfaces/coordinate';

export const determinePossibleValuesForCoordinate = (grid: string[][], coordinate: Coordinate): string[] => {
    const columnValues: string[] = [];
    const rowValues: string[] = [];
    const possibleValues: string[] = [];

    // Start by filling in the possible values for the column of the coordinate
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][coordinate.x] !== '.' && grid[row][coordinate.x] !== '*') {
            columnValues.push(grid[row][coordinate.x]);
        }
    }

    // Next fill in the possible values for the row of the coordinate
    for (let column = 0; column < grid[0].length; column++) {
        if (grid[coordinate.y][column] !== '.' && grid[coordinate.y][column] !== '*') {
            rowValues.push(grid[coordinate.y][column]);
        }
    }

    //Finally, only return values that are in both the column and row values
    for (const value of columnValues) {
        if (rowValues.includes(value)) {
            possibleValues.push(value);
        }
    }

    return possibleValues;
}

export const determineCoordinatesToFill = (grid: string[][]): Coordinate[] => {
    const coordinatesToFill: Coordinate[] = [];

    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
            if (grid[row][column] === '.') {
                coordinatesToFill.push({ x: column, y: row });
            }
        }
    }
    return coordinatesToFill;
}