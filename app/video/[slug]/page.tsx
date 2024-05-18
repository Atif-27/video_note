import Notes from "@/components/Notes";
import VideoPlayer from "@/components/VideoPlayer";
import PlayerProvider from "@/context/PlayerContext";
import console from "console";

async function fetchVideoDetails(videoId: string) {
  const data = await fetch(process.env.NEXT_PUBLIC_ID_API + videoId);
  const res = await data.json();
  return res;
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const videoDetails = await fetchVideoDetails(slug);
  console.log(videoDetails);
  const data = videoDetails.items[0];

  return (
    <main className=" min-h-screen bg-slate-100    mx-auto">
      <div className=" max-w-4xl mx-auto h-full pt-10 ">
        <PlayerProvider>
          <h1 className="text-4xl max-md:text-3xl max-sm:text-xl max-md:text-center w-full font-semibold">
            Video Player with Note
          </h1>
          <VideoPlayer videoId={slug} />
          <section className="my-4 mb-8 max-md:px-3">
            <div className="text-2xl max-md:text-lg font-semibold">
              {data?.snippet?.title}
            </div>
            <p className="text-sm ">{data.snippet.description}</p>
          </section>
          <Notes videoId={slug} />
        </PlayerProvider>
      </div>
    </main>
  );
}
