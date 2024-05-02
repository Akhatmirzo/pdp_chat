import React from "react";
import { GetUser } from "../utils/UserApi";

export default function useGetMe() {
  const [me, setMe] = React.useState(null);
  const [meloading, setMeLoading] = React.useState(true);

  const getMe = async () => {
    try {
        setMeLoading(true);
      const res = GetUser("me");

      if (!res) {
        throw new Error("Error");
      }

      setMe(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
        setMeLoading(false);
    }
  };
  return {me, meloading};
}
