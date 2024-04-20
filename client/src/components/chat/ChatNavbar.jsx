import React, { useContext } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { themeContext } from "../../context/ThemeContext";

export default function ChatNavbar() {
  const { mode } = useContext(themeContext);
  return (
    <Box
      sx={{
        width: "100%",
        paddingX: "46px",
        paddingY: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: mode
          ? "1px solid rgba(94, 94, 94, 0.3)"
          : "1px solid #303030",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{ width: 58, height: 58 }} />
          <span className="w-[14px] h-[14px] block rounded-full bg-[#00A3FF] absolute bottom-0 right-0"></span>
        </Box>

        <Box>
          <h2 className="text-[18px] font-medium">Liam Anderson</h2>
          <h3 className="text-[#00A3FF] text-[14px] font-normal">Online</h3>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <IconButton>
          <PhoneIcon
            sx={{
              width: 35,
              height: 35,
              padding: "5px",
              borderRadius: "100%",
              cursor: "pointer",
            }}
          />
        </IconButton>

        <IconButton>
          <VideocamIcon
            sx={{
              width: 38,
              height: 38,
              padding: "5px",
              borderRadius: "100%",
              cursor: "pointer",
            }}
          />
        </IconButton>

        <IconButton>
          <MoreVertIcon
            sx={{
              width: 35,
              height: 35,
              padding: "5px",
              borderRadius: "100%",
              cursor: "pointer",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}
