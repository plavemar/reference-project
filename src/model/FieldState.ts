export interface FieldState {
    value: string| number | undefined,
    isValid: boolean | undefined,
    errorMsg: string;
}

export const defaultFieldState: FieldState = {
    value: '',
    isValid: undefined,
    errorMsg: ''
}

export const defaultNumberFieldState: FieldState = {
    value: undefined,
    isValid: undefined,
    errorMsg: ''
}