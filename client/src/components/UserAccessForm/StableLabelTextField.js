import React from 'react';
import { TextField, makeStyles, } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  label: {
    position: "static",
    fontSize: ".9rem",
    transform: "none",
    "& + .MuiInput-formControl": {
      marginTop: 8,
    }
  },
}));

function StableLabelTextField({ InputLabelProps = {}, ...props }) {
  const classes = useStyles();
  return (
    <TextField
      InputLabelProps={{ ...InputLabelProps, disableAnimation: true, shrink: false, className: classes.label }}
      {...props}
      className={classes.root}
    />
  );
}

export default StableLabelTextField
