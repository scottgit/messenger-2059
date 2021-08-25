import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { Login, Signup, BackgroundImg } from "./index";
import { register, login } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
  },
  introGraphic: {
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      backgroundPosition: "top",
    },
    color: "#fff",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    "&::before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(#3A8DFF, #86B9FF)",
      opacity: 0.85,
    }
  },
  chatIcon: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "initial",
    },
    display: "block",
    fontSize: "6rem",
    marginBottom: "2rem",
    marginTop: "-8rem",
    position: "relative",
    zIndex: 1,
  },
  introText: {
    fontSize: "2rem",
    textAlign: "center",
    maxWidth: 320,
    position: "relative",
    zIndex: 1,
  }
}));

export const UserAccessForm = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="stretch"
      spacing={0}
      className={classes.root}
    >
      <Grid
        container
        direction="column"
        item
        xs={12} sm={5}
        justifyContent="center"
        alignItems="center"
        className={classes.introGraphic}
      >
        <SmsOutlinedIcon className={classes.chatIcon} />
        <Typography className={classes.introText}>Converse with anyone with any language</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12} sm={7}
        justifyContent="center"
        alignItems="center"
      >
        <Login />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccessForm);
