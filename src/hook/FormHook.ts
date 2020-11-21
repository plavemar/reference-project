import _ from "lodash";

export const useForm = () => {
    const submit = () => {
        const mockedResponse = {
            success: true,
            message: ''
        }
        const success = Math.random() >= 0.3;
        mockedResponse.success = success;
        if (success) {
            mockedResponse.message = 'Váš požadavek byl úspěšně odeslán'
        } else {
            mockedResponse.message = 'Při odesílání formuláře se vyskytla chyba'
        }

        return mockedResponse;
    }

    const validateIsNumber = (value: string | number | undefined): boolean => {
        return !_.isNumber(value)
    }

    const validateAgeBelowMin = (value: number, min: number): boolean => {
        return _.lte(value, min);
    }

    const validateAgeAboveMax = (value: number, max: number): boolean => {
        return _.gte(value, max);
    }

    const validateMandatory = (value: any): boolean => {
        return !_.isEmpty(value);
    }

    return {
        submit,
        validateIsNumber,
        validateAgeBelowMin,
        validateAgeAboveMax,
        validateMandatory
    }
}