/* ==========================================================================
   স্মার্ট ক্লাস ম্যানেজার - পূর্ণাঙ্গ লজিক ও ইন্টারঅ্যাকশন স্ক্রিপ্ট
   ========================================================================== */

// 1. STATE INITIALIZATION
let classData = {
  settings: {
    school: "মাগুরিব হাই স্কুল অ্যান্ড কলেজ",
    teacherName: "মাগুরিব আলী",
    className: "অষ্টম (শাখা-ক)"
  },
  routines: [
    { id: 1, day: "রবিবার", subject: "গণিত", time: "০৯:০০ - ০৯:৪৫ AM", room: "১০২", topic: "অধ্যায় ৩: বীজগণিতীয় সূত্রাবলি", teacher: "মাগুরিব আলী" },
    { id: 2, day: "রবিবার", subject: "বাংলা", time: "০৯:৪৫ - ১০:৩০ AM", room: "১০২", topic: "কবিতা: নদীর পাড়ে", teacher: "রহিম স্যার" },
    { id: 3, day: "রবিবার", subject: "বিজ্ঞান", time: "১০:৪৫ - ১১:৩০ AM", room: "১০২", topic: "অধ্যায় ৫: আলোক বিজ্ঞান", teacher: "ফাতিমা ম্যাডাম" },
    { id: 4, day: "সোমবার", subject: "ইংরেজি", time: "০৯:০০ - ০৯:৪৫ AM", room: "১০২", topic: "Grammar: Tense & Voice", teacher: "রফিক স্যার" },
    { id: 5, day: "সোমবার", subject: "গণিত", time: "০৯:৪৫ - ১০:৩০ AM", room: "১০২", topic: "জ্যামিতি: বৃত্তের ক্ষেত্রফল", teacher: "মাগুরিব আলী" },
    { id: 6, day: "মঙ্গলবার", subject: "ডিজিটাল প্রযুক্তি", time: "১০:০০ - ১০:৪৫ AM", room: "কম্পিউটার ল্যাব", topic: "পাইথন প্রোগ্রামিং পরিচিতি", teacher: "মাগুরিব আলী" }
  ],
  syllabuses: [
    { id: 1, timeframe: "today", timeframeLabel: "প্রতিদিনের সিলেবাস", subject: "গণিত", chapter: "অনুশীলনী ৩.২ (১-১০)", target: "বীজগণিতীয় সূত্রের প্রয়োগ শিখবে", progress: 80 },
    { id: 2, timeframe: "1week", timeframeLabel: "আগামী ১ সপ্তাহ", subject: "বিজ্ঞান", chapter: "অধ্যায় ৪: পরিবেশ ও গতি", target: "সংক্ষিপ্ত কুইজ পরীক্ষা গ্রহণ", progress: 40 },
    { id: 3, timeframe: "15days", timeframeLabel: "আগামী ১৫ দিন", subject: "বাংলা", chapter: "গদ্য অংশ সম্পূর্ণ", target: "সৃজনশীল প্রশ্ন সংশোধন", progress: 60 },
    { id: 4, timeframe: "1month", timeframeLabel: "আগামী ১ মাস", subject: "ইংরেজি", chapter: "Writing & Grammar", target: "সাপ্তাহিক অ্যাসাইনমেন্ট জমা", progress: 30 },
    { id: 5, timeframe: "3months", timeframeLabel: "আগামী ৩ মাস", subject: "গণিত ও বিজ্ঞান", chapter: "প্রথম সাময়িক পরীক্ষার সিলেবাস", target: "রিভিশন ও মক টেস্ট", progress: 50 },
    { id: 6, timeframe: "6months", timeframeLabel: "আগামী ৬ মাস", subject: "সকল বিষয়", chapter: "অর্ধবার্ষিকী চূড়ান্ত প্রস্তুতি", target: "মডেল টেস্ট গ্রহণ", progress: 20 },
    { id: 7, timeframe: "9months", timeframeLabel: "আগামী ৯ মাস", subject: "সকল বিষয়", chapter: "বার্ষিকী পূর্ব প্রস্তুতি", target: "দুর্বল শিক্ষার্থীদের রিভিশন", progress: 15 },
    { id: 8, timeframe: "12months", timeframeLabel: "আগামী ১২ মাস (১ বছর)", subject: "সম্পূর্ণ কারিকুলাম", chapter: "বার্ষিকী ও চূড়ান্ত মূল্যায়ন", target: "১০০% সিলেবাস সমাপন", progress: 10 }
  ],
  students: [
    { roll: 1, name: "আব্দুল্লাহ আল মামুন", attendance: "Present", engagement: 5, attention: "চমৎকার", remark: "খুব মনোযোগী" },
    { roll: 2, name: "সামিয়া আক্তার", attendance: "Present", engagement: 4, attention: "ভালো", remark: "নিয়মিত সক্রিয়" },
    { roll: 3, name: "রাহাত হোসেন", attendance: "Absent", engagement: 2, attention: "গড়মানের", remark: "অভিভাবককে জানানো প্রয়োজন" },
    { roll: 4, name: "তানভীর আহমেদ", attendance: "Present", engagement: 5, attention: "চমৎকার", remark: "দ্রুত উত্তর দেয়" },
    { roll: 5, name: "নুসরাত জাহান", attendance: "Late", engagement: 3, attention: "সন্তোষজনক", remark: "আজ ১০ মিনিট দেরিতে এসেছে" }
  ],
  exams: [
    { id: 1, type: "ক্লাস টেস্ট", subject: "গণিত", date: "২০২৬-০৭-২৫", time: "১০:০০ AM", marks: 20, coverage: "বীজগণিত অধ্যায় ৩" },
    { id: 2, type: "সাপ্তাহিক টেস্ট", subject: "ইংরেজি", date: "২০২৬-০৭-২৮", time: "১১:০০ AM", marks: 30, coverage: "Tense & Transformation" },
    { id: 3, type: "মাসিক টেস্ট", subject: "বিজ্ঞান", date: "২০২৬-০৮-০৫", time: "০৯:৩০ AM", marks: 50, coverage: "অধ্যায় ১ থেকে ৪" },
    { id: 4, type: "ত্রৈমাসিক টেস্ট", subject: "সকল বিষয়", date: "২০২৬-০৯-১০", time: "০৯:০০ AM", marks: 100, coverage: "১ম ট্রাইমেস্টার সিলেবাস" },
    { id: 5, type: "অর্ধবার্ষিকী", subject: "সকল বিষয়", date: "২০২৬-১০-১৫", time: "০৯:০০ AM", marks: 100, coverage: "৫০% মূল কারিকুলাম" },
    { id: 6, type: "বার্ষিকী", subject: "সকল বিষয়", date: "২০২৬-১২-০১", time: "০৯:০০ AM", marks: 100, coverage: "১০০% বার্ষিক কারিকুলাম" }
  ],
  aiInsights: [
    { title: "গণিত ক্লাসে অগ্রগতি চমৎকার", desc: "বীজগণিতে ৮৫% শিক্ষার্থী সন্তোষজনক উত্তর দিয়েছে।", action: "আগামী ক্লাসে অধ্যায় ৩.৩ শুরু করা যেতে পারে।" },
    { title: "উপস্থিতি সতর্কতা", desc: "রোল ৩ (রাহাত হোসেন) টানা ২ দিন অনুপস্থিত।", action: "অভিভাবকের সাথে যোগাযোগের জন্য অ্যালার্ট তৈরি হয়েছে।" }
  ],
  history: [
    { date: "২০২৬-০৭-২১", subject: "গণিত (অধ্যায় ৩.১)", class: "অষ্টম (ক)", attendance: "৯৬%", remark: "বীজগণিতীয় সূত্রের সমাধান অনুশীিলিত হয়েছে।" },
    { date: "২০২৬-০৭-২০", subject: "ডিজিটাল প্রযুক্তি", class: "অষ্টম (ক)", attendance: "৯০%", remark: "ল্যাবে প্র্যাকটিক্যাল সম্পন্ন।" }
  ],
  alerts: [
    { id: 1, type: "urgent", title: "অনুপস্থিতি অ্যালার্ট", desc: "রোল ৩ (রাহাত হোসেন) অনুপস্থিত। অভিভাবককে কল করুন।", time: "আজ ০৯:১৫ AM" },
    { id: 2, type: "info", title: "পরীক্ষার তারিখ ঘোষণা", desc: "আগামী ২৫ জুলাই গণিত ক্লাস টেস্ট অনুষ্ঠিত হবে।", time: "গতকাল" },
    { id: 3, type: "warning", title: "সিলেবাস ট্র্যাকিং", desc: "বিজ্ঞান অধ্যায় ৪ এর কুইজ কভার করা বাকী।", time: "২০২৬-০৭-১৯" }
  ]
};

