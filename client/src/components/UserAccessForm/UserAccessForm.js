import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
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
    color: "#fff",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  chatIcon: {
    display: 'block',
    fontSize: '6rem',
    marginBottom: 20,
    marginTop: -20,
  },
  introText: {
    fontSize: '2rem',
  }
}));

export const UserAccessForm = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
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
