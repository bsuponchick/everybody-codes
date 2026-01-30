import { describe, expect, test } from '@jest/globals';
import { isValidMentor } from './6.1.logic';

describe('Day 6 - Part 1', () => {
    describe(`When the isValidMentor function is called...`, () => {
        test(`It should return true when the mentor is the capital letter of the student`, () => {
            expect(isValidMentor({ mentor: 'A', student: 'a' })).toBe(true);
        });

        test(`It should return false when the mentor is not the capital letter of the student`, () => {
            expect(isValidMentor({ mentor: 'A', student: 'b' })).toBe(false);
        });
    });
});