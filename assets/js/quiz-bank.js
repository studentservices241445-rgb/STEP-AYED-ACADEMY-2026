/*
  بنك أسئلة (تجريبي) لاختبار تحديد المستوى السريع
  - أسئلة مُنشأة خصيصًا للموقع (غير منسوخة من أي اختبار رسمي)
*/

export const QUIZ_BANK = [
  // Grammar (Structure)
  {
    id: 'G01',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'Neither the students nor the teacher ____ available tomorrow.',
    options: ['are', 'is', 'were', 'be'],
    answer: 1,
    explain: 'The subject closer to the verb is “teacher” (singular) → is.'
  },
  {
    id: 'G02',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'By the time we arrived, the meeting ____ already ____.',
    options: ['has / started', 'had / started', 'was / start', 'had / start'],
    answer: 1,
    explain: 'Past perfect for the earlier past action: had started.'
  },
  {
    id: 'G03',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'If I ____ more time, I would join you.',
    options: ['have', 'had', 'will have', 'am having'],
    answer: 1,
    explain: 'Second conditional: If + past simple, would + base.'
  },
  {
    id: 'G04',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'The report, along with the attachments, ____ on your desk.',
    options: ['are', 'were', 'is', 'have'],
    answer: 2,
    explain: 'Main subject “report” is singular → is.'
  },
  {
    id: 'G05',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'Hardly ____ the bus when it started to rain.',
    options: ['we had left', 'had we left', 'we left', 'we have left'],
    answer: 1,
    explain: 'Hardly + past perfect requires inversion: had we left.'
  },
  {
    id: 'G06',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'The number of applicants ____ increasing every year.',
    options: ['are', 'is', 'were', 'be'],
    answer: 1,
    explain: '“The number” is singular → is.'
  },
  {
    id: 'G07',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'She insisted that he ____ the contract carefully.',
    options: ['reads', 'read', 'reading', 'to read'],
    answer: 1,
    explain: 'Subjunctive after insist: base verb → read.'
  },
  {
    id: 'G08',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'This is the first time I ____ this kind of problem.',
    options: ['see', 'saw', 'have seen', 'had seen'],
    answer: 2,
    explain: 'Present perfect with “This is the first time…”.'
  },
  {
    id: 'G09',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'The book was written by a scientist ____ ideas changed the field.',
    options: ['whose', 'who', 'which', 'whom'],
    answer: 0,
    explain: 'Possession for ideas → whose.'
  },
  {
    id: 'G10',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'Not only ____ late, but he also forgot the documents.',
    options: ['he arrived', 'arrived he', 'did he arrive', 'he did arrive'],
    answer: 2,
    explain: 'Inversion with “Not only” → did he arrive.'
  },

  // Vocabulary
  {
    id: 'V01',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The manager was reluctant to approve the proposal.',
    options: ['eager', 'unwilling', 'ready', 'certain'],
    answer: 1,
    explain: 'Reluctant = unwilling/hesitant.'
  },
  {
    id: 'V02',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'The new policy was designed to ____ corruption.',
    options: ['curb', 'inflate', 'impose', 'complicate'],
    answer: 0,
    explain: 'Curb = limit/control.'
  },
  {
    id: 'V03',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'His explanation was so ____ that everyone understood immediately.',
    options: ['ambiguous', 'lucid', 'vague', 'random'],
    answer: 1,
    explain: 'Lucid = clear.'
  },
  {
    id: 'V04',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The scientist proposed a plausible theory.',
    options: ['believable', 'dangerous', 'impossible', 'unrelated'],
    answer: 0,
    explain: 'Plausible = believable/reasonable.'
  },
  {
    id: 'V05',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'The lecture was ____ by technical issues and delays.',
    options: ['hampered', 'praised', 'accelerated', 'celebrated'],
    answer: 0,
    explain: 'Hampered = hindered.'
  },
  {
    id: 'V06',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'The city implemented measures to ____ traffic congestion.',
    options: ['alleviate', 'ignore', 'worsen', 'deny'],
    answer: 0,
    explain: 'Alleviate = reduce/relieve.'
  },
  {
    id: 'V07',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The results were inconsistent with his claims.',
    options: ['in agreement', 'incompatible', 'identical', 'predictable'],
    answer: 1,
    explain: 'Inconsistent with = incompatible with.'
  },
  {
    id: 'V08',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'The committee reached a ____ decision after hours of debate.',
    options: ['hasty', 'consensus', 'fragile', 'casual'],
    answer: 1,
    explain: 'Consensus = general agreement.'
  },
  {
    id: 'V09',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The evidence is substantial.',
    options: ['tiny', 'significant', 'unclear', 'temporary'],
    answer: 1,
    explain: 'Substantial = significant/considerable.'
  },
  {
    id: 'V10',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'Her achievements were ____ recognized by the university.',
    options: ['blatantly', 'formally', 'roughly', 'barely'],
    answer: 1,
    explain: 'Formally = officially.'
  },

  // Reading (short passages)
  {
    id: 'R01',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'Many people assume that multitasking makes them more productive. However, research suggests that switching between tasks can reduce accuracy and increase the time needed to finish each task. Instead, focusing on one task at a time often leads to better results.',
    question: 'What is the main idea of the passage?',
    options: [
      'Multitasking always saves time.',
      'Task switching can harm performance.',
      'Accuracy is unrelated to productivity.',
      'Research on productivity is unreliable.'
    ],
    answer: 1,
    explain: 'The passage argues that switching tasks reduces accuracy and efficiency.'
  },
  {
    id: 'R02',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'Urban trees provide shade, reduce air pollution, and can lower city temperatures. Despite these benefits, maintaining trees requires planning and funding. Cities that invest in long-term maintenance tend to see the greatest return.',
    question: 'Why do some cities get the greatest return from urban trees?',
    options: ['They avoid planning.', 'They invest in maintenance.', 'They plant only small trees.', 'They reduce funding.'],
    answer: 1,
    explain: 'Long-term maintenance is linked to greatest benefits.'
  },
  {
    id: 'R03',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'The term “placebo effect” refers to improvements that occur because a person expects a treatment to work, not necessarily because the treatment has an active ingredient. This phenomenon highlights the influence of belief on perception.',
    question: 'According to the passage, the placebo effect is mainly about…',
    options: ['active ingredients', 'expectations', 'genetics', 'long-term illness'],
    answer: 1,
    explain: 'It’s improvements due to expecting treatment to work.'
  },
  {
    id: 'R04',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'Some historians argue that trade routes shaped cultures by enabling the exchange of goods and ideas. Others believe geography and climate played a larger role. Most agree that multiple factors contributed to cultural development.',
    question: 'Which statement best describes the passage?',
    options: [
      'Only trade routes matter.',
      'Historians agree on one cause.',
      'Different factors influenced cultural development.',
      'Geography is irrelevant to culture.'
    ],
    answer: 2,
    explain: 'The passage presents multiple factors.'
  },

  // Listening-style (no audio): “best response / inference”
  {
    id: 'L01',
    section: 'listening',
    prompt: 'Choose the best response (listening-style).',
    stem: 'A: “Could you email me the file tonight?”  B: “I’ll do it as soon as I get home.”\nWhat does B mean?',
    options: ['B refuses.', 'B will do it later tonight.', 'B already sent it.', 'B forgot the file.'],
    answer: 1,
    explain: 'B promises to send when he gets home.'
  },
  {
    id: 'L02',
    section: 'listening',
    prompt: 'Choose the best answer (listening-style).',
    stem: 'A: “Did you enjoy the conference?”  B: “The speakers were great, but the schedule was exhausting.”\nHow did B feel overall?',
    options: ['Completely negative', 'Mixed feelings', 'Bored', 'Indifferent'],
    answer: 1,
    explain: 'Great speakers but exhausting schedule → mixed.'
  },
  {
    id: 'L03',
    section: 'listening',
    prompt: 'Choose the best answer (listening-style).',
    stem: 'A: “Are you coming to the study group?”  B: “I have a quiz tomorrow morning.”\nWhat is B implying?',
    options: ['B will definitely come', 'B might be busy preparing', 'B already took the quiz', 'B forgot the quiz'],
    answer: 1,
    explain: 'Having a quiz implies needing to prepare; likely busy.'
  },
  {
    id: 'L04',
    section: 'listening',
    prompt: 'Choose the best answer (listening-style).',
    stem: 'A: “Can we meet at 5?”  B: “That’s a bit tight, but I can try.”\nWhat does B mean?',
    options: ['B cannot meet at all', 'B is uncertain but will attempt', 'B prefers earlier', 'B is angry'],
    answer: 1,
    explain: 'A bit tight → schedule difficult, but will attempt.'
  },

  // Compositional Analysis (CA): best sentence / error
  {
    id: 'C01',
    section: 'writing',
    prompt: 'Choose the sentence with the best grammar and clarity.',
    options: [
      'Because of the rain, therefore we cancelled the trip.',
      'Because of the rain, we cancelled the trip.',
      'Because the rain, we cancelled the trip.',
      'Because of raining, we cancelled trip.'
    ],
    answer: 1,
    explain: 'No “therefore” needed; correct phrasing.'
  },
  {
    id: 'C02',
    section: 'writing',
    prompt: 'Choose the best revision.',
    stem: 'Original: “The research was very good and it was done by the team quickly.”',
    options: [
      'The research was good and the team did it quickly.',
      'The team conducted the research efficiently, and the results were strong.',
      'The research is good and was done quickly by team.',
      'Team quickly did the research, which very good.'
    ],
    answer: 1,
    explain: 'More formal and clear.'
  },

  // Add more (mix)
  {
    id: 'G11',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'It was essential that every participant ____ an ID card.',
    options: ['brings', 'bring', 'brought', 'bringing'],
    answer: 1,
    explain: 'Subjunctive after “It was essential that …” → bring.'
  },
  {
    id: 'V11',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The company is expanding rapidly.',
    options: ['quickly', 'quietly', 'slowly', 'rarely'],
    answer: 0,
    explain: 'Rapidly = quickly.'
  },
  {
    id: 'R05',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'Some people learn best by reading, while others prefer listening or hands-on practice. Effective study plans often combine methods to match a learner’s strengths.',
    question: 'What does the passage suggest about study plans?',
    options: ['One method fits everyone.', 'Combining methods can be effective.', 'Reading is always best.', 'Practice is unnecessary.'],
    answer: 1,
    explain: 'It recommends combining methods.'
  },
  {
    id: 'G12',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'No sooner ____ the announcement than the crowd began to cheer.',
    options: ['did they hear', 'they heard', 'had they heard', 'they have heard'],
    answer: 2,
    explain: 'No sooner + past perfect inversion: had they heard.'
  },
  {
    id: 'V12',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'The instructions were ____ and easy to follow.',
    options: ['cryptic', 'explicit', 'obsolete', 'fragile'],
    answer: 1,
    explain: 'Explicit = clear and detailed.'
  },
  {
    id: 'C03',
    section: 'writing',
    prompt: 'Choose the sentence that is most coherent.',
    options: [
      'He studied hard. Therefore, he passed the exam.',
      'He studied hard. Although, he passed the exam.',
      'He studied hard, because, he passed the exam.',
      'He studied hard. However, he passed the exam.'
    ],
    answer: 0,
    explain: '“Therefore” correctly shows cause-effect.'
  },
  {
    id: 'L05',
    section: 'listening',
    prompt: 'Choose the best answer (listening-style).',
    stem: 'A: “Do you want the window open?”  B: “I’m fine either way.”\nWhat does B mean?',
    options: ['B strongly prefers open', 'B has no strong preference', 'B dislikes fresh air', 'B is cold'],
    answer: 1,
    explain: 'Either way = no preference.'
  },

  // Extra bank to reach variety
  {
    id: 'G13',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'The data ____ analyzed before we publish the report.',
    options: ['need to be', 'needs to be', 'need be', 'needs be'],
    answer: 0,
    explain: '“Data” often treated as plural in formal contexts → need to be.'
  },
  {
    id: 'V13',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The plan was ambitious.',
    options: ['easy', 'ordinary', 'bold', 'careless'],
    answer: 2,
    explain: 'Ambitious = bold/aspiring.'
  },
  {
    id: 'R06',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'A “carbon footprint” measures the total greenhouse gases produced directly and indirectly by an individual or organization. Reducing energy waste and choosing efficient transport can lower this footprint.',
    question: 'Which action would likely reduce a carbon footprint?',
    options: ['Leaving lights on', 'Using public transport', 'Driving more', 'Ignoring energy use'],
    answer: 1,
    explain: 'Public transport is typically more efficient per person.'
  },
  {
    id: 'C04',
    section: 'writing',
    prompt: 'Choose the best sentence.',
    options: [
      'The results were good; however, we need more evidence.',
      'The results were good however we need more evidence.',
      'The results were good, because we need more evidence.',
      'The results were good, so however we need more evidence.'
    ],
    answer: 0,
    explain: 'Correct punctuation with “however”.'
  },
  {
    id: 'G14',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'She has been working here ____ 2019.',
    options: ['for', 'since', 'during', 'by'],
    answer: 1,
    explain: 'Since + starting point.'
  },
  {
    id: 'V14',
    section: 'vocab',
    prompt: 'Choose the best word to complete the sentence.',
    stem: 'The witness gave a ____ account of what happened.',
    options: ['detailed', 'fragile', 'casual', 'artificial'],
    answer: 0,
    explain: 'Detailed = with many details.'
  },
  {
    id: 'R07',
    section: 'reading',
    prompt: 'Read the passage and answer the question.',
    passage: 'While some people think technology isolates us, others argue it enables connection across distance. In reality, the impact depends on how people use it.',
    question: 'The passage suggests that technology’s impact is…',
    options: ['always negative', 'always positive', 'dependent on usage', 'irrelevant'],
    answer: 2,
    explain: 'It depends on how people use technology.'
  },
  {
    id: 'L06',
    section: 'listening',
    prompt: 'Choose the best answer (listening-style).',
    stem: 'A: “Did you finish the assignment?”  B: “I’m almost there.”\nWhat does B mean?',
    options: ['B finished it', 'B is close to finishing', 'B will not do it', 'B lost it'],
    answer: 1,
    explain: 'Almost there = close to completion.'
  },

  // extra to make the bank larger
  {
    id: 'G15',
    section: 'grammar',
    prompt: 'Choose the best answer.',
    stem: 'I would rather you ____ me before making a decision.',
    options: ['call', 'called', 'calling', 'to call'],
    answer: 1,
    explain: 'Would rather + past simple for preference about someone else: called.'
  },
  {
    id: 'V15',
    section: 'vocab',
    prompt: 'Choose the closest meaning.',
    stem: 'The project was postponed.',
    options: ['delayed', 'completed', 'ignored', 'improved'],
    answer: 0,
    explain: 'Postponed = delayed.'
  }
];
