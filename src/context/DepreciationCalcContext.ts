import * as React from "react";

export interface DepreciationGroup {
  firstYear: number;
  nextYears: number;
  afterEvaluation: number;
}

export interface DepreciationGroups {
  depreciationGroups: DepreciationGroup[];
}

export const DepreciationCalcContext = React.createContext<DepreciationGroups>({
  depreciationGroups: [
    {
      firstYear: 3,
      nextYears: 4,
      afterEvaluation: 3,
    },
    {
      firstYear: 5,
      nextYears: 6,
      afterEvaluation: 5,
    },
    {
      firstYear: 10,
      nextYears: 11,
      afterEvaluation: 10,
    },
    {
      firstYear: 20,
      nextYears: 21,
      afterEvaluation: 20,
    },
    {
      firstYear: 30,
      nextYears: 31,
      afterEvaluation: 30,
    },
    {
      firstYear: 50,
      nextYears: 51,
      afterEvaluation: 50,
    },
  ],
});
