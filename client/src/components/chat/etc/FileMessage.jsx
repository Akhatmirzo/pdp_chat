import { Box, Paper } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import React from "react";

export default function FileMessage({ bg, rounded, file }) {

    function convertToKb(size) {
        let traficSize = null;
        let traficName = null;

        if (size >= 1024) {
            traficSize = size / 1024;
            traficName = "KB";
        }

        if (size >= 1024 * 1024) {
            traficSize = traficSize / 1024;
            traficName = "MB";
        }

        return `${Math.round(traficSize)} ${traficName}`
    }

  return (
    <Box className={`${bg} ${rounded} p-3 flex items-center gap-2`}>
      <Paper
        elevation={3}
        sx={{ p: 1, display: "inline-block", borderRadius: "100%" }}
      >
        <a href={file?.dataUrl} download={file?.name}>
          <InsertDriveFileIcon sx={{ width: "35px", height: "35px" }} />
        </a>
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
        <h2>{file?.name}</h2>
        <h3>{convertToKb(file?.size)}</h3>
      </Box>
    </Box>
  );
}
