import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TelegramIcon from "@mui/icons-material/Telegram";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useContext, useState } from "react";
import { Box, Button, Skeleton } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";
import { chatContext } from "../../context/ChatContext";
import { SendMessage } from "../../utils/ChatApi";
import { socketContext } from "../../context/SocketContext";
import useGetMe from "../../hooks/useGetMe";

export default function ChatMessageInputs({ path, user, chatId, members }) {
  const { mode } = useContext(themeContext);
  const { me } = useGetMe(); 
  const { ChatsDispatch } = useContext(chatContext);
  const { socket } = useContext(socketContext);
  const [message, setMessage] = useState("");

  const handleChangeMessage = (e) => {
    const sender = me;
    socket.emit("writeMessage", {
      senderId: sender?._id,
      receiverId: path?.id,
      message: e.target.value || "",
    });
    setMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message) {
      console.log(socket);
      try {
        const sending = await SendMessage(message, path?.id);

        if (!sending) {
          throw new Error("Couldn't send message");
        }

        ChatsDispatch({ type: "SET_CHAT", id: chatId, payload: sending?.data });
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      onSubmit={sendMessage}
    >
      {user ? (
        <IconButton sx={{ p: "10px", alignSelf: "end" }} aria-label="smale">
          <SentimentSatisfiedAltIcon sx={{ width: "27px", height: "27px" }} />
        </IconButton>
      ) : (
        <Skeleton
          variant="circular"
          width={27}
          height={27}
          sx={{ p: "10px" }}
        />
      )}

      {user ? (
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: "20px" }}
          placeholder="Write a message"
          inputProps={{ "aria-label": "Write a message" }}
          multiline
          value={message}
          onChange={handleChangeMessage}
        />
      ) : (
        <Skeleton width={"100%"} height={40} sx={{ mx: 1 }}></Skeleton>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          alignSelf: "end",
        }}
      >
        {user ? (
          <>
            <IconButton>
              <KeyboardVoiceIcon sx={{ width: "29px", height: "29px" }} />
            </IconButton>

            <IconButton>
              <AttachFileIcon sx={{ width: "26px", height: "26px" }} />
            </IconButton>

            <Button
              type="submit"
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
          </>
        ) : (
          <>
            <Skeleton variant="circular" width={29} height={29} />
            <Skeleton variant="circular" width={29} height={29} />
            <Skeleton sx={{ paddingX: "18px", paddingY: "10px" }} />
          </>
        )}
      </Box>
    </Paper>
  );
}
