import * as React from "react";
import {useState} from "react";
import {DepreciationValues, TechnicalEvaluation} from "../component/depreciationCalc/Calc";
import {DepreciationType} from "../model/DepreciationType";
import {CheckboxProps, DropdownProps, InputOnChangeData} from "semantic-ui-react";
import {CalcErrors, validatePurchasePrice, validatePurchaseYear} from "../validation/DepreciationCalcValidation";


export const useDepreciationCalcForm = (callback: () => void) => {

    const [technicalEvaluations, setTechnicalEvaluations] = useState<TechnicalEvaluation[]>([]);
    const [lastIndex, setLastIndex] = useState(0);

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
        callback();
    };

    const handleInputChange = (event: React.SyntheticEvent, data: InputOnChangeData) => {
        setValues({
            ...values,
            [data.name]: data.value
        });

        let errorMsg = "";
        if(data.name === "purchaseYear") {
            errorMsg = validatePurchaseYear(data.value);
        } else if(data.name === "purchasePrice") {
            errorMsg = validatePurchasePrice(data.value);
        }
        setErrors( {
            ...errors,
            [data.name]: errorMsg
        })
    };

    const handleDropdownChange = (event: React.SyntheticEvent, data: DropdownProps) => {
        setValues({
            ...values,
            [data.name]: data.value
        });
    };

    const handleCheckboxChange = (event: React.SyntheticEvent, data: CheckboxProps) => {
        setValues({
            ...values,
            [data.name as string]: data.checked
        });
    };

    const handleTechnicalEvaluationChange = (event: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
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
        handleSubmit,
        handleInputChange,
        handleDropdownChange,
        handleCheckboxChange,
        handleTechnicalEvaluationChange,
        addTechnicalEvaluation,
        deleteTechnicalEvaluation
    }
}

