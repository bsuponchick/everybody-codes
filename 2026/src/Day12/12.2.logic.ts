import { Coordinate } from '../utils/interfaces/coordinate';
interface Polygon {
    vertices: Coordinate[];
}

enum Direction {
    north = 'N',
    south = 'S',
    east = 'E',
    west = 'W'
};

export const identifyPolygons = (map: string[][]): Polygon[] => {
    const polygons: Polygon[] = [];

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === '#') {
                // identify top left vertices of a polygon
                let isTop = row === 0 || map[row - 1][col] === '.';
                let isLeft = col === 0 || map[row][col - 1] === '.';

                if (isTop && isLeft) {
                    // This is a top left of a polygon, add it.
                    const polygon: Polygon = {
                        vertices: [{x: col, y: row}]
                    };

                    // Iterate to the right until we find the top right vertex
                    const topRightCoordinate = { x: col, y: row };
                    while (topRightCoordinate.x < map[row].length - 1 && map[row][topRightCoordinate.x + 1] === '#') {
                        topRightCoordinate.x += 1;
                    }

                    polygon.vertices.push(topRightCoordinate);

                    // Iterate down to until we find the bottom right vertex
                    const bottomRightCoordinate = { x: topRightCoordinate.x, y: row };
                    while (bottomRightCoordinate.y < map.length - 1 && map[bottomRightCoordinate.y + 1][col] === '#') {
                        bottomRightCoordinate.y += 1;
                    }

                    polygon.vertices.push(bottomRightCoordinate);

                    // Because each polygon is a rectangle, determine the bottom left
                    polygon.vertices.push({
                        x: col,
                        y: bottomRightCoordinate.y
                    });

                    polygons.push(polygon);
                }
            }
        }
    }

    return polygons;
}

interface IdentifyVerticesParams {
    map: string[][];
    currentVertex: Coordinate;
    direction: Direction;
    polygon: Polygon;
}

export const identifyVertices = (params: IdentifyVerticesParams): void => {
    const { map, polygon } = params;

    // If there is nowhere to go, this is the only vertex
    const start = params.currentVertex;
    const hasNeighbor = [Direction.north, Direction.south, Direction.east, Direction.west]
        .some((direction) => isFilled(map, move(start, direction)));
    if (!hasNeighbor) {
        return;
    }

    // The polygon is traced clockwise, so the interior is always on the right-hand side.
    // Each pass walks one edge to its next vertex, then turns. Tracing stops when it
    // reaches a vertex that is already in the polygon.
    const position: Coordinate = { x: start.x, y: start.y };
    let direction = params.direction;

    while (true) {
        // Each direction defines which way is a left turn (concave corner), a right turn
        // (convex corner), and a reversal (dead end of a one-wide line).
        let left: Direction;
        let right: Direction;
        let back: Direction;

        switch (direction) {
            case Direction.north:
                // Continue north until you can also go either east or west, this is a vertex
                left = Direction.west;
                right = Direction.east;
                back = Direction.south;
                break;
            case Direction.south:
                // Continue south until you can also go either east or west, this is a vertex
                left = Direction.east;
                right = Direction.west;
                back = Direction.north;
                break;
            case Direction.east:
                // Continue east until you can also go either north or south, this is a vertex
                left = Direction.north;
                right = Direction.south;
                back = Direction.west;
                break;
            case Direction.west:
                // Continue west until you can also go either north or south, this is a vertex
                left = Direction.south;
                right = Direction.north;
                back = Direction.east;
                break;
            default:
                throw new Error(`Invalid direction detected : ${JSON.stringify(direction)}`);
        }

        // Walk forward until the boundary changes direction.
        //  - If the cell to the left opens up after a step, it's a concave corner: turn left.
        //  - If we can't step forward, it's a convex corner: turn right (or reverse at a dead end).
        const edgeStart = { x: position.x, y: position.y };
        let nextDirection: Direction;

        while (true) {
            const ahead = move(position, direction);
            if (!isFilled(map, ahead)) {
                nextDirection = isFilled(map, move(position, right)) ? right : back;
                break;
            }

            position.x = ahead.x;
            position.y = ahead.y;

            if (isFilled(map, move(position, left))) {
                nextDirection = left;
                break;
            }
        }

        // If we didn't move, we're turning in place at the current vertex (e.g. the starting corner).
        const moved = position.x !== edgeStart.x || position.y !== edgeStart.y;

        // Add the vertex, or stop if it is already in the polygon's vertices
        if (moved) {
            const alreadyFound = polygon.vertices.some((v) => v.x === position.x && v.y === position.y);
            if (alreadyFound) {
                return;
            }
            polygon.vertices.push({ x: position.x, y: position.y });
        }

        direction = nextDirection;
    }
}

const DELTAS: Record<Direction, Coordinate> = {
    [Direction.north]: { x: 0, y: -1 },
    [Direction.south]: { x: 0, y: 1 },
    [Direction.east]: { x: 1, y: 0 },
    [Direction.west]: { x: -1, y: 0 },
};

const move = (from: Coordinate, direction: Direction): Coordinate => ({
    x: from.x + DELTAS[direction].x,
    y: from.y + DELTAS[direction].y,
});

const isFilled = (map: string[][], c: Coordinate): boolean =>
    c.y >= 0 && c.y < map.length && c.x >= 0 && c.x < map[c.y].length && map[c.y][c.x] === '#';

export const calculateHeightOfPolygon = (polygon: Polygon): number => {
    if (polygon.vertices.length === 0) {
        return 0;
    }

    // Find the vertex with the lowest y and the highest y
    let lowestY = polygon.vertices[0].y;
    let highestY = polygon.vertices[0].y;

    polygon.vertices.forEach((vertex) => {
        if (vertex.y > highestY) {
            highestY = vertex.y;
        }

        if (vertex.y < lowestY) {
            lowestY = vertex.y;
        }
    });

    return highestY - lowestY + 1;
}

export const calculateWidthOfPolygon = (polygon: Polygon): number => {
    if (polygon.vertices.length === 0) {
        return 0;
    }

    // Find the vertex with the lowest x and the highest x
    // Find the vertex with the lowest y and the highest y
    let lowestX = polygon.vertices[0].x;
    let highestX = polygon.vertices[0].x;

    polygon.vertices.forEach((vertex) => {
        if (vertex.x > highestX) {
            highestX = vertex.x;
        }

        if (vertex.x < lowestX) {
            lowestX = vertex.x;
        }
    });

    return highestX - lowestX + 1;
}