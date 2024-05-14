import React, { createContext, useEffect, useReducer, useContext } from "react";
import useGetChats from "../hooks/useGetChats";
import { socketContext } from "./SocketContext";
import { userContext } from "./UserContext";

const chatContext = createContext();

export default function ChatContext({ children }) {
  const { load, socket } = useContext(socketContext);
  const { chatsloading, chatRooms } = useGetChats();
  const { userDispatchers } = useContext(userContext);
  const [chats, ChatsDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_CHAT":
        if (state) {
          return [...state, action.payload];
        } else {
          const newChats = [];
          newChats.push(action.payload);
          return newChats;
        }
      case "SET_CHAT":
        const updateChats = state?.map((chat) => {
          if (chat._id === action.id) {
            chat.messages.push(action.payload);
            return chat;
          } else {
            return chat;
          }
        });
        return updateChats;

      case "EDIT_CHAT_MSG":
        const chats = state?.map((chat) => {
          if (chat._id === action.chatId) {
            chat.messages = chat.messages.map((msg) => {
              if (msg._id === action.id) {
                msg.message = action.message;
              }
              return msg;
            });
          }
          return chat;
        })
        return chats;
      case "DELETE_CHAT_MSG":
        const newChats = state?.map((chat) => {
          if (chat._id === action.chatId) {
            chat.messages = chat.messages.filter((msg) => msg._id !== action.id);
          }
          return chat;
        })
        console.log(newChats);
        return newChats;
      case "PLUCK_CHAT":
        return action.payload;
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    if (!chatsloading) {
      ChatsDispatch({ type: "PLUCK_CHAT", payload: chatRooms });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatsloading]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (msg) => {
        ChatsDispatch({
          type: "SET_CHAT",
          id: msg.chatId,
          payload: msg.message,
        });
      });

      socket.on("newRoom", (room) => {
        ChatsDispatch({
          type: "ADD_CHAT",
          payload: room.newRoom,
        });

        userDispatchers({ type: "add", payload: room.member });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <chatContext.Provider value={{ chats, chatsloading, ChatsDispatch }}>
      {children}
    </chatContext.Provider>
  );
}

export { chatContext };
