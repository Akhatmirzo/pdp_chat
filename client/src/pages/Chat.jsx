import { Box } from "@mui/material";
import React, { useContext } from "react";
import ChatNavbar from "../components/chat/ChatNavbar";
import ChatMessageInputs from "../components/chat/ChatMessageInputs";
import Message from "../components/chat/Message";
import { themeContext } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

export default function Chat() {
  const { mode } = useContext(themeContext);
  const sender = useParams();
  console.log(sender);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ChatNavbar />

      <Box
        sx={{
          height: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            height: 2,
            width: 2,
            WebkitAppearance: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            border: "2px solid",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            minHeight: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            backgroundColor: mode ? "" : "rgba(24, 24, 24, 1)",
          }}
        >
          <Message isReceived={false} />
          <Message isReceived={true} />
          <Message isReceived={false} />
          <Message isReceived={true} />
          
        </Box>
      </Box>

      <ChatMessageInputs />
    </Box>
  );
}
