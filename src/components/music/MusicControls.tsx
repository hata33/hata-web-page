"use client";

import React from "react";
import { useMusic } from "@/lib/music-context";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function MusicControls() {
  const { state, controls, hasUserInteracted } = useMusic();

  // 处理播放/暂停
  const handleTogglePlay = () => {
    controls.togglePlay();
  };

  // 处理静音切换
  const handleToggleMute = () => {
    controls.toggleMute();
  };

  // 处理音量变化
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    controls.setVolume(parseFloat(e.target.value));
  };

  // 如果用户还没有交互，显示提示
  if (!hasUserInteracted) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white z-50">
        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-blue-400" />
          <div className="text-sm">
            <p className="font-medium">点击任意位置启用背景音乐</p>
            <p className="text-gray-400 text-xs mt-1">
              Background Music: Rain.mp3
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 z-50">
      <div className="flex items-center space-x-3">
        {/* 播放/暂停按钮 */}
        <button
          onClick={handleTogglePlay}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label={state.isPlaying ? "暂停" : "播放"}
        >
          {state.isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white" />
          )}
        </button>

        {/* 音量控制 */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleMute}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label={state.isMuted ? "取消静音" : "静音"}
          >
            {state.isMuted || state.volume === 0 ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={state.isMuted ? 0 : state.volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            aria-label="音量控制"
          />
        </div>

        {/* 音乐信息 */}
        <div className="text-xs text-gray-400 border-l border-gray-600 pl-2">
          <p className="truncate max-w-32">Rain</p>
        </div>
      </div>
    </div>
  );
}
