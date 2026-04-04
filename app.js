// App state
let currentPage = 'home';
let workoutDate = todayStr();

const app = document.getElementById('app');

// Icons as inline SVG
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-9 9 9"/><path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10"/></svg>',
  workout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4M8 8h8M8 16h8"/></svg>',
  history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>'
};

function navigate(page, date) {
  currentPage = page;
  if (date) workoutDate = date;
  render();
  window.scrollTo(0, 0);
}

function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function render() {
  let html = '';
  switch (currentPage) {
    case 'home': html = renderHome(); break;
    case 'workout': html = renderWorkout(); break;
    case 'history': html = renderHistory(); break;
    case 'share': html = renderShare(); break;
  }
  html += renderNav();
  app.innerHTML = html;
  bindEvents();
}

function renderNav() {
  const tabs = [
    {id:'home',label:'Home',icon:ICONS.home},
    {id:'workout',label:'Workout',icon:ICONS.workout},
    {id:'history',label:'History',icon:ICONS.history},
    {id:'share',label:'Share',icon:ICONS.share}
  ];
  return `<nav class="nav">${tabs.map(t =>
    `<button class="nav-btn ${currentPage===t.id?'active':''}" data-nav="${t.id}">${t.icon}${t.label}</button>`
  ).join('')}</nav>`;
}

function renderHome() {
  const today = todayStr();
  const type = getDayType(today);
  const label = DAY_LABELS[type];
  const week = getProgramWeek();
  const ws = getWeekStart(today);
  const stats = getWeekStats(ws);
  const todayPct = getCompletionForDate(today);

  // Progression info
  let progIdx = Math.min(Math.floor((week - 1) / 2), PROGRESSION.length - 1);
  const prog = PROGRESSION[progIdx];

  let h = `<div class="page active">`;
  h += `<h1>🗡️ HEMA Tracker</h1><p class="subtitle">Week ${week} · ${formatDate(today)}</p>`;

  // Stats
  h += `<div class="stats">
    <div class="stat"><div class="stat-value">${stats.daysLogged}</div><div class="stat-label">Days This Week</div></div>
    <div class="stat"><div class="stat-value">${stats.avgCompletion}%</div><div class="stat-label">Avg Completion</div></div>
    <div class="stat"><div class="stat-value">${stats.backPainDays}</div><div class="stat-label">Back Pain Days</div></div>
  </div>`;

  // Today's workout card
  h += `<div class="today-card" data-nav="workout">
    <div class="today-label">Today's Workout</div>
    <div class="today-title">Day ${type} — ${label}</div>
    <div class="today-desc">${todayPct > 0 ? todayPct + '% complete' : 'Not started'}</div>
    <div class="progress-bar"><div class="progress-fill" style="width:${todayPct}%"></div></div>
  </div>`;

  // Week schedule
  h += `<h2>This Week</h2><div class="schedule">`;
  for (let i = 0; i < 7; i++) {
    const d = addDays(ws, i);
    const dt = getDayType(d);
    const pct = getCompletionForDate(d);
    const isToday = d === today;
    const isDone = pct >= 80 && !isToday;
    const cls = isToday ? 'today' : isDone ? 'done' : '';
    h += `<div class="schedule-day ${cls}" data-workout-date="${d}">
      <div class="day-label">${DAY_NAMES[i]}</div>
      <div class="day-type">${dt === 'S' ? '⚔️' : dt}</div>
    </div>`;
  }
  h += `</div>`;

  // Current progression target
  h += `<div class="card">
    <div class="card-header"><span class="card-title">📈 Current Target</span><span class="badge badge-green">Weeks ${prog.weeks}</span></div>
    <p style="margin-top:8px;font-size:.9rem;color:var(--muted)">${prog.target}<br>${prog.format}</p>
  </div>`;

  // Reminders
  h += `<div class="card"><div class="card-title">⚡ Daily Reminders</div><ul class="reminders" style="margin-top:8px;padding-left:18px">`;
  REMINDERS.forEach(r => h += `<li>${r}</li>`);
  h += `</ul></div>`;

  // Grip loading note
  const gripNote = {A:'Heavy grip day',B:'Grip rest — no desk walk grip work',C:'Light grip day — optional gripper/stress ball on walks',S:'Heavy (class)'}[type];
  h += `<div class="card"><div class="card-title">✋ Grip Loading</div><p style="margin-top:6px;font-size:.85rem;color:var(--muted)">${gripNote}</p></div>`;

  h += `</div>`;
  return h;
}

