import React, { useContext } from "react";
import { Box, Avatar } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function UserCard({ to }) {
  const { mode } = useContext(themeContext);

  return (
    <Link to={to}>
      <Box
        sx={{
          paddingX: "24px",
          paddingY: "12px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: "16px",
          ":hover": {
            backgroundColor: mode
              ? "rgba(0, 163, 255, 0.15)"
              : "rgba(0, 163, 255, 0.30)",
          },
        }}
      >
        <Avatar sx={{ width: 58, height: 58 }} />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <h2 className="text-[18px] font-medium">Liam Anderson</h2>
            <h3 className="text-[#00A3FF] text-[14px] font-normal">
              Typing...
            </h3>
          </Box>

          <h3 className="text-[#A0A0A0] text-[14px]">04:50 PM</h3>
        </Box>
      </Box>
    </Link>
  );
}
