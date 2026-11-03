export interface ParticipantQuestResults {
    participantId: number;
    partOneTime?: number;
    partTwoTime?: number;
    partThreeTime?: number;
}

export interface ParticipantResults {
    participantId: number;
    time: number;
    score: number;
}

interface ParticipantCumulativeTime {
    participantId: number;
    cumulativeTime: number;
}

export const calculateQuestScores = (results: ParticipantQuestResults[]): ParticipantResults[] => {
    const scores: ParticipantResults[] = [];
    const cumulativeTimes: ParticipantCumulativeTime[] = [];

    // First step is to score part 1, max score is 50, -1 for each step down to 1, 0 for the rest
    results.forEach((result) => {
        if (result.partOneTime) {
            cumulativeTimes.push({
                participantId: result.participantId,
                cumulativeTime: result.partOneTime
            });
        }
    });

    cumulativeTimes.sort(sortCumulativeTimes);

    // Score part 1s
    let currentScore = 50;
    let timesQueue = [...cumulativeTimes];

    while (timesQueue.length > 0) {
        let nextPlaceTime = timesQueue.shift();
        let nextPlaceAwards = [nextPlaceTime];

        while (timesQueue[0].cumulativeTime === nextPlaceTime.cumulativeTime) {
            nextPlaceAwards.push(timesQueue.shift());
        }

        nextPlaceAwards.forEach((participant) => {
            let existingScore = scores.find((score) => score.participantId === participant.participantId);
            if (existingScore) {
                existingScore.score += currentScore;
                existingScore.time = participant.cumulativeTime;
            } else {
                scores.push({
                    participantId: participant.participantId,
                    score: currentScore,
                    time: participant.cumulativeTime
                });
            }
        });

        if (currentScore > 0) {
            currentScore -= nextPlaceAwards.length;
            if (currentScore < 0) {
                currentScore = 0;
            }
        }
    }

    // Next step is to score part 2, max score of 150, times are cumulative from both parts.  Only people who completed part 1 and part 2 are scored here
    // Assume that only people who completed part 1 and part 2 should be counted here, otherwise the cumulative time would heavily weigh in the favor of skipping part 1
    

    return scores;
}


const sortCumulativeTimes = (a: ParticipantCumulativeTime, b: ParticipantCumulativeTime) : number => {
    if (a.cumulativeTime < b.cumulativeTime) {
        return -1;
    } else if (a.cumulativeTime > b.cumulativeTime) {
        return 1;
    } else {
        return 0;
    }
}