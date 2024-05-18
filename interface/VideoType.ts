// This file contains the interface for the video type.
export interface VideoInfo {
  id: { videoId: string };
  snippet: {
    channelTitle: string;
    title: string;
    thumbnails: {
      medium: { url: string };
    };
  };
  statistics?: {
    viewCount: number;
  };
}
