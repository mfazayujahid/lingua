// Canonical Hitsujun Vector Specifications for 15 Anchor Kanji (N5-N1)
// [0, 1000]^2 Coordinate Space
import { StrokeDefinition } from '../../types';

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
