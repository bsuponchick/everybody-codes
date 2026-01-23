import { describe, expect, test } from '@jest/globals';
import { shouldEngrave } from './2.2.logic';

describe('Day 2 - Part 2', () => {
    describe(`When the shouldEngrave function is called...`, () => {
        test(`It should return false when given { x: 35460, y: -64910}`, () => {
            expect(shouldEngrave({ x: 35460, y: -64910 })).toBe(false);
        });

        test(`It should return false when given { x: 35470, y: -64910}`, () => {
            expect(shouldEngrave({ x: 35470, y: -64910 })).toBe(false);
        });

        test(`It should return false when given { x: 35480, y: -64910 }`, () => {
            expect(shouldEngrave({ x: 35480, y: -64910 })).toBe(false);
        });

        test(`It should return false when given { x: 35680, y: -64850 }`, () => {
            expect(shouldEngrave({ x: 35680, y: -64850 })).toBe(false);
        });

        test(`It should return false when given { x: 35630, y: -64830 }`, () => {
            expect(shouldEngrave({ x: 35630, y: -64830 })).toBe(false);
        });

        test(`It should return true when given { x: 35630, y: -64880}`, () => {
            expect(shouldEngrave({ x: 35630, y: -64880})).toBe(true);
        });

        test(`It should return true when given { x: 35630, y: -64870 }`, () => {
            expect(shouldEngrave({ x: 35630, y: -64870 })).toBe(true);
        });

        test(`It should return true when given { x: 35640, y: -64860 }`, () => {
            expect(shouldEngrave({ x: 35640, y: -64860 })).toBe(true);
        });

        test(`It should return true when given { x: 36230, y: -64270 }`, () => {
            expect(shouldEngrave({ x: 36230, y: -64270 })).toBe(true);
        });

        test(`It should return true when given { x: 36250, y: -64270 }`, () => {
            expect(shouldEngrave({ x: 36250, y: -64270 })).toBe(true);
        });
    });
});