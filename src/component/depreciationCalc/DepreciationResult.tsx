import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {TechnicalEvaluation} from "./Calc";
import {calculateDepreciation} from "../../util/DepreciationUtil";
import {DepreciationCalcContext, DepreciationGroups,} from "../../context/DepreciationCalcContext";
import {Label, Table} from "semantic-ui-react";

interface DepreciationResultProps {
  depreciationGroup: number;
  depreciationType: number;
  purchaseYear: number;
  purchasePrice: number;
  isTechEvaluation: boolean;
  isDepreciationSpedUp: boolean;
  depreciationSpeedUp: number;
  techEvaluations: TechnicalEvaluation[];
}

interface ResultRowProps {
  year: number;
  depreciation: number;
  remainingValue: number;
}

interface CurrentValueProps {
  balance: number;
  year: number;
  yearOrder: number;
}

const DepreciationResult: React.FunctionComponent<DepreciationResultProps> = (
  props
) => {
  const depreciationGroup = useContext<DepreciationGroups>(
    DepreciationCalcContext
  ).depreciationGroups[props.depreciationGroup - 1];

  const [currentValues, setCurrentValues] = useState<CurrentValueProps>({
    balance: props.purchasePrice,
    year: props.purchaseYear,
    yearOrder: 1,
  });

  const [resultRows, setResultRows] = useState<ResultRowProps[]>([]);
  const [currentTechEvaluation, setCurrentTechEvaluation] = useState<
    TechnicalEvaluation[]
  >(props.techEvaluations);

  useEffect(() => {
    if (currentValues.balance > 0) {
      const depreciation = calculateDepreciation(
        currentValues.yearOrder,
        currentValues.balance,
        false,
        depreciationGroup
      );
      const remainingValue = currentValues.balance - depreciation;

      const newResultRows = [...resultRows];

      newResultRows.push({
        year: currentValues.year,
        depreciation: depreciation,
        remainingValue: remainingValue,
      });

      setResultRows(newResultRows);

      setCurrentValues({
        balance: remainingValue,
        year: Number(currentValues.year) + Number(1),
        yearOrder: Number(currentValues.yearOrder) + Number(1),
      });
    }
  }, [currentValues.balance]);

  return (
    <React.Fragment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rok</Table.HeaderCell>
            <Table.HeaderCell>Odpis</Table.HeaderCell>
            <Table.HeaderCell>Zůstatková hodnota</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {resultRows.map((row, index) => {
            return (
              <Table.Row key={`result-row-${index}`}>
                <Table.Cell>
                  <Label ribbon>{row.year}</Label>
                </Table.Cell>
                <Table.Cell>{row.depreciation}</Table.Cell>
                <Table.Cell>{row.remainingValue}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </React.Fragment>
  );
};

export default DepreciationResult;
