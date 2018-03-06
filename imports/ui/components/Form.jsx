// Framework
import React from "react";

import { Form, FormGroup , Input, Label} from "reactstrap";

import Button from "./Button.jsx";

const FormImpl = ({fields, submitButtonText, onSubmit, children, className}) => {

    let inputFieldLabels = [];
    fields.forEach(field => {
        inputFieldLabels.push(
            <FormGroup key={field.label}>
                <Label>{field.label}: </Label>
                <Input type={field.type}
                       onChange={(e) => field.onChange(e.target.value)}
                />
            </FormGroup>);
    });

    return (
        <Form className={className}>
            {inputFieldLabels}
            {children}
            <Button type="button" onClick={() => onSubmit()}>
                {submitButtonText}
            </Button>
        </Form>
    )
};

export default FormImpl;