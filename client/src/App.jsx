import "./App.css";
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { tokenContext } from "./context/TokenContext";
import NotFound from "./components/etc/NotFound";
import ChatApp from "./pages/ChatApp";
import SocketContext from "./context/SocketContext";
import UserContext from "./context/UserContext";
import ChatContext from "./context/ChatContext";

function App() {
  const { token } = useContext(tokenContext);

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
          <SocketContext>
            <UserContext>
              <ChatContext>
                <ChatApp />
              </ChatContext>
            </UserContext>
          </SocketContext>
        </>
      ) : (
        <Routes>
          <Route path="/">
            <Route index element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      )}
    </Container>
  );
}

export default App;
