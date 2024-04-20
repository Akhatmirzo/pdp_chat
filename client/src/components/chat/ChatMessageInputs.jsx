import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TelegramIcon from "@mui/icons-material/Telegram";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";

export default function ChatMessageInputs() {
  const { mode } = useContext(themeContext);
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        p: "17px 46px",
        display: "flex",
        alignItems: "center",
        borderRadius: 0,
        borderTop: mode
          ? "1px solid rgba(94, 94, 94, 0.3)"
          : "1px solid #303030",
        width: "100%",
      }}
    >
      <IconButton sx={{ p: "10px", alignSelf: 'end' }} aria-label="smale">
        <SentimentSatisfiedAltIcon sx={{ width: "27px", height: "27px" }} />
      </IconButton>
      
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: "20px" }}
        placeholder="Write a message"
        inputProps={{ "aria-label": "Write a message" }}
        multiline
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", alignSelf: 'end' }}>
        <IconButton>
          <KeyboardVoiceIcon sx={{ width: "29px", height: "29px" }} />
        </IconButton>

        <IconButton>
          <AttachFileIcon sx={{ width: "26px", height: "26px" }} />
        </IconButton>

        <Button
          sx={{
            backgroundColor: "rgb(0, 163, 255)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingX: "18px",
            paddingY: "10px",
          }}
        >
          <span className="text-[20px] text-white font-medium leading-[24px] capitalize">
            Send
          </span>
          <TelegramIcon sx={{ color: "white" }} />
        </Button>
      </Box>
    </Paper>
  );
}
