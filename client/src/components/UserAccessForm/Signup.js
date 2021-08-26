import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { StableLabelTextField } from ".";
import { register } from "../../store/utils/thunkCreators";

const Login = (props) => {
  const { register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  return (
    <form onSubmit={handleRegister}>
      <Grid>
        <Grid>
          <FormControl>
            <StableLabelTextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              required
            />
          </FormControl>
        </Grid>
        <Grid>
          <FormControl>
            <StableLabelTextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
            />
          </FormControl>
        </Grid>
        <Grid>
          <FormControl error={!!formErrorMessage.confirmPassword}>
            <StableLabelTextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              required
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl error={!!formErrorMessage.confirmPassword}>
            <StableLabelTextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required
            />
            <FormHelperText>
              {formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid container justifyContent="center">
          <Button type="submit" size="large">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
