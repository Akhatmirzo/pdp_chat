import React, { useContext } from "react";
import Logo from "../components/sidebar/Logo";
import InputSearch from "../components/sidebar/InputSearch";
import { Box, Button } from "@mui/material";
import DarkMode from "../components/etc/DarkMode";
import AddIcon from "@mui/icons-material/Add";
import PushPinIcon from "@mui/icons-material/PushPin";
import MessageIcon from "@mui/icons-material/Message";
import UserCard from "../components/sidebar/UserCard";
import { themeContext } from "../context/ThemeContext";

export default function Sidebar() {
  const { mode } = useContext(themeContext);

  return (
    <Box
      sx={{
        maxWidth: "390px",
        minWidth: "390px",
        height: "100vh",
        overflow: "hidden",
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "26px",
        borderRight: mode
          ? "1px solid rgba(94, 94, 94, 0.3)"
          : "1px solid #303030",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: "24px",
        }}
      >
        <Logo />
        <DarkMode />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          paddingX: "24px",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <InputSearch placeholder={"Search messages, people"} />
        <Button
          color="primary"
          variant="contained"
          sx={{
            width: "46px",
            height: "46px",
            minWidth: "46px",
            borderRadius: "12px",
          }}
        >
          <AddIcon size="large" />
        </Button>
      </Box>

      <Box
        sx={{
          height: "100vh",
          overflow: "hidden auto",
          "&::-webkit-scrollbar": { height: 2, width: 2, WebkitAppearance: "none" },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            border: "2px solid",
          },
        }}
      >
        {/* <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2 className="text-[12px] font-medium flex items-center gap-[8.5px] px-[24px]">
            <span className="rotate-45">
              <PushPinIcon fontSize="small" />
            </span>
            PINNED CHATS
          </h2>

          <UserCard />
        </Box> */}

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2 className="text-[12px] font-medium flex items-center gap-[8.5px] px-[24px]">
            <span>
              <MessageIcon fontSize="small" />
            </span>
            ALL MESSAGES
          </h2>

          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
          <UserCard to={'chat/46'} />
        </Box>
      </Box>
    </Box>
  );
}
