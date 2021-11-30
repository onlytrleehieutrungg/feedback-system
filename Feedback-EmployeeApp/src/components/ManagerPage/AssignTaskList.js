import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import {
  Input,
  Select,
  Button,
  ListItemCustom,
  HiddenField,
} from "../../controls";


export default function AssignTaskList(props) {
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
  const [assigntasklist, setAssignTaskList] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.ASSIGNTASK)
      .fetchAll()
      .then((res) => {
        setAssignTaskList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getFeedBackFacility = () => {
    createAPIEndpoint(ENDPIONTS.ASSIGNTASK)
      .fetchAll()
      .then((res) => {
        setAssignTaskList(res.data);
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



  const deleteOrder = (id) => {
    if (window.confirm("Are you sure to delete this feedback?")) {
      createAPIEndpoint(ENDPIONTS.ASSIGNTASK)
        .delete(id)
        .then((res) => {
          setFeedBackId(0);
          resetFormControls();
          setNotify({ isOpen: true, message: "Deleted successfully." });
        })
        .catch((err) => console.log(err));
    }
  };

  const getFeebackId = (e,id) => {
    e.preventDefault();
    createAPIEndpoint(ENDPIONTS.TASK)
      .fetchById(id)
        .then((res) => {
          let list = res.data.map((item) => ({
            id: item.userId,
            title: item.name,
          }));
          setemployeelist(list);
        })
 
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task No.</TableCell>
            <TableCell>Assign ID</TableCell>
            <TableCell>Task ID</TableCell>
            <TableCell>Employee ID</TableCell>
            {/* <TableCell>Feedback ID</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {assigntasklist.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{item.assignId}</TableCell>
              <TableCell>{item.taskId}</TableCell>
              <TableCell>{item.employeeId}</TableCell>
              {/* <TableCell onClick={(e) => getFeebackId(e,item.taskId)}>{employeeList.map((item) => (item.feedbackId))}</TableCell> */}
              <TableCell>
                <DeleteOutlineTwoToneIcon
                  color="secondary"
                  onClick={(e) => deleteOrder(item.assignId)}
                />
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow> 
          ))}
        </TableBody>
      </Table>
    </>
  );
}
