export class Triplet {
    center: number;
    left: number | null;
    right: number | null;

    constructor(center: number) {
        this.center = center;
        this.left = null;
        this.right = null;
    }

    add(value: number): boolean {
        if (value < this.center && this.left === null) {
            this.left = value;
            return true;
        } else if (value > this.center && this.right === null) {
            this.right = value;
            return true;
        }
        return false;
    }

    getCenter() {
        return this.center;
    }

    getLeft() {
        return this.left;
    }
    
    getRight() {
        return this.right;
    }
}

export class Spine {
    triplets: Triplet[];

    constructor() {
        this.triplets = [];
    }

    add(value: number) {
        if (this.triplets.length === 0) {
            this.triplets.push(new Triplet(value));
        } else {
            let added = false;

            for (const triplet of this.triplets) {
                if (triplet.add(value)) {
                    added = true;
                    break;
                }
            }

            if (!added) {
                this.triplets.push(new Triplet(value));
            }
        }
    }

    getQuality(): number {
        let quality = '';

        for (const triplet of this.triplets) {
            quality += triplet.getCenter().toString();
        }

        return parseInt(quality, 10);
    }

    getTriplets() {
        return this.triplets;
    }
}