interface CalculateNextThicknessParams {
    previousThickness: number;
    countOfPriests: number;
    countOfAcolytes: number;
}

export const calculateNextThickness = (params: CalculateNextThicknessParams): number => {
    const { previousThickness, countOfPriests, countOfAcolytes } = params;
    const product = previousThickness * countOfPriests;
    const remainder = product % countOfAcolytes;
    return remainder;
}