export class Plant {
    id: number;
    growth: number;
    limit: number;
    branches: number[];
    connectors: number;

    constructor (params: {
        id: number;
        growth: number,
        limit: number
    }) {
        this.id = params.id;
        this.growth = params.growth;
        this.limit = params.limit;
        this.branches = [];
        this.connectors = 0;
    }

    getTotalSize = (): number => {
        let size = this.connectors;

        this.branches.forEach((branch) => {
            size += branch;
        });

        return size;
    }

    growOneStep = (): void => {
        // Handle the scenario where the plant hasn't yet sprouted
        if (this.branches.length === 0) {
            this.branches.push(1);
        } else {
            let newBranches: number[] = [];

            this.branches.forEach((branch) => {
                if (branch + 1 === this.growth) {
                    const newBranchSize = (this.growth - 1) / 2;
                    newBranches.push(...[newBranchSize, newBranchSize, 1]);
                    this.connectors += 1;
                } else {
                    newBranches.push(branch + 1);
                }
            });

            console.log(`New branches: ${JSON.stringify(newBranches)}`);

            this.branches = [...newBranches];
        }
    }

    growToFullSize = (): number => {
        let seconds = 0;

        while (this.getTotalSize() < this.limit) {
            seconds += 1;
            this.growOneStep();
        }

        return seconds;
    }
}