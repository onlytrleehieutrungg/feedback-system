import React, { useState, useEffect } from "react";
import Form from "../../layouts/Form";
import { Link } from "react-router-dom";
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
import {
  Input,
  Select,
  Button,
  ListItemCustom,
  HiddenField,
} from "../../controls";
import ReorderIcon from "@material-ui/icons/Reorder";
import { createAPIEndpoint, callAPI, ENDPIONTS } from "../../api";
import Popup from "../../layouts/Popup";
import FeedbackList from "./FeedbackList";
import TaskList from "./TaskList";
import Notification from "../../layouts/Notification";
import ProcessingButton from "./ProcessingButton";
import PendingButton from "./PendingButton";
import CompletedButton from "./CompletedButton";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  InputBase,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";

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

export default function ManagerForm(props) {
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
  const [employeeList, setemployeelist] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false });
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(0);
  const [PendingListVisibility, setPendingListVisibility] = useState(false);
  const [ProcessingListVisibility, setProcessingListVisibility] =
    useState(false);
  const [CompletedListVisibility, setCompletedListVisibility] = useState(false);
  const [userInfo, setUserInfor] = useState([]);

  const handleChangeSelected = (e) => {
    const { name, value } = e.target;
    loadListDeviceByLocationId(e.target.value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleListItemClick = (index, item) => {
    setSelectedDevice(index);
    setValues({
      ...values,
      deviceId: item.deviceId,
    });
  };
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.USER)
      .fetchGetInfoUser()
      .then((res) => {
        setUserInfor(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.LOCATION)
      .fetchAll()
      .then((res) => {
        let list = res.data.map((item) => ({
          id: item.locationId,
          title: item.locatitonName,
        }));
        setlocationList(list);
        setErrors({});
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
        setErrors({});
      })
      .catch((err) => console.log(err));
  }, []);

  const loadListDeviceByLocationId = (locationId) => {
    locationId === "" || locationId === undefined || locationId === null
      ? resetFormControls()
      : createAPIEndpoint(ENDPIONTS.DEVICE)
          .fetchListDeviceById(locationId)
          .then((res) => {
            let devices = res.data.map((item) => {
              setValues({
                ...values,
                locationId: locationId,
                deviceId: res.data[0].deviceId,
              });
              return {
                deviceId: item.deviceId,
                name: item.name,
              };
            });
            setDevices(devices);
            console.log(devices);
            setErrors({});
          })
          .catch((err) => console.log(err));
  };

  const validateForm = () => {
    let temp = {};
    temp.locationId = values.locationId != 0 ? "" : "This field is required.";
    temp.description =
      values.description != "" ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createAPIEndpoint(ENDPIONTS.FEEDBACK)
        .create(values)
        .then((res) => {
          setDevices([]);
          resetFormControls();
          setNotify({ isOpen: true, message: "New feedback is created." });
        })
        .catch((err) => console.log(err));
    }
  };
  const openListOfPending = () => {
    setPendingListVisibility(true);
  };

  const openListOfOrders = () => {
    setOrderListVisibility(true);
  };

  console.log(values);

  return (
    <>
      <Typography gutterBottom variant="h2" align="center">
        Manage Page
      </Typography>
      <Link to={"/logout"}>Logout</Link>
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
          <ButtonGroup className={classes.submitButtonGroup}>
            <MuiButton
              size="large"
              onClick={openListOfPending}
              startIcon={<ReorderIcon />}
            >
              Filter List
            </MuiButton>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <h3>List FeedBack</h3>
          <FeedbackList
            {...{ setOrderListVisibility, resetFormControls, setNotify }}
          />
        </Grid>
      </Grid>
      <Popup
        title="List of Feedbacks"
        openPopup={PendingListVisibility}
        setOpenPopup={setPendingListVisibility}
      >
        <ProcessingButton
          {...{ setPendingListVisibility, resetFormControls, setNotify }}
        />
        <CompletedButton
          {...{ setPendingListVisibility, resetFormControls, setNotify }}
        />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </>
  );
}
