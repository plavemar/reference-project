import * as React from "react";
import {faMinus} from "@fortawesome/free-solid-svg-icons";

import {
    Checkbox,
    Container,
    DropdownItemProps,
    Form,
    FormField,
    FormGroup,
    Grid,
    GridColumn,
    Message,
} from "semantic-ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DepreciationResult from "./DepreciationResult";
import {DepreciationType} from "../../model/DepreciationType";
import _ from "lodash";
import {useDepreciationCalcForm} from "../../hook/DepreciationCalcFormHook";

export interface TechnicalEvaluation {
    id: number;
    year: number;
    value: number;
}

export interface DepreciationValues {
    depreciationGroup: number;
    depreciationType: DepreciationType;
    purchaseYear: number;
    purchasePrice: number;
    isTechEvaluation: boolean;
    isDepreciationSpedUp: boolean;
    depreciationSpeedUp: number;
    techEvaluations: TechnicalEvaluation[];
}

const Calc: React.FunctionComponent = () => {
    const createDepreciationGroupItems = (): DropdownItemProps[] => {
        return [
            {value: 1, text: "1", key: 1},
            {value: 2, text: "2", key: 2},
            {value: 3, text: "3", key: 3},
            {value: 4, text: "4", key: 4},
            {value: 5, text: "5", key: 5},
            {value: 6, text: "6", key: 6},
        ];
    };

    const createDepreciationTypeOptions = (): DropdownItemProps[] => {
        return [
            {
                value: DepreciationType.DEPRECIATION_EQUAL,
                text: "Rovnoměrné",
                key: 1,
            },
            {
                value: DepreciationType.DEPRECIATION_SPED_UP,
                text: "Zrychlené",
                key: 2,
            },
        ];
    };

    const equalDepreciationSpeedUps = [
        {
            value: 10,
            label: "10 %",
        },
        {
            value: 15,
            label: "15 %",
        },
        {
            value: 20,
            label: "20 %",
        },
    ];

    const {
        values,
        technicalEvaluations,
        errors,
        showResult,
        handleSubmit,
        handleInputChange,
        handleDropdownChange,
        handleCheckboxChange,
        handleTechnicalEvaluationChange,
        addTechnicalEvaluation,
        deleteTechnicalEvaluation
    } = useDepreciationCalcForm()

    return (
        <React.Fragment>
            <Container>
                <Grid divided>
                    <GridColumn width={8}>
                        <Form>
                            <FormField>
                                <Form.Select
                                    label={"Odpisová skupina"}
                                    size={"small"}
                                    options={createDepreciationGroupItems()}
                                    value={values.depreciationGroup}
                                    name={"depreciationGroup"}
                                    onChange={handleDropdownChange}
                                />
                            </FormField>
                            <FormField>
                                <Form.Input
                                    label={"Rok koupě"}
                                    size={"small"}
                                    name={"purchaseYear"}
                                    value={values.purchaseYear}
                                    error={errors.purchaseYear || undefined}
                                    onChange={handleInputChange}
                                />
                            </FormField>
                            <FormField>
                                <Form.Input
                                    label={"Pořizovací cena"}
                                    size={"small"}
                                    name={"purchasePrice"}
                                    value={values.purchasePrice}
                                    error={errors.purchasePrice || undefined}
                                    type={"number"}
                                    onChange={handleInputChange}
                                />
                            </FormField>
                            <FormField>
                                <Form.Select
                                    label={"Metoda odpisování"}
                                    options={createDepreciationTypeOptions()}
                                    name={"depreciationType"}
                                    onChange={handleDropdownChange}
                                    value={values.depreciationType}
                                />
                            </FormField>
                            {
                                values.depreciationGroup > 3 &&
                                <Message info content={"Pro odpisové skupiny 4, 5 a 6 není urychlení odpisu možné!"}/>
                            }
                            <FormField>
                                <Form.Radio
                                    toggle
                                    label={"Urychlení odpisu v prvním roce"}
                                    checked={values.isDepreciationSpedUp}
                                    onChange={handleCheckboxChange}
                                    name={"isDepreciationSpedUp"}
                                    disabled={values.depreciationGroup > 3}
                                />
                            </FormField>
                            {values.isDepreciationSpedUp && values.depreciationType === DepreciationType.DEPRECIATION_EQUAL && (
                                <FormField>
                                    {equalDepreciationSpeedUps.map((speedUp) => {
                                        return (
                                            <FormField>
                                                <Form.Radio
                                                    label={speedUp.label}
                                                    name="depreciationSpeedUp"
                                                    value={speedUp.value}
                                                    checked={values.depreciationSpeedUp === speedUp.value}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </FormField>
                                        );
                                    })}
                                </FormField>
                            )}
                            <FormField>
                                <Checkbox
                                    label={"Obsahuje technická zhodnocení"}
                                    checked={values.isTechEvaluation}
                                    onChange={handleCheckboxChange}
                                    name={"isTechEvaluation"}
                                />
                            </FormField>
                            {values.isTechEvaluation &&
                            technicalEvaluations?.map((field) => {
                                return (
                                    <FormField
                                        key={`technical-evaluation-${field.id}`}
                                        id={`technical-evaluation-${field.id}`}
                                    >
                                        <FormGroup>
                                            <Form.Input
                                                label={"Rok"}
                                                id={`te-year-${field.id}`}
                                                value={field.year}
                                                onChange={handleTechnicalEvaluationChange}
                                                name={"year"}
                                            />
                                            <Form.Input
                                                label={"Hodnota"}
                                                id={`te-value-${field.id}`}
                                                value={field.value}
                                                onChange={handleTechnicalEvaluationChange}
                                                name={"value"}
                                            />
                                            <Form.Button
                                                color={"red"}
                                                id={`te-delete-${field.id}`}
                                                onClick={deleteTechnicalEvaluation}
                                            >
                                                <FontAwesomeIcon icon={faMinus}/>
                                            </Form.Button>
                                        </FormGroup>
                                    </FormField>
                                );
                            })}
                            <FormGroup>
                                {values.isTechEvaluation && (
                                    <Form.Button onClick={addTechnicalEvaluation}>
                                        Přidat technické zhodnocení
                                    </Form.Button>
                                )}
                                <Form.Button onClick={handleSubmit}>Spočítat</Form.Button>
                            </FormGroup>
                        </Form>
                    </GridColumn>
                    <GridColumn width={8}>
                        {showResult && (
                            <DepreciationResult
                                {...values}
                                depreciationSpeedUp={
                                    values.isDepreciationSpedUp
                                        ? values.depreciationType === DepreciationType.DEPRECIATION_EQUAL
                                        ? values.depreciationSpeedUp
                                        : 10
                                        : 0
                                }
                                techEvaluations={_.orderBy(technicalEvaluations, "year", "asc")}
                            />
                        )}
                    </GridColumn>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Calc;
