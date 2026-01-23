import { describe, expect, test } from '@jest/globals';
import { add, multiply, divide, cycle } from './2.1.logic';
import { Coordinate } from '../utils/interfaces/coordinate';

describe('Day 2 - Part 1', () => {
    describe(`When the add function is called...`, () => {
        test(`It should return { x: 3, y: 3} when given { x: 1, y: 1 } and { x: 2, y: 2 }`, () => {
            expect(add({ x: 1, y: 1 }, { x: 2, y: 2 })).toEqual({ x: 3, y: 3 });
        });

        test(`It should return { x: 5, y: 12 } when given { x: 2, y: 5 } and { x: 3, y: 7 }`, () => {
            expect(add({ x: 2, y: 5 }, { x: 3, y: 7 })).toEqual({ x: 5, y: 12 });
        });

        test(`It should return { x: 8, y: 4 } when given { x: -2, y: 5 } and { x: 10, y: -1 }`, () => {
            expect(add({ x: -2, y: 5 }, { x: 10, y: -1 })).toEqual({ x: 8, y: 4 });
        });

        test(`It should return { x: -4, y: -6 } when given { x: -1, y: -2 } and { x: -3, y: -4 }`, () => {
            expect(add({ x: -1, y: -2 }, { x: -3, y: -4 })).toEqual({ x: -4, y: -6 });
        });
    });

    describe(`When the multiply function is called...`, () => {
        test(`It should return { x: 0, y: 4 } when given { x: 1, y: 1 } and {x: 2, y: 2 }`, () => {
            expect(multiply({ x: 1, y: 1 }, { x: 2, y: 2 })).toEqual({ x: 0, y: 4 });
        });

        test(`It should return { x: -29, y: 29 } when given { x: 2, y: 5 } and { x: 3, y: 7 }`, () => {
            expect(multiply({ x: 2, y: 5 }, { x: 3, y: 7 })).toEqual({ x: -29, y: 29 });
        });

        test(`It should return { x: -15, y: 52 } when given { x: -2, y: 5 } and { x: 10, y: -1 }`, () => {
            expect(multiply({ x: -2, y: 5 }, { x: 10, y: -1 })).toEqual({ x: -15, y: 52 });
        });

        test(`It should return { x: -5, y: 10 } when given { x: -1, y: -2 } and { x: -3, y: -4 }`, () => {
            expect(multiply({ x: -1, y: -2 }, { x: -3, y: -4 })).toEqual({ x: -5, y: 10 });
        });        
    });

    describe(`When the divide function is called...`, () => {
        test(`It should return { x: 5, y: 6 } when given { x: 10, y: 12 } and { x: 2, y: 2 }`, () => {
            expect(divide({ x: 10, y: 12 }, { x: 2, y: 2 })).toEqual({ x: 5, y: 6 });
        });

        test(`It should return { x: 3, y: 2 } when given { x: 11, y: 12 } and { x: 3, y: 5 }`, () => {
            expect(divide({ x: 11, y: 12 }, { x: 3, y: 5 })).toEqual({ x: 3, y: 2 });
        });

        test(`It should return { x: -5, y: -6 } when given { x: -10, y: -12 } and { x: 2, y: 2 }`, () => {
            expect(divide({ x: -10, y: -12 }, { x: 2, y: 2 })).toEqual({ x: -5, y: -6 });
        });

        test(`It should return { x: -3, y: -2 } when given { x: -11, y: -12 } and { x: 3, y: 5 }`, () => {
            expect(divide({ x: -11, y: -12 }, { x: 3, y: 5 })).toEqual({ x: -3, y: -2 });
        });
    });

    describe(`When the cycle function is called...`, () => {
        test(`It should return { x: 25, y: 9 } when given { x: 0, y: 0 } and { x: 25, y: 9 } and 1`, () => {
            expect(cycle({ x: 0, y: 0 }, { x: 25, y: 9 }, 1)).toEqual({ x: 25, y: 9 });
        });

        test(`It should return { x: 79, y: 54 } when given { x: 25, y: 9 } and { x: 25, y: 9 } and 2`, () => {
            expect(cycle({ x: 25, y: 9 }, { x: 25, y: 9 }, 2)).toEqual({ x: 79, y: 54 });
        });

        test(`It should return { x: 357, y: 862 } when given { x: 79, y: 54 } and { x: 25, y: 9 } and 3`, () => {
            expect(cycle({ x: 79, y: 54 }, { x: 25, y: 9 }, 3)).toEqual({ x: 357, y: 862 });
        });
    });
});