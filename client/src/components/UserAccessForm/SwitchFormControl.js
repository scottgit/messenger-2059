import React from 'react';
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  invertedButton: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 10px 2px rgba(0,0,0,0.1)",
    color: theme.palette.primary.main,
    "&:hover": {
      boxShadow: "0 0 10px 2px rgba(0,0,0,0.3)",
      backgroundColor: "#FFFFFF",
    }
  }
}));

export const SwitchFormControl = (props) => {
  const history = useHistory();
  const classes = useStyles();
  console.log('SFORM', props);
  const { prompt, path, buttonText } = props;

  return (
    <Grid container item>
      <Typography>{ prompt }</Typography>
      <Button size="large" className={classes.invertedButton} onClick={() => history.push(path)}>
        { buttonText }
      </Button>
    </Grid>
  )
}

export default SwitchFormControl;
