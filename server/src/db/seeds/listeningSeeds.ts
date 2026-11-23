import { IeltsListeningPackage } from '../../types';

export const LISTENING_PACKAGES_SEED: IeltsListeningPackage[] = [
  {
    id: 'pkg_listening_01',
    title: 'Cambridge Standard Listening Battery A',
    description: 'Authentic 4-Section Cambridge IELTS listening examination simulation featuring multi-regional native accents, spatial map labelling, voice attribution colloquium, and academic monologue note completion.',
    levelCode: 'ielts_academic',
    totalDurationSeconds: 1920, // 32 minutes (30 min test + 2 min review)
    totalQuestions: 40,
    sections: [
      {
        sectionNumber: 1,
        title: 'Section 1: Leisure Centre & Sports Membership Registration',
        contextDescription: 'Everyday social dialogue between a customer (David Heathcote) and a centre receptionist (Clara) regarding facilities, membership tiers, and outdoor excursions.',
        audioUrl: '/audio/ielts/listening/sec1_leisure_membership.opus',
        durationSeconds: 390,
        speakers: [
          { speakerId: 'spk_receptionist', name: 'Clara (Receptionist)', accent: 'british_rp', gender: 'female', role: 'receptionist' },
          { speakerId: 'spk_customer', name: 'David Heathcote', accent: 'australian', gender: 'male', role: 'applicant' }
        ],
        timecodes: {
          introLeadIn: { startSec: 0.0, endSec: 25.0 },
          preReadingPause: { startSec: 25.0, endSec: 55.0 },
          dialoguePartA: { startSec: 55.0, endSec: 210.0 },
          midBreakPause: { startSec: 210.0, endSec: 240.0 },
          dialoguePartB: { startSec: 240.0, endSec: 360.0 },
          sectionReviewPause: { startSec: 360.0, endSec: 390.0 }
        },
        questions: [
          {
            questionNumber: 1,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Surname of primary applicant:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'HEATHCOTE',
            acceptedAnswers: ['HEATHCOTE', 'Heathcote', 'heathcote'],
            audioTimestampSeconds: 65.0,
            targetAccent: 'australian',
            distractorAnalysis: {
              trapType: 'spelling',
              deceptiveTrapToken: 'Heathcotte',
              linguisticPivotMarker: 'No, just one T in the middle: H-E-A-T-H-C-O-T-E',
              correctExplanation: 'Spelling correction trap: The receptionist assumed a double T, but the caller clarified single T in the middle.',
              explanationId: 'Analisis Jebakan Percakapan: Resepsionis mengira ejaan menggunakan huruf T ganda, namun pemohon meralat dengan jelas bahwa huruf T di tengah hanya satu (H-E-A-T-H-C-O-T-E).'
            }
          },
          {
            questionNumber: 2,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Requested membership commencement date:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: '14th October',
            acceptedAnswers: ['14th October', 'October 14', '14 October', 'October 14th', '14th of October'],
            audioTimestampSeconds: 98.0,
            targetAccent: 'australian',
            distractorAnalysis: {
              trapType: 'date_shift',
              deceptiveTrapToken: '12th October',
              linguisticPivotMarker: 'Actually, our flight lands on the 14th, so make it the fourteenth',
              correctExplanation: 'Date shift trap: Caller initially suggested departure on 12th October, but corrected arrival date to 14th October.',
              explanationId: 'Analisis Jebakan Percakapan: Pemohon awalnya menyebut tanggal 12 Oktober, namun meralat jadwal kedatangan menjadi tanggal 14 Oktober karena jadwal penerbangan.'
            }
          },
          {
            questionNumber: 3,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Selected accommodation / membership package tier:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'Riverside Cabin',
            acceptedAnswers: ['Riverside Cabin', 'riverside cabin'],
            audioTimestampSeconds: 135.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'Lakeside Villa',
              linguisticPivotMarker: 'Unfortunately the Villa is booked, but our Riverside Cabin has just opened up',
              correctExplanation: 'Unavailability trap: The preferred Lakeside Villa was fully booked, necessitating booking the Riverside Cabin.',
              explanationId: 'Analisis Jebakan Percakapan: Pilihan Lakeside Villa telah penuh dipesan, sehingga resepsionis menawarkan Riverside Cabin yang masih tersedia.'
            }
          },
          {
            questionNumber: 4,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Total number of active attendees in party:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: '4',
            acceptedAnswers: ['4', 'four', 'Four'],
            audioTimestampSeconds: 168.0,
            targetAccent: 'australian',
            distractorAnalysis: {
              trapType: 'subtraction',
              deceptiveTrapToken: '6',
              linguisticPivotMarker: 'Two had to drop out due to work commitments, leaving just the four of us',
              correctExplanation: 'Subtraction pivot: Initially 6 individuals intended to travel, but 2 dropped out leaving exactly 4 attendees.',
              explanationId: 'Analisis Jebakan Percakapan: Rencana awal mencakup 6 orang, namun 2 orang membatalkan karena urusan pekerjaan sehingga tersisa 4 orang.'
            }
          },
          {
            questionNumber: 5,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Group dietary requirement for catering:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'vegetarian',
            acceptedAnswers: ['vegetarian', 'Vegetarian'],
            audioTimestampSeconds: 195.0,
            targetAccent: 'australian',
            distractorAnalysis: {
              trapType: 'negation',
              deceptiveTrapToken: 'gluten-free',
              linguisticPivotMarker: "My partner is gluten-free, but she's not coming; the rest of us strictly require vegetarian",
              correctExplanation: 'Third-party distractor: Gluten-free diet applies to a non-attending partner; active group requires vegetarian catering.',
              explanationId: 'Analisis Jebakan Percakapan: Makanan bebas gluten (gluten-free) diperuntukkan bagi pasangan yang batal hadir; peserta yang datang memerlukan makanan vegetarian.'
            }
          },
          {
            questionNumber: 6,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Vehicle registration code for parking permit:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'WA72 KLU',
            acceptedAnswers: ['WA72 KLU', 'WA72KLU', 'wa72 klu', 'wa72klu'],
            audioTimestampSeconds: 252.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'spelling',
              deceptiveTrapToken: 'WA72 KLV',
              linguisticPivotMarker: "Wait, is that a U or a V? It's definitely a U at the end",
              correctExplanation: 'Acoustic disambiguation trap: The receptionist clarified whether the terminal letter was U or V, confirming U.',
              explanationId: 'Analisis Jebakan Percakapan: Terjadi keraguan antara huruf akhir U atau V, yang ditegaskan kembali bahwa huruf terakhir adalah U.'
            }
          },
          {
            questionNumber: 7,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Booked afternoon outdoor excursion:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'guided kayaking',
            acceptedAnswers: ['guided kayaking', 'Guided Kayaking', 'kayaking', 'guided kayak'],
            audioTimestampSeconds: 285.0,
            targetAccent: 'australian',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'mountain biking',
              linguisticPivotMarker: 'We ruled out the cycling tour in favour of guided kayaking',
              correctExplanation: 'Preference pivot: Mountain biking / cycling was ruled out in favour of guided kayaking.',
              explanationId: 'Analisis Jebakan Percakapan: Tur bersepeda dibatalkan dan digantikan dengan tur kayak berpemandu (guided kayaking).'
            }
          },
          {
            questionNumber: 8,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Equipment requiring rental on arrival:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'waterproof boots',
            acceptedAnswers: ['waterproof boots', 'Waterproof boots', 'waterproof boot'],
            audioTimestampSeconds: 312.0,
            targetAccent: 'australian',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'trekking poles',
              linguisticPivotMarker: 'We have poles, but we urgently need waterproof boots',
              correctExplanation: 'Possession contrast: The caller already possesses trekking poles, but must hire waterproof boots. Note: "pair of waterproof boots" violates the 2-word limit.',
              explanationId: 'Analisis Jebakan Percakapan: Pemohon sudah memiliki tongkat trekking sendiri, namun perlu menyewa sepatu bot tahan air (waterproof boots).'
            }
          },
          {
            questionNumber: 9,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Required advance deposit amount: £',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: '125',
            acceptedAnswers: ['125', '£125', '125 pounds', 'one hundred and twenty-five'],
            audioTimestampSeconds: 338.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'currency',
              deceptiveTrapToken: '250',
              linguisticPivotMarker: 'The full balance is £250, but the advance deposit is exactly half that',
              correctExplanation: 'Total vs deposit arithmetic trap: The full price is £250, but the deposit is 50% (£125).',
              explanationId: 'Analisis Jebakan Percakapan: Total biaya keseluruhan adalah £250, namun deposit uang muka yang harus dibayarkan adalah setengahnya (£125).'
            }
          },
          {
            questionNumber: 10,
            sectionNumber: 1,
            type: 'form_completion',
            prompt: 'Booking confirmation transaction reference:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'ECH-9042',
            acceptedAnswers: ['ECH-9042', 'ECH9042', 'ECH 9042', 'ech-9042'],
            audioTimestampSeconds: 355.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'spelling',
              deceptiveTrapToken: 'ECH-9040',
              linguisticPivotMarker: "That's ECH-9042, not 9040",
              correctExplanation: 'Terminal digit correction trap: The clerk corrected the final digit from 0 to 2.',
              explanationId: 'Analisis Jebakan Percakapan: Petugas meralat digit terakhir referensi pemesanan dari 9040 menjadi 9042.'
            }
          }
        ]
      },
      {
        sectionNumber: 2,
        title: 'Section 2: Riverside Heritage Park & Nature Reserve Orientation',
        contextDescription: 'Public monologue by Operations Director Fiona MacLeod introducing the layout, spatial amenities, visitor policies, and volunteer initiatives of Riverside Heritage Park.',
        audioUrl: '/audio/ielts/listening/sec2_park_orientation.opus',
        durationSeconds: 410,
        speakers: [
          { speakerId: 'spk_director', name: 'Fiona MacLeod (Operations Director)', accent: 'scottish', gender: 'female', role: 'director' }
        ],
        spatialMapConfig: {
          mapImageUri: '/assets/ielts/maps/riverside_arts_complex.svg',
          viewBox: '0 0 1000 750',
          hotspots: [
            { letter: 'A', label: 'Café & Terrace', x: 180, y: 220, radius: 45 },
            { letter: 'B', label: 'Ceramics Workshop', x: 340, y: 510, radius: 45 },
            { letter: 'C', label: 'Sculpture Garden', x: 520, y: 160, radius: 45 },
            { letter: 'D', label: 'Main Amphitheater', x: 670, y: 380, radius: 45 },
            { letter: 'E', label: 'Printmaking Studio', x: 820, y: 290, radius: 45 },
            { letter: 'F', label: 'Audio-Visual Archive', x: 410, y: 680, radius: 45 },
            { letter: 'G', label: 'Emergency Assembly Lawn', x: 890, y: 600, radius: 45 }
          ]
        },
        questions: [
          {
            questionNumber: 11,
            sectionNumber: 2,
            type: 'map_labelling',
            prompt: 'Sculpture Garden location on park map:',
            instruction: 'Write the correct letter, A–G, next to Questions 11–15.',
            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            correctAnswer: 'C',
            acceptedAnswers: ['C', 'Location C', 'c'],
            audioTimestampSeconds: 85.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'cardinal_direction',
              deceptiveTrapToken: 'D',
              linguisticPivotMarker: 'Rather than by the amphitheater, the open-air sculpture garden lies due north alongside the old oak grove',
              correctExplanation: 'Cardinal direction navigation: Situated due north beside the grove at Location C.',
              explanationId: 'Analisis Petunjuk Arah: Bukan di dekat amfiteater (D), taman patung terbuka terletak di sebelah utara di samping deretan pohon ek (Lokasi C).'
            }
          },
          {
            questionNumber: 12,
            sectionNumber: 2,
            type: 'map_labelling',
            prompt: 'Ceramics Workshop location on park map:',
            instruction: 'Write the correct letter, A–G, next to Questions 11–15.',
            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            correctAnswer: 'B',
            acceptedAnswers: ['B', 'Location B', 'b'],
            audioTimestampSeconds: 115.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'cardinal_direction',
              deceptiveTrapToken: 'E',
              linguisticPivotMarker: 'Tucked behind the West Gallery, right past the corridor at Location B',
              correctExplanation: 'Left-hand floorplan tracking under Scottish cadence points to Location B behind the West Gallery.',
              explanationId: 'Analisis Peta: Mengikuti koridor ke arah barat di balik galeri barat, bengkel keramik berada di Lokasi B.'
            }
          },
          {
            questionNumber: 13,
            sectionNumber: 2,
            type: 'map_labelling',
            prompt: 'Café & Terrace location on park map:',
            instruction: 'Write the correct letter, A–G, next to Questions 11–15.',
            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            correctAnswer: 'A',
            acceptedAnswers: ['A', 'Location A', 'a'],
            audioTimestampSeconds: 145.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'cardinal_direction',
              deceptiveTrapToken: 'F',
              linguisticPivotMarker: 'Right beside the main entrance gate on your left as you enter at Location A',
              correctExplanation: 'Immediate entry orientation: Café & Terrace is immediately adjacent to the entrance gate.',
              explanationId: 'Analisis Peta: Berada tepat di sebelah kiri gerbang utama saat pertama kali masuk (Lokasi A).'
            }
          },
          {
            questionNumber: 14,
            sectionNumber: 2,
            type: 'map_labelling',
            prompt: 'Printmaking Studio location on park map:',
            instruction: 'Write the correct letter, A–G, next to Questions 11–15.',
            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            correctAnswer: 'E',
            acceptedAnswers: ['E', 'Location E', 'e'],
            audioTimestampSeconds: 178.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'cardinal_direction',
              deceptiveTrapToken: 'B',
              linguisticPivotMarker: 'Across on the far east perimeter facing the riverbank at Location E',
              correctExplanation: 'Far east wing adjoining the riverside trail marks Location E.',
              explanationId: 'Analisis Peta: Terletak di sayap paling timur menghadap tepian sungai (Lokasi E).'
            }
          },
          {
            questionNumber: 15,
            sectionNumber: 2,
            type: 'map_labelling',
            prompt: 'Audio-Visual Archive location on park map:',
            instruction: 'Write the correct letter, A–G, next to Questions 11–15.',
            options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            correctAnswer: 'F',
            acceptedAnswers: ['F', 'Location F', 'f'],
            audioTimestampSeconds: 205.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'cardinal_direction',
              deceptiveTrapToken: 'G',
              linguisticPivotMarker: 'Down at the southern boundary behind the heritage watermill at Location F',
              correctExplanation: 'Southern perimeter positioning past the watermill points to Location F.',
              explanationId: 'Analisis Peta: Di batas selatan di belakang kincir air bersejarah (Lokasi F).'
            }
          },
          {
            questionNumber: 16,
            sectionNumber: 2,
            type: 'multiple_choice',
            prompt: 'Discounted park membership concession applies strictly to:',
            instruction: 'Choose the correct letter, A, B, or C.',
            options: [
              'A. All local residents residing within 5 miles',
              'B. Full-time students and seniors over 65',
              'C. Any visitor arriving via public transit'
            ],
            correctAnswer: 'B',
            acceptedAnswers: ['B', 'b'],
            audioTimestampSeconds: 245.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'subtraction',
              deceptiveTrapToken: 'A',
              linguisticPivotMarker: 'The concession applies strictly to full-time students and those over 65',
              correctExplanation: 'Age threshold trap: Seniors over 60 do not qualify; the threshold is strictly 65+ alongside students.',
              explanationId: 'Analisis Jebakan: Diskon konsesi hanya berlaku untuk mahasiswa penuh waktu dan lansia berusia di atas 65 tahun.'
            }
          },
          {
            questionNumber: 17,
            sectionNumber: 2,
            type: 'note_completion',
            prompt: 'The monthly volunteer conservation tree-planting occurs on:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'Saturday morning',
            acceptedAnswers: ['Saturday morning', 'Saturday mornings', 'saturday morning', 'Saturday Morning'],
            audioTimestampSeconds: 275.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'date_shift',
              deceptiveTrapToken: 'Sunday afternoon',
              linguisticPivotMarker: 'We shifted the schedule from Sunday afternoon to Saturday morning to avoid heavy rainfall',
              correctExplanation: 'Schedule shift distractor: Originally held Sunday afternoon, now Saturday morning.',
              explanationId: 'Analisis Penjadwalan: Kegiatan dipindahkan dari Minggu siang menjadi Sabtu pagi untuk menghindari hujan lebat.'
            }
          },
          {
            questionNumber: 18,
            sectionNumber: 2,
            type: 'note_completion',
            prompt: 'Specialist wetland birdwatching blinds must be reserved via the:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'online portal',
            acceptedAnswers: ['online portal', 'Online portal', 'portal', 'website'],
            audioTimestampSeconds: 305.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'telephone hotline',
              linguisticPivotMarker: 'The telephone desk is unstaffed for bookings; everything must go through the online portal',
              correctExplanation: 'Channel exclusivity: Bookings cannot be made via telephone; online portal is mandatory.',
              explanationId: 'Analisis Saluran: Pemesanan tidak dapat dilakukan melalui telepon, melainkan wajib melalui portal online.'
            }
          },
          {
            questionNumber: 19,
            sectionNumber: 2,
            type: 'flowchart',
            prompt: 'Volunteer Registration Step 1: Prior to field work, participants collect an official:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'safety lanyard',
            acceptedAnswers: ['safety lanyard', 'Safety lanyard', 'lanyard'],
            audioTimestampSeconds: 340.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'high-visibility vest',
              linguisticPivotMarker: 'Vests are optional, but every participant must display a numbered safety lanyard',
              correctExplanation: 'Requirement vs optionality: Vests are optional; safety lanyard is compulsory.',
              explanationId: 'Analisis Prosedur: Rompi bersifat opsional, sedangkan safety lanyard wajib dikenakan.'
            }
          },
          {
            questionNumber: 20,
            sectionNumber: 2,
            type: 'flowchart',
            prompt: 'Final Step: Clear all organic gardening debris into the marked:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'compost bays',
            acceptedAnswers: ['compost bays', 'Compost bays', 'compost bay'],
            audioTimestampSeconds: 375.0,
            targetAccent: 'scottish',
            distractorAnalysis: {
              trapType: 'plural_morphology',
              deceptiveTrapToken: 'plastic bins',
              linguisticPivotMarker: 'Never throw pruning waste into general bins; deposit everything into the compost bays',
              correctExplanation: 'Categorical waste disposal rule requires using the compost bays.',
              explanationId: 'Analisis Prosedur: Sampah organik harus dimasukkan ke dalam compost bays, bukan tempat sampah umum.'
            }
          }
        ]
      },
      {
        sectionNumber: 3,
        title: 'Section 3: Renewable Microgrid & Subterranean Storage Tutorial',
        contextDescription: 'Colloquium between university tutor Dr. Henderson (British RP) and postgraduate engineering researchers Marcus (British RP) and Chloe (General American) reviewing their decentralized energy storage thesis.',
        audioUrl: '/audio/ielts/listening/sec3_microgrid_tutorial.opus',
        durationSeconds: 440,
        speakers: [
          { speakerId: 'spk_tutor', name: 'Dr. Henderson', accent: 'british_rp', gender: 'male', role: 'tutor' },
          { speakerId: 'spk_student_m', name: 'Marcus', accent: 'british_rp', gender: 'male', role: 'student' },
          { speakerId: 'spk_student_f', name: 'Chloe', accent: 'general_american', gender: 'female', role: 'student' }
        ],
        voiceAttributionItems: [21, 22, 23, 24, 25],
        questions: [
          {
            questionNumber: 21,
            sectionNumber: 3,
            type: 'voice_attribution',
            prompt: 'Salt cavern porosity and permeability modeling:',
            instruction: 'Which researcher was responsible for each aspect of the project? Choose from: A: Dr. Henderson, B: Marcus, C: Chloe.',
            options: ['A. Dr. Henderson', 'B. Marcus', 'C. Chloe'],
            correctAnswer: 'B',
            acceptedAnswers: ['B', 'Marcus', 'b'],
            audioTimestampSeconds: 72.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'voice_attribution',
              deceptiveTrapToken: 'C',
              linguisticPivotMarker: 'Chloe originally doubted it, but Marcus presented the core data on permeability',
              correctExplanation: 'Voice attribution trap: Separating Chloe who expressed doubts from Marcus who performed the data modeling.',
              explanationId: 'Analisis Atribusi Suara: Chloe awalnya meragukan pemodelan porositas, namun Marcus yang menyusun dan mempresentasikan datanya.'
            }
          },
          {
            questionNumber: 22,
            sectionNumber: 3,
            type: 'voice_attribution',
            prompt: 'Life-cycle environmental impact assessment:',
            instruction: 'Which researcher was responsible for each aspect of the project? Choose from: A: Dr. Henderson, B: Marcus, C: Chloe.',
            options: ['A. Dr. Henderson', 'B. Marcus', 'C. Chloe'],
            correctAnswer: 'A',
            acceptedAnswers: ['A', 'Dr. Henderson', 'a', 'Henderson'],
            audioTimestampSeconds: 110.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'voice_attribution',
              deceptiveTrapToken: 'B',
              linguisticPivotMarker: 'I took the liberty of compiling that baseline impact study myself so you could focus on simulations',
              correctExplanation: 'Tutor attribution: Dr. Henderson carried out the environmental baseline assessment himself.',
              explanationId: 'Analisis Atribusi: Dr. Henderson sendiri yang menyusun kajian dampak lingkungan agar mahasiswa fokus pada simulasi.'
            }
          },
          {
            questionNumber: 23,
            sectionNumber: 3,
            type: 'voice_attribution',
            prompt: 'Battery storage electrochemical degradation simulation:',
            instruction: 'Which researcher was responsible for each aspect of the project? Choose from: A: Dr. Henderson, B: Marcus, C: Chloe.',
            options: ['A. Dr. Henderson', 'B. Marcus', 'C. Chloe'],
            correctAnswer: 'C',
            acceptedAnswers: ['C', 'Chloe', 'c'],
            audioTimestampSeconds: 148.0,
            targetAccent: 'general_american',
            distractorAnalysis: {
              trapType: 'voice_attribution',
              deceptiveTrapToken: 'B',
              linguisticPivotMarker: 'Marcus assisted with data formatting, but Chloe wrote and executed the Python degradation model',
              correctExplanation: 'Collaboration nuance: Marcus only assisted with formatting, while Chloe authored the model.',
              explanationId: 'Analisis Atribusi: Marcus hanya membantu format data, sedangkan Chloe yang memprogram dan menjalankan simulasi degradasi baterai.'
            }
          },
          {
            questionNumber: 24,
            sectionNumber: 3,
            type: 'voice_attribution',
            prompt: 'Securing offshore North Sea core geological drill samples:',
            instruction: 'Which researcher was responsible for each aspect of the project? Choose from: A: Dr. Henderson, B: Marcus, C: Chloe.',
            options: ['A. Dr. Henderson', 'B. Marcus', 'C. Chloe'],
            correctAnswer: 'C',
            acceptedAnswers: ['C', 'Chloe', 'c'],
            audioTimestampSeconds: 185.0,
            targetAccent: 'general_american',
            distractorAnalysis: {
              trapType: 'voice_attribution',
              deceptiveTrapToken: 'A',
              linguisticPivotMarker: 'I was hesitant about offshore drilling samples, but Chloe convinced the committee',
              correctExplanation: 'Distinguishing tutor hesitation from student success: Chloe successfully lobbied the committee.',
              explanationId: 'Analisis Atribusi: Dr. Henderson awalnya ragu terhadap sampel lepas pantai, namun Chloe berhasil meyakinkan komite.'
            }
          },
          {
            questionNumber: 25,
            sectionNumber: 3,
            type: 'voice_attribution',
            prompt: 'Capital expenditure payback period sensitivity calculations:',
            instruction: 'Which researcher was responsible for each aspect of the project? Choose from: A: Dr. Henderson, B: Marcus, C: Chloe.',
            options: ['A. Dr. Henderson', 'B. Marcus', 'C. Chloe'],
            correctAnswer: 'B',
            acceptedAnswers: ['B', 'Marcus', 'b'],
            audioTimestampSeconds: 220.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'voice_attribution',
              deceptiveTrapToken: 'C',
              linguisticPivotMarker: 'Marcus crunched the financial numbers while Chloe was completing the laboratory testing',
              correctExplanation: 'Work division: Marcus handled financial sensitivity metrics.',
              explanationId: 'Analisis Atribusi: Marcus yang menghitung analisis sensitivitas keuangan ketika Chloe menyelesaikan uji laboratorium.'
            }
          },
          {
            questionNumber: 26,
            sectionNumber: 3,
            type: 'multiple_choice',
            prompt: 'What principal barrier disrupted their municipal feeder voltage analysis?',
            instruction: 'Choose the correct letter, A, B, or C.',
            options: [
              'A. Intermittent telemetry dropouts in rural monitoring sensors',
              'B. Regulatory refusal to disclose transmission tariffs',
              'C. Uncalibrated hardware in transformer stations'
            ],
            correctAnswer: 'A',
            acceptedAnswers: ['A', 'a'],
            audioTimestampSeconds: 265.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'negation',
              deceptiveTrapToken: 'B',
              linguisticPivotMarker: 'The council gave us full tariff transparency; our genuine roadblock was wireless data dropouts in remote sensors',
              correctExplanation: 'Tariff data was provided; the real issue was sensor packet loss.',
              explanationId: 'Analisis Pilihan Ganda: Dewan kota memberikan transparansi tarif, kendala utamanya adalah hilangnya sinyal telemetri sensor pedesaan.'
            }
          },
          {
            questionNumber: 27,
            sectionNumber: 3,
            type: 'multiple_choice',
            prompt: 'Dr. Henderson advises prioritizing which area in the updated literature review?',
            instruction: 'Choose the correct letter, A, B, or C.',
            options: [
              'A. Large-scale thermal power plant retirement',
              'B. Hydrogen pipeline metallurgical embrittlement',
              'C. Hybrid photovoltaic storage integration'
            ],
            correctAnswer: 'C',
            acceptedAnswers: ['C', 'c'],
            audioTimestampSeconds: 305.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'B',
              linguisticPivotMarker: 'Metallurgy is over-studied; what your paper crucially needs is recent literature on hybrid solar-battery coupling',
              correctExplanation: 'Advisory contrast: Metallurgical embrittlement has sufficient coverage; hybrid solar storage is the priority.',
              explanationId: 'Analisis Pilihan Ganda: Aspek metalurgi sudah banyak dikaji; prioritas utama yang disarankan adalah integrasi penyimpanan fotovoltaik hibrida.'
            }
          },
          {
            questionNumber: 28,
            sectionNumber: 3,
            type: 'multiple_choice',
            prompt: 'Which stakeholder group voiced primary resistance to converter station placement?',
            instruction: 'Choose the correct letter, A, B, or C.',
            options: [
              'A. Municipal environmental inspectors',
              'B. Local farming cooperatives',
              'C. Highway transportation authorities'
            ],
            correctAnswer: 'B',
            acceptedAnswers: ['B', 'b'],
            audioTimestampSeconds: 345.0,
            targetAccent: 'general_american',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'A',
              linguisticPivotMarker: 'Inspectors approved the blueprints immediately, but agricultural cooperatives feared land partition'
              ,
              correctExplanation: 'Approval vs resistance: Inspectors approved; farming cooperatives raised objections.',
              explanationId: 'Analisis Pilihan Ganda: Pengawas lingkungan langsung menyetujui, kelompok yang menolak adalah koperasi petani setempat.'
            }
          },
          {
            questionNumber: 29,
            sectionNumber: 3,
            type: 'note_completion',
            prompt: 'Proposed solution for summer solar generation curtailment:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'smart inverters',
            acceptedAnswers: ['smart inverters', 'smart inverter regulation', 'Smart inverters', 'smart inverter'],
            audioTimestampSeconds: 385.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'technical_term',
              deceptiveTrapToken: 'diesel generators',
              linguisticPivotMarker: 'Rather than firing back-up generators, dynamic smart inverters can regulate reactive power',
              correctExplanation: 'Technological choice: Smart inverters displace conventional generators.',
              explanationId: 'Analisis Catatan: Alih-alih generator diesel cadangan, solusi yang digunakan adalah smart inverters.'
            }
          },
          {
            questionNumber: 30,
            sectionNumber: 3,
            type: 'note_completion',
            prompt: 'Room assigned for the final departmental colloquium defence:',
            instruction: 'Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
            correctAnswer: 'Room 402',
            acceptedAnswers: ['Room 402', '402', 'room 402', 'Room402'],
            audioTimestampSeconds: 420.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'rejection',
              deceptiveTrapToken: 'Room 305',
              linguisticPivotMarker: 'The chemistry faculty booked Room 305, so we have relocated to Room 402 on the top floor',
              correctExplanation: 'Room conflict pivot: Relocated from Room 305 to Room 402.',
              explanationId: 'Analisis Ruangan: Ruang 305 telah dipesan oleh fakultas kimia, sehingga presentasi dipindahkan ke Ruang 402.'
            }
          }
        ]
      },
      {
        sectionNumber: 4,
        title: 'Section 4: Cetacean Bioacoustics & Hydrodynamic Biomimicry',
        contextDescription: 'Monograph university academic lecture delivered by Prof. Eleanor Vance (British RP) analyzing acoustic phonation in cetaceans and hydrodynamic adaptations informing marine engineering.',
        audioUrl: '/audio/ielts/listening/sec4_cetacean_bioacoustics.opus',
        durationSeconds: 480,
        speakers: [
          { speakerId: 'spk_lecturer', name: 'Prof. Eleanor Vance', accent: 'british_rp', gender: 'female', role: 'professor' }
        ],
        uninterruptedLecture: true,
        noteCompletionRange: [31, 40],
        questions: [
          {
            questionNumber: 31,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Phonation Anatomy: Unlike terrestrial mammals, odontocetes produce echolocation clicks using their:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'phonic lips',
            acceptedAnswers: ['phonic lips', 'Phonic lips'],
            audioTimestampSeconds: 75.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'plural_morphology',
              deceptiveTrapToken: 'vocal cords',
              linguisticPivotMarker: 'Cetaceans possess no vocal cords; acoustic impulses originate in the phonic lips',
              correctExplanation: 'Negative assertion trap: Explicitly repudiates vocal cords in favour of phonic lips. Must be plural!',
              explanationId: 'Analisis Jebakan Negasi: Paus tidak memiliki pita suara (vocal cords); gelombang suara dihasilkan oleh phonic lips (bentuk jamak).'
            }
          },
          {
            questionNumber: 32,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Dialect Transmission: Pod-specific acoustic dialects develop primarily through:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'cultural transmission',
            acceptedAnswers: ['cultural transmission', 'Cultural transmission'],
            audioTimestampSeconds: 120.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'technical_term',
              deceptiveTrapToken: 'genetic inheritance',
              linguisticPivotMarker: 'Far from being genetically hardwired, dialects rely on cultural transmission',
              correctExplanation: 'Concessive contrast: Dialects are not genetic; they are learned via cultural transmission.',
              explanationId: 'Analisis Kontras: Bukan diwariskan secara genetik, dialek pod berkembang melalui transmisi kultural (cultural transmission).'
            }
          },
          {
            questionNumber: 33,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Boundary Layer Physics: Micro-riblets mimicking elasmobranch scales minimize hydrodynamic:',
            instruction: 'Write ONE WORD ONLY for each answer.',
            wordLimit: 'ONE WORD ONLY',
            correctAnswer: 'drag',
            acceptedAnswers: ['drag', 'Drag'],
            audioTimestampSeconds: 165.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'technical_term',
              deceptiveTrapToken: 'friction',
              linguisticPivotMarker: 'While friction is mitigated, the macroscopic benefit is a dramatic drop in total drag',
              correctExplanation: 'Precise aerodynamic/hydrodynamic terminology: Total drag is the primary metric.',
              explanationId: 'Analisis Kosakata: Meskipun friksi berkurang, target aerodinamika utamanya adalah penurunan hambatan fluida (drag).'
            }
          },
          {
            questionNumber: 34,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Pectoral Fin Morphology: Humpback whale flippers prevent aerodynamic stall through scalloped:',
            instruction: 'Write ONE WORD ONLY for each answer.',
            wordLimit: 'ONE WORD ONLY',
            correctAnswer: 'tubercles',
            acceptedAnswers: ['tubercles', 'Tubercles'],
            audioTimestampSeconds: 210.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'plural_morphology',
              deceptiveTrapToken: 'ridges',
              linguisticPivotMarker: 'These are not simple ridges, but hydrodynamic nodes scientifically designated as tubercles',
              correctExplanation: 'Exact AWL anatomical designation: Must be tubercles (plural form obligatory).',
              explanationId: 'Analisis Morfologi: Tonjolan hidrodinamik pada sirip paus bungkuk disebut tubercles (jamak).'
            }
          },
          {
            questionNumber: 35,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Anthropogenic Interference: Commercial maritime traffic generates low-frequency:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'acoustic masking',
            acceptedAnswers: ['acoustic masking', 'Acoustic masking'],
            audioTimestampSeconds: 260.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'technical_term',
              deceptiveTrapToken: 'sound pollution',
              linguisticPivotMarker: 'Marine biologists term this specific interference acoustic masking',
              correctExplanation: 'Technical scientific terminology: "Sound pollution" is colloquial; "acoustic masking" is the precise phenomenon.',
              explanationId: 'Analisis Istilah Teknis: Gangguan suara kapal komersial secara ilmiah disebut acoustic masking.'
            }
          },
          {
            questionNumber: 36,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Predatory Coordination: Resident pods herd schooling herring using acoustic bursts in:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'carousel feeding',
            acceptedAnswers: ['carousel feeding', 'Carousel feeding'],
            audioTimestampSeconds: 305.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'technical_term',
              deceptiveTrapToken: 'bubble nets',
              linguisticPivotMarker: 'Unlike humpback bubble nets, orcas employ synchronized acoustics during carousel feeding',
              correctExplanation: 'Species behavior distinction: Bubble netting is used by humpbacks; carousel feeding by orcas.',
              explanationId: 'Analisis Perilaku Hewan: Beda dengan bubble nets pada paus bungkuk, paus pembunuh melakukan carousel feeding.'
            }
          },
          {
            questionNumber: 37,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Pelagic Orientation: Long-distance pelagic navigation relies partly on magnetosensitive:',
            instruction: 'Write ONE WORD ONLY for each answer.',
            wordLimit: 'ONE WORD ONLY',
            correctAnswer: 'receptors',
            acceptedAnswers: ['receptors', 'Receptors'],
            audioTimestampSeconds: 350.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'plural_morphology',
              deceptiveTrapToken: 'crystals',
              linguisticPivotMarker: 'Magnetite crystals exist, but the neural pathway depends on specialized cellular receptors',
              correctExplanation: 'Physiological mechanism: Crystals trigger the cellular receptors (plural).',
              explanationId: 'Analisis Fisiologis: Kristal magnetit mengaktivasi reseptor seluler biologis (receptors - bentuk jamak).'
            }
          },
          {
            questionNumber: 38,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Naval Sonar Trauma: High-intensity active pinging causes rapid ascent, triggering fatal:',
            instruction: 'Write NO MORE THAN TWO WORDS for each answer.',
            wordLimit: 'NO MORE THAN TWO WORDS',
            correctAnswer: 'decompression sickness',
            acceptedAnswers: ['decompression sickness', 'Decompression sickness'],
            audioTimestampSeconds: 395.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'technical_term',
              deceptiveTrapToken: 'heart arrhythmia',
              linguisticPivotMarker: 'Military sonar induces panic-dives, precipitating lethal decompression sickness',
              correctExplanation: 'Pathological precision: Panic ascents cause decompression sickness (the bends).',
              explanationId: 'Analisis Patologi: Gelombang sonar militer memicu dekompresi mendadak yang mengakibatkan decompression sickness.'
            }
          },
          {
            questionNumber: 39,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Bio-inspired Sensing: Autonomous submersibles map fluid wakes by emulating pinniped:',
            instruction: 'Write ONE WORD ONLY for each answer.',
            wordLimit: 'ONE WORD ONLY',
            correctAnswer: 'whiskers',
            acceptedAnswers: ['whiskers', 'Whiskers'],
            audioTimestampSeconds: 435.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'plural_morphology',
              deceptiveTrapToken: 'antennae',
              linguisticPivotMarker: 'Engineers replicate the undulated geometry of seal whiskers rather than robotic antennae',
              correctExplanation: 'Biomimetic source: Pinniped whiskers (vibrissae) provide vortex tracking. Must be plural!',
              explanationId: 'Analisis Biomimetika: Sensor robotik meniru bentuk kumis anjing laut (whiskers - bentuk jamak).'
            }
          },
          {
            questionNumber: 40,
            sectionNumber: 4,
            type: 'summary_completion',
            prompt: 'Surface Coatings: Non-toxic biomimetic polymers protect commercial vessel:',
            instruction: 'Write ONE WORD ONLY for each answer.',
            wordLimit: 'ONE WORD ONLY',
            correctAnswer: 'hulls',
            acceptedAnswers: ['hulls', 'Hulls'],
            audioTimestampSeconds: 468.0,
            targetAccent: 'british_rp',
            distractorAnalysis: {
              trapType: 'plural_morphology',
              deceptiveTrapToken: 'propellers',
              linguisticPivotMarker: 'While propellers receive ceramic treatment, anti-fouling polymers are primarily coated onto ship hulls',
              correctExplanation: 'Vessel anatomy: Anti-fouling polymers are applied to ship hulls (plural).',
              explanationId: 'Analisis Kelautan: Polimer anti-fouling diaplikasikan terutama pada lambung kapal (hulls - bentuk jamak).'
            }
          }
        ]
      }
    ]
  }
];
