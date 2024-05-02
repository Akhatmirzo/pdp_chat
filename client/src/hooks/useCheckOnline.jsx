import { useContext } from "react";
import { socketContext } from "../context/SocketContext";

export default function useCheckOnline() {
  const { onlineUsers } = useContext(socketContext);

  const isOnline = (id) => {
    return onlineUsers?.some((user) => user === id);
  };

  return { isOnline };
}
