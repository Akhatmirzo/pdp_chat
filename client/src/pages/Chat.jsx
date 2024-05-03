import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatNavbar from "../components/chat/ChatNavbar";
import ChatMessageInputs from "../components/chat/ChatMessageInputs";
import Message from "../components/chat/Message";
import Nomessages from "../components/etc/Nomessages";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import { themeContext } from "../context/ThemeContext";
import { userContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { chatContext } from "../context/ChatContext";
import { socketContext } from "../context/SocketContext";
import { toast } from "react-toastify";

export default function Chat({
  actDispatch,
  isSearch,
  searchUser,
  activeUsers,
}) {
  const { users, userloading } = useContext(userContext);
  const { chats, chatsloading } = useContext(chatContext);
  const { onlineUsers } = useContext(socketContext);
  const [activeUser, setActiveUser] = useState();
  const [user, setUser] = useState();
  const [chat, setChat] = useState();
  const { mode } = useContext(themeContext);
  const receiver = useParams();
  const lastMessageRef = useRef(null);
  const [copy, setCopy] = useState();

  useEffect(() => {
    function findAcitveUser(id) {
      return activeUsers?.find((user) => user.id === id);
    }
    // Online Users check
    const actUser = findAcitveUser(user?._id);
    setActiveUser(actUser);
    console.log(actUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineUsers, receiver]);

  useEffect(() => {
    function findUser(userId) {
      return users?.find((user) => user._id === userId);
    }

    function findUserChat(userId) {
      // eslint-disable-next-line array-callback-return
      return chats?.find((chat) => {
        const chatMembers = chat.members;
        const findMember = chatMembers.find(
          (chatMember) => chatMember._id.toString() === userId
        );
        if (findMember) {
          return chat;
        }
      });
    }

    // Find User
    if (!userloading) {
      let userData = findUser(receiver?.id);
      setUser(userData);
      if (!userData && isSearch) {
        const newData = searchUser?.find((user) => user._id === receiver?.id);
        setUser(newData);
      }
      actDispatch({ type: "SET_ACTIVE", id: receiver?.id });
    }

    // FInd Chat
    if (!chatsloading) {
      const findChat = findUserChat(receiver?.id);
      setChat(findChat);
    }

    // Message Auto Scrolling Y
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver, chats]);

  // OnContextMenu
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event, msgId) => {
    event.preventDefault();
    setCopy(event.target.innerText);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );

    console.log(msgId);
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const copyMessage = () => {
    if (copy) {
      window.navigator.clipboard.writeText(copy);
      toast.success("Message Copied");

      handleClose();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ChatNavbar user={user} activeUser={activeUser} />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
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
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem
            onClick={copyMessage}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <ContentCopyIcon /> Copy
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <EditIcon /> Edit
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <DeleteIcon /> Delete
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <PushPinIcon /> Pin
          </MenuItem>
        </Menu>

        {user ? (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              minHeight: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundColor: mode ? "" : "rgba(24, 24, 24, 1)",
            }}
          >
            {
              // eslint-disable-next-line array-callback-return
              chat?.messages.map((msg) => {
                return (
                  <Message
                    key={msg._id}
                    ref={lastMessageRef}
                    path={receiver?.id}
                    messages={msg}
                    members={chat?.members}
                    handleContextMenu={handleContextMenu}
                  />
                );
              })
            }
          </Box>
        ) : (
          <Nomessages sty={false} />
        )}
      </Box>

      <ChatMessageInputs
        path={receiver}
        user={user}
        members={chat?.members}
        chatId={chat?._id}
      />
    </Box>
  );
}
