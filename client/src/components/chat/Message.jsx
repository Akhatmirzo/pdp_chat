import React, { useContext, forwardRef } from "react";
import { Avatar, Box } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";
import { calcTime } from "../../utils/helper";

function Message({ messages, members, path, handleContextMenu }, ref) {
  const { mode } = useContext(themeContext);
  const sender = members.find((member) => member._id !== path);
  const receiver = members.find((member) => member._id === path);

  const isReceived = messages?.userId !== path;
  const myMessageStyle = isReceived
    ? {
        messageColumn: "row-reverse",
        messageRounded: "rounded-[14px_0px_14px_14px]",
        titlePosition: "flex-row-reverse",
        backgroundColor: "bg-[#00A3FF]",
      }
    : {
        messageColumn: "row",
        messageRounded: "rounded-[0px_14px_14px_14px]",
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
        handleContextMenu(e, messages?._id)
      }}
    >
      <Avatar
        src={isReceived ? sender?.profilePic : receiver?.profilePic}
        sx={{ width: 50, height: 50 }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3
          className={`text-[16px] font-medium flex items-center gap-[16px] ${myMessageStyle.titlePosition}`}
        >
          {isReceived ? sender.fullName : receiver.fullName}
          <span className="text-[12px] font-normal text-[#A0A0A0]">
            {calcTime(messages?.createdAt)}
          </span>
        </h3>

        <p
          className={`inline-block px-[24px] py-[16px] ${myMessageStyle.backgroundColor} ${myMessageStyle.messageRounded}`}
        >
          {messages?.message}
        </p>
      </Box>
    </Box>
  );
}

export default forwardRef(Message);
