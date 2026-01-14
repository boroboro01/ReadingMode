import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ContentContainer from "../components/layout/ContentContainer";
import HorizontalList from "../components/list/HorizontalList";
import VideoCard from "../components/card/VideoCard";
import Player from "../components/Player/Player";
import type { Video } from "../types/video";

const mockVideos = [
  {
    youtubeId: "Dx5qFachd3A",
    title: "어느 책이든 어울리는 잔잔한 재즈",
    author: "Quiet Jazz",
    duration: "1:12:40",
  },
  {
    youtubeId: "V1Pl8CzNzCw",
    title: "고풍스러운 도서관 분위기",
    author: "Library Sound",
    duration: "45:10",
  },
  {
    youtubeId: "5qap5aO4i9A",
    title: "백색소음과 함께 집중하기",
    author: "Focus Room",
    duration: "2:03:00",
  },
  {
    youtubeId: "DWcJFNfaw9c",
    title: "Rainy Night Jazz",
    author: "Night Jazz",
    duration: "3:10:22",
  },
  {
    youtubeId: "kgx4WGK0oNU",
    title: "Cozy Cafe Music",
    author: "Cafe Mood",
    duration: "58:44",
  },
  {
    youtubeId: "hHW1oY26kxQ",
    title: "Deep Focus Piano",
    author: "Piano Room",
    duration: "1:30:05",
  },
  {
    youtubeId: "lTRiuFIWV54",
    title: "Late Night Reading Ambience",
    author: "Reading Lab",
    duration: "2:45:18",
  },
  {
    youtubeId: "7NOSDKb0HlU",
    title: "Minimal Jazz for Work",
    author: "Work Jazz",
    duration: "1:05:12",
  },
  {
    youtubeId: "7NOSDKb0HlU",
    title: "Minimal Jazz for Work",
    author: "Work Jazz",
    duration: "1:05:12",
  },
  {
    youtubeId: "7NOSDKb0HlU",
    title: "Minimal Jazz for Work",
    author: "Work Jazz",
    duration: "1:05:12",
  },
];

function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleSelect = (v: {
    youtubeId: string;
    title: string;
    author: string;
    duration: string;
  }) => {
    const thumbnail = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
    setSelectedVideo({
      id: v.youtubeId,
      title: v.title,
      author: v.author,
      duration: v.duration,
      thumbnail,
    });
  };

  return (
    <MainLayout>
      <ContentContainer>
        <h1 className="page-title">어느 책이든 어울리는 잔잔한 재즈</h1>
      </ContentContainer>

      <div style={{ padding: "0 20px 32px" }}>
        <HorizontalList>
          {mockVideos.map((v) => (
            <VideoCard
              key={v.youtubeId}
              youtubeId={v.youtubeId}
              title={v.title}
              author={v.author}
              duration={v.duration}
              onSelect={() => handleSelect(v)}
            />
          ))}
        </HorizontalList>
      </div>

      {/* Player fixed to bottom; appears when `selectedVideo` is non-null */}
      <Player
        selectedVideo={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </MainLayout>
  );
}

export default Home;
