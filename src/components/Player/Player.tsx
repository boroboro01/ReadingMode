import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import type { YouTubeProps } from "react-youtube";
import "../../styles/player.css";
import type { Video } from "../../types/video";

type Props = {
  selectedVideo: Video | null;
  onClose?: () => void; // optional: parent may clear selection
};

const Player: React.FC<Props> = ({ selectedVideo, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);
  const playerRef = useRef<any>(null);

  // Spacebar toggles play/pause when a video is selected and no input is focused
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      ) {
        return; // ignore when typing in inputs
      }
      if (!selectedVideo) return;
      e.preventDefault();
      if (!playerRef.current) {
        // expand player and request play
        setPendingPlay(true);
        setIsExpanded(true);
        return;
      }
      if (isPlaying) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedVideo, isPlaying]);

  // When a new video is selected, show the mini view (not expanded)
  useEffect(() => {
    if (selectedVideo) {
      // 1. 영상이 바뀌면 미니 플레이어 상태는 유지하되
      // 2. 새로운 영상이 왔으므로 바로 재생되게끔 pendingPlay를 true로 설정
      setPendingPlay(true);

      // playerRef가 이미 있다면 바로 playVideo를 시도합니다.
      if (playerRef.current && playerRef.current.loadVideoById) {
        playerRef.current.loadVideoById(selectedVideo.id);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  }, [selectedVideo]);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
    if (pendingPlay && playerRef.current && playerRef.current.playVideo) {
      try {
        // attempt to play (autoplay may be allowed depending on browser/user gesture)
        try {
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch (e) {
          // noop
        }
      } catch (e) {
        // noop
      }
      setPendingPlay(false);
    }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const state = event.data;
    if (state === 1) setIsPlaying(true); // playing
    if (state === 2 || state === 0) setIsPlaying(false); // paused or ended
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) {
      // Player not mounted yet: expand and request play when ready
      setPendingPlay(true);
      setIsExpanded(true);
      return;
    }
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  if (!selectedVideo) {
    // render invisible container to allow CSS to hide/show consistently
    return <div className="player-container hidden" />;
  }

  return (
    <div
      className={`player-container visible ${isExpanded ? "expanded" : "mini"}`}
      onClick={() => {
        if (!isExpanded) setIsExpanded(true);
      }}
    >
      {/* Mini bar (always rendered; visually visible when translated up) */}
      <div
        className="mini-bar"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded((prev) => !prev);
        }}
      >
        <img src={selectedVideo.thumbnail} alt="thumb" className="thumb" />
        <div className="meta">
          <div className="title">{selectedVideo.title}</div>
          <div className="author">{selectedVideo.author}</div>
        </div>
        <button
          className="play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>

      {/* Expanded full player content */}
      <div className="player-full" onClick={(e) => e.stopPropagation()}>
        {/* top handle: visual area only (does not collapse) */}
        <div className="collapse-handle" aria-hidden />

        <div className="player-header">
          <div className="video-info">
            <h3 className="full-title">{selectedVideo.title}</h3>
            <div className="full-sub">
              {selectedVideo.author} • {selectedVideo.duration}
            </div>
          </div>
          <div style={{ marginLeft: "auto" }} />
        </div>

        <div className="youtube-wrapper">
          <YouTube
            videoId={selectedVideo.id}
            opts={{
              width: "100%",
              height: "60vh",
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
