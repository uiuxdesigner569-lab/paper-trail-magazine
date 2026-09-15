import { useEffect, useRef, useState } from "react";

export default function SoundtrackControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncPlayingState = () => setIsPlaying(!audio.paused);
    audio.addEventListener("play", syncPlayingState);
    audio.addEventListener("pause", syncPlayingState);
    audio.addEventListener("ended", syncPlayingState);

    return () => {
      audio.pause();
      audio.removeEventListener("play", syncPlayingState);
      audio.removeEventListener("pause", syncPlayingState);
      audio.removeEventListener("ended", syncPlayingState);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className={`soundtrack-control ${isPlaying ? "is-playing" : ""}`}>
      <audio ref={audioRef} src="/audio/paper-trail-playful-loop.mp3" loop preload="metadata" />
      <button type="button" className="soundtrack-button" onClick={togglePlayback} aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"} aria-pressed={isPlaying}>
        <span className="soundtrack-icon" aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        <span>{isPlaying ? "SOUND ON" : "PLAY SOUND"}</span>
      </button>
      <span className="soundtrack-bars" aria-hidden="true"><i /><i /><i /><i /></span>
    </div>
  );
}
