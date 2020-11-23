import {DepreciationGroup} from "../context/DepreciationCalcContext";

export const calculateDepreciation = (
    year: number,
    value: number,
    techEvaluation: boolean,
    group: DepreciationGroup,
    depreciationSpeedUp: number,
): number => {
    if (techEvaluation) {
        return Math.floor(((2 * value) / (group.afterEvaluation - year + 1)) + (value * depreciationSpeedUp / 100));
    } else {
        if (Number(year) === 1) {
            return Math.floor((value / group.firstYear) + (value * depreciationSpeedUp / 100));
        } else {
            return Math.floor((2 * value) / (group.nextYears - year + 1));
        }
    }
};

export const calculateRemainingValue = (currentBalance: number, depreciation: number): number => {
    return currentBalance - depreciation;
}
