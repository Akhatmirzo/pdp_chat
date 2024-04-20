import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Sidebar from "./pages/Sidebar";
import Chat from "./pages/Chat";

function App() {
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
      <Sidebar />
      <Routes>
        <Route path="/">
          <Route index element={<h1>No Content</h1>} />
          <Route path=":id" element={<Chat />} />
        </Route>
        <Route path="*" element={<h1>No Content</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
