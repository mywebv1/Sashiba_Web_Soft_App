/**
 * সশিবা মূল্যায়ন আর্কিটেক্ট — script.js
 * শিক্ষার্থী মূল্যায়ন, রিপোর্ট কার্ড ও ক্লাস বিশ্লেষণ সিস্টেম
 */

// ═══════════════════════════════════════════════════════
//  ১. STATE / DATA MODEL
// ═══════════════════════════════════════════════════════
let settings = {
  school: 'মাগুরিব স্কুল এন্ড কলেজ',
  className: 'পঞ্চম',
  section: 'ক',
  year: '২০২৫',
  subjects: ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'সমাজ'],
  teacherName: 'মাগুরিব আলী',
  teacherDesignation: 'প্রধান শিক্ষক'
};

let students = [];
let currentFilter = 'all';
let sortField = null;
let sortAsc = true;
let selectedReportStudentId = null;

// ═══════════════════════════════════════════════════════
//  ২. SAMPLE DATA
// ═══════════════════════════════════════════════════════
const sampleStudents = [
  { name: 'রাহেলা বেগম', roll: 1, scores: { বাংলা: 85, ইংরেজি: 78, গণিত: 90, বিজ্ঞান: 82, সমাজ: 88 }, remarks: 'অত্যন্ত মেধাবী ও পরিশ্রমী। আরও ভালো করার সক্ষমতা আছে।', parentName: 'করিম বেগম', phone: '' },
  { name: 'মো: আবির হোসেন', roll: 2, scores: { বাংলা: 62, ইংরেজি: 55, গণিত: 70, বিজ্ঞান: 60, সমাজ: 65 }, remarks: 'মনোযোগী, নিয়মিত অনুশীলন প্রয়োজন।', parentName: 'আবুল হোসেন', phone: '' },
  { name: 'সুমাইয়া আক্তার', roll: 3, scores: { বাংলা: 45, ইংরেজি: 38, গণিত: 42, বিজ্ঞান: 50, সমাজ: 48 }, remarks: 'আরও চেষ্টা ও অভিভাবকের সহায়তা প্রয়োজন।', parentName: 'রহিমা আক্তার', phone: '' },
  { name: 'তানভীর আহমেদ', roll: 4, scores: { বাংলা: 92, ইংরেজি: 88, গণিত: 95, বিজ্ঞান: 91, সমাজ: 89 }, remarks: 'ক্লাসে প্রথম। অসাধারণ মেধাবী।', parentName: 'রফিক আহমেদ', phone: '' },
  { name: 'নাফিসা জাহান', roll: 5, scores: { বাংলা: 70, ইংরেজি: 65, গণিত: 68, বিজ্ঞান: 72, সমাজ: 75 }, remarks: 'ভালো করছে, আরও উন্নতি সম্ভব।', parentName: 'জহির উদ্দিন', phone: '' },
  { name: 'আরিফ বিল্লাহ', roll: 6, scores: { বাংলা: 30, ইংরেজি: 28, গণিত: 35, বিজ্ঞান: 40, সমাজ: 32 }, remarks: 'অতিরিক্ত মনোযোগ ও বিশেষ কোচিং প্রয়োজন।', parentName: 'বিল্লাল হোসেন', phone: '' },
  { name: 'সাদিয়া ইসলাম', roll: 7, scores: { বাংলা: 78, ইংরেজি: 82, গণিত: 75, বিজ্ঞান: 80, সমাজ: 77 }, remarks: 'চমৎকার অগ্রগতি দেখাচ্ছে।', parentName: 'নজরুল ইসলাম', phone: '' },
];

// ═══════════════════════════════════════════════════════
//  ৩. GRADE / CATEGORY CALCULATION
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
  const scores = student.scores || {};
  let total = 0, count = 0;
  subjs.forEach(s => { const v = parseFloat(scores[s]) || 0; total += v; count++; });
  const maxTotal = count * 100;
  const avg = count ? (total / count) : 0;
  const pct = maxTotal ? Math.round((total / maxTotal) * 100) : 0;
  return { total, maxTotal, avg: avg.toFixed(1), pct };
}

