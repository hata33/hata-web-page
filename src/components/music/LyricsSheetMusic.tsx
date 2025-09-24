"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Guitar,
  Heart,
  Music,
  Pause,
  Play,
  Share2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Chord {
  name: string;
  position: number; // 在歌词中的位置
  frets?: number[]; // 吉他指法
}

interface LyricLine {
  id: number;
  japanese: string;
  chinese?: string;
  chords?: Chord[];
  notes?: string[]; // 简谱音符
  startTime?: number; // 歌词开始时间（秒）
  duration?: number; // 歌词持续时间（秒）
}

interface SongAnalysis {
  theme: string;
  key: string;
  tempo: string;
  background: string;
  inspiration: string;
  technique: string;
}

interface Song {
  id: number;
  title: string;
  year: string;
  album: string;
  composer: string;
  lyricist: string;
  key: string;
  tempo: number;
  duration: string;
  lyrics: LyricLine[];
  analysis: SongAnalysis;
  youtubeUrl?: string;
}

interface LyricsSheetMusicProps {
  songs: Song[];
  className?: string;
}

export function LyricsSheetMusic({
  songs,
  className = "",
}: LyricsSheetMusicProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showChords, setShowChords] = useState(true);
  const [showSheet, setShowSheet] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentSongIndex];

  // 查找当前播放的歌词行
  const getCurrentLyricLine = () => {
    if (!isPlaying) return -1;

    return currentSong.lyrics.findIndex(
      (line) =>
        line.startTime &&
        currentTime >= line.startTime &&
        (!line.duration || currentTime <= line.startTime + line.duration),
    );
  };

  const currentLineIndex = getCurrentLyricLine();

  // 模拟播放进度
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= parseFloat(currentSong.duration)) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = (songId: number) => {
    setFavorites((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId],
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getNoteColor = (note: string) => {
    const noteColors: Record<string, string> = {
      C: "text-red-500",
      D: "text-orange-500",
      E: "text-yellow-500",
      F: "text-green-500",
      G: "text-blue-500",
      A: "text-indigo-500",
      B: "text-purple-500",
    };
    return noteColors[note] || "text-gray-600";
  };

  const getChordDiagram = (chord: Chord) => {
    // 简化的和弦图显示
    return (
      <div className="inline-block mx-1 text-xs bg-gray-100 px-1 py-0.5 rounded border">
        {chord.name}
      </div>
    );
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* 歌曲选择器 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {songs.map((song, index) => (
            <button
              key={song.id}
              onClick={() => {
                setCurrentSongIndex(index);
                setCurrentTime(0);
                setIsPlaying(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentSongIndex === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {song.title}
            </button>
          ))}
        </div>
      </div>

      {/* 当前歌曲信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {currentSong.title}
            </h2>
            <div className="text-gray-600 space-y-1">
              <p>
                专辑：{currentSong.album} ({currentSong.year})
              </p>
              <p>
                作曲：{currentSong.composer} | 作词：{currentSong.lyricist}
              </p>
              <p>
                调性：{currentSong.key} | 节拍：{currentSong.tempo} BPM
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(currentSong.id)}
              className={`p-2 rounded-full transition-colors ${
                favorites.includes(currentSong.id)
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${favorites.includes(currentSong.id) ? "fill-current" : ""}`}
              />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 功能切换按钮 */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
              showAnalysis
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            创作背景
          </button>
          <button
            onClick={() => setShowChords(!showChords)}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
              showChords
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Guitar className="w-4 h-4" />
            和弦
          </button>
          <button
            onClick={() => setShowSheet(!showSheet)}
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${
              showSheet
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Music className="w-4 h-4" />
            简谱
          </button>
        </div>

        {/* 播放控制 */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={togglePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{formatTime(currentTime)}</span>
              <span>{currentSong.duration}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(currentTime / parseFloat(currentSong.duration)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* 创作背景 */}
        <AnimatePresence>
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-4 mt-4"
            >
              <h3 className="font-bold text-gray-800 mb-3">创作背景分析</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-700">主题：</p>
                  <p className="text-gray-600">{currentSong.analysis.theme}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">创作灵感：</p>
                  <p className="text-gray-600">
                    {currentSong.analysis.inspiration}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">音乐技巧：</p>
                  <p className="text-gray-600">
                    {currentSong.analysis.technique}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">背景故事：</p>
                  <p className="text-gray-600">
                    {currentSong.analysis.background}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 歌词和简谱显示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">歌词 & 简谱</h3>

        <div className="space-y-6">
          {currentSong.lyrics.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                backgroundColor:
                  currentLineIndex === index
                    ? "rgba(59, 130, 246, 0.1)"
                    : "transparent",
              }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg transition-colors ${
                currentLineIndex === index
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* 简谱显示 */}
              {showSheet && line.notes && (
                <div className="mb-2 text-center">
                  {line.notes.map((note, noteIndex) => (
                    <span
                      key={noteIndex}
                      className={`inline-block mx-1 font-mono text-lg ${getNoteColor(note)}`}
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}

              {/* 和弦标记 */}
              {showChords && line.chords && (
                <div className="mb-2 min-h-[1.5rem]">
                  {line.chords.map((chord, chordIndex) => (
                    <span
                      key={chordIndex}
                      className="inline-block mx-1"
                      style={{
                        marginLeft:
                          chordIndex === 0
                            ? `${chord.position * 0.5}rem`
                            : "0.25rem",
                      }}
                    >
                      {getChordDiagram(chord)}
                    </span>
                  ))}
                </div>
              )}

              {/* 日语歌词 */}
              <div className="text-lg text-gray-800 leading-relaxed">
                {line.japanese}
              </div>

              {/* 中文翻译 */}
              {line.chinese && (
                <div className="text-gray-600 mt-1 leading-relaxed">
                  {line.chinese}
                </div>
              )}

              {/* 时间标记 */}
              {line.startTime && (
                <div className="text-xs text-gray-400 mt-1">
                  {formatTime(line.startTime)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
