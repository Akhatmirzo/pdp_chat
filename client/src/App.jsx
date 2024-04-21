import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Sidebar from "./pages/Sidebar";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  const [token] = useState();

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
      }}
    >
      {token ? (
        <>
          <Sidebar />
          <Routes>
            <Route path="/">
              <Route index element={<h1>No Content</h1>} />
              <Route path=":id" element={<Chat />} />
            </Route>
            <Route path="*" element={<h1>No Content</h1>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/">
            <Route index element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<h1>No Content</h1>} />
          </Route>
        </Routes>
      )}
    </Container>
  );
}

export default App;
