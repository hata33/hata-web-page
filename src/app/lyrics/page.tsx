"use client";

import { LyricsSheetMusic } from "@/components/music/LyricsSheetMusic";
import { BackButton } from "@/components/ui/BackButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/lib/language-context";

interface LyricLine {
  id: number;
  japanese: string;
  chinese?: string;
  chords?: {
    name: string;
    position: number;
  }[];
  notes?: string[];
  startTime?: number;
  duration?: number;
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

export default function LyricsPage() {
  const { t } = useLanguage();

  const songs: Song[] = [
    {
      id: 1,
      title: "ひまわりの約束",
      year: "2014",
      album: "ひまわりの約束",
      composer: "秦基博",
      lyricist: "秦基博",
      key: "C Major",
      tempo: 120,
      duration: "4:51",
      analysis: {
        theme: "友情、約束、希望",
        key: "C Major - 明るく希望に満ちた調性",
        tempo: "中程度のテンポで心に響く",
        background:
          "映画『STAND BY ME ドラえもん』主題歌として制作。友情と約束の大切さを歌う。",
        inspiration:
          "原作漫画の感動的なシーンからインスピレーションを得た。誰もが持っている大切な思い出をテーマに。",
        technique:
          "ピアノを主体としたメロディアスな楽曲。サビでの感情の盛り上がりが印象的。",
      },
      lyrics: [
        {
          id: 1,
          japanese: "出会った頃は すべてが新しくて",
          chinese: "相遇的时候 一切都是崭新的",
          chords: [
            { name: "C", position: 0 },
            { name: "G", position: 8 },
          ],
          notes: ["C", "D", "E", "G", "A", "G", "E", "D", "C"],
          startTime: 0,
          duration: 5,
        },
        {
          id: 2,
          japanese: "小さなことでも 楽しかったよ",
          chinese: "即使是小事 也很快乐呢",
          chords: [
            { name: "Am", position: 0 },
            { name: "F", position: 6 },
            { name: "C", position: 12 },
          ],
          notes: ["A", "C", "E", "F", "A", "G", "E", "D", "C"],
          startTime: 5,
          duration: 5,
        },
        {
          id: 3,
          japanese: "君と笑い合った あの日々は",
          chinese: "与你一同欢笑的那些日子",
          chords: [
            { name: "F", position: 0 },
            { name: "G", position: 4 },
            { name: "C", position: 8 },
          ],
          notes: ["F", "A", "C", "G", "B", "D", "G", "E", "C"],
          startTime: 10,
          duration: 5,
        },
        {
          id: 4,
          japanese: "宝物みたいに 輝いてた",
          chinese: "像宝物一样闪耀着光芒",
          chords: [
            { name: "Am", position: 0 },
            { name: "F", position: 6 },
            { name: "G", position: 12 },
            { name: "C", position: 16 },
          ],
          notes: ["A", "C", "E", "F", "A", "G", "B", "D", "C"],
          startTime: 15,
          duration: 6,
        },
        {
          id: 5,
          japanese: "季節は流れて 君は遠くへ",
          chinese: "季节流逝 你去向远方",
          chords: [
            { name: "Dm", position: 0 },
            { name: "G", position: 8 },
            { name: "C", position: 16 },
          ],
          notes: ["D", "F", "A", "G", "B", "D", "G", "E", "C"],
          startTime: 21,
          duration: 5,
        },
        {
          id: 6,
          japanese: "でも心の中では 変わらない",
          chinese: "但在心中 永远不会改变",
          chords: [
            { name: "Am", position: 0 },
            { name: "Em", position: 6 },
            { name: "F", position: 12 },
            { name: "C", position: 16 },
          ],
          notes: ["A", "C", "E", "E", "G", "B", "F", "A", "C"],
          startTime: 26,
          duration: 5,
        },
        {
          id: 7,
          japanese: "あの約束を 今でも覚えてる",
          chinese: "那个约定 直到现在还记得",
          chords: [
            { name: "F", position: 0 },
            { name: "C", position: 8 },
            { name: "G", position: 16 },
          ],
          notes: ["F", "A", "C", "C", "E", "G", "G", "B", "D"],
          startTime: 31,
          duration: 6,
        },
        {
          id: 8,
          japanese: "ひまわりのように いつでも向いてる",
          chinese: "像向日葵一样 无论何时都面向着你",
          chords: [
            { name: "Am", position: 0 },
            { name: "F", position: 8 },
            { name: "C", position: 16 },
            { name: "G", position: 20 },
          ],
          notes: ["A", "C", "E", "F", "A", "C", "E", "G", "B"],
          startTime: 37,
          duration: 6,
        },
        {
          id: 9,
          japanese: "太陽が昇る 空を見上げて",
          chinese: "仰望太阳升起的天空",
          chords: [
            { name: "C", position: 0 },
            { name: "G", position: 6 },
            { name: "Am", position: 12 },
            { name: "F", position: 16 },
          ],
          notes: ["C", "E", "G", "G", "B", "D", "A", "C", "E", "F", "A", "C"],
          startTime: 43,
          duration: 5,
        },
        {
          id: 10,
          japanese: "君との思い出 胸に抱いて",
          chinese: "将与你的回忆 拥抱在胸前",
          chords: [
            { name: "F", position: 0 },
            { name: "C", position: 8 },
            { name: "Dm", position: 12 },
            { name: "G", position: 16 },
          ],
          notes: ["F", "A", "C", "C", "E", "G", "D", "F", "A", "G", "B", "D"],
          startTime: 48,
          duration: 6,
        },
      ],
    },
    {
      id: 2,
      title: "Rain",
      year: "2010",
      album: "Documentary",
      composer: "秦基博",
      lyricist: "秦基博",
      key: "G Major",
      tempo: 85,
      duration: "4:32",
      analysis: {
        theme: "雨、別れ、思い出",
        key: "G Major - 哀愁を帯びた温かい調性",
        tempo: "遅めのテンポで内省的な雰囲気",
        background:
          "雨の日に別れを思う気持ちを歌ったバラード。心地よい雨音が印象的な楽曲。",
        inspiration:
          "実際の経験から。雨の日に窓の外を見ながら、過ぎ去った恋愛を思い出したことがきっかけ。",
        technique:
          "ピアノとストリングスを主体としたバラード。雨音を効果音として使用し、情景を鮮明に描写。",
      },
      lyrics: [
        {
          id: 1,
          japanese: "窓の外 雨が降ってる",
          chinese: "窗外 下着雨",
          chords: [
            { name: "G", position: 0 },
            { name: "D", position: 6 },
          ],
          notes: ["G", "B", "D", "D", "F#", "A", "G"],
          startTime: 0,
          duration: 4,
        },
        {
          id: 2,
          japanese: "君のことを 思い出す",
          chinese: "想起了你",
          chords: [
            { name: "Em", position: 0 },
            { name: "C", position: 4 },
            { name: "D", position: 8 },
          ],
          notes: ["E", "G", "B", "C", "E", "G", "D", "F#", "A"],
          startTime: 4,
          duration: 4,
        },
        {
          id: 3,
          japanese: "降りしきる 雨の音に",
          chinese: "在不断的雨声中",
          chords: [
            { name: "C", position: 0 },
            { name: "G", position: 4 },
            { name: "D", position: 8 },
          ],
          notes: ["C", "E", "G", "G", "B", "D", "D", "F#", "A"],
          startTime: 8,
          duration: 4,
        },
        {
          id: 4,
          japanese: "消えない想い 揺れてる",
          chinese: "无法消失的思念 摇曳着",
          chords: [
            { name: "Em", position: 0 },
            { name: "Bm", position: 4 },
            { name: "C", position: 8 },
            { name: "D", position: 12 },
          ],
          notes: ["E", "G", "B", "B", "D", "F#", "C", "E", "G", "D", "F#", "A"],
          startTime: 12,
          duration: 5,
        },
      ],
    },
    {
      id: 3,
      title: "青い栞",
      year: "2012",
      album: "Documentary",
      composer: "秦基博",
      lyricist: "秦基博",
      key: "D Major",
      tempo: 92,
      duration: "4:08",
      analysis: {
        theme: "青春、青い春、別れ",
        key: "D Major - 明るく爽やかな調性",
        tempo: "軽快なテンポで青春の疾走感を表現",
        background:
          "青春時代の思い出と別れをテーマにした楽曲。青い春の象徴として「青い栞」を使用。",
        inspiration:
          "高校時代の思い出。卒業アルバムをめくった時に見つかった青い栞からインスピレーションを得た。",
        technique:
          "アコースティックギターを主体とした爽やかな楽曲。サビでのメロディの跳ね上がりが特徴的。",
      },
      lyrics: [
        {
          id: 1,
          japanese: "青い栞が 教科書に挟まってた",
          chinese: "蓝色书签 夹在教科书中",
          chords: [
            { name: "D", position: 0 },
            { name: "A", position: 8 },
          ],
          notes: ["D", "F#", "A", "A", "C#", "E", "D"],
          startTime: 0,
          duration: 4,
        },
        {
          id: 2,
          japanese: "あの日の君 笑顔を思い出す",
          chinese: "想起那天的你的笑容",
          chords: [
            { name: "Bm", position: 0 },
            { name: "G", position: 6 },
            { name: "D", position: 12 },
          ],
          notes: ["B", "D", "F#", "G", "B", "D", "D", "F#", "A"],
          startTime: 4,
          duration: 4,
        },
        {
          id: 3,
          japanese: "教室の窓 開け放って",
          chinese: "敞开教室的窗户",
          chords: [
            { name: "G", position: 0 },
            { name: "D", position: 6 },
            { name: "A", position: 10 },
          ],
          notes: ["G", "B", "D", "D", "F#", "A", "A", "C#", "E"],
          startTime: 8,
          duration: 3,
        },
        {
          id: 4,
          japanese: "風が吹き抜けてく",
          chinese: "风儿吹过",
          chords: [
            { name: "D", position: 0 },
            { name: "Bm", position: 4 },
            { name: "G", position: 8 },
            { name: "A", position: 12 },
          ],
          notes: [
            "D",
            "F#",
            "A",
            "B",
            "D",
            "F#",
            "G",
            "B",
            "D",
            "A",
            "C#",
            "E",
          ],
          startTime: 11,
          duration: 4,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* 顶部栏 */}
        <div className="flex justify-between items-center mb-8">
          {/* 返回按钮 */}
          <BackButton />

          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            歌詞 & 簡譜
          </h1>

          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            秦基博の楽曲の歌詞と簡譜をご紹介。創作背景や音楽の技法も深く解説します。
          </p>

          {/* 歌词简谱展示组件 */}
          <div className="py-8">
            <LyricsSheetMusic songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
}
