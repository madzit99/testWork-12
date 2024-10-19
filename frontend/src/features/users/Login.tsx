import React, { useState } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import { LoginMutation } from "../../type";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { googleLogin, login } from "./usersThunks";
import { selectLoginError } from "./usersSlice";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);
  const [state, setState] = useState<LoginMutation>({
    username: "",
    password: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

   const submitFormHandler = async (event: React.FormEvent) => {
     event.preventDefault();
     const loginMutation = {
       username: state.username.trim().toLowerCase(),
       password: state.password.trim(),
     };
     await dispatch(login(loginMutation)).unwrap();
     navigate("/");
   };

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>{" "}
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
            {error.error}
          </Alert>
        )}
        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={googleLoginHandler}
            onError={() => {
              console.log("Ошибка при входе  в аккаунт");
            }}
          />
        </Box>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email пользователя"
                name="username"
                autoComplete="current-username"
                value={state.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Пароль"
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Или зарегистрируйтесь
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
