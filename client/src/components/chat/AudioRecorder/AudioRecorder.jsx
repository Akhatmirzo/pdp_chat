import React, { useEffect, useRef, useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import "./style.css";
import { convertToBase64 } from "../../../utils/helper";
import { toast } from "react-toastify";

export default function AudioRecorder({ onTouched, setAudio }) {
  const audioRef = useRef();
  const visualizer = useRef();
  const [items] = useState([]);
  const [recorder, setRecorder] = useState(null);

  // Audio recording analyser
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  const recordering = (audio) => {
    if (audio) {
      let ctx = new window.AudioContext();
      let analyser = ctx.createAnalyser();
      let source = ctx.createMediaStreamSource(audio);

      source.connect(analyser);
      analyser.fftSize = 64;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      let elements = [];

      for (let i = 0; i < bufferLength; i++) {
        let element = document.createElement("span");
        element.classList.add("element");
        elements.push(element);
        visualizer?.current.appendChild(element);
      }

      let element = document.createElement("span");
      element.classList.add("element");
      visualizer?.current.appendChild(element);

      let update = () => {
        requestAnimationFrame(update);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
          let item = dataArray[i];
          elements[i].style.setProperty("--i", `${item}px`);
        }
      };

      update();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorderInstance = new MediaRecorder(stream);
      setRecorder(recorderInstance);

      if (onTouched) {
        recordering(stream);
      }

      recorderInstance.ondataavailable = async (e) => {
        let newData = [e.data];
        let blob = new Blob(newData, { type: "audio/webm" });
        if (blob.size > 5000) {
          let url = await convertToBase64(blob);
          let obj = {
            size: blob.size,
            type: blob.type,
            name: "audio",
            blob: [blob],
            dataUrl: url,
          };
          setAudio(obj);
          newData = [];
        } else {
          toast.warn(
            "Please hold the mouse button pressed to record voice message"
          );
          newData = [];
        }
      };

      recorderInstance.start();
    } catch (error) {
      console.error("MediaDevices error:", error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
    }
  };

  // Audio recorder
  useEffect(() => {
    if (onTouched) {
      startRecording();
    } else {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTouched]);

  return onTouched ? (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <audio
        className={`absolute -top-20 left-0 hidden`}
        src={items}
        controls
        ref={audioRef}
      ></audio>
      <div className="box">
        <div className="visualizer" ref={visualizer}></div>
      </div>
      <div className="play">
        <div className="btn btn-play">
          {onTouched ? (
            <StopIcon sx={{ width: "100px", fontSize: 150 }} />
          ) : (
            <KeyboardVoiceIcon sx={{ width: "100px", fontSize: 150 }} />
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
