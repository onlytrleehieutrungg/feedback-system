import React from 'react'
import StudentPage from './StudentPage'
import { useForm } from '../../hooks/useForm';
import { Grid, Container } from '@material-ui/core';


const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    locationId: '',
    deviceId: '',
    feedbackId: generateOrderNumber(),
    description: '',
    customerName: ''
})


export default function Admin() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <StudentPage
                        {...{
                            values,
                            setValues,
                            errors,
                            setErrors,
                            handleInputChange,
                            resetFormControls
                        }}
                    />
                </Container>
            </Grid>
        </Grid>
    )
}
