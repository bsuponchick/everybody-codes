import { describe, expect, test } from '@jest/globals';
import { determinePerimeterCount, determineSmallestPineconesNeededForSquarePermiter } from './1.2.logic';

describe('Day 1 - Part 2', () => {
    describe(`When the determinePerimeterCount method is called...`, () => {
        test(`It should return 8 when the side length is 3`, () => {
            expect(determinePerimeterCount(3)).toBe(8);
        });

        test(`It should return 16 when the side length is 5`, () => {
            expect(determinePerimeterCount(5)).toBe(16);
        });
    });

    describe(`When the determineSmallestPineconesNeededForSquarePermiter method is called`, () => {
        test(`It should return 8 when the pinecone count is 4`, () => {
            expect(determineSmallestPineconesNeededForSquarePermiter(4)).toBe(8);
        });

        test(`It should return 12 when the pinecone count is 9`, () => {
            expect(determineSmallestPineconesNeededForSquarePermiter(9)).toBe(12);
        });

        test(`It should return 8 when the pinecone count is 8`, () =>{
            expect(determineSmallestPineconesNeededForSquarePermiter(8)).toBe(8);
        });
    });
});