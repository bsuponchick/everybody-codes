export interface ParticipantQuestResults {
    participantId: number;
    partsCompleted: number;
    totalTime: number;
}

export const scoreTotalParts = (results: ParticipantQuestResults[]): number => {
    let checksum = 0;

    results.sort((a, b) => {
        if (a.partsCompleted < b.partsCompleted) {
            return 1;
        } else if (a.partsCompleted > b.partsCompleted) {
            return -1;
        } else {
            if (a.totalTime < b.totalTime) {
                return -1;
            } else if (a.totalTime > b.totalTime) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    results.forEach((value, index) => {
        console.log(`Place ${index + 1}: ${(index + 1) * value.totalTime}`);
        checksum += (value.totalTime * (index + 1));
    });

    return checksum;
}