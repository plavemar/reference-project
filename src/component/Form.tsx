import * as React from 'react';
import {useContext, useState} from 'react';

const Form: React.FunctionComponent = () => {


    const [values, setValues] = useState({
        login: '',
        password: ''
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.name;
        const value = event.target.value;

        setValues({
            ...values,
            [name]: value
        });
    }


    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = {
            login: values.login,
            name: '',
            surname: ''
        }
        if (values.password) {
            console.log("Loging in: ", user);
        }
    }

    return (
        <></>
    )
}

export default Form;