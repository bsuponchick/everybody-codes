export const determineWeight = (currentElevation: number, targetElevation: number): number => {
    const initialWeight = 1;

    // Elevations range from 0 to 9 and can wrap around from 9 to 0
    const elevations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const currentElevationIndex = elevations.indexOf(currentElevation);
    const targetElevationIndex = elevations.indexOf(targetElevation);

    let distance = Math.abs(currentElevationIndex - targetElevationIndex);

    if (distance > 5) {
        distance = 10 - distance;
    }

    return initialWeight + distance;
}