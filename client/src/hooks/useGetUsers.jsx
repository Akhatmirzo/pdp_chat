import { useEffect, useState } from "react";
import { GetUsers } from "../utils/UserApi";

export default function useGetUsers() {
  const [userData, setUserData] = useState([]);
  const [userloading, setUserLoading] = useState(false);

  const inheritUsers = async () => {
    try {
      setUserLoading(true);
      const data = await GetUsers();
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    inheritUsers();
  }, []);

  return { userloading, userData };
}
