// HEMA Training Program Data — v9
const SCHEDULE = ['C','B','C','A','B','C','S']; // Mon-Sun
const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const DAY_LABELS = {A:'Grip, Shoulders & Sword Cardio',B:'Posterior Chain, Core & Back Pain',C:'Active Recovery & Mobility',S:'Class Day'};
const DAY_COLORS = {A:'var(--accent)',B:'var(--yellow)',C:'var(--green)',S:'var(--accent2)'};

const PROGRESSION = [
  {weeks:'1-2',target:'90 sec continuous',format:'90s work / 90s rest × 3 rounds'},
  {weeks:'3-4',target:'2 min continuous',format:'2 min / 1 min rest'},
  {weeks:'5-6',target:'3-4 min continuous',format:'3 min / 1 min rest'},
  {weeks:'7-8',target:'5-7 min continuous',format:'4 min / 1 min rest'},
  {weeks:'9+',target:'10 min continuous',format:'Extend toward full rounds'}
];

const REMINDERS = [
  'Nasal breathing during all exercise — if you must mouth-breathe, slow down',
  'Brace your core before every rep: breathe in, tighten abs like bracing for a punch, then move',
  'Neck check: if your neck is sore or tired, do NOT push through. Skip or substitute.',
  'Posture check: shoulders back & down, chin tucked — same as your guard stance'
];

function ex(name, target, inputs, desc, section) {
  return {name, target, inputs, desc, section};
}