function renderWorkout() {
  const date = workoutDate;
  const type = getDayType(date);
  const data = EXERCISES[type];
  if (!data) return `<div class="page active"><h1>No data for this day type</h1></div>`;

  const meta = DB.loadMeta(date) || {};
  let h = `<div class="page active">`;
  h += `<h1>Day ${type}</h1><p class="subtitle">${formatDate(date)} · ${DAY_LABELS[type]}</p>`;

  // Sections
  let exIdx = 0;
  for (const sec of data.sections) {
    h += `<div class="section-header"><span class="section-icon">${sec.icon}</span><span class="section-title">${sec.title}</span></div>`;

    for (const ex of data.exercises.filter(e => e.section === sec.id)) {
      const saved = DB.load(date, exIdx) || {};
      const hasData = Object.values(saved).some(v => v !== '' && v !== null && v !== undefined);

      h += `<div class="exercise" data-idx="${exIdx}">`;
      h += `<div class="exercise-header">
        <span class="exercise-name">${ex.name}</span>
        <span class="exercise-target">${ex.target}</span>
        <div class="exercise-check ${hasData ? 'done' : ''}">${hasData ? '✓' : ''}</div>
      </div>`;
      h += `<div class="exercise-body">`;
      h += `<span class="desc-toggle" data-desc="${exIdx}">ℹ️ How to do this</span>`;
      h += `<div class="exercise-desc" id="desc-${exIdx}">${ex.desc.replace(/\n/g,'<br>')}</div>`;
      h += `<div class="input-row">`;
      for (const inp of ex.inputs) {
        const val = saved[inp.key] || '';
        if (inp.type === 'select') {
          h += `<div class="input-group"><label>${inp.label}</label><select data-date="${date}" data-idx="${exIdx}" data-key="${inp.key}">`;
          h += `<option value="">—</option>`;
          inp.options.forEach(o => h += `<option ${val===o?'selected':''}>${o}</option>`);
          h += `</select></div>`;
        } else {
          h += `<div class="input-group"><label>${inp.label}</label><input type="${inp.type}" data-date="${date}" data-idx="${exIdx}" data-key="${inp.key}" value="${val}" inputmode="numeric"></div>`;
        }
      }
      h += `</div></div></div>`;
      exIdx++;
    }
  }

  // Session meta
  h += `<h2>Session Notes</h2><div class="card">`;
  h += `<div class="input-row">
    <div class="input-group"><label>Energy (1-5)</label><input type="number" min="1" max="5" data-meta="energy" value="${meta.energy||''}"></div>
    <div class="input-group"><label>Back Pain?</label><select data-meta="backPain"><option value="">—</option><option ${meta.backPain==='Yes'?'selected':''}>Yes</option><option ${meta.backPain==='No'?'selected':''}>No</option></select></div>`;
  if (type === 'A') {
    h += `<div class="input-group"><label>Grip Strong?</label><select data-meta="gripStrong"><option value="">—</option><option ${meta.gripStrong==='Yes'?'selected':''}>Yes</option><option ${meta.gripStrong==='No'?'selected':''}>No</option></select></div>`;
  }
  h += `</div>`;
  h += `<div class="input-group" style="margin-top:8px"><label>Notes</label><textarea data-meta="notes">${meta.notes||''}</textarea></div>`;
  h += `</div></div>`;
  return h;
}

function renderHistory() {
  const dates = DB.allDates();
  let h = `<div class="page active"><h1>History</h1><p class="subtitle">Past workouts</p>`;
  if (!dates.length) {
    h += `<div class="card"><p style="color:var(--muted)">No workouts logged yet. Complete today's workout to see it here.</p></div>`;
  }
  for (const d of dates.slice(0, 30)) {
    const type = getDayType(d);
    const pct = getCompletionForDate(d);
    const meta = DB.loadMeta(d) || {};
    h += `<div class="history-entry" data-workout-date="${d}" style="cursor:pointer">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div class="history-date">${formatDate(d)}</div>
          <div class="history-summary">Day ${type} — ${pct}% complete</div>
        </div>
        <span class="badge ${pct>=80?'badge-green':pct>0?'badge-yellow':'badge-muted'}">${pct}%</span>
      </div>
      ${meta.energy ? `<div style="font-size:.8rem;color:var(--muted);margin-top:4px">Energy: ${meta.energy}/5${meta.backPain==='Yes'?' · Back pain':''}${meta.notes?' · '+meta.notes.slice(0,50):''}</div>` : ''}
    </div>`;
  }
  h += `</div>`;
  return h;
}

