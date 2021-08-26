import React, { useState } from "react";
import { generatePath, Redirect, useHistory } from "react-router-dom";
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
import { Login, Signup, BackgroundImg, SwitchFormControl } from "./index";
import { register, login } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
    justifyContent: "center",
    alignItems: "stretch",
  },

  introGraphic: {
    [theme.breakpoints.down("xs")]: {
      height: "20rem",
      backgroundPosition: "top",
    },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
      background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
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
  },

  formDisplay: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

const formTypes = {
  login: {
    type: 'Login',
    greeting: "Welcome back!",
    switchForm: {
      path: "/register",
      prompt: "Don't have an account?",
      buttonText: "Create account",
    }
  },
  signup: {
    type: 'Signup',
    greeting: "Create an account.",
    switchForm: {
      path: "/login",
      prompt: "Already have an account?",
      buttonText: "Login",
    },
  }
}

export const UserAccessForm = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const currentPath = history?.location?.pathname;
  const activeForm = currentPath === "/login" ? formTypes.login : formTypes.signup;

  const { user, login, register } = props;
  const { greeting } = activeForm;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid
      container
      spacing={0}
      className={classes.root}
    >
      <Grid
        container
        item
        xs={12} sm={5}
        className={classes.introGraphic}
      >
        <SmsOutlinedIcon className={classes.chatIcon} />
        <Typography className={classes.introText}>Converse with anyone with any language</Typography>
      </Grid>
      <Grid
        container
        item
        xs={12} sm={7}
        className={classes.formDisplay}
      >
        <SwitchFormControl {...activeForm.switchForm} />
        <Grid container item>
          <Typography>{ greeting }</Typography>
          {(activeForm.type === 'Login' && <Login />)
            ||
            <Signup/>
          }
        </Grid>
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
