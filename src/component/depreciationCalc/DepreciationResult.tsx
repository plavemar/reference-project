import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {TechnicalEvaluation} from "./Calc";
import {calculateDepreciation} from "../../util/DepreciationUtil";
import {DepreciationCalcContext, DepreciationGroups,} from "../../context/DepreciationCalcContext";
import {Label, Table} from "semantic-ui-react";
import _ from "lodash";

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
    const [currentTechEvaluation, setCurrentTechEvaluation] = useState<number>(0);
    const [isTechEval, setTechEval] = useState<boolean>(false);

    const techEvaluationsNotEmpty = !_.isEmpty(props.techEvaluations);

    useEffect(() => {
        if (currentValues.balance > 0) {
            let remainingValue = currentValues.balance;

            if(techEvaluationsNotEmpty && Number(props.techEvaluations[currentTechEvaluation]?.year) === currentValues.year ) {
                remainingValue += Number(props.techEvaluations[currentTechEvaluation]?.value);
                setCurrentTechEvaluation(_.min([props.techEvaluations.length - 1, currentTechEvaluation + 1]) as number);

                setCurrentValues({
                    ...currentValues,
                    yearOrder: 1
                });
                setTechEval(true);
            }

            console.log("Remaining value", remainingValue);

            const depreciation = calculateDepreciation(
                currentValues.yearOrder,
                remainingValue,
                isTechEval,
                depreciationGroup,
                (props.purchaseYear === currentValues.year && props.isDepreciationSpedUp) ? props.depreciationSpeedUp : 0
            );

            remainingValue = currentValues.balance - Math.ceil(depreciation);

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
    }, [currentValues]);

    return (
        <React.Fragment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Rok</Table.HeaderCell>
                        <Table.HeaderCell>Odpis</Table.HeaderCell>
                        <Table.HeaderCell>Zůstatková hodnota</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {resultRows.map((row, index) => {

                        const isWarning = !_.isEmpty(props.techEvaluations.filter((techEval) => Number(techEval.year) === Number(row.year )))

                        return (
                            <Table.Row key={`result-row-${index}`} warning={isWarning}>
                                <Table.Cell>
                                    <Label ribbon>{row.year}</Label>
                                </Table.Cell>
                                <Table.Cell>{row.depreciation}&nbsp;Kč</Table.Cell>
                                <Table.Cell>{row.remainingValue}&nbsp;Kč</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </React.Fragment>
    );
}

export default DepreciationResult;
