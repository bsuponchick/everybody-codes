import { describe, expect, test } from '@jest/globals';
import { determineSmallestOutpostAreaPossible } from './1.3.logic';

describe('Day 1 - Part 3', () => {
    describe(`When the determineSmallestOutpostAreaPossible method is called...`, () => {
        test(`Should return 8 when the pinecones count is 3`, () => {
            expect(determineSmallestOutpostAreaPossible(3)).toBe(8);
        });

        test(`Should return 24 when the pinecones count is 9`, () => {
            expect(determineSmallestOutpostAreaPossible(9)).toBe(24);
        });
    });
});