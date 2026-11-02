export interface QuestResult {
    id: number;
    quest: number;
    part: number;
    time: number;
}

export interface QuestResults {
    id: number;
    results: QuestResult[];
}

export const scoreQuest = (results: QuestResult[]): number => {
    let checksum = 0;

    const participantResults = {};

    results.forEach((result) => {
        console.log(`Evaluating result ${JSON.stringify(result)}`);
        if (participantResults[result.id]) {
            console.log(`participationResults already has ${result.id}`);
            participantResults[result.id] = participantResults[result.id] + result.time;
        } else {
            console.log(`participationResults doesn't have ${result.id}`);
            participantResults[result.id] = result.time;
        }
    });

    const participantResultsArray: number[] = [];
    for (const key of Object.keys(participantResults)) {
        participantResultsArray.push(participantResults[key]);
    }

    participantResultsArray.sort((a, b) => {
        return (a === b) ? 0 : (a < b) ? -1 : 1;
    });

    participantResultsArray.forEach((value, index) => {
        console.log(`Place ${index + 1}: ${(index + 1) * value}`);
        checksum += (value * (index + 1));
    });

    return checksum;
}