// LOAD AND SAVE STORAGE
function loadStorage() {
  try {
    const data = localStorage.getItem("sashiba_classmanager_data");
    if (data) {
      classData = JSON.parse(data);
    }
  } catch (e) {}
}

function saveStorage() {
  try {
    localStorage.setItem("sashiba_classmanager_data", JSON.stringify(classData));
  } catch (e) {}
}

// SECTION SWITCHING
function showSection(name) {
  document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));
  document.getElementById('section-' + name)?.classList.remove('hidden');
  
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('nav-' + name)?.classList.add('active');

  const titles = {
    overview: ["স্মার্ট ক্লাস ম্যানেজার", "শিক্ষকের শ্রেণিকক্ষ পরিচালনার সম্পূর্ণ ডিজিটাল ড্যাশবোর্ড"],
    routine: ["🎓 সাপ্তাহিক ক্লাস রুটিন", "শ্রেণি ও বিষয়ভিত্তিক সময়সূচী পর্যবেক্ষণ"],
    syllabus: ["📚 সময়ভিত্তিক সিলেবাস পরিকল্পনা", "১ দিন থেকে ১২ মাসের কভারেজ ও অগ্রগতি"],
    attendance: ["👥 উপস্থিতি ও ক্লাস পার্টিসিপেশন", "দৈনিক উপস্থিতি গ্রহণ ও এনগেজমেন্ট ট্র্যাকিং"],
    exams: ["🎯 পরীক্ষার সময়সূচী ও রুটিন", "ক্লাস টেস্ট থেকে বার্ষিকী পরীক্ষার তথ্য"],
    live_control: ["🚀 লাইভ ক্লাস কন্ট্রোল সেন্টার", "টাইমার, র্যান্ডমাইজার ও কুইজ পরিচালনা"],
    ai_insights: ["🧠 AI ইনসাইটস ও সুপারিশ", "শ্রেণিকক্ষের পারফরম্যান্সের বিশ্লেষণ"],
    history: ["🕒 ক্লাস ইতিহাস ও রেকর্ড", "পূর্ববর্তী সেশনের ডাটা পর্যালোচনা"],
    alerts: ["🚨 সতর্কতা ও জরুরি করণীয়", "শিক্ষার্থী ও ক্লাসের গুরুত্বপূর্ণ অ্যালার্ট"],
    settings: ["⚙️ কনফিগারেশন সেটিংস", "বিদ্যালয় ও শিক্ষকের তথ্য সেটিংস"]
  };

  if (titles[name]) {
    document.getElementById('section-title').textContent = titles[name][0];
    document.getElementById('section-subtitle').textContent = titles[name][1];
  }

  // Render specific views
  if (name === 'overview') renderOverview();
  if (name === 'routine') renderRoutine('রবিবার');
  if (name === 'syllabus') renderSyllabus('today');
  if (name === 'attendance') renderAttendance();
  if (name === 'exams') renderExams('all');
  if (name === 'ai_insights') renderAIInsights();
  if (name === 'history') renderHistory();
  if (name === 'alerts') renderAlerts();
}

