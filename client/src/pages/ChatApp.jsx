import React, { useContext, useEffect, useReducer, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Route, Routes } from "react-router-dom";
import Nomessages from "../components/etc/Nomessages";
import NotFound from "../components/etc/NotFound";
import { socketContext } from "../context/SocketContext";

export default function ChatApp() {
  const { onlineUsers } = useContext(socketContext);
  const [activeUsers, setActiveUsers] = useState([]);
  const [active, actDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_ACTIVE":
        return action.id;
      default:
        return state;
    }
  }, "");

  const checkOnlineUsers = () => {
    const newActiveUsers = [];
    onlineUsers.forEach((user) => {
      let obj = {
        id: user,
        isOnline: true,
      };
      newActiveUsers.push(obj);
    });

    setActiveUsers(newActiveUsers);
  };

  const [searchUser, setSearchUser] = useState([]);
  const [isSearch, setIsSearch] = useState(false);


  useEffect(() => {
    checkOnlineUsers();
    //eslint-disable-next-line
  }, [onlineUsers]);

  return (
    <>
      <Sidebar
        active={active}
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        setIsSearch={setIsSearch}
        activeUsers={activeUsers}
      />
      <Routes>
        <Route path="/">
          <Route index element={<Nomessages sty={true} />} />
          <Route
            path=":id"
            element={
              <Chat
                actDispatch={actDispatch}
                isSearch={isSearch}
                searchUser={searchUser}
                activeUsers={activeUsers}
              />
            }
          />
          <Route path=":id/*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
