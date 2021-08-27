import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { BackgroundImg, SwitchFormControl } from "./index";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
    },
    justifyContent: "center",
    alignItems: "stretch",
    minWidth: 380,
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
    /* Overlay Gradient for Image */
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

  formWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  formGroup: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "initial",
    },
    marginTop: "-2rem",
    width: "70%",
    "& *:not(button)": {
      width: "100%",
    },
    "& button": {
      alignSelf: "center",
      margin: 20,
    },
  },

  formGreeting: {
    ...theme.typography.h4,
    whiteSpace: "nowrap",
  },
}));

export const UserAccessForm = (props) => {
  const classes = useStyles();

  const { greeting, switchFormProps, user, children } = props;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid
      container
      spacing={0}
      className={classes.root}
    >
      {/*
      Intro Graphic
      */}
      <Grid container item
        xs={12} sm={5}
        className={classes.introGraphic}
      >
        <SmsOutlinedIcon className={classes.chatIcon} />
        <Typography className={classes.introText}>Converse with anyone with any language</Typography>
      </Grid>
      {/*
      Form Display Area
      */}
      <Grid container item
        xs={12} sm={7}
        className={classes.formDisplay}
      >
        <SwitchFormControl {...switchFormProps} />
        <Grid container item className={classes.formWrapper}>
          <Box className={classes.formGroup}>
            <Typography className={classes.formGreeting}>
              { greeting }
            </Typography>
            { /* Expects Login or Signup form as a child */
              children
              &&
              React.Children.map(children, (child) => {
                return React.cloneElement(child);
              })
            }
          </Box>
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

export default connect(mapStateToProps, null)(UserAccessForm);
