import React, { useContext, useEffect, useState } from "react";
import { Box, Avatar } from "@mui/material";
import { themeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { socketContext } from "../../context/SocketContext";

export default function UserCard({ user, active, actUser }) {
  const { mode } = useContext(themeContext);
  const { socket } = useContext(socketContext)
  const [typing, setTyping] = useState(false);
  const { _id, fullName, profilePic } = user;

  useEffect(() => {
    if (socket) {
      socket.on("writeMessage", (obj) => {
        if (obj.id === _id) {
          setTyping(obj.typing);
        }else {
          setTyping(false);
        }
      });
    }
    //eslint-disable-next-line 
  }, [socket, actUser])

  return (
    <Link to={_id}>
      <Box
        sx={{
          paddingX: "24px",
          paddingY: "12px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: "16px",
          backgroundColor:
            active === _id
              ? mode
                ? "rgba(0, 163, 255, 0.15)"
                : "rgba(0, 163, 255, 0.30)"
              : "",
          ":hover": {
            backgroundColor: mode
              ? "rgba(0, 163, 255, 0.15)"
              : "rgba(0, 163, 255, 0.30)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar src={profilePic} sx={{ width: 58, height: 58 }} />
          {actUser?.isOnline ? (
            <span className="w-[14px] h-[14px] block rounded-full bg-[#00A3FF] absolute bottom-0 right-0"></span>
          ) : (
            ""
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <h2 className="text-[18px] font-medium">{fullName}</h2>
            <h3 className="text-[#00A3FF] text-[14px] font-normal">
              {typing ? (
                <>
                  Typing
                  <span className=" animate-bounce">.</span>
                  <span className=" animate-bounce">.</span>
                  <span className=" animate-bounce">.</span>
                </>
              ) : (
                "..."
              )}
            </h3>
          </Box>

          <h3 className="text-[#A0A0A0] text-[14px]">14:00</h3>
        </Box>
      </Box>
    </Link>
  );
}
