import React, { useState, useEffect } from "react";
import Form from "../../layouts/Form";
import Table from "../../layouts/Table";
import { TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import ReorderIcon from "@material-ui/icons/Reorder";
import Popup from "../../layouts/Popup";
import { Link } from 'react-router-dom';

import {
  Grid,
  InputAdornment,
  makeStyles,
  ButtonGroup,
  Button as MuiButton,
  Typography,
} from "@material-ui/core";
import { Input, HiddenField } from "../../controls";
import { createAPIEndpoint, callAPI, ENDPIONTS } from "../../api";
import Notification from "../../layouts/Notification";

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#f3b33d",
    color: "#000",
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "#f3b33d",
    },
  },
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#000",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function OrderForm(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const classes = useStyles();
  const [locationList, setlocationList] = useState([]);

  const [notify, setNotify] = useState({ isOpen: false });
  const [devices, setDevices] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [userInfo, setUserInfor] = useState([]);

  const getFeedBackFacility = () => {
    createAPIEndpoint(ENDPIONTS.ASSIGNTASK)
      .fetchByUserId()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.ASSIGNTASK)
      .fetchByUserId()
      .then((res) => {
        setOrderList(res.data);
        resetFormControls();
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.USER)
      .fetchGetInfoUser()
      .then((res) => {
        setUserInfor(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updatePByFeedBackId = (e, id) => {
    e.preventDefault();
    createAPIEndpoint(ENDPIONTS.FEEDBACK)
      .updateP(id)
      .then(() => {
  
        getFeedBackFacility();
      })
      .catch((err) => console.log(err));
  };

  const updateCByFeedBackId = (e, id) => {
    e.preventDefault();
    createAPIEndpoint(ENDPIONTS.FEEDBACK)
      .updateC(id)
      .then(() => {

        getFeedBackFacility();
      })
      .catch((err) => console.log(err));
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   localStorage.setItem("userId", null);
  //   return (
  //     <Container maxWidth="md">
  //       <Login />
  //     </Container>
  //   );
  // };

  return (
    <>
      {/* <MuiButton size="large" onClick={(e) => handleLogout}>
        Logout
      </MuiButton> */}
      <Typography gutterBottom variant="h2" align="center">
        Tasks Page
      </Typography>
      {/* <Form onSubmit={submitOrder}> */}
      <Form>
      <Link to={'/logout'}>Logout</Link>
        <Grid container>
          <Grid item xs={6}>
            {userInfo.map((item) => (
              <Input
                key={item.userId}
                disabled
                label=""
                name="name"
                value={localStorage.getItem("name")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#Hello</InputAdornment>
                  ),
                }}
              />
            ))}
          </Grid>

          <Grid item xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task ID</TableCell>
                  <TableCell>Name Device</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Description Feedback</TableCell>
                  <TableCell>Date Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.map((item, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.task.feedback.device.name}</TableCell>
                    <TableCell>{item.task.feedback.image}</TableCell>
                    <TableCell>{item.task.feedback.description}</TableCell>
                    <TableCell>{item.task.feedback.dateTime}</TableCell>
                    <TableCell>
                      {item.task.feedback.status}

                      <MuiButton
                        size="large"
                        onClick={(e) =>
                          updatePByFeedBackId(e, item.task.feedbackId)
                        }
                      >
                        Processing
                      </MuiButton>
                      <MuiButton
                        size="large"
                        onClick={(e) =>
                          updateCByFeedBackId(e, item.task.feedbackId)
                        }
                      >
                        Completed
                      </MuiButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          {/* <HiddenField name="customerName" value={values.customerName} /> */}
        </Grid>
      </Form>

      <Notification {...{ notify, setNotify }} />
    </>
  );
}
