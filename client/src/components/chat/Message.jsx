import React, { useContext, forwardRef, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";
import { calcTime } from "../../utils/helper";
import FileMessage from "./etc/FileMessage";
import AudioFileMessage from "./etc/AudioFileMessage";

function Message({ messages, members, path, handleContextMenu }, ref) {
  const { mode } = useContext(themeContext);
  const sender = members.find((member) => member._id !== path);
  const receiver = members.find((member) => member._id === path);

  const isReceived = messages?.userId !== path;
  const myMessageStyle = isReceived
    ? {
        messageColumn: "row-reverse",
        messageRounded:
          messages?.files.length > 0
            ? "rounded-[0px_0px_14px_14px]"
            : "rounded-[14px_0px_14px_14px]",
        titlePosition: "flex-row-reverse",
        backgroundColor: "bg-[#00A3FF]",
      }
    : {
        messageColumn: "row",
        messageRounded:
          messages?.files.length > 0
            ? "rounded-[0px_0px_14px_14px]"
            : "rounded-[0px_14px_14px_14px]",
        titlePosition: "flex-row",
        backgroundColor: mode ? "border border-[#292929]" : "bg-[#292929]",
      };

  return (
    <Box
      ref={ref}
      sx={{
        marginY: 2,
        width: "100%",
        paddingX: "46px",
        display: "flex",
        flexDirection: myMessageStyle.messageColumn,
        gap: "14px",
      }}
      onContextMenu={(e) => {
        handleContextMenu(e, messages?._id, messages?.userId);
      }}
    >
      <Avatar
        src={isReceived ? sender?.profilePic : receiver?.profilePic}
        sx={{ width: 50, height: 50 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "80%",
        }}
      >
        <h3
          className={`text-[16px] font-medium flex items-center gap-[16px] ${myMessageStyle.titlePosition}`}
        >
          {isReceived ? sender.fullName : receiver.fullName}
          <span className="text-[12px] font-normal text-[#A0A0A0]">
            {calcTime(messages?.createdAt)}
          </span>
        </h3>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            {messages.files.map((file) =>
              file.type.includes("image") ? (
                <img
                  src={file.dataUrl}
                  alt={file.name}
                  className="w-full rounded-t-[14px]"
                />
              ) : (
                file.type.includes("audio") ? <AudioFileMessage file={file} bg={myMessageStyle.backgroundColor} /> : <FileMessage file={file} bg={myMessageStyle.backgroundColor} />
              )
            )}
          </Box>
          {messages?.message ? (
            <p
              className={`inline-block w-full px-[24px] py-[16px] ${myMessageStyle.backgroundColor} ${myMessageStyle.messageRounded}`}
            >
              {messages?.message}
            </p>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default forwardRef(Message);
