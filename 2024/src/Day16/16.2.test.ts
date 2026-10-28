import { describe, expect, test } from '@jest/globals';
import { calculateScore } from './16.2.logic';

describe('Day 16 - Part 2', () => {
    describe(`When the calculateScore function is called...`, () => {
        test(`Should return 1 for ['>.-','-.-','^_^']`, () => {
            expect(calculateScore(['>.-','-.-','^_^'])).toBe(1);
        });

        test(`Should return 5 for ['^_^','^_^','^_^']`, () => {
            expect(calculateScore(['^_^','^_^','^_^'])).toBe(4);
        });

        test(`Should return 2 for ['^_^','^_^','>.<']`, () => {
            expect(calculateScore(['^_^','^_^','>.<'])).toBe(2);
        });
    });
});