function getPosition(sid) {
  const sorted = [...students].sort((a, b) => calcTotals(b).pct - calcTotals(a).pct);
  return sorted.findIndex(s => s.id === sid) + 1;
}

// ═══════════════════════════════════════════════════════
//  ৪. RENDER: STUDENT TABLE
// ═══════════════════════════════════════════════════════
function renderStudentTable() {
  const query = (document.getElementById('student-search')?.value || '').toLowerCase();
  let list = [...students];

  // Filter by category
  if (currentFilter !== 'all') {
    list = list.filter(s => getCategory(calcTotals(s).pct).label === { good: 'ভালো', average: 'মধ্যম', weak: 'দুর্বল' }[currentFilter]);
  }

  // Search filter
  if (query) list = list.filter(s => s.name.toLowerCase().includes(query) || String(s.roll).includes(query));

  // Sort
  if (sortField) {
    list.sort((a, b) => {
      let va, vb;
      if (sortField === 'roll') { va = a.roll; vb = b.roll; }
      else if (sortField === 'name') { va = a.name; vb = b.name; }
      else if (sortField === 'total') { va = calcTotals(a).pct; vb = calcTotals(b).pct; }
      else { va = a.scores[sortField] || 0; vb = b.scores[sortField] || 0; }
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  const thead = document.getElementById('table-header');
  const tbody = document.getElementById('table-body');
  const empty = document.getElementById('table-empty');
  if (!thead || !tbody) return;

  const subjs = settings.subjects;

  // Build header
  let hCols = `
    <th class="sortable" onclick="sortBy('roll')">#রোল ${sortField==='roll'?(sortAsc?'↑':'↓'):''}</th>
    <th class="sortable" onclick="sortBy('name')">নাম ${sortField==='name'?(sortAsc?'↑':'↓'):''}</th>
  `;
  subjs.forEach(s => {
    hCols += `<th class="sortable" onclick="sortBy('${s}')">${s}</th>`;
  });
  hCols += `
    <th class="sortable" onclick="sortBy('total')">মোট ${sortField==='total'?(sortAsc?'↑':'↓'):''}</th>
    <th>গড়%</th><th>গ্রেড</th><th>অবস্থান</th><th>শ্রেণি</th><th>অ্যাকশন</th>
  `;
  thead.innerHTML = `<tr>${hCols}</tr>`;

  if (list.length === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  tbody.innerHTML = list.map((s, idx) => {
    const { total, maxTotal, avg, pct } = calcTotals(s);
    const grade = getGrade(pct);
    const cat = getCategory(pct);
    let scoreCols = subjs.map(sub => `<td>${s.scores[sub] ?? '—'}</td>`).join('');
    return `
      <tr>
        <td><strong>${s.roll}</strong></td>
        <td><span style="font-weight:700;">${s.name}</span></td>
        ${scoreCols}
        <td><strong>${total}/${maxTotal}</strong></td>
        <td>${avg}%</td>
        <td><span class="grade-badge ${grade.cls}">${grade.grade}</span></td>
        <td style="font-weight:700; color:var(--primary);">${getPosition(s.id)}র্থ</td>
        <td><span class="cat-badge ${cat.cls}"><i class="fa-solid ${cat.icon}"></i> ${cat.label}</span></td>
        <td>
          <button class="action-btn" onclick="openEditModal('${s.id}')" title="সম্পাদনা"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn report" onclick="openReportCardFor('${s.id}')" title="রিপোর্ট কার্ড"><i class="fa-solid fa-id-card"></i></button>
          <button class="action-btn danger" onclick="deleteStudent('${s.id}')" title="মুছুন"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');

  updateStats();
}

function sortBy(field) {
  if (sortField === field) sortAsc = !sortAsc;
  else { sortField = field; sortAsc = true; }
  renderStudentTable();
}

function setFilter(cat) {
  currentFilter = cat;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip-active'));
  document.getElementById('chip-' + cat)?.classList.add('chip-active');
  renderStudentTable();
}

// ═══════════════════════════════════════════════════════
//  ৫. STATS CARDS
// ═══════════════════════════════════════════════════════
function updateStats() {
  const total = students.length;
  let good = 0, avg = 0, weak = 0, sumPct = 0;
  students.forEach(s => {
    const { pct } = calcTotals(s);
    sumPct += pct;
    if (pct >= 80) good++;
    else if (pct >= 50) avg++;
    else weak++;
  });
  const classAvg = total ? Math.round(sumPct / total) : 0;

  setEl('stat-total', total);
  setEl('stat-good', good);
  setEl('stat-avg', avg);
  setEl('stat-weak', weak);
  setEl('stat-classavg', classAvg + '%');
}

// ═══════════════════════════════════════════════════════
//  ৬. ADD / EDIT STUDENT MODAL
// ═══════════════════════════════════════════════════════
function openAddStudentModal() {
  document.getElementById('modal-title').innerHTML = '<i class="fa-solid fa-user-plus"></i> নতুন শিক্ষার্থী যোগ করুন';
  document.getElementById('modal-student-id').value = '';
  document.getElementById('m-name').value = '';
  document.getElementById('m-roll').value = '';
  document.getElementById('m-parent').value = '';
  document.getElementById('m-phone').value = '';
  document.getElementById('m-remarks').value = '';
  buildScoreInputs({});
  document.getElementById('student-modal').classList.remove('hidden');
}

function openEditModal(id) {
  const s = students.find(x => x.id === id);
  if (!s) return;
  document.getElementById('modal-title').innerHTML = '<i class="fa-solid fa-pen"></i> শিক্ষার্থী সম্পাদনা করুন';
  document.getElementById('modal-student-id').value = id;
  document.getElementById('m-name').value = s.name;
  document.getElementById('m-roll').value = s.roll;
  document.getElementById('m-parent').value = s.parentName || '';
  document.getElementById('m-phone').value = s.phone || '';
  document.getElementById('m-remarks').value = s.remarks || '';
  buildScoreInputs(s.scores || {});
  document.getElementById('student-modal').classList.remove('hidden');
}

function buildScoreInputs(scores) {
  const container = document.getElementById('scores-inputs');
  container.innerHTML = settings.subjects.map(sub => `
    <div class="score-input-group">
      <label>${sub}</label>
      <input type="number" id="score-${sub}" min="0" max="100" value="${scores[sub] ?? ''}" placeholder="০–১০০" />
    </div>
  `).join('');
}

function saveStudentFromModal() {
  const name = document.getElementById('m-name').value.trim();
  const roll = parseInt(document.getElementById('m-roll').value);
  if (!name) { showToast('শিক্ষার্থীর নাম দিন!', 'error'); return; }
  if (!roll) { showToast('রোল নম্বর দিন!', 'error'); return; }

  const scores = {};
  settings.subjects.forEach(sub => {
    const v = parseFloat(document.getElementById('score-' + sub)?.value);
    scores[sub] = isNaN(v) ? 0 : Math.min(100, Math.max(0, v));
  });

  const id = document.getElementById('modal-student-id').value;
  const studentData = {
    name,
    roll,
    scores,
    parentName: document.getElementById('m-parent').value.trim(),
    phone: document.getElementById('m-phone').value.trim(),
    remarks: document.getElementById('m-remarks').value.trim(),
  };

  if (id) {
    const idx = students.findIndex(s => s.id === id);
    if (idx !== -1) { students[idx] = { ...students[idx], ...studentData }; }
    showToast('শিক্ষার্থীর তথ্য আপডেট হয়েছে!', 'success');
  } else {
    students.push({ id: 'sid_' + Date.now(), ...studentData });
    showToast('নতুন শিক্ষার্থী যোগ হয়েছে!', 'success');
  }

  closeStudentModal();
  saveToStorage();
  renderStudentTable();
  refreshReportSelector();
}

function deleteStudent(id) {
  if (!confirm('এই শিক্ষার্থীকে মুছে দেবেন?')) return;
  students = students.filter(s => s.id !== id);
  saveToStorage();
  renderStudentTable();
  refreshReportSelector();
  showToast('শিক্ষার্থী মুছে দেওয়া হয়েছে।', 'error');
}

function closeStudentModal() { document.getElementById('student-modal').classList.add('hidden'); }
function closeModalOnBackdrop(e) { if (e.target === document.getElementById('student-modal')) closeStudentModal(); }

// ═══════════════════════════════════════════════════════
//  ৭. ANALYTICS
// ═══════════════════════════════════════════════════════
function renderAnalytics() {
  const total = students.length;
  setEl('analytics-total-badge', total + ' জন');

  let good = 0, avg = 0, weak = 0;
  const gradeCounts = { 'A+': 0, 'A': 0, 'A-': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  const subjectTotals = {};
  settings.subjects.forEach(s => { subjectTotals[s] = 0; });

  students.forEach(s => {
    const { pct } = calcTotals(s);
    const g = getGrade(pct).grade;
    if (pct >= 80) good++;
    else if (pct >= 50) avg++;
    else weak++;
    gradeCounts[g] = (gradeCounts[g] || 0) + 1;
    settings.subjects.forEach(sub => { subjectTotals[sub] += s.scores[sub] || 0; });
  });

  // Distribution Bars
  const maxDist = Math.max(good, avg, weak, 1);
  const distBars = document.getElementById('distribution-bars');
  if (distBars) {
    distBars.innerHTML = `
      <div class="dist-bar-group">
        <div class="dist-count" style="color:var(--success)">${good}</div>
        <div class="dist-bar-wrap"><div class="dist-bar dist-good" style="height:${Math.round((good/maxDist)*90)}%"></div></div>
        <div class="dist-label" style="color:var(--success)">ভালো</div>
      </div>
      <div class="dist-bar-group">
        <div class="dist-count" style="color:var(--warning)">${avg}</div>
        <div class="dist-bar-wrap"><div class="dist-bar dist-average" style="height:${Math.round((avg/maxDist)*90)}%"></div></div>
        <div class="dist-label" style="color:var(--warning)">মধ্যম</div>
      </div>
      <div class="dist-bar-group">
        <div class="dist-count" style="color:var(--danger)">${weak}</div>
        <div class="dist-bar-wrap"><div class="dist-bar dist-weak" style="height:${Math.round((weak/maxDist)*90)}%"></div></div>
        <div class="dist-label" style="color:var(--danger)">দুর্বল</div>
      </div>
    `;
  }

  // Grade Bars
  const gradeBarsEl = document.getElementById('grade-bars');
  const gradeColors = { 'A+': '#10b981', 'A': '#34d399', 'A-': '#60a5fa', 'B': '#818cf8', 'C': '#fbbf24', 'D': '#fb923c', 'F': '#f87171' };
  if (gradeBarsEl && total) {
    gradeBarsEl.innerHTML = Object.entries(gradeCounts).map(([g, cnt]) => `
      <div class="bar-row">
        <div class="bar-label-row">
          <span class="bar-subject-name"><span class="grade-badge grade-${g.toLowerCase().replace('+','plus').replace('-','minus')}">${g}</span></span>
          <span class="bar-pct" style="color:${gradeColors[g]}">${cnt} জন</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.round((cnt/total)*100)}%;background:${gradeColors[g]}"></div>
        </div>
      </div>
    `).join('');
  }

  // Subject Averages
  const subjBarsEl = document.getElementById('subject-bars');
  if (subjBarsEl && total) {
    subjBarsEl.innerHTML = settings.subjects.map(sub => {
      const avg = total ? Math.round(subjectTotals[sub] / total) : 0;
      const colors = ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f43f5e'];
      const c = colors[settings.subjects.indexOf(sub) % colors.length];
      return `
        <div class="bar-row">
          <div class="bar-label-row">
            <span class="bar-subject-name">${sub}</span>
            <span class="bar-pct" style="color:${c}">${avg}/১০০</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${avg}%;background:${c}"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Podium - Top 3
  const podiumEl = document.getElementById('podium');
  if (podiumEl) {
    const top3 = [...students].sort((a, b) => calcTotals(b).pct - calcTotals(a).pct).slice(0, 3);
    const medals = ['🥇', '🥈', '🥉'];
    const ranks = [2, 1, 3]; // podium order: 2nd, 1st, 3rd
    const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;
    const rankClasses = top3.length >= 3 ? ['rank-2', 'rank-1', 'rank-3'] : ['rank-1'];
    const rankNums = top3.length >= 3 ? [2, 1, 3] : [1];

    if (podiumOrder.length === 0) {
      podiumEl.innerHTML = '<div style="color:var(--text-muted);font-size:14px;">শিক্ষার্থী যোগ করুন।</div>';
    } else {
      podiumEl.innerHTML = podiumOrder.map((s, i) => {
        const { pct } = calcTotals(s);
        const initial = s.name.charAt(0);
        return `
          <div class="podium-place ${rankClasses[i]}">
            <div class="podium-medal">${medals[rankNums[i]-1]}</div>
            <div class="podium-avatar">${initial}</div>
            <div class="podium-name">${s.name}</div>
            <div class="podium-score">${pct}%</div>
            <div class="podium-stand">${rankNums[i]}ম স্থান</div>
          </div>
        `;
      }).join('');
    }
  }

  // Weak Students
  const weakList = document.getElementById('weak-students-list');
  const weakStudents = students.filter(s => calcTotals(s).pct < 50).sort((a,b) => calcTotals(a).pct - calcTotals(b).pct);
  setEl('weak-count-badge', weakStudents.length + ' জন');
  if (weakList) {
    if (weakStudents.length === 0) {
      weakList.innerHTML = '<div style="color:var(--success);font-size:14px;padding:10px 0;"><i class="fa-solid fa-circle-check"></i> সকল শিক্ষার্থীর ফলাফল সন্তোষজনক।</div>';
    } else {
      weakList.innerHTML = weakStudents.map(s => {
        const { pct } = calcTotals(s);
        const suggestions = getSuggestion(pct);
        return `
          <div class="weak-item">
            <div class="user-avatar" style="background:linear-gradient(135deg,#ef4444,#f87171);width:36px;height:36px;font-size:13px;">${s.name.charAt(0)}</div>
            <div>
              <div class="weak-item-name">${s.name} (রোল: ${s.roll})</div>
              <div class="weak-item-score">গড়: ${pct}% | গ্রেড: ${getGrade(pct).grade}</div>
            </div>
            <div class="weak-item-suggestion">${suggestions}</div>
            <button class="btn-outline btn-sm" onclick="openReportCardFor('${s.id}')">
              <i class="fa-solid fa-id-card"></i>
            </button>
          </div>
        `;
      }).join('');
    }
  }
}

function getSuggestion(pct) {
  if (pct < 33) return 'জরুরি বিশেষ মনোযোগ প্রয়োজন। অভিভাবক সঙ্গে আলোচনা করুন।';
  if (pct < 40) return 'প্রতিদিন অতিরিক্ত অনুশীলন দরকার। পড়ার অভ্যাস গড়ে তুলুন।';
  if (pct < 50) return 'দুর্বল বিষয়গুলোতে বিশেষ মনোযোগ দিতে হবে।';
  return 'নিয়মিত অনুশীলনে আরও উন্নতি সম্ভব।';
}

// ═══════════════════════════════════════════════════════
//  ৮. REPORT CARD
// ═══════════════════════════════════════════════════════
function refreshReportSelector() {
  const sel = document.getElementById('report-student-select');
  if (!sel) return;
  const prev = sel.value;
  sel.innerHTML = '<option value="">-- শিক্ষার্থী বেছে নিন --</option>';
  [...students].sort((a,b)=>a.roll-b.roll).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.roll}. ${s.name}`;
    sel.appendChild(opt);
  });
  if (prev) sel.value = prev;
}

function openReportCardFor(id) {
  showSection('report');
  refreshReportSelector();
  document.getElementById('report-student-select').value = id;
  renderReportCard(id);
}

function renderReportCard(id) {
  selectedReportStudentId = id;
  const preview = document.getElementById('report-preview');
  if (!id) {
    preview.innerHTML = `<div class="report-placeholder"><i class="fa-solid fa-id-card"></i><p>একজন শিক্ষার্থী নির্বাচন করুন রিপোর্ট কার্ড দেখতে।</p></div>`;
    return;
  }
  const s = students.find(x => x.id === id);
  if (!s) return;

  const { total, maxTotal, avg, pct } = calcTotals(s);
  const grade = getGrade(pct);
  const pos = getPosition(s.id);
  const subjs = settings.subjects;

  const progressBars = subjs.map(sub => {
    const sc = s.scores[sub] || 0;
    const g = getGrade(sc);
    return `
      <div class="prog-row">
        <div class="prog-label">${sub}</div>
        <div class="prog-track"><div class="prog-fill" style="width:${sc}%"></div></div>
        <div class="prog-val">${sc}</div>
      </div>
    `;
  }).join('');

  const marksRows = subjs.map(sub => {
    const sc = s.scores[sub] ?? 0;
    const g = getGrade(sc);
    return `
      <tr>
        <td>${sub}</td>
        <td style="text-align:center">১০০</td>
        <td style="text-align:center;font-weight:700;">${sc}</td>
        <td style="text-align:center">${sc}%</td>
        <td style="text-align:center"><span class="grade-badge ${g.cls}">${g.grade}</span></td>
        <td>${sc >= 80 ? 'চমৎকার' : sc >= 60 ? 'ভালো' : sc >= 40 ? 'গড়মানের' : 'উন্নতি দরকার'}</td>
      </tr>
    `;
  }).join('');

  preview.innerHTML = `
    <div class="report-card-container">
      <div class="report-card" id="printable-report">
        <div class="report-card-header">
          <div style="font-size:36px;margin-bottom:8px;">🏫</div>
          <div class="report-school-name">${settings.school}</div>
          <div class="report-school-sub">শ্রেণি: ${settings.className} | শাখা: ${settings.section} | শিক্ষাবর্ষ: ${settings.year}</div>
          <div class="report-card-title">একাডেমিক মূল্যায়ন রিপোর্ট কার্ড</div>
        </div>
        <div class="report-student-info">
          <div class="report-info-row"><span class="info-label">নাম</span><span class="info-value">${s.name}</span></div>
          <div class="report-info-row"><span class="info-label">রোল নম্বর</span><span class="info-value">${s.roll}</span></div>
          <div class="report-info-row"><span class="info-label">শ্রেণি</span><span class="info-value">${settings.className} (${settings.section})</span></div>
          <div class="report-info-row"><span class="info-label">শিক্ষাবর্ষ</span><span class="info-value">${settings.year}</span></div>
          <div class="report-info-row"><span class="info-label">অভিভাবক</span><span class="info-value">${s.parentName || '—'}</span></div>
          <div class="report-info-row"><span class="info-label">অবস্থান</span><span class="info-value" style="color:#4f46e5;font-weight:800;">${pos}ম</span></div>
        </div>
        <div class="report-marks-table">
          <table>
            <thead>
              <tr><th>বিষয়</th><th>পূর্ণমান</th><th>প্রাপ্তমান</th><th>শতকরা</th><th>গ্রেড</th><th>মন্তব্য</th></tr>
            </thead>
            <tbody>${marksRows}</tbody>
          </table>
        </div>
        <div class="report-summary">
          <div class="summary-cell">
            <div class="summary-value">${total}/${maxTotal}</div>
            <div class="summary-label">মোট নম্বর</div>
          </div>
          <div class="summary-cell">
            <div class="summary-value">${pct}%</div>
            <div class="summary-label">গড় শতকরা</div>
          </div>
          <div class="summary-cell">
            <div class="summary-value">${grade.grade}</div>
            <div class="summary-label">চূড়ান্ত গ্রেড</div>
          </div>
          <div class="summary-cell">
            <div class="summary-value">${grade.gp}</div>
            <div class="summary-label">গ্রেড পয়েন্ট</div>
          </div>
        </div>
        <div class="report-progress-bars">
          <h4>বিষয়ভিত্তিক পারফরম্যান্স</h4>
          ${progressBars}
        </div>
        <div class="report-remarks">
          <h4>শিক্ষকের মন্তব্য</h4>
          <p>${s.remarks || 'উত্তম পারফরম্যান্স। ভবিষ্যতে আরও ভালো করার প্রত্যাশা রাখি।'}</p>
        </div>
        <div class="report-footer">
          <div class="signature-block">
            <div class="signature-line"></div>
            <div class="signature-label">অভিভাবকের স্বাক্ষর</div>
          </div>
          <div style="text-align:center;font-size:12px;color:#64748b;">
            <div style="font-weight:600;">তারিখ: ${new Date().toLocaleDateString('bn-BD')}</div>
          </div>
          <div class="signature-block">
            <div class="signature-line"></div>
            <div class="signature-label">${settings.teacherName}<br>${settings.teacherDesignation}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function printReportCard() {
  if (!selectedReportStudentId) { showToast('আগে একজন শিক্ষার্থী নির্বাচন করুন!', 'error'); return; }
  window.print();
}

function saveReportCard() {
  if (!selectedReportStudentId) { showToast('আগে একজন শিক্ষার্থী নির্বাচন করুন!', 'error'); return; }
  saveToStorage();
  showToast('রিপোর্ট কার্ড সংরক্ষিত হয়েছে!', 'success');
}

function shareWhatsApp() {
  if (!selectedReportStudentId) { showToast('আগে একজন শিক্ষার্থী নির্বাচন করুন!', 'error'); return; }
  const s = students.find(x => x.id === selectedReportStudentId);
  if (!s) return;
  const { total, maxTotal, pct } = calcTotals(s);
  const grade = getGrade(pct);
  const cat = getCategory(pct);
  const lines = settings.subjects.map(sub => `  ${sub}: ${s.scores[sub] || 0}/১০০`).join('\n');
  const msg = encodeURIComponent(
    `প্রিয় অভিভাবক,\n\nআপনার সন্তান ${s.name} (রোল: ${s.roll}) এর মূল্যায়ন ফলাফল:\n\n${lines}\n\nমোট: ${total}/${maxTotal}\nগড়: ${pct}%\nগ্রেড: ${grade.grade} (GPA: ${grade.gp})\nঅবস্থান: ${cat.label}\n\nমন্তব্য: ${s.remarks || 'ভালো পারফরম্যান্স।'}\n\n— ${settings.teacherName}\n${settings.school}`
  );
  window.open(`https://wa.me/?text=${msg}`, '_blank');
}

// ═══════════════════════════════════════════════════════
//  ৯. SETTINGS
// ═══════════════════════════════════════════════════════
function loadSettingsUI() {
  setVal('set-school', settings.school);
  setVal('set-class', settings.className);
  setVal('set-section', settings.section);
  setVal('set-year', settings.year);
  setVal('set-teacher', settings.teacherName);
  setVal('set-designation', settings.teacherDesignation);
  renderSubjectsList();
}

function renderSubjectsList() {
  const el = document.getElementById('subjects-list');
  if (!el) return;
  el.innerHTML = settings.subjects.map((s, i) => `
    <span class="subject-tag">
      ${s}
      <button onclick="removeSubject(${i})"><i class="fa-solid fa-xmark"></i></button>
    </span>
  `).join('');
}

function addSubject() {
  const inp = document.getElementById('new-subject');
  const val = inp?.value.trim();
  if (!val) return;
  if (settings.subjects.includes(val)) { showToast('এই বিষয় ইতিমধ্যে আছে!', 'error'); return; }
  settings.subjects.push(val);
  inp.value = '';
  renderSubjectsList();
  showToast(val + ' যোগ হয়েছে!', 'success');
}

function removeSubject(idx) {
  settings.subjects.splice(idx, 1);
  renderSubjectsList();
}

function saveSettings() {
  settings.school = getVal('set-school') || settings.school;
  settings.className = getVal('set-class') || settings.className;
  settings.section = getVal('set-section') || settings.section;
  settings.year = getVal('set-year') || settings.year;
  settings.teacherName = getVal('set-teacher') || settings.teacherName;
  settings.teacherDesignation = getVal('set-designation') || settings.teacherDesignation;
  saveToStorage();
  showToast('সেটিংস সংরক্ষিত হয়েছে!', 'success');
}

// ═══════════════════════════════════════════════════════
//  ১০. DATA PERSISTENCE
// ═══════════════════════════════════════════════════════
function saveToStorage() {
  try {
    localStorage.setItem('sashiba_eval_students', JSON.stringify(students));
    localStorage.setItem('sashiba_eval_settings', JSON.stringify(settings));
  } catch(e) {}
}

function loadFromStorage() {
  try {
    const savedStudents = localStorage.getItem('sashiba_eval_students');
    const savedSettings = localStorage.getItem('sashiba_eval_settings');
    if (savedStudents) students = JSON.parse(savedStudents);
    if (savedSettings) settings = { ...settings, ...JSON.parse(savedSettings) };
  } catch(e) {}

  if (students.length === 0) {
    students = sampleStudents.map((s, i) => ({
      id: 'sid_sample_' + (i + 1),
      name: s.name,
      roll: s.roll,
      scores: { ...s.scores },
      remarks: s.remarks,
      parentName: s.parentName,
      phone: s.phone || ''
    }));
    saveToStorage();
  }
}

function exportData() {
  const data = { settings, students, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `মূল্যায়ন_${settings.className}_${settings.year}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('ডেটা এক্সপোর্ট সম্পন্ন!', 'success');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.students) students = data.students;
      if (data.settings) settings = { ...settings, ...data.settings };
      saveToStorage();
      renderStudentTable();
      loadSettingsUI();
      refreshReportSelector();
      showToast('ডেটা আমদানি সম্পন্ন!', 'success');
    } catch(err) {
      showToast('ডেটা ফাইলে ত্রুটি আছে!', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function clearAllData() {
  if (!confirm('সমস্ত শিক্ষার্থীর ডেটা মুছে দেবেন? এটি পুনরুদ্ধার করা যাবে না।')) return;
  students = [];
  saveToStorage();
  renderStudentTable();
  refreshReportSelector();
  showToast('সব ডেটা মুছে গেছে।', 'error');
}

// ═══════════════════════════════════════════════════════
//  ১১. UI CONTROLS
// ═══════════════════════════════════════════════════════
const sectionConfig = {
  students: { title: 'মূল্যায়ন আর্কিটেক্ট', subtitle: 'শিক্ষার্থী তালিকা ও নম্বর এন্ট্রি' },
  analytics: { title: 'ক্লাস বিশ্লেষণ', subtitle: 'পারফরম্যান্স ওভারভিউ ও পরিসংখ্যান' },
  report: { title: 'রিপোর্ট কার্ড', subtitle: 'শিক্ষার্থীর মূল্যায়ন রিপোর্ট ও অভিভাবক যোগাযোগ' },
  settings: { title: 'সেটিংস', subtitle: 'বিদ্যালয় ও সিস্টেম কনফিগারেশন' },
};

function showSection(name) {
  document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));
  document.getElementById('section-' + name)?.classList.remove('hidden');

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('nav-' + name)?.classList.add('active');

  const cfg = sectionConfig[name];
  if (cfg) {
    setEl('section-title', cfg.title);
    setEl('section-subtitle', cfg.subtitle);
  }

  if (name === 'analytics') renderAnalytics();
  if (name === 'report') { refreshReportSelector(); }
  if (name === 'settings') loadSettingsUI();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  const btn = document.getElementById('dark-mode-btn');
  if (btn) btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  try { localStorage.setItem('sashiba_eval_theme', isDark ? 'dark' : 'light'); } catch(e) {}
}

function goHome() {
  try { window.parent.showHome(); } catch(e) {
    try { window.top.showHome(); } catch(e2) {}
  }
}

// ═══════════════════════════════════════════════════════
//  ১২. UTILITY
// ═══════════════════════════════════════════════════════
function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function getVal(id) { return document.getElementById(id)?.value?.trim() || ''; }
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val; }

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => { t.classList.remove('show'); }, 3000);
}

// ═══════════════════════════════════════════════════════
//  ১৩. INIT
// ═══════════════════════════════════════════════════════
window.addEventListener('load', () => {
  loadFromStorage();

  // Apply saved theme
  try {
    const savedTheme = localStorage.getItem('sashiba_eval_theme') || localStorage.getItem('sashiba_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      const btn = document.getElementById('dark-mode-btn');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  } catch(e) {}

  // PostMessage theme sync from parent
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'THEME_CHANGE') {
      if (e.data.theme === 'dark') document.body.classList.add('dark-mode');
      else document.body.classList.remove('dark-mode');
    }
  });

  renderStudentTable();
  refreshReportSelector();
  showSection('students');
});
