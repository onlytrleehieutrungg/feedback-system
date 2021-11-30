import OrderForm from "./OrderForm";
import { useForm } from "../../hooks/useForm";
import { Grid,Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import axios from "axios";

export default function Order() {
  const getFreshModelObject = () => ({
    userId: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm(getFreshModelObject);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Container maxWidth="md">
        <OrderForm
          {...{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetFormControls,
          }}
        />
        </Container>
      </Grid>
      
    </Grid>
  );
}
