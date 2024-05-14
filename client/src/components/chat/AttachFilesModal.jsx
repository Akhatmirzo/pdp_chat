import { Box, Button, Divider, InputBase } from "@mui/material";
import React from "react";
import FileMessage from "./etc/FileMessage";

export default function AttachFilesModal({
  files,
  setFiles,
  message,
  setMessage,
  sendMessage,
}) {

  const closeModal = () => {
    setFiles([]);
  }

  return (
    <Box
      sx={{
        display: files.length > 0 ? "block" : "none",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(012, 012, 012, 0.8)",
      }}
    >
      <Box
        sx={{
          width: "500px",
          height: "auto",
          maxHeight: "90%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#121212",
          borderRadius: "10px",
          boxShadow:
            "#fff 0px 0px 20px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
          padding: "20px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 className="text-xl">Send Post</h2>

        <Box
          sx={{
            width: "100%",
            minHeight: "300px",
            maxHeight: "50%",
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              height: 2,
              width: 2,
              WebkitAppearance: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 0,
              border: "2px solid",
            },
          }}
        >
          {files.map((item) =>
            item.type.split("/")[0] === "image" ? (
              <img
                className="w-full h-full"
                srcSet={`${item?.dataUrl}`}
                src={`${item?.dataUrl}`}
                alt={item?.name}
                loading="lazy"
              />
            ) : (
              <FileMessage file={item} />
            )
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxHeight: "40%",
            overflowX: "hidden",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              height: 2,
              width: 2,
              WebkitAppearance: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 0,
              border: "2px solid",
            },
          }}
        >
          <InputBase
            sx={{ ml: 1, py: 1.5, flex: 1, fontSize: "20px" }}
            placeholder="Write a message"
            inputProps={{ "aria-label": "Write a message" }}
            multiline
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Divider />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            justifySelf: "end",
            gap: "20px",
          }}
        >
          <Button>Add</Button>
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Button onClick={() => closeModal()}>Cancel</Button>
            <Button onClick={sendMessage}>Send</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
