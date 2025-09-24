"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Track {
  id: number;
  title: string;
  duration: string;
}

interface Album {
  id: number;
  title: string;
  year: string;
  coverImage?: string;
  tracks: Track[];
  description?: string;
  label?: string;
}

interface AlbumTimelineProps {
  albums: Album[];
  className?: string;
}

export function AlbumTimeline({ albums, className = "" }: AlbumTimelineProps) {
  const [expandedAlbum, setExpandedAlbum] = useState<number | null>(null);

  // 按年份分组专辑
  const albumsByYear = albums.reduce(
    (acc, album) => {
      const year = album.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(album);
      return acc;
    },
    {} as Record<string, Album[]>,
  );

  // 获取所有年份并排序
  const years = Object.keys(albumsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  const toggleAlbum = (albumId: number) => {
    setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* 时间线 */}
      <div className="relative">
        {/* 中央时间线 */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 transform md:-translate-x-0.5"></div>

        {years.map((year, yearIndex) => (
          <div key={year} className="mb-12">
            {/* 年份标题 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: yearIndex * 0.1 }}
              className="flex items-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                {year.slice(-2)}
              </div>
              <h2 className="ml-4 text-2xl md:text-3xl font-bold text-gray-800">
                {year}年
              </h2>
            </motion.div>

            {/* 该年份的专辑 */}
            {albumsByYear[year].map((album, albumIndex) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIndex * 0.1 + albumIndex * 0.1 }}
                className={`relative flex items-start mb-8 ${
                  albumIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 时间线节点 */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full transform md:-translate-x-2 z-10"></div>

                {/* 专辑卡片 */}
                <div
                  className={`w-full md:w-5/12 ${albumIndex % 2 === 0 ? "md:pr-8" : "md:pl-8 ml-16 md:ml-0"}`}
                >
                  <motion.div
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleAlbum(album.id)}
                  >
                    {/* 专辑封面 */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
                      {album.coverImage ? (
                        <img
                          src={album.coverImage}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="text-6xl mb-2">🎵</div>
                            <p className="text-lg font-medium">{album.title}</p>
                          </div>
                        </div>
                      )}

                      {/* 年份标签 */}
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {album.year}
                      </div>
                    </div>

                    {/* 专辑信息 */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {album.title}
                          </h3>
                          {album.label && (
                            <p className="text-sm text-gray-500">
                              {album.label}
                            </p>
                          )}
                        </div>

                        {/* 展开/收起按钮 */}
                        <motion.div
                          animate={{
                            rotate: expandedAlbum === album.id ? 180 : 0,
                          }}
                          className="text-gray-400"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      </div>

                      {album.description && (
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                          {album.description}
                        </p>
                      )}

                      {/* 曲目列表 */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedAlbum === album.id ? "auto" : 0,
                          opacity: expandedAlbum === album.id ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-800 mb-3">
                            曲目列表 ({album.tracks.length}首)
                          </h4>
                          <div className="space-y-2">
                            {album.tracks.map((track, trackIndex) => (
                              <div
                                key={track.id}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-500 w-6">
                                    {trackIndex + 1}
                                  </span>
                                  <span className="text-sm text-gray-700 ml-3">
                                    {track.title}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {track.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
