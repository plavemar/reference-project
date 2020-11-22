import {DepreciationGroup} from "../context/DepreciationCalcContext";

export const useDepreciation = () => {

    const calculateDepreciation = (year: number, value: number, techEvaluation: boolean, group: DepreciationGroup): number => {
        if (techEvaluation) {
            return value / (group.afterEvaluation - 1 + 1);
        } else {
            if (Number(year) === 1) {
                return value / group.firstYear;
            } else {
                return 2 * value / (group.nextYears - year + 1);
            }
        }
    }

    return {
        calculateDepreciation
    }
}