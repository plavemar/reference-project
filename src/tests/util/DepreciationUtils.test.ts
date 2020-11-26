import {DepreciationGroup} from "../../context/DepreciationCalcContext";
import {calculateDepreciation, calculateRemainingValue} from "../../util/DepreciationUtil";


test("calculateDepreciationTest", () => {
    const depreciationGroup: DepreciationGroup = {
        firstYear: 5,
        nextYears: 6,
        afterEvaluation: 5
    };

    expect(calculateDepreciation(1, 920000, false, depreciationGroup, 0)).toBe(184000);
});

test("calculateRemainingValueTest", () => {
    expect(calculateRemainingValue(920000, 184000)).toBe(736000);
});