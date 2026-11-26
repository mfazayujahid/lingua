// Canonical Hitsujun Vector Specifications for 15 Anchor Kanji (N5-N1)
// [0, 1000]^2 Coordinate Space
import { StrokeDefinition } from '../../../shared/types';

export interface KanjiCharacterSeed {
  id: string;
  character: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  onYomi: string;
  kunYomi: string;
  englishGloss: string;
  radical: string;
  strokeCount: number;
  strokes: StrokeDefinition[];
}

export const KANJI_SEEDS: KanjiCharacterSeed[] = [
  {
    id: 'kanji_n5_ichi',
    character: '一',
    jlptLevel: 'N5',
    onYomi: 'イチ, イツ',
    kunYomi: 'ひと, ひと・つ',
    englishGloss: 'One, 1',
    radical: '一',
    strokeCount: 1,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 180,510 L 820,500',
        startPoint: [180, 510],
        endPoint: [820, 500],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Single bold horizontal stroke drawn firmly from left to right.'
      }
    ]
  },
  {
    id: 'kanji_n5_ni',
    character: '二',
    jlptLevel: 'N5',
    onYomi: 'ニ, ジ',
    kunYomi: 'ふた, ふた・つ',
    englishGloss: 'Two, 2',
    radical: '二',
    strokeCount: 2,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 280,380 L 720,370',
        startPoint: [280, 380],
        endPoint: [720, 370],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Top horizontal bar, shorter than base.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 180,680 L 820,670',
        startPoint: [180, 680],
        endPoint: [820, 670],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom horizontal baseline, wider foundation.'
      }
    ]
  },
  {
    id: 'kanji_n5_san',
    character: '三',
    jlptLevel: 'N5',
    onYomi: 'サン, ゾウ',
    kunYomi: 'み, み・つ, みっ・つ',
    englishGloss: 'Three, 3',
    radical: '一',
    strokeCount: 3,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 260,320 L 740,310',
        startPoint: [260, 320],
        endPoint: [740, 310],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Top horizontal bar of medium length.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 320,510 L 680,505',
        startPoint: [320, 510],
        endPoint: [680, 505],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Middle horizontal bar, shortest of the three.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 160,720 L 840,710',
        startPoint: [160, 720],
        endPoint: [840, 710],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom horizontal bar, longest base foundation.'
      }
    ]
  },
  {
    id: 'kanji_n5_yon',
    character: '四',
    jlptLevel: 'N5',
    onYomi: 'シ',
    kunYomi: 'よ, よ・つ, よっ・つ, よん',
    englishGloss: 'Four, 4',
    radical: '囗',
    strokeCount: 5,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 240,240 L 240,820',
        startPoint: [240, 240],
        endPoint: [240, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical upright boundary of enclosure.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 240,240 L 760,240 L 760,820',
        startPoint: [240, 240],
        endPoint: [760, 820],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, then Top to Bottom',
        pedagogicalRule: 'Top horizontal across, bending down right vertical frame.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 380,380 Q 360,560 300,680',
        startPoint: [380, 380],
        endPoint: [300, 680],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal curve',
        pedagogicalRule: 'Inner left curved branch.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 560,360 L 560,580 L 660,620',
        startPoint: [560, 360],
        endPoint: [660, 620],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom, bending slightly right',
        pedagogicalRule: 'Inner right stroke bending slightly.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 230,820 L 770,820',
        startPoint: [230, 820],
        endPoint: [770, 820],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom horizontal bar securely sealing the enclosure.'
      }
    ]
  },
  {
    id: 'kanji_n5_go',
    character: '五',
    jlptLevel: 'N5',
    onYomi: 'ゴ',
    kunYomi: 'いつ, いつ・つ',
    englishGloss: 'Five, 5',
    radical: '二',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 240,280 L 760,270',
        startPoint: [240, 280],
        endPoint: [760, 270],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Top horizontal crossbar.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 480,280 L 400,740',
        startPoint: [480, 280],
        endPoint: [400, 740],
        primaryAngleDeg: 100,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom-left slant',
        pedagogicalRule: 'Slanted central vertical stroke.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 400,510 L 680,510 L 680,740',
        startPoint: [400, 510],
        endPoint: [680, 740],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, then down',
        pedagogicalRule: 'Middle horizontal bending down right.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 200,750 L 800,740',
        startPoint: [200, 750],
        endPoint: [800, 740],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom stabilizing horizontal foundation bar.'
      }
    ]
  },
  {
    id: 'kanji_n5_roku',
    character: '六',
    jlptLevel: 'N5',
    onYomi: 'ロク, リク',
    kunYomi: 'む, む・つ, むっ・つ, むい',
    englishGloss: 'Six, 6',
    radical: '八',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,200 L 500,320',
        startPoint: [500, 200],
        endPoint: [500, 320],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Top central dot/dash.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 180,360 L 820,350',
        startPoint: [180, 360],
        endPoint: [820, 350],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Wide horizontal crossbar.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 420,480 Q 340,660 220,800',
        startPoint: [420, 480],
        endPoint: [220, 800],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal sweep',
        pedagogicalRule: 'Left diagonal sweep.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 580,480 Q 660,650 780,800',
        startPoint: [580, 480],
        endPoint: [780, 800],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right diagonal slant.'
      }
    ]
  },
  {
    id: 'kanji_n5_nana',
    character: '七',
    jlptLevel: 'N5',
    onYomi: 'シチ',
    kunYomi: 'なな, なな・つ, なの',
    englishGloss: 'Seven, 7',
    radical: '一',
    strokeCount: 2,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 200,520 L 800,460',
        startPoint: [200, 520],
        endPoint: [800, 460],
        primaryAngleDeg: 355,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right slightly rising',
        pedagogicalRule: 'Slightly rising horizontal crossbar.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 480,260 L 480,680 Q 480,760 620,760 L 720,740',
        startPoint: [480, 260],
        endPoint: [720, 740],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom bending right upward',
        pedagogicalRule: 'Vertical dropping down, bending smoothly right with slight upturn.'
      }
    ]
  },
  {
    id: 'kanji_n5_hachi',
    character: '八',
    jlptLevel: 'N5',
    onYomi: 'ハチ',
    kunYomi: 'や, や・つ, やっ・つ, よう',
    englishGloss: 'Eight, 8',
    radical: '八',
    strokeCount: 2,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 420,300 Q 340,550 240,780',
        startPoint: [420, 300],
        endPoint: [240, 780],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal sweep',
        pedagogicalRule: 'Left diagonal stroke sweeping down-left.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 560,240 Q 640,540 780,780',
        startPoint: [560, 240],
        endPoint: [780, 780],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right diagonal stroke starting higher and sweeping down-right.'
      }
    ]
  },
  {
    id: 'kanji_n5_kyuu',
    character: '九',
    jlptLevel: 'N5',
    onYomi: 'キュウ, ク',
    kunYomi: 'ここの, ここの・つ',
    englishGloss: 'Nine, 9',
    radical: '乙',
    strokeCount: 2,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 480,220 Q 420,520 280,820',
        startPoint: [480, 220],
        endPoint: [280, 820],
        primaryAngleDeg: 245,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal curve',
        pedagogicalRule: 'Left downward curve slicing diagonally.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 340,400 L 700,380 L 680,660 Q 680,780 580,780',
        startPoint: [340, 400],
        endPoint: [580, 780],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, bend down and hook left',
        pedagogicalRule: 'Horizontal cross bending down into hook.'
      }
    ]
  },
  {
    id: 'kanji_n5_juu',
    character: '十',
    jlptLevel: 'N5',
    onYomi: 'ジュウ, ジッ',
    kunYomi: 'とお, と',
    englishGloss: 'Ten, 10',
    radical: '十',
    strokeCount: 2,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 180,500 L 820,500',
        startPoint: [180, 500],
        endPoint: [820, 500],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Horizontal crossbeam drawn first.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,200 L 500,820',
        startPoint: [500, 200],
        endPoint: [500, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Vertical central spine bisecting the horizontal.'
      }
    ]
  },
  {
    id: 'kanji_n5_tsuki',
    character: '月',
    jlptLevel: 'N5',
    onYomi: 'ゲツ, ガツ',
    kunYomi: 'つき',
    englishGloss: 'Moon, month',
    radical: '月',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 300,220 L 300,820',
        startPoint: [300, 220],
        endPoint: [300, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical upright stroke.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 300,220 L 720,220 L 720,820',
        startPoint: [300, 220],
        endPoint: [720, 820],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, then Top to Bottom with hook',
        pedagogicalRule: 'Top horizontal across, bending down right vertical with hook.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 310,420 L 710,420',
        startPoint: [310, 420],
        endPoint: [710, 420],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Upper interior horizontal bar.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 310,610 L 710,610',
        startPoint: [310, 610],
        endPoint: [710, 610],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Lower interior horizontal bar.'
      }
    ]
  },
  {
    id: 'kanji_n5_ki',
    character: '木',
    jlptLevel: 'N5',
    onYomi: 'モク, ボク',
    kunYomi: 'き, こ-',
    englishGloss: 'Tree, wood',
    radical: '木',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 200,360 L 800,350',
        startPoint: [200, 360],
        endPoint: [800, 350],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Horizontal branch crossbar.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,180 L 500,820',
        startPoint: [500, 180],
        endPoint: [500, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central vertical trunk.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 500,370 Q 360,560 220,740',
        startPoint: [500, 370],
        endPoint: [220, 740],
        primaryAngleDeg: 230,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal sweep',
        pedagogicalRule: 'Left diagonal root.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 500,370 Q 640,560 780,740',
        startPoint: [500, 370],
        endPoint: [780, 740],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right diagonal root.'
      }
    ]
  },
  {
    id: 'kanji_n5_mizu',
    character: '水',
    jlptLevel: 'N5',
    onYomi: 'スイ',
    kunYomi: 'みず',
    englishGloss: 'Water',
    radical: '水',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,180 L 500,760 Q 500,830 430,800',
        startPoint: [500, 180],
        endPoint: [430, 800],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom, hooked at end',
        pedagogicalRule: 'Central vertical hooked spine.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 320,380 L 220,540',
        startPoint: [320, 380],
        endPoint: [220, 540],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal',
        pedagogicalRule: 'Upper left diagonal stroke.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 220,740 L 380,560',
        startPoint: [220, 740],
        endPoint: [380, 560],
        primaryAngleDeg: 50,
        strokeType: 'dot',
        directionalHint: 'Up-right diagonal flick',
        pedagogicalRule: 'Lower left rising stroke.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 620,320 L 780,740',
        startPoint: [620, 320],
        endPoint: [780, 740],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right downward stroke.'
      }
    ]
  },
  {
    id: 'kanji_n5_hi',
    character: '火',
    jlptLevel: 'N5',
    onYomi: 'カ',
    kunYomi: 'ひ, -び, ほ-',
    englishGloss: 'Fire',
    radical: '火',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 300,420 L 220,560',
        startPoint: [300, 420],
        endPoint: [220, 560],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left dot',
        pedagogicalRule: 'Left flame spark.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 700,380 L 780,520',
        startPoint: [700, 380],
        endPoint: [780, 520],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right dot',
        pedagogicalRule: 'Right flame spark.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 500,200 Q 450,550 260,820',
        startPoint: [500, 200],
        endPoint: [260, 820],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left sweeping spine',
        pedagogicalRule: 'Central sweeping spine.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 480,480 Q 640,660 780,820',
        startPoint: [480, 480],
        endPoint: [780, 820],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal leg',
        pedagogicalRule: 'Right supporting leg.'
      }
    ]
  },
  {
    id: 'kanji_n5_tsuchi',
    character: '土',
    jlptLevel: 'N5',
    onYomi: 'ド, ト',
    kunYomi: 'つち',
    englishGloss: 'Soil, earth, ground',
    radical: '土',
    strokeCount: 3,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 260,420 L 740,410',
        startPoint: [260, 420],
        endPoint: [740, 410],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Top horizontal crossbar.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,200 L 500,760',
        startPoint: [500, 200],
        endPoint: [500, 760],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Vertical central stem.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 180,760 L 820,750',
        startPoint: [180, 760],
        endPoint: [820, 750],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom wide baseline foundation.'
      }
    ]
  },
  {
    id: 'kanji_n5_kin',
    character: '金',
    jlptLevel: 'N5',
    onYomi: 'キン, コン',
    kunYomi: 'かね, かな-',
    englishGloss: 'Gold, money, metal',
    radical: '金',
    strokeCount: 8,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,160 Q 400,320 250,440',
        startPoint: [500, 160],
        endPoint: [250, 440],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal sweep',
        pedagogicalRule: 'Top left sweeping roof.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,160 Q 600,320 750,440',
        startPoint: [500, 160],
        endPoint: [750, 440],
        primaryAngleDeg: 305,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Top right sweeping roof.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 320,440 L 680,430',
        startPoint: [320, 440],
        endPoint: [680, 430],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Upper horizontal bar.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 260,570 L 740,560',
        startPoint: [260, 570],
        endPoint: [740, 560],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Middle horizontal bar.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 500,440 L 500,780',
        startPoint: [500, 440],
        endPoint: [500, 780],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central vertical spine.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 380,640 L 320,720',
        startPoint: [380, 640],
        endPoint: [320, 720],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left dot',
        pedagogicalRule: 'Left inner spark.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 620,640 L 680,720',
        startPoint: [620, 640],
        endPoint: [680, 720],
        primaryAngleDeg: 305,
        strokeType: 'right_fall',
        directionalHint: 'Down-right dot',
        pedagogicalRule: 'Right inner spark.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 180,780 L 820,770',
        startPoint: [180, 780],
        endPoint: [820, 770],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom baseline bar.'
      }
    ]
  },
  {
    id: 'kanji_n5_dai',
    character: '大',
    jlptLevel: 'N5',
    onYomi: 'ダイ, タイ',
    kunYomi: 'おお-, おお・きい, -おお・いに',
    englishGloss: 'Big, large',
    radical: '大',
    strokeCount: 3,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 180,380 L 820,370',
        startPoint: [180, 380],
        endPoint: [820, 370],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Horizontal arms spread wide.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,180 Q 450,550 240,840',
        startPoint: [500, 180],
        endPoint: [240, 840],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal sweep',
        pedagogicalRule: 'Central sweeping spine to bottom left.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 480,420 Q 640,650 800,840',
        startPoint: [480, 420],
        endPoint: [800, 840],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right diagonal leg sweeping down right.'
      }
    ]
  },
  {
    id: 'kanji_n5_naka',
    character: '中',
    jlptLevel: 'N5',
    onYomi: 'チュウ',
    kunYomi: 'なか, うち, あた・る',
    englishGloss: 'Middle, in, inside',
    radical: '丨',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 260,320 L 260,620',
        startPoint: [260, 320],
        endPoint: [260, 620],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical box wall.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 260,320 L 740,320 L 740,620',
        startPoint: [260, 320],
        endPoint: [740, 620],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, then Top to Bottom',
        pedagogicalRule: 'Top horizontal across and right vertical box wall.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 260,620 L 740,620',
        startPoint: [260, 620],
        endPoint: [740, 620],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom horizontal box closure.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 500,160 L 500,840',
        startPoint: [500, 160],
        endPoint: [500, 840],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central piercing vertical spine.'
      }
    ]
  },
  {
    id: 'kanji_n5_chii',
    character: '小',
    jlptLevel: 'N5',
    onYomi: 'ショウ',
    kunYomi: 'ちい・さい, こ-, お-',
    englishGloss: 'Small, little',
    radical: '小',
    strokeCount: 3,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,180 L 500,760 Q 500,830 430,800',
        startPoint: [500, 180],
        endPoint: [430, 800],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom with upward hook',
        pedagogicalRule: 'Central vertical hook.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 320,420 Q 260,560 220,680',
        startPoint: [320, 420],
        endPoint: [220, 680],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal dot',
        pedagogicalRule: 'Left diagonal dot.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 680,420 Q 740,560 780,680',
        startPoint: [680, 420],
        endPoint: [780, 680],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right diagonal slant.'
      }
    ]
  },
  {
    id: 'kanji_n5_yama',
    character: '山',
    jlptLevel: 'N5',
    onYomi: 'サン, セン',
    kunYomi: 'やま',
    englishGloss: 'Mountain',
    radical: '山',
    strokeCount: 3,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,200 L 500,780',
        startPoint: [500, 200],
        endPoint: [500, 780],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central highest mountain peak.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 260,450 L 260,780 L 740,780',
        startPoint: [260, 450],
        endPoint: [740, 780],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom, then Left to Right',
        pedagogicalRule: 'Left ridge descending and horizontal connecting valley.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 740,450 L 740,780',
        startPoint: [740, 450],
        endPoint: [740, 780],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Right mountain ridge.'
      }
    ]
  },
  {
    id: 'kanji_n5_kawa',
    character: '川',
    jlptLevel: 'N5',
    onYomi: 'セン',
    kunYomi: 'かわ',
    englishGloss: 'River, stream',
    radical: '川',
    strokeCount: 3,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 280,240 L 280,680 Q 280,760 220,800',
        startPoint: [280, 240],
        endPoint: [220, 800],
        primaryAngleDeg: 90,
        strokeType: 'left_fall',
        directionalHint: 'Top to Bottom bending slightly left',
        pedagogicalRule: 'Left river stream bending gently left.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,280 L 500,720',
        startPoint: [500, 280],
        endPoint: [500, 720],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Middle shorter river stream.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 720,200 L 720,800',
        startPoint: [720, 200],
        endPoint: [720, 800],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Right straight long river stream.'
      }
    ]
  },
  {
    id: 'kanji_n5_en',
    character: '円',
    jlptLevel: 'N5',
    onYomi: 'エン',
    kunYomi: 'まる・い',
    englishGloss: 'Yen, circle, round',
    radical: '冂',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 260,240 L 260,820',
        startPoint: [260, 240],
        endPoint: [260, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical upright boundary.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 260,240 L 740,240 L 740,820',
        startPoint: [260, 240],
        endPoint: [740, 820],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, then Top to Bottom',
        pedagogicalRule: 'Top horizontal across and right vertical frame.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 500,250 L 500,680',
        startPoint: [500, 250],
        endPoint: [500, 680],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Interior vertical divider.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 260,680 L 740,680',
        startPoint: [260, 680],
        endPoint: [740, 680],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Interior baseline horizontal.'
      }
    ]
  },
  {
    id: 'kanji_n5_nen',
    character: '年',
    jlptLevel: 'N5',
    onYomi: 'ネン',
    kunYomi: 'とし',
    englishGloss: 'Year',
    radical: '干',
    strokeCount: 6,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 420,180 L 320,300',
        startPoint: [420, 180],
        endPoint: [320, 300],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal',
        pedagogicalRule: 'Top left short diagonal.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 280,310 L 720,300',
        startPoint: [280, 310],
        endPoint: [720, 300],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'First horizontal bar.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 380,440 L 360,560',
        startPoint: [380, 440],
        endPoint: [360, 560],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Short inner vertical stem.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 240,560 L 760,550',
        startPoint: [240, 560],
        endPoint: [760, 550],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Second horizontal bar.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 180,680 L 820,670',
        startPoint: [180, 680],
        endPoint: [820, 670],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Long base horizontal crossbeam.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 500,310 L 500,850',
        startPoint: [500, 310],
        endPoint: [500, 850],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central long vertical spine piercing all levels.'
      }
    ]
  },

  // ─── JLPT N5 (3 Characters) ──────────────────────────────────
  {
    id: 'kanji_n5_nichi',
    character: '日',
    jlptLevel: 'N5',
    onYomi: 'ニチ, ジツ',
    kunYomi: 'ひ, -び, か',
    englishGloss: 'Sun, day, Japan',
    radical: '日',
    strokeCount: 4,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 240,200 L 240,840',
        startPoint: [240, 200],
        endPoint: [240, 840],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical upright bounding frame.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 240,200 L 760,200 L 760,840',
        startPoint: [240, 200],
        endPoint: [760, 840],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Left to Right, then Top to Bottom',
        pedagogicalRule: 'Top horizontal across, bending sharply 90 deg down.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 250,510 L 750,510',
        startPoint: [250, 510],
        endPoint: [750, 510],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Interior central dividing bar before closing.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 230,840 L 770,840',
        startPoint: [230, 840],
        endPoint: [770, 840],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Baseline horizontal firmly sealing the bottom enclosure.'
      }
    ]
  },
  {
    id: 'kanji_n5_hon',
    character: '本',
    jlptLevel: 'N5',
    onYomi: 'ホン',
    kunYomi: 'もと',
    englishGloss: 'Book, origin, root',
    radical: '木',
    strokeCount: 5,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 180,310 L 820,300',
        startPoint: [180, 310],
        endPoint: [820, 300],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Wide horizontal crossbeam.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 500,150 L 500,860',
        startPoint: [500, 150],
        endPoint: [500, 860],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central vertical spine.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 500,340 Q 360,560 200,720',
        startPoint: [500, 340],
        endPoint: [200, 720],
        primaryAngleDeg: 225,
        strokeType: 'left_fall',
        directionalHint: 'Left downward slant',
        pedagogicalRule: 'Left diagonal branch drawn third.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 500,380 Q 620,560 780,720',
        startPoint: [500, 380],
        endPoint: [780, 720],
        primaryAngleDeg: 45,
        strokeType: 'right_fall',
        directionalHint: 'Right downward slant',
        pedagogicalRule: 'Right diagonal branch drawn fourth.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 340,680 L 660,680',
        startPoint: [340, 680],
        endPoint: [660, 680],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Lower horizontal dash marks origin/root.'
      }
    ]
  },
  {
    id: 'kanji_n5_hito',
    character: '人',
    jlptLevel: 'N5',
    onYomi: 'ジン, ニン',
    kunYomi: 'ひと',
    englishGloss: 'Person, human being',
    radical: '人',
    strokeCount: 2,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,150 Q 420,520 220,850',
        startPoint: [500, 150],
        endPoint: [220, 850],
        primaryAngleDeg: 245,
        strokeType: 'left_fall',
        directionalHint: 'Down-left diagonal sweep',
        pedagogicalRule: 'Left diagonal spine sweeping gently down-left.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 430,420 Q 580,650 780,850',
        startPoint: [430, 420],
        endPoint: [780, 850],
        primaryAngleDeg: 310,
        strokeType: 'right_fall',
        directionalHint: 'Down-right diagonal slant',
        pedagogicalRule: 'Right supporting leg branching from stroke 1.'
      }
    ]
  },
  {
    id: 'kanji_n5_nani',
    character: '何',
    jlptLevel: 'N5',
    onYomi: 'カ',
    kunYomi: 'なに, なん',
    englishGloss: 'What, which',
    radical: '亻',
    strokeCount: 7,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 298,126 C 300,145 296,161 291,178 C 255,286 202,392 103,521',
        startPoint: [298, 126],
        endPoint: [103, 521],
        primaryAngleDeg: 116,
        strokeType: 'left_fall',
        directionalHint: 'Top-right to Bottom-left',
        pedagogicalRule: 'Left-falling slant stroke of ninben (亻) radical.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 246,335 C 257,349 260,363 260,385 C 260,472 259,667 258,794 C 258,818 258,839 258,857',
        startPoint: [246, 335],
        endPoint: [258, 857],
        primaryAngleDeg: 89,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Vertical downward stem of ninben (亻) radical.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 357,244 C 373,249 400,250 416,249 C 537,237 726,205 840,195 C 866,193 882,197 896,199',
        startPoint: [357, 244],
        endPoint: [896, 199],
        primaryAngleDeg: 355,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Top horizontal bar of the 可 component.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 375,404 C 382,411 387,419 387,424 C 393,461 400,517 408,574 C 410,593 410,592 412,608',
        startPoint: [375, 404],
        endPoint: [412, 608],
        primaryAngleDeg: 80,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical line of the mouth (口) element.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 397,418 C 455,407 536,391 578,384 C 607,379 618,387 612,416 C 604,451 589,511 582,546',
        startPoint: [397, 418],
        endPoint: [582, 546],
        primaryAngleDeg: 35,
        strokeType: 'hook',
        directionalHint: 'Left to Right then Downward',
        pedagogicalRule: 'Horizontal and right-falling bend of the mouth (口) element.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 418,580 C 452,576 505,569 551,563 C 568,561 586,559 604,557',
        startPoint: [418, 580],
        endPoint: [604, 557],
        primaryAngleDeg: 353,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Bottom horizontal closing stroke of the mouth (口) element.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 764,227 C 773,236 780,247 781,273 C 784,397 779,791 779,833 C 779,931 721,858 695,826',
        startPoint: [764, 227],
        endPoint: [695, 826],
        primaryAngleDeg: 95,
        strokeType: 'hook',
        directionalHint: 'Vertical Downward with Upward Hook',
        pedagogicalRule: 'Long vertical stroke of 丁 ending with a crisp upward hook.'
      }
    ]
  },

  // ─── JLPT N4 (3 Characters) ──────────────────────────────────
  {
    id: 'kanji_n4_kai',
    character: '会',
    jlptLevel: 'N4',
    onYomi: 'カイ, エ',
    kunYomi: 'あ.う',
    englishGloss: 'Meet, association, company',
    radical: '人',
    strokeCount: 6,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 500,140 Q 360,280 180,430',
        startPoint: [500, 140],
        endPoint: [180, 430],
        primaryAngleDeg: 222,
        strokeType: 'left_fall',
        directionalHint: 'Left slant',
        pedagogicalRule: 'Sweeping left-falling roof apex.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 480,160 Q 640,280 820,430',
        startPoint: [480, 160],
        endPoint: [820, 430],
        primaryAngleDeg: 322,
        strokeType: 'right_fall',
        directionalHint: 'Right slant',
        pedagogicalRule: 'Right-falling balanced roof slant.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 320,430 L 680,420',
        startPoint: [320, 430],
        endPoint: [680, 420],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Upper interior horizontal bar.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 420,520 L 290,680',
        startPoint: [420, 520],
        endPoint: [290, 680],
        primaryAngleDeg: 230,
        strokeType: 'left_fall',
        directionalHint: 'Down-left step',
        pedagogicalRule: 'Lower left diagonal step.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 300,620 L 700,610',
        startPoint: [300, 620],
        endPoint: [700, 610],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Middle connecting horizontal bar.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 220,850 L 780,840',
        startPoint: [220, 850],
        endPoint: [780, 840],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right baseline',
        pedagogicalRule: 'Firm baseline foundation horizontal.'
      }
    ]
  },
  {
    id: 'kanji_n4_sha',
    character: '社',
    jlptLevel: 'N4',
    onYomi: 'シャ',
    kunYomi: 'やしろ',
    englishGloss: 'Company, society, shrine',
    radical: '示',
    strokeCount: 7,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 240,180 L 280,270',
        startPoint: [240, 180],
        endPoint: [280, 270],
        primaryAngleDeg: 115,
        strokeType: 'dot',
        directionalHint: 'Top-left dot',
        pedagogicalRule: 'Top crown dot of radical.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 160,350 L 340,350 L 190,540',
        startPoint: [160, 350],
        endPoint: [190, 540],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Horizontal across then down-left',
        pedagogicalRule: 'Short horizontal bending down-left into diagonal slant.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 270,360 L 270,850',
        startPoint: [270, 360],
        endPoint: [270, 850],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Straight vertical spine descending through left component.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 330,460 L 380,560',
        startPoint: [330, 460],
        endPoint: [380, 560],
        primaryAngleDeg: 120,
        strokeType: 'dot',
        directionalHint: 'Right dot',
        pedagogicalRule: 'Right balancing accent dot of radical.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 520,380 L 800,370',
        startPoint: [520, 380],
        endPoint: [800, 370],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Upper horizontal bar of right component.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 660,180 L 660,820',
        startPoint: [660, 180],
        endPoint: [660, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Central vertical piercing bar.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 460,840 L 860,830',
        startPoint: [460, 840],
        endPoint: [860, 830],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right baseline',
        pedagogicalRule: 'Wide bottom ground horizontal completing character.'
      }
    ]
  },
  {
    id: 'kanji_n4_gen',
    character: '言',
    jlptLevel: 'N4',
    onYomi: 'ゲン, ゴン',
    kunYomi: 'い.う, こと',
    englishGloss: 'Say, speech, word',
    radical: '言',
    strokeCount: 7,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 480,140 L 530,220',
        startPoint: [480, 140],
        endPoint: [530, 220],
        primaryAngleDeg: 120,
        strokeType: 'dot',
        directionalHint: 'Top crown dot',
        pedagogicalRule: 'Central crown dot.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 220,280 L 780,270',
        startPoint: [220, 280],
        endPoint: [780, 270],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Long primary horizontal beam.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 320,380 L 680,380',
        startPoint: [320, 380],
        endPoint: [680, 380],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Middle horizontal bar.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 340,480 L 660,480',
        startPoint: [340, 480],
        endPoint: [660, 480],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Lower short horizontal bar.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 320,590 L 320,830',
        startPoint: [320, 590],
        endPoint: [320, 830],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left vertical wall of bottom mouth.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 320,590 L 680,590 L 680,830',
        startPoint: [320, 590],
        endPoint: [680, 830],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down',
        pedagogicalRule: 'Top horizontal and right vertical wall of mouth.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 320,830 L 680,830',
        startPoint: [320, 830],
        endPoint: [680, 830],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right closing',
        pedagogicalRule: 'Bottom closing horizontal seal.'
      }
    ]
  },

  // ─── JLPT N3 (3 Characters) ──────────────────────────────────
  {
    id: 'kanji_n3_tai',
    character: '対',
    jlptLevel: 'N3',
    onYomi: 'タイ, ツイ',
    kunYomi: 'あいて, こた.える',
    englishGloss: 'Vis-a-vis, opposite, versus',
    radical: '寸',
    strokeCount: 7,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 440,160 L 220,380',
        startPoint: [440, 160],
        endPoint: [220, 380],
        primaryAngleDeg: 225,
        strokeType: 'left_fall',
        directionalHint: 'Down-left slant',
        pedagogicalRule: 'Left component upper slant.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 180,390 L 480,380',
        startPoint: [180, 390],
        endPoint: [480, 380],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Left component upper horizontal.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 320,390 L 320,820',
        startPoint: [320, 390],
        endPoint: [320, 820],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left component central spine.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 190,620 L 460,540',
        startPoint: [190, 620],
        endPoint: [460, 540],
        primaryAngleDeg: 345,
        strokeType: 'horizontal',
        directionalHint: 'Upward-slanted flick',
        pedagogicalRule: 'Left component bottom upward slant.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 540,320 L 880,300',
        startPoint: [540, 320],
        endPoint: [880, 300],
        primaryAngleDeg: 357,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right component horizontal bar.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 740,150 L 740,840 Q 740,870 690,830',
        startPoint: [740, 150],
        endPoint: [690, 830],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Vertical down with hook',
        pedagogicalRule: 'Right component vertical hook spine.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 600,480 L 660,580',
        startPoint: [600, 480],
        endPoint: [660, 580],
        primaryAngleDeg: 125,
        strokeType: 'dot',
        directionalHint: 'Down-right dot',
        pedagogicalRule: 'Interior accent dot of right component.'
      }
    ]
  },
  {
    id: 'kanji_n3_men',
    character: '面',
    jlptLevel: 'N3',
    onYomi: 'メン, ベン',
    kunYomi: 'おも, おもて, つら',
    englishGloss: 'Mask, face, features, surface',
    radical: '面',
    strokeCount: 9,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 220,180 L 780,170',
        startPoint: [220, 180],
        endPoint: [780, 170],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Top horizontal crown.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 480,180 L 440,320',
        startPoint: [480, 180],
        endPoint: [440, 320],
        primaryAngleDeg: 105,
        strokeType: 'left_fall',
        directionalHint: 'Short slant down-left',
        pedagogicalRule: 'Upper central slant.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 260,330 L 260,860',
        startPoint: [260, 330],
        endPoint: [260, 860],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left outer framing wall.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 260,330 L 740,330 L 740,860',
        startPoint: [260, 330],
        endPoint: [740, 860],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down',
        pedagogicalRule: 'Outer right framing wall.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 420,330 L 420,700',
        startPoint: [420, 330],
        endPoint: [420, 700],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Inner left vertical.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 580,330 L 580,700',
        startPoint: [580, 330],
        endPoint: [580, 700],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Inner right vertical.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 260,520 L 740,520',
        startPoint: [260, 520],
        endPoint: [740, 520],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Middle internal dividing horizontal.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 260,700 L 740,700',
        startPoint: [260, 700],
        endPoint: [740, 700],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Lower internal dividing horizontal.'
      },
      {
        strokeIndex: 9,
        svgPath: 'M 230,860 L 770,860',
        startPoint: [230, 860],
        endPoint: [770, 860],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right baseline',
        pedagogicalRule: 'Bottom closing baseline horizontal.'
      }
    ]
  },
  {
    id: 'kanji_n3_sei',
    character: '政',
    jlptLevel: 'N3',
    onYomi: 'セイ, ショウ',
    kunYomi: 'まつりごと',
    englishGloss: 'Politics, government',
    radical: '攴',
    strokeCount: 9,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 200,280 L 480,270',
        startPoint: [200, 280],
        endPoint: [480, 270],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Left component upper horizontal.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 340,160 L 340,460',
        startPoint: [340, 160],
        endPoint: [340, 460],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left component central upper vertical.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 340,460 L 480,450',
        startPoint: [340, 460],
        endPoint: [480, 450],
        primaryAngleDeg: 356,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Left component middle horizontal.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 220,620 L 220,840',
        startPoint: [220, 620],
        endPoint: [220, 840],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left component lower vertical.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 160,840 L 520,830',
        startPoint: [160, 840],
        endPoint: [520, 830],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Left component baseline horizontal.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 680,180 L 560,420',
        startPoint: [680, 180],
        endPoint: [560, 420],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left slant',
        pedagogicalRule: 'Right component upper left slant.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 580,360 L 860,340',
        startPoint: [580, 360],
        endPoint: [860, 340],
        primaryAngleDeg: 356,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right component horizontal bar.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 740,370 Q 720,620 540,860',
        startPoint: [740, 370],
        endPoint: [540, 860],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Sweeping down-left curve',
        pedagogicalRule: 'Right component long left-falling sweep.'
      },
      {
        strokeIndex: 9,
        svgPath: 'M 600,540 Q 720,720 880,860',
        startPoint: [600, 540],
        endPoint: [880, 860],
        primaryAngleDeg: 315,
        strokeType: 'right_fall',
        directionalHint: 'Sweeping down-right slant',
        pedagogicalRule: 'Right component powerful right-falling leg.'
      }
    ]
  },

  // ─── JLPT N2 (3 Characters) ──────────────────────────────────
  {
    id: 'kanji_n2_ha',
    character: '把',
    jlptLevel: 'N2',
    onYomi: 'ハ, ワ',
    kunYomi: 'と.る, たば',
    englishGloss: 'Grasp, hold, bundle',
    radical: '手',
    strokeCount: 7,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 180,320 L 380,300',
        startPoint: [180, 320],
        endPoint: [380, 300],
        primaryAngleDeg: 355,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Radical upper horizontal bar.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 290,160 L 290,820 Q 290,880 230,850',
        startPoint: [290, 160],
        endPoint: [230, 850],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom with upward hook',
        pedagogicalRule: 'Radical vertical hook spine.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 160,650 L 380,470',
        startPoint: [160, 650],
        endPoint: [380, 470],
        primaryAngleDeg: 320,
        strokeType: 'left_fall',
        directionalHint: 'Upward-right flick',
        pedagogicalRule: 'Radical upward rising slash.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 520,240 L 780,240 L 780,440',
        startPoint: [520, 240],
        endPoint: [780, 440],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down',
        pedagogicalRule: 'Right component top hook box.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 520,450 L 780,450',
        startPoint: [520, 450],
        endPoint: [780, 450],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right component middle horizontal bar.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 520,250 L 520,860',
        startPoint: [520, 250],
        endPoint: [520, 860],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Right component left vertical spine.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 520,680 L 820,680 Q 860,680 860,760 L 820,860',
        startPoint: [520, 680],
        endPoint: [820, 860],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across and curving down-left hook',
        pedagogicalRule: 'Right component bottom tail with decisive hook.'
      }
    ]
  },
  {
    id: 'kanji_n2_aku',
    character: '握',
    jlptLevel: 'N2',
    onYomi: 'アク',
    kunYomi: 'にぎ.る',
    englishGloss: 'Grip, hold, wield, grasp',
    radical: '手',
    strokeCount: 12,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 140,320 L 320,300',
        startPoint: [140, 320],
        endPoint: [320, 300],
        primaryAngleDeg: 355,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Radical upper horizontal.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 240,160 L 240,820 Q 240,870 190,840',
        startPoint: [240, 160],
        endPoint: [190, 840],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom hook',
        pedagogicalRule: 'Radical vertical hook spine.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 130,640 L 320,480',
        startPoint: [130, 640],
        endPoint: [320, 480],
        primaryAngleDeg: 320,
        strokeType: 'left_fall',
        directionalHint: 'Upward-right flick',
        pedagogicalRule: 'Radical rising flick.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 440,220 L 840,220 L 840,380',
        startPoint: [440, 220],
        endPoint: [840, 380],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down',
        pedagogicalRule: 'Crown enclosure roof.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 440,380 L 840,380',
        startPoint: [440, 380],
        endPoint: [840, 380],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Crown middle horizontal.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 440,230 L 440,850',
        startPoint: [440, 230],
        endPoint: [440, 850],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Crown outer left vertical spine.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 520,480 L 760,470',
        startPoint: [520, 480],
        endPoint: [760, 470],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Interior top horizontal.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 630,480 L 630,660',
        startPoint: [630, 480],
        endPoint: [630, 660],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Interior vertical divider.'
      },
      {
        strokeIndex: 9,
        svgPath: 'M 540,660 L 750,660',
        startPoint: [540, 660],
        endPoint: [750, 660],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Interior middle horizontal.'
      },
      {
        strokeIndex: 10,
        svgPath: 'M 560,750 L 530,860',
        startPoint: [560, 750],
        endPoint: [530, 860],
        primaryAngleDeg: 105,
        strokeType: 'left_fall',
        directionalHint: 'Down-left foot',
        pedagogicalRule: 'Interior lower left foot.'
      },
      {
        strokeIndex: 11,
        svgPath: 'M 720,740 L 750,860',
        startPoint: [720, 740],
        endPoint: [750, 860],
        primaryAngleDeg: 75,
        strokeType: 'vertical',
        directionalHint: 'Down-right foot',
        pedagogicalRule: 'Interior lower right foot.'
      },
      {
        strokeIndex: 12,
        svgPath: 'M 480,860 L 820,860',
        startPoint: [480, 860],
        endPoint: [820, 860],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right baseline',
        pedagogicalRule: 'Bottom closing baseline horizontal.'
      }
    ]
  },
  {
    id: 'kanji_n2_kei',
    character: '契',
    jlptLevel: 'N2',
    onYomi: 'ケイ',
    kunYomi: 'ちぎ.る',
    englishGloss: 'Pledge, contract, promise',
    radical: '大',
    strokeCount: 9,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 240,240 L 460,230',
        startPoint: [240, 240],
        endPoint: [460, 230],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Upper left component top horizontal.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 350,150 L 350,380',
        startPoint: [350, 150],
        endPoint: [350, 380],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Upper left component vertical spine.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 220,380 L 480,370',
        startPoint: [220, 380],
        endPoint: [480, 370],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Upper left component bottom horizontal.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 600,160 L 780,160 L 780,360',
        startPoint: [600, 160],
        endPoint: [780, 360],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down',
        pedagogicalRule: 'Upper right component sword hook.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 760,170 Q 740,360 580,480',
        startPoint: [760, 170],
        endPoint: [580, 480],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left sweep',
        pedagogicalRule: 'Upper right component curved slash.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 240,540 L 760,530',
        startPoint: [240, 540],
        endPoint: [760, 530],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Lower component large horizontal crossbeam.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 500,440 Q 420,680 200,860',
        startPoint: [500, 440],
        endPoint: [200, 860],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Sweeping down-left leg',
        pedagogicalRule: 'Lower component sweeping left leg.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 480,550 Q 640,720 820,860',
        startPoint: [480, 550],
        endPoint: [820, 860],
        primaryAngleDeg: 315,
        strokeType: 'right_fall',
        directionalHint: 'Sweeping down-right leg',
        pedagogicalRule: 'Lower component sweeping right leg.'
      },
      {
        strokeIndex: 9,
        svgPath: 'M 500,680 L 560,760',
        startPoint: [500, 680],
        endPoint: [560, 760],
        primaryAngleDeg: 125,
        strokeType: 'dot',
        directionalHint: 'Interior balance accent',
        pedagogicalRule: 'Lower component center balance accent.'
      }
    ]
  },

  // ─── JLPT N1 (3 Characters) ──────────────────────────────────
  {
    id: 'kanji_n1_ji',
    character: '示',
    jlptLevel: 'N1',
    onYomi: 'シ, ジ',
    kunYomi: 'しめ.す',
    englishGloss: 'Show, indicate, point out',
    radical: '示',
    strokeCount: 5,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 320,240 L 680,230',
        startPoint: [320, 240],
        endPoint: [680, 230],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Short upper horizontal.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 180,420 L 820,410',
        startPoint: [180, 420],
        endPoint: [820, 410],
        primaryAngleDeg: 359,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Long middle horizontal beam.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 500,420 L 500,860 Q 500,880 440,840',
        startPoint: [500, 420],
        endPoint: [440, 840],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom with small hook',
        pedagogicalRule: 'Central vertical hook spine.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 340,560 Q 290,680 220,780',
        startPoint: [340, 560],
        endPoint: [220, 780],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Down-left slant',
        pedagogicalRule: 'Left diagonal accent stroke.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 660,560 L 760,740',
        startPoint: [660, 560],
        endPoint: [760, 740],
        primaryAngleDeg: 60,
        strokeType: 'right_fall',
        directionalHint: 'Down-right slant',
        pedagogicalRule: 'Right diagonal accent stroke.'
      }
    ]
  },
  {
    id: 'kanji_n1_sa',
    character: '唆',
    jlptLevel: 'N1',
    onYomi: 'サ',
    kunYomi: 'そそのか.す',
    englishGloss: 'Instigate, tempt, suggest',
    radical: '口',
    strokeCount: 10,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 160,340 L 160,680',
        startPoint: [160, 340],
        endPoint: [160, 680],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Left mouth radical vertical wall.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 160,340 L 360,340 L 360,680',
        startPoint: [160, 340],
        endPoint: [360, 680],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down',
        pedagogicalRule: 'Left mouth radical top and right wall.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 160,680 L 360,680',
        startPoint: [160, 680],
        endPoint: [360, 680],
        primaryAngleDeg: 0,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right closing',
        pedagogicalRule: 'Left mouth radical closing baseline.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 540,160 L 680,160 L 620,280',
        startPoint: [540, 160],
        endPoint: [620, 280],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down-left',
        pedagogicalRule: 'Right upper crown horizontal-fold.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 480,290 L 740,280',
        startPoint: [480, 290],
        endPoint: [740, 280],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right upper crown horizontal crossbar.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 520,380 L 720,370',
        startPoint: [520, 380],
        endPoint: [720, 370],
        primaryAngleDeg: 357,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right middle horizontal.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 600,290 L 520,520',
        startPoint: [600, 290],
        endPoint: [520, 520],
        primaryAngleDeg: 245,
        strokeType: 'left_fall',
        directionalHint: 'Down-left slant',
        pedagogicalRule: 'Right middle left slant.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 540,540 L 700,540 L 640,660',
        startPoint: [540, 540],
        endPoint: [640, 660],
        primaryAngleDeg: 0,
        strokeType: 'hook',
        directionalHint: 'Across then down-left',
        pedagogicalRule: 'Right lower fold.'
      },
      {
        strokeIndex: 9,
        svgPath: 'M 620,540 Q 580,720 440,860',
        startPoint: [620, 540],
        endPoint: [440, 860],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Sweeping down-left',
        pedagogicalRule: 'Right lower sweeping left leg.'
      },
      {
        strokeIndex: 10,
        svgPath: 'M 520,660 Q 640,780 840,860',
        startPoint: [520, 660],
        endPoint: [840, 860],
        primaryAngleDeg: 315,
        strokeType: 'right_fall',
        directionalHint: 'Sweeping down-right',
        pedagogicalRule: 'Right lower sweeping right leg.'
      }
    ]
  },
  {
    id: 'kanji_n1_chi',
    character: '緻',
    jlptLevel: 'N1',
    onYomi: 'チ',
    kunYomi: 'こまかい',
    englishGloss: 'Fine, detailed, meticulous',
    radical: '糸',
    strokeCount: 15,
    strokes: [
      {
        strokeIndex: 1,
        svgPath: 'M 240,160 L 190,260 L 290,320',
        startPoint: [240, 160],
        endPoint: [290, 320],
        primaryAngleDeg: 235,
        strokeType: 'hook',
        directionalHint: 'Down-left then down-right fold',
        pedagogicalRule: 'Left thread radical upper fold.'
      },
      {
        strokeIndex: 2,
        svgPath: 'M 290,320 L 180,440 L 320,480',
        startPoint: [290, 320],
        endPoint: [320, 480],
        primaryAngleDeg: 235,
        strokeType: 'hook',
        directionalHint: 'Down-left then down-right fold',
        pedagogicalRule: 'Left thread radical lower fold.'
      },
      {
        strokeIndex: 3,
        svgPath: 'M 250,500 L 250,780 Q 250,820 200,800',
        startPoint: [250, 500],
        endPoint: [200, 800],
        primaryAngleDeg: 90,
        strokeType: 'hook',
        directionalHint: 'Top to Bottom hook',
        pedagogicalRule: 'Left thread radical central vertical hook.'
      },
      {
        strokeIndex: 4,
        svgPath: 'M 170,600 L 130,700',
        startPoint: [170, 600],
        endPoint: [130, 700],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left dot',
        pedagogicalRule: 'Left thread radical left dot.'
      },
      {
        strokeIndex: 5,
        svgPath: 'M 310,600 L 350,700',
        startPoint: [310, 600],
        endPoint: [350, 700],
        primaryAngleDeg: 65,
        strokeType: 'right_fall',
        directionalHint: 'Down-right dot',
        pedagogicalRule: 'Left thread radical right dot.'
      },
      {
        strokeIndex: 6,
        svgPath: 'M 460,180 L 640,170',
        startPoint: [460, 180],
        endPoint: [640, 170],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right upper component top horizontal.'
      },
      {
        strokeIndex: 7,
        svgPath: 'M 540,180 L 540,320',
        startPoint: [540, 180],
        endPoint: [540, 320],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Right upper component vertical.'
      },
      {
        strokeIndex: 8,
        svgPath: 'M 440,320 L 660,310',
        startPoint: [440, 320],
        endPoint: [660, 310],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right upper component middle horizontal.'
      },
      {
        strokeIndex: 9,
        svgPath: 'M 480,330 L 420,470',
        startPoint: [480, 330],
        endPoint: [420, 470],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left slant',
        pedagogicalRule: 'Right middle left slant.'
      },
      {
        strokeIndex: 10,
        svgPath: 'M 420,480 L 680,470',
        startPoint: [420, 480],
        endPoint: [680, 470],
        primaryAngleDeg: 358,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Right middle baseline horizontal.'
      },
      {
        strokeIndex: 11,
        svgPath: 'M 560,330 L 560,540',
        startPoint: [560, 330],
        endPoint: [560, 540],
        primaryAngleDeg: 90,
        strokeType: 'vertical',
        directionalHint: 'Top to Bottom',
        pedagogicalRule: 'Right middle piercing vertical.'
      },
      {
        strokeIndex: 12,
        svgPath: 'M 760,220 L 680,380',
        startPoint: [760, 220],
        endPoint: [680, 380],
        primaryAngleDeg: 240,
        strokeType: 'left_fall',
        directionalHint: 'Down-left slant',
        pedagogicalRule: 'Far right component upper left slant.'
      },
      {
        strokeIndex: 13,
        svgPath: 'M 690,340 L 880,320',
        startPoint: [690, 340],
        endPoint: [880, 320],
        primaryAngleDeg: 356,
        strokeType: 'horizontal',
        directionalHint: 'Left to Right',
        pedagogicalRule: 'Far right component horizontal.'
      },
      {
        strokeIndex: 14,
        svgPath: 'M 820,350 Q 800,620 640,860',
        startPoint: [820, 350],
        endPoint: [640, 860],
        primaryAngleDeg: 235,
        strokeType: 'left_fall',
        directionalHint: 'Long down-left sweep',
        pedagogicalRule: 'Far right component sweeping left leg.'
      },
      {
        strokeIndex: 15,
        svgPath: 'M 720,540 Q 820,720 920,860',
        startPoint: [720, 540],
        endPoint: [920, 860],
        primaryAngleDeg: 315,
        strokeType: 'right_fall',
        directionalHint: 'Sweeping down-right leg',
        pedagogicalRule: 'Far right component wide right-falling foot.'
      }
    ]
  }
];
