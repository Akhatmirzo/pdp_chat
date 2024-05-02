import React, { createContext, useEffect, useReducer } from "react";
import useGetUsers from "../hooks/useGetUsers";

const userContext = createContext();

export default function UserContext({ children }) {
  const { userloading, userData } = useGetUsers();
  const [users, userDispatchers] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        if (state) {
          return [...state, action.payload];
        }else {
          const newUser = [];
          newUser.push(action.payload);
          return newUser;
        }
      case "remove":
        return state.filter(
          (user) => user._id.toString() !== action.payload.id
        );
      case "pluck":
        return action.payload;
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    if (!userloading) {
      userDispatchers({ type: "pluck", payload: userData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userloading]);

  return (
    <userContext.Provider value={{ users, userloading, userDispatchers }}>
      {children}
    </userContext.Provider>
  );
}

export { userContext };
