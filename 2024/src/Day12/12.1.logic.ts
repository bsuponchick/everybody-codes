import { Coordinate } from "../utils/interfaces/coordinate";

export class Catapult {
    coordinate: Coordinate;
    potentialTargetsInRange: Map<string, number>;
    maxPower: number = 100;  // Setting this statically for now...

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.potentialTargetsInRange = new Map();

        this.determinePotentialTargetsInRange();
    }

    determinePotentialTargetsInRange() {
        // console.log(`Determining potential targets in range for catapult at ${this.coordinate.x},${this.coordinate.y}`);

        for (let power = 1; power <= this.maxPower; power++) {
            // console.log(`Determining potential targets in range for power ${power}`);
            let currentCoordinate = { x: this.coordinate.x, y: this.coordinate.y };
            
            // Handle the upward diagonal
            for (let riseInElevation = 1; riseInElevation <= power; riseInElevation++) {
                currentCoordinate.x += 1;
                currentCoordinate.y += 1;

                // console.log(`Checking if target ${currentCoordinate.x},${currentCoordinate.y} is in potential targets in range for power ${power}`);
                if (!this.potentialTargetsInRange.has(`${currentCoordinate.x},${currentCoordinate.y}`)) {
                    // console.log(`Adding target ${currentCoordinate.x},${currentCoordinate.y} to potential targets in range for power ${power}`);
                    this.potentialTargetsInRange.set(`${currentCoordinate.x},${currentCoordinate.y}`, power);
                }
            }

            // Handle the horizontal
            for (let horizontalDistance = 1; horizontalDistance <= power; horizontalDistance++) {
                currentCoordinate.x += 1;

                // console.log(`Checking if target ${currentCoordinate.x},${currentCoordinate.y} is in potential targets in range for power ${power}`);
                if (!this.potentialTargetsInRange.has(`${currentCoordinate.x},${currentCoordinate.y}`)) {
                    // console.log(`Adding target ${currentCoordinate.x},${currentCoordinate.y} to potential targets in range for power ${power}`);
                    this.potentialTargetsInRange.set(`${currentCoordinate.x},${currentCoordinate.y}`, power);
                }
            }
            
            // Handle the downward diagonal
            for (let fallInElevation = 1; currentCoordinate.y > 0; fallInElevation++) {
                currentCoordinate.x += 1;
                currentCoordinate.y -= 1;

                // console.log(`Checking if target ${currentCoordinate.x},${currentCoordinate.y} is in potential targets in range for power ${power}`);
                if (!this.potentialTargetsInRange.has(`${currentCoordinate.x},${currentCoordinate.y}`)) {
                    // console.log(`Adding target ${currentCoordinate.x},${currentCoordinate.y} to potential targets in range for power ${power}`);
                    this.potentialTargetsInRange.set(`${currentCoordinate.x},${currentCoordinate.y}`, power);
                }
            }
        }
    }

    determineRankingToReachTargets(targets: Coordinate[]): number[] {
        const powerRequirements: number[] = [];

        for (const target of targets) {
            if (this.potentialTargetsInRange.has(`${target.x},${target.y}`)) {
                powerRequirements.push(this.potentialTargetsInRange.get(`${target.x},${target.y}`) * (this.coordinate.y + 1));  // Power * (elevation + 1)
            } else {
                powerRequirements.push(-1);
            }
        }

        return powerRequirements;
    }
}