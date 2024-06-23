import React, { FC, useState } from "react";
import auth from "./Auth.module.css";
import { login, signup } from "components/utils/auth";
import {
  Paper,
  Grid,
  FormGroup,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Widget } from "../UI/Widget";
import w from "../UI/Widget.module.css";

interface FormData {
  email: string;
  password: string;
  name: string;
}

const customLinkStyle = {
  cursor: "pointer",
  color: "grey",
};

export const Login: FC = () => {
  const [state, setState] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    setError("");
    event.preventDefault();
    try {
      if (isSignup) {
        const data = await signup(state.email, state.password, state.name);
      } else {
        const data = await login(state.email, state.password);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className={auth.authPage}>
      <Grid container spacing={2}>
        <Widget>
          <Grid item xs={8}>
            <Grid item>
              <div className="d-flex align-items-center justify-content-between py-3">
                <p className={`${w.authHeader} mb-0`}>
                  {isSignup ? "Sign Up" : "Login"}
                </p>
              </div>
              <div className={`${w.authInfo} my-2`}>
                <p>This is a demo app</p>
              </div>
              <form onSubmit={handleSubmit}>
                <FormGroup className="my-3">
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    value={state.email}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={state.password}
                    onChange={handleChange}
                    className="input-transparent pl-3"
                  />
                </FormGroup>

                {isSignup && (
                  <FormGroup>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Name"
                      type="name"
                      fullWidth
                      value={state.password}
                      onChange={handleChange}
                      className="input-transparent pl-3"
                    />
                  </FormGroup>
                )}
                <a
                  className={`${auth.dividingLine}`}
                  onClick={() => setIsSignup((prev) => !prev)}
                  style={customLinkStyle}
                >
                  &#8195;{isSignup ? "Log In" : "Sign Up"} here &#8195;
                </a>
                <div className="bg-widget d-flex justify-content-center">
                  <Button
                    className={`rounded-pill my-3 ${auth.secondaryRed}`}
                    type="submit"
                  >
                    {isSignup ? "Sign Up" : "Log In"}
                  </Button>
                </div>
                {error}
              </form>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
    </div>
  );
};
