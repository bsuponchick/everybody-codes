interface TreeSegmentProps {
    x: number;
    y: number;
    z: number;
    t: number;
}

export enum TreeSegmentDirection {
    U = 'U',
    D = 'D',
    L = 'L',
    R = 'R',
    F = 'F',
    B = 'B',
}

export class TreeSegment {
    x: number;
    y: number;
    z: number;
    t: number;
    
    constructor(props: TreeSegmentProps) {
        this.x = props.x;
        this.y = props.y;
        this.z = props.z;
        this.t = props.t;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    getT() {
        return this.t;
    }

    grow(direction: TreeSegmentDirection): TreeSegment {
        switch (direction) {
            case TreeSegmentDirection.U:
                return new TreeSegment({
                    x: this.x,
                    y: this.y,
                    z: this.z + 1,
                    t: this.t + 1,
                })
            case TreeSegmentDirection.D:
                return new TreeSegment({
                    x: this.x,
                    y: this.y,
                    z: this.z - 1,
                    t: this.t + 1,
                });
            case TreeSegmentDirection.L:
                return new TreeSegment({
                    x: this.x - 1,
                    y: this.y,
                    z: this.z,
                    t: this.t + 1,
                });
            case TreeSegmentDirection.R:
                return new TreeSegment({
                    x: this.x + 1,
                    y: this.y,
                    z: this.z,
                    t: this.t + 1,
                });
            case TreeSegmentDirection.F:
                return new TreeSegment({
                    x: this.x,
                    y: this.y + 1,
                    z: this.z,
                    t: this.t + 1,
                });
            case TreeSegmentDirection.B:
                return new TreeSegment({
                    x: this.x,
                    y: this.y - 1,
                    z: this.z,
                    t: this.t + 1,
                });
            default:
                throw new Error(`Invalid direction: ${direction}`);
        }
    }
}