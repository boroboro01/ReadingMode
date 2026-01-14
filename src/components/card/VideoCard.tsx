import { useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
  author: string;
  duration: string;
};

function VideoCard({ youtubeId, title, author, duration }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <div className="video-card">
      {/* 썸네일 / 플레이어 */}
      <div
        className="video-thumbnail"
        role="button"
        tabIndex={0}
        onClick={() => setPlaying(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setPlaying(true);
        }}
      >
        {!playing ? (
          <>
            <img src={thumbnailUrl} alt={title} />
            <button className="video-play-btn" aria-label={`Play ${title}`}>
              ▶
            </button>
          </>
        ) : (
          <div className="video-iframe-wrapper">
            <iframe
              src={embedUrl}
              title={title}
              frameBorder={0}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* 메타 정보 */}
      <div className="video-meta">
        <span className="video-duration">{duration}</span>
        <div className="video-title">{title}</div>
        <div className="video-author">{author}</div>
      </div>
    </div>
  );
}

export default VideoCard;
