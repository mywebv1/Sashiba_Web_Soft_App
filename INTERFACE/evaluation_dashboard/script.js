/**
 * সশিবা মূল্যায়ন আর্কিটেক্ট v2 — script.js
 * Student Performance · AI Feedback · Rubric Builder · Report Card · Assessment History
 */

// ═══════════════════════════════════════════════════════
//  ১. STATE
// ═══════════════════════════════════════════════════════
let settings = {
  school: 'মাগুরিব স্কুল এন্ড কলেজ',
  className: 'পঞ্চম', section: 'ক', year: '২০২৫',
  subjects: ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'সমাজ'],
  teacherName: 'মাগুরিব আলী', teacherDesignation: 'প্রধান শিক্ষক'
};
let students = [];
let assessmentHistory = [];
let savedRubrics = [];
let currentFilter = 'all';
let sortField = 'total';
let sortAsc = false;
let selectedReportStudentId = null;
let currentPerfStudent = null;
let currentTimeline = 'quiz';
let historyFilter = 'all';

// ═══════════════════════════════════════════════════════
//  ২. SAMPLE DATA
// ═══════════════════════════════════════════════════════
const sampleStudents = [
  { name: 'রাহেলা বেগম', roll: 1, scores: { বাংলা: 85, ইংরেজি: 78, গণিত: 90, বিজ্ঞান: 82, সমাজ: 88 }, timeline: { quiz: [80,85,88,90,82], assignment: [90,88,85,92,86], oral: [85,87,83,89,91], practical: [88,82,90,85,87], attendance: [95,90,98,92,96], homework: [88,90,85,92,87] }, remarks: 'অত্যন্ত মেধাবী ও পরিশ্রমী।', parentName: 'করিম বেগম', phone: '' },
  { name: 'মো: আবির হোসেন', roll: 2, scores: { বাংলা: 62, ইংরেজি: 55, গণিত: 70, বিজ্ঞান: 60, সমাজ: 65 }, timeline: { quiz: [60,58,65,62,70], assignment: [65,62,70,68,60], oral: [55,60,58,62,65], practical: [70,65,68,72,60], attendance: [80,75,85,78,80], homework: [65,70,62,68,72] }, remarks: 'মনোযোগী, নিয়মিত অনুশীলন প্রয়োজন।', parentName: 'আবুল হোসেন', phone: '' },
  { name: 'সুমাইয়া আক্তার', roll: 3, scores: { বাংলা: 45, ইংরেজি: 38, গণিত: 42, বিজ্ঞান: 50, সমাজ: 48 }, timeline: { quiz: [40,38,45,42,48], assignment: [48,44,50,42,45], oral: [35,38,40,42,45], practical: [50,45,48,42,40], attendance: [70,65,72,68,75], homework: [42,45,40,48,44] }, remarks: 'আরও চেষ্টা ও অভিভাবকের সহায়তা প্রয়োজন।', parentName: 'রহিমা আক্তার', phone: '' },
  { name: 'তানভীর আহমেদ', roll: 4, scores: { বাংলা: 92, ইংরেজি: 88, গণিত: 95, বিজ্ঞান: 91, সমাজ: 89 }, timeline: { quiz: [90,92,88,95,93], assignment: [95,90,92,88,96], oral: [88,90,92,95,91], practical: [92,95,90,88,94], attendance: [100,98,100,96,100], homework: [95,92,98,90,96] }, remarks: 'ক্লাসে প্রথম। অসাধারণ মেধাবী।', parentName: 'রফিক আহমেদ', phone: '' },
  { name: 'নাফিসা জাহান', roll: 5, scores: { বাংলা: 70, ইংরেজি: 65, গণিত: 68, বিজ্ঞান: 72, সমাজ: 75 }, timeline: { quiz: [68,70,65,72,74], assignment: [72,68,75,70,65], oral: [65,70,68,72,75], practical: [70,65,72,68,75], attendance: [88,85,90,92,88], homework: [72,68,75,70,65] }, remarks: 'ভালো করছে, আরও উন্নতি সম্ভব।', parentName: 'জহির উদ্দিন', phone: '' },
  { name: 'আরিফ বিল্লাহ', roll: 6, scores: { বাংলা: 30, ইংরেজি: 28, গণিত: 35, বিজ্ঞান: 40, সমাজ: 32 }, timeline: { quiz: [28,32,30,35,38], assignment: [32,28,35,30,32], oral: [25,28,30,32,35], practical: [38,35,40,32,30], attendance: [60,55,65,58,62], homework: [30,28,32,35,30] }, remarks: 'অতিরিক্ত মনোযোগ ও বিশেষ কোচিং প্রয়োজন।', parentName: 'বিল্লাল হোসেন', phone: '' },
  { name: 'সাদিয়া ইসলাম', roll: 7, scores: { বাংলা: 78, ইংরেজি: 82, গণিত: 75, বিজ্ঞান: 80, সমাজ: 77 }, timeline: { quiz: [75,78,80,82,77], assignment: [78,82,75,80,85], oral: [80,78,82,75,80], practical: [76,80,78,82,75], attendance: [92,90,95,88,92], homework: [80,78,82,85,77] }, remarks: 'চমৎকার অগ্রগতি দেখাচ্ছে।', parentName: 'নজরুল ইসলাম', phone: '' },
];

// ═══════════════════════════════════════════════════════
//  ৩. GRADE CALCULATIONS
// ═══════════════════════════════════════════════════════
function getGrade(pct) {
  if (pct >= 80) return { grade: 'A+', gp: '৫.০০', cls: 'grade-aplus' };
  if (pct >= 70) return { grade: 'A', gp: '৪.০০', cls: 'grade-a' };
  if (pct >= 60) return { grade: 'A-', gp: '৩.৫০', cls: 'grade-aminus' };
  if (pct >= 50) return { grade: 'B', gp: '৩.০০', cls: 'grade-b' };
  if (pct >= 40) return { grade: 'C', gp: '২.০০', cls: 'grade-c' };
  if (pct >= 33) return { grade: 'D', gp: '১.০০', cls: 'grade-d' };
  return { grade: 'F', gp: '০.০০', cls: 'grade-f' };
}
function getCategory(pct) {
  if (pct >= 80) return { label: 'ভালো', cls: 'cat-good', icon: 'fa-star' };
  if (pct >= 50) return { label: 'মধ্যম', cls: 'cat-average', icon: 'fa-circle-half-stroke' };
  return { label: 'দুর্বল', cls: 'cat-weak', icon: 'fa-arrow-trend-down' };
}
function calcTotals(student) {
  const subjs = settings.subjects;
  let total = 0, count = 0;
  subjs.forEach(s => { const v = parseFloat(student.scores?.[s]) || 0; total += v; count++; });
  const maxTotal = count * 100;
  const avg = count ? (total / count) : 0;
  const pct = maxTotal ? Math.round((total / maxTotal) * 100) : 0;
  return { total, maxTotal, avg: avg.toFixed(1), pct };
}
function toBnNum(num) {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(num).replace(/\d/g, d => bn[d]);
}

function getPosition(sid) {
  return [...students].sort((a,b)=>calcTotals(b).pct-calcTotals(a).pct).findIndex(s=>s.id===sid)+1;
}
const avatarColors = ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f43f5e','#84cc16'];
function getAvatarColor(str) {
  let h = 0; for(let c of str) h = (h*31+c.charCodeAt(0)) & 0xff;
  return avatarColors[h % avatarColors.length];
}

// ═══════════════════════════════════════════════════════
//  ৪. STUDENT PERFORMANCE SECTION
// ═══════════════════════════════════════════════════════
function renderPerfStudentList(filter='') {
  const list = document.getElementById('perf-student-list');
  if(!list) return;
  let arr = [...students].sort((a,b)=>a.roll-b.roll);
  if(filter) arr = arr.filter(s=>s.name.toLowerCase().includes(filter.toLowerCase())||String(s.roll).includes(filter));
  list.innerHTML = arr.map(s=>{
    const {pct} = calcTotals(s);
    const grade = getGrade(pct);
    const color = getAvatarColor(s.name);
    return `
      <div class="perf-student-item ${currentPerfStudent===s.id?'active':''}" onclick="loadPerformance('${s.id}')">
        <div class="psi-avatar" style="background:${color}">${s.name.charAt(0)}</div>
        <div>
          <div class="psi-name">${s.name}</div>
          <div class="psi-roll">রোল: ${s.roll}</div>
        </div>
        <div class="psi-grade" style="color:${pct>=80?'var(--success)':pct>=50?'var(--warning)':'var(--danger)'}">${grade.grade}</div>
      </div>
    `;
  }).join('');
}

function filterPerfStudents() {
  renderPerfStudentList(document.getElementById('perf-search')?.value || '');
}

function loadPerformance(id) {
  currentPerfStudent = id;
  renderPerfStudentList(document.getElementById('perf-search')?.value || '');
  const s = students.find(x=>x.id===id);
  if(!s) return;

  document.getElementById('perf-placeholder').classList.add('hidden');
  document.getElementById('perf-content').classList.remove('hidden');

  const {total, maxTotal, avg, pct} = calcTotals(s);
  const grade = getGrade(pct);
  const pos = getPosition(s.id);
  const cat = getCategory(pct);
  const color = getAvatarColor(s.name);

  // Header
  document.getElementById('perf-header').innerHTML = `
    <div class="perf-student-avatar" style="background:${color}">${s.name.charAt(0)}</div>
    <div>
      <div class="perf-student-name">${s.name}</div>
      <div class="perf-student-meta">রোল: ${s.roll} | শ্রেণি: ${settings.className} (${settings.section}) | শিক্ষাবর্ষ: ${settings.year}</div>
      <div style="margin-top:6px;display:flex;gap:8px;">
        <span class="grade-badge ${grade.cls}">${grade.grade}</span>
        <span class="cat-badge ${cat.cls}"><i class="fa-solid ${cat.icon}"></i> ${cat.label}</span>
      </div>
    </div>
    <div class="perf-header-actions">
      <button class="btn-outline btn-sm" onclick="openEditModal('${s.id}')"><i class="fa-solid fa-pen"></i> এডিট</button>
      <button class="btn-primary btn-sm" onclick="openReportCardFor('${s.id}')"><i class="fa-solid fa-id-card"></i> রিপোর্ট</button>
    </div>
  `;

  // Summary stats
  document.getElementById('perf-summary-grid').innerHTML = `
    <div class="perf-stat"><div class="perf-stat-val">${total}/${maxTotal}</div><div class="perf-stat-label">মোট নম্বর</div></div>
    <div class="perf-stat"><div class="perf-stat-val" style="color:${pct>=80?'var(--success)':pct>=50?'var(--warning)':'var(--danger)'}">${pct}%</div><div class="perf-stat-label">গড় শতকরা</div></div>
    <div class="perf-stat"><div class="perf-stat-val" style="color:var(--purple)">${pos}ম</div><div class="perf-stat-label">শ্রেণিতে অবস্থান</div></div>
    <div class="perf-stat"><div class="perf-stat-val">${grade.gp}</div><div class="perf-stat-label">গ্রেড পয়েন্ট</div></div>
  `;

  renderTimeline(s, currentTimeline);
  renderMarkingInputs(s, currentTimeline);
  renderWeakStrongTopics(s);
  renderPerfSubjectBars(s);
  renderAllAvgBars(s);
  generateAIFeedbackFor(id);
}

function switchTimeline(type, btn) {
  currentTimeline = type;
  document.querySelectorAll('.ttab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  if(currentPerfStudent) {
    const s = students.find(x=>x.id===currentPerfStudent);
    if(s) { renderTimeline(s, type); renderMarkingInputs(s, type); }
  }
}

