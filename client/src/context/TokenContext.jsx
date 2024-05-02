import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const tokenContext = createContext();

export default function TokenContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const newToken = localStorage.getItem("token");

    if (!newToken || newToken === undefined) {
      navigate("/");
    } else {
      setToken(newToken);
    }
    //eslint-disable-next-line
  }, [token]);

  return (
    <tokenContext.Provider value={{ token, setToken }}>
      {children}
    </tokenContext.Provider>
  );
}

export { tokenContext}