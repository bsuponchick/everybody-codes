export interface Rule {
    left: number;
    right: number;
    operator: string;
}

export const sortAlloys = (rules: Rule[]): number[] => {
    const ruleCache: Map<number, Map<number, string>> = new Map<number, Map<number, string>>();
    rules.forEach((rule) => {
        if (ruleCache.has(rule.left)) {
            ruleCache.get(rule.left).set(rule.right, rule.operator);
        } else {
            const map = new Map<number, string>();
            map.set(rule.right, rule.operator);
            ruleCache.set(rule.left, map);
        }

        const inverterOperator = rule.operator === '<' ? '>' : '<';
        if (ruleCache.has(rule.right)) {
            ruleCache.get(rule.right).set(rule.left, inverterOperator);
        } else {
            const map = new Map<number, string>();
            map.set(rule.left, inverterOperator);
            ruleCache.set(rule.right, map);
        }
    });

    let alloys: number[] = [];
    
    for (const key of ruleCache.keys()) {
        alloys.push(key);
    }

    let currentAlloys = [...alloys];
    let iterations = 0;
    let stop = false;

    while (!stop) {
        iterations++;

        alloys.sort((a: number, b: number) => {
            const rulesForA = ruleCache.get(a);
            if (rulesForA.has(b)) {
                return rulesForA.get(b) === '<' ? -1 : 1;
            }

            return 0;
        });

        console.log(`Iteration ${iterations}: ${alloys.toString()}`);

        if (alloys.toString() === currentAlloys.toString()) {
            stop = true;
        } else {
            currentAlloys = [...alloys];
        }
    }

    // Needs to return hardest to softest
    return alloys.reverse();
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