// HEMA Training Program Data
const SCHEDULE = ['C','B','C','A','B','C','S']; // Mon-Sun
const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const DAY_LABELS = {A:'Grip, Shoulders & Sword Cardio',B:'Posterior Chain, Core & Back Pain',C:'Active Recovery & Mobility',S:'Class Day'};
const DAY_COLORS = {A:'var(--accent)',B:'var(--yellow)',C:'var(--green)',S:'var(--accent2)'};

const PROGRESSION = [
  {weeks:'1-2',target:'90 sec continuous',format:'90s work / 90s rest'},
  {weeks:'3-4',target:'2 min continuous',format:'2 min / 1 min rest'},
  {weeks:'5-6',target:'3-4 min continuous',format:'3 min / 1 min rest'},
  {weeks:'7-8',target:'5-7 min continuous',format:'4 min / 1 min rest'},
  {weeks:'9+',target:'10 min continuous',format:'Extend toward full rounds'}
];

const REMINDERS = [
  'Nasal breathing during all exercise — if you must mouth-breathe, slow down',
  'Brace your core before every rep: breathe in, tighten abs like bracing for a punch, then move',
  'Posture check: shoulders back & down, chin tucked — same as your guard stance'
];

function ex(name, target, inputs, desc, section) {
  return {name, target, inputs, desc, section};
}

