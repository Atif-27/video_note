import React from "react";
import Image from "next/image";
import { VideoInfo } from "@/interface/VideoType";

const VideoCard = ({ info }: { info: VideoInfo }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 shadow-lg max-w-xs cursor-pointer h-full ">
      <Image
        className="rounded-lg w-full"
        alt="thumbnail"
        src={thumbnails.medium.url}
        width={400}
        height={400}
      />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        {statistics ? <li>{statistics.viewCount} views</li> : ""}
      </ul>
    </div>
  );
};

export default VideoCard;
