import * as React from 'react';
import {useState} from 'react';
import {faMinus} from "@fortawesome/free-solid-svg-icons";

import {
    Checkbox,
    Container,
    DropdownItemProps,
    DropdownProps,
    Form,
    FormField,
    FormGroup,
    Grid,
    GridColumn,
    InputOnChangeData
} from "semantic-ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Calc: React.FunctionComponent = () => {
    const [technicalEvaluationFields, setTechnicalEvaluationFields] = useState<JSX.Element[]>();
    const [lastIndex, setLastIndex] = useState(0);

    const [values, setValues] = useState({
        depreciationGroup: 4,
        purchaseYear: null,
        purchasePrice: null,
        isTechEvaluation: false,
        techEvaluations: []
    });

    const createDepreciationGroupItems = (): DropdownItemProps[] => {
        return [
            {value: 1, text: '1', key: 1},
            {value: 2, text: '2', key: 2},
            {value: 3, text: '3', key: 3},
            {value: 4, text: '4', key: 4},
            {value: 5, text: '5', key: 5},
            {value: 6, text: '6', key: 6},
        ]
    }

    const onDelete = (event: React.MouseEvent) => {
        const id = event.currentTarget.id?.split("-")[2];
        if (!isNaN(Number(id))) {
            if (technicalEvaluationFields) {
                const newTechnicalEvaluationFields: JSX.Element[] | undefined = technicalEvaluationFields.filter((field) => {
                    console.log(field.props.id);
                    return field.props.id !== `technical-evaluation-${id}`
                });
                setTechnicalEvaluationFields(newTechnicalEvaluationFields);
            }
        } else {
            console.log("Id in a incorrect format", id);
        }
    }

    const onAddTechnicalEvaluation = (event: React.MouseEvent) => {
        event.preventDefault();
        setLastIndex(lastIndex + 1);
        const newTechnicalEvaluationFields: JSX.Element[] | undefined = technicalEvaluationFields ? [...technicalEvaluationFields] : [];
        newTechnicalEvaluationFields.push(
            <FormField key={`technical-evaluation-${lastIndex}`} id={`technical-evaluation-${lastIndex}`}>
                <FormGroup>
                    <Form.Input label={'Rok'} id={`te-year-${lastIndex}`}/>
                    <Form.Input label={'Hodnota'} id={`te-value-${lastIndex}`}/>
                    <Form.Button color={'red'} id={`te-delete-${lastIndex}`} onClick={onDelete}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </Form.Button>
                </FormGroup>
            </FormField>
        )
        setTechnicalEvaluationFields(newTechnicalEvaluationFields);
    }

    const onDepreciationGroupChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        const name = data.name;
        const value = data.value;

        setValues({
            ...values,
            [name]: value
        });
    }

    const onInputValueChange = (event: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) => {
        const name = data.name;
        const value = data.value;

        setValues({
            ...values,
            [name]: value
        });
    }

    const onCheckboxValueChange = (event: React.SyntheticEvent<HTMLElement>) => {
        setValues({
            ...values,
            isTechEvaluation: !values.isTechEvaluation
        });
    }

    const onSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        technicalEvaluationFields?.map((field) => {
            if(field) {
                const numericId = field.key?.toString().split('-')[2];
                console.log("Year", (document.getElementById(`te-year-${numericId}`) as HTMLInputElement)?.value);
                console.log("Value", (document.getElementById(`te-value-${numericId}`) as HTMLInputElement)?.value);
            }
            return null;
        });
    }

    return (
        <React.Fragment>
            <Container>
                <Grid divided>
                    <GridColumn width={4}>
                        <Form>
                            <FormField>
                                <Form.Select label={'Odpisová skupina'}
                                             size={'small'}
                                             options={createDepreciationGroupItems()}
                                             value={values.depreciationGroup}
                                             name={'depreciationGroup'} onChange={onDepreciationGroupChange}/>
                            </FormField>
                            <FormField>
                                <Form.Input label={'Rok koupě'}
                                            size={'small'} name={'purchaseYear'}
                                            value={values.purchaseYear} onChange={onInputValueChange}/>
                            </FormField>
                            <FormField>
                                <Form.Input label={'Pořizovací cena'}
                                            size={'small'}
                                            name={'purchasePrice'}
                                            value={values.purchasePrice}
                                            type={'number'}
                                            onChange={onInputValueChange}/>
                            </FormField>
                            <FormField>
                                <Checkbox label={"Obsahuje technická zhodnocení"}
                                          checked={values.isTechEvaluation}
                                          onChange={onCheckboxValueChange}/>
                            </FormField>
                            {technicalEvaluationFields}
                            <FormGroup>
                                <Form.Button onClick={onAddTechnicalEvaluation}>Přidat technické zhodnocení</Form.Button>
                                <Form.Button onClick={onSubmit}>Spočítat</Form.Button>
                            </FormGroup>
                        </Form>
                    </GridColumn>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Calc;