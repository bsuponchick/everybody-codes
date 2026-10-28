import { describe, expect, test } from '@jest/globals';
import { calculateAreaOfSquare, determineSmallestOutpostAreaFromPineconeCount } from './1.1.logic';

describe('Day 1 - Part 1', () => {
    describe(`When the calculateAreaOfSquare method is called...`, () => {
        test(`It should return 1 when the current length is 1`, () => {
            expect(calculateAreaOfSquare(1)).toBe(1);
        });

        test(`It should return 25 when the current length is 5`, () => {
            expect(calculateAreaOfSquare(5)).toBe(25);
        });
    });

    describe(`When the determineSmallestOutpostAreaFromPineconeCount method is called...`, () => {
        test(`It should return 25 when the pinecone count is 21`, () => {
            expect(determineSmallestOutpostAreaFromPineconeCount(21)).toBe(25);
        });

        test(`It should return 1 when the pinecone count is 1`, () => {
            expect(determineSmallestOutpostAreaFromPineconeCount(1)).toBe(1);
        });
    });
});