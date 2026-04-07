// Storage & utility functions
const DB = {
  _key(date, idx) { return `hema_${date}_${idx}`; },
  _metaKey(date) { return `hema_meta_${date}`; },
  save(date, idx, data) { localStorage.setItem(this._key(date,idx), JSON.stringify(data)); },
  load(date, idx) { try { return JSON.parse(localStorage.getItem(this._key(date,idx))); } catch(e) { return null; } },
  saveMeta(date, data) { localStorage.setItem(this._metaKey(date), JSON.stringify(data)); },
  loadMeta(date) { try { return JSON.parse(localStorage.getItem(this._metaKey(date))); } catch(e) { return null; } },
  allDates() {
    const dates = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith('hema_meta_')) dates.add(k.replace('hema_meta_',''));
    }
    return [...dates].sort().reverse();
  },
  exportAll() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith('hema_')) data[k] = JSON.parse(localStorage.getItem(k));
    }
    return data;
  }
};

function dateStr(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function todayStr() { return dateStr(new Date()); }
function getDayOfWeek(d) { return (new Date(d + 'T12:00:00').getDay() + 6) % 7; } // 0=Mon
function getDayType(d) { return SCHEDULE[getDayOfWeek(d)]; }
function getWeekStart(d) {
  const dt = new Date(d + 'T12:00:00');
  const day = (dt.getDay() + 6) % 7;
  dt.setDate(dt.getDate() - day);
  return dateStr(dt);
}
function addDays(d, n) { const dt = new Date(d + 'T12:00:00'); dt.setDate(dt.getDate() + n); return dateStr(dt); }
function formatDate(d) {
  const dt = new Date(d + 'T12:00:00');
  return dt.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric'});
}

function getCompletionForDate(date) {
  const type = getDayType(date);
  let exs;
  if (type === 'S') {
    const meta = DB.loadMeta(date);
    if (meta?.attendedClass === 'No') exs = EXERCISES['A']?.exercises || [];
    else if (meta?.attendedClass === 'Yes') exs = EXERCISES['S']?.exercises || [];
    else return 0;
  } else {
    exs = EXERCISES[type]?.exercises || [];
  }
  let done = 0, total = exs.length;
  for (let i = 0; i < exs.length; i++) {
    const saved = DB.load(date, i);
    if (saved && Object.values(saved).some(v => v !== '' && v !== null && v !== undefined)) done++;
  }
  return total ? Math.round(done / total * 100) : 0;
}

function getWeekStats(weekStart) {
  let totalPct = 0, days = 0, backPainDays = 0, neckSoreDays = 0, totalDays = 0;
  for (let i = 0; i < 7; i++) {
    const d = addDays(weekStart, i);
    if (d > todayStr()) break;
    totalDays++;
    const pct = getCompletionForDate(d);
    if (pct > 0) { totalPct += pct; days++; }
    const meta = DB.loadMeta(d);
    if (meta?.backPain === 'Yes') backPainDays++;
    if (meta?.neckSore === 'Yes') neckSoreDays++;
  }
  return { avgCompletion: days ? Math.round(totalPct / days) : 0, daysLogged: days, totalDays, backPainDays, neckSoreDays };
}

function getProgramWeek() {
  const dates = DB.allDates();
  if (!dates.length) return 1;
  const first = new Date(dates[dates.length - 1]);
  const now = new Date(todayStr());
  return Math.max(1, Math.ceil((now - first) / (7 * 86400000)));
}

function generateSummary() {
  const week = getProgramWeek();
  const dates = DB.allDates();
  let lines = [`HEMA Longsword Training — Progress Report`, `Generated: ${formatDate(todayStr())}`, `Program Week: ${week}`, ''];

  // Last 2 weeks
  const ws = getWeekStart(todayStr());
  const prevWs = addDays(ws, -7);
  for (const w of [prevWs, ws]) {
    const stats = getWeekStats(w);
    lines.push(`Week of ${formatDate(w)}: ${stats.daysLogged}/${stats.totalDays} days logged, ${stats.avgCompletion}% avg completion, ${stats.backPainDays} back pain days, ${stats.neckSoreDays} neck sore days`);
  }
  lines.push('');

  // Recent sword intervals
  lines.push('Sword Interval History:');
  let found = 0;
  for (const d of dates) {
    if (found >= 6) break;
    const type = getDayType(d);
    if (type !== 'A' && type !== 'S') continue;
    const exs = EXERCISES[type]?.exercises || [];
    for (let i = 0; i < exs.length; i++) {
      if (exs[i].name === 'Sword Intervals') {
        const saved = DB.load(d, i);
        if (saved?.rounds) {
          lines.push(`  ${formatDate(d)}: ${saved.rounds} rds × ${saved.work||'?'}s work / ${saved.rest||'?'}s rest`);
          found++;
        }
      }
    }
  }
  if (!found) lines.push('  No data yet');
  lines.push('');

  // Dead hang history
  lines.push('Dead Hang History:');
  found = 0;
  for (const d of dates) {
    if (found >= 6) break;
    const type = getDayType(d);
    if (type !== 'A') continue;
    const exs = EXERCISES[type]?.exercises || [];
    for (let i = 0; i < exs.length; i++) {
      if (exs[i].name === 'Dead Hangs') {
        const saved = DB.load(d, i);
        if (saved?.sets) {
          lines.push(`  ${formatDate(d)}: ${saved.sets} × ${saved.secs||'?'}s`);
          found++;
        }
      }
    }
  }
  if (!found) lines.push('  No data yet');
  lines.push('');

  // Notes
  lines.push('Session Notes:');
  found = 0;
  for (const d of dates) {
    if (found >= 4) break;
    const meta = DB.loadMeta(d);
    if (meta?.notes) { lines.push(`  ${formatDate(d)}: ${meta.notes}`); found++; }
  }
  if (!found) lines.push('  None');

  return lines.join('\n');
}
