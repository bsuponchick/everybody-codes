import { describe, expect, test } from '@jest/globals';
import { Triplet, Spine } from './5.1.logic';

describe('Day 5 - Part 1', () => {
    describe(`Triplet...`, () => {
        describe(`When the constructor is called...`, () => {
            test(`with 1, it should create a triplet with center 1, left null, and right null`, () => {
                const triplet = new Triplet(1);
                expect(triplet.getCenter()).toBe(1);
                expect(triplet.getLeft()).toBeNull();
                expect(triplet.getRight()).toBeNull();
            });
        });
        
        describe(`When the add function is called...`, () => {
            test(`with 2, it should add 2 to the right of the triplet`, () => {
                const triplet = new Triplet(1);
                const added = triplet.add(2);
                expect(added).toBe(true);
                expect(triplet.getRight()).toBe(2);
            });
        });

        describe(`When the add function is called...`, () => {
            test(`with 0, it should add 0 to the left of the triplet`, () => {
                const triplet = new Triplet(1);
                const added = triplet.add(0);
                expect(added).toBe(true);
                expect(triplet.getLeft()).toBe(0);
            });
        });

        describe(`When the add function is called...`, () => {
            test(`with 3, it should return false`, () => {
                const triplet = new Triplet(1);
                triplet.add(2);
                const added = triplet.add(3);
                expect(added).toBe(false);
            });
        });
    });

    describe(`Spine...`, () => {
        describe(`When the constructor is called...`, () => {
            test(`it should create a spine with an empty array of triplets`, () => {
                const spine = new Spine();
                expect(spine.getTriplets()).toEqual([]);
            });
        });

        describe(`When the add function is called...`, () => {
            test(`with 1, it should add 1 to the spine`, () => {
                const spine = new Spine();
                spine.add(1);
                expect(spine.getTriplets().length).toBe(1);
                expect(spine.getTriplets()[0].getCenter()).toBe(1);
                expect(spine.getTriplets()[0].getLeft()).toBeNull();
                expect(spine.getTriplets()[0].getRight()).toBeNull();
            });

            test(`with 2, it should add 2 to the spine`, () => {
                const spine = new Spine();
                spine.add(1);
                spine.add(2);
                expect(spine.getTriplets().length).toBe(1);
                expect(spine.getTriplets()[0].getCenter()).toBe(1);
                expect(spine.getTriplets()[0].getLeft()).toBeNull();
                expect(spine.getTriplets()[0].getRight()).toBe(2);
            });

            test(`with 3, it should add 3 to the spine`, () => {
                const spine = new Spine();
                spine.add(1);
                spine.add(2);
                spine.add(3);
                expect(spine.getTriplets().length).toBe(2);
                expect(spine.getTriplets()[0].getCenter()).toBe(1);
                expect(spine.getTriplets()[0].getLeft()).toBeNull();
                expect(spine.getTriplets()[0].getRight()).toBe(2);
                expect(spine.getTriplets()[1].getCenter()).toBe(3);
                expect(spine.getTriplets()[1].getLeft()).toBeNull();
                expect(spine.getTriplets()[1].getRight()).toBeNull();
            });
        });
    });
});