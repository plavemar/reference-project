import {DepreciationGroup} from "../../context/DepreciationCalcContext";
import {calculateDepreciation, calculateRemainingValue} from "../../util/DepreciationUtil";


test("calculateDepreciationTest", () => {
    const purchaseValue: number = 920000;
    const depreciationGroup: DepreciationGroup = {
        firstYear: 5,
        nextYears: 6,
        afterEvaluation: 5
    };

    expect(calculateDepreciation(1, purchaseValue, false, depreciationGroup, 0)).toBe(184000);
});

test("calculateRemainingValueTest", () => {
    const purchaseValue: number = 920000;
    const depreciationGroup: DepreciationGroup = {
        firstYear: 5,
        nextYears: 6,
        afterEvaluation: 5
    };

    expect(calculateRemainingValue(920000, 184000)).toBe(736000);
});