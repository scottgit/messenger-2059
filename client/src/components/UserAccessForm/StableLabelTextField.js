import React from 'react';
import { TextField } from "@material-ui/core";

function StableLabelTextField({ InputLabelProps = {}, ...props }) {
  return (
    <TextField
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
      {...props}
    />
  );
}

export default StableLabelTextField
