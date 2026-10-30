export interface VoteParams {
    iso: string;
    vote: string;
}

export const calculateValueOfVote = (params: VoteParams) : number => {
    let voteValue = 0;

    const isoDigits = params.iso.split('').map((num) => {
        return Number.parseInt(num);
    });

    const voteDigits = params.vote.split('').map((num) => {
        return Number.parseInt(num);
    });

    for (let i = 0; i < isoDigits.length; i++) {
        const isoDigit = isoDigits[isoDigits.length - 1 - i];
        const voteDigit = voteDigits[voteDigits.length - 1 - i];
        const result = (voteDigit * (i === 0 ? 1 : Math.pow(isoDigit, i)));

        voteValue = voteValue + result;
    }

    return voteValue;
}