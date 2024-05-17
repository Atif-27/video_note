import VideoPlayer from "@/components/VideoPlayer";
import TimeStamp from "@/components/shared/TimeStamps";
import PlayerProvider from "@/context/PlayerContext";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <PlayerProvider>
        <VideoPlayer videoId="I3JQNq7Cbt0" />
        <TimeStamp timestamp={100}>10s</TimeStamp>
      </PlayerProvider>
    </main>
  );
}