function renderTimeline(s, type) {
  const el = document.getElementById('timeline-bars');
  if(!el) return;
  const data = s.timeline?.[type] || [];
  const subjs = settings.subjects;
  const typeLabels = {quiz:'Quiz নম্বর',assignment:'Assignment নম্বর',oral:'Oral নম্বর',practical:'Practical নম্বর',attendance:'উপস্থিতি (%)',homework:'হোমওয়ার্ক (%)',};
  const colors = ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f43f5e'];

  if(data.length === 0 && subjs.every(sub=>{const v=s.timeline?.[type]?.[subjs.indexOf(sub)];return v===undefined;})) {
    el.innerHTML = `<div style="color:var(--text-muted);font-size:13px;padding:12px 0;"><i class="fa-solid fa-info-circle" style="margin-right:6px;"></i>উপরের ইনপুট ফিল্ডে নম্বর দিয়ে সংরক্ষণ করুন।</div>`;
    return;
  }
  el.innerHTML = `<div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px;">${typeLabels[type]||type} চার্ট</div>`
    + subjs.map((sub, i) => {
    const val = data[i] !== undefined ? data[i] : 0;
    const c = colors[i % colors.length];
    const pctW = Math.min(100, val);
    return `
      <div class="tl-row">
        <div class="tl-subject">${sub}</div>
        <div class="tl-track"><div class="tl-fill" style="width:${pctW}%;background:${c}"></div></div>
        <div class="tl-val" style="color:${c}">${val}</div>
      </div>
    `;
  }).join('');
}

