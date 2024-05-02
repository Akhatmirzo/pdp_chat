import React, { createContext, useContext, useEffect, useState } from "react";
import useSockets from "../hooks/useSockets";
import { tokenContext } from "./TokenContext";

const socketContext = createContext();

export default function SocketContext({ children }) {
  const { socket, onlineUsers } = useSockets();
  const { token } = useContext(tokenContext);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (token) {
      if (socket) {
        socket.on("writeMessage", (obj) => {
          // console.log(obj);
        });
      } else {
        setLoad(!load);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <socketContext.Provider value={{ load, socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
}

export { socketContext };
