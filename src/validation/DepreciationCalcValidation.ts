import {DepreciationValues} from "../component/depreciationCalc/Calc";
import {useState} from "react";
import _ from "lodash";

export interface CalcErrors {
    depreciationGroup: string;
    depreciationType: string;
    purchaseYear: string;
    purchasePrice: string;
    isTechEvaluation: string;
    isDepreciationSpedUp: string;
    depreciationSpeedUp: string;
    techEvaluations: string;
}

const yearMin = 1900;
const yearMax = new Date().getFullYear();

export const useValidate = () => {
    const [errors, setErrors] = useState<CalcErrors>({
        depreciationGroup: "",
        depreciationType: "",
        purchaseYear: "",
        purchasePrice: "",
        isTechEvaluation: "",
        isDepreciationSpedUp: "",
        depreciationSpeedUp: "",
        techEvaluations: "",
    });

    const isValid = (): boolean => {
        return !!Object.values(errors).find((value) => !!value);
    }

    const validatePurchaseYear = (value: number): string => {
        let error = "";

        if (!value) {
            error = "Zadejte rok koupě";
        } else if (!_.inRange(value, yearMin, yearMax)) {
            error = `Rok koupě musí být mezi ${yearMin} a ${yearMax}!`;
        }

        return error;
    }

    const validate = (values: DepreciationValues) => {
        setErrors({...errors, purchaseYear: validatePurchaseYear(values.purchaseYear)});
    }

    return {
        errors,
        isValid,
        validate,
        validatePurchaseYear
    };
}