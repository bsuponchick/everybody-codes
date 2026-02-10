export interface TrackInput {
    value: string;
    visited: boolean;
    neighbors: TrackInput[];
}

export const MAX_ROUNDS = 2024;
export const STARTING_ENERGY = 10;

export const connectTrackInputs = (inputs: TrackInput[][]) => {
    for (let row = 0; row < inputs.length; row++) {
        for (let column = 0; column < inputs[row].length; column++) {
            const current = inputs[row][column];

            if (current === null) {
                continue;
            }

            // Add North neighbor
            if ((row > 0) && (inputs[row - 1][column] !== null)) {
                current.neighbors.push(inputs[row - 1][column]);
            }

            // Add South neighbor
            if ((row < inputs.length - 1) && (inputs[row + 1][column] !== null)) {
                current.neighbors.push(inputs[row + 1][column]);
            }

            // Add West neighbor
            if ((column > 0) && (inputs[row][column - 1] !== null)) {
                current.neighbors.push(inputs[row][column - 1]);
            }

            // Add East neighbor
            if ((column < inputs[row].length - 1) && (inputs[row][column + 1] !== null)) {
                current.neighbors.push(inputs[row][column + 1]);
            }
        }
    }
}

export const determineTrackActionsInOrder = (inputs: TrackInput[][]): string[] => {
    let trackActions: string[] = [];
    let countTrackActions = 0;

    // Start with the first position after S
    const queue = [inputs[0][1]];

    while (queue.length > 0) {
        const current = queue.shift();

        countTrackActions++;
        if (current.value !== 'S') {
            trackActions.push(current.value);
        }

        current.neighbors.forEach((neighbor) => {
            if ((neighbor !== undefined) && (!neighbor.visited) && (neighbor.value !== 'S')) {
                queue.push(neighbor);
            }
        });

        current.visited = true;     
    }

    // Now add the S
    trackActions.push('S');

    return trackActions;
}

export const runTheTrack = (trackActions: string[], moves: string[]): number => {
    let currentEnergy = STARTING_ENERGY;
    let energiesByRound: number[] = [];
    let stepsSoFar = 0;

    for (let round = 0; round < MAX_ROUNDS; round++) {
        for (let step = 0; step < trackActions.length; step++) {
            const move = moves[stepsSoFar % moves.length];
            const override = trackActions[step];

            if (override === 'S' || override === '=') {
                if (move === '+') {
                    currentEnergy++;
                } else if ((move === '-') && (currentEnergy > 0)) {
                    currentEnergy--;
                } else if (move === '=') {
                    // Do nothing
                }
            } else if (override === '+') {
                currentEnergy++;
            } else if ((override === '-') && (currentEnergy > 0)) {
                currentEnergy--;
            }

            if (energiesByRound.length <= round) {
                energiesByRound.push(currentEnergy);
            } else {
                energiesByRound[round] += currentEnergy;
            }

            stepsSoFar++;
        }
    }

    return energiesByRound.reduce((a, b) => a + b, 0)
}

// Super cool, never used a generator before in TS.
export function* permute(permutation: string[]): Generator<string[]> {
    var length = permutation.length,
        c = Array(length).fill(0),
        i = 1, k, p;

    yield permutation.slice();
    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            yield permutation.slice();
        } else {
            c[i] = 0;
            ++i;
        }
    }
}