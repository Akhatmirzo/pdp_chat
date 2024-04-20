import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { themeContext } from "../../context/ThemeContext";

export default function DarkMode() {
  const { mode, setMode } = useContext(themeContext);

  return (
    <IconButton sx={{ ml: 1 }} onClick={() => setMode(!mode)}  color="inherit">
      {mode ? <Brightness4Icon /> : <Brightness7Icon /> }
    </IconButton>
  );
}
