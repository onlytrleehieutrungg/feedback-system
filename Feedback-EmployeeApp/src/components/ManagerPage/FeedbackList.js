import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@material-ui/core";
import { HiddenField, Input, Select } from "../../controls";

export default function FeedbackList(props) {
  const {
    setFeedBackId,
    setOrderListVisibility,
    resetFormControls,
    setNotify,
  } = props;

  const generateOrderNumber = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const initialObject = {
    taskId: generateOrderNumber(),
    feedbackId: "",
    status: "new",
    dateTime: "",
  };

  const [orderList, setOrderList] = useState([]);
  const [employeeList, setemployeelist] = useState([]);
  const [statuslist, setStatusList] = useState([]);
  const [values, setValues] = useState(initialObject);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.FEEDBACK)
      .fetchPending()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);



  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.FEEDBACK)
      .fetchByStatus()
      .then((res) => {
        let list = res.data.map((item) => ({
          id: item.feedbackId,
          title: item.status,
        }));
        setemployeelist(list);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.USER)
      .fetchEmp()
      .then((res) => {
        let list = res.data.map((item) => ({
          id: item.feedbackId,
          title: item.status,
        }));
        setemployeelist(list);
      })
      .catch((err) => console.log(err));
  }, []);

  const createTask = (e, values) => {
    e.preventDefault();
    createAPIEndpoint(ENDPIONTS.TASK)
      .create(values)
      .then((res) => {
        setOrderListVisibility(false);
        setValues({
          ...values,
          feedbackId: values.feedbackId,
        });
        setOrderList(res.data);
        resetFormControls();
        setNotify({ isOpen: true, message: "Create successfuly" });
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      feedbackId: e.target.value,
      [name]: value,
    });
  };

  const createTaskbyfeedbackId = (e, id) => {
    e.preventDefault();
    createAPIEndpoint(ENDPIONTS.TASK)
      .createTaskByFBackId(id)
      .then(() => {
        resetFormControls();

      })
      .catch((err) => console.log(err));
  };

  const handleChangeSelected = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Feedback No.</TableCell>
            <TableCell>Device Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>DateTime</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item) => (
            <TableRow key={item.feedbackId}>
              <TableCell>{item.feedbackId}</TableCell>
              <TableCell>{item.device.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.dateTime}</TableCell>

              <TableCell>
                {/* Show form của feedback tại đây */}
                <Button
                  variant="contained"
                  onClick={(e) => {
                    createTaskbyfeedbackId(e, item.feedbackId);
                  }}
                >
                  Create
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
