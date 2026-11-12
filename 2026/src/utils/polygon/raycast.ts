import { Coordinate } from '../interfaces/coordinate'

export const isPointInPolygon = (point: Coordinate, polygon: Coordinate[]): boolean => {
    // A polygon has at least 3 vertices, break if less
    if (polygon.length < 3) {
        return false;
    }

    let isInside = false;
    const { x, y} = point;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x;
        const yi = polygon[i].y;
        const xj = polygon[j].x;
        const yj = polygon[j].y;

        // Determine if the horizontal ray intersects with an edge
        const intersect = yi > y !== yj > y && ((xj - xi)) * (yj - yi) + xi;

        // Alternate isInside for each intersection found, we care about odd intersection counts
        if (intersect) {
            isInside = !isInside
        }
    }
}