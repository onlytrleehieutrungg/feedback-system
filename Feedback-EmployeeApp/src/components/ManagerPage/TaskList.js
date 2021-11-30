import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import Popup from "../../layouts/Popup";
import PopupEmp from "./PopupEmp";
import ReorderIcon from "@material-ui/icons/Reorder";
import AssignTaskList from "./AssignTaskList";
import {
  Input,
  Select,
  Button,
  ListItemCustom,
  HiddenField,
} from "../../controls";
import {
  Grid,
  InputAdornment,
  makeStyles,
  ButtonGroup,
  MenuItem,
  Button as MuiButton,
  TextField,
  Typography,
} from "@material-ui/core";

export default function TaskList(props) {
  const {
    setFeedBackId,
    setOrderListVisibility,
    resetFormControls,
    setNotify,
    values,
    setValues,
  } = props;

  const [orderList, setOrderList] = useState([]);
  const [employeeList, setemployeelist] = useState([]);
  const [tasklist, setTaskList] = useState([]);
  const [PendingListVisibility, setPendingListVisibility] = useState(false);
  const [EmpListVisibility, setempListVisibility] = useState(false);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.TASK)
      .fetchAll()
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getFeedBackFacility = () => {
    createAPIEndpoint(ENDPIONTS.TASK)
      .fetchAll()
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.FEEDBACK)
      .fetchAll()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.USER)
      .fetchEmp()
      .then((res) => {
        let list = res.data.map((item) => ({
          id: item.userId,
          title: item.name,
        }));
        setemployeelist(list);
      })
      .catch((err) => console.log(err));
  }, []);

  const AssignTask = (e, tkid, idemp) => {
    e.preventDefault();
    createAPIEndpoint(ENDPIONTS.ASSIGNTASK)
      .assignTaskByfbnemp(tkid, idemp)
      .then(() => {
        resetFormControls();
        getFeedBackFacility();
      })
      .catch((err) => console.log(err));
  };

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure to delete this feedback?")) {
      createAPIEndpoint(ENDPIONTS.TASK)
        .delete(id)
        .then((res) => {
          resetFormControls();
        })
        .catch((err) => console.log(err));
    }
  };

  const openListOfPending = () => {
    setPendingListVisibility(true);
  };

  const openListOfEmp = () => {
    setempListVisibility(true);
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
    
        <ButtonGroup>
          <MuiButton
            size="large"
            onClick={openListOfPending}
            startIcon={<ReorderIcon />}
          >
            Manage Task
          </MuiButton>
        </ButtonGroup>
        <TableRow>
          <TableCell>Task No.</TableCell>
          <TableCell>Feedback ID</TableCell>
          <TableCell>DateTime</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
    

        {tasklist.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.feedbackId}</TableCell>
            <TableCell>{item.dateTime}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
                <DeleteOutlineTwoToneIcon
                  color="secondary"
                  onClick={(e) => deleteOrder(item.taskId)}
                />
              </TableCell>
            <TableCell>
              <MuiButton size="large" onClick={openListOfEmp}>
                Emp List
              </MuiButton>
            </TableCell>

            <TableCell><Button
          variant="contained"
          onClick={(e) => {
            AssignTask(e, item.taskId, values.userId);
          }}
        >
          Assign
        </Button></TableCell>
          </TableRow>
        ))}
     
      <PopupEmp
        title="List of Emp"
        openPopup={EmpListVisibility}
        setOpenPopup={setempListVisibility}
      >
        <Select
          placeholder="Please select employee"
          label="Employee"
          name="userId"
          value={values.userId}
          onChange={handleChangeSelected}
          options={employeeList}
        />
        
      </PopupEmp>
      <Popup
        title="List of Feedbacks"
        openPopup={PendingListVisibility}
        setOpenPopup={setPendingListVisibility}
      >
        <AssignTaskList
          {...{ setPendingListVisibility, resetFormControls, setNotify }}
        />
      </Popup>
    </>
  );
}
