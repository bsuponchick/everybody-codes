export interface Rule {
    left: number;
    right: number;
    operator: string;
}

export interface Pair {
    left: number;
    right: number;
}

export const sortAlloys = (rules: Rule[]): number[] => {
    const alloyValues: number[] = [];
    let pairs = rules.map((rule) => {
        if (alloyValues.indexOf(rule.left) === -1) {
            alloyValues.push(rule.left);
        }
        if (alloyValues.indexOf(rule.right) === -1) {
            alloyValues.push(rule.right);
        }

        if (rule.operator === '>') {
            return {
                left: rule.right,
                right: rule.left
            };
        } else {
            return {
                left: rule.left,
                right: rule.right
            };
        }
    });

    let countOfAlloys = alloyValues.length;
    let alloys: number[] = [];

    // Step through the rules map and identify the hardest alloy, then remove the pair where that alloy is the right 
    while (alloys.length < countOfAlloys) {
        let hardestAlloy = identifyHardestAlloy(pairs);        
        alloys.push(hardestAlloy);

        // Remove any pair where the hardest alloy value was the right side of the pair
        pairs = pairs.filter((pair) => {
            return pair.right !== hardestAlloy;
        });

        // Remove the alloy value as well
        for (let i = 0; i < alloyValues.length; i++) {
            if (alloyValues[i] === hardestAlloy) {
                alloyValues.splice(i, 1);
            }
        }

        if (alloys.length === countOfAlloys - 1) {
            // There should be only 1 left...see if we can identify it in case the pairs is empty.
            alloys.push(alloyValues[0]);
        }
    }

    // Needs to return hardest to softest
    return alloys;
}

const identifyHardestAlloy = (pairs: Pair[]): number => {
    // Find the first number that is a right side of a pair and not a left of any pair.  This is the hardest possible alloy of the pairs given
    for (let i = 0; i < pairs.length; i++) {
        let stillPossiblyTheHardestAlloy = true;

        for (let j = 0; j < pairs.length; j++) {
            if (stillPossiblyTheHardestAlloy) {
                if (i === j) {
                    // Do Nothing
                } else {
                    if (pairs[i].right === pairs[j].left) {
                        stillPossiblyTheHardestAlloy = false;
                    }
                }
            }
        }

        if (stillPossiblyTheHardestAlloy) {
            return pairs[i].right;
        }
    }


    throw new Error('Did not identify a hardest alloy...');
}

export const parseRules = (rulesGrouping: string): Rule[] => {
    let groupRules: Rule[] = [];

    rulesGrouping.split(' ').forEach((ruleString) => {
        if (ruleString.indexOf('<') > 0) {
            const ruleParts = ruleString.split('<');
            groupRules.push({
                left: Number.parseInt(ruleParts[0]),
                right: Number.parseInt(ruleParts[1]),
                operator: '<'
            });
        } else {
            const ruleParts = ruleString.split('>');
            groupRules.push({
                left: Number.parseInt(ruleParts[0]),
                right: Number.parseInt(ruleParts[1]),
                operator: '>'
            });
        }
    });

    return groupRules;
}