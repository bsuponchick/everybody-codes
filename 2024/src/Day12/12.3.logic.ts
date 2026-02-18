import { Coordinate } from "../utils/interfaces/coordinate";

export interface Triplet {
    x: number;
    y: number;
    t: number;
}

interface Hit {
    elevation: number;
    ranking: number;
}

export class Meteor {
    startingPosition: Coordinate;

    constructor(startingPosition: Coordinate) {
        this.startingPosition = startingPosition;
    }

    getAllPositions(): Triplet[] {
        const positions: Triplet[] = [{ x: this.startingPosition.x, y: this.startingPosition.y, t: 0 }];
        let currentPosition = { x: this.startingPosition.x, y: this.startingPosition.y };
        let timeInAir = 0;

        while (currentPosition.y >= 0) {
            currentPosition.y -= 1;
            currentPosition.x -= 1;
            timeInAir += 1;
            positions.push({ x: currentPosition.x, y: currentPosition.y, t: timeInAir });
        }

        return positions;
    }
}

export class Catapult {
    coordinate: Coordinate;
    potentialTargetsInRange: Map<string, number>;
    maxPower: number = 2500;  // Setting this statically for now...

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.potentialTargetsInRange = new Map();

        this.determinePotentialTargetsInRange();
    }

    determinePotentialTargetsInRange() {
        for (let power = 1; power <= this.maxPower; power++) {
            let currentCoordinate = { x: this.coordinate.x, y: this.coordinate.y };
            let timeInAir = 0;
            
            // Handle the upward diagonal
            for (let riseInElevation = 1; riseInElevation <= power; riseInElevation++) {
                currentCoordinate.x += 1;
                currentCoordinate.y += 1;
                timeInAir += 1;

                if (!this.potentialTargetsInRange.has(`${currentCoordinate.x},${currentCoordinate.y},${timeInAir}`)) {
                    this.potentialTargetsInRange.set(`${currentCoordinate.x},${currentCoordinate.y},${timeInAir}`, power);
                }
            }

            // Handle the horizontal
            for (let horizontalDistance = 1; horizontalDistance <= power; horizontalDistance++) {
                currentCoordinate.x += 1;
                timeInAir += 1;

                if (!this.potentialTargetsInRange.has(`${currentCoordinate.x},${currentCoordinate.y},${timeInAir}`)) {
                    this.potentialTargetsInRange.set(`${currentCoordinate.x},${currentCoordinate.y},${timeInAir}`, power);
                }
            }
            
            // Handle the downward diagonal
            for (let fallInElevation = 1; currentCoordinate.y > 0; fallInElevation++) {
                currentCoordinate.x += 1;
                currentCoordinate.y -= 1;
                timeInAir += 1; 

                if (!this.potentialTargetsInRange.has(`${currentCoordinate.x},${currentCoordinate.y},${timeInAir}`)) {
                    this.potentialTargetsInRange.set(`${currentCoordinate.x},${currentCoordinate.y},${timeInAir}`, power);
                }
            }
        }
    }

    determineRankingToReachTargets(targets: Triplet[]): number[] {
        const powerRequirements: number[] = [];

        for (const target of targets) {
            if (this.potentialTargetsInRange.has(`${target.x},${target.y},${target.t}`)) {
                powerRequirements.push(this.potentialTargetsInRange.get(`${target.x},${target.y},${target.t}`) * (this.coordinate.y + 1));  // Power * (elevation + 1)
            } else {
                powerRequirements.push(-1);
            }
        }

        return powerRequirements;
    }

    determineHighestElevationToReachFallingMeteor(trajectory: Triplet[]): Hit {
        let highestElevation = -1;
        let hit: Hit = { elevation: -1, ranking: -1 };

        for (const position of trajectory) {
            const ranking = this.determineRankingToReachTargets([position]);
            if (ranking[0] !== -1 && position.y > highestElevation) {
                highestElevation = position.y;
                hit = { elevation: position.y, ranking: ranking[0] };
            }
        }

        return hit;
    }
}