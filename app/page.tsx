import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import { VideoInfo } from "@/interface/VideoType";

async function fetchSearchVideo() {
  const res = await fetch(process.env.NEXT_PUBLIC_API as string);
  const data = await res.json();
  return data.items;
}

export default async function Home() {
  const searchVideo = await fetchSearchVideo();

  return (
    <section className=" max-w-screen-2xl mx-auto w-full">
      <h1 className="text-4xl font-semibold my-6 max-md:text-center">
        MathonGo
      </h1>
      <div className="flex flex-wrap m-5 space-x-3 space-y-3 justify-center">
        {searchVideo &&
          searchVideo.map((video: VideoInfo) => (
            <Link href={`/video/${video.id.videoId}`} key={video.id.videoId}>
              <VideoCard info={video} />
            </Link>
          ))}
      </div>
    </section>
  );
}
