import * as React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import './App.css';
import { submitForm } from './store';


import { FormikProps, withFormik } from 'formik';

const mapDispatchToProps = (dispatch: any) => ({
    submitForm: (formValues: IValues) => dispatch(submitForm(formValues))
});


import { Field, Form } from 'formik';

interface IValues {
    email: string;
    firstName: string;
    lastName: string;
}

const formikFormHandler = withFormik({
    validationSchema: Yup.object().shape({
        firstName: Yup.string()
            .min(2, "good name please")
            .required('required.'),
    }),

    handleSubmit: (formValues: IValues, { props }) => {
        // @ts-ignore
        props.submitForm(formValues);
    },
});

const App: React.FunctionComponent<FormikProps<IValues>> = ({
   values,
   handleSubmit}) => (
                <Form onSubmitCapture={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="John" type="text" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" type="text" />

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" placeholder="john@acme.com" type="email" />

                    <button type="submit" style={{ display: 'block' }}>
                        Submit
                    </button>
                </Form>
            )



export default connect(
    null,
    mapDispatchToProps
)(formikFormHandler(App));


