import * as React from "react";
import {useState} from "react";
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
} from "semantic-ui-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DepreciationResult from "./DepreciationResult";
import {DepreciationType} from "../../model/DepreciationType";

export interface TechnicalEvaluation {
  id: number;
  year: number;
  value: number;
}

interface DepreciationValues {
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
  const [technicalEvaluationFields, setTechnicalEvaluationFields] = useState<
    TechnicalEvaluation[]
  >([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const [values, setValues] = useState<DepreciationValues>({
    depreciationGroup: 4,
    depreciationType: DepreciationType.DEPRECIATION_EQUAL,
    purchaseYear: 0,
    purchasePrice: 0,
    isTechEvaluation: false,
    isDepreciationSpedUp: false,
    depreciationSpeedUp: 10,
    techEvaluations: [],
  });

  const createDepreciationGroupItems = (): DropdownItemProps[] => {
    return [
      { value: 1, text: "1", key: 1 },
      { value: 2, text: "2", key: 2 },
      { value: 3, text: "3", key: 3 },
      { value: 4, text: "4", key: 4 },
      { value: 5, text: "5", key: 5 },
      { value: 6, text: "6", key: 6 },
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

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onInputValueChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: InputOnChangeData
  ) => {
    const name = data.name;
    const value = data.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onTechnicalEvaluationChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: InputOnChangeData
  ) => {
    const fieldId = data.id;
    const name = data.name;
    const value = data.value;

    let updatedField: TechnicalEvaluation = { id: 0, year: 0, value: 0 };

    const technicalEvaluations: TechnicalEvaluation[] = [
      ...technicalEvaluationFields,
    ];
    technicalEvaluations
      .filter(({ id }) => {
        return id === Number(fieldId.split("-")[2]);
      })
      .map((field) => {
        Object.assign(updatedField, field, { [name]: value });
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
        [data.name]: data.checked,
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
        [data.name]: data.value,
      });
    }
  };

  const onSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowResults(true);
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
                  onChange={onInputValueChange}
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
              <FormField>
                <Form.Radio
                  toggle
                  label={"Urychlení odpisu v prvním roce"}
                  checked={values.isDepreciationSpedUp}
                  onChange={onCheckboxValueChange}
                  name={"isDepreciationSpedUp"}
                />
              </FormField>
              {values.isDepreciationSpedUp && values.depreciationType === 1 && (
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
                          <FontAwesomeIcon icon={faMinus} />
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
                    ? values.depreciationType === 1
                      ? values.depreciationSpeedUp
                      : 10
                    : 0
                }
                techEvaluations={technicalEvaluationFields}
              />
            )}
          </GridColumn>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Calc;
