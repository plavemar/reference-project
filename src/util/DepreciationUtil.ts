import {DepreciationGroup} from "../context/DepreciationCalcContext";

export const calculateDepreciation = (
    year: number,
    value: number,
    techEvaluation: boolean,
    group: DepreciationGroup
): number => {
    if (techEvaluation) {
        return Math.ceil((2 * value) / (group.afterEvaluation - year + 1));
    } else {
        if (Number(year) === 1) {
            return Math.ceil(value / group.firstYear);
        } else {
            return Math.ceil((2 * value) / (group.nextYears - year + 1));
        }
    }
};

export const calculateRemainingValue = (currentBalance: number, depreciation: number): number => {
    return currentBalance - depreciation;
}
