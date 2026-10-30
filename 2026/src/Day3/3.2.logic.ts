export interface VoteParams {
    iso: string;
    vote: string;
}

export const calculateValueOfVote = (params: VoteParams) : number => {
    let voteValue = 0;

    const isoDigits = params.iso.split('').map((num) => {
        return Number.parseInt(num);
    });

    const originalIsoDigits = [...isoDigits];

    const voteDigits = params.vote.split('').map((num) => {
        return Number.parseInt(num);
    });

    let position = 0;

    while (voteDigits.length > isoDigits.length) {
        isoDigits.unshift(originalIsoDigits[originalIsoDigits.length - 1 - position]);
        position++;

        if (position === originalIsoDigits.length) {
            position = 0;
        }
    }

    for (let i = 0; i < voteDigits.length; i++) {
        const isoDigit = isoDigits[isoDigits.length - 1 - i];
        const voteDigit = voteDigits[voteDigits.length - 1 - i];
        const result = (voteDigit * (i === 0 ? 1 : Math.pow(isoDigit, i)));

        voteValue = voteValue + result;
    }

    return voteValue;
}