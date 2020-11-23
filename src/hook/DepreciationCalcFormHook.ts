import * as React from "react";
import {useEffect, useState} from "react";
import {DepreciationValues, TechnicalEvaluation} from "../component/depreciationCalc/Calc";
import {DepreciationType} from "../model/DepreciationType";
import {CheckboxProps, DropdownProps, InputOnChangeData} from "semantic-ui-react";
import {CalcErrors, validatePurchasePrice, validatePurchaseYear} from "../validation/DepreciationCalcValidation";
import _ from "lodash";


export const useDepreciationCalcForm = () => {

    const [technicalEvaluations, setTechnicalEvaluations] = useState<TechnicalEvaluation[]>([]);
    const [lastIndex, setLastIndex] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);

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
            purchaseYear: "",
            purchasePrice: "",
        }
    )

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({
            purchaseYear: validatePurchaseYear(values.purchaseYear.toString()),
            purchasePrice: validatePurchasePrice(values.purchasePrice.toString())
        })
    };

    useEffect(() => {
        if(isSubmitting) {
            if (_.isEmpty(Object.values(errors).filter((error) => error !== ""))) {
                setShowResult(true);
            }
        }
        setIsSubmitting(false);
    },[errors])

    const handleInputChange = (event: React.SyntheticEvent, data: InputOnChangeData) => {
        setShowResult(false);
        setValues({
            ...values,
            [data.name]: data.value
        });

        let errorMsg = "";
        if (data.name === "purchaseYear") {
            errorMsg = validatePurchaseYear(data.value);
        } else if (data.name === "purchasePrice") {
            errorMsg = validatePurchasePrice(data.value);
        }
        setErrors({
            ...errors,
            [data.name]: errorMsg
        })
    };

    const handleDropdownChange = (event: React.SyntheticEvent, data: DropdownProps) => {
        setShowResult(false);
        setValues({
            ...values,
            [data.name]: data.value
        });
    };

    const handleCheckboxChange = (event: React.SyntheticEvent, data: CheckboxProps) => {
        setShowResult(false);
        setValues({
            ...values,
            [data.name as string]: data.checked
        });
    };

    const handleTechnicalEvaluationChange = (event: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        setShowResult(false);
        const fieldId = data.id;
        const name = data.name;
        const value = data.value;

        let updatedField: TechnicalEvaluation = {id: 0, year: 0, value: 0};

        let newTechnicalEvaluations: TechnicalEvaluation[] = [
            ...technicalEvaluations,
        ];

        newTechnicalEvaluations
            .filter(({id}) => {
                return id === Number(fieldId.split("-")[2]);
            }).forEach((field) => {
            Object.assign(updatedField, field, {[name]: value});
            newTechnicalEvaluations[
                newTechnicalEvaluations.indexOf(field)
                ] = updatedField;
        });

        setTechnicalEvaluations(technicalEvaluations);
    };

    const deleteTechnicalEvaluation = (event: React.MouseEvent) => {
        setShowResult(false);
        const id = event.currentTarget.id?.split("-")[2];
        if (!isNaN(Number(id))) {
            const newTechnicalEvaluationFields: TechnicalEvaluation[] = technicalEvaluations.filter(
                (field) => {
                    return field.id !== Number(id);
                }
            );
            setTechnicalEvaluations(newTechnicalEvaluationFields);
        } else {
            console.log("Id in a incorrect format", id);
        }
    };

    const addTechnicalEvaluation = (event: React.MouseEvent) => {
        setShowResult(false);
        event.preventDefault();
        setLastIndex(lastIndex + 1);
        const newTechnicalEvaluationFields: TechnicalEvaluation[] = technicalEvaluations
            ? [...technicalEvaluations]
            : [];
        newTechnicalEvaluationFields.push({
            id: lastIndex,
            year: 0,
            value: 0,
        });
        setTechnicalEvaluations(newTechnicalEvaluationFields);
    };

    return {
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
    }
}

