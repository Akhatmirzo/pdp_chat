import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TelegramIcon from "@mui/icons-material/Telegram";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Skeleton } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";
import { chatContext } from "../../context/ChatContext";
import { EditMessage, SendMessage } from "../../utils/ChatApi";
import { socketContext } from "../../context/SocketContext";
import useGetMe from "../../hooks/useGetMe";
import { checkEmptySpace, convertToBase64 } from "../../utils/helper";
import AttachFilesModal from "./AttachFilesModal";
import AudioRecorder from "./AudioRecorder/AudioRecorder";
import { toast } from "react-toastify";

export default function ChatMessageInputs({
  path,
  user,
  chatId,
  editing,
  setEditing,
}) {
  const { mode } = useContext(themeContext);
  const { me } = useGetMe();
  const { ChatsDispatch } = useContext(chatContext);
  const { socket } = useContext(socketContext);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [onTouched, setOnTouched] = useState(false);
  const [audio, setAudio] = useState();

  const handleChangeMessage = (e) => {
    const sender = me;
    if (!editing?.edit) {
      socket.emit("writeMessage", {
        senderId: sender?._id,
        receiverId: path?.id,
        message: e.target.value || "",
      });
    }
    setMessage(e.target.value);
  };

  const handleChangeFiles = async (e) => {
    const file = e.target.files[0];

    if (file?.size < 1000000) {
      console.log(file);
      const dataUrl = await convertToBase64(e.target.files[0]);
      setFiles([
        ...files,
        {
          fileId: file.lastModified,
          size: file.size,
          type: file.type,
          name: file.name,
          dataUrl: dataUrl,
        },
      ]);
    } else {
      console.log("This is big file");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let TrimMessage = "";

    if (message) {
      TrimMessage = checkEmptySpace(message);
    }

    if (TrimMessage || files.length > 0) {
      console.log("tekind");
      setMessage(TrimMessage);
      try {
        if (editing?.edit) {
          const editMsg = await EditMessage(message, editing?.id);

          if (!editMsg) {
            throw new Error("Couldn't edit message");
          }

          ChatsDispatch({
            type: "EDIT_CHAT_MSG",
            chatId,
            id: editing?.id,
            message,
          });

          setEditing({ id: "", message: "", edit: false });
          setMessage("");
        } else {
          const sendingObj = { message };

          if (files.length > 0) {
            sendingObj["files"] = files;
          }

          const sending = await SendMessage(sendingObj, path?.id);

          if (!sending) {
            throw new Error("Couldn't send message");
          }

          console.log(message, sending?.data);

          ChatsDispatch({
            type: "SET_CHAT",
            id: chatId,
            payload: sending?.data,
          });
        }
        setMessage("");
        setFiles([]);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMessage("");
    }
  };

  useEffect(() => {
    if (editing?.edit) {
      setMessage(editing?.message);
    }
  }, [editing]);

  const startBtn = () => {
    setAudio(null)
    setOnTouched(true);
  };

  const endBtn = () => {
    setOnTouched(false);
  };

  const sendAudio = async (audioMsg) => {
    try {
      const sending = await SendMessage({audio: audioMsg}, path?.id);

      if (!sending) {
        throw new Error("Couldn't send message");
      }

      ChatsDispatch({
        type: "SET_CHAT",
        id: chatId,
        payload: sending?.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (audio) {
      sendAudio(audio)
    }
  }, [onTouched, audio]);

  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        p: "17px 46px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRadius: 0,
        borderTop: mode
          ? "1px solid rgba(94, 94, 94, 0.3)"
          : "1px solid #303030",
        width: "100%",
      }}
      onSubmit={sendMessage}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Box
        sx={{
          display: editing?.edit ? "flex" : "none",
          alignItems: "center",
          gap: 3,
        }}
      >
        <IconButton>
          <EditIcon sx={{ color: "#00a3ff" }} />
        </IconButton>

        <Box sx={{ width: "100%" }}>
          <h2 className="text-[#00a3ff]">Edit Message</h2>
          <p className="max-w-[100%] overflow-hidden">{editing?.message}</p>
        </Box>

        <IconButton
          onClick={() => {
            setEditing({ id: "", message: "", edit: false });
            setMessage("");
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
                <KeyboardVoiceIcon
                  sx={{ width: "29px", height: "29px" }}
                  onMouseDown={startBtn}
                  onMouseUp={endBtn}
                  onTouchStart={startBtn}
                  onTouchEnd={endBtn}
                />
              </IconButton>

              <IconButton sx={{ width: "45px", height: "45", padding: "4px" }}>
                <label id="attachFile">
                  <AttachFileIcon sx={{ width: "26px", height: "26px" }} />
                  <input
                    type="file"
                    accept="*"
                    id="attachFile"
                    hidden
                    onChange={handleChangeFiles}
                  />
                </label>
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
      </Box>

      <AttachFilesModal
        message={message}
        setMessage={setMessage}
        files={files}
        setFiles={setFiles}
        sendMessage={sendMessage}
      />

      <AudioRecorder
        onTouched={onTouched}
        setOnTouched={setOnTouched}
        setAudio={setAudio}
      />
    </Paper>
  );
}
