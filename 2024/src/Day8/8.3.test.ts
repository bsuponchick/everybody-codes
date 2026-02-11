import { describe, expect, test } from '@jest/globals';
import { calculateTotalArea, Level } from './8.3.logic';

describe('Day 8 - Part 3', () => {
    describe(`When the calculateTotalArea function is called...`, () => {
        test(`Should return 19 when the levels are [{height: 1, width: 1}, {height: 7, width: 3}] and there are 5 acolytes and 2 priests`, () => {
            const levels: Level[] = [{height: 1, width: 1}, {height: 7, width: 3}];
            expect(calculateTotalArea(levels, 5, 2)).toBe(19);
        });

        test(`Should return 67 when the levels are [{height: 1, width: 1}, {height: 7, width: 3}, { height: 9, width: 5}] and there are 5 acolytes and 2 priests`, () => {
            const levels: Level[] = [{height: 1, width: 1}, {height: 7, width: 3}, { height: 9, width: 5}];
            expect(calculateTotalArea(levels, 5, 2)).toBe(67);
        });

        test(`Should return 115 when the levels are [{height: 1, width: 1}, {height: 7, width: 3}, { height: 9, width: 5}, { height: 8, width: 7}] and there are 5 acolytes and 2 priests`, () => {
            const levels: Level[] = [{height: 1, width: 1}, {height: 7, width: 3}, { height: 9, width: 5}, { height: 8, width: 7}];
            expect(calculateTotalArea(levels, 5, 2)).toBe(115);
        });
    });
});