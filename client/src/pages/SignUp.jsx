import * as React from "react";
import { Link } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { convertToBase64 } from "../utils/helper";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserRegister } from "../utils/UserApi";
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

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setToken } = useContext(tokenContext);
  const [myAvatar, setAvatar] = useState();

  const handleImageInput = async (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = await convertToBase64(imgFile);
    setAvatar(imgUrl);
  };

  const handleSubData = async (data) => {
    console.log(data);
    if (myAvatar) {
      const res = await UserRegister({...data, profilePic: myAvatar});

      if (res?.token) {
        toast.success("User registered");
        localStorage.setItem("token", res.token);
        setToken(res.token);
        reset();
      } else {
        toast.error(res.error || "User registered failed");
      }
    } else {
      toast.error("Please enter a profile picture");
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
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleSubData)}
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            <label
              htmlFor="photos"
              className="cursor-pointer w-full h-auto flex items-center justify-center"
            >
              <Avatar
                alt="Avatar"
                src={myAvatar || ""}
                sx={{ width: 120, height: 120 }}
              />
            </label>
            <input
              onChange={handleImageInput}
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              id="photos"
              name="profilePicture"
              className="hidden"
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="fullName"
                label={
                  errors?.fullName?.type === "pattern"
                    ? "Iltimos harflar bilan yozing"
                    : "fullName"
                }
                sx={{
                  ".Mui-focused": {
                    color:
                      errors?.fullName?.type === "pattern"
                        ? "#ff0000"
                        : "#90caf9",
                  },
                }}
                autoComplete="off"
                {...register("fullName", { pattern: /^[a-zA-Z]+\s[a-zA-Z]*$/ })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label={
                  errors?.username?.type === "pattern"
                    ? "Iltimos kichik harflar bilan yozing"
                    : "username"
                }
                autoComplete="off"
                sx={{
                  ".Mui-focused": {
                    color:
                      errors?.username?.type === "pattern"
                        ? "#ff0000"
                        : "#90caf9",
                  },
                }}
                {...register("username", { pattern: /^[a-z0-9]*$/g })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required color="primary" />}
                label="I agree to all the terms of the Chat Application. Even to the unwritten rules."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/signin"} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
