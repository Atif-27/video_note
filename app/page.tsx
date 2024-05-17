import Notes from "@/components/Notes";
import VideoPlayer from "@/components/VideoPlayer";
import TimeStamp from "@/components/shared/TimeStamps";
import PlayerProvider from "@/context/PlayerContext";

export default function Home() {
  return (
    <main className=" min-h-screen bg-slate-100    mx-auto">
      <div className=" max-w-4xl mx-auto h-full pt-10">
        <PlayerProvider>
          <h1 className="text-4xl font-semibold">Video Player with Notes</h1>
          <VideoPlayer videoId="I3JQNq7Cbt0" />
          <TimeStamp timestamp={100}>10s</TimeStamp>
          <Notes videoId="I3JQNq7Cbt0" />
        </PlayerProvider>
      </div>
    </main>
  );
}
