import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody, Typography } from "@material-ui/core";
import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";


export default function FeedbackList(props) {
  const {
    setFeedBackId,
    setOrderListVisibility,
    resetFormControls,
    setNotify,
  } = props;

  const [orderList, setOrderList] = useState([]);

  // useEffect(() => {
  //   createAPIEndpoint(ENDPIONTS.FEEDBACK)
  //     .fetchAll()
  //     .then((res) => {
  //       setOrderList(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.FEEDBACK).getFeedbackByUserId()
        .then(res => {
            setOrderList(res.data)

        })
        .catch(err => console.log(err))
}, [])

  //    const showForUpdate = id => {
  //     setFeedBackId(id);
  //     setOrderListVisibility(false);
  // }

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure to delete this feedback?")) {
      createAPIEndpoint(ENDPIONTS.FEEDBACK)
        .delete(id)
        .then((res) => {
          setOrderListVisibility(false);
          setFeedBackId(0);
          resetFormControls();
          setNotify({ isOpen: true, message: "Deleted successfully." });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Typography
        gutterBottom
        variant="h2"
        align="center">
        Feedback's Facilities App
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Feedback No.</TableCell>
            <TableCell>Device Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>DateTime</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item, index) => (
                <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.device.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.dateTime}</TableCell>
              <TableCell>
                <DeleteOutlineTwoToneIcon
                  color="secondary"
                  onClick={(e) => deleteOrder(item.feedbackId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