// NAVIGATION HOME
function goHome() {
  if (window.parent && window.parent !== window && window.parent.showHome) {
    window.parent.showHome();
  } else {
    window.location.href = "../index.html";
  }
}

// TOGGLE SIDEBAR & DARK MODE
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('dark-mode-btn').innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// 2. RENDER FUNCTIONS
function renderOverview() {
  const activeWidget = document.getElementById('active-class-widget');
  const current = classData.routines[0] || {};
  activeWidget.innerHTML = `
    <div style="background:var(--primary-light); padding:16px; border-radius:12px; border-left:4px solid var(--primary);">
      <span style="font-size:12px; color:var(--primary); font-weight:700;">চলমান পিরিয়ড (${current.time || '১০:০০ AM'})</span>
      <h4 style="font-size:18px; font-weight:800; margin:4px 0;">${current.subject || 'গণিত'} - ${current.topic || 'অধ্যায় ৩'}</h4>
      <p style="font-size:12px; color:var(--text-muted);">কক্ষ: ${current.room || '১০২'} | শিক্ষক: ${current.teacher || 'মাগুরিব আলী'}</p>
    </div>
  `;
}

function filterRoutineDay(day) {
  document.querySelectorAll('#routine-day-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === day);
  });
  renderRoutine(day);
}

