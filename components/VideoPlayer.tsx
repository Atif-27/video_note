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
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="my-7">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={(event) => {
          console.log("Video Loadded");
          playerRef.current = event.target;
        }}
        iframeClassName="w-full bg-black"
      />
    </div>
  );
};

export default VideoPlayer;
