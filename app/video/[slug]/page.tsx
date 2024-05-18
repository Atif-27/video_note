import Notes from "@/components/Notes";
import VideoPlayer from "@/components/VideoPlayer";
import PlayerProvider from "@/context/PlayerContext";

export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  return (
    <main className=" min-h-screen bg-slate-100    mx-auto">
      <div className=" max-w-4xl mx-auto h-full pt-10 ">
        <PlayerProvider>
          <h1 className="text-4xl max-md:text-3xl max-sm:text-xl max-md:text-center font-semibold">
            Video Player with Note
          </h1>
          <VideoPlayer videoId={slug} />
          <Notes videoId={slug} />
        </PlayerProvider>
      </div>
    </main>
  );
}
