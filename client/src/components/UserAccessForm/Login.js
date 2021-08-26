import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  FormControl,
} from "@material-ui/core";
import { StableLabelTextField } from ".";
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
          <Button type="submit" size="large">
            Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
