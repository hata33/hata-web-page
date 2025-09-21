"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface MusicState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
}

interface MusicControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
}

interface MusicContextType {
  state: MusicState;
  controls: MusicControls;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  hasUserInteracted: boolean;
  setHasUserInteracted: (interacted: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<MusicState>({
    isPlaying: false,
    volume: 0.3,
    isMuted: false,
    duration: 0,
    currentTime: 0,
  });
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setState((prev) => ({ ...prev, duration: audio.duration }));
    };

    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };

    const handleEnded = () => {
      // 循环播放
      audio.currentTime = 0;
      audio.play().catch(console.error);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // 设置初始音量
    audio.volume = state.volume;

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 音量变化处理
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = state.isMuted ? 0 : state.volume;
    }
  }, [state.volume, state.isMuted]);

  // 音频元素初始化
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      setState((prev) => ({
        ...prev,
        isPlaying: !audio.paused,
      }));
    }
  }, []);

  // 用户交互后尝试自动播放（仅在首次交互时播放）
  useEffect(() => {
    if (hasUserInteracted && audioRef.current && !state.isPlaying) {
      const audio = audioRef.current;
      // 检查是否是首次交互（音频从未播放过）
      if (audio.currentTime === 0) {
        audio.play().catch(console.error);
      }
    }
  }, [hasUserInteracted]);

  const controls: MusicControls = {
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    togglePlay: () => {
      if (state.isPlaying) {
        controls.pause();
      } else {
        controls.play();
      }
    },
    setVolume: (volume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      setState((prev) => ({
        ...prev,
        volume: clampedVolume,
        isMuted: clampedVolume === 0,
      }));
    },
    toggleMute: () => {
      setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    },
    seek: (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
  };

  return (
    <MusicContext.Provider
      value={{
        state,
        controls,
        audioRef,
        hasUserInteracted,
        setHasUserInteracted,
      }}
    >
      <audio ref={audioRef} src="/music/Rain.mp3" loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
