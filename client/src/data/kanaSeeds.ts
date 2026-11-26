// Canonical Hitsujun Vector Specifications for Complete 46 Hiragana & 46 Katakana Syllabaries (92 Total Glyphs)
// Derived from Authentic KanjiVG Standard Vectors in [0, 1000]^2 Coordinate Space
import { StrokeDefinition } from '../../../shared/types';

export interface KanaCharacterSeed {
  id: string;
  character: string;
  syllabary: 'HIRAGANA' | 'KATAKANA';
  romaji: string;
  strokeCount: number;
  strokes: StrokeDefinition[];
}

export const KANA_SEEDS: KanaCharacterSeed[] = [
  {
    "id": "kana_a_h",
    "character": "あ",
    "syllabary": "HIRAGANA",
    "romaji": "a",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M284.5,302.8c8.1,8.1,25.2,16.7,48.2,16.1c79.1-2.3,183.5-19.4,270.6-39c13.9-3.1,42.4-8.1,60.7-4.6",
        "startPoint": [
          284,
          303
        ],
        "endPoint": [
          664,
          275
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of あ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M456.5,161.7c8.1,9.2,16.7,29.9,12.7,48.2c-34.4,153.7-57.3,349.8-47.1,492c3.8,52.3,17.2,99.8,31,125",
        "startPoint": [
          457,
          162
        ],
        "endPoint": [
          453,
          827
        ],
        "primaryAngleDeg": 90,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of あ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M602.1,404.8c6.9,10.3,10.6,40.3,4.6,56.1c-42.4,112.5-103.1,218-232.8,328.1c-62.9,53.5-145.7,34.4-149.1-76.9c-3.1-99.7,122.8-212.1,297.1-245.3c113.9-21.7,247.7,12.7,279.8,117c37.2,120.9-34.5,241.9-191.6,279.7",
        "startPoint": [
          602,
          405
        ],
        "endPoint": [
          610,
          863
        ],
        "primaryAngleDeg": 89,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of あ"
      }
    ]
  },
  {
    "id": "kana_i_h",
    "character": "い",
    "syllabary": "HIRAGANA",
    "romaji": "i",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M197.2,272.1c18.4,19.9,23.9,42.9,19.9,68.2c-28.3,175.8-9.4,293.7,72.8,380.3c56.1,59.2,57.4,28.8,64.6-47.8",
        "startPoint": [
          197,
          272
        ],
        "endPoint": [
          354,
          673
        ],
        "primaryAngleDeg": 69,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of い"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M669.4,335c86.6,73.9,163.2,172.7,168.9,310.4",
        "startPoint": [
          669,
          335
        ],
        "endPoint": [
          838,
          645
        ],
        "primaryAngleDeg": 61,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of い"
      }
    ]
  },
  {
    "id": "kana_u_h",
    "character": "う",
    "syllabary": "HIRAGANA",
    "romaji": "u",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M385.3,142.2c51.6,19.4,88.3,27.5,118.2,27.5c75.9,0,73.4,10.3-3.5,50.5",
        "startPoint": [
          385,
          142
        ],
        "endPoint": [
          500,
          220
        ],
        "primaryAngleDeg": 34,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of う"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M302.8,388.8c19.4,10.3,37.8,26.4,78,12.7c40.2-13.8,117-65.3,169.7-64.2c52.8,1.1,94,45.9,94,165.1c0,142.1-75.7,277.4-223.6,378.3",
        "startPoint": [
          303,
          389
        ],
        "endPoint": [
          421,
          881
        ],
        "primaryAngleDeg": 77,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of う"
      }
    ]
  },
  {
    "id": "kana_e_h",
    "character": "え",
    "syllabary": "HIRAGANA",
    "romaji": "e",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M371.7,121.6c51.6,19.4,91.7,27.5,129.5,27.5c75.9,0,73.4,10.3-3.5,50.5",
        "startPoint": [
          372,
          122
        ],
        "endPoint": [
          498,
          200
        ],
        "primaryAngleDeg": 32,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of え"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M298.3,413.9c17.2,11.5,41.3,16.1,67.7,5.7c30.2-11.8,156-72.3,195-90.6c39-18.3,76.3,0.4,40.2,42.4c-112.5,130.9-250.1,289.2-362.5,407.3c-29.9,31.4-5.3,32.5,13.8,12.6c123.9-129.5,166.2-184.6,216.7-184.6c65.4,0,32.1,153.7,61.9,205.3c29.8,51.7,175.4,34.4,239.6,19.4",
        "startPoint": [
          298,
          414
        ],
        "endPoint": [
          771,
          831
        ],
        "primaryAngleDeg": 41,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of え"
      }
    ]
  },
  {
    "id": "kana_o_h",
    "character": "お",
    "syllabary": "HIRAGANA",
    "romaji": "o",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M209.9,322.2c12.7,9.2,33.2,21.8,55,19.4c21.8-2.4,180-47,193.8-52.7c13.8-5.7,36.7-11.5,53.9-18.3",
        "startPoint": [
          210,
          322
        ],
        "endPoint": [
          513,
          271
        ],
        "primaryAngleDeg": 350,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of お"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M380.7,147.9c20.6,9.2,32.9,40.3,28.6,67.7c-22.9,147.9-30.9,417.7-20.6,535.6c6.9,79.1-5.9,95.9-65.3,65.3c-47.1-24-126.1-73.4-126.1-113.6c0-68.8,223.7-216.7,410.6-216.7c158.3,0,229.4,75.7,229.4,158.3c0,75.7-86.1,173.2-245.4,192.7",
        "startPoint": [
          381,
          148
        ],
        "endPoint": [
          592,
          837
        ],
        "primaryAngleDeg": 73,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of お"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M669.7,202.9c49.4,24,81.5,53.9,97.4,75.7c20.8,28.3,3.5,41.3-10.3,45.9",
        "startPoint": [
          670,
          203
        ],
        "endPoint": [
          757,
          324
        ],
        "primaryAngleDeg": 54,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of お"
      }
    ]
  },
  {
    "id": "kana_ka_h",
    "character": "か",
    "syllabary": "HIRAGANA",
    "romaji": "ka",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M225.9,354.3c17.2,14.9,42.7,21.4,79.1,9.2c233.9-78,270.6-37.9,270.6,69.9c0,86.1-11.4,160.2-39,231.7c-69.9,181.3-99.7,159.5-147.9,99.9",
        "startPoint": [
          226,
          354
        ],
        "endPoint": [
          389,
          765
        ],
        "primaryAngleDeg": 68,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of か"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M445,160.6c9.2,12.7,11.8,43.1,4.6,65.3c-45.9,139.9-165.3,375.5-180,402.6c-28.6,52.8-58.5,109-86.1,149.1",
        "startPoint": [
          445,
          161
        ],
        "endPoint": [
          183,
          778
        ],
        "primaryAngleDeg": 113,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of か"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M709.8,290.1c68.8,63.1,121.6,144.5,137.6,228.3",
        "startPoint": [
          710,
          290
        ],
        "endPoint": [
          847,
          518
        ],
        "primaryAngleDeg": 59,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of か"
      }
    ]
  },
  {
    "id": "kana_ki_h",
    "character": "き",
    "syllabary": "HIRAGANA",
    "romaji": "ki",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M279.8,277.5c17.2,6.9,42.6,9.7,53.9,8.1c61.9-9.2,204.1-41.3,243.1-55c19.9-7,32.1-11.5,44.8-19.4",
        "startPoint": [
          280,
          278
        ],
        "endPoint": [
          622,
          211
        ],
        "primaryAngleDeg": 349,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of き"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M332.6,446.8c18.4,7.8,45.6,11,57.7,9.1c66.3-10.4,218.5-46.7,260.3-62.3c21.3-7.9,34.4-12.9,47.9-22",
        "startPoint": [
          333,
          447
        ],
        "endPoint": [
          698,
          372
        ],
        "primaryAngleDeg": 348,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of き"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M385.3,129.5c13.8,8.1,28.7,27,36.7,47c50.5,126.2,146.8,268.4,241.9,373.9c70.1,77.7,83.7,86.1-55,35.6",
        "startPoint": [
          385,
          130
        ],
        "endPoint": [
          609,
          586
        ],
        "primaryAngleDeg": 64,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of き"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M309.6,763.8c97.4,89.4,250,79.1,349.7,45.9",
        "startPoint": [
          310,
          764
        ],
        "endPoint": [
          659,
          810
        ],
        "primaryAngleDeg": 8,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 4 of き"
      }
    ]
  },
  {
    "id": "kana_ku_h",
    "character": "く",
    "syllabary": "HIRAGANA",
    "romaji": "ku",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M556.5,137.6c4.6,14.9,3.2,49.9-9.2,67.7c-61.9,88.3-131.2,175-170.8,224.8c-36.7,45.9-34.8,64.5-8.1,100.9c50.5,68.8,117,172,161.7,250c13.6,23.8,25.2,43.6,41.3,79.1",
        "startPoint": [
          557,
          138
        ],
        "endPoint": [
          571,
          860
        ],
        "primaryAngleDeg": 89,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of く"
      }
    ]
  },
  {
    "id": "kana_ke_h",
    "character": "け",
    "syllabary": "HIRAGANA",
    "romaji": "ke",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M226.3,181.2c11.5,13.8,24,34.4,19.4,58.5c-27.5,145.7-59.6,270.6-44.8,409.4c18.5,172.8,20.6,43.6,61.9-32.1",
        "startPoint": [
          226,
          181
        ],
        "endPoint": [
          263,
          617
        ],
        "primaryAngleDeg": 85,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of け"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M492.4,354.3c19.4,12.7,39.3,17.3,63.1,13.8c75.7-11.5,141.2-23.6,189.2-36.7c25.3-6.8,48.3-10.3,63.1-10.3",
        "startPoint": [
          492,
          354
        ],
        "endPoint": [
          808,
          321
        ],
        "primaryAngleDeg": 354,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of け"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M657.5,131.9c19.5,12.6,26.4,30.7,26.4,47c0,106.6,1.1,187,1.1,276.3c0,190.4-5.7,283.3-114.7,387.6",
        "startPoint": [
          658,
          132
        ],
        "endPoint": [
          570,
          843
        ],
        "primaryAngleDeg": 97,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of け"
      }
    ]
  },
  {
    "id": "kana_ko_h",
    "character": "こ",
    "syllabary": "HIRAGANA",
    "romaji": "ko",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M318.8,245.4c10.3,8.1,26.7,18.4,55,13.8c69.9-11.5,129.4-23.5,205.3-24c142.2-1.1,53.9,45.9-52.8,82.6",
        "startPoint": [
          319,
          245
        ],
        "endPoint": [
          526,
          318
        ],
        "primaryAngleDeg": 19,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of こ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M275.2,625c20.6,133,140,164.8,284.4,153.7c59.6-4.6,109-11.5,161.7-26.4",
        "startPoint": [
          275,
          625
        ],
        "endPoint": [
          721,
          752
        ],
        "primaryAngleDeg": 16,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of こ"
      }
    ]
  },
  {
    "id": "kana_sa_h",
    "character": "さ",
    "syllabary": "HIRAGANA",
    "romaji": "sa",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M247.7,356.9c22.2,12.2,49.4,13.5,76.3,9.7c80.6-11.4,263-71.2,313.3-95.7c25.6-12.5,34.7-17.5,57.6-32.4",
        "startPoint": [
          248,
          357
        ],
        "endPoint": [
          695,
          239
        ],
        "primaryAngleDeg": 345,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of さ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M380.7,127.3c13.8,8.1,33.3,27,41.3,47c50.5,126.1,139.9,253.4,246.5,362.4c73.2,74.8,58.5,91.7-55,28.6",
        "startPoint": [
          381,
          127
        ],
        "endPoint": [
          613,
          565
        ],
        "primaryAngleDeg": 62,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of さ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M323.4,738.5c41.3,107.8,191.6,114.7,352.1,68.8",
        "startPoint": [
          323,
          739
        ],
        "endPoint": [
          676,
          807
        ],
        "primaryAngleDeg": 11,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of さ"
      }
    ]
  },
  {
    "id": "kana_shi_h",
    "character": "し",
    "syllabary": "HIRAGANA",
    "romaji": "shi",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M358.9,160.6c11.5,28.6,8.5,61.8,3.5,94c-19.4,123.9-27.5,243.1-27.5,358.9c0,251.2,182.4,276.3,417.4,158.3",
        "startPoint": [
          359,
          161
        ],
        "endPoint": [
          752,
          772
        ],
        "primaryAngleDeg": 57,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of し"
      }
    ]
  },
  {
    "id": "kana_su_h",
    "character": "す",
    "syllabary": "HIRAGANA",
    "romaji": "su",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M142.2,340.6c26.4,19.4,63.7,13.9,117,2.3c147.9-32.1,331.6-49.4,427.7-59.6c64.2-6.9,109-5.7,162.8,1.1",
        "startPoint": [
          142,
          341
        ],
        "endPoint": [
          850,
          284
        ],
        "primaryAngleDeg": 355,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of す"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M528.6,122.8c18.3,13.8,25.2,29.8,25.2,53.9c0,95.2,0,322.2,0,373.9c0,134.1-143.3,150.3-143.3,16.1c0-130.7,165.1-129.5,165.1,58.5c0,121.6-71.1,197.2-146.8,260.4",
        "startPoint": [
          529,
          123
        ],
        "endPoint": [
          429,
          886
        ],
        "primaryAngleDeg": 97,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of す"
      }
    ]
  },
  {
    "id": "kana_se_h",
    "character": "せ",
    "syllabary": "HIRAGANA",
    "romaji": "se",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M151.4,458.1c26.4,22.2,62.9,14.4,117,4.9c174.3-30.6,302.8-52.5,432.3-70.1c64.1-8.7,109-11.1,162.8-3.3",
        "startPoint": [
          151,
          458
        ],
        "endPoint": [
          863,
          390
        ],
        "primaryAngleDeg": 355,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of せ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M639.8,162.8c18.3,13.8,25.2,29.8,25.2,53.9c0,95.2,0,164,0,215.6c0,235-52.8,213.3-109,174.3",
        "startPoint": [
          640,
          163
        ],
        "endPoint": [
          556,
          607
        ],
        "primaryAngleDeg": 101,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of せ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M326.8,240.8c18.3,13.8,25.2,29.8,25.2,53.9c0,95.2,0,260.4,0,311.9c0,133,58.5,179.4,184.8,179.4c93.9,0,126.1,0.6,207.4-15.4",
        "startPoint": [
          327,
          241
        ],
        "endPoint": [
          744,
          771
        ],
        "primaryAngleDeg": 52,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of せ"
      }
    ]
  },
  {
    "id": "kana_so_h",
    "character": "そ",
    "syllabary": "HIRAGANA",
    "romaji": "so",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M352.3,201.8c17.2,11.5,45.7,9.6,68.8,3.5c59.6-16.1,121.6-34.4,177.8-49.4c42.5-11.3,65.9,18.9,33.2,48.2c-111.2,99.7-285.7,223.9-367,277.5c-57.3,37.8-53.9,52.8,12.7,35.6c156.7-40.6,329.9-79.6,459.8-95.2c86.1-10.3,88.3,1.1,4.6,12.7c-145.1,19.9-315.4,130.7-315.4,243.1c0,118.2,106.6,187,289,152.5",
        "startPoint": [
          352,
          202
        ],
        "endPoint": [
          716,
          830
        ],
        "primaryAngleDeg": 60,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of そ"
      }
    ]
  },
  {
    "id": "kana_ta_h",
    "character": "た",
    "syllabary": "HIRAGANA",
    "romaji": "ta",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M223.7,324.6c12.7,5.7,35.6,13.9,58.5,10.3c59.6-9.2,149.1-26.4,228.3-43.6c24.2-5.2,49.4-13.8,69.9-21.8",
        "startPoint": [
          224,
          325
        ],
        "endPoint": [
          580,
          269
        ],
        "primaryAngleDeg": 351,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of た"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M412.8,154.9c6.9,11.5,8,33.2,3.5,48.2c-58.3,192.1-117,333.7-173.2,480.5c-12.5,32.7-43.6,107.8-55,134.1",
        "startPoint": [
          413,
          155
        ],
        "endPoint": [
          188,
          818
        ],
        "primaryAngleDeg": 109,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of た"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M517.2,488.5c113.6-25.2,167.4-33.9,216.7-28.6c138.7,14.9-10.3,20.6-39,44.8",
        "startPoint": [
          517,
          489
        ],
        "endPoint": [
          695,
          505
        ],
        "primaryAngleDeg": 5,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of た"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M496.6,754.6c40.2,64.2,130.7,74.5,316.5,51.6",
        "startPoint": [
          497,
          755
        ],
        "endPoint": [
          813,
          806
        ],
        "primaryAngleDeg": 9,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 4 of た"
      }
    ]
  },
  {
    "id": "kana_chi_h",
    "character": "ち",
    "syllabary": "HIRAGANA",
    "romaji": "chi",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M224.8,299.3c12.7,5.7,35.6,13.9,58.5,10.3c59.6-9.2,167.4-37.8,246.6-55c24.2-5.2,49.4-13.8,69.9-21.8",
        "startPoint": [
          225,
          299
        ],
        "endPoint": [
          600,
          233
        ],
        "primaryAngleDeg": 350,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ち"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M418.5,143.3c6.9,11.5,6.5,32.8,3.5,48.2c-27.5,137.6-39,207.2-76.9,354.3c-29.8,115.8-49.4,102,33.2,40.2c76.1-57,181.2-87.2,261.5-87.2c79.1,0,133.8,53.9,133,133c-1.1,123.9-151.4,189.2-274.1,213.3",
        "startPoint": [
          419,
          143
        ],
        "endPoint": [
          499,
          845
        ],
        "primaryAngleDeg": 83,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ち"
      }
    ]
  },
  {
    "id": "kana_tsu_h",
    "character": "つ",
    "syllabary": "HIRAGANA",
    "romaji": "tsu",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M128.4,410.6c17.2,14.9,42.9,19.2,74.5,5.7c164-69.9,275.2-102,411.7-99.8c115.2,1.9,210.8,65.8,209.8,175.9c-1.7,172.2-227.1,263.4-412.9,294.3",
        "startPoint": [
          128,
          411
        ],
        "endPoint": [
          412,
          787
        ],
        "primaryAngleDeg": 53,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of つ"
      }
    ]
  },
  {
    "id": "kana_te_h",
    "character": "て",
    "syllabary": "HIRAGANA",
    "romaji": "te",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M188.1,242c17.2,14.9,40.6,18.1,74.5,12.6c199.5-32.1,302.8-47,459.8-76.9c113.2-21.5,119.3-8.1,3.5,12.7c-164.1,29.3-309.9,175.4-309.9,345.1c0,188.1,164.3,277.5,322.6,277.5",
        "startPoint": [
          188,
          242
        ],
        "endPoint": [
          739,
          813
        ],
        "primaryAngleDeg": 46,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of て"
      }
    ]
  },
  {
    "id": "kana_to_h",
    "character": "と",
    "syllabary": "HIRAGANA",
    "romaji": "to",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M325.7,168.6c16,6.8,33.2,24,37.8,49.3c4.6,25.2,43.6,229.4,49.4,258",
        "startPoint": [
          326,
          169
        ],
        "endPoint": [
          413,
          476
        ],
        "primaryAngleDeg": 74,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of と"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M716.7,233.9c2.3,17.2,0.4,37.5-20.6,52.8c-58.4,42.5-121.3,77.9-208.7,139.9c-118.2,83.7-198.3,168.6-198.3,252.3c0,92.8,78,127.3,246.6,127.3c57.3,0,135.3-1.1,198.3-11.5",
        "startPoint": [
          717,
          234
        ],
        "endPoint": [
          734,
          795
        ],
        "primaryAngleDeg": 88,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of と"
      }
    ]
  },
  {
    "id": "kana_na_h",
    "character": "な",
    "syllabary": "HIRAGANA",
    "romaji": "na",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M209.9,265.7c10.8,5.3,30.3,10.1,50.2,9.6c50.7-1.2,100-9,151.6-22.2c44.2-11.3,83.8-28.6,104.4-38.7",
        "startPoint": [
          210,
          266
        ],
        "endPoint": [
          516,
          214
        ],
        "primaryAngleDeg": 350,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of な"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M394.4,128.4c5.8,8.2,5.1,23.1,2.8,34.1c-27.2,129.9-72.9,243.7-130.7,347.4c-18.8,33.9-39,66.4-60.1,97.7",
        "startPoint": [
          394,
          128
        ],
        "endPoint": [
          206,
          608
        ],
        "primaryAngleDeg": 111,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of な"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M662.9,213.3c63.1,22.9,115.8,51.6,135.3,87.2c37.2,68-2.3,31-32.1,35.6",
        "startPoint": [
          663,
          213
        ],
        "endPoint": [
          766,
          336
        ],
        "primaryAngleDeg": 50,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of な"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M631.9,409.4c-9.2,17.2-19.6,48.1-17.2,75.7c5.7,64.2,13.8,120.4,13.8,189.2c0,183.5-255.8,181.2-255.8,86.1c0-51.6,75.7-75.7,127.3-75.7c80.3,0,197.2,29.8,272.9,105.5",
        "startPoint": [
          632,
          409
        ],
        "endPoint": [
          773,
          790
        ],
        "primaryAngleDeg": 70,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 4 of な"
      }
    ]
  },
  {
    "id": "kana_ni_h",
    "character": "に",
    "syllabary": "HIRAGANA",
    "romaji": "ni",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M225,208.7c11.5,13.8,14.9,34.4,10.3,58.5c-27.5,145.7-82.6,298.2-67.7,436.9c18.5,172.8,41.3,52.8,78-32.1",
        "startPoint": [
          225,
          209
        ],
        "endPoint": [
          246,
          672
        ],
        "primaryAngleDeg": 87,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of に"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M488.1,281.1c8.8,7.2,22.4,14.5,46.8,12.4c64-5.6,137.7-30.3,202.2-30.8c121-1,13.8,34.4-77,67.4",
        "startPoint": [
          488,
          281
        ],
        "endPoint": [
          660,
          330
        ],
        "primaryAngleDeg": 16,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of に"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M481.9,623.9c16.1,118.5,109.4,146.9,222.3,137c46.6-4.1,81.7-7.3,130.9-18.9",
        "startPoint": [
          482,
          624
        ],
        "endPoint": [
          835,
          742
        ],
        "primaryAngleDeg": 18,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of に"
      }
    ]
  },
  {
    "id": "kana_nu_h",
    "character": "ぬ",
    "syllabary": "HIRAGANA",
    "romaji": "nu",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M232.8,261.5c18.3,12.7,27.2,29.6,31,53.9c17.2,111.7,37.8,219.4,78.3,318.1c16.4,40,36.3,76.4,62.8,114.3",
        "startPoint": [
          233,
          261
        ],
        "endPoint": [
          405,
          748
        ],
        "primaryAngleDeg": 71,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ぬ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M524,176.6c8.1,19.4,9.7,34.8,5.7,53.9c-28.6,137.6-120.6,365.2-166.2,446.1c-108.9,192.7-189.2,11.5-189.2-41.3c0-207.6,401.4-406,572.1-271.5c70.3,55.3,89.9,133.8,83.9,214.1c-18.3,245.4-301.7,260.4-301.7,154.9c0-86.1,159.4-65.3,248.8-10.3c28.4,17.5,66.5,48.2,87.2,68.8",
        "startPoint": [
          524,
          177
        ],
        "endPoint": [
          865,
          791
        ],
        "primaryAngleDeg": 61,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ぬ"
      }
    ]
  },
  {
    "id": "kana_ne_h",
    "character": "ね",
    "syllabary": "HIRAGANA",
    "romaji": "ne",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M305.4,133c14.9,14.9,19.3,29.4,17.2,53.9c-9.4,109.4-18.9,290.5-23.2,487.3c-0.9,42.4-1.7,85.4-2,128.4",
        "startPoint": [
          305,
          133
        ],
        "endPoint": [
          297,
          803
        ],
        "primaryAngleDeg": 91,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ね"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M157.4,347.5c14.9,8.1,29.8,12.7,51.6,6.9c19.6-5.1,71.6-21.2,113.5-37c57.4-21.6,63.1-13.5,28.6,33.3c-51,69.1-119.4,159.4-169.5,245.6c-51.4,88.3-31.7,76.1,18.3,27.5c175.4-170.8,353.2-358.9,496.5-358.9c104.4,0,118.2,103.2,118.2,298.2c0,262.6-276.9,228.3-276.9,149.2c0-88.3,171.8-71.7,257.4-17.2c25.2,16.1,53.9,44.8,68.8,61.9",
        "startPoint": [
          157,
          348
        ],
        "endPoint": [
          864,
          757
        ],
        "primaryAngleDeg": 30,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ね"
      }
    ]
  },
  {
    "id": "kana_no_h",
    "character": "の",
    "syllabary": "HIRAGANA",
    "romaji": "no",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M493.8,262.6c9.2,13.8,12.3,37.8,8.1,60.7c-16.1,87.2-63.2,229.4-98.6,303.9c-88.3,185.9-151.8,135.2-223.7-18.2c-83.8-178.9,215.6-448.4,464.5-370.5c297.1,93.1,256.9,501.1-43.6,558.5",
        "startPoint": [
          494,
          263
        ],
        "endPoint": [
          600,
          797
        ],
        "primaryAngleDeg": 79,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of の"
      }
    ]
  },
  {
    "id": "kana_ha_h",
    "character": "は",
    "syllabary": "HIRAGANA",
    "romaji": "ha",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M224.9,165.1c11.5,13.8,19.7,36.7,14.9,60.7c-32.1,161.7-64,333.9-36.7,503.5c22.9,142.2,10.3,18.3,51.6-57.3",
        "startPoint": [
          225,
          165
        ],
        "endPoint": [
          255,
          672
        ],
        "primaryAngleDeg": 87,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of は"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M455.4,347.6c22.1,14.4,44.5,19.8,71.6,15.7c85.9-13.1,160.2-27,214.7-41.9c28.6-7.9,54.7-11.8,71.6-11.8",
        "startPoint": [
          455,
          348
        ],
        "endPoint": [
          813,
          310
        ],
        "primaryAngleDeg": 354,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of は"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M640.1,151.4c20.6,19.4,26.4,37.8,26.4,59.6c0,21.8,13.8,354.3,13.8,440.4c0,206.4-280.9,180-280.9,96.3c0-89.4,219.1-51.6,270.6-26.4c51.6,25.1,109.9,75.8,122.6,86.1",
        "startPoint": [
          640,
          151
        ],
        "endPoint": [
          793,
          807
        ],
        "primaryAngleDeg": 77,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of は"
      }
    ]
  },
  {
    "id": "kana_hi_h",
    "character": "ひ",
    "syllabary": "HIRAGANA",
    "romaji": "hi",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M183.5,230.5c11.5,8.1,34.4,20.6,59.6,12.7c25.2-8,67.1-21.8,104.4-41.3c55-28.6,77.2-9.3,39,36.7c-248.9,299.3-218,536.7-13.9,576.9c165.8,32.7,345.2-150.3,326.9-518.4c-6.6-133-1.6-135.6,37.8-16.1c34.5,104.4,94.1,190.5,148.1,243.1",
        "startPoint": [
          183,
          230
        ],
        "endPoint": [
          885,
          524
        ],
        "primaryAngleDeg": 23,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ひ"
      }
    ]
  },
  {
    "id": "kana_fu_h",
    "character": "ふ",
    "syllabary": "HIRAGANA",
    "romaji": "fu",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M391.1,143.3c33.2,31,68.8,49.4,116.9,56.2c88,12.6,32.1,31-17.2,56.1",
        "startPoint": [
          391,
          143
        ],
        "endPoint": [
          491,
          256
        ],
        "primaryAngleDeg": 48,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ふ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M400.3,430.1c17.2,42.4,68.8,86.3,130.7,160.6c97.4,116.9,4.5,275.2-175.5,198.3",
        "startPoint": [
          400,
          430
        ],
        "endPoint": [
          356,
          789
        ],
        "primaryAngleDeg": 97,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ふ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M151.4,673.2c6.9,36.7,17.2,74.5,45.9,92.8c10.6,6.8,1.1-31,121.6-83.7",
        "startPoint": [
          151,
          673
        ],
        "endPoint": [
          319,
          682
        ],
        "primaryAngleDeg": 3,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of ふ"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M735.1,567.7c47,31,94.3,68.7,104.4,81.5c61.9,78-2.3,42.4-42.4,65.3",
        "startPoint": [
          735,
          568
        ],
        "endPoint": [
          797,
          714
        ],
        "primaryAngleDeg": 67,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 4 of ふ"
      }
    ]
  },
  {
    "id": "kana_he_h",
    "character": "へ",
    "syllabary": "HIRAGANA",
    "romaji": "he",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M137.6,447.2c20.6,14.9,42.8,18,64.2-3.5c33.2-33.2,68.4-60,103.2-96.3c50.5-52.8,77.8-43.6,120.4-8.1c111.2,92.8,278.7,230.5,306.2,251.2c27.5,20.7,113.5,95.2,127.2,106.7",
        "startPoint": [
          138,
          447
        ],
        "endPoint": [
          859,
          697
        ],
        "primaryAngleDeg": 19,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of へ"
      }
    ]
  },
  {
    "id": "kana_ho_h",
    "character": "ほ",
    "syllabary": "HIRAGANA",
    "romaji": "ho",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M224.9,172c11.5,13.8,19.7,36.7,14.9,60.7c-32.1,161.7-64,343.1-36.7,512.7c22.9,142.2,10.3,18.3,51.6-57.3",
        "startPoint": [
          225,
          172
        ],
        "endPoint": [
          255,
          688
        ],
        "primaryAngleDeg": 87,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ほ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M487,193.9c17.4,11.7,35,16.1,56.3,12.8c67.5-10.7,126-22,168.9-34.2c22.6-6.4,43-9.6,56.2-9.6",
        "startPoint": [
          487,
          194
        ],
        "endPoint": [
          768,
          163
        ],
        "primaryAngleDeg": 354,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ほ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M493.9,406.4c20.3,13.2,40.9,18.2,65.7,14.4c78.8-12,144.8-22.4,194.8-36.1c26.3-7.2,52.5-10.8,68-10.8",
        "startPoint": [
          494,
          406
        ],
        "endPoint": [
          822,
          374
        ],
        "primaryAngleDeg": 354,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of ほ"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M665.2,211c12.7,14.9,14.9,37.8,14.9,59.6c0,21.8,18.3,322.2,18.3,408.3c0,160.6-274.1,157.1-274.1,73.4c0-89.4,196.1-72.3,270.6-26.4c48.9,30.1,110.1,75.7,122.8,86.1",
        "startPoint": [
          665,
          211
        ],
        "endPoint": [
          818,
          812
        ],
        "primaryAngleDeg": 76,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 4 of ほ"
      }
    ]
  },
  {
    "id": "kana_ma_h",
    "character": "ま",
    "syllabary": "HIRAGANA",
    "romaji": "ma",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M273.7,296.1c20.2,10.6,40.6,13.8,65.5,11.6c105.9-9.5,238-28.6,318-44.5c26.3-5.2,50-4,65.4-4",
        "startPoint": [
          274,
          296
        ],
        "endPoint": [
          723,
          259
        ],
        "primaryAngleDeg": 355,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ま"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M310.4,475.6c22.5,14.8,45.3,15.8,72.8,11.6c87.3-13.4,163.9-28.4,248-47.3c29.5-6.6,58.2-12.1,75.3-12.1",
        "startPoint": [
          310,
          476
        ],
        "endPoint": [
          707,
          428
        ],
        "primaryAngleDeg": 353,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ま"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M512,128.4c13.9,16.5,16.5,41.9,16.5,66c0,24.1,4.2,402.6,4.2,497.7c0,195.4-275.9,183.1-275.9,90.5c0-99,237.4-91.1,353.9-29.2c56.1,29.8,106,58.5,135.8,83.8",
        "startPoint": [
          512,
          128
        ],
        "endPoint": [
          747,
          837
        ],
        "primaryAngleDeg": 72,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of ま"
      }
    ]
  },
  {
    "id": "kana_mi_h",
    "character": "み",
    "syllabary": "HIRAGANA",
    "romaji": "mi",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M298.2,238.5c17.2,16.1,37.2,15.6,63.1,11.5c35.6-5.7,69.9-16.1,109-28.6c39.1-12.6,57.3-1.1,41.3,47c-16.1,48.1-61.1,159.5-110.1,276.3c-125,298.3-268.4,268.4-268.4,170.9c0-130.7,187.9-140.9,302.8-123.9c169.7,25.2,275.2,60.7,407.2,130.7",
        "startPoint": [
          298,
          239
        ],
        "endPoint": [
          843,
          722
        ],
        "primaryAngleDeg": 42,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of み"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M728.3,502.3c6.9,21.8,4.5,40.1,0,57.3c-19.4,74.5-68.8,229.4-202.9,309.6",
        "startPoint": [
          728,
          502
        ],
        "endPoint": [
          525,
          869
        ],
        "primaryAngleDeg": 119,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 2 of み"
      }
    ]
  },
  {
    "id": "kana_mu_h",
    "character": "む",
    "syllabary": "HIRAGANA",
    "romaji": "mu",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M179.7,290.4c19.3,14.2,38.9,15.2,62.5,11.1c75-12.9,140.6-27.3,212.8-45.5c25.3-6.3,49.9-11.7,64.7-11.7",
        "startPoint": [
          180,
          290
        ],
        "endPoint": [
          520,
          244
        ],
        "primaryAngleDeg": 352,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of む"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M339.6,142.2c14.9,11.5,21.2,26.4,19.4,48.2c-8.1,102-13.8,190.4-36.7,320c-33.1,187.5-176.6,155.9-170.8,67.6c4.6-71,57.3-118,115.8-123.9c45.9-4.6,131,17.7,53.9,137.6c-115.8,180-104.8,224.9,46.9,234.3c100.7,6.2,176.7,6.6,261.4-8.4c129.8-22.9,67.9-24.1,67.9-102.1",
        "startPoint": [
          340,
          142
        ],
        "endPoint": [
          697,
          716
        ],
        "primaryAngleDeg": 58,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of む"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M720.4,332.6c63.1,28.6,107.4,54.6,136.5,92.8c57.3,75.7-12.7,33.2-41.3,41.3",
        "startPoint": [
          720,
          333
        ],
        "endPoint": [
          816,
          467
        ],
        "primaryAngleDeg": 54,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of む"
      }
    ]
  },
  {
    "id": "kana_me_h",
    "character": "め",
    "syllabary": "HIRAGANA",
    "romaji": "me",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M252.1,291.3c16.1,9.2,22.1,28.3,22.9,48.2c4.6,106.6,25.2,215.6,66.5,287.9c12.8,22.4,49.4,78,66.5,95.2",
        "startPoint": [
          252,
          291
        ],
        "endPoint": [
          408,
          723
        ],
        "primaryAngleDeg": 70,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of め"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M546.8,177.8c9.2,13.8,12.4,37.8,8.1,60.7c-25.2,134.1-125,346.3-184.4,433.4c-112.7,157.2-153.9,120.6-204.4,5.9c-49.4-141.1,242.2-387,490.1-323.7c266.8,75.9,219.8,422.2-73.2,460.1",
        "startPoint": [
          547,
          178
        ],
        "endPoint": [
          583,
          814
        ],
        "primaryAngleDeg": 87,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of め"
      }
    ]
  },
  {
    "id": "kana_mo_h",
    "character": "も",
    "syllabary": "HIRAGANA",
    "romaji": "mo",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M451.1,135.3c17.2,17.2,17.1,41.5,10.3,73.4c-27.5,130.7-45.9,244.2-64.2,386.4c-23.4,181-6.9,274.1,156,273.9c185.8-0.2,262.7-120.3,183.6-327.8",
        "startPoint": [
          451,
          135
        ],
        "endPoint": [
          737,
          541
        ],
        "primaryAngleDeg": 55,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of も"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M243.5,317.6c10.3,8.1,26.3,20.3,55,18.3c102-6.9,183.5-19.4,254.5-31.7c35.6-6.1,53.9-10.7,81.5-9.5",
        "startPoint": [
          243,
          318
        ],
        "endPoint": [
          634,
          295
        ],
        "primaryAngleDeg": 357,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of も"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M242.4,489.7c-13.8,36.7,9.2,61.9,71.1,61.9c80.3,0,161.7-9.2,209.9-17.2c18.4-3,49.4-9.2,68.8-16.1",
        "startPoint": [
          242,
          490
        ],
        "endPoint": [
          592,
          518
        ],
        "primaryAngleDeg": 5,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of も"
      }
    ]
  },
  {
    "id": "kana_ya_h",
    "character": "や",
    "syllabary": "HIRAGANA",
    "romaji": "ya",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M165.1,453c17.2,14.9,48.2,22.9,79.1,8.1c169.8-81.5,328.1-177.8,466.3-176.7c82.8,1.3,146.9,37.9,146.1,112.8c0,76.4-99.8,152.1-224.8,163.6",
        "startPoint": [
          165,
          453
        ],
        "endPoint": [
          632,
          561
        ],
        "primaryAngleDeg": 13,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of や"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M432.4,145.7c47,8.1,95.5,37.2,105.5,60.7c19.4,45.9-9.2,21.8-26.4,24",
        "startPoint": [
          432,
          146
        ],
        "endPoint": [
          511,
          230
        ],
        "primaryAngleDeg": 47,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of や"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M275.2,223.7c21.8,17.2,30.1,26.3,35.6,48.2c24,96.3,102,377.2,135.3,481.7c6,18.7,17.2,57.3,26.4,86.1",
        "startPoint": [
          275,
          224
        ],
        "endPoint": [
          473,
          840
        ],
        "primaryAngleDeg": 72,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of や"
      }
    ]
  },
  {
    "id": "kana_yu_h",
    "character": "ゆ",
    "syllabary": "HIRAGANA",
    "romaji": "yu",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M193.1,232.8c12.7,13.8,18.5,37.9,13.8,57.3c-26.4,107.8-36.7,204.1-19.4,321.1c25.4,172.9,10.3,35.6,29.8-13.8c82.6-208.7,249.9-316.5,407.2-316.5c154.9,0,200.7,104.4,200.7,185.8c0,251.2-283.3,271.7-394.5,153.7",
        "startPoint": [
          193,
          233
        ],
        "endPoint": [
          431,
          620
        ],
        "primaryAngleDeg": 58,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ゆ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M536,153.7c24,16.1,29.1,28.7,32.1,65.3c8.1,96.3,12.8,171.7,14.9,269.5c4.6,220.2-57.3,293.6-113.6,360.1",
        "startPoint": [
          536,
          154
        ],
        "endPoint": [
          469,
          849
        ],
        "primaryAngleDeg": 96,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ゆ"
      }
    ]
  },
  {
    "id": "kana_yo_h",
    "character": "よ",
    "syllabary": "HIRAGANA",
    "romaji": "yo",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M534.3,324.6c68.8-11.7,126.1-24.1,169.7-37.6c22.9-7.1,43.8-10.6,57.3-10.6",
        "startPoint": [
          534,
          325
        ],
        "endPoint": [
          761,
          276
        ],
        "primaryAngleDeg": 348,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of よ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M501.1,127.3c20.6,19.4,27.3,37.9,26.4,59.6c-6.9,156-1.1,320,12.8,490.8c17.2,211.7-320.1,191.6-320.1,105.5c0-110.1,240.8-73.4,330.1-37.8c74.3,29.6,105.7,44.8,169.9,95.2",
        "startPoint": [
          501,
          127
        ],
        "endPoint": [
          720,
          841
        ],
        "primaryAngleDeg": 73,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of よ"
      }
    ]
  },
  {
    "id": "kana_ra_h",
    "character": "ら",
    "syllabary": "HIRAGANA",
    "romaji": "ra",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M324.1,137.6c34.4,27.5,84.6,40.5,151.4,39c102-2.3-2.3,21.8-11.5,32.1",
        "startPoint": [
          324,
          138
        ],
        "endPoint": [
          464,
          209
        ],
        "primaryAngleDeg": 27,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ら"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M328.7,328c-19.6,39.8-25.6,79.5-28.5,121.5c-3.9,53.6-2.8,110.6-19.6,175.5c-29,112.6,13.7,43.8,27.5,32.1c109-91.7,199.1-116.2,299.2-114.6c84.5,1.4,154.6,47.6,153.8,127.3c-1.1,124.8-130.6,197.2-298.1,206.3",
        "startPoint": [
          329,
          328
        ],
        "endPoint": [
          463,
          876
        ],
        "primaryAngleDeg": 76,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ら"
      }
    ]
  },
  {
    "id": "kana_ri_h",
    "character": "り",
    "syllabary": "HIRAGANA",
    "romaji": "ri",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M355.5,231.7c11.5,13.8,20.6,37,14.9,60.7c-26.4,111.3-57.7,272-39,388.8c18.3,114.7,16.1-6.9,51.6-57.3",
        "startPoint": [
          356,
          232
        ],
        "endPoint": [
          383,
          624
        ],
        "primaryAngleDeg": 86,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of り"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M636.4,172c20.6,19.4,26.4,37.8,26.4,59.6c0,21.8,0,242,0,328c0,151.4-45.9,236.2-115.8,303.9",
        "startPoint": [
          636,
          172
        ],
        "endPoint": [
          547,
          863
        ],
        "primaryAngleDeg": 97,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of り"
      }
    ]
  },
  {
    "id": "kana_ru_h",
    "character": "る",
    "syllabary": "HIRAGANA",
    "romaji": "ru",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M314.8,187c16.1,11.5,42.4,24,78,13.8c35.6-10.3,88.3-22.9,143.3-42.4c55-19.4,68.8-1.1,40.2,39c-28.6,40.1-173.3,225.9-254.6,311.9c-78,82.6-120.1,109.1,6.9,29.8c143.3-89.4,394.5-99.8,394.5,122.8c0,206.4-375,224.8-375,115.8c0-103.2,166.2-80.3,223.7-3.5",
        "startPoint": [
          315,
          187
        ],
        "endPoint": [
          572,
          774
        ],
        "primaryAngleDeg": 66,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of る"
      }
    ]
  },
  {
    "id": "kana_re_h",
    "character": "れ",
    "syllabary": "HIRAGANA",
    "romaji": "re",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M316.3,119.3c13.8,12.7,26,34.3,22.9,58.5c-4.6,36.7-25.2,408.3-25.2,485.1c0,76.9,1.1,152.5,1.1,178.9",
        "startPoint": [
          316,
          119
        ],
        "endPoint": [
          315,
          842
        ],
        "primaryAngleDeg": 90,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of れ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M155.8,373.9c19.4,12.7,34.3,13.4,68.8,0c41.3-16.1,60.1-24.4,119.3-50.5c39-17.2,40.4,2.2,22.9,32.1c-48.2,82.6-96.3,153.7-173.2,253.4c-69.3,90-63.6,117.9,29.8,28.6c128.4-122.8,186.6-181.3,310.8-298.2c58.5-55,177.9-110.9,166.4,8.1c-9.4,97.5-17.3,203-21,282.1c-9.4,199.2,105.8,165.1,184.9,79.2",
        "startPoint": [
          156,
          374
        ],
        "endPoint": [
          864,
          709
        ],
        "primaryAngleDeg": 25,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of れ"
      }
    ]
  },
  {
    "id": "kana_ro_h",
    "character": "ろ",
    "syllabary": "HIRAGANA",
    "romaji": "ro",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M339,200.7c13.8,18.3,42.4,33.2,78,22.9c35.6-10.3,74.5-20.6,129.5-40.2c55-19.5,59.9-0.9,31,39c-72.3,99.8-165.1,208.7-252.3,323.4c-68.7,90.5-98,103.9,26.4,20.6c159.4-106.6,427.7-128.4,427.7,74.5c0,143.3-146.8,206.4-294.7,230.5",
        "startPoint": [
          339,
          201
        ],
        "endPoint": [
          485,
          871
        ],
        "primaryAngleDeg": 78,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ろ"
      }
    ]
  },
  {
    "id": "kana_wa_h",
    "character": "わ",
    "syllabary": "HIRAGANA",
    "romaji": "wa",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M353.5,135.3c13.8,12.7,20.4,34.2,18.3,58.5c-9.2,108.9-25.2,408.2-25.2,485c0,76.9-5.7,152.5-5.7,178.9",
        "startPoint": [
          353,
          135
        ],
        "endPoint": [
          341,
          858
        ],
        "primaryAngleDeg": 91,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of わ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M160.8,373.9c19.4,12.7,33.8,11.9,68.8,0c53.9-18.3,89.9-29,149.1-55c39-17.2,56.1,0,25.2,36.7c-61.7,73-119.3,151.4-202.9,255.8c-71.1,88.6-69.2,112,27.5,26.4c200.7-177.8,456.4-326.8,582.6-192.7c131.7,140.1,14.9,336-214.5,391",
        "startPoint": [
          161,
          374
        ],
        "endPoint": [
          597,
          836
        ],
        "primaryAngleDeg": 47,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of わ"
      }
    ]
  },
  {
    "id": "kana_wo_h",
    "character": "を",
    "syllabary": "HIRAGANA",
    "romaji": "wo",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M262,255.7c14.9,10.4,29.1,15,55.1,10.3c99.6-18.3,153.6-30.9,226.7-43.3c33.4-5.7,51.8-8.5,77.1-6.9",
        "startPoint": [
          262,
          256
        ],
        "endPoint": [
          621,
          216
        ],
        "primaryAngleDeg": 354,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of を"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M458.1,131.9c6.9,9.2,13.6,29.5,3.5,51.6c-42.4,92.8-91.7,190.4-157.1,277.5c-84.9,113.1-84.9,102.7,19.4,22.9c82.6-63.1,217.9-111.2,209.9,182.4",
        "startPoint": [
          458,
          132
        ],
        "endPoint": [
          534,
          666
        ],
        "primaryAngleDeg": 82,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of を"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M762,365.9c5.7,16.1,0,36.7-27.5,52.8c-27.5,16.1-455.2,221.7-410.6,350.9c30.1,87,164.5,83.7,275,71.1c41.1-4.7,83.9-10.3,113.8-16.1",
        "startPoint": [
          762,
          366
        ],
        "endPoint": [
          713,
          825
        ],
        "primaryAngleDeg": 96,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of を"
      }
    ]
  },
  {
    "id": "kana_n_h",
    "character": "ん",
    "syllabary": "HIRAGANA",
    "romaji": "n",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M517,151.4c6.9,16.1,10.4,53.5-3.5,75.7c-64.2,103.2-249.7,398.8-310.8,498.8c-82.6,135.3-69.9,149.1,13.8,11.5c163.9-269.4,293.6-218,293.6-61.9c0,229.4,174.3,243.1,314.2-45.9",
        "startPoint": [
          517,
          151
        ],
        "endPoint": [
          824,
          630
        ],
        "primaryAngleDeg": 57,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ん"
      }
    ]
  },
  {
    "id": "kana_a_k",
    "character": "ア",
    "syllabary": "KATAKANA",
    "romaji": "a",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M215.6,240.8c22.1,14.3,36.5,13.2,78.1,6.9c104.6-16.1,346.5-50.5,442.9-62.2c48-5.9,73.3,18.9,24,55.4c-61.9,45.9-120.4,87.2-213.3,146.8",
        "startPoint": [
          216,
          241
        ],
        "endPoint": [
          547,
          388
        ],
        "primaryAngleDeg": 24,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ア"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M487.3,377.2c7.2,13.8,9.4,29.7,5.3,48.4c-37.1,169.5-91,292.2-182.8,417.2",
        "startPoint": [
          487,
          377
        ],
        "endPoint": [
          310,
          843
        ],
        "primaryAngleDeg": 111,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ア"
      }
    ]
  },
  {
    "id": "kana_i_k",
    "character": "イ",
    "syllabary": "KATAKANA",
    "romaji": "i",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M639.9,153.7c1.1,16.1-3.1,35.4-14.9,50.5c-92.9,118.1-217.9,271.8-418.6,393.3",
        "startPoint": [
          640,
          154
        ],
        "endPoint": [
          206,
          597
        ],
        "primaryAngleDeg": 134,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of イ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M517.2,402.6c9.2,10.3,11.5,27.5,11.5,42.4c0,14.9,0,300.5,0,317.6c0,17.2-1.2,83.8-1.2,107.9",
        "startPoint": [
          517,
          403
        ],
        "endPoint": [
          528,
          870
        ],
        "primaryAngleDeg": 89,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of イ"
      }
    ]
  },
  {
    "id": "kana_u_k",
    "character": "ウ",
    "syllabary": "KATAKANA",
    "romaji": "u",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M488.5,134.1c9.2,10.3,11.5,27.5,11.5,42.4c0,14.9,0,98.7,0,116",
        "startPoint": [
          489,
          134
        ],
        "endPoint": [
          500,
          292
        ],
        "primaryAngleDeg": 86,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ウ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M243.1,286.7c9.2,10.3,11.2,27.5,11.5,42.4c0.8,40.8,2.7,100.5,4.1,150.2c0.6,22.9,1.3,43.8,1.7,59.6",
        "startPoint": [
          243,
          287
        ],
        "endPoint": [
          260,
          539
        ],
        "primaryAngleDeg": 86,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ウ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M267.2,329.2c177.8-20.6,369.3-39,449.5-50.5c80.3-11.5,76,7.7,57.3,63.1c-45.9,136.5-184.6,399.1-376.1,519.4",
        "startPoint": [
          267,
          329
        ],
        "endPoint": [
          398,
          861
        ],
        "primaryAngleDeg": 76,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of ウ"
      }
    ]
  },
  {
    "id": "kana_e_k",
    "character": "エ",
    "syllabary": "KATAKANA",
    "romaji": "e",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M292.4,327.3c21.3,6.5,47.2,6.1,68.6,2.7c78.6-12.4,205.5-26.1,308.8-35.3c20.7-1.8,41.5-1.7,62.1,2",
        "startPoint": [
          292,
          327
        ],
        "endPoint": [
          732,
          297
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of エ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M489.4,349.8c9.2,10.3,12,27.5,11.5,42.4c-1.7,43.5-4.7,118.3-7.6,204.1c-0.7,21.2-1.5,43.1-2.1,65.3",
        "startPoint": [
          489,
          350
        ],
        "endPoint": [
          491,
          662
        ],
        "primaryAngleDeg": 90,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of エ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M174.3,692.3c31.3,8.6,69.4,8.1,101,3.6c163.1-22.8,316.8-35.4,463.8-35.8c30.6-0.1,66.3,3.9,96,16.5",
        "startPoint": [
          174,
          692
        ],
        "endPoint": [
          835,
          677
        ],
        "primaryAngleDeg": 359,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of エ"
      }
    ]
  },
  {
    "id": "kana_o_k",
    "character": "オ",
    "syllabary": "KATAKANA",
    "romaji": "o",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M178.9,347.2c35.9,16.3,69.3,14.2,101,9.4c165.4-25.2,315.6-41.3,463.8-49.6c30.6-1.7,58.3,1.6,96,12.7",
        "startPoint": [
          179,
          347
        ],
        "endPoint": [
          840,
          320
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of オ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M553.9,150.3c12.1,13.7,15.1,36.4,15.1,56.1c0,73.4-2.3,424.1-2.3,537.9c0,187-53.9,68.8-84.9,50.5",
        "startPoint": [
          554,
          150
        ],
        "endPoint": [
          482,
          795
        ],
        "primaryAngleDeg": 96,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of オ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M553.1,333.8c0,14.9-15,33.1-33.2,55c-72.3,87.2-193.8,208.7-317.6,302.8",
        "startPoint": [
          553,
          334
        ],
        "endPoint": [
          202,
          692
        ],
        "primaryAngleDeg": 134,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 3 of オ"
      }
    ]
  },
  {
    "id": "kana_ka_k",
    "character": "カ",
    "syllabary": "KATAKANA",
    "romaji": "ka",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M233.9,372.7c17.2,11.5,41.4,17.2,65.3,13.8c164-22.9,300.7-41.4,389.9-53.9c65.3-9.2,97.2,2.2,79.1,72.3c-19.4,75.7-41,163.4-84.9,267.2c-96.2,228.3-129.4,133.1-176.5,109",
        "startPoint": [
          234,
          373
        ],
        "endPoint": [
          507,
          781
        ],
        "primaryAngleDeg": 56,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of カ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M512.7,157.1c8.1,14.9,11.8,35.1,6.9,61.9c-39,209.9-145.7,415.1-277.5,540.2",
        "startPoint": [
          513,
          157
        ],
        "endPoint": [
          242,
          759
        ],
        "primaryAngleDeg": 114,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of カ"
      }
    ]
  },
  {
    "id": "kana_ki_k",
    "character": "キ",
    "syllabary": "KATAKANA",
    "romaji": "ki",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M247.7,371.6c16.1,5.7,43.8,10,66.5,3.5c107.8-31,280.9-74.6,344-90.6c24-6.1,61.9-10.3,82.6-9.2",
        "startPoint": [
          248,
          372
        ],
        "endPoint": [
          741,
          275
        ],
        "primaryAngleDeg": 349,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of キ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M178.9,603.7c20.9,7.7,57.2,10.8,86.8,1.6c163.2-51.3,299.7-83.4,451.1-119.2c31.5-7.4,80.8-13.9,107.7-12.4",
        "startPoint": [
          179,
          604
        ],
        "endPoint": [
          824,
          474
        ],
        "primaryAngleDeg": 349,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of キ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M448.3,153.7c22.9,16.1,31.5,29.7,35.6,56.1c19.4,125,58.5,416.3,75.7,543.6c3.7,27.5,9.2,76.9,12.7,102",
        "startPoint": [
          448,
          154
        ],
        "endPoint": [
          572,
          855
        ],
        "primaryAngleDeg": 80,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of キ"
      }
    ]
  },
  {
    "id": "kana_ku_k",
    "character": "ク",
    "syllabary": "KATAKANA",
    "romaji": "ku",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M458.7,180c3.5,13.8,3.1,31.9-4.6,47c-37.8,74.5-72.3,142.2-147.9,221.3",
        "startPoint": [
          459,
          180
        ],
        "endPoint": [
          306,
          448
        ],
        "primaryAngleDeg": 120,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of ク"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M470.2,262.6c24,2.3,52-3.6,69.9-8.1c55-13.8,89.4-21.8,138.7-35.6c53.1-14.9,69.1-3.9,47,44.8c-95,209.9-240.7,405-446,555.1",
        "startPoint": [
          470,
          263
        ],
        "endPoint": [
          280,
          819
        ],
        "primaryAngleDeg": 109,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ク"
      }
    ]
  },
  {
    "id": "kana_ke_k",
    "character": "ケ",
    "syllabary": "KATAKANA",
    "romaji": "ke",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M375.8,164c4,17.4,3.6,40.6-5.4,59.6c-44.2,94.6-84.5,180.5-173.1,280.9",
        "startPoint": [
          376,
          164
        ],
        "endPoint": [
          197,
          505
        ],
        "primaryAngleDeg": 118,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of ケ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M347.5,345.1c19.4,8.1,38.1,9.5,60.7,4.6c115.8-25.2,233.9-44.8,328-59.6c33.1-5.2,57.3-6.9,84.9-4.6",
        "startPoint": [
          348,
          345
        ],
        "endPoint": [
          821,
          286
        ],
        "primaryAngleDeg": 353,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ケ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M591.4,356.7c4,17.4,4.6,39.2-0.7,59.6c-33.3,126.1-84.9,286.7-226,402.5",
        "startPoint": [
          591,
          357
        ],
        "endPoint": [
          365,
          819
        ],
        "primaryAngleDeg": 116,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of ケ"
      }
    ]
  },
  {
    "id": "kana_ko_k",
    "character": "コ",
    "syllabary": "KATAKANA",
    "romaji": "ko",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M276.4,321.1c16.1,9.2,27.6,20,59.6,14.9c130.7-20.6,271.7-39,342.9-50.5c86-13.9,90.6,2.3,73.4,68.8c-25.4,98.3-48.2,202.9-64.2,320",
        "startPoint": [
          276,
          321
        ],
        "endPoint": [
          688,
          674
        ],
        "primaryAngleDeg": 41,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of コ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M252.3,709.9c24,10.3,40.2,13.9,75.7,9.2c104.4-13.8,207.5-27.5,309.6-31c36.7-1.2,53.9,0,88.3,4.6",
        "startPoint": [
          252,
          710
        ],
        "endPoint": [
          726,
          693
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of コ"
      }
    ]
  },
  {
    "id": "kana_sa_k",
    "character": "サ",
    "syllabary": "KATAKANA",
    "romaji": "sa",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M151.4,406.8c26.1,11.7,43.8,17.5,81.9,10.4c157.8-29.5,371.1-49.1,537-49c39.7,0,63.5,3.4,95.6,7.5",
        "startPoint": [
          151,
          407
        ],
        "endPoint": [
          866,
          376
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of サ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M336.1,214.5c10.3,12.7,10.9,22.9,11.5,43.6c2.3,82.6,3.5,185.8,6.9,265c1.3,29.8,3.5,65.3,3.5,84.9",
        "startPoint": [
          336,
          214
        ],
        "endPoint": [
          358,
          608
        ],
        "primaryAngleDeg": 87,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of サ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M638.8,152.5c13.8,18.3,14.9,26.3,14.9,57.3c0,75.7-1.5,82.6-1.5,145.7c0,213.3-85.7,389.9-212.9,486.2",
        "startPoint": [
          639,
          152
        ],
        "endPoint": [
          439,
          842
        ],
        "primaryAngleDeg": 106,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of サ"
      }
    ]
  },
  {
    "id": "kana_shi_k",
    "character": "シ",
    "syllabary": "KATAKANA",
    "romaji": "shi",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M365.8,181.2c47.2,14.4,89.8,55.1,105.5,79.1",
        "startPoint": [
          366,
          181
        ],
        "endPoint": [
          471,
          260
        ],
        "primaryAngleDeg": 37,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of シ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M238.5,391c29.8,8.1,94,50.5,112.4,74.6",
        "startPoint": [
          239,
          391
        ],
        "endPoint": [
          351,
          466
        ],
        "primaryAngleDeg": 34,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of シ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M302.8,779.8c34.4,8.1,65.3,4.5,95.2-12.7c163.9-93.9,297-219,423.1-393.3",
        "startPoint": [
          303,
          780
        ],
        "endPoint": [
          821,
          374
        ],
        "primaryAngleDeg": 322,
        "strokeType": "hook",
        "directionalHint": "Smooth Continuous Curve",
        "pedagogicalRule": "Stroke 3 of シ"
      }
    ]
  },
  {
    "id": "kana_su_k",
    "character": "ス",
    "syllabary": "KATAKANA",
    "romaji": "su",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M276.4,269.5c16.1,13.8,38.1,18.2,60.7,12.7c121.6-29.8,222.5-51.6,286.7-67.7c64.2-16.1,79.3,10.6,59.6,52.8c-103.1,221.3-260.3,420.8-490.8,525.2",
        "startPoint": [
          276,
          270
        ],
        "endPoint": [
          193,
          792
        ],
        "primaryAngleDeg": 99,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ス"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M559.6,525.2c100.9,67.7,192.7,156,256.9,262.6",
        "startPoint": [
          560,
          525
        ],
        "endPoint": [
          817,
          788
        ],
        "primaryAngleDeg": 46,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ス"
      }
    ]
  },
  {
    "id": "kana_se_k",
    "character": "セ",
    "syllabary": "KATAKANA",
    "romaji": "se",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M156,453c28.6,13.8,46.2,20,79.1,12.7c215.6-48.2,286.6-68.2,464.4-106.6c212.1-45.9,59.6,71.1-29.8,166.2",
        "startPoint": [
          156,
          453
        ],
        "endPoint": [
          670,
          525
        ],
        "primaryAngleDeg": 8,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of セ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M388.8,178.9c18.3,20.6,19.7,32.1,19.4,60.7c-1.1,160.6-8.1,291.3-8.1,377.2c0,128.4,28.7,155.9,113.6,157.1c76.9,1.1,129.5,1.1,165.1,1.1c35.6,0,68.8-4.6,96.3-10.3",
        "startPoint": [
          389,
          179
        ],
        "endPoint": [
          775,
          765
        ],
        "primaryAngleDeg": 57,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of セ"
      }
    ]
  },
  {
    "id": "kana_so_k",
    "character": "ソ",
    "syllabary": "KATAKANA",
    "romaji": "so",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M215.6,233.9c36,37.6,70.7,91.1,98.6,164",
        "startPoint": [
          216,
          234
        ],
        "endPoint": [
          314,
          398
        ],
        "primaryAngleDeg": 59,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ソ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M766.1,192.7c11.5,22.9,11.9,40.7,1.1,78c-53.9,187-240.7,454.1-418.5,561.9",
        "startPoint": [
          766,
          193
        ],
        "endPoint": [
          349,
          833
        ],
        "primaryAngleDeg": 123,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 2 of ソ"
      }
    ]
  },
  {
    "id": "kana_ta_k",
    "character": "タ",
    "syllabary": "KATAKANA",
    "romaji": "ta",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M448,181.2c3.9,15.8,3.6,36.7-5.3,54c-43.8,85.7-83.5,163.5-170.9,254.4",
        "startPoint": [
          448,
          181
        ],
        "endPoint": [
          272,
          490
        ],
        "primaryAngleDeg": 120,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of タ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M456.4,278.7c25.2,4.6,45.9,0,69.9-5.7c55.2-13.1,96.3-24,145.7-37.8c53.1-14.9,75.4,2.8,53.9,51.6c-99.8,225.9-203,403.6-459.9,550.4",
        "startPoint": [
          456,
          279
        ],
        "endPoint": [
          266,
          837
        ],
        "primaryAngleDeg": 109,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of タ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M398,418.5c61.9,32.1,97.4,72.3,135.3,139.9",
        "startPoint": [
          398,
          419
        ],
        "endPoint": [
          533,
          558
        ],
        "primaryAngleDeg": 46,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of タ"
      }
    ]
  },
  {
    "id": "kana_chi_k",
    "character": "チ",
    "syllabary": "KATAKANA",
    "romaji": "chi",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M640,139.9c-3.5,24-18.4,40.1-35.6,49.4c-72.3,39-170.8,89.4-325.7,121.6",
        "startPoint": [
          640,
          140
        ],
        "endPoint": [
          279,
          311
        ],
        "primaryAngleDeg": 155,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of チ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M169.7,472.5c26.4,8.1,40.3,15.1,72.3,11.5c201.8-22.9,333.8-39,514.9-44.8c44.8-1.4,72.3,4.7,99.8,13.9",
        "startPoint": [
          170,
          472
        ],
        "endPoint": [
          857,
          453
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of チ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M503.5,282.1c8.1,6.9,16.1,22.8,16.1,43.6c0,55.3,0.3,103.2,0.3,167.6c0,137.4-46.1,270.5-151.7,359.9",
        "startPoint": [
          503,
          282
        ],
        "endPoint": [
          368,
          853
        ],
        "primaryAngleDeg": 103,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of チ"
      }
    ]
  },
  {
    "id": "kana_tsu_k",
    "character": "ツ",
    "syllabary": "KATAKANA",
    "romaji": "tsu",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M197.2,287.9c21.8,27.5,41.3,86.1,44.8,127.3",
        "startPoint": [
          197,
          288
        ],
        "endPoint": [
          242,
          415
        ],
        "primaryAngleDeg": 70,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ツ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M418.5,217.9c31,32.1,60.7,87.2,64.2,136.5",
        "startPoint": [
          419,
          218
        ],
        "endPoint": [
          483,
          354
        ],
        "primaryAngleDeg": 65,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ツ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M776.3,255.8c6.9,20.6,3.6,48.3-6.9,73.4c-70,168.5-195,377.2-422,481.7",
        "startPoint": [
          776,
          256
        ],
        "endPoint": [
          347,
          811
        ],
        "primaryAngleDeg": 128,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 3 of ツ"
      }
    ]
  },
  {
    "id": "kana_te_k",
    "character": "テ",
    "syllabary": "KATAKANA",
    "romaji": "te",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M334.9,197.2c19.4,11.5,40.2,14.6,66.5,11.5c97.4-11.5,154.9-20.6,225.9-29.8c34.2-4.4,51.7-4.6,74.6-2.3",
        "startPoint": [
          335,
          197
        ],
        "endPoint": [
          702,
          177
        ],
        "primaryAngleDeg": 357,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of テ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M183.5,404.8c26.4,9.2,48.3,9.6,68.8,6.9c205.3-27.5,339.4-51.6,496.6-56.1c51.6-1.5,71.1,0,95.2,5.7",
        "startPoint": [
          183,
          405
        ],
        "endPoint": [
          844,
          361
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of テ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M532.1,396.8c8.1,9.2,12.1,24.1,10.3,40.2c-16,141-106.6,321-225.9,384.1",
        "startPoint": [
          532,
          397
        ],
        "endPoint": [
          317,
          821
        ],
        "primaryAngleDeg": 117,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 3 of テ"
      }
    ]
  },
  {
    "id": "kana_to_k",
    "character": "ト",
    "syllabary": "KATAKANA",
    "romaji": "to",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M403.7,150.3c11.5,10.3,19.4,29.8,19.4,50.5c0,239.6,0,490.8,0,528.6c0,37.8,0,96.3,0,122.8",
        "startPoint": [
          404,
          150
        ],
        "endPoint": [
          423,
          852
        ],
        "primaryAngleDeg": 88,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ト"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M451.7,395.6c107.8,37.8,167.4,97.4,224.8,172",
        "startPoint": [
          452,
          396
        ],
        "endPoint": [
          677,
          568
        ],
        "primaryAngleDeg": 37,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ト"
      }
    ]
  },
  {
    "id": "kana_na_k",
    "character": "ナ",
    "syllabary": "KATAKANA",
    "romaji": "na",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M169.7,404.8c24,9.2,43.8,10.7,83.7,4.6c177.8-27.5,346.3-43.6,480.6-51.6c34.4-2,81.5-2.3,109,1.1",
        "startPoint": [
          170,
          405
        ],
        "endPoint": [
          843,
          359
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ナ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M488.6,133c16.1,11.5,25.2,27.5,25.2,55c0,27.5,1.1,197.2,1.1,222.5c0,183.5-55,345.1-168.6,450.6",
        "startPoint": [
          489,
          133
        ],
        "endPoint": [
          346,
          861
        ],
        "primaryAngleDeg": 101,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ナ"
      }
    ]
  },
  {
    "id": "kana_ni_k",
    "character": "ニ",
    "syllabary": "KATAKANA",
    "romaji": "ni",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M299.4,318.3c22.9,10.9,39.7,14.7,68.3,12.4c106-8.3,167.9-22.1,248.1-29.2c24.2-2.1,57.5-1.5,77,0.7",
        "startPoint": [
          299,
          318
        ],
        "endPoint": [
          693,
          302
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ニ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M183.5,687c24,9.2,43.9,13.3,83.7,6.9c185.8-29.8,334.9-35.6,480.6-35.6c34.4,0,73.4,9.2,102,21.8",
        "startPoint": [
          183,
          687
        ],
        "endPoint": [
          850,
          680
        ],
        "primaryAngleDeg": 359,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ニ"
      }
    ]
  },
  {
    "id": "kana_nu_k",
    "character": "ヌ",
    "syllabary": "KATAKANA",
    "romaji": "nu",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M306.2,253.4c25.2,11.5,49.4,10.6,78,5.7c92.8-16.1,174.3-28.6,262.6-45.9c61.2-11.9,71.1-1.1,49.4,51.6c-61.5,148.8-189.3,371.7-448.4,531.1",
        "startPoint": [
          306,
          253
        ],
        "endPoint": [
          248,
          796
        ],
        "primaryAngleDeg": 96,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ヌ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M411.7,425.5c110.1,61.9,205.3,141.1,280.9,258",
        "startPoint": [
          412,
          426
        ],
        "endPoint": [
          693,
          683
        ],
        "primaryAngleDeg": 42,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ヌ"
      }
    ]
  },
  {
    "id": "kana_ne_k",
    "character": "ネ",
    "syllabary": "KATAKANA",
    "romaji": "ne",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M471.4,113.6c31,19.4,73.4,53.9,100.9,99.8",
        "startPoint": [
          471,
          114
        ],
        "endPoint": [
          572,
          213
        ],
        "primaryAngleDeg": 44,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ネ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M246.6,331.7c24,13.4,50,17.7,78,10.9c98.6-23.9,190.4-45.7,283.3-68.8c59.9-14.9,71.7,11.7,42.4,42.9c-106.7,114.4-208.8,214.2-448.4,348.3",
        "startPoint": [
          247,
          332
        ],
        "endPoint": [
          202,
          665
        ],
        "primaryAngleDeg": 98,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ネ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M498.9,496.5c12.7,16.1,14.9,32.1,14.9,55c0,22.9,0,252.3,0,269.5c0,17.2,0,36.7,0,63.1",
        "startPoint": [
          499,
          497
        ],
        "endPoint": [
          514,
          884
        ],
        "primaryAngleDeg": 88,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of ネ"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M599.8,491.9c114.7,55,182.4,107.8,228.3,173.2",
        "startPoint": [
          600,
          492
        ],
        "endPoint": [
          828,
          665
        ],
        "primaryAngleDeg": 37,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 4 of ネ"
      }
    ]
  },
  {
    "id": "kana_no_k",
    "character": "ノ",
    "syllabary": "KATAKANA",
    "romaji": "no",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M663.9,231.7c6.9,18.3,8.4,44.9,2.3,66.5c-65.3,229.4-232.8,410.6-400.2,521.8",
        "startPoint": [
          664,
          232
        ],
        "endPoint": [
          266,
          820
        ],
        "primaryAngleDeg": 124,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of ノ"
      }
    ]
  },
  {
    "id": "kana_ha_k",
    "character": "ハ",
    "syllabary": "KATAKANA",
    "romaji": "ha",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M360.8,338.3c3.5,10.5,4.2,26.4-1.1,38c-58.1,126-122.3,218.9-203.8,295.7",
        "startPoint": [
          361,
          338
        ],
        "endPoint": [
          156,
          672
        ],
        "primaryAngleDeg": 122,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of ハ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M600.9,333.8c119.3,83.7,212.1,207.5,256.9,306.2",
        "startPoint": [
          601,
          334
        ],
        "endPoint": [
          858,
          640
        ],
        "primaryAngleDeg": 50,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ハ"
      }
    ]
  },
  {
    "id": "kana_hi_k",
    "character": "ヒ",
    "syllabary": "KATAKANA",
    "romaji": "hi",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M324.6,408.3c16.1,12.7,41.4,20.1,63.1,17.2c93.9-12.7,158.2-26.4,222.4-39.1c27.6-5.4,65.3-9.2,86.1-8.1",
        "startPoint": [
          325,
          408
        ],
        "endPoint": [
          696,
          378
        ],
        "primaryAngleDeg": 355,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ヒ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M284.4,161.7c12.7,11.6,17.2,31,17.2,56.2c0,25.2-8.1,403.7-8.1,433.5c0,89.4,36.7,134.1,126.1,134.1c55,0,150.3,1.1,196.1,0c45.9-1.1,87.2-5.7,123.9-13.8",
        "startPoint": [
          284,
          162
        ],
        "endPoint": [
          740,
          772
        ],
        "primaryAngleDeg": 53,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ヒ"
      }
    ]
  },
  {
    "id": "kana_fu_k",
    "character": "フ",
    "syllabary": "KATAKANA",
    "romaji": "fu",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M224.8,275.2c17.2,17.2,32.1,18.7,59.6,14.9c133-18.3,266.1-40.2,401.4-63.1c62.6-10.6,97.1,21,63.1,83.7c-95.2,175.6-195,362.6-458.8,492.1",
        "startPoint": [
          225,
          275
        ],
        "endPoint": [
          290,
          803
        ],
        "primaryAngleDeg": 83,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of フ"
      }
    ]
  },
  {
    "id": "kana_he_k",
    "character": "ヘ",
    "syllabary": "KATAKANA",
    "romaji": "he",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M142.2,449.7c25.5,14.2,49.4,5.9,63.8-8.3c37.2-36.8,86.9-76.1,110.1-99.8c29-29.6,67.2-48.3,110.2-10.6c103.2,90.1,229.6,196.8,328.3,278.5c39.3,32.6,70.7,62.8,103.2,87.7",
        "startPoint": [
          142,
          450
        ],
        "endPoint": [
          858,
          697
        ],
        "primaryAngleDeg": 19,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ヘ"
      }
    ]
  },
  {
    "id": "kana_ho_k",
    "character": "ホ",
    "syllabary": "KATAKANA",
    "romaji": "ho",
    "strokeCount": 4,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M207.6,370.5c24,9.2,43.6,15.7,83.7,11.5c162.8-17.2,268.3-25.2,416.3-35.6c34.3-2.4,67.7-1.1,102,5.7",
        "startPoint": [
          208,
          370
        ],
        "endPoint": [
          810,
          352
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ホ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M493.1,157.1c12.7,17.2,12.7,41.3,12.7,67.7c0,26.4-1.1,427.7-1.1,476c0,212.1-57.3,103.2-89.4,88.3",
        "startPoint": [
          493,
          157
        ],
        "endPoint": [
          415,
          789
        ],
        "primaryAngleDeg": 97,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ホ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M251.2,544.8c4.6,84.9-12.7,152.5-58.5,200.7",
        "startPoint": [
          251,
          545
        ],
        "endPoint": [
          193,
          746
        ],
        "primaryAngleDeg": 106,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 3 of ホ"
      },
      {
        "strokeIndex": 4,
        "svgPath": "M672,483.9c99.8,88.3,142.2,161.7,152.6,228.2",
        "startPoint": [
          672,
          484
        ],
        "endPoint": [
          825,
          712
        ],
        "primaryAngleDeg": 56,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 4 of ホ"
      }
    ]
  },
  {
    "id": "kana_ma_k",
    "character": "マ",
    "syllabary": "KATAKANA",
    "romaji": "ma",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M197.2,309.6c17.2,17.2,32.1,18.3,59.6,14.9c180-21.8,307.3-36.7,470.2-58.5c62.8-8.4,86,15.3,40.2,69.9c-65.3,78-164,183.5-263.8,290.1",
        "startPoint": [
          197,
          310
        ],
        "endPoint": [
          503,
          626
        ],
        "primaryAngleDeg": 46,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of マ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M398,540.2c77.3,59.6,152.3,146.1,185.8,240.8",
        "startPoint": [
          398,
          540
        ],
        "endPoint": [
          584,
          781
        ],
        "primaryAngleDeg": 52,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of マ"
      }
    ]
  },
  {
    "id": "kana_mi_k",
    "character": "ミ",
    "syllabary": "KATAKANA",
    "romaji": "mi",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M384.1,183.5c95.4,23.6,188.1,57.8,229.4,95.2",
        "startPoint": [
          384,
          183
        ],
        "endPoint": [
          613,
          279
        ],
        "primaryAngleDeg": 23,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ミ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M385.3,430.1c98.3,24.7,193.7,60.6,236.2,99.8",
        "startPoint": [
          385,
          430
        ],
        "endPoint": [
          622,
          530
        ],
        "primaryAngleDeg": 23,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ミ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M334.9,688.1c144.1,41.2,283.9,100.9,346.3,166.2",
        "startPoint": [
          335,
          688
        ],
        "endPoint": [
          681,
          854
        ],
        "primaryAngleDeg": 26,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of ミ"
      }
    ]
  },
  {
    "id": "kana_mu_k",
    "character": "ム",
    "syllabary": "KATAKANA",
    "romaji": "mu",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M493.9,206.4c8.1,16.1,7.2,41.9-3.5,63.1c-84.9,168.6-148.5,284-231.7,419.7c-34.4,56.1-27.5,76.9,40.2,65.3c67.7-11.6,427.7-74.5,455.2-81.5",
        "startPoint": [
          494,
          206
        ],
        "endPoint": [
          754,
          673
        ],
        "primaryAngleDeg": 61,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ム"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M662.5,551.6c63.1,58.5,125,136.5,146.8,232.8",
        "startPoint": [
          662,
          552
        ],
        "endPoint": [
          809,
          784
        ],
        "primaryAngleDeg": 58,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ム"
      }
    ]
  },
  {
    "id": "kana_me_k",
    "character": "メ",
    "syllabary": "KATAKANA",
    "romaji": "me",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M673.2,175.4c8.1,16.1,4.4,40.7-3.5,63.1c-71.1,202.9-199.5,436.9-412.8,576.9",
        "startPoint": [
          673,
          175
        ],
        "endPoint": [
          257,
          815
        ],
        "primaryAngleDeg": 123,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 1 of メ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M362.5,362.4c151.7,71.2,294.7,165.1,353.2,283.3",
        "startPoint": [
          362,
          362
        ],
        "endPoint": [
          716,
          646
        ],
        "primaryAngleDeg": 39,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of メ"
      }
    ]
  },
  {
    "id": "kana_mo_k",
    "character": "モ",
    "syllabary": "KATAKANA",
    "romaji": "mo",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M255.8,240.3c22.9,10.9,39.7,14.7,68.3,12.4c106-8.3,201.2-19.8,300.8-36.1c24-3.9,57.5-3.8,77-1.6",
        "startPoint": [
          256,
          240
        ],
        "endPoint": [
          702,
          215
        ],
        "primaryAngleDeg": 357,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of モ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M160.6,498.9c24,9.2,43.9,13.3,83.7,6.9c185.9-29.8,310.8-49.4,473.8-56.2c34.4-1.5,67.7,2.3,102,8.1",
        "startPoint": [
          161,
          499
        ],
        "endPoint": [
          820,
          458
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of モ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M447.3,274.1c10.3,14.9,13,33.2,13,56.1c0,59.9-6,307.9-6,329.2c0,70.4,28.3,101.7,96.6,107.9c48.9,4.5,112.9,2.2,150.2,0c40.9-2.4,59.8-6.8,88-13.1",
        "startPoint": [
          447,
          274
        ],
        "endPoint": [
          789,
          754
        ],
        "primaryAngleDeg": 55,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 3 of モ"
      }
    ]
  },
  {
    "id": "kana_ya_k",
    "character": "ヤ",
    "syllabary": "KATAKANA",
    "romaji": "ya",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M165.1,419.7c19.4,14.9,56.4,21.6,92.8,12.7c173.2-42.4,306.3-71.8,448.4-109c201.8-52.8,13.8,130.7-25.2,183.5",
        "startPoint": [
          165,
          420
        ],
        "endPoint": [
          681,
          507
        ],
        "primaryAngleDeg": 10,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ヤ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M352.9,177.8c15.1,12.8,23.3,24.5,29.2,47.8c5.9,23.3,109.6,485.3,115.5,509.8c5.9,24.5,19.8,84,28,114.3",
        "startPoint": [
          353,
          178
        ],
        "endPoint": [
          526,
          850
        ],
        "primaryAngleDeg": 76,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ヤ"
      }
    ]
  },
  {
    "id": "kana_yu_k",
    "character": "ユ",
    "syllabary": "KATAKANA",
    "romaji": "yu",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M270.6,324.6c21.8,13.8,47.2,19.1,84.9,13.8c121.6-17.2,165.3-22,253.4-36.7c61.9-10.3,71.4,1.5,59.6,58.5c-21.8,105.5-44.8,224.8-59.6,316.5",
        "startPoint": [
          271,
          325
        ],
        "endPoint": [
          609,
          677
        ],
        "primaryAngleDeg": 46,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ユ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M156,705.3c25.2,13.8,43.7,18.8,83.7,13.8c207.5-26.4,330.3-35.6,496.5-35.6c34.4,0,67.7,4.6,102,10.3",
        "startPoint": [
          156,
          705
        ],
        "endPoint": [
          838,
          694
        ],
        "primaryAngleDeg": 359,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ユ"
      }
    ]
  },
  {
    "id": "kana_yo_k",
    "character": "ヨ",
    "syllabary": "KATAKANA",
    "romaji": "yo",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M267.2,276.3c21.8,13.8,47,18.2,84.9,13.8c128.4-14.9,245-27.9,333.8-39c55-6.9,63.1,4.6,59.6,58.5c-9.2,142.3-17.3,281-27.6,387.6",
        "startPoint": [
          267,
          276
        ],
        "endPoint": [
          718,
          697
        ],
        "primaryAngleDeg": 43,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ヨ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M268.3,485.1c21.8,13.8,47,18.2,84.9,13.8c96.3-11.2,209.3-21,285.4-27.9c25.4-2.3,48.3,0.4,71.3,5",
        "startPoint": [
          268,
          485
        ],
        "endPoint": [
          710,
          476
        ],
        "primaryAngleDeg": 359,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ヨ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M215.6,723.3c25.2,11.9,43.5,15.4,83.7,11.9c114.7-9.9,269.4-26.6,379.6-26.6c31,0,51.6,0,86.1,5",
        "startPoint": [
          216,
          723
        ],
        "endPoint": [
          765,
          714
        ],
        "primaryAngleDeg": 359,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of ヨ"
      }
    ]
  },
  {
    "id": "kana_ra_k",
    "character": "ラ",
    "syllabary": "KATAKANA",
    "romaji": "ra",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M354.4,193.2c19,17.1,40.6,23.2,73.9,19.7c84.4-8.8,131.6-18.4,197.9-27.1c22.1-2.8,37.9-4.9,59.7-1.7",
        "startPoint": [
          354,
          193
        ],
        "endPoint": [
          686,
          184
        ],
        "primaryAngleDeg": 358,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ラ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M238.5,384.3c21.8,15.6,47,20.6,84.9,15.6c128.4-16.9,286.3-45.4,375-58c55-7.8,74.7,5.7,57.3,52.5c-63.1,170.8-201.8,350.9-415.1,446.1",
        "startPoint": [
          239,
          384
        ],
        "endPoint": [
          341,
          840
        ],
        "primaryAngleDeg": 77,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ラ"
      }
    ]
  },
  {
    "id": "kana_ri_k",
    "character": "リ",
    "syllabary": "KATAKANA",
    "romaji": "ri",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M321.1,168.6c10.3,13.8,14.9,27.5,14.9,44.8c0,17.2,0,229.4,0,247.7c0,18.3,0,56.1,0,71.1",
        "startPoint": [
          321,
          169
        ],
        "endPoint": [
          336,
          532
        ],
        "primaryAngleDeg": 88,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of リ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M651.4,141.1c13.8,11.5,21.8,28.6,21.8,49.4c0,20.7-1.1,265-1.1,301.7c0,180-87.2,295.9-199.5,370.5",
        "startPoint": [
          651,
          141
        ],
        "endPoint": [
          473,
          863
        ],
        "primaryAngleDeg": 104,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of リ"
      }
    ]
  },
  {
    "id": "kana_ru_k",
    "character": "ル",
    "syllabary": "KATAKANA",
    "romaji": "ru",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M315.4,292.5c10.3,13.8,15.8,27.5,14.9,44.8c-10.3,209.9-81.5,372.7-160.6,454.1",
        "startPoint": [
          315,
          292
        ],
        "endPoint": [
          170,
          791
        ],
        "primaryAngleDeg": 106,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ル"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M518.4,180c13.8,11.5,21.8,28.6,21.8,49.4c0,20.7-1.1,436.9-1.1,473.6c0,96.3,4.8,93.7,86.1,25.2c87.2-73.4,151.4-134.1,242-235",
        "startPoint": [
          518,
          180
        ],
        "endPoint": [
          867,
          493
        ],
        "primaryAngleDeg": 42,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ル"
      }
    ]
  },
  {
    "id": "kana_re_k",
    "character": "レ",
    "syllabary": "KATAKANA",
    "romaji": "re",
    "strokeCount": 1,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M316.5,181.2c13.8,11.5,21.8,28.6,21.8,49.4c0,20.7-1.1,459.8-1.1,496.5c-0.2,80.3-1.3,79.2,85.9,34.4c121.4-62.3,306.2-206.4,396.8-307.3",
        "startPoint": [
          317,
          181
        ],
        "endPoint": [
          820,
          454
        ],
        "primaryAngleDeg": 28,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of レ"
      }
    ]
  },
  {
    "id": "kana_ro_k",
    "character": "ロ",
    "syllabary": "KATAKANA",
    "romaji": "ro",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M229.4,305c13.8,11.5,19.8,28.8,21.8,49.4c8.8,92.4,19.6,217.2,28.8,320c2.8,31.2,5.4,60.4,7.9,86.1",
        "startPoint": [
          229,
          305
        ],
        "endPoint": [
          288,
          760
        ],
        "primaryAngleDeg": 83,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ロ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M258.1,331.4c84.9-9.2,345.1-28.6,418.5-39c73.4-10.4,87.8,4.9,76.9,60.7c-19.5,99.9-37.9,200.8-61.9,320.1",
        "startPoint": [
          258,
          331
        ],
        "endPoint": [
          692,
          673
        ],
        "primaryAngleDeg": 38,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 2 of ロ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M293.6,716.7c49.4-4.6,308.4-27.5,334.9-27.5c26.4,0,72.3-2.3,105.5,2.3",
        "startPoint": [
          294,
          717
        ],
        "endPoint": [
          734,
          691
        ],
        "primaryAngleDeg": 357,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 3 of ロ"
      }
    ]
  },
  {
    "id": "kana_wa_k",
    "character": "ワ",
    "syllabary": "KATAKANA",
    "romaji": "wa",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M229.4,216.7c13.8,11.5,19.8,28.8,21.8,49.4c8.8,92.4,8.2,75,17.3,177.8c2.8,31.2,5.4,60.4,7.9,86.1",
        "startPoint": [
          229,
          217
        ],
        "endPoint": [
          276,
          530
        ],
        "primaryAngleDeg": 81,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 1 of ワ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M254.6,242c28.6,3.5,47.3,2,75.5-0.6c126.3-11.8,249.1-21.3,382.1-33.9c73.8-7,86.6,4.7,76.9,60.7c-43.7,250.1-189.4,437.1-402.6,564.3",
        "startPoint": [
          255,
          242
        ],
        "endPoint": [
          387,
          833
        ],
        "primaryAngleDeg": 77,
        "strokeType": "vertical",
        "directionalHint": "Top to Bottom",
        "pedagogicalRule": "Stroke 2 of ワ"
      }
    ]
  },
  {
    "id": "kana_wo_k",
    "character": "ヲ",
    "syllabary": "KATAKANA",
    "romaji": "wo",
    "strokeCount": 3,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M277.4,230.6c21.8,15.6,46.9,19.5,84.9,15.6c113-11.8,201.3-23.9,279.6-33.4c25.8-3.1,50.6-6,74.7-8.5",
        "startPoint": [
          277,
          231
        ],
        "endPoint": [
          717,
          204
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 1 of ヲ"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M266.1,428.3c20.6,13.2,40.7,17.4,73.9,12.8c75.1-10.6,182.8-24.2,262-34.8c21.8-2.8,42.7-5.7,61.9-8.4",
        "startPoint": [
          266,
          428
        ],
        "endPoint": [
          664,
          398
        ],
        "primaryAngleDeg": 356,
        "strokeType": "horizontal",
        "directionalHint": "Left to Right",
        "pedagogicalRule": "Stroke 2 of ヲ"
      },
      {
        "strokeIndex": 3,
        "svgPath": "M715.6,209.9c8.1,18.3,5.7,42.6,1.1,64.2c-44.8,206.4-215.6,432.3-404.8,557.2",
        "startPoint": [
          716,
          210
        ],
        "endPoint": [
          312,
          831
        ],
        "primaryAngleDeg": 123,
        "strokeType": "left_fall",
        "directionalHint": "Down-Left Slant",
        "pedagogicalRule": "Stroke 3 of ヲ"
      }
    ]
  },
  {
    "id": "kana_n_k",
    "character": "ン",
    "syllabary": "KATAKANA",
    "romaji": "n",
    "strokeCount": 2,
    "strokes": [
      {
        "strokeIndex": 1,
        "svgPath": "M243.1,228.3c52.8,19.7,116.3,77.7,144.5,130.7",
        "startPoint": [
          243,
          228
        ],
        "endPoint": [
          388,
          359
        ],
        "primaryAngleDeg": 42,
        "strokeType": "right_fall",
        "directionalHint": "Down-Right Slant",
        "pedagogicalRule": "Stroke 1 of ン"
      },
      {
        "strokeIndex": 2,
        "svgPath": "M262.6,768.3c22.9,14.9,47,8.8,71.1-5.7c184.7-111.3,321.1-226,455.3-377.3",
        "startPoint": [
          263,
          768
        ],
        "endPoint": [
          789,
          385
        ],
        "primaryAngleDeg": 324,
        "strokeType": "hook",
        "directionalHint": "Smooth Continuous Curve",
        "pedagogicalRule": "Stroke 2 of ン"
      }
    ]
  }
];
