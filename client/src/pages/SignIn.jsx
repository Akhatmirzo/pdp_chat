import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DarkMode from "../components/etc/DarkMode";
import { UserLogin } from "../utils/UserApi";
import { toast } from "react-toastify";
import { useContext } from "react";
import { tokenContext } from "../context/TokenContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link className=" underline" to="https://github.com/Akhatmirzo/">
        Akhatmirzo Umarov
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()
  const { setToken } = useContext(tokenContext)

  const handleSubData = async (data) => {
    const res = await UserLogin(data);

    if (res?.token) {
      toast.success("User Authentication");
      localStorage.setItem("token", res.token);
      setToken(res.token);
      navigate("/")
      reset();
    } else {
      toast.error(res.error || "User Auth failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          position: "absolute",
          top: 15,
          left: 15,
        }}
      >
        <DarkMode />
      </Box>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(handleSubData)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username Address"
            autoComplete="username"
            autoFocus
            {...register("username")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{ minLength: 6 }}
            {...register("password")}
          />
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" {...register("remember")} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/signin"} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
