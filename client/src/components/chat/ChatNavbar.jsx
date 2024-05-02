import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, IconButton, Skeleton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { themeContext } from "../../context/ThemeContext";
import { socketContext } from "../../context/SocketContext";

export default function ChatNavbar({ user, activeUser }) {
  const { mode } = useContext(themeContext);
  const { socket } = useContext(socketContext)
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("writeMessage", (obj) => {
        if (obj.id === user?.id) {
          setTyping(obj.typing);
        }else {
          setTyping(false);
        }
      });
    }
    //eslint-disable-next-line 
  }, [socket])

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
          {user?.profilePic ? (
            <>
              <Avatar src={user.profilePic} sx={{ width: 58, height: 58 }} />
              {activeUser?.isOnline ? (
                <span className="w-[14px] h-[14px] block rounded-full bg-[#00A3FF] absolute bottom-0 right-0"></span>
              ) : (
                ""
              )}
            </>
          ) : (
            <Skeleton variant="circular" width={60} height={58} />
          )}
        </Box>

        <Box>
          {user?.fullName ? (
            <h2 className="text-[18px] font-medium">{user.fullName}</h2>
          ) : (
            <Skeleton width={100} />
          )}
          {user ? (
            <h3 className="text-[#00A3FF] text-[14px] font-normal flex">
              {typing ? (
                <>
                  Typing
                  <span className="typingAnim delay-300" >.</span>
                  <span className="typingAnim delay-500">.</span>
                  <span className="typingAnim delay-700">.</span>
                </>
              ) : activeUser?.isOnline ? "Online" : "Offline"}
            </h3>
          ) : (
            <Skeleton width={50} />
          )}
        </Box>
      </Box>

      {user ? (
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
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Skeleton
            variant="circular"
            sx={{
              width: 35,
              height: 35,
              padding: "5px",
            }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: 35,
              height: 35,
              padding: "5px",
            }}
          />
          <Skeleton
            variant="circular"
            sx={{
              width: 35,
              height: 35,
              padding: "5px",
            }}
          />
        </Box>
      )}
    </Box>
  );
}