const EXERCISES = {
  A: {
    sections: [
      {id:'morning', icon:'🌅', title:'Morning — Upper Body Strength & Prehab', time:'12-15 min'},
      {id:'evening', icon:'🌙', title:'Evening — Sword Intervals', time:'8-10 min'}
    ],
    exercises: [
      ex('Dead Bug (L)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on your back, arms straight up toward the ceiling, knees bent at 90 degrees (shins parallel to floor). Slowly lower your RIGHT arm overhead and LEFT leg toward the floor at the same time. Go only as far as you can while keeping your lower back PRESSED FLAT to the floor — the moment your back arches, you\'ve gone too far. Return to start. Slow and controlled. This trains the same deep core as the curl-up without any neck involvement.','morning'),
      ex('Dead Bug (R)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side — lower LEFT arm and RIGHT leg.','morning'),
      ex('Side Plank (L)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Lie on your side, elbow under shoulder. Knees bent (beginner) or legs straight (harder). Lift hips so your body is a straight line. Hold. Don\'t let hips sag or rotate. Breathe normally.','morning'),
      ex('Side Plank (R)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','morning'),
      ex('Bird Dog (L)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'On hands and knees. Extend opposite arm and leg simultaneously until level with your torso. Hold 5 sec. Keep hips square to the floor — don\'t rotate. Imagine balancing a cup of water on your lower back.','morning'),
      ex('Bird Dog (R)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Wrist Curls — Flex','2×12',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Anchor a light resistance band under your foot, hold the other end. Curl wrist up (flexion). Slow and controlled. Forearm rests on your thigh or a table. These build the endurance that keeps your sword under control in long exchanges.','morning'),
      ex('Wrist Curls — Ext','2×12',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same setup as flexion curls, but curl wrist downward (extension).','morning'),
      ex('Wrist Curls — Radial','2×12',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same setup, curl wrist thumb-side up (radial deviation).','morning'),
      ex('Wrist Curls — Ulnar','2×12',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same setup, curl wrist pinky-side up (ulnar deviation).','morning'),
      ex('Band Pull-Aparts','2×15',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hold a resistance band at shoulder height, arms straight in front of you. Pull the band apart by squeezing your shoulder blades together until the band touches your chest. Slow return. Don\'t shrug your shoulders up. Builds the upper back endurance to keep your guard up when your shoulders are screaming.','morning'),
      ex('Shoulder Halos (L)','2×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hold a light kettlebell by the horns (or your sword by the pommel) at chest height. Circle it slowly around your head — keep the weight close to your head, elbows tight. Builds the shoulder mobility and stability for overhead cuts.','morning'),
      ex('Shoulder Halos (R)','2×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left, reverse direction.','morning'),
      ex('Dead Hangs','3×20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Hang from a pull-up bar with straight arms, shoulders engaged (pull shoulder blades slightly down, don\'t just dangle). Grip overhand, shoulder width. This is your single most important exercise right now. Your grip is failing before your lungs do — dead hangs fix that directly. Also decompresses the spine. Work up to 30s, then 45s.','morning'),
      ex('Wall Push-Ups','2×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'},{label:'Type',key:'type',type:'select',options:['Wall','Counter','Knee','Full']}],
        'Hands on a wall (easiest) or a counter/bench (harder). Body straight, lower your chest to the surface, push back. Full range of motion. Work up to 3×15, then progress to counter. Progress: wall → counter → knee push-ups → full push-ups over weeks.','morning'),
      ex('Sword Intervals','3 rds 90s/90s',[{label:'Rounds',key:'rounds',type:'number'},{label:'Work (sec)',key:'work',type:'number'},{label:'Rest (sec)',key:'rest',type:'number'}],
        'Each round, pick a focus:\n• Round 1: Slow oberhau (descending cuts) — edge alignment and hip engagement\n• Round 2: Unterhau (rising cuts) — drive from the legs, not the arms\n• Round 3: Zwerchau (cross cuts) — rotate from the core, keep the point threatening\n\nWhen 3 rounds feel manageable, add:\n• Round 4: Free combination — chain cuts together with intent\n• Round 5: Increase speed to sparring pace\n\nKey cue: When your shoulders burn and you want to let the sword droop, focus on driving cuts from your hips and core, not your arms.','evening')
    ]
  },
  B: {
    sections: [
      {id:'morning', icon:'🌅', title:'Morning — Strength & Back Rehab', time:'15 min'},
      {id:'evening', icon:'🌙', title:'Evening — Carries & Stretching', time:'8 min'}
    ],
    exercises: [
      ex('Dead Bug (L)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on your back, arms straight up, knees at 90°. Lower opposite arm and leg toward the floor. Keep lower back FLAT. Slow and controlled. No neck involvement.','morning'),
      ex('Dead Bug (R)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side — lower LEFT arm and RIGHT leg.','morning'),
      ex('Side Plank (L)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Elbow under shoulder, hips up, body straight. Knees bent (easier) or legs straight. Don\'t sag or rotate.','morning'),
      ex('Side Plank (R)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','morning'),
      ex('Bird Dog (L)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Extend opposite arm/leg. Hold 5 sec. Hips stay square — no rotation.','morning'),
      ex('Bird Dog (R)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Glute Bridges','3×15, 2s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'},{label:'Weight (lbs)',key:'weight',type:'number'}],
        'Lie on your back, knees bent, feet flat on floor hip-width apart. Drive through your heels and squeeze your glutes to lift your hips until your body is a straight line from knees to shoulders. Squeeze glutes HARD at the top for 2 sec. Lower slowly. Don\'t hyperextend your lower back. Your son can sit on your hips for added resistance.','morning'),
      ex('Goblet Squats','2×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'},{label:'Weight (lbs)',key:'weight',type:'number'}],
        'Hold a dumbbell or kettlebell at your chest with both hands, elbows pointing down. Feet shoulder-width, toes slightly out. Sit down and back like sitting into a chair. Keep chest up, weight in your heels. Go as deep as you can while keeping your back flat. Work up to 3×12.','morning'),
      ex('Single-Leg RDL (L)','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Stand on one leg, slight bend in the knee. Hinge at the hips, reaching the opposite hand toward the floor while your free leg extends behind you. Your back stays flat. Go until you feel a stretch in the standing leg\'s hamstring, then squeeze your glute to stand back up. Use a wall for balance if needed.','morning'),
      ex('Single-Leg RDL (R)','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Pallof Press (L)','3×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Anchor a resistance band at chest height to a door or post. Stand sideways to the anchor, hold the band at your chest with both hands. Press the band straight out in front of you. The band will try to rotate you — resist it. Hold arms extended for 2 sec. This anti-rotation strength directly protects your spine during twisting cuts.','morning'),
      ex('Pallof Press (R)','3×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Farmer Carries','2×25s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'},{label:'Weight (lbs)',key:'weight',type:'number'}],
        'Pick up the heaviest dumbbells or kettlebells you can hold (or carry your son). Walk with them. Stand tall — shoulders back and down, core braced, don\'t lean to either side. This primarily trains your trunk to stabilize under load. Work up to 3×40s.','evening'),
      ex('Hip Flexor Stretch (L)','2×45s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Kneel with one foot on the floor in front of you (lunge position) and the top of your back foot on a couch or chair behind you. Squeeze the glute of the back leg and gently shift your hips forward until you feel a deep stretch in the front of your back hip. Stay upright. Your hip flexors are shortened from sitting all day — this undoes that.','evening'),
      ex('Hip Flexor Stretch (R)','2×45s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','evening'),
      ex('Sword Work (optional)','5 min',[{label:'Did it?',key:'done',type:'select',options:['Yes','No','Skipped']}],
        'Only if you have energy. Light, slow cuts focusing on form. Not a conditioning session — just movement practice.','evening')
    ]
  },
  C: {
    sections: [
      {id:'main', icon:'🧘', title:'Recovery & Mobility', time:'12-15 min'}
    ],
    exercises: [
      ex('Dead Bug (L)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on your back, arms straight up, knees at 90°. Lower opposite arm and leg toward the floor. Keep lower back FLAT. Slow and controlled. No neck involvement.','main'),
      ex('Dead Bug (R)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side — lower LEFT arm and RIGHT leg.','main'),
      ex('Side Plank (L)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Elbow under shoulder, hips up, body straight. Knees bent (easier) or legs straight. Don\'t sag or rotate.','main'),
      ex('Side Plank (R)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','main'),
      ex('Bird Dog (L)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Extend opposite arm/leg. Hold 5 sec. Hips stay square — no rotation.','main'),
      ex('Bird Dog (R)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','main'),
      ex('Thoracic Rotations (L)','1×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'On hands and knees. Place one hand behind your head. Rotate your upper back to open your elbow toward the ceiling, then rotate down to bring your elbow toward your opposite knee. Move slowly. Your lower back should NOT move — all rotation comes from the mid/upper back. This is the mobility that lets you throw clean zwerchau and schielhau.','main'),
      ex('Thoracic Rotations (R)','1×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','main'),
      ex('90/90 Hip Switches','1×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Sit on the floor, both knees bent at 90 degrees — one in front, one to the side. Rotate both knees to the opposite side in one smooth motion. Sit tall, don\'t lean back. Go slow. This opens up the hip rotation you need for passing steps and deep stances.','main'),
      ex('Deep Squat Hold','2×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Feet shoulder-width, toes slightly out. Squat as deep as you can and hold. Use a book under your heels — this is normal for tight ankles from desk sitting and will improve over weeks. Push knees out with your elbows. Breathe and relax into it. Work up to 3×30s. Your son probably does this naturally — let him show you up.','main'),
      ex('Pigeon Stretch (L)','2×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'From hands and knees, bring one knee forward and lay that shin across your body. Extend the other leg straight behind you. Sink your hips toward the floor. If this is too intense, do a figure-4 stretch on your back instead. Tight glutes and piriformis refer pain directly to the lower back. Work up to 2×45s.','main'),
      ex('Pigeon Stretch (R)','2×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','main'),
      ex('Cat-Cow','1×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Inhale: drop your belly, lift your chest and tailbone (cow). Exhale: round your back, tuck your chin and tailbone (cat). Move with your breath, slow and smooth. Kids love doing this one — make animal noises.','main'),
      ex('Hip Flexor Stretch (L)','1×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Kneel in a lunge, back foot up on couch. Squeeze back glute, shift hips forward. Stay upright. Undo the damage from sitting all day. Work up to 2×45s.','main'),
      ex('Hip Flexor Stretch (R)','1×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','main'),
      ex('Foam Rolling','optional',[{label:'Done?',key:'done',type:'select',options:['Yes','No','Skipped']}],
        'Skip if short on time or energy. Roll these areas 30-60 sec each:\n• Upper back: Lie on the roller, arms crossed over chest, roll from mid-back to shoulders.\n• Lats: Lie on your side, roller under your armpit.\n• Glutes: Sit on the roller, cross one ankle over the opposite knee.\n• Hip flexors/quads: Face down, roller under one thigh.\n• Forearms: Roll each forearm on the roller or a lacrosse ball on a table.','main'),
      ex('Play w/ Son','10+ min',[{label:'Minutes',key:'mins',type:'number'}],
        'Tag, wrestling, crawling races, sword fighting with pool noodles, playground time — whatever gets you both moving and laughing. This is real recovery. Don\'t skip it because it doesn\'t look like exercise.','main')
    ]
  },
  S: {
    sections: [
      {id:'prehab', icon:'🛡️', title:'Prehab — Before Class', time:'10 min'},
      {id:'classlog', icon:'🗡️', title:'Class Log', time:''}
    ],
    exercises: [
      ex('Dead Bug (L)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on your back, arms straight up, knees at 90°. Lower opposite arm and leg toward the floor. Keep lower back FLAT. Slow and controlled. No neck involvement.','prehab'),
      ex('Dead Bug (R)','3×6',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side — lower LEFT arm and RIGHT leg.','prehab'),
      ex('Side Plank (L)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Elbow under shoulder, hips up, body straight. Knees bent (easier) or legs straight. Don\'t sag or rotate.','prehab'),
      ex('Side Plank (R)','3×15s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','prehab'),
      ex('Bird Dog (L)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Extend opposite arm/leg. Hold 5 sec. Hips stay square — no rotation.','prehab'),
      ex('Bird Dog (R)','3×6, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','prehab'),
      ex('Hip Flexor Stretch (L)','1×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Kneel in a lunge, back foot up on couch. Squeeze back glute, shift hips forward. Stay upright.','prehab'),
      ex('Hip Flexor Stretch (R)','1×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','prehab'),
      ex('Class Feel','1-5',[{label:'Rating',key:'rating',type:'number'},{label:'Kept up better?',key:'better',type:'select',options:['Yes','No','Same']}],
        'Rate how you felt in class from 1 (terrible, gassed immediately) to 5 (felt strong the whole time). Track whether you\'re keeping up better than previous weeks.','classlog')
    ]
  }
};