function renderRoutine(day) {
  const tbody = document.getElementById('routine-table-body');
  const items = classData.routines.filter(r => r.day === day);
  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted);">এই দিনে কোনো পিরিয়ড নির্ধারিত নেই।</td></tr>`;
    return;
  }
  tbody.innerHTML = items.map(r => `
    <tr>
      <td><strong>${r.time}</strong></td>
      <td><span class="badge" style="background:var(--primary-light); color:var(--primary);">${r.subject}</span></td>
      <td>${classData.settings.className}</td>
      <td>${r.room}</td>
      <td>${r.topic}</td>
      <td>${r.teacher}</td>
      <td>
        <button onclick="deleteRoutine(${r.id})" style="color:var(--danger); border:none; background:none; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterSyllabusTimeframe(tf) {
  document.querySelectorAll('#syllabus-timeframe-chips .chip').forEach(chip => {
    chip.classList.toggle('active', chip.getAttribute('onclick').includes(tf));
  });
  renderSyllabus(tf);
}

function renderSyllabus(tf) {
  const container = document.getElementById('syllabus-cards-container');
  const items = classData.syllabuses.filter(s => s.timeframe === tf);
  if (items.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);">এই সময়সীমার জন্য কোনো সিলেবাস আইটেম যোগ করা হয়নি।</p>`;
    return;
  }
  container.innerHTML = items.map(s => `
    <div class="syllabus-item-card">
      <span class="badge" style="background:var(--purple-light); color:var(--purple);">${s.timeframeLabel}</span>
      <h4 style="margin-top:8px;">${s.subject}: ${s.chapter}</h4>
      <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">লক্ষ্য: ${s.target}</p>
      <div style="margin-top:12px;">
        <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700;">
          <span>অগ্রগতি</span>
          <span>${s.progress}%</span>
        </div>
        <div style="width:100%; height:6px; background:var(--border-color); border-radius:3px; margin-top:4px; overflow:hidden;">
          <div style="width:${s.progress}%; height:100%; background:var(--success);"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderAttendance() {
  const tbody = document.getElementById('attendance-table-body');
  document.getElementById('attendance-date-picker').valueAsDate = new Date();
  tbody.innerHTML = classData.students.map(s => `
    <tr>
      <td><strong>${s.roll}</strong></td>
      <td>${s.name}</td>
      <td>
        <span class="badge ${s.attendance === 'Present' ? 'badge-live' : 'warn-badge'}" style="${s.attendance === 'Present' ? 'background:var(--success-light); color:var(--success);' : ''}">
          ${s.attendance === 'Present' ? 'উপস্থিত' : s.attendance === 'Absent' ? 'অনুপস্থিত' : 'দেরিতে'}
        </span>
      </td>
      <td>⭐ ${s.engagement} / 5</td>
      <td>${s.attention}</td>
      <td>${s.remark}</td>
    </tr>
  `).join('');
}

function filterExamType(type) {
  document.querySelectorAll('#exam-type-tabs .tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(type));
  });
  renderExams(type);
}

function renderExams(type) {
  const container = document.getElementById('exams-cards-container');
  const items = type === 'all' ? classData.exams : classData.exams.filter(e => e.type === type);
  container.innerHTML = items.map(e => `
    <div class="exam-card">
      <span class="badge" style="background:var(--warning-light); color:var(--warning);">${e.type}</span>
      <h4 style="margin-top:8px;">${e.subject}</h4>
      <p style="font-size:12px; color:var(--text-muted); margin-top:4px;"><i class="fa-solid fa-calendar"></i> তারিখ: ${e.date} (${e.time})</p>
      <p style="font-size:12px; color:var(--text-muted);"><i class="fa-solid fa-file-lines"></i> কভারেজ: ${e.coverage}</p>
      <div style="margin-top:10px; font-weight:800; color:var(--primary); font-size:13px;">পূর্ণমান: ${e.marks}</div>
    </div>
  `).join('');
}

function renderAIInsights() {
  const container = document.getElementById('ai-insights-container');
  container.innerHTML = classData.aiInsights.map(ai => `
    <div class="card" style="border-left:4px solid var(--purple);">
      <h4 style="color:var(--purple);"><i class="fa-solid fa-brain"></i> ${ai.title}</h4>
      <p style="font-size:13px; margin-top:4px;">${ai.desc}</p>
      <div style="margin-top:8px; padding:8px; background:var(--purple-light); border-radius:6px; font-size:12px; font-weight:700; color:var(--purple);">
        💡 করণীয়: ${ai.action}
      </div>
    </div>
  `).join('');
}

function renderHistory() {
  const tbody = document.getElementById('history-table-body');
  tbody.innerHTML = classData.history.map(h => `
    <tr>
      <td>${h.date}</td>
      <td><strong>${h.subject}</strong></td>
      <td>${h.class}</td>
      <td>${h.attendance}</td>
      <td>${h.remark}</td>
    </tr>
  `).join('');
}

function renderAlerts() {
  const container = document.getElementById('alerts-container');
  container.innerHTML = classData.alerts.map(a => `
    <div class="card" style="border-left:4px solid ${a.type === 'urgent' ? 'var(--danger)' : 'var(--warning)'}; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between;">
        <h4 style="color:${a.type === 'urgent' ? 'var(--danger)' : 'var(--warning)'};">${a.title}</h4>
        <span style="font-size:11px; color:var(--text-muted);">${a.time}</span>
      </div>
      <p style="font-size:13px; margin-top:4px;">${a.desc}</p>
    </div>
  `).join('');
}

// LIVE TIMER LOGIC
let timerInterval = null;
let timerSeconds = 2400; // 40 mins

function updateTimerDisplay() {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  document.getElementById('live-timer-digits').textContent = 
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startLiveTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
}

function pauseLiveTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetLiveTimer() {
  pauseLiveTimer();
  timerSeconds = 2400;
  updateTimerDisplay();
}

// RANDOMIZER
function pickRandomStudent() {
  const students = classData.students;
  const picked = students[Math.floor(Math.random() * students.length)];
  document.getElementById('random-student-name').textContent = `🎯 রোল ${picked.roll}: ${picked.name}`;
}

// MODAL CONTROLS
function openAddRoutineModal() {
  document.getElementById('routine-modal').classList.remove('hidden');
}

function closeRoutineModal() {
  document.getElementById('routine-modal').classList.add('hidden');
}

function saveRoutineModal(e) {
  e.preventDefault();
  const day = document.getElementById('m-day').value;
  const subject = document.getElementById('m-subject').value;
  const time = document.getElementById('m-time').value;
  const room = document.getElementById('m-room').value;
  const topic = document.getElementById('m-topic').value;

  classData.routines.push({
    id: Date.now(),
    day,
    subject,
    time,
    room,
    topic,
    teacher: classData.settings.teacherName
  });

  saveStorage();
  closeRoutineModal();
  renderRoutine(day);
}

function deleteRoutine(id) {
  classData.routines = classData.routines.filter(r => r.id !== id);
  saveStorage();
  renderRoutine('রবিবার');
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  showSection('overview');
});
