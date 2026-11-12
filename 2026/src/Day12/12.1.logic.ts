import { Coordinate } from '../utils/interfaces/coordinate';
interface Polygon {
    vertices: Coordinate[];
}

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

export const calculateHeightOfRectangle = (polygon: Polygon): number => {
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

export const calculateWidthOfRectangle = (polygon: Polygon): number => {
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