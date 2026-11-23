import { SpeakingExamPackage } from '../../types';

export const SPEAKING_PACKAGES_SEED: SpeakingExamPackage[] = [
  {
    id: 'pkg_speaking_01',
    title: 'IELTS Speaking Practice Battery A (Mentorship & Digital Culture)',
    description: 'Official Cambridge-standard speaking assessment battery evaluating communicative competence in academic mentorship and digital society.',
    levelCode: 'ielts_academic',
    parts: {
      part1: {
        title: 'Part 1: Introduction & Familiar Topics',
        durationGuideline: '4–5 minutes',
        topicSets: [
          {
            topicName: 'Work & Studies',
            questions: [
              'Do you currently work, or are you pursuing academic studies?',
              'What motivated you to select this specific discipline or career trajectory?',
              'What is the most intellectually rewarding dimension of your daily academic or professional tasks?',
              'Do you anticipate that technological disruption will significantly reshape your field over the coming decade?'
            ]
          },
          {
            topicName: 'Technology & Internet',
            questions: [
              'What digital applications or software tools are most indispensable to your everyday productivity?',
              'Do you believe the proliferation of algorithmic communication has improved or degraded interpersonal connections?',
              'How frequently do you make a conscious effort to disconnect completely from digital displays?',
              'In what ways has the internet democratized access to specialized tertiary education?'
            ]
          }
        ]
      },
      part2: {
        title: 'Part 2: Individual Long Turn',
        cueCards: [
          {
            id: 'cue_card_1a',
            cueCardCode: '1A',
            themeCategory: 'People',
            taskTitle: 'An Inspiring Educator or Academic Mentor',
            promptLeadIn: 'You should say:',
            bulletPrompts: [
              'Who this individual was and what discipline they instructed you in',
              'When and within what academic institution you crossed paths with them',
              'What specific pedagogical methods or personal attributes distinguished their guidance',
              'And explain why this mentor exerted such a profound long-term influence on your academic or personal development'
            ],
            clarificationPrompt: 'You will have exactly one minute to organize your notes on the digital scratchpad before presenting your uninterrupted monologue for up to two minutes.',
            prepTime: 60,
            speakTime: 120,
            followUpQuestions: [
              'Do you maintain regular contact with this educator today?',
              'Do you think great teachers are born with natural charisma or forged through rigorous pedagogical training?'
            ],
            modelBand8Transcript: 'I would like to speak about Dr. Alistair Vance, who was a senior lecturer in comparative literature at my university. When I first attended his seminar, I was immediately captivated because his pedagogical approach was entirely unorthodox. Although many professors relied on rigid lecture slides, Dr. Vance cultivated an intellectually vibrant Socratic forum where every student felt empowered to challenge established dogmas. What set him apart was his remarkable ability to demonstrate which literary theories remained relevant to contemporary societal dilemmas, while encouraging us to think critically. Since he consistently scrutinized our analytical drafts with voluminous margin notes, I learned to interrogate cognitive biases that had previously constrained my thinking. He taught me to synthesize disparate paradigms and articulate nuanced arguments with syntactic precision. In the long run, his unyielding encouragement played a pivotal role in my scholarly trajectory, proving that genuine mentorship is indispensable because it transforms human lives.'
          },
          {
            id: 'cue_card_3a',
            cueCardCode: '3A',
            themeCategory: 'Objects',
            taskTitle: 'An Indispensable Technological Gadget',
            promptLeadIn: 'You should say:',
            bulletPrompts: [
              'What the device is and when you originally acquired it',
              'What specific functional capabilities and applications you utilize it for',
              'How frequently you incorporate it into your daily scholastic or professional routine',
              'And explain why you consider this gadget to be utterly indispensable to your daily productivity or well-being'
            ],
            clarificationPrompt: 'You will have exactly one minute to organize your notes on the digital scratchpad before presenting your uninterrupted monologue for up to two minutes.',
            prepTime: 60,
            speakTime: 120,
            followUpQuestions: [
              'How severely would your daily workflow be disrupted if this device malfunctioned unexpectedly?',
              'Do you foresee wearable AI peripherals rendering handheld computing gadgets obsolete in the foreseeable future?'
            ],
            modelBand8Transcript: 'The technological device that I find utterly indispensable is my stylus-enabled digital tablet, which I acquired roughly two years ago when commencing an intensive research project. Primarily, I utilize this device as a centralized repository for annotating empirical research papers, synchronizing handwritten mathematical schematics, and executing collaborative whiteboarding sessions with colleagues overseas. Because the hardware integrates cloud-based optical character recognition, every handwritten diagram and margin note is instantly indexed and searchable. I rely on it virtually around the clock, from reviewing morning literature briefs to structuring complex project architectures during afternoon strategy sessions. What makes this gadget truly irreplaceable is how it bridges the cognitive tactile benefits of physical pen-and-paper handwriting with the infinite scalability of digital knowledge management. Before integrating this device into my workflow, my desk was chronically overwhelmed by stacks of printed manuscripts and fragmented notebooks. Now, all scholarly documentation is seamlessly synchronized across my devices, which eliminates cognitive friction and enhances my daily productivity exponentially. In essence, it has become part and parcel of my intellectual lifestyle.'
          }
        ]
      },
      part3: {
        title: 'Part 3: Two-Way In-Depth Abstract Discussion',
        durationGuideline: '4–5 minutes',
        thematicTopics: [
          {
            themeTitle: 'Mentorship & Education in AI era',
            questions: [
              {
                question: 'To what extent can autonomous artificial intelligence platforms replace the empathetic guidance and tailored mentorship provided by human educators?',
                probingAspect: 'Affective vs cognitive dimensions of education; algorithmic bias and emotional support.',
                sampleBand8KeyPoints: [
                  'AI excels at adaptive drill pacing and factual retrieval',
                  'Human mentors provide moral framing, emotional resilience, and metacognitive guidance',
                  'A hybrid model preserves the irreplaceable human element while leveraging technological scale'
                ]
              },
              {
                question: 'How might the pedagogical role of classroom teachers evolve as generative AI tools become ubiquitous in schools and universities?',
                probingAspect: 'Curriculum restructuring away from rote memorization toward verbal defense and synthesis.',
                sampleBand8KeyPoints: [
                  'Oral viva voce examinations and Socratic debates become crucial',
                  'Evaluating reasoning processes rather than static final essays',
                  'Fostering intellectual discernment in scrutinizing synthetic outputs'
                ]
              },
              {
                question: 'Is there a danger that algorithmic tutors will homogenize student thought and undermine critical heterodoxy in academic research?',
                probingAspect: 'Homogenization of viewpoints and reinforcement of dominant linguistic or cultural paradigms.',
                sampleBand8KeyPoints: [
                  'Proprietary algorithms reflect underlying training corpus biases',
                  'Regional and indigenous epistemic traditions may be marginalized',
                  'Educational governance must mandate pluralistic curriculum algorithms'
                ]
              }
            ]
          },
          {
            themeTitle: 'Automation vs Human Touch',
            questions: [
              {
                question: 'In which professional domains is the human touch fundamentally irreplaceable, regardless of the sophistication of automated systems?',
                probingAspect: 'Healthcare, psychotherapy, jurisprudence, and high-stakes diplomacy.',
                sampleBand8KeyPoints: [
                  'Palliative care and psychoanalysis demand authentic visceral empathy',
                  'Judicial sentencing requires nuanced contextual human discernment',
                  'Automated algorithms lack moral agency and cannot be held liable for ethical breaches'
                ]
              },
              {
                question: 'Why do many consumers still crave interpersonal human interaction when conducting high-stakes financial or medical transactions?',
                probingAspect: 'Trust, reassurance, and shared accountability.',
                sampleBand8KeyPoints: [
                  'Empathy creates psychological psychological reassurance during vulnerable life transitions',
                  'Algorithmic chatbots cannot express authentic compassion or intuitive reassurance',
                  'Accountability is perceived as higher when dealing with human fiduciaries'
                ]
              },
              {
                question: 'Could hyper-automation lead to an existential loss of purpose among future generations of workers?',
                probingAspect: 'Socio-economic dislocation and redefining human worth beyond market productivity.',
                sampleBand8KeyPoints: [
                  'Human self-esteem has historically been inextricably tethered to vocation',
                  'Widespread technological displacement necessitates a re-evaluation of social purpose',
                  'Societies may need to champion creative arts, philosophy, and community stewardship as core endeavors'
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'pkg_speaking_02',
    title: 'IELTS Speaking Practice Battery B (Urban Heritage & Environmental Stewardship)',
    description: 'Rigorous diagnostic speaking battery focusing on sustainable urbanism, ecological remediation, and civic conservation.',
    levelCode: 'ielts_academic',
    parts: {
      part1: {
        title: 'Part 1: Introduction & Familiar Topics',
        durationGuideline: '4–5 minutes',
        topicSets: [
          {
            topicName: 'Hometown & Living Environment',
            questions: [
              'Where is your hometown situated, and what constitutes its most defining geographic or cultural landmark?',
              'Has the urban landscape of your hometown witnessed extensive infrastructural or environmental transformations over the past decade?',
              'Do local residents have convenient access to pristine botanical parks and pedestrianized public plazas?',
              'Would you prefer to establish your permanent residence in a vibrant metropolis or a peaceful suburban enclave?'
            ]
          },
          {
            topicName: 'Daily Environment & Food',
            questions: [
              'To what extent do you take into account the ecological footprint and packaging of the food items you purchase?',
              'Do you consciously prioritize locally sourced organic produce or reduce single-use plastic packaging?',
              'How significantly does the immediate physical layout of your neighborhood influence your dietary and cooking habits?',
              'What practical policy measures could municipalities adopt to drastically curtail single-use plastics and food wastage in local markets?'
            ]
          }
        ]
      },
      part2: {
        title: 'Part 2: Individual Long Turn',
        cueCards: [
          {
            id: 'cue_card_2a',
            cueCardCode: '2A',
            themeCategory: 'Places',
            taskTitle: 'A Tranquil Nature Retreat',
            promptLeadIn: 'You should say:',
            bulletPrompts: [
              'Where this pristine natural location is situated geographically',
              'When and with whom you ventured to this sanctuary',
              'What distinct physical topography, flora, fauna, or sensory elements characterized the setting',
              'And explain why this secluded natural retreat provided you with profound tranquility and psychological restoration'
            ],
            clarificationPrompt: 'You will have exactly one minute to organize your notes on the digital scratchpad before presenting your uninterrupted monologue for up to two minutes.',
            prepTime: 60,
            speakTime: 120,
            followUpQuestions: [
              'Does this natural sanctuary attract substantial seasonal ecotourism or does it remain relatively secluded?',
              'Should regional authorities allocate greater fiscal resources toward preserving untouched biospheres from commercial encroachment?'
            ],
            modelBand8Transcript: 'I would like to describe a remarkably tranquil alpine valley known as the Kamikochi highland reserve, nestled within the Chubu Sangaku National Park. I had the privilege of traveling there during early autumn two years ago, specifically seeking respite after an arduous semester of university examinations. What struck me upon arrival was the pristine crystal-clear Azusa River, flanked by towering larch groves whose foliage was turning vivid shades of gold and amber against a dramatic backdrop of rugged granite peaks. Because vehicular access is strictly prohibited beyond the valley entrance, the auditory landscape is devoid of mechanical noise, punctuated only by rushing glacial streams and birdsong. Spending several uninterrupted days hiking through this virgin wilderness allowed me to disengage completely from digital stimuli and urban anxieties. The crisp mountain air and panoramic vistas induced a profound state of cognitive restoration, demonstrating how immersing oneself in untouched natural biospheres can alleviate chronic psychological fatigue and restore one\'s intrinsic equilibrium.'
          },
          {
            id: 'cue_card_4b',
            cueCardCode: '4B',
            themeCategory: 'Experiences',
            taskTitle: 'A Community Environmental Initiative',
            promptLeadIn: 'You should say:',
            bulletPrompts: [
              'What the ecological project, policy, or community initiative was',
              'How you first became cognizant of or engaged with this project',
              'What tangible operations or remediation measures were carried out by participants',
              'And explain why you consider this civic initiative to have achieved substantial success or lasting local impact'
            ],
            clarificationPrompt: 'You will have exactly one minute to organize your notes on the digital scratchpad before presenting your uninterrupted monologue for up to two minutes.',
            prepTime: 60,
            speakTime: 120,
            followUpQuestions: [
              'Did this grassroots endeavor inspire similar initiatives in neighboring districts?',
              'What is the most daunting hurdle facing grassroots civic environmental campaigns today?'
            ],
            modelBand8Transcript: 'I want to highlight a grassroots environmental initiative called the Riverbank Rewilding and Clean-up Campaign, organized in my local municipality to rehabilitate a heavily polluted urban waterway. I originally discovered the endeavor through a flyer distributed at our community cultural center, and decided to volunteer alongside neighborhood residents. Over the course of six months, our collective carried out extensive remediation operations: we methodically extracted accumulated non-biodegradable debris, established native riparian vegetation along the embankments to combat soil erosion, and installed artisanal filtration barriers to intercept runoff before it reached the main channel. Furthermore, we conducted workshops educating local merchants on eco-friendly disposal protocols. This initiative proved extraordinarily successful not only because the biological oxygen demand of the water improved dramatically and waterfowl returned to the habitat, but because it cultivated a profound sense of shared civic responsibility. It proved unequivocally that grassroots collective action can effectively remediate neglected public commons and serve as an inspiring blueprint for municipal environmental stewardship.'
          }
        ]
      },
      part3: {
        title: 'Part 3: Two-Way In-Depth Abstract Discussion',
        durationGuideline: '4–5 minutes',
        thematicTopics: [
          {
            themeTitle: 'Tourism vs Heritage Preservation',
            questions: [
              {
                question: 'How can municipal planners strike a balance between harnessing mass tourism revenue and safeguarding fragile historical architecture from physical degradation?',
                probingAspect: 'Visitor capacity limits, conservation fees, and zoning restrictions.',
                sampleBand8KeyPoints: [
                  'Implementing dynamic ticketing quotas and timed entry permits',
                  'Reinvesting tourism taxes into ongoing structural restoration',
                  'Dispersing tourist footfall to lesser-known cultural monuments to avoid localized overtourism'
                ]
              },
              {
                question: 'Should quotas or hefty carbon taxes be levied on international travelers visiting fragile biosphere sanctuaries?',
                probingAspect: 'Environmental justice versus conservation economics.',
                sampleBand8KeyPoints: [
                  'Fragile ecosystems cannot withstand unchecked carrying capacity without biodiversity collapse',
                  'Differential pricing ensures low-impact visitors while funding conservation rangers',
                  'Virtual and augmented reality experiences can provide accessible alternatives'
                ]
              },
              {
                question: 'What ethical responsibilities do commercial tour operators bear toward preserving indigenous cultural narratives without commercial distortion?',
                probingAspect: 'Authenticity, profit incentives, and local community agency.',
                sampleBand8KeyPoints: [
                  'Tour operators must partner with indigenous councils rather than imposing exoticized stereotypes',
                  'Equitable revenue sharing ensures communities benefit directly from cultural tourism',
                  'Educational briefings should be mandated to educate visitors on local taboos and sacred norms'
                ]
              }
            ]
          },
          {
            themeTitle: 'Citizen activism vs Government policy',
            questions: [
              {
                question: 'To what extent can decentralized grassroots consumer boycotts effect meaningful climate reform compared to binding statutory emissions regulations?',
                probingAspect: 'Consumer agency versus state regulatory power.',
                sampleBand8KeyPoints: [
                  'Consumer campaigns generate public visibility and incentivize corporate ESG compliance',
                  'Grassroots boycotts often lack durability and cannot enforce systemic industrial standards',
                  'Binding statutory mandates, carbon pricing, and legal penalties remain the ultimate driver of macro-scale decarbonization'
                ]
              },
              {
                question: 'Why do sweeping governmental environmental edicts frequently face political inertia or public non-compliance?',
                probingAspect: 'Socio-economic friction, transition costs, and perceived inequity.',
                sampleBand8KeyPoints: [
                  'Abrupt regulations can disproportionately burden working-class citizens, provoking political backlash',
                  'Lack of transparent public dialogue fosters mistrust in scientific mandates',
                  'Policymakers must pair regulatory mandates with transition subsidies and green social safety nets'
                ]
              },
              {
                question: 'How can educational institutions instill genuine ecological stewardship in youngsters rather than passive compliance with recycling rules?',
                probingAspect: 'Experiential pedagogy, outdoor learning, and ecological literacy.',
                sampleBand8KeyPoints: [
                  'Replacing rote compliance memorization with active participation in community ecology projects',
                  'Teaching systems thinking to understand how consumer supply chains impact global biomes',
                  'Fostering emotional resonance with nature through regular outdoor immersion'
                ]
              }
            ]
          }
        ]
      }
    }
  }
];
