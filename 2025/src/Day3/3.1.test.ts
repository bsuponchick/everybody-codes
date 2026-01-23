import { describe, expect, test } from '@jest/globals';
import { determineLargestDecliningSubset } from './3.1.logic';

describe('Day 3 - Part 1', () => {
    describe(`When the determineLargestDecliningSubset function is called...`, () => {
        test(`It should return [10, 8, 5, 3, 2, 1] when given [10, 5, 1, 10, 3, 8, 5, 2, 2]`, () => {
            expect(determineLargestDecliningSubset([10, 5, 1, 10, 3, 8, 5, 2, 2])).toEqual([10, 8, 5, 3, 2, 1]);
        });
    });
});