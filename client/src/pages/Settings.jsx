import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { convertToBase64 } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import DarkMode from "../components/etc/DarkMode";
import { themeContext } from "../context/ThemeContext";
import { toast } from "react-toastify"

export default function Settings() {
  const { mode } = useContext(themeContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: "",
    profilePic: "",
    username: "",
  });
  const [myAvatar, setAvatar] = useState();

  const handleImageInput = async (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = await convertToBase64(imgFile);
    setAvatar(imgUrl);
    setInputs({...inputs, profilePicture: imgUrl });
  };

  const handleInputsValue = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputs.profilePicture) {
        console.log(inputs);
    }else {
        toast.error("Please enter a profile picture")
    }
  };

  const closeSetting = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{ bgcolor: mode ? "#fff" : "#121212" }}
      className="w-full h-screen absolute top-0 left-0 flex flex-col items-center justify-center"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <DarkMode />
        <CloseIcon sx={{ cursor: "pointer" }} onClick={closeSetting} />
      </Box>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          component={"form"}
          sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={handleSubmit}
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleInputsValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleInputsValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username unique"
                name="username"
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
                onChange={handleInputsValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputsValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleInputsValue}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Editing
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
