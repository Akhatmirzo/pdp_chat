import React, { useContext } from "react";
import { Avatar, Box } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";

export default function Message({ isReceived }) {
  const { mode } = useContext(themeContext);

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
      sx={{
        marginY: 2,
        width: "100%",
        paddingX: "46px",
        display: "flex",
        flexDirection: myMessageStyle.messageColumn,
        gap: "14px",
      }}
    >
      <Avatar sx={{ width: 50, height: 50 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3
          className={`text-[16px] font-medium flex items-center gap-[16px] ${myMessageStyle.titlePosition}`}
        >
          Grace Miller
          <span className="text-[12px] font-normal text-[#A0A0A0]">
            10:30 AM
          </span>
        </h3>

        <p
          className={`inline-block px-[24px] py-[16px] ${myMessageStyle.backgroundColor} ${myMessageStyle.messageRounded}`}
        >
          Absolutely! I'm thinking of going for a hike on Saturday. How about
          you?
        </p>
      </Box>
    </Box>
  );
}
