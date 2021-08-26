import React from 'react';
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  prompt: {
    color: theme.palette.text.secondary,
  },
  invertedButton: {
    margin: 20,
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 10px 2px rgba(0,0,0,0.1)",
    color: theme.palette.primary.main,
    "&:hover": {
      boxShadow: "0 0 10px 2px rgba(0,0,0,0.3)",
      backgroundColor: theme.palette.common.white,
    }
  }
}));

export const SwitchFormControl = (props) => {
  const history = useHistory();
  const classes = useStyles();
  console.log('SFORM', props);
  const { prompt, path, buttonText } = props;

  return (
    <Grid container item className={classes.root}>
      <Typography className={classes.prompt}>{ prompt }</Typography>
      <Button size="large" className={classes.invertedButton} onClick={() => history.push(path)}>
        { buttonText }
      </Button>
    </Grid>
  )
}

export default SwitchFormControl;
