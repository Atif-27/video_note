"use client";
import { usePlayer } from "@/context/PlayerContext";
import React, { useRef, useEffect } from "react";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
}: VideoPlayerProps) => {
  const { playerRef } = usePlayer();
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <YouTube
        videoId={"I3JQNq7Cbt0"}
        opts={opts}
        onReady={(event) => {
          console.log("Loadded");
          playerRef.current = event.target;
        }}
      />
    </div>
  );
};

export default VideoPlayer;