const EXERCISES = {
  A: {
    sections: [
      {id:'morning', icon:'🌅', title:'Morning — Upper Body Strength & Prehab', time:'15 min'},
      {id:'evening', icon:'🌙', title:'Evening — Sword Intervals', time:'10-12 min'}
    ],
    exercises: [
      // Morning - McGill Big 3
      ex('McGill Curl-Up','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on your back. One knee bent, one leg straight. Hands under the small of your back to preserve the natural curve. Lift only your head and shoulders ~1 inch off the ground. Hold 2 sec. Do NOT flatten your back or tuck your chin to your chest. This is not a crunch — the movement is tiny.','morning'),
      ex('Side Plank (L)','3×15-20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Lie on your side, elbow under shoulder. Knees bent (beginner) or legs straight (harder). Lift hips so your body is a straight line. Hold. Don\'t let hips sag or rotate. Breathe normally.','morning'),
      ex('Side Plank (R)','3×15-20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','morning'),
      ex('Bird Dog (L)','3×8, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'On hands and knees. Extend opposite arm and leg simultaneously until level with your torso. Hold 5 sec. Keep hips square to the floor — don\'t rotate. Imagine balancing a cup of water on your lower back.','morning'),
      ex('Bird Dog (R)','3×8, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      // Grip & Shoulder
      ex('Wrist Curls — Flex','3×15',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Anchor a light resistance band under your foot, hold the other end. Curl wrist up (flexion). Slow and controlled. Forearm rests on your thigh or a table. These build the endurance that keeps your sword under control in long exchanges.','morning'),
      ex('Wrist Curls — Ext','3×15',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same setup as flexion curls, but curl wrist downward (extension).','morning'),
      ex('Wrist Curls — Radial','3×15',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same setup, curl wrist thumb-side up (radial deviation).','morning'),
      ex('Wrist Curls — Ulnar','3×15',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same setup, curl wrist pinky-side up (ulnar deviation).','morning'),
      ex('Band Pull-Aparts','3×20',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hold a resistance band at shoulder height, arms straight in front of you. Pull the band apart by squeezing your shoulder blades together until the band touches your chest. Slow return. Don\'t shrug your shoulders up. Builds the upper back endurance to keep your guard up when your shoulders are screaming.','morning'),
      ex('Shoulder Halos (L)','3×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hold a light kettlebell by the horns (or your sword by the pommel) at chest height. Circle it slowly around your head — keep the weight close to your head, elbows tight. Builds the shoulder mobility and stability for overhead cuts.','morning'),
      ex('Shoulder Halos (R)','3×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left, reverse direction.','morning'),
      ex('Dead Hangs','4×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Hang from a pull-up bar with straight arms, shoulders engaged (pull shoulder blades slightly down, don\'t just dangle). Grip overhand, shoulder width. This is your single most important exercise right now. Your grip is failing before your lungs do — dead hangs fix that directly. Also decompresses the spine.','morning'),
      ex('Push-Ups','3×10-15',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'},{label:'Type',key:'type',type:'select',options:['Wall','Counter','Knee','Full']}],
        'Hands on a wall (easiest) or a counter/bench (harder). Body straight, lower your chest to the surface, push back. Full range of motion. Progress: wall → counter → knee push-ups → full push-ups over weeks.','morning'),
      // Evening
      ex('Sword Intervals','5 rds 90s/90s',[{label:'Rounds',key:'rounds',type:'number'},{label:'Work (sec)',key:'work',type:'number'},{label:'Rest (sec)',key:'rest',type:'number'}],
        'Each round, pick a focus:\n• Round 1: Slow oberhau (descending cuts) — edge alignment and hip engagement\n• Round 2: Unterhau (rising cuts) — drive from the legs, not the arms\n• Round 3: Zwerchau (cross cuts) — rotate from the core, keep the point threatening\n• Round 4: Free combination — chain cuts together with intent\n• Round 5: Increase speed to sparring pace\n\nKey cue: When your shoulders burn and you want to let the sword droop, focus on driving cuts from your hips and core, not your arms. Let the big muscles do the work.','evening')
    ]
  },
  B: {
    sections: [
      {id:'morning', icon:'🌅', title:'Morning — Strength & Back Rehab', time:'20 min'},
      {id:'evening', icon:'🌙', title:'Evening — Carries & Stretching', time:'10 min'}
    ],
    exercises: [
      ex('McGill Curl-Up','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on back, one knee bent, one leg straight. Hands under lower back. Lift head/shoulders ~1 inch. Hold 2 sec. Tiny movement — not a crunch.','morning'),
      ex('Side Plank (L)','3×15-20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Elbow under shoulder, hips up, body straight. Knees bent (easier) or legs straight. Don\'t sag or rotate.','morning'),
      ex('Side Plank (R)','3×15-20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','morning'),
      ex('Bird Dog (L)','3×8, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Extend opposite arm/leg. Hold 5 sec. Hips stay square — no rotation.','morning'),
      ex('Bird Dog (R)','3×8, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Glute Bridges','3×15, 2s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'},{label:'Weight (lbs)',key:'weight',type:'number'}],
        'Lie on your back, knees bent, feet flat on floor hip-width apart. Drive through your heels and squeeze your glutes to lift your hips until your body is a straight line from knees to shoulders. Squeeze glutes HARD at the top for 2 sec. Lower slowly. Don\'t hyperextend your lower back. Your son can sit on your hips for added resistance.','morning'),
      ex('Goblet Squats','3×12',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'},{label:'Weight (lbs)',key:'weight',type:'number'}],
        'Hold a dumbbell or kettlebell at your chest with both hands, elbows pointing down. Feet shoulder-width, toes slightly out. Sit down and back like sitting into a chair. Keep chest up, weight in your heels. Go as deep as you can while keeping your back flat.','morning'),
      ex('Single-Leg RDL (L)','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Stand on one leg, slight bend in the knee. Hinge at the hips, reaching the opposite hand toward the floor while your free leg extends behind you. Your back stays flat. Go until you feel a stretch in the standing leg\'s hamstring, then squeeze your glute to stand back up. Use a wall for balance if needed.','morning'),
      ex('Single-Leg RDL (R)','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Pallof Press (L)','3×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Anchor a resistance band at chest height to a door or post. Stand sideways to the anchor, hold the band at your chest with both hands. Press the band straight out in front of you. The band will try to rotate you — resist it. Hold arms extended for 2 sec. This anti-rotation strength directly protects your spine during twisting cuts.','morning'),
      ex('Pallof Press (R)','3×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','morning'),
      ex('Farmer Carries','3×30-40s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'},{label:'Weight (lbs)',key:'weight',type:'number'}],
        'Pick up the heaviest dumbbells or kettlebells you can hold (or carry your son). Walk with them. Stand tall — shoulders back and down, core braced, don\'t lean to either side. This primarily trains your trunk to stabilize under load.','evening'),
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
      {id:'main', icon:'🧘', title:'Recovery & Mobility', time:'15-20 min'}
    ],
    exercises: [
      ex('McGill Curl-Up','3×8',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Lie on back, one knee bent, one leg straight. Hands under lower back. Lift head/shoulders ~1 inch. Hold 2 sec. Tiny movement — not a crunch.','main'),
      ex('Side Plank (L)','3×15-20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Elbow under shoulder, hips up, body straight. Knees bent (easier) or legs straight. Don\'t sag or rotate.','main'),
      ex('Side Plank (R)','3×15-20s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','main'),
      ex('Bird Dog (L)','3×8, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Extend opposite arm/leg. Hold 5 sec. Hips stay square — no rotation.','main'),
      ex('Bird Dog (R)','3×8, 5s hold',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','main'),
      ex('Thoracic Rotations (L)','2×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'On hands and knees. Place one hand behind your head. Rotate your upper back to open your elbow toward the ceiling, then rotate down to bring your elbow toward your opposite knee. Move slowly. Your lower back should NOT move — all rotation comes from the mid/upper back. This is the mobility that lets you throw clean zwerchau and schielhau.','main'),
      ex('Thoracic Rotations (R)','2×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Same as left side.','main'),
      ex('90/90 Hip Switches','2×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Sit on the floor, both knees bent at 90 degrees — one in front, one to the side. Rotate both knees to the opposite side in one smooth motion. Sit tall, don\'t lean back. Go slow. This opens up the hip rotation you need for passing steps and deep stances.','main'),
      ex('Deep Squat Hold','3×30s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Feet shoulder-width, toes slightly out. Squat as deep as you can and hold. Keep heels on the floor (elevate them on a book if needed). Push knees out with your elbows. Breathe and relax into it. Your son probably does this naturally — let him show you up.','main'),
      ex('Pigeon Stretch (L)','2×45s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'From hands and knees, bring one knee forward and lay that shin across your body. Extend the other leg straight behind you. Sink your hips toward the floor. If this is too intense, do a figure-4 stretch on your back instead. Tight glutes and piriformis refer pain directly to the lower back.','main'),
      ex('Pigeon Stretch (R)','2×45s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','main'),
      ex('Cat-Cow','2×10',[{label:'Sets',key:'sets',type:'number'},{label:'Reps',key:'reps',type:'number'}],
        'Hands and knees. Inhale: drop your belly, lift your chest and tailbone (cow). Exhale: round your back, tuck your chin and tailbone (cat). Move with your breath, slow and smooth. Kids love doing this one — make animal noises.','main'),
      ex('Hip Flexor Stretch (L)','2×45s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Kneel in a lunge, back foot up on couch. Squeeze back glute, shift hips forward. Stay upright. Undo the damage from sitting all day.','main'),
      ex('Hip Flexor Stretch (R)','2×45s',[{label:'Sets',key:'sets',type:'number'},{label:'Seconds',key:'secs',type:'number'}],
        'Same as left side.','main'),
      ex('Foam Rolling','5 min',[{label:'Done?',key:'done',type:'select',options:['Yes','No']}],
        'Roll these areas, 30-60 sec each:\n• Upper back: Lie on the roller, arms crossed over chest, roll from mid-back to shoulders.\n• Lats: Lie on your side, roller under your armpit. Roll from armpit to mid-ribcage.\n• Glutes: Sit on the roller, cross one ankle over the opposite knee, lean into the crossed side.\n• Hip flexors/quads: Face down, roller under one thigh. Roll from hip to just above the knee.\n• Forearms: Roll each forearm on the roller or a lacrosse ball on a table.','main'),
      ex('Play w/ Son','10+ min',[{label:'Minutes',key:'mins',type:'number'}],
        'Tag, wrestling, crawling races, sword fighting with pool noodles, playground time — whatever gets you both moving and laughing. This is real recovery. Don\'t skip it because it doesn\'t look like exercise.','main')
    ]
  },
  S: {
    sections: [
      {id:'class', icon:'🗡️', title:'Sunday Class', time:'~1 hour'}
    ],
    exercises: [
      ex('McGill Big 3 Prehab','10 min',[{label:'Done?',key:'done',type:'select',options:['Yes','No']}],
        'McGill Curl-Up 3×8, Side Plank 3×15-20s each side, Bird Dog 3×8 each side. Plus hip flexor couch stretch 2×45s each side. This is prehab only — save your energy for class.','class'),
      ex('Attended Class?','—',[{label:'Attended?',key:'attended',type:'select',options:['Yes','No']}],
        'If no class today, do a full Day A instead (morning strength + evening sword intervals) to keep your sword volume consistent.','class'),
      ex('Class Feel','1-5',[{label:'Rating',key:'rating',type:'number'},{label:'Kept up better?',key:'better',type:'select',options:['Yes','No','Same']}],
        'Rate how you felt in class from 1 (terrible, gassed immediately) to 5 (felt strong the whole time). Track whether you\'re keeping up better than previous weeks.','class')
    ]
  }
};
