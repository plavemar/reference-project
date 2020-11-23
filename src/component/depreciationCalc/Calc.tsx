import * as React from "react";
import {useEffect, useState} from "react";
import {faMinus} from "@fortawesome/free-solid-svg-icons";

import {
    Checkbox,
    CheckboxProps,
    Container,
    DropdownItemProps,
    DropdownProps,
    Form,
    FormField,
    FormGroup,
    Grid,
    GridColumn,
    InputOnChangeData,
    Message,
} from "semantic-ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DepreciationResult from "./DepreciationResult";
import {DepreciationType} from "../../model/DepreciationType";
import _ from "lodash";
import {CalcErrors, useValidate} from "../../validation/DepreciationCalcValidation";

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
    const [technicalEvaluationFields, setTechnicalEvaluationFields] = useState<TechnicalEvaluation[]>([]);
    const [lastIndex, setLastIndex] = useState(0);
    const [showResults, setShowResults] = useState<boolean>(false);

    const [values, setValues] = useState<DepreciationValues>({
        depreciationGroup: 1,
        depreciationType: DepreciationType.DEPRECIATION_EQUAL,
        purchaseYear: 0,
        purchasePrice: 0,
        isTechEvaluation: false,
        isDepreciationSpedUp: false,
        depreciationSpeedUp: 0,
        techEvaluations: [],
    });
    const [errors, setErrors] = useState<CalcErrors>(
        {
            depreciationGroup: "",
            depreciationType: "",
            purchaseYear: "",
            purchasePrice: "",
            isTechEvaluation: "",
            isDepreciationSpedUp: "",
            depreciationSpeedUp: "",
            techEvaluations: "",
        }
    )
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

    const [formValid, setFormValid] = useState<boolean>(true);

    const validate = useValidate();

    useEffect(() => {
        setErrors(validate.errors);
    }, [formValid]);


    const onDelete = (event: React.MouseEvent) => {
        const id = event.currentTarget.id?.split("-")[2];
        if (!isNaN(Number(id))) {
            const newTechnicalEvaluationFields: TechnicalEvaluation[] = technicalEvaluationFields.filter(
                (field) => {
                    return field.id !== Number(id);
                }
            );
            setTechnicalEvaluationFields(newTechnicalEvaluationFields);
        } else {
            console.log("Id in a incorrect format", id);
        }
    };

    const onAddTechnicalEvaluation = (event: React.MouseEvent) => {
        event.preventDefault();
        setLastIndex(lastIndex + 1);
        const newTechnicalEvaluationFields: TechnicalEvaluation[] = technicalEvaluationFields
            ? [...technicalEvaluationFields]
            : [];
        newTechnicalEvaluationFields.push({
            id: lastIndex,
            year: 0,
            value: 0,
        });
        setTechnicalEvaluationFields(newTechnicalEvaluationFields);
    };

    const onSelectValueChange = (
        event: React.SyntheticEvent<HTMLElement>,
        data: DropdownProps
    ) => {
        const name = data.name;
        const value = data.value;

        const depreciationGroup = (data.name === "depreciationGroup" && data.value) ? data.value : values.depreciationGroup;

        setValues({
            ...values,
            [name]: value,
            isDepreciationSpedUp: depreciationGroup < 4 && values.isDepreciationSpedUp,
        });
    };

    const onPurchaseYearChange = (
        event: React.SyntheticEvent<HTMLElement>,
        data: InputOnChangeData
    ) => {
        setValues({
            ...values,
            purchaseYear: Number(data.value)
        });

        setErrors({
            ...errors,
            purchaseYear: validate.validatePurchaseYear(Number(data.value))
        })
    };

    const onInputValueChange = (
        event: React.SyntheticEvent<HTMLElement>,
        data: InputOnChangeData
    ) => {
        const name = data.name;
        const value = data.value;

        setValues({
            ...values,
            [name]: {
                value: value,
                error: ""
            },
        });
    };

    const onTechnicalEvaluationChange = (
        event: React.SyntheticEvent<HTMLElement>,
        data: InputOnChangeData
    ) => {
        const fieldId = data.id;
        const name = data.name;
        const value = data.value;

        let updatedField: TechnicalEvaluation = {id: 0, year: 0, value: 0};

        let technicalEvaluations: TechnicalEvaluation[] = [
            ...technicalEvaluationFields,
        ];

        technicalEvaluations
            .filter(({id}) => {
                return id === Number(fieldId.split("-")[2]);
            })
            .forEach((field) => {
                Object.assign(updatedField, field, {[name]: value});
                technicalEvaluations[
                    technicalEvaluations.indexOf(field)
                    ] = updatedField;
            });

        setTechnicalEvaluationFields(technicalEvaluations);
    };

    const onCheckboxValueChange = (
        event: React.SyntheticEvent<HTMLElement>,
        data: CheckboxProps
    ) => {
        if (data.name) {
            if (data.name === "isTechEvaluation" && !data.checked) {
                setTechnicalEvaluationFields([]);
            }
            setValues({
                ...values,
                [data.name]: {
                    value: data.checked,
                    error: ""
                },
            });
        }
    };

    const onRadioValueChange = (
        event: React.SyntheticEvent<HTMLElement>,
        data: CheckboxProps
    ) => {
        if (data.name) {
            setValues({
                ...values,
                [data.name]: {
                    value: data.value,
                    error: ""
                },
            });
        }
    };

    const onSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        validate.validate(values);

        if (!validate.isValid()) {
            setFormValid(false);
            setErrors(validate.errors);
        }

        setTimeout(() => {
            console.log("Should result table be shown", formValid);
            setShowResults(formValid);
        }, 1500);
    };

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
                                    error={errors.depreciationGroup || undefined}
                                    name={"depreciationGroup"}
                                    onChange={onSelectValueChange}
                                />
                            </FormField>
                            <FormField>
                                <Form.Input
                                    label={"Rok koupě"}
                                    size={"small"}
                                    name={"purchaseYear"}
                                    value={values.purchaseYear}
                                    error={errors.purchaseYear || undefined}
                                    onChange={onPurchaseYearChange}
                                    type={'number'}
                                />
                            </FormField>
                            <FormField>
                                <Form.Input
                                    label={"Pořizovací cena"}
                                    size={"small"}
                                    name={"purchasePrice"}
                                    value={values.purchasePrice}
                                    type={"number"}
                                    onChange={onInputValueChange}
                                />
                            </FormField>
                            <FormField>
                                <Form.Select
                                    label={"Metoda odpisování"}
                                    options={createDepreciationTypeOptions()}
                                    name={"depreciationType"}
                                    onChange={onSelectValueChange}
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
                                    onChange={onCheckboxValueChange}
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
                                                    onChange={onRadioValueChange}
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
                                    onChange={onCheckboxValueChange}
                                    name={"isTechEvaluation"}
                                />
                            </FormField>
                            {values.isTechEvaluation &&
                            technicalEvaluationFields?.map((field) => {
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
                                                onChange={onTechnicalEvaluationChange}
                                                name={"year"}
                                            />
                                            <Form.Input
                                                label={"Hodnota"}
                                                id={`te-value-${field.id}`}
                                                value={field.value}
                                                onChange={onTechnicalEvaluationChange}
                                                name={"value"}
                                            />
                                            <Form.Button
                                                color={"red"}
                                                id={`te-delete-${field.id}`}
                                                onClick={onDelete}
                                            >
                                                <FontAwesomeIcon icon={faMinus}/>
                                            </Form.Button>
                                        </FormGroup>
                                    </FormField>
                                );
                            })}
                            <FormGroup>
                                {values.isTechEvaluation && (
                                    <Form.Button onClick={onAddTechnicalEvaluation}>
                                        Přidat technické zhodnocení
                                    </Form.Button>
                                )}
                                <Form.Button onClick={onSubmit}>Spočítat</Form.Button>
                            </FormGroup>
                        </Form>
                    </GridColumn>
                    <GridColumn width={8}>
                        {showResults && (
                            <DepreciationResult
                                {...values}
                                depreciationSpeedUp={
                                    values.isDepreciationSpedUp
                                        ? values.depreciationType === DepreciationType.DEPRECIATION_EQUAL
                                        ? values.depreciationSpeedUp
                                        : 10
                                        : 0
                                }
                                techEvaluations={_.orderBy(technicalEvaluationFields, "year", "asc")}
                            />
                        )}
                    </GridColumn>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Calc;