/* ─── Marking Inputs ─── */
function renderMarkingInputs(s, type) {
  const infoBar = document.getElementById('marking-info-bar');
  const grid = document.getElementById('marking-inputs-grid');
  if(!infoBar || !grid) return;

  const typeInfo = {
    quiz: { label: 'Quiz মার্কিং', max: 100, hint: 'প্রতিটি বিষয়ের Quiz নম্বর লিখুন (০–১০০)' },
    assignment: { label: 'Assignment মার্কিং', max: 100, hint: 'Assignment-এর নম্বর লিখুন' },
    oral: { label: 'Oral মূল্যায়ন', max: 100, hint: 'মৌখিক পরীক্ষার নম্বর লিখুন' },
    practical: { label: 'Practical মূল্যায়ন', max: 100, hint: 'ব্যবহারিক পরীক্ষার নম্বর লিখুন' },
    attendance: { label: 'উপস্থিতি (%)', max: 100, hint: 'উপস্থিতির শতকরা হার লিখুন' },
    homework: { label: 'হোমওয়ার্ক মার্কিং', max: 100, hint: 'হোমওয়ার্ক সম্পন্নের হার লিখুন' },
  };
  const info = typeInfo[type] || { label: type, max: 100, hint: '' };
  const existing = s.timeline?.[type] || [];

  infoBar.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><span>${info.label} — ${info.hint}</span>`;

  grid.innerHTML = settings.subjects.map((sub, i) => {
    const val = existing[i] !== undefined ? existing[i] : '';
    const pctW = val !== '' ? Math.min(100, parseFloat(val)||0) : 0;
    return `
      <div class="marking-input-cell">
        <label>${sub}</label>
        <input type="number" id="mark-inp-${type}-${i}" min="0" max="${info.max}" value="${val}"
               placeholder="০" oninput="updateScoreIndicator(this,${info.max})" />
        <div class="score-indicator" id="si-${type}-${i}" style="width:${pctW}%"></div>
      </div>
    `;
  }).join('');
}

function updateScoreIndicator(inp, max) {
  const v = parseFloat(inp.value) || 0;
  const pct = Math.min(100, Math.round((v/max)*100));
  const id = inp.id.replace('mark-inp-','si-');
  const ind = document.getElementById(id);
  if(ind) ind.style.width = pct + '%';
  // Color by score
  const color = v/max >= 0.8 ? 'var(--success)' : v/max >= 0.5 ? 'var(--warning)' : 'var(--danger)';
  if(ind) ind.style.background = color;
}

function saveTimelineMarks() {
  if(!currentPerfStudent) { showToast('শিক্ষার্থী নির্বাচন করুন!', 'error'); return; }
  const s = students.find(x=>x.id===currentPerfStudent);
  if(!s) return;
  if(!s.timeline) s.timeline = {};
  const type = currentTimeline;
  const values = settings.subjects.map((sub, i) => {
    const inp = document.getElementById(`mark-inp-${type}-${i}`);
    return inp ? (parseFloat(inp.value) || 0) : 0;
  });
  s.timeline[type] = values;
  saveToStorage();
  renderTimeline(s, type);
  renderAllAvgBars(s);
  showToast('নম্বর সংরক্ষিত হয়েছে!', 'success');
}

function autoFillFromScores() {
  if(!currentPerfStudent) return;
  const s = students.find(x=>x.id===currentPerfStudent);
  if(!s) return;
  const type = currentTimeline;
  settings.subjects.forEach((sub, i) => {
    const inp = document.getElementById(`mark-inp-${type}-${i}`);
    if(inp) {
      inp.value = s.scores?.[sub] || 0;
      updateScoreIndicator(inp, 100);
    }
  });
  showToast('মূল স্কোর থেকে পূরণ হয়েছে। সংরক্ষণ করুন।', 'success');
}

/* ─── All-type average bars ─── */
function renderAllAvgBars(s) {
  const el = document.getElementById('perf-all-avg-bars');
  if(!el) return;
  const types = [
    { key:'quiz', label:'Quiz', color:'#4f46e5' },
    { key:'assignment', label:'Assignment', color:'#10b981' },
    { key:'oral', label:'Oral', color:'#f59e0b' },
    { key:'practical', label:'Practical', color:'#8b5cf6' },
    { key:'attendance', label:'উপস্থিতি', color:'#06b6d4' },
    { key:'homework', label:'হোমওয়ার্ক', color:'#f43f5e' },
  ];
  el.innerHTML = types.map(({key, label, color}) => {
    const data = s.timeline?.[key] || [];
    const avg = data.length ? Math.round(data.reduce((a,b)=>a+b,0)/data.length) : 0;
    const hasData = data.length > 0;
    return `
      <div class="avg-bar-row">
        <div class="avg-bar-label">${label}</div>
        <div class="avg-bar-track"><div class="avg-bar-fill" style="width:${avg}%;background:${color}"></div></div>
        <div class="avg-bar-meta" style="color:${color}">${hasData ? avg+'%' : '—'}</div>
      </div>
    `;
  }).join('');
}

function renderWeakStrongTopics(s) {
  const subjs = settings.subjects;
  const scored = subjs.map(sub => ({ sub, val: s.scores?.[sub] || 0 }));

  // Strict User Rule: < 80 is weak, >= 80 is strong
  const weakList = scored.filter(x => x.val < 80).sort((a,b) => a.val - b.val);
  const strongList = scored.filter(x => x.val >= 80).sort((a,b) => b.val - a.val);

  const weakEl = document.getElementById('weak-topics-list');
  const strongEl = document.getElementById('strong-topics-list');

  if(weakEl) weakEl.innerHTML = weakList.length === 0
    ? `<div style="color:var(--success);font-size:13px;padding:12px;font-weight:600;"><i class="fa-solid fa-check-circle" style="margin-right:6px;"></i>সব বিষয়ে ৮০+ (সব বিষয়েই চমৎকার)!</div>`
    : weakList.map(({sub,val}) => `
    <div class="topic-item weak">
      <div class="topic-name">${sub}</div>
      <div style="display:flex;align-items:center;gap:6px;margin-left:auto;">
        <div style="width:60px;height:5px;background:rgba(239,68,68,.15);border-radius:3px;overflow:hidden;"><div style="width:${val}%;height:100%;background:var(--danger);"></div></div>
        <div class="topic-score weak">${val}/১০০</div>
      </div>
    </div>
  `).join('');

  if(strongEl) strongEl.innerHTML = strongList.length === 0
    ? `<div style="color:var(--danger);font-size:13px;padding:12px;font-weight:600;"><i class="fa-solid fa-circle-exclamation" style="margin-right:6px;"></i>কোনো বিষয়ে ৮০+ পাওয়া যায়নি</div>`
    : strongList.map(({sub,val}) => `
    <div class="topic-item strong">
      <div class="topic-name">${sub}</div>
      <div style="display:flex;align-items:center;gap:6px;margin-left:auto;">
        <div style="width:60px;height:5px;background:rgba(16,185,129,.15);border-radius:3px;overflow:hidden;"><div style="width:${val}%;height:100%;background:var(--success);"></div></div>
        <div class="topic-score strong">${val}/১০০</div>
      </div>
    </div>
  `).join('');
}

function renderPerfSubjectBars(s) {
  const el = document.getElementById('perf-subject-bars');
  if(!el) return;
  el.innerHTML = `
    <div class="modern-subject-card">
      <div class="msb-grid">
        ${settings.subjects.map((sub) => {
          const val = s.scores?.[sub] || 0;
          const g = getGrade(val);
          const color = val >= 80 ? 'var(--success)' : val >= 50 ? 'var(--primary)' : 'var(--danger)';
          return `
            <div class="msb-stat-card">
              <div class="msb-stat-title">${sub}</div>
              <div class="msb-stat-val" style="color:${color}">${val}</div>
              <div class="msb-stat-grade" style="background:${color}22;color:${color}">${g.grade}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ─── Varied AI feedback using multiple template pools ─ */
const aiFeedbackPools = {
  excellent: [
    (s,sub,weak,pct) => `⭐ ${s.name} সাধুবাদ! ${pct}% নম্বর অর্জন করে সত্যিকারের মেধাবিত্বের পরিচয় দিয়েছে। ${sub} বিষয়ে এর পারফরম্যান্স অনন্য। ভবিষ্যতে এই ধারা অব্যাহত রাখার অনুরোধ রইল। তার সাথে ${weak} বিষয়ের উপর আরো মনোযোগ দিলে ক্লাসে অপ্রতিদ্বন্দ্বী হয়ে ওঠা সম্ভব। গ্রেড: A+।`,
    (s,sub,weak,pct) => `🌟 ${s.name} আপনার শিক্ষার্থী সত্যিকারের একটি রত্ন। ${pct}% নম্বর পাওয়া তার পরিশ্রম ও মেধার প্রমাণ। ${sub} বিষয়ে বিশেষ দক্ষতা প্রকাশ পেয়েছে। ${weak} বিষয়ে যদি সমান মনোযোগ দেওয়া সম্ভব হয়, তাহলে সব বিষয়েই A+ পাওয়া অসম্ভব নয়।`,
    (s,sub,weak,pct) => `🏆 ক্লাসের সেরা শিক্ষার্থীদের মধ্যে ${s.name} একজন। তার ${pct}% সমগ্র পারফরম্যান্স অন্য শিক্ষার্থীদের জন্য অনুপ্রেরণার উৎস। ${sub} তার সবচেয়ে শক্তিশালী বিষয়। ${weak} বিষয়ে প্রতিদিন নিয়মিত বাড়ির কাজ করলে সম্প্রতি আরো উজ্জ্বল ফলাফল সম্ভব।`,
  ],
  average: [
    (s,sub,weak,pct) => `📊 ${s.name} এই মূল্যায়নে ${pct}% অর্জন করেছে। ${sub} বিষয়ে ভালো প্রদর্শন রয়েছে। ${weak} বিষয়ে বিশেষ মনোযোগ দরকার। প্রতিদিন ২০-৩০ মিনিট অধ্যয়ন করলে পরবর্তী মূল্যায়নে অনেক ভালো ফলাফল সম্ভব।`,
    (s,sub,weak,pct) => `💡 ${s.name} সম্ভাবনাময়। ${pct}% স্কোর দিয়ে সে দেখিয়েছে যে সে সক্ষম। ${sub} তার কাছে সহজ। ${weak} বিষয়ে আরো মনোযোগ দিলে A+ পাওয়া সম্ভব। হাল ছেড়ো না — তুমি পারবেই! 🌟`,
    (s,sub,weak,pct) => `🔥 ${s.name} মোট ${pct}% পেয়েছে। ${sub} তার শক্তির জায়গা। তবে ${weak} বিষয়ে দুর্বলতা লক্ষ্য করা যাচ্ছে। নিয়মিত প্র্যাক্টিস সেট তৈরি করুন। বিষয়শিক্ষকের সাথে আলোচনা করুন।`,
  ],
  weak: [
    (s,sub,weak,pct) => `🚨 ${s.name} এই মূল্যায়নে ${pct}% পেয়েছে। উন্নতির সুযোগ অনেক। ${weak} বিষয়ে বিশেষ দৃষ্টি দিতে হবে। ${sub} দিয়ে শুরু করুন — এটি তার তুলনামূলক ভালো বিষয়। অভিভাবকের সাথে নিয়মিত পড়ার রুটিন তৈরি করুন।`,
    (s,sub,weak,pct) => `⚠️ ${s.name} এই মুহূর্তে সাহায্যের প্রয়োজন। ${pct}% প্রাপ্ত নম্বর তার প্রকৃত সামর্থ্যের প্রতিফলন নয়। ${weak} সহ সব বিষয়ে নিয়মিত অনুশীলন দরকার। ${sub} তার তুলনামূলক ভালো বিষয় — এখান থেকে আত্মবিশ্বাস বাড়াতে হবে।`,
  ],
};

function buildFeedbackText(s, type, lang) {
  const {total, maxTotal, avg, pct} = calcTotals(s);
  const grade = getGrade(pct);
  const cat = getCategory(pct);
  const subjs = settings.subjects;
  const sorted = subjs.map(sub => ({sub, val: s.scores?.[sub]||0})).sort((a,b) => a.val - b.val);
  const weakSub = sorted[0]?.sub || '';
  const weakVal = sorted[0]?.val || 0;
  const strongSub = sorted[sorted.length-1]?.sub || '';
  const strongVal = sorted[sorted.length-1]?.val || 0;

  if(lang === 'en') {
    const openings = [
      `${s.name} has achieved ${pct}% in this assessment.`,
      `This assessment reflects ${s.name}'s academic journey: ${total}/${maxTotal} marks secured.`,
      `A comprehensive review for ${s.name} — Grade: ${grade.grade}, Average: ${avg}%.`,
    ];
    const opening = openings[Math.floor(Math.random()*openings.length)];
    if(type==='general') return `${opening}\n\nStrengths: ${strongSub} (${strongVal}/100) is a standout subject.\nImprovement needed: ${weakSub} (${weakVal}/100) requires consistent practice.\n\nTeacher's remark: ${s.remarks||'Keep up the good work!'}`;
    if(type==='motivational') return `Dear ${s.name},\n\n${pct>=80?`Your ${pct}% score is outstanding! You've set a benchmark for the class. Maintain this excellence in all subjects.`:`Your ${pct}% shows real effort! ${strongSub} is your strength. With focus on ${weakSub}, you can achieve so much more!`}\n\nBelieve in yourself. Every step forward counts. 🌟`;
    if(type==='guardian') return `Dear Guardian of ${s.name},\n\nAcademic Results:\n${subjs.map(sub=>`• ${sub}: ${s.scores?.[sub]||0}/100`).join('\n')}\n\nTotal: ${total}/${maxTotal} | Grade: ${grade.grade} | GPA: ${grade.gp}\n\n${strongSub} is an area of excellence. Please support practice of ${weakSub} at home.\n\n— ${settings.teacherName}, ${settings.school}`;
    return `Improvement Plan for ${s.name}:\n1. ${weakSub}: 25 mins daily practice.\n2. Revise previous test mistakes.\n3. Regular homework completion.\n4. Seek teacher help for doubts.\n5. Goal: +10% in next assessment.`;
  }

  const pool = pct >= 80 ? aiFeedbackPools.excellent : pct >= 50 ? aiFeedbackPools.average : aiFeedbackPools.weak;
  const rndBase = pool[Math.floor(Math.random() * pool.length)](s, strongSub, weakSub, pct);

  if(type==='general') return rndBase + `\n\nমোট: ${total}/${maxTotal} | গড়: ${avg}% | গ্রেড: ${grade.grade} | GPA: ${grade.gp}\nশিক্ষকের মন্তব্য: ${s.remarks || 'নিয়মিত পড়াশোনা অব্যাহত রাখুন।'}`;

  if(type==='motivational') {
    const msgs = [
      `💫 প্রিয় ${s.name},\n\n${pct>=80?`তুমি ${pct}% পেয়ে সারা ক্লাসের উজ্জ্বল নক্ষত্র হয়ে উঠেছ। ${strongSub} তোমার রাজত্বের রাজমুকুট। এই অসাধারণ সাফল্যের জন্য অনেক অনেক শুভকামনা! 🌟`:`তুমি ${pct}% পেয়েছো — এর মধ্যে লুকিয়ে আছে তোমার অনেক সব্ভাবনা। ${strongSub} তোমার শক্তির রাজ্য। ${weakSub} তে আরো ১০% নম্বর যোগ করতে পারলেই তুমি ক্লাসের তারকাহবে!`}\n\nমনে রাখো — তুমি যা স্বপ্ন দেখো, তা অর্জন করার শক্তি তোমার আছে। 💪`,
      `🚀 ${s.name}, তোমার প্রতিটি দিনের পরিশ্রম তোমাকে সামনে এগিয়ে নিয়ে যাচ্ছে। ${pct}% হলো তোমার আজকের অবস্থান, কালকের লস্য নয়। এগিয়ে চলো! 🌟`,
    ];
    return msgs[Math.floor(Math.random()*msgs.length)];
  }

  if(type==='guardian') return `শ্রদ্ধেয় অভিভাবক,\n\nআপনার সন্তান ${s.name} (রোল: ${s.roll}) এর মূল্যায়ন ফলাফল:\n\n${subjs.map(sub=>`• ${sub}: ${s.scores?.[sub]||0}/১০০`).join('\n')}\n\nমোট: ${total}/${maxTotal} | গ্রেড: ${grade.grade} | গড়: ${pct}% | GPA: ${grade.gp}\n\n${pct>=80?`আপনার সন্তান অসাধারণ ফলাফল করেছে। ${weakSub} তে যেন মানবিদ্যা বেড়ে উঠে সে লক্ষ্যে কাজ করে যাচ্ছে।`:`বাড়িতে ${weakSub} বিষয়ে সহায়তা করলে সে আরো ভালো ফলাফল করতে পারবে। ${strongSub} তে সে ইতিমধ্যে ভালো করছে।`}\n\nআন্তরিক ধন্যবাদ।\n— ${settings.teacherName}\n${settings.school}`;

  const plans = [
    `📈 ${s.name} এর ব্যক্তিগত উন্নতি পরিকল্পনা:\n\n১. ${weakSub}: প্রতিদিন ২৫ মিনিট পড়া ও অনুশীলন।\n২. বিগত পরীক্ষার ভুল থেকে শিক্ষা নেওয়া।\n৩. শিক্ষকের সাথে সাপ্তাহিক আলোচনা।\n৪. হোমওয়ার্ক প্রতিদিন সময়মতো শেষ করা।\n৫. লক্ষ্য: পরবর্তী মূল্যায়নে কমপক্ষে ${Math.min(pct+15,100)}% অর্জন।`,
    `🎯 ${s.name} সাফল্যের রোডম্যাপ:\n\n• ${weakSub} তে প্রতিদিন ডেডিকেটেড স্টাডি সেশন।\n• ${strongSub} দিয়ে আত্মবিশ্বাস বাড়াও।\n• প্রশ্ন থাকলে দ্বিধা না করে শিক্ষককে ডাকো।\n• লক্ষ্য: পরবর্তী মূল্যায়নে ${Math.min(pct+10,100)}%+ অর্জন।`,
  ];
  return plans[Math.floor(Math.random()*plans.length)];
}

function generateAIFeedbackFor(id) {
  const s = students.find(x=>x.id===id);
  if(!s) return;
  const fb = buildFeedbackText(s, 'general', 'bn');
  const el = document.getElementById('perf-ai-feedback');
  if(el) { el.textContent = ''; typewriterEffect(el, fb, 18); }
}

function onFeedbackStudentChange(id) {}

function generateAIFeedback() {
  const id = document.getElementById('feedback-student-select')?.value;
  if(!id) { showToast('শিক্ষার্থী নির্বাচন করুন!', 'error'); return; }
  const s = students.find(x=>x.id===id);
  if(!s) return;

  const type = document.querySelector('input[name="fb-type"]:checked')?.value || 'general';
  const lang = document.getElementById('fb-language')?.value || 'bn';
  const fb = buildFeedbackText(s, type, lang);

  document.getElementById('feedback-placeholder').classList.add('hidden');
  document.getElementById('feedback-result').classList.remove('hidden');

  const {pct} = calcTotals(s);
  const grade = getGrade(pct);
  const color = getAvatarColor(s.name);
  document.getElementById('fb-student-chip').innerHTML = `
    <div class="user-avatar" style="background:${color};width:32px;height:32px;font-size:12px;">${s.name.charAt(0)}</div>
    <div>
      <div style="font-size:13px;font-weight:700;color:var(--text-main);">${s.name}</div>
      <div style="font-size:11px;color:var(--text-muted);">গড়: ${pct}% | গ্রেড: ${grade.grade}</div>
    </div>
  `;

  const outEl = document.getElementById('feedback-text-output');
  if(outEl) { outEl.textContent = ''; typewriterEffect(outEl, fb, 15); }

  document.getElementById('feedback-meta').textContent = `AI জেনারেটেড • ${new Date().toLocaleString('bn-BD')}`;
}

function typewriterEffect(el, text) {
  // Direct & smooth output — no laggy character interval
  el.textContent = text;
}

function copyFeedback() {
  const text = document.getElementById('feedback-text-output')?.textContent || '';
  navigator.clipboard.writeText(text).then(()=>showToast('ফিডব্যাক কপি হয়েছে!','success'));
}

function shareFeedbackWhatsApp() {
  const text = document.getElementById('feedback-text-output')?.textContent || '';
  window.open('https://wa.me/?text='+encodeURIComponent(text), '_blank');
}

// ═══════════════════════════════════════════════════════
//  ৬. RUBRIC BUILDER
// ═══════════════════════════════════════════════════════
/* ─── Rubric: Activity & Score tile helpers ─── */
function selectActivity(el, type) {
  document.querySelectorAll('.activity-tile').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const inp = document.getElementById('rubric-type');
  if(inp) inp.value = type;
  // Mark step 1 active
  document.getElementById('rstep-1')?.classList.add('active');
}

function selectScore(el, score) {
  document.querySelectorAll('.score-tile').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const inp = document.getElementById('rubric-max-score');
  if(inp) inp.value = score;
}

function refreshRubricStudentSelect() {
  const sel = document.getElementById('rubric-student-select');
  if(!sel) return;
  sel.innerHTML = '<option value="">-- শিক্ষার্থী বেছে নিন --</option>';
  [...students].sort((a,b)=>a.roll-b.roll).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id; opt.textContent = `${s.roll}. ${s.name}`;
    sel.appendChild(opt);
  });
}

