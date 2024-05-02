import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../context/TokenContext";
import io from "socket.io-client";

export default function useSockets() {
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socketLoading, setSocketLoading] = useState(false);
  const { token } = useContext(tokenContext);

  const getSockets = async () => {
    if (token) {
      try {
        setSocketLoading(true);
        const socket = await io("http://localhost:8000/", {
          query: {
            authorization: token,
          },
        });

        setSocket(socket);
        // socket.on() is used to listen to the events. can be used both on client and server side
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        return () => socket.close();
      } catch (error) {
        console.log(error);
      } finally {
        setSocketLoading(false);
      }
    } else {
      if (socket) {
        socket?.close();
        setSocket("");
      }
    }
  };

  useEffect(() => {
    getSockets();
    // eslint-disable-next-line
  }, [token]);

  return { socket, onlineUsers, socketLoading };
}
