import { describe, expect, test } from '@jest/globals';
import { calculateNextThickness } from './8.2.logic';

describe('Day 8 - Part 2', () => {
    describe(`When the calculateNextThickness function is called...`, () => {
        test(`Should return 3 when the previous thickness is 1, the count of priests is 3 and the count of acolytes is 5`, () => {
            expect(calculateNextThickness({ previousThickness: 1, countOfPriests: 3, countOfAcolytes: 5 })).toBe(3);
        });

        test(`Should return 4 when the previous thickness is 3, the count of priests is 3 and the count of acolytes is 5`, () => {
            expect(calculateNextThickness({ previousThickness: 3, countOfPriests: 3, countOfAcolytes: 5 })).toBe(4);
        });

        test(`Should return 2 when the previous thickness is 4, the count of priests is 3 and the count of acolytes is 5`, () => {
            expect(calculateNextThickness({ previousThickness: 4, countOfPriests: 3, countOfAcolytes: 5 })).toBe(2);
        });

        test(`Should return 1 when the previous thickness is 2, the count of priests is 3 and the count of acolytes is 5`, () => {
            expect(calculateNextThickness({ previousThickness: 2, countOfPriests: 3, countOfAcolytes: 5 })).toBe(1);
        });
    });
});