const rubricTemplates = {
  'Presentation': {
    criteria: ['Content', 'Accuracy', 'Communication', 'Creativity', 'Confidence'],
    desc: {
      5: ['বিষয়বস্তু সম্পূর্ণ ও সুশৃঙ্খল', 'সকল তথ্য সঠিক', 'অত্যন্ত স্পষ্ট ও আকর্ষণীয়', 'অনন্য ও মৌলিক ধারণা', 'অত্যন্ত আত্মবিশ্বাসী'],
      4: ['প্রায় সম্পূর্ণ', 'অধিকাংশ তথ্য সঠিক', 'স্পষ্ট ও বোধগম্য', 'কিছু মৌলিক ধারণা', 'আত্মবিশ্বাসী'],
      3: ['মূল বিষয় আছে', 'কিছু ভুল আছে', 'মোটামুটি স্পষ্ট', 'প্রচলিত ধারণা', 'সাধারণ'],
      2: ['অসম্পূর্ণ', 'অনেক ভুল', 'অস্পষ্ট', 'সৃজনশীলতার অভাব', 'দ্বিধান্বিত'],
      1: ['অপ্রাসঙ্গিক', 'বেশিরভাগ ভুল', 'বোধগম্য নয়', 'নেই বললেই চলে', 'অত্যন্ত নার্ভাস'],
    }
  },
  'Project Work': {
    criteria: ['Research', 'Analysis', 'Presentation', 'Teamwork', 'Conclusion'],
    desc: {
      5: ['গভীর গবেষণা', 'উৎকৃষ্ট বিশ্লেষণ', 'পেশাদার উপস্থাপনা', 'চমৎকার দলগত কাজ', 'সুস্পষ্ট সিদ্ধান্ত'],
      4: ['ভালো গবেষণা', 'ভালো বিশ্লেষণ', 'সুন্দর উপস্থাপনা', 'ভালো সহযোগিতা', 'স্পষ্ট সিদ্ধান্ত'],
      3: ['পর্যাপ্ত গবেষণা', 'মোটামুটি বিশ্লেষণ', 'ঠিকঠাক উপস্থাপনা', 'কিছুটা সহযোগিতা', 'মোটামুটি সিদ্ধান্ত'],
      2: ['সীমিত গবেষণা', 'দুর্বল বিশ্লেষণ', 'দুর্বল উপস্থাপনা', 'কম সহযোগিতা', 'অস্পষ্ট সিদ্ধান্ত'],
      1: ['গবেষণা নেই', 'বিশ্লেষণ নেই', 'উপস্থাপনা নেই', 'একক কাজ', 'কোনো সিদ্ধান্ত নেই'],
    }
  },
  'Written Assignment': {
    criteria: ['Content Quality', 'Language & Grammar', 'Structure', 'Originality', 'Completion'],
    desc: {
      5: ['অসাধারণ বিষয়বস্তু', 'নিখুঁত ভাষা', 'চমৎকার গঠন', 'সম্পূর্ণ মৌলিক', 'সম্পূর্ণ'],
      4: ['ভালো বিষয়বস্তু', 'ভালো ভাষা', 'সুগঠিত', 'মূলত মৌলিক', 'প্রায় সম্পূর্ণ'],
      3: ['পর্যাপ্ত', 'কিছু ভুল', 'ঠিকঠাক গঠন', 'আংশিক মৌলিক', 'মোটামুটি সম্পূর্ণ'],
      2: ['দুর্বল', 'অনেক ভুল', 'অগোছালো', 'অনেকটা নকল', 'অসম্পূর্ণ'],
      1: ['অপ্রাসঙ্গিক', 'ভাষা বোধগম্য নয়', 'কোনো গঠন নেই', 'সম্পূর্ণ নকল', 'অদর্পণযোগ্য'],
    }
  },
  'Oral Exam': {
    criteria: ['Knowledge', 'Clarity', 'Confidence', 'Depth', 'Communication'],
    desc: {
      5: ['সম্পূর্ণ জ্ঞান', 'অত্যন্ত স্পষ্ট', 'পূর্ণ আত্মবিশ্বাস', 'গভীর উত্তর', 'চমৎকার যোগাযোগ'],
      4: ['ভালো জ্ঞান', 'স্পষ্ট', 'আত্মবিশ্বাসী', 'ভালো গভীরতা', 'ভালো যোগাযোগ'],
      3: ['মোটামুটি জ্ঞান', 'মোটামুটি স্পষ্ট', 'সাধারণ', 'মোটামুটি', 'মোটামুটি'],
      2: ['সীমিত জ্ঞান', 'অস্পষ্ট', 'অনিশ্চিত', 'অগভীর', 'দুর্বল যোগাযোগ'],
      1: ['জ্ঞান নেই', 'বোধগম্য নয়', 'নার্ভাস', 'উত্তর নেই', 'যোগাযোগ নেই'],
    }
  },
};

// Generic rubric for unknown types
function getGenericRubric(type) {
  return {
    criteria: ['মানসম্পন্নতা', 'সম্পূর্ণতা', 'সঠিকতা', 'উপস্থাপনা', 'সৃজনশীলতা'],
    desc: {
      5: ['অসাধারণ', 'সম্পূর্ণ', 'নিখুঁত', 'চমৎকার', 'অনন্য'],
      4: ['ভালো', 'প্রায় সম্পূর্ণ', 'সঠিক', 'ভালো', 'মৌলিক'],
      3: ['গ্রহণযোগ্য', 'মোটামুটি', 'কিছু ভুল', 'ঠিকঠাক', 'সাধারণ'],
      2: ['দুর্বল', 'অসম্পূর্ণ', 'অনেক ভুল', 'দুর্বল', 'কম'],
      1: ['অগ্রহণযোগ্য', 'অদর্পণযোগ্য', 'ভুলে ভরা', 'নেই', 'নেই'],
    }
  };
}

