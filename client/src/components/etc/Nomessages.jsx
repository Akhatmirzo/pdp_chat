import React from "react";

export default function Nomessages({sty}) {
  return (
    <div className={`w-full ${sty ? "" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"} flex items-center justify-center`}>
        <h1>Select a chat to messaging</h1>
    </div>
  );
}
