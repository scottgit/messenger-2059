import React from 'react';
import { Button } from "@material-ui/core";

function SubmitButton(props) {
  const children = props.children ? props.children : null;
  const buttonText = props.buttonText ? props.buttonText : children ? '' : "Submit";

  return (
    <Button type="submit" variant="contained" disableElevation size="large" {...props}>
      { buttonText }
      { /* Can pass text or other items as a child */
        children
        &&
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child);
          }
          return child;
        })
      }
    </Button>
  )
}

export default SubmitButton
