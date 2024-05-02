import React, { useContext, useState } from "react";
import Logo from "../components/sidebar/Logo";
import InputSearch from "../components/sidebar/InputSearch";
import { Box, Button, IconButton } from "@mui/material";
import DarkMode from "../components/etc/DarkMode";
import AddIcon from "@mui/icons-material/Add";
import MessageIcon from "@mui/icons-material/Message";
import UserCard from "../components/sidebar/UserCard";
import { themeContext } from "../context/ThemeContext";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { userContext } from "../context/UserContext";
import Loading from "../components/etc/Loading";

export default function Sidebar({active, searchUser, setSearchUser, setIsSearch, activeUsers}) {
  const { mode } = useContext(themeContext);
  const { users, userloading } = useContext(userContext);
  const [open, setOpen] = useState(false)

  const leave = () => {
    let LeaveCheck = window.confirm("Are you sure you want to leave");
    if (LeaveCheck) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };

  function findAcitveUser(id) {
    return activeUsers?.find((user) => user.id === id);
  }

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <SettingsIcon sx={{ cursor: "pointer" }} />
          </IconButton>
          <IconButton onClick={() => leave()}>
            <LogoutIcon sx={{ cursor: "pointer" }} />
          </IconButton>
          <DarkMode />
        </Box>
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
        <InputSearch setSearchUser={setSearchUser} setIsSearch={setIsSearch} setOpen={setOpen} placeholder={"Search messages, people"} />
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
          position: "relative",
          height: "100vh",
          overflow: "hidden auto",
          "&::-webkit-scrollbar": {
            height: 2,
            width: 2,
            WebkitAppearance: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            border: "2px solid",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 158px)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            backgroundColor: "#121212",
            position: "absolute",
            top: 0,
            left: open ? 0 : '-100%',
            zIndex: 100,
          }}
        >
          <Box>{searchUser?.length > 0 ? (
              searchUser?.map((user) => <UserCard key={user._id} user={user} />)
            ) : (
              "Users not found"
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2 className="text-[12px] font-medium flex items-center gap-[8.5px] px-[24px]">
            <span>
              <MessageIcon fontSize="small" />
            </span>
            ALL MESSAGES
          </h2>

          {userloading ? (
            <Loading />
          ) : users?.length > 0 ? (
            users?.map((user) => {
              const actUser = findAcitveUser(user._id);
              return <UserCard key={user._id} user={user} active={active} actUser={actUser} />
            })
          ) : (
            "Users not found"
          )}
        </Box>
      </Box>
    </Box>
  );
}
