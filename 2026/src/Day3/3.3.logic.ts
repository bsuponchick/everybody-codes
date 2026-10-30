import { calculateValueOfVote, VoteParams } from './3.2.logic';

export const determineValueOfVote = (params: VoteParams): number => {
    const valueOfVote = calculateValueOfVote(params);
    let voteIsValid = true;

    console.log(`The value of vote ${JSON.stringify(params.iso)} ${JSON.stringify(params.vote)} is ${valueOfVote}`);

    let currentVote = Number.parseInt(params.vote);

    while (voteIsValid && (currentVote > 1 )) {
        currentVote -= 1;

        const voteParamToTry = {
            iso: params.iso,
            vote: `${currentVote}`
        };

        const valueOfCurrentVote = calculateValueOfVote(voteParamToTry);
        if (valueOfCurrentVote === valueOfVote) {
            voteIsValid = false;
        }
    }


    console.log(`VoteIsValid: ${voteIsValid}`);

    return voteIsValid ? valueOfVote : 0;
}