function generateRubric() {
  const type = document.getElementById('rubric-type')?.value || 'Presentation';
  const topic = document.getElementById('rubric-topic')?.value?.trim() || '';
  const maxScore = parseInt(document.getElementById('rubric-max-score')?.value || '5');
  const studentId = document.getElementById('rubric-student-select')?.value || '';

  const template = rubricTemplates[type] || getGenericRubric(type);
  const scores = maxScore === 4 ? [4,3,2,1] : maxScore === 10 ? [10,8,6,4,2] : maxScore === 100 ? [100,80,60,40,20] : [5,4,3,2,1];

  // Activate step 2
  document.getElementById('rstep-2')?.classList.add('active');

  // Show result
  document.getElementById('rubric-placeholder').classList.add('hidden');
  document.getElementById('rubric-result').classList.remove('hidden');
  document.getElementById('rubric-result-title').textContent = `${type} Rubric`;
  document.getElementById('rubric-result-sub').textContent = topic ? `বিষয়: ${topic}` : (settings.subjects[0] || '');

  const thead = document.getElementById('rubric-thead');
  const tbody = document.getElementById('rubric-tbody');

  thead.innerHTML = `<tr>
    <th>মানদণ্ড</th>
    ${scores.map(s=>`<th>${s} পয়েন্ট</th>`).join('')}
  </tr>`;

  // Helper: map score index to template description
  const descRow = (crit) => {
    const idx = template.criteria.indexOf(crit);
    return scores.map((sc,si) => {
      const key = maxScore===4?[4,3,2,1][si]:maxScore===10?[5,4,3,2,1][si]:maxScore===100?[5,4,3,2,1][si]:sc;
      const desc = template.desc[key]?.[idx] || template.desc[5]?.[idx] || '—';
      return `<td>${desc}</td>`;
    }).join('');
  };

  tbody.innerHTML = template.criteria.map(crit => `
    <tr>
      <td>${crit}</td>
      ${descRow(crit)}
    </tr>
  `).join('');

  // Interactive Scoring (Step 3)
  window._rubricScores = {};
  window._rubricMaxPerCrit = scores[0];
  window._rubricCritCount = template.criteria.length;
  window._rubricCriteria = template.criteria;

  document.getElementById('rubric-scoring').innerHTML = `
    <div style="background:var(--bg-app);border-radius:var(--radius);padding:18px;border:1px solid var(--border);">
      <div style="font-size:13px;font-weight:800;color:var(--text-main);margin-bottom:14px;display:flex;align-items:center;gap:8px;">
        <i class="fa-solid fa-calculator" style="color:var(--primary)"></i>
        শিক্ষার্থীকে স্কোর দিন
        <span id="rubric-total-display" style="margin-left:auto;font-size:14px;font-weight:800;color:var(--primary);">মোট: ০ / ${scores[0] * template.criteria.length}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
        ${template.criteria.map((crit,ci) => `
          <div style="background:var(--bg-card);border-radius:var(--radius-sm);padding:12px;border:1px solid var(--border);">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:8px;">${crit}</div>
            <div style="display:flex;flex-wrap:wrap;gap:5px;">
              ${scores.map(sc => `<span class="rubric-score-chip" onclick="selectRubricScore(this,'${crit}',${sc})">${sc}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // If student selected, show student summary section
  const summaryEl = document.getElementById('rubric-student-summary');
  if(studentId && summaryEl) {
    summaryEl.classList.remove('hidden');
    const stu = students.find(x=>x.id===studentId);
    if(stu) {
      summaryEl.innerHTML = `
        <div class="rubric-student-result">
          <div class="rubric-student-result-header">
            <div class="user-avatar" style="background:${getAvatarColor(stu.name)};width:32px;height:32px;font-size:13px;">${stu.name.charAt(0)}</div>
            ${stu.name} এর জন্য স্কোর সারসংক্ষেপ
          </div>
          <div id="rubric-score-result-grid" class="rubric-score-result-grid"></div>
          <div id="rubric-total-result" class="rubric-total-bar">
            <span style="font-size:14px;font-weight:700;color:var(--text-main);">মোট স্কোর:</span>
            <span style="font-size:20px;font-weight:800;color:var(--primary);">০ / ${scores[0]*template.criteria.length}</span>
          </div>
        </div>
      `;
    }
  } else if(summaryEl) summaryEl.classList.add('hidden');

  // Activate step 3
  document.getElementById('rstep-3')?.classList.add('active');
  showToast('Rubric তৈরি হয়েছে!', 'success');
}

function selectRubricScore(el, crit, score) {
  el.closest('div')?.querySelectorAll('.rubric-score-chip').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  window._rubricScores[crit] = score;
  const total = Object.values(window._rubricScores||{}).reduce((a,b)=>a+b,0);
  const max = (window._rubricMaxPerCrit||5) * (window._rubricCritCount||5);
  // Update total display
  const disp = document.getElementById('rubric-total-display');
  if(disp) disp.textContent = `মোট: ${total} / ${max}`;
  // Update student summary if visible
  const criteria = window._rubricCriteria || [];
  const grid = document.getElementById('rubric-score-result-grid');
  if(grid && criteria.length) {
    grid.innerHTML = criteria.map(c => `
      <div class="rubric-score-cell">
        <div class="crit-name">${c}</div>
        <div class="crit-score">${window._rubricScores[c] || '—'}</div>
      </div>
    `).join('');
  }
  const totalResult = document.getElementById('rubric-total-result');
  if(totalResult) totalResult.innerHTML = `
    <span style="font-size:14px;font-weight:700;color:var(--text-main);">মোট স্কোর:</span>
    <span style="font-size:20px;font-weight:800;color:var(--primary);">${total} / ${max}</span>
  `;
}

function saveRubric() {
  const title = document.getElementById('rubric-result-title')?.textContent || 'Rubric';
  const sub = document.getElementById('rubric-result-sub')?.textContent || '';
  const id = 'rub_'+Date.now();
  savedRubrics.push({ id, title, sub, savedAt: new Date().toISOString() });
  saveToStorage();
  renderSavedRubrics();
  showToast('Rubric সংরক্ষিত হয়েছে!', 'success');
}

function renderSavedRubrics() {
  const el = document.getElementById('saved-rubrics-list');
  if(!el) return;
  if(savedRubrics.length === 0) { el.innerHTML = '<div style="color:var(--text-light);font-size:12px;padding:6px 0;">কোনো Rubric সংরক্ষিত নেই।</div>'; return; }
  el.innerHTML = savedRubrics.map(r=>`
    <div class="saved-rubric-item">
      <i class="fa-solid fa-table-list"></i>
      <span>${r.title} ${r.sub?`(${r.sub})`:''}</span>
      <button class="action-btn danger" onclick="deleteRubric('${r.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join('');
}

function deleteRubric(id) {
  savedRubrics = savedRubrics.filter(r=>r.id!==id);
  saveToStorage();
  renderSavedRubrics();
}

function printRubric() { window.print(); }

// ═══════════════════════════════════════════════════════
//  ৭. STUDENT TABLE
// ═══════════════════════════════════════════════════════

function renderStudentTable() {
  const query = (document.getElementById('student-search')?.value||'').toLowerCase().trim();
  const classFilter = document.getElementById('filter-class')?.value || '';
  const sectionFilter = document.getElementById('filter-section')?.value || '';
  
  let list = [...students];

  // শ্রেণি ফিল্টার
  if(classFilter) list = list.filter(s => (s.className || settings.className) === classFilter);
  
  // শাখা ফিল্টার
  if(sectionFilter) list = list.filter(s => (s.section || settings.section) === sectionFilter);

  if(currentFilter!=='all') {
    const mapLabel = {good:'ভালো',average:'মধ্যম',weak:'দুর্বল'};
    list = list.filter(s=>getCategory(calcTotals(s).pct).label===mapLabel[currentFilter]);
  }

  // Expanded Multi-field Search: Name, Roll, Class, Section, Parent
  if(query) {
    list = list.filter(s => {
      const clsName = (s.className || settings.className).toLowerCase();
      const secName = (s.section || settings.section).toLowerCase();
      const parentName = (s.parentName || '').toLowerCase();
      const name = s.name.toLowerCase();
      const roll = String(s.roll);

      return name.includes(query) ||
             roll.includes(query) ||
             clsName.includes(query) ||
             secName.includes(query) ||
             parentName.includes(query) ||
             `${clsName} ${secName}`.includes(query);
    });
  }

  // Sorting logic (default is highest total/position first)
  if(sortField) {
    list.sort((a,b)=>{
      let va,vb;
      if(sortField==='roll'){va=a.roll;vb=b.roll;}
      else if(sortField==='name'){va=a.name;vb=b.name;}
      else if(sortField==='position'||sortField==='total'){va=calcTotals(a).pct;vb=calcTotals(b).pct;}
      else{va=a.scores?.[sortField]||0;vb=b.scores?.[sortField]||0;}
      if(va<vb) return sortAsc?-1:1;
      if(va>vb) return sortAsc?1:-1;
      return 0;
    });
  }

  const thead=document.getElementById('table-header');
  const tbody=document.getElementById('table-body');
  const empty=document.getElementById('table-empty');
  if(!thead||!tbody) return;

  const subjs=settings.subjects;
  const si = s=>(sortField===s?(sortAsc?'↑':'↓'):'');
  const bnNums=['০','১ম','২য়','৩য়','৪র্থ','৫ম','৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম'];

  thead.innerHTML=`<tr>
    <th onclick="sortBy('position')" style="color:var(--primary);font-weight:800;">অবস্থান (মেধা) ${si('position')||si('total')}</th>
    <th onclick="sortBy('roll')">#রোল ${si('roll')}</th>
    <th onclick="sortBy('name')">নাম ${si('name')}</th>
    <th>শ্রেণি (শাখা)</th>
    ${subjs.map(s=>`<th onclick="sortBy('${s}')">${s}</th>`).join('')}
    <th onclick="sortBy('total')">মোট ${si('total')}</th>
    <th>গড়%</th><th>গ্রেড</th><th>শ্রেণি</th><th>অ্যাকশন</th>
  </tr>`;

  if(list.length===0){tbody.innerHTML='';empty.style.display='block';return;}
  empty.style.display='none';

  tbody.innerHTML=list.map(s=>{
    const {total,maxTotal,avg,pct}=calcTotals(s);
    const grade=getGrade(pct);
    const cat=getCategory(pct);
    const posNum=getPosition(s.id);
    const posBadge = bnNums[posNum] || (toBnNum(posNum) + 'তম');
    const posClass = posNum === 1 ? 'grade-aplus' : posNum === 2 ? 'grade-a' : posNum === 3 ? 'grade-aminus' : 'grade-b';

    const clsName = s.className || settings.className;
    const secName = s.section || settings.section;
    return `<tr>
      <td><span class="grade-badge ${posClass}" style="font-weight:900;font-size:13px;padding:4px 10px;"><i class="fa-solid fa-trophy" style="font-size:11px;margin-right:4px;"></i>${posBadge}</span></td>
      <td><strong>${s.roll}</strong></td>
      <td><strong>${s.name}</strong></td>
      <td><span class="badge badge-info" style="font-size:11px;">${clsName} (${secName})</span></td>
      ${subjs.map(sub=>`<td>${s.scores?.[sub]??'—'}</td>`).join('')}
      <td><strong>${total}/${maxTotal}</strong></td>
      <td>${avg}%</td>
      <td><span class="grade-badge ${grade.cls}">${grade.grade}</span></td>
      <td><span class="cat-badge ${cat.cls}"><i class="fa-solid ${cat.icon}"></i> ${cat.label}</span></td>
      <td>
        <button class="action-btn perf" onclick="openPerfFor('${s.id}')" title="পারফরম্যান্স"><i class="fa-solid fa-chart-line"></i></button>
        <button class="action-btn" onclick="openEditModal('${s.id}')" title="এডিট"><i class="fa-solid fa-pen"></i></button>
        <button class="action-btn report" onclick="openReportCardFor('${s.id}')" title="রিপোর্ট কার্ড"><i class="fa-solid fa-id-card"></i></button>
        <button class="action-btn danger" onclick="deleteStudent('${s.id}')" title="মুছুন"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>`;
  }).join('');
  updateStats();
}
function openPerfFor(id) { showSection('performance'); loadPerformance(id); }
function sortBy(field) { if(sortField===field)sortAsc=!sortAsc; else{sortField=field;sortAsc=true;} renderStudentTable(); }
function setFilter(cat) {
  currentFilter=cat;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('chip-active'));
  document.getElementById('chip-'+cat)?.classList.add('chip-active');
  renderStudentTable();
}
function updateStats() {
  let good=0,avg=0,weak=0,sum=0;
  students.forEach(s=>{const {pct}=calcTotals(s);sum+=pct;if(pct>=80)good++;else if(pct>=50)avg++;else weak++;});
  const ca=students.length?Math.round(sum/students.length):0;
  setEl('stat-total',students.length); setEl('stat-good',good); setEl('stat-avg',avg); setEl('stat-weak',weak); setEl('stat-classavg',ca+'%');
}

// ═══════════════════════════════════════════════════════
//  ৮. ADD/EDIT STUDENT MODAL
// ═══════════════════════════════════════════════════════
function openAddStudentModal() {
  document.getElementById('modal-title').innerHTML='<i class="fa-solid fa-user-plus"></i> নতুন শিক্ষার্থী';
  document.getElementById('modal-student-id').value='';
  document.getElementById('m-name').value='';
  document.getElementById('m-roll').value='';
  document.getElementById('m-parent').value='';
  document.getElementById('m-phone').value='';
  document.getElementById('m-remarks').value='';
  buildScoreInputs({});
  document.getElementById('student-modal').classList.remove('hidden');
}
function openEditModal(id) {
  const s=students.find(x=>x.id===id);
  if(!s) return;
  document.getElementById('modal-title').innerHTML='<i class="fa-solid fa-pen"></i> সম্পাদনা করুন';
  document.getElementById('modal-student-id').value=id;
  document.getElementById('m-name').value=s.name;
  document.getElementById('m-roll').value=s.roll;
  if(document.getElementById('m-class')) document.getElementById('m-class').value=s.className||settings.className;
  if(document.getElementById('m-section')) document.getElementById('m-section').value=s.section||settings.section;
  document.getElementById('m-parent').value=s.parentName||'';
  document.getElementById('m-phone').value=s.phone||'';
  document.getElementById('m-remarks').value=s.remarks||'';
  buildScoreInputs(s.scores||{});
  document.getElementById('student-modal').classList.remove('hidden');
}
function buildScoreInputs(scores) {
  document.getElementById('scores-inputs').innerHTML=settings.subjects.map(sub=>`
    <div class="score-input-group">
      <label>${sub}</label>
      <input type="number" id="score-${sub}" min="0" max="100" value="${scores[sub]??''}" placeholder="০–১০০" />
    </div>
  `).join('');
}
function saveStudentFromModal() {
  const name=document.getElementById('m-name').value.trim();
  const roll=parseInt(document.getElementById('m-roll').value);
  const className=document.getElementById('m-class')?.value.trim() || settings.className;
  const section=document.getElementById('m-section')?.value.trim() || settings.section;
  if(!name){showToast('নাম দিন!','error');return;}
  if(!roll){showToast('রোল দিন!','error');return;}
  const scores={};
  settings.subjects.forEach(sub=>{
    const v=parseFloat(document.getElementById('score-'+sub)?.value);
    scores[sub]=isNaN(v)?0:Math.min(100,Math.max(0,v));
  });
  const id=document.getElementById('modal-student-id').value;
  const data={name,roll,className,section,scores,parentName:document.getElementById('m-parent').value.trim(),phone:document.getElementById('m-phone').value.trim(),remarks:document.getElementById('m-remarks').value.trim()};
  if(id){
    const idx=students.findIndex(s=>s.id===id);
    if(idx!==-1) students[idx]={...students[idx],...data};
    showToast('তথ্য আপডেট হয়েছে!','success');
  } else {
    students.push({id:'sid_'+Date.now(),...data,timeline:{quiz:[],assignment:[],oral:[],practical:[],attendance:[],homework:[]}});
    showToast('শিক্ষার্থী যোগ হয়েছে!','success');
  }
  closeStudentModal(); saveToStorage(); renderStudentTable(); refreshReportSelector(); refreshFeedbackSelector();
}
function deleteStudent(id) {
  if(!confirm('মুছে দেবেন?'))return;
  students=students.filter(s=>s.id!==id);
  saveToStorage(); renderStudentTable(); refreshReportSelector(); refreshFeedbackSelector();
  showToast('মুছে দেওয়া হয়েছে।','error');
}
function closeStudentModal(){document.getElementById('student-modal').classList.add('hidden');}
function closeModalOnBackdrop(e){if(e.target===document.getElementById('student-modal'))closeStudentModal();}

// ═══════════════════════════════════════════════════════
//  ৯. ANALYTICS
// ═══════════════════════════════════════════════════════
function renderAnalytics() {
  const total=students.length;
  setEl('analytics-total-badge',total+' জন');
  let good=0,avg=0,weak=0;
  const gc={'A+':0,'A':0,'A-':0,'B':0,'C':0,'D':0,'F':0};
  const st={};settings.subjects.forEach(s=>st[s]=0);
  students.forEach(s=>{
    const {pct}=calcTotals(s);
    const g=getGrade(pct).grade;
    if(pct>=80)good++;else if(pct>=50)avg++;else weak++;
    gc[g]=(gc[g]||0)+1;
    settings.subjects.forEach(sub=>{st[sub]+=(s.scores?.[sub]||0);});
  });
  const maxD=Math.max(good,avg,weak,1);
  const dist=document.getElementById('distribution-bars');
  if(dist) dist.innerHTML=[{label:'ভালো',val:good,cls:'dist-good',color:'var(--success)'},{label:'মধ্যম',val:avg,cls:'dist-average',color:'var(--warning)'},{label:'দুর্বল',val:weak,cls:'dist-weak',color:'var(--danger)'}].map(({label,val,cls,color})=>`
    <div class="dist-bar-group">
      <div class="dist-count" style="color:${color}">${val}</div>
      <div class="dist-bar-wrap"><div class="dist-bar ${cls}" style="height:${Math.round((val/maxD)*90)}%"></div></div>
      <div class="dist-label" style="color:${color}">${label}</div>
    </div>
  `).join('');
  const gc2=document.getElementById('grade-bars');
  const gCols={'A+':'#10b981','A':'#34d399','A-':'#60a5fa','B':'#818cf8','C':'#fbbf24','D':'#fb923c','F':'#f87171'};
  if(gc2&&total) gc2.innerHTML=Object.entries(gc).map(([g,cnt])=>`
    <div class="bar-row">
      <div class="bar-label-row"><span class="bar-subject-name"><span class="grade-badge grade-${g.toLowerCase().replace('+','plus').replace('-','minus')}">${g}</span></span><span class="bar-pct" style="color:${gCols[g]}">${cnt} জন</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${total?Math.round((cnt/total)*100):0}%;background:${gCols[g]}"></div></div>
    </div>
  `).join('');
  const sb=document.getElementById('subject-bars');
  const sCols=['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f43f5e'];
  if(sb&&total) sb.innerHTML=settings.subjects.map((sub,i)=>{
    const a=total?Math.round(st[sub]/total):0;
    return `<div class="bar-row"><div class="bar-label-row"><span class="bar-subject-name">${sub}</span><span class="bar-pct" style="color:${sCols[i%sCols.length]}">${a}/১০০</span></div><div class="bar-track"><div class="bar-fill" style="width:${a}%;background:${sCols[i%sCols.length]}"></div></div></div>`;
  }).join('');
  const pod=document.getElementById('podium');
  if(pod){
    const top3=[...students].sort((a,b)=>calcTotals(b).pct-calcTotals(a).pct).slice(0,3);
    if(!top3.length){pod.innerHTML='<div style="color:var(--text-muted);font-size:14px;">শিক্ষার্থী যোগ করুন।</div>';return;}
    const order=top3.length>=3?[top3[1],top3[0],top3[2]]:top3;
    const rankCls=top3.length>=3?['rank-2','rank-1','rank-3']:['rank-1'];
    const medals=['🥇','🥈','🥉'];
    const rNums=top3.length>=3?[2,1,3]:[1];
    pod.innerHTML=order.map((s,i)=>{
      const {pct}=calcTotals(s);
      return `<div class="podium-place ${rankCls[i]}"><div class="podium-medal">${medals[rNums[i]-1]}</div><div class="podium-avatar">${s.name.charAt(0)}</div><div class="podium-name">${s.name}</div><div class="podium-score">${pct}%</div><div class="podium-stand">${rNums[i]}ম স্থান</div></div>`;
    }).join('');
  }
  const wl=document.getElementById('weak-students-list');
  const ws=students.filter(s=>calcTotals(s).pct<50).sort((a,b)=>calcTotals(a).pct-calcTotals(b).pct);
  setEl('weak-count-badge',ws.length+' জন');
  if(wl) wl.innerHTML=ws.length?ws.map(s=>{
    const {pct}=calcTotals(s);
    return `<div class="weak-item"><div class="user-avatar" style="background:var(--danger);width:36px;height:36px;font-size:13px;">${s.name.charAt(0)}</div><div><div class="weak-item-name">${s.name} (রোল: ${s.roll})</div><div class="weak-item-score">গড়: ${pct}%</div></div><div class="weak-item-suggestion">${pct<33?'জরুরি সহায়তা প্রয়োজন':pct<50?'নিয়মিত অনুশীলন দরকার':'উন্নতির সুযোগ আছে'}</div><button class="btn-outline btn-sm" onclick="openReportCardFor('${s.id}')"><i class="fa-solid fa-id-card"></i></button></div>`;
  }).join(''):'<div style="color:var(--success);font-size:14px;"><i class="fa-solid fa-circle-check"></i> সকল শিক্ষার্থীর ফলাফল সন্তোষজনক।</div>';
}

// ═══════════════════════════════════════════════════════
//  ১০. REPORT CARD
// ═══════════════════════════════════════════════════════
function refreshReportSelector() {
  const sel=document.getElementById('report-student-select');
  if(!sel) return;
  const prev=sel.value;
  sel.innerHTML='<option value="">-- শিক্ষার্থী বেছে নিন --</option>';
  [...students].sort((a,b)=>a.roll-b.roll).forEach(s=>{
    const opt=document.createElement('option');
    opt.value=s.id; opt.textContent=`${s.roll}. ${s.name}`;
    sel.appendChild(opt);
  });
  if(prev) sel.value=prev;
}
function refreshFeedbackSelector() {
  const sel=document.getElementById('feedback-student-select');
  if(!sel) return;
  const prev=sel.value;
  sel.innerHTML='<option value="">-- শিক্ষার্থী বেছে নিন --</option>';
  [...students].sort((a,b)=>a.roll-b.roll).forEach(s=>{
    const opt=document.createElement('option');
    opt.value=s.id; opt.textContent=`${s.roll}. ${s.name}`;
    sel.appendChild(opt);
  });
  if(prev) sel.value=prev;
}
function openReportCardFor(id) {
  showSection('report');
  refreshReportSelector();
  document.getElementById('report-student-select').value=id;
  renderReportCard(id);
}
function renderReportCard(id) {
  selectedReportStudentId=id;
  const preview=document.getElementById('report-preview');
  if(!id){preview.innerHTML=`<div class="report-placeholder"><i class="fa-solid fa-id-card"></i><p>একজন শিক্ষার্থী নির্বাচন করুন।</p></div>`;return;}
  const s=students.find(x=>x.id===id);
  if(!s) return;
  const {total,maxTotal,avg,pct}=calcTotals(s);
  const grade=getGrade(pct);
  const posNum=getPosition(s.id);
  const bnNums=['০','১ম','২য়','৩য়','৪র্থ','৫ম','৬ষ্ঠ','৭ম','৮ম','৯ম','১০ম'];
  const posText = bnNums[posNum] || (toBnNum(posNum) + 'তম');
  const clsName = s.className || settings.className;
  const secName = s.section || settings.section;
  const subjs=settings.subjects;

  const marksRows=subjs.map(sub=>{
    const sc=s.scores?.[sub]??0;
    const g=getGrade(sc);
    return `
      <tr>
        <td class="col-subject">${sub}</td>
        <td class="col-total">100</td>
        <td class="col-obtained">${sc}</td>
        <td class="col-pct">${sc}%</td>
        <td class="col-grade"><span class="grade-badge ${g.cls}">${g.grade}</span></td>
        <td class="col-remark">${sc>=80?'চমৎকার':sc>=60?'ভালো':sc>=40?'গড়মানের':'উন্নতি দরকার'}</td>
      </tr>`;
  }).join('');

  preview.innerHTML=`
    <div class="report-card-container">
      <div class="report-card" id="printable-report">
        
        <!-- মেডেল ব্যাজসহ প্রিমিয়াম হেডার -->
        <div class="report-pro-header">
           <!-- ডানে মেডেল ব্যাজ -->
           <div class="header-medal-container">
              <div class="medal-ribbon"></div>
              <div class="medal-circle">
                 <div class="medal-inner"></div>
              </div>
              <i class="fa-solid fa-star star-1"></i>
              <i class="fa-solid fa-star star-2"></i>
              <i class="fa-solid fa-star star-3"></i>
           </div>

           <div class="pro-header-content">
              <div class="school-brand">
                 <div class="school-logo-alt">${settings.school.charAt(0)}</div>
                 <div>
                    <h1 class="school-name-v3">${settings.school}</h1>
                    <p class="school-location-v3">শ্রেণি: ${clsName} | শাখা: ${secName} | শিক্ষাবর্ষ: ${settings.year}</p>
                 </div>
              </div>
              <div class="report-main-title">
                 <strong>অ্যাকাডেমিক ট্রান্সক্রিপ্ট</strong>
                 <span>শিক্ষাবর্ষ: ${settings.year}</span>
              </div>
           </div>
        </div>

        <div class="report-student-info">
          <div class="report-info-row"><span class="info-label">নাম</span><span class="info-value">${s.name}</span></div>
          <div class="report-info-row"><span class="info-label">রোল</span><span class="info-value">${s.roll}</span></div>
          <div class="report-info-row"><span class="info-label">শ্রেণি (শাখা)</span><span class="info-value">${clsName} (${secName})</span></div>
          <div class="report-info-row"><span class="info-label">শিক্ষাবর্ষ</span><span class="info-value">${settings.year}</span></div>
          <div class="report-info-row"><span class="info-label">অভিভাবক</span><span class="info-value">${s.parentName||'—'}</span></div>
          <div class="report-info-row"><span class="info-label">অবস্থান</span><span class="info-value" style="color:#4f46e5;font-weight:800;">${posText}</span></div>
        </div>
        <div class="report-marks-table">
          <table>
            <thead>
              <tr>
                <th style="text-align:left">বিষয়</th>
                <th>পূর্ণমান</th>
                <th>প্রাপ্তমান</th>
                <th>শতকরা</th>
                <th>গ্রেড</th>
                <th style="text-align:left">মন্তব্য</th>
              </tr>
            </thead>
            <tbody>${marksRows}</tbody>
          </table>
        </div>
        <div class="report-summary">
          <div class="summary-cell"><div class="summary-value">${total}/${maxTotal}</div><div class="summary-label">মোট নম্বর</div></div>
          <div class="summary-cell"><div class="summary-value">${pct}%</div><div class="summary-label">গড় শতকরা</div></div>
          <div class="summary-cell"><div class="summary-value">${grade.grade}</div><div class="summary-label">চূড়ান্ত গ্রেড</div></div>
          <div class="summary-cell"><div class="summary-value">${grade.gp}</div><div class="summary-label">গ্রেড পয়েন্ট</div></div>
        </div>
        <div class="report-progress-bars">
          <h4 class="section-modern-title"><i class="fa-solid fa-bolt" style="color:#4f46e5;margin-right:6px;"></i> বিষয়ভিত্তিক পারফরম্যান্স ড্যাশবোর্ড</h4>
          <div class="modern-subject-matrix">
            ${subjs.map(sub => {
              const sc = s.scores?.[sub] || 0;
              let status = sc >= 80 ? 'সেরা' : sc >= 60 ? 'সন্তোষজনক' : 'উন্নতি প্রয়োজন';
              let statusClass = sc >= 80 ? 'st-excellent' : sc >= 60 ? 'st-good' : 'st-warn';
              return `
                <div class="matrix-card ${statusClass}">
                  <div class="card-left">
                    <span class="m-sub-name">${sub}</span>
                    <span class="m-sub-status">${status}</span>
                  </div>
                  <div class="card-right">
                     <div class="score-circle">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path class="circle" stroke-dasharray="${sc}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div class="percentage">${sc}</div>
                     </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>
        <div class="report-remarks"><h4>শিক্ষকের মন্তব্য</h4><p>${s.remarks||'উত্তম পারফরম্যান্স।'}</p></div>
        <div class="report-footer">
          <div class="signature-block"><div class="signature-line"></div><div class="signature-label">অভিভাবকের স্বাক্ষর</div></div>
          <div style="text-align:center;font-size:12px;color:#64748b;"><div style="font-weight:600;">তারিখ: ${new Date().toLocaleDateString('bn-BD')}</div></div>
          <div class="signature-block"><div class="signature-line"></div><div class="signature-label">${settings.teacherName}<br>${settings.teacherDesignation}</div></div>
        </div>
      </div>
    </div>
  `;
}
function printReportCard(){if(!selectedReportStudentId){showToast('শিক্ষার্থী নির্বাচন করুন!','error');return;}window.print();}
function saveReportCard() {
  if (!selectedReportStudentId) {
    showToast('শিক্ষার্থী নির্বাচন করুন!', 'error');
    return;
  }
  saveToStorage();
  saveCurrentSnapshot();
  showToast('সিস্টেম ও মূল্যায়ন ইতিহাসে সংরক্ষিত হয়েছে!', 'success');
}

/* ─── Keyboard Shortcuts & Save Options ─── */
function openSaveOptionsModal() {
  const modal = document.getElementById('save-options-modal');
  if(modal) modal.classList.remove('hidden');
}

function closeSaveOptionsModal() {
  const modal = document.getElementById('save-options-modal');
  if(modal) modal.classList.add('hidden');
}

// ESC এবং কীবোর্ড শর্টকাট
document.addEventListener('keydown', e => {
  // ESC চাপলে ক্লোজ করার সুবিধা
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (selectedReportStudentId) {
      selectedReportStudentId = null;
      const sel = document.getElementById('report-student-select');
      if (sel) sel.value = "";
      renderReportCard(null);
    }
    closeStudentModal();
    closeSaveOptionsModal();
    const expDrop = document.getElementById('export-dropdown');
    if (expDrop) expDrop.style.display = 'none';
  }

  const isCtrl = e.ctrlKey || e.metaKey;
  if (!isCtrl) return;

  if (e.key === 's' || e.key === 'S') {
    e.preventDefault();
    if (selectedReportStudentId) {
      saveReportCard();
    } else {
      openSaveOptionsModal();
    }
  }
  if (e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    printReportCard();
  }
  if (e.key === 'e' || e.key === 'E') {
    e.preventDefault();
    exportReportAsWord();
  }
});
function archiveCurrentReport(){if(!selectedReportStudentId){showToast('শিক্ষার্থী নির্বাচন করুন!','error');return;}saveCurrentSnapshot();showToast('আর্কাইভ হয়েছে!','success');}
function shareWhatsApp(){
  if(!selectedReportStudentId){showToast('শিক্ষার্থী নির্বাচন করুন!','error');return;}
  const s=students.find(x=>x.id===selectedReportStudentId);
  if(!s) return;
  const {total,maxTotal,pct}=calcTotals(s);
  const grade=getGrade(pct);
  const lines=settings.subjects.map(sub=>`  ${sub}: ${s.scores?.[sub]||0}/১০০`).join('\n');
  const msg=encodeURIComponent(`প্রিয় অভিভাবক,\n\n${s.name} (রোল: ${s.roll}) এর মূল্যায়ন:\n\n${lines}\n\nমোট: ${total}/${maxTotal} | গড়: ${pct}% | গ্রেড: ${grade.grade}\n\nমন্তব্য: ${s.remarks||'ভালো পারফরম্যান্স।'}\n\n— ${settings.teacherName}\n${settings.school}`);
  window.open(`https://wa.me/?text=${msg}`,'_blank');
}

// ═══════════════════════════════════════════════════════
//  ১১. ASSESSMENT HISTORY
// ═══════════════════════════════════════════════════════
function saveCurrentSnapshot() {
  const currentSub = settings.subjects[0] || "সাধারণ বিষয়";
  const now = new Date();
  
  const snap = {
    id: 'snap_'+Date.now(),
    title: `বিষয়: ${currentSub}`,
    className: settings.className,
    section: settings.section,
    subject: currentSub,
    school: settings.school,
    date: now.toLocaleDateString('bn-BD'),
    time: now.toLocaleTimeString('bn-BD', {hour: '2-digit', minute:'2-digit'}),
    savedAt: now.toISOString(),
    studentCount: students.length,
    classAvg: students.length ? Math.round(students.reduce((s,x)=>s+calcTotals(x).pct,0)/students.length) : 0,
    status: 'active',
    students: JSON.parse(JSON.stringify(students)),
  };
  
  assessmentHistory.unshift(snap);
  saveToStorage();
  renderHistory();
  showToast('নতুন স্ন্যাপশট কার্ড তৈরি হয়েছে!', 'success');
}

function setHistoryFilter(f){
  historyFilter=f;
  document.querySelectorAll('[id^="hchip-"]').forEach(c=>c.classList.remove('chip-active'));
  document.getElementById('hchip-'+f)?.classList.add('chip-active');
  renderHistory();
}

function openSnapshot(id) {
  const snap = assessmentHistory.find(h => h.id === id);
  if (!snap) return;

  if (confirm(`আপনি কি "${snap.title}" (${snap.className} শ্রেণি) ফাইলটি সচল করতে চান?`)) {
    students = JSON.parse(JSON.stringify(snap.students));
    settings.className = snap.className || settings.className;
    settings.section = snap.section || settings.section;
    if(snap.school) settings.school = snap.school;
    window.activeSnapshotId = id;

    saveToStorage();
    renderStudentTable();
    refreshReportSelector();
    refreshFeedbackSelector();
    renderHistory();

    showSection('students');
    showToast(`"${snap.title}" সফলভাবে লোড হয়েছে।`, 'success');
  }
}

function exportHistoricalReport(id) {
  const snap = assessmentHistory.find(h => h.id === id);
  if(!snap) return;
  showToast(`"${snap.title}" ফাইল এক্সপোর্ট করা হচ্ছে...`, 'info');
  openSnapshot(id);
}

function renderHistory() {
  const el = document.getElementById('history-list');
  if(!el) return;

  const q = (document.getElementById('history-search')?.value || '').toLowerCase();
  const classFilter = document.getElementById('history-class')?.value || '';
  const sectionFilter = document.getElementById('history-section')?.value || '';
  
  let list = [...assessmentHistory];
  if(historyFilter==='active') list=list.filter(h=>h.status==='active');
  if(historyFilter==='archived') list=list.filter(h=>h.status==='archived');
  if(classFilter) list = list.filter(h => (h.className||settings.className) === classFilter);
  if(sectionFilter) list = list.filter(h => (h.section||settings.section) === sectionFilter);
  if(q) list = list.filter(h => (h.title||'').toLowerCase().includes(q) || (h.date||'').includes(q) || (h.subject||'').toLowerCase().includes(q));

  if(list.length === 0) {
    el.className = "history-list";
    el.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:40px;width:100%;"><i class="fa-solid fa-folder-open" style="font-size:40px;opacity:.2;display:block;margin-bottom:12px;"></i><p>কোনো কার্ড পাওয়া যায়নি।</p></div>';
    return;
  }

  el.className = "history-card-grid";
  el.innerHTML = list.map(h => {
    const isActive = window.activeSnapshotId === h.id;
    const subName = h.subject || settings.subjects[0] || "সাধারণ বিষয়";
    const clsName = h.className || settings.className;
    const schoolName = h.school || settings.school;
    const timeStr = h.time || "১২:০০ PM";

    return `
    <div class="hist-card ${isActive ? 'active-card' : ''}">
      <div class="card-badges">
        <span class="badge-cls"><i class="fa-solid fa-graduation-cap"></i> ${clsName} শ্রেণি</span>
        <span class="badge-sub"><i class="fa-solid fa-book"></i> ${subName}</span>
      </div>
      
      <div class="card-time-row">
        <span><i class="fa-solid fa-calendar-days"></i> ${h.date}</span>
        <span><i class="fa-solid fa-clock"></i> ${timeStr}</span>
      </div>

      <div class="card-body">
        <h3 class="card-title">${h.title || ('বিষয়: ' + subName)}</h3>
        <p class="card-school"><i class="fa-solid fa-school"></i> ${schoolName}</p>
      </div>

      <div class="card-footer">
        <button class="btn-card-load" onclick="openSnapshot('${h.id}')">
          <i class="fa-solid fa-folder-open"></i> লোড
        </button>
        <button class="btn-card-word" onclick="exportHistoricalReport('${h.id}')">
          <i class="fa-solid fa-file-word"></i> ওয়ার্ড
        </button>
        <button class="btn-card-del" onclick="deleteSnapshot('${h.id}')">
          <i class="fa-solid fa-trash-can"></i> ডিলিট
        </button>
      </div>
    </div>
    `;
  }).join('');
}
function restoreSnapshot(id){
  const snap=assessmentHistory.find(h=>h.id===id);
  if(!snap||!confirm('এই স্ন্যাপশট থেকে শিক্ষার্থীর তথ্য পুনরুদ্ধার করবেন?')) return;
  students=JSON.parse(JSON.stringify(snap.students));
  saveToStorage(); renderStudentTable(); refreshReportSelector(); refreshFeedbackSelector();
  showToast('পুনরুদ্ধার সম্পন্ন!','success');
}
function duplicateSnapshot(id){
  const snap=assessmentHistory.find(h=>h.id===id);
  if(!snap) return;
  const dup={...JSON.parse(JSON.stringify(snap)),id:'snap_'+Date.now(),title:snap.title+' (কপি)',savedAt:new Date().toISOString()};
  assessmentHistory.unshift(dup);
  saveToStorage(); renderHistory();
  showToast('ডুপ্লিকেট তৈরি হয়েছে!','success');
}
function archiveSnapshot(id){
  const snap=assessmentHistory.find(h=>h.id===id);
  if(snap){snap.status=snap.status==='active'?'archived':'active';}
  saveToStorage(); renderHistory();
  showToast(snap?.status==='archived'?'আর্কাইভ হয়েছে!':'সক্রিয় করা হয়েছে!','success');
}
function deleteSnapshot(id){
  if(!confirm('মুছে দেবেন?')) return;
  assessmentHistory=assessmentHistory.filter(h=>h.id!==id);
  saveToStorage(); renderHistory();
  showToast('মুছে দেওয়া হয়েছে।','error');
}

// ═══════════════════════════════════════════════════════
//  ১২. SETTINGS
// ═══════════════════════════════════════════════════════
function loadSettingsUI(){
  setVal('set-school',settings.school); setVal('set-class',settings.className);
  setVal('set-section',settings.section); setVal('set-year',settings.year);
  setVal('set-teacher',settings.teacherName); setVal('set-designation',settings.teacherDesignation);
  renderSubjectsList();
}
function renderSubjectsList(){
  const el=document.getElementById('subjects-list');
  if(!el) return;
  el.innerHTML=settings.subjects.map((s,i)=>`<span class="subject-tag">${s}<button onclick="removeSubject(${i})"><i class="fa-solid fa-xmark"></i></button></span>`).join('');
}
function addSubject(){
  const inp=document.getElementById('new-subject');
  const val=inp?.value.trim();
  if(!val) return;
  if(settings.subjects.includes(val)){showToast('ইতিমধ্যে আছে!','error');return;}
  settings.subjects.push(val); inp.value='';
  renderSubjectsList(); showToast(val+' যোগ হয়েছে!','success');
}
function removeSubject(idx){settings.subjects.splice(idx,1);renderSubjectsList();}
function saveSettings(){
  settings.school=getVal('set-school')||settings.school;
  settings.className=getVal('set-class')||settings.className;
  settings.section=getVal('set-section')||settings.section;
  settings.year=getVal('set-year')||settings.year;
  settings.teacherName=getVal('set-teacher')||settings.teacherName;
  settings.teacherDesignation=getVal('set-designation')||settings.teacherDesignation;
  saveToStorage(); showToast('সেটিংস সংরক্ষিত!','success');
}

// ═══════════════════════════════════════════════════════
//  ১৩. STORAGE
// ═══════════════════════════════════════════════════════
function saveToStorage(){
  try{
    localStorage.setItem('sashiba_eval_students',JSON.stringify(students));
    localStorage.setItem('sashiba_eval_settings',JSON.stringify(settings));
    localStorage.setItem('sashiba_eval_history',JSON.stringify(assessmentHistory));
    localStorage.setItem('sashiba_eval_rubrics',JSON.stringify(savedRubrics));
  }catch(e){}
}
function loadFromStorage(){
  try{
    const ss=localStorage.getItem('sashiba_eval_students');
    const set=localStorage.getItem('sashiba_eval_settings');
    const hist=localStorage.getItem('sashiba_eval_history');
    const rub=localStorage.getItem('sashiba_eval_rubrics');
    if(ss) students=JSON.parse(ss);
    if(set) settings={...settings,...JSON.parse(set)};
    if(hist) assessmentHistory=JSON.parse(hist);
    if(rub) savedRubrics=JSON.parse(rub);
  }catch(e){}
  if(students.length===0){
    students=sampleStudents.map((s,i)=>({id:'sid_sample_'+(i+1),...s,scores:{...s.scores},timeline:{...s.timeline}}));
    saveToStorage();
  }
}
function exportData(){
  const blob=new Blob([JSON.stringify({settings,students,assessmentHistory,savedRubrics,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=`মূল্যায়ন_${settings.className}_${settings.year}.json`; a.click();
  URL.revokeObjectURL(url);
  document.getElementById('export-dropdown').style.display='none';
  showToast('ডেটা এক্সপোর্ট সম্পন্ন!','success');
}

function exportTableAsCSV(){
  const rows = [['ক্রম','নাম','রোল', ...settings.subjects, 'মোট','গড়','%','গ্রেড','ক্যাটাগরি']];
  [...students].sort((a,b)=>a.roll-b.roll).forEach((s,i)=>{
    const {total,maxTotal,avg,pct}=calcTotals(s);
    const grade=getGrade(pct); const cat=getCategory(pct);
    rows.push([i+1, s.name, s.roll, ...settings.subjects.map(sub=>s.scores?.[sub]||0), total, avg, pct+'%', grade.grade, cat.label]);
  });
  const csv = rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=`রেজাল্ট_${settings.className}_${settings.year}.csv`; a.click();
  URL.revokeObjectURL(url);
  document.getElementById('export-dropdown').style.display='none';
  showToast('CSV ডাউনলোড হচ্ছে!','success');
}

function showExportMenu(e){
  e.stopPropagation();
  const dd=document.getElementById('export-dropdown');
  dd.style.display=dd.style.display==='none'?'block':'none';
}
document.addEventListener('click',()=>{
  const dd=document.getElementById('export-dropdown');
  if(dd) dd.style.display='none';
});

/* Word Export for Report Card */
function exportReportAsWord(){
  if(!selectedReportStudentId){ showToast('রিপোর্ট কার্ডের জন্য শিক্ষার্থী নির্বাচন করুন!','error'); return; }
  const s=students.find(x=>x.id===selectedReportStudentId);
  if(!s){ showToast('শিক্ষার্থী পাওয়া যায়নি','error'); return; }
  const {total,maxTotal,avg,pct}=calcTotals(s);
  const grade=getGrade(pct);
  const subjectRows=settings.subjects.map(sub=>{
    const score=s.scores?.[sub]||0;
    const sg=getGrade(score);
    return `<tr><td>${sub}</td><td style="text-align:center">100</td><td style="text-align:center">${score}</td><td style="text-align:center">${score}%</td><td style="text-align:center">${sg.grade}</td></tr>`;
  }).join('');
  const wordHTML=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8">
    <style>
      body{font-family:Arial,sans-serif;direction:ltr;margin:20mm;}
      h1{font-size:18pt;text-align:center;color:#4f46e5;margin-bottom:4px;}
      h2{font-size:13pt;text-align:center;color:#334155;margin:0 0 16px;}
      .info-table{width:100%;border-collapse:collapse;margin-bottom:16px;}
      .info-table td{padding:5px 8px;border:1px solid #e2e8f0;font-size:11pt;}
      .marks-table{width:100%;border-collapse:collapse;margin-bottom:16px;}
      .marks-table th{background:#4f46e5;color:white;padding:7px 10px;text-align:center;font-size:11pt;}
      .marks-table td{border:1px solid #e2e8f0;padding:7px 10px;font-size:11pt;}
      .summary{background:#f1f5f9;padding:12px;border-radius:6px;margin-bottom:12px;}
      .grade-big{font-size:24pt;font-weight:bold;color:#4f46e5;text-align:center;}
      .remarks{border:1px solid #e2e8f0;padding:10px;font-size:11pt;}
      .footer{margin-top:20px;font-size:10pt;color:#64748b;text-align:center;}
    </style>
    </head><body>
    <h1>সশিবা মূল্যায়ন সিস্টেম</h1>
    <h2>${settings.school}</h2>
    <table class="info-table">
      <tr><td><b>শিক্ষার্থীর নাম:</b> ${s.name}</td><td><b>রোল:</b> ${s.roll}</td></tr>
      <tr><td><b>শ্রেণি:</b> ${settings.className} (${settings.section})</td><td><b>শিক্ষাবর্ষ:</b> ${settings.year}</td></tr>
      <tr><td><b>অভিভাবক:</b> ${s.parentName||'প্রয়োজ্য নন'}</td><td><b>শিক্ষক:</b> ${settings.teacherName}</td></tr>
    </table>
    <table class="marks-table">
      <thead><tr><th>বিষয়</th><th>পূর্ণমান</th><th>প্রাপ্তমান</th><th>শতকরা</th><th>গ্রেড</th></tr></thead>
      <tbody>${subjectRows}</tbody>
      <tfoot><tr><td><b>মোট</b></td><td style="text-align:center">${maxTotal}</td><td style="text-align:center"><b>${total}</b></td><td style="text-align:center"><b>${pct}%</b></td><td style="text-align:center"><b>${grade.grade}</b></td></tr></tfoot>
    </table>
    <div class="summary">মোট: ${total}/${maxTotal} | গড়: ${avg}% | গ্রেড: ${grade.grade} | GPA: ${grade.gp}</div>
    <p class="remarks"><b>শিক্ষকের মন্তব্য:</b><br>${s.remarks||'বিশেষ মন্তব্য নেই'}</p>
    <p class="footer">সশিবা মূল্যায়ন আর্কিটেক্ট দ্বারা তৈরি | তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
    </body></html>
  `;
  const blob=new Blob(['\uFEFF',wordHTML],{type:'application/msword'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=`রিপোর্ট_${s.name}_${settings.year}.doc`; a.click();
  URL.revokeObjectURL(url);
  showToast('Word ফাইল ডাউনলোড হচ্ছে!','success');
}
function importData(event){
  const file=event.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const data=JSON.parse(e.target.result);
      if(data.students) students=data.students;
      if(data.settings) settings={...settings,...data.settings};
      if(data.assessmentHistory) assessmentHistory=data.assessmentHistory;
      if(data.savedRubrics) savedRubrics=data.savedRubrics;
      saveToStorage(); renderStudentTable(); loadSettingsUI(); refreshReportSelector(); refreshFeedbackSelector();
      showToast('ইম্পোর্ট সম্পন্ন!','success');
    }catch(err){showToast('ফাইলে ত্রুটি!','error');}
  };
  reader.readAsText(file);
  event.target.value='';
}
function clearAllData(){
  if(!confirm('সব ডেটা মুছবেন?')) return;
  students=[];
  assessmentHistory=[];
  savedRubrics=[];
  localStorage.removeItem('sashiba_eval_students');
  localStorage.removeItem('sashiba_eval_history');
  localStorage.removeItem('sashiba_eval_rubrics');
  saveToStorage();
  window.location.reload();
}

// ═══════════════════════════════════════════════════════
//  ১৪. UI CONTROLS
// ═══════════════════════════════════════════════════════
const sectionConfig={
  performance:{title:'শিক্ষার্থী পারফরম্যান্স',subtitle:'ব্যক্তিগত পারফরম্যান্স ও AI ফিডব্যাক'},
  students:{title:'একাডেমিক রেজাল্ট',subtitle:'শিক্ষার্থীবার্ষিক ফলাফল, মার্কশিট ও শ্রেণিবিন্যাস'},
  analytics:{title:'ক্লাস বিশ্লেষণ',subtitle:'পারফরম্যান্স ওভারভিউ ও পরিসংখ্যান'},
  rubric:{title:'Rubric নির্মাতা',subtitle:'AI দিয়ে মূল্যায়ন মানদণ্ড তৈরি করুন'},
  feedback:{title:'AI ফিডব্যাক জেনারেটর',subtitle:'ফলাফল দেখে AI লিখে দেবে'},
  report:{title:'রিপোর্ট কার্ড',subtitle:'প্রিন্ট, PDF, Word ও অভিভাবক শেয়ার'},
  history:{title:'মূল্যায়ন ইতিহাস',subtitle:'সংরক্ষিত মূল্যায়নের রেকর্ড'},
  settings:{title:'সেটিংস',subtitle:'সিস্টেম কনফিগারেশন'},
};
function showSection(name){
  document.querySelectorAll('.content-section').forEach(el=>el.classList.add('hidden'));
  document.getElementById('section-'+name)?.classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  document.getElementById('nav-'+name)?.classList.add('active');
  const cfg=sectionConfig[name];
  if(cfg){setEl('section-title',cfg.title);setEl('section-subtitle',cfg.subtitle);}
  if(name==='analytics') renderAnalytics();
  if(name==='report'){refreshReportSelector();}
  if(name==='settings') loadSettingsUI();
  if(name==='history') renderHistory();
  if(name==='performance') renderPerfStudentList();
  if(name==='feedback'){refreshFeedbackSelector();renderSavedRubrics();}
  if(name==='rubric'){renderSavedRubrics();refreshRubricStudentSelect();}
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('collapsed');}
function toggleDarkMode(){
  document.body.classList.toggle('dark-mode');
  const isDark=document.body.classList.contains('dark-mode');
  const btn=document.getElementById('dark-mode-btn');
  if(btn) btn.innerHTML=isDark?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
  try{localStorage.setItem('sashiba_eval_theme',isDark?'dark':'light');}catch(e){}
}
function goHome(){
  if(confirm('মূল পোর্টালে ফিরে যেতে চান?')) {
    try { if(window.parent && window.parent !== window && window.parent.showHome) { window.parent.showHome(); return; } } catch(e){}
    try { window.location.href = '../index.html'; } catch(e){ window.location.href = 'index.html'; }
  }
}

/* ─── PDF Download ─── */
function downloadAsPDF() {
  if(!selectedReportStudentId) { showToast('প্রথমে শিক্ষার্থী নির্বাচন করুন!','error'); return; }
  showToast('প্রিন্ট ডায়ালগে "Save as PDF" বেছে নিন', 'success');
  setTimeout(() => window.print(), 400);
}

// ── Utility ──
function setEl(id,val){const el=document.getElementById(id);if(el)el.textContent=val;}
function getVal(id){return document.getElementById(id)?.value?.trim()||'';}
function setVal(id,val){const el=document.getElementById(id);if(el)el.value=val;}
function showToast(msg,type=''){
  const t=document.getElementById('toast');
  if(!t) return;
  t.textContent=msg; t.className='toast show '+type;
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ═══════════════════════════════════════════════════════
//  ১৫. INIT
// ═══════════════════════════════════════════════════════
function initDashboard() {
  try {
    loadFromStorage();
    const th = localStorage.getItem('sashiba_eval_theme') || localStorage.getItem('sashiba_theme');
    if (th === 'dark') {
      document.body.classList.add('dark-mode');
      const btn = document.getElementById('dark-mode-btn');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  } catch (e) {}

  window.addEventListener('message', e => {
    if (e.data?.type === 'THEME_CHANGE') {
      if (e.data.theme === 'dark') document.body.classList.add('dark-mode');
      else document.body.classList.remove('dark-mode');
    }
  });

  renderStudentTable();
  refreshReportSelector();
  refreshFeedbackSelector();
  refreshRubricStudentSelect();
  renderSavedRubrics();
  showSection('students');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
