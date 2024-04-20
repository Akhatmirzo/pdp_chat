import React, { createContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const themeContext = createContext();

export default function ThemeContext({ children }) {
  const [mode, setMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
    },
  });
 
  return (
    <themeContext.Provider value={{mode, setMode}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
}

export { themeContext };