function renderShare() {
  let h = `<div class="page active"><h1>Share Progress</h1><p class="subtitle">Export your data</p>`;
  h += `<button class="btn btn-primary" id="btn-share-summary">📋 Share Progress Summary</button>`;
  h += `<button class="btn btn-secondary" id="btn-export-json">💾 Export Full Data (JSON)</button>`;
  h += `<button class="btn btn-secondary" id="btn-export-csv">📊 Export as CSV</button>`;
  h += `<div class="card" style="margin-top:16px"><div class="card-title">Preview</div><pre style="margin-top:8px;font-size:.75rem;color:var(--muted);white-space:pre-wrap;max-height:400px;overflow:auto">${generateSummary()}</pre></div>`;
  h += `</div>`;
  return h;
}

function generateCSV() {
  const dates = DB.allDates();
  let rows = [['Date','Day Type','Exercise','Sets','Reps/Secs','Weight','Type/Other','Energy','Back Pain','Notes']];
  for (const d of dates) {
    const type = getDayType(d);
    const exs = EXERCISES[type]?.exercises || [];
    const meta = DB.loadMeta(d) || {};
    for (let i = 0; i < exs.length; i++) {
      const saved = DB.load(d, i);
      if (!saved) continue;
      rows.push([d, type, exs[i].name, saved.sets||saved.rounds||'', saved.reps||saved.secs||saved.work||saved.mins||'', saved.weight||'', saved.type||saved.done||saved.attended||saved.better||saved.rest||'', meta.energy||'', meta.backPain||'', (meta.notes||'').replace(/,/g,';')]);
    }
  }
  return rows.map(r => r.join(',')).join('\n');
}

function bindEvents() {
  // Nav
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });

  // Schedule day clicks
  document.querySelectorAll('[data-workout-date]').forEach(el => {
    el.addEventListener('click', () => navigate('workout', el.dataset.workoutDate));
  });

  // Exercise accordion
  document.querySelectorAll('.exercise-header').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('.exercise-check')) return;
      const body = el.nextElementSibling;
      body.classList.toggle('open');
    });
  });

  // Description toggles
  document.querySelectorAll('.desc-toggle').forEach(el => {
    el.addEventListener('click', () => {
      const desc = document.getElementById('desc-' + el.dataset.desc);
      desc.classList.toggle('show');
      el.textContent = desc.classList.contains('show') ? '▲ Hide details' : 'ℹ️ How to do this';
    });
  });

  // Input saving
  document.querySelectorAll('input[data-idx], select[data-idx]').forEach(el => {
    const save = () => {
      const {date, idx, key} = el.dataset;
      const existing = DB.load(date, parseInt(idx)) || {};
      existing[key] = el.value;
      DB.save(date, parseInt(idx), existing);
      // Update check mark
      const exercise = el.closest('.exercise');
      const check = exercise.querySelector('.exercise-check');
      const saved = DB.load(date, parseInt(idx));
      const hasData = Object.values(saved).some(v => v !== '' && v !== null && v !== undefined);
      check.className = 'exercise-check' + (hasData ? ' done' : '');
      check.textContent = hasData ? '✓' : '';
    };
    el.addEventListener('change', save);
    el.addEventListener('blur', save);
  });

  // Meta saving
  document.querySelectorAll('[data-meta]').forEach(el => {
    const save = () => {
      const meta = DB.loadMeta(workoutDate) || {};
      meta[el.dataset.meta] = el.value;
      DB.saveMeta(workoutDate, meta);
    };
    el.addEventListener('change', save);
    el.addEventListener('blur', save);
  });

  // Share buttons
  document.getElementById('btn-share-summary')?.addEventListener('click', async () => {
    const text = generateSummary();
    if (navigator.share) {
      try { await navigator.share({title:'HEMA Progress', text}); } catch(e) {}
    } else {
      await navigator.clipboard.writeText(text);
      toast('Copied to clipboard!');
    }
  });

  document.getElementById('btn-export-json')?.addEventListener('click', async () => {
    const json = JSON.stringify(DB.exportAll(), null, 2);
    if (navigator.share) {
      const blob = new Blob([json], {type:'application/json'});
      const file = new File([blob], 'hema-data.json', {type:'application/json'});
      try { await navigator.share({files:[file], title:'HEMA Data'}); } catch(e) {
        await navigator.clipboard.writeText(json);
        toast('Copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(json);
      toast('Copied to clipboard!');
    }
  });

  document.getElementById('btn-export-csv')?.addEventListener('click', async () => {
    const csv = generateCSV();
    if (navigator.share) {
      const blob = new Blob([csv], {type:'text/csv'});
      const file = new File([blob], 'hema-data.csv', {type:'text/csv'});
      try { await navigator.share({files:[file], title:'HEMA Data'}); } catch(e) {
        await navigator.clipboard.writeText(csv);
        toast('Copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(csv);
      toast('Copied to clipboard!');
    }
  });
}

// Init
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
render();
