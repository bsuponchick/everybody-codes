import { Coordinate } from "../utils/interfaces/coordinate";

export class Rock {
    coordinate: Coordinate;
    hp: number;

    constructor(coordinate: Coordinate, hp: number) {
        this.coordinate = coordinate;
        this.hp = hp;
    }

    getCoordinate() {
        return this.coordinate;
    }

    getHp() {
        return this.hp;
    }   
}