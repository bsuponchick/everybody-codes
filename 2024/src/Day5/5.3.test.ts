import { describe, expect, test } from '@jest/globals';
import { dance } from './5.3.logic';

describe('Day 5 - Part 3', () => {
    describe(`When the dance function is called...`, () => {
        test(`It should properly wrap...`, () => {
            const dancers = [1, 2, 3, 4, 5];
            const clapper = 6;

            const result = dance(dancers, clapper);

            expect(result).toEqual([1, 2, 3, 4, 5, 6]);
        });

        test(`It should properly wrap multiple times and stop on the left...`, () => {
            const dancers = [1, 2, 3, 4, 5];
            const clapper = 11;

            const result = dance(dancers, clapper);

            expect(result).toEqual([11, 1, 2, 3, 4, 5]);
        });

        test(`It should properly wrap multiple times and stop on the right...`, () => {
            const dancers = [1, 2, 3, 4, 5];
            const clapper = 17;

            const result = dance(dancers, clapper);

            expect(result).toEqual([1, 2, 3, 4, 17, 5]);
        });
    });
});