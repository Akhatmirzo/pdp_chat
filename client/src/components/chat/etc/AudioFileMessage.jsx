import { Box, Paper } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";

export default function AudioFileMessage({ bg, file }) {
  const audioRef = useRef();
  const [isPlay, setIsPlay] = useState(false);

  const playAudio = () => {
    setIsPlay(true);
    audioRef?.current.play();
  };

  const pauseAudio = () => {
    setIsPlay(false);
    audioRef?.current.pause();
  };

  return (
    <Box className={`${bg} rounded-md p-3 flex items-center gap-2`}>
      <Paper
        elevation={3}
        sx={{
          p: 1,
          display: "inline-block",
          borderRadius: "100%",
          cursor: "pointer",
        }}
      >
        {isPlay ? (
          <PauseIcon
            sx={{ width: "35px", height: "35px" }}
            onClick={() => pauseAudio()}
          />
        ) : (
          <PlayArrowIcon
            sx={{ width: "35px", height: "35px" }}
            onClick={() => playAudio()}
          />
        )}
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
        <audio src={file.dataUrl} ref={audioRef}></audio>
      </Box>
    </Box>
  );
}
