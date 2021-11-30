import React from 'react'
import ManagerPage from './ManagerPage'
import TaskList from './TaskList'
import { useForm } from '../../hooks/useForm';
import { Grid ,Container} from '@material-ui/core';

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    feedbackId: '',
    taskId: generateOrderNumber(),
    status: 'Pending',
    dateTime: '',
    userId:'',
    email:'',
    name:''
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
            <Container maxWidth="md">
            <Grid item xs={6}>
                <ManagerPage
                    {...{
                        values,
                        setValues,
                        errors,
                        setErrors,
                        handleInputChange,
                        resetFormControls
                    }}
                />
            </Grid>
            <Grid item xs={9}>
                <h3>AssignTask Table</h3>
                <TaskList
                    {...{
                        values,
                        setValues,
                        errors,
                        setErrors,
                        handleInputChange,
                        resetFormControls
                    }}
                />
            </Grid>
            </Container>
        </Grid>
    )
}
