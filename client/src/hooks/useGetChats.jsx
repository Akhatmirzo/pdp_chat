import { useEffect, useState } from "react";
import { GetChatRooms } from "../utils/ChatApi";

export default function useGetChats() {
  const [chatsloading, setChatsLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);

  const getChats = async () => {
    try {
      setChatsLoading(true);
      const res = await GetChatRooms();
      setChatRooms(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setChatsLoading(false);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return { chatsloading, chatRooms };
}
