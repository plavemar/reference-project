import _ from "lodash";

export interface CalcErrors {
    purchaseYear: string;
    purchasePrice: string;
}

const yearMin = 1900;
const yearMax = new Date().getFullYear();

export const validatePurchaseYear = (year: string): string => {
    if (!year) {
        return "Zadejte rok koupě";
    } else if (isNaN(Number(year)) || !_.inRange(Number(year), yearMin, yearMax)) {
        return `Rok koupě musí být mezi ${yearMin} a ${yearMax}!`;
    }
    return "";
}

export const validatePurchasePrice = (price: string): string => {
    if(!price) {
        return "Zadejte pořizovací cenu.";
    } else if(isNaN(Number(price)) || Number(price) < 0) {
        return "Zadejte celé kladné číslo."
    }
    return "";
}