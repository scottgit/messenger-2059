import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
} from "@material-ui/core";
import { UserAccessForm, StableLabelTextField, SubmitButton } from "./index";
import { login } from "../../store/utils/thunkCreators";

const Login = (props) => {
  const { login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  return (
    <UserAccessForm
      greeting="Welcome back!"
      switchFormProps={{
        path: "/register",
        prompt: "Don't have an account?",
        buttonText: "Create account",
      }}
    >
      <form onSubmit={handleLogin}>
        <Grid>
          <Grid>
            <FormControl margin="normal" required>
              <StableLabelTextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
              />
            </FormControl>
          </Grid>
          <FormControl margin="normal" required>
            <StableLabelTextField
              label="Password"
              aria-label="password"
              type="password"
              name="password"
            />
          </FormControl>
          <Grid container justifyContent="center">
            <SubmitButton buttonText="Login" />
          </Grid>
        </Grid>
      </form>
    </UserAccessForm>
  );
};

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
