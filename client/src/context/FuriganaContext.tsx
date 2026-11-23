import React, { createContext, useContext, useState, useEffect } from 'react';

// Comprehensive dictionary mapping kanji compounds and characters to hiragana readings
export const GLOBAL_FURIGANA_MAP: Record<string, string> = {
  // Common syllabus & exam terminology
  '文法': 'ぶんぽう',
  '演習': 'えんしゅう',
  '助詞': 'じょし',
  '基本': 'きほん',
  '文型': 'ぶんけい',
  '読解': 'どっかい',
  '実戦': 'じっせん',
  '生活': 'せいかつ',
  '通知': 'つうち',
  '案内': 'あんない',
  '聴解': 'ちょうかい',
  '課題': 'かだい',
  '理解': 'りかい',
  '対話': 'たいわ',
  '言語': 'げんご',
  '知識': 'ちしき',
  '文字': 'もじ',
  '語彙': 'ごい',
  '漢字': 'かんじ',
  '平仮名': 'ひらがな',
  '片仮名': 'かたかな',
  '可能': 'かのう',
  '表現': 'ひょうげん',
  '授受': 'じゅじゅ',
  '動詞': 'どうし',
  '形容詞': 'けいようし',
  '資源': 'しげん',
  '分別': 'ぶんべつ',
  '規則': 'きそく',
  '発表': 'はっぴょう',
  '準備': 'じゅんび',
  '指示': 'しじ',
  '設問': 'せつもん',
  '対比': 'たいひ',
  '論説': 'ろんせつ',
  '日程': 'にってい',
  '調整': 'ちょうせい',
  '交渉': 'こうしょう',
  '高次': 'こうじ',
  '論述': 'ろんじゅつ',
  '暗黙知': 'あんもくち',
  '刷新': 'さっしん',
  '論争': 'ろんそう',
  '極限': 'きょくげん',
  '評価': 'ひょうか',
  '決定論': 'けっていろん',
  '相対性': 'そうたいせい',
  '倫理': 'りんり',
  '語順': 'ごじゅん',
  '問題': 'もんだい',
  '質問': 'しつもん',
  '解答': 'かいとう',
  '選択': 'せんたく',
  '正解': 'せいかい',
  '間違い': 'まちがい',
  '留学生': 'りゅうがくせい',
  '交流': 'こうりゅう',
  'お茶会': 'おちゃかい',
  '映画': 'えいが',
  '鑑賞': 'かんしょう',
  '約束': 'やくそく',
  '時間': 'じかん',
  '場所': 'ばしょ',
  '特定': 'とくてい',
  '会社': 'かいしゃ',
  '仕事': 'しごと',
  '勉強': 'べんきょう',
  '学校': 'がっこう',
  '先生': 'せんせい',
  '学生': 'がくせい',
  '毎日': 'まいにち',
  '朝': 'あさ',
  '夜': 'よる',
  '昼': 'ひる',
  '今日': 'きょう',
  '明日': 'あした',
  '昨日': 'きのう',
  '日本': 'にほん',
  '日本人': 'にほんじん',
  '私': 'わたし',
  '友達': 'ともだち',
  '家族': 'かぞく',
  '食事': 'しょくじ',
  'ご飯': 'ごはん',
  '朝食': 'ちょうしょく',
  '夕食': 'ゆうしょく',
  '昼食': 'ちゅうしょく',
  '作文': 'さくぶん',
  '短文': 'たんぶん',
  '長文': 'ちょうぶん',
  '論文': 'ろんぶん',
  '基準': 'きじゅん',
  '採点': 'さいてん',
  '範囲': 'はんい',
  '正確': 'せいかく',
  '構成': 'こうせい',
  '練習': 'れんしゅう',
  '復習': 'ふくしゅう',
  '予習': 'よしゅう',
  '初級': 'しょきゅう',
  '中級': 'ちゅうきゅう',
  '上級': 'じょうきゅう',
  '合格': 'ごうかく',
  '点数': 'てんすう',
  '目標': 'もくひょう',
  '達成': 'たっせい',
  '継続': 'けいぞく',
  '習慣': 'しゅうかん',
  '加速': 'かそく',
  '記憶': 'きおく',
  '部首': 'ぶしゅ',
  '画数': 'かくすう',
  '書道': 'しょどう',
  '単語': 'たんご',
  '熟語': 'じゅくご',
  '例文': 'れいぶん',
  '参加': 'さんか',
  '費用': 'ひよう',
  '無料': 'むりょう',
  '開催': 'かいさい',
  '受付': 'うけつけ',
  '連絡': 'れんらく',
  '電話': 'でんわ',
  '教室': 'きょうしつ',
  '部屋': 'へや',
  '図書館': 'としょかん',
  '病院': 'びょういん',
  '駅': 'えき',
  '電車': 'でんしゃ',
  '車': 'くるま',
  '天気': 'てんき',
  '水': 'みず',
  '木': 'き',
  '山': 'やま',
  '川': 'かわ',
  '食べる': 'たべる',
  '飲む': 'のむ',
  '行く': 'いく',
  '来る': 'くる',
  '見る': 'みる',
  '聞く': 'きく',
  '書く': 'かく',
  '読む': 'よむ',
  '話す': 'はなす',
  '買う': 'かう'
};

const SORTED_KEYS = Object.keys(GLOBAL_FURIGANA_MAP).sort((a, b) => b.length - a.length);
const GLOBAL_FURIGANA_REGEX = new RegExp(`(${SORTED_KEYS.join('|')})`, 'g');

interface FuriganaContextType {
  furiganaEnabled: boolean;
  toggleFurigana: () => void;
  renderFurigana: (text: string) => React.ReactNode;
}

const FuriganaContext = createContext<FuriganaContextType | undefined>(undefined);

export const FuriganaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [furiganaEnabled, setFuriganaEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('lingua_furigana_enabled');
    return saved !== null ? saved === 'true' : true; // Default ON for accessibility
  });

  useEffect(() => {
    localStorage.setItem('lingua_furigana_enabled', String(furiganaEnabled));
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-furigana', furiganaEnabled ? 'on' : 'off');
    }
  }, [furiganaEnabled]);

  const toggleFurigana = () => {
    setFuriganaEnabled(prev => !prev);
  };

  const renderFurigana = (text: string): React.ReactNode => {
    if (!furiganaEnabled || !text || typeof text !== 'string') {
      return text;
    }

    const parts = text.split(GLOBAL_FURIGANA_REGEX);
    return parts.map((part, idx) => {
      const reading = GLOBAL_FURIGANA_MAP[part];
      if (reading) {
        return (
          <span
            key={idx}
            className="inline-flex flex-col items-center justify-center align-middle mx-[1.5px] leading-none group/furi"
          >
            <span className="leading-tight font-jp text-inherit">{part}</span>
            <span className="text-[9px] text-vermilion-600 dark:text-vermilion-400 font-jp font-semibold tracking-tighter leading-none mt-0.5 select-none animate-fadeIn">
              {reading}
            </span>
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <FuriganaContext.Provider value={{ furiganaEnabled, toggleFurigana, renderFurigana }}>
      {children}
    </FuriganaContext.Provider>
  );
};

export const useFurigana = (): FuriganaContextType => {
  const context = useContext(FuriganaContext);
  if (!context) {
    // Graceful fallback
    return {
      furiganaEnabled: false,
      toggleFurigana: () => {},
      renderFurigana: (text: string) => text
    };
  }
  return context;
};

// Convenient RubyText component
export const RubyText: React.FC<{ text: string }> = ({ text }) => {
  const { renderFurigana } = useFurigana();
  return <>{renderFurigana(text)}</>;
};
