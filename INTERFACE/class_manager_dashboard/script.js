/* ==========================================================================
   সশিবা স্মার্ট ক্লাস ম্যানেজার v2 — পূর্ণাঙ্গ লজিক ও ইন্টারঅ্যাকশন স্ক্রিপ্ট (Edit & Delete Enabled)
   ========================================================================== */

// 1. STATE INITIALIZATION & LOCALSTORAGE
let classData = {
  settings: {
    school: "মাগুরিব হাই স্কুল অ্যান্ড কলেজ",
    teacherName: "মাগুরিব আলী",
    className: "অষ্টম (শাখা-ক)"
  },
  routines: [
    { id: 1, day: "রবিবার", subject: "গণিত", time: "০৯:০০ - ০৯:৪৫ AM", room: "১০২", topic: "অধ্যায় ৩: বীজগণিতীয় সূত্রাবলি", teacher: "মাগুরিব আলী", activeNow: true },
    { id: 2, day: "রবিবার", subject: "বাংলা", time: "০৯:৪৫ - ১০:৩০ AM", room: "১০২", topic: "কবিতা: নদীর পাড়ে", teacher: "রহিম স্যার", activeNow: false },
    { id: 3, day: "রবিবার", subject: "বিজ্ঞান", time: "১০:৪৫ - ১১:৩০ AM", room: "১০২", topic: "অধ্যায় ৫: আলোক বিজ্ঞান", teacher: "ফাতিমা ম্যাডাম", activeNow: false },
    { id: 4, day: "সোমবার", subject: "ইংরেজি", time: "০৯:০০ - ০৯:৪৫ AM", room: "১০২", topic: "Grammar: Tense & Voice", teacher: "রফিক স্যার", activeNow: false },
    { id: 5, day: "সোমবার", subject: "গণিত", time: "০৯:৪৫ - ১০:৩০ AM", room: "১০২", topic: "জ্যামিতি: বৃত্তের ক্ষেত্রফল", teacher: "মাগুরিব আলী", activeNow: false },
    { id: 6, day: "মঙ্গলবার", subject: "ডিজিটাল প্রযুক্তি", time: "১০:০০ - ১০:৪৫ AM", room: "কম্পিউটার ল্যাব", topic: "পাইথন প্রোগ্রামিং পরিচিতি", teacher: "মাগুরিব আলী", activeNow: false }
  ],
  syllabuses: [
    { id: 1, timeframe: "today", timeframeLabel: "প্রতিদিনের সিলেবাস", subject: "গণিত", chapter: "অনুশীলনী ৩.২ (১-১০)", target: "বীজগণিতীয় সূত্রের প্রয়োগ শিখবে", progress: 80 },
    { id: 2, timeframe: "1week", timeframeLabel: "আগামী ১ সপ্তাহ", subject: "বিজ্ঞান", chapter: "অধ্যায় ৪: পরিবেশ ও গতি", target: "সংক্ষিপ্ত কুইজ পরীক্ষা গ্রহণ", progress: 40 },
    { id: 3, timeframe: "15days", timeframeLabel: "আগামী ১৫ দিন", subject: "বাংলা", chapter: "গদ্য অংশ সম্পূর্ণ", target: "সৃজনশীল প্রশ্ন সংশোধন", progress: 65 },
    { id: 4, timeframe: "1month", timeframeLabel: "আগামী ১ মাস", subject: "ইংরেজি", chapter: "Writing & Grammar", target: "সাপ্তাহিক অ্যাসাইনমেন্ট জমা", progress: 35 },
    { id: 5, timeframe: "3months", timeframeLabel: "আগামী ৩ মাস", subject: "গণিত ও বিজ্ঞান", chapter: "প্রথম সাময়িক পরীক্ষার সিলেবাস", target: "রিভিশন ও মক টেস্ট", progress: 50 },
    { id: 6, timeframe: "6months", timeframeLabel: "আগামী ৬ মাস", subject: "সকল বিষয়", chapter: "অর্ধবার্ষিকী চূড়ান্ত প্রস্তুতি", target: "মডেল টেস্ট গ্রহণ", progress: 25 },
    { id: 7, timeframe: "9months", timeframeLabel: "আগামী ৯ মাস", subject: "সকল বিষয়", chapter: "বার্ষিকী পূর্ব প্রস্তুতি", target: "দুর্বল শিক্ষার্থীদের রিভিশন", progress: 15 },
    { id: 8, timeframe: "12months", timeframeLabel: "আগামী ১২ মাস (১ বছর)", subject: "সম্পূর্ণ কারিকুলাম", chapter: "বার্ষিকী ও চূড়ান্ত মূল্যায়ন", target: "১০০% সিলেবাস সমাপন", progress: 10 }
  ],
  students: [
    { roll: 1, name: "আব্দুল্লাহ আল মামুন", className: "অষ্টম", section: "ক", group: "সাধারণ", attendance: "Present", engagement: 5, attention: "চমৎকার", remark: "খুব মনোযোগী" },
    { roll: 2, name: "সামিয়া আক্তার", className: "অষ্টম", section: "ক", group: "সাধারণ", attendance: "Present", engagement: 4, attention: "ভালো", remark: "নিয়মিত সক্রিয়" },
    { roll: 3, name: "রাহাত হোসেন", className: "অষ্টম", section: "ক", group: "সাধারণ", attendance: "Absent", engagement: 2, attention: "গড়মানের", remark: "অভিভাবককে কল করা প্রয়োজন" },
    { roll: 4, name: "তানভীর আহমেদ", className: "অষ্টম", section: "ক", group: "সাধারণ", attendance: "Present", engagement: 5, attention: "চমৎকার", remark: "দ্রুত উত্তর দেয়" },
    { roll: 5, name: "নুসরাত জাহান", className: "অষ্টম", section: "ক", group: "সাধারণ", attendance: "Late", engagement: 3, attention: "সন্তোষজনক", remark: "১০ মিনিট দেরিতে এসেছে" },
    { roll: 1, name: "সাকিব আল হাসান", className: "নবম", section: "ক", group: "বিজ্ঞান", attendance: "Present", engagement: 5, attention: "চমৎকার", remark: "ল্যাবে সক্রিয়" },
    { roll: 2, name: "মালিহা রহমান", className: "নবম", section: "ক", group: "বিজ্ঞান", attendance: "Present", engagement: 4, attention: "ভালো", remark: "নিয়মিত উপস্থিত" },
    { roll: 1, name: "মেহেদী হাসান", className: "দশম", section: "ক", group: "ব্যবসায় শিক্ষা", attendance: "Present", engagement: 4, attention: "ভালো", remark: "হিসাববিজ্ঞানে পারদর্শী" }
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
    { title: "বীজগণিত ক্লাসে অগ্রগতি চমৎকার", desc: "৮৫% শিক্ষার্থী বীজগণিতীয় সূত্রে চমৎকার ফলাফল করেছে।", action: "আগামী সেশনে অধ্যায় ৩.৩ শুরু করার উপযুক্ত সময়।" },
    { title: "উপস্থিতি অ্যালার্ট ও অনুসরণ", desc: "রোল ৩ (রাহাত হোসেন) টানা ২ দিন অনুপস্থিত রয়েছে।", action: "অভিভাবকের নিকট স্বয়ংক্রিয় SMS পাঠানো বা কল করা দরকার।" },
    { title: "ইংরেজি লেখার দক্ষতা বৃদ্ধি", desc: "সাপ্তাহিক অ্যাসাইনমেন্টের মান সন্তোষজনক।", action: "গ্রামার পার্ট দ্রুত শেষ করে প্যারাগ্রাফ রাইটিং কভার করুন।" }
  ],
  history: [
    { date: "২০২৬-০৭-২১", subject: "গণিত (অধ্যায় ৩.১)", class: "অষ্টম (ক)", attendance: "৯৬%", remark: "বীজগণিতীয় সূত্রের সমাধান অনুশীলিত হয়েছে।" },
    { date: "২০২৬-০৭-২০", subject: "ডিজিটাল প্রযুক্তি", class: "অষ্টম (ক)", attendance: "৯০%", remark: "কম্পিউটার ল্যাবে প্র্যাকটিক্যাল সেশন অনুষ্ঠিত।" }
  ],
  alerts: [
    { id: 1, type: "urgent", title: "অনুপস্থিতি অ্যালার্ট", desc: "রোল ৩ (রাহাত হোসেন) আজ ক্লাসে অনুপস্থিত।", time: "আজ ০৯:১৫ AM" },
    { id: 2, type: "info", title: "পরীক্ষার তারিখ ঘোষণা", desc: "আগামী ২৫ জুলাই গণিত ক্লাস টেস্ট (২০ নম্বর) অনুষ্ঠিত হবে।", time: "গতকাল" },
    { id: 3, type: "warning", title: "সিলেবাস ট্র্যাকিং", desc: "বিজ্ঞান অধ্যায় ৪ এর কুইজ দ্রুত কভার করা প্রয়োজন।", time: "২০২৬-০৭-১৯" }
  ]
};

// Editing ID Trackers
let editingRoutineId = null;
let editingSyllabusId = null;
let editingExamId = null;

function loadStorage() {
  try {
    const data = localStorage.getItem("sashiba_classmanager_data_v2");
    if (data) classData = JSON.parse(data);
  } catch (e) {}
}

function saveStorage() {
  try {
    localStorage.setItem("sashiba_classmanager_data_v2", JSON.stringify(classData));
  } catch (e) {}
}

// SECTION SWITCHING
function showSection(name) {
  document.querySelectorAll('.content-section').forEach(el => el.classList.add('hidden'));
  document.getElementById('section-' + name)?.classList.remove('hidden');
  
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById('nav-' + name)?.classList.add('active');

  const titles = {
    overview: ["স্মার্ট ক্লাস ম্যানেজার ড্যাশবোর্ড", "শিক্ষকের শ্রেণিকক্ষ পরিচালনার সম্পূর্ণ ডিজিটাল আর্কিটেক্ট"],
    routine: ["🎓 সাপ্তাহিক ক্লাস রুটিন ও লাইভ পিরিয়ড কার্ড", "শ্রেণি ও বিষয়ভিত্তিক সময়সূচী সম্পাদনা ও পরিচালনা"],
    syllabus: ["📚 সময়ভিত্তিক সিলেবাস পরিকল্পনা ও কভারেজ কার্ড", "১ দিন থেকে ১২ মাসের কভারেজ ও অগ্রগতি সম্পাদনা"],
    attendance: ["👥 উপস্থিতি ও ক্লাস এনগেজমেন্ট কার্ড", "দৈনিক উপস্থিতি গ্রহণ ও স্টুডেন্ট এনগেজমেন্ট মার্কিং"],
    exams: ["🎯 পরীক্ষার সময়সূচী ও রুটিন কার্ড", "ক্লাস টেস্ট থেকে বার্ষিকী পরীক্ষার তথ্য সম্পাদনা"],
    live_control: ["🚀 লাইভ ক্লাস কন্ট্রোল হাব", "টাইমার, র্যান্ডমাইজার ও রিয়েল-টাইম কুইজ পরিচালনা"],
    ai_insights: ["🧠 AI ইনসাইটস ও সুপারিশ", "শ্রেণিকক্ষের পারফরম্যান্সের ডাইনামিক বিশ্লেষণ"],
    history: ["🕒 ক্লাস ইতিহাস ও ডিজিটাল রেকর্ড", "পূর্ববর্তী সকল লাইভ সেশনের রেকর্ড পর্যালোচনা"],
    alerts: ["🚨 সতর্কতা ও জরুরি নোটিশ", "শিক্ষার্থী ও ক্লাসের গুরুত্বপূর্ণ অ্যালার্ট ব্যবস্থাপনা"],
    settings: ["⚙️ কনফিগারেশন সেটিংস", "বিদ্যালয়, শিক্ষক ও শ্রেণি সেটিংস"]
  };

  if (titles[name]) {
    document.getElementById('section-title').textContent = titles[name][0];
    document.getElementById('section-subtitle').textContent = titles[name][1];
  }

  if (name === 'overview') renderOverview();
  if (name === 'routine') renderRoutine('রবিবার');
  if (name === 'syllabus') renderSyllabus('today');
  if (name === 'attendance') renderAttendanceCards();
  if (name === 'exams') renderExams('all');
  if (name === 'ai_insights') renderAIInsights();
  if (name === 'history') renderHistory();
  if (name === 'alerts') renderAlerts();
}

function goHome() {
  if (window.parent && window.parent !== window && window.parent.showHome) {
    window.parent.showHome();
  } else {
    window.location.href = "../index.html";
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('dark-mode-btn').innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// RENDER OVERVIEW CARDS
function renderOverview() {
  const activeWidget = document.getElementById('active-class-widget');
  const current = classData.routines[0] || {};
  activeWidget.innerHTML = `
    <div style="background:var(--primary-light); background:linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.1)); padding:18px; border-radius:14px; border-left:5px solid var(--primary);">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; color:var(--primary); font-weight:800;"><i class="fa-solid fa-clock"></i> চলমান পিরিয়ড (${current.time || '১০:০০ AM'})</span>
        <span class="badge" style="background:var(--primary); color:white;">কক্ষ: ${current.room || '১০২'}</span>
      </div>
      <h4 style="font-size:19px; font-weight:900; margin:6px 0; color:var(--text-main);">${current.subject || 'গণিত'} - ${current.topic || 'অধ্যায় ৩'}</h4>
      <p style="font-size:12.5px; color:var(--text-muted);"><i class="fa-solid fa-user-tie"></i> শিক্ষক: ${current.teacher || 'মাগুরিব আলী'} | শ্রেণি: ${classData.settings.className}</p>
      <div style="margin-top:12px; display:flex; gap:8px;">
        <button class="btn-sm btn-primary" onclick="showSection('live_control')"><i class="fa-solid fa-play"></i> টাইমার শুরু</button>
        <button class="btn-sm btn-outline" onclick="showSection('attendance')"><i class="fa-solid fa-user-check"></i> উপস্থিতি নিন</button>
      </div>
    </div>
  `;

  // Render Today's Routine Cards
  const cardsContainer = document.getElementById('today-routine-cards');
  const todayItems = classData.routines.filter(r => r.day === "রবিবার");
  cardsContainer.innerHTML = todayItems.map(r => `
    <div class="period-card-item ${r.activeNow ? 'active-now' : ''}">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="pci-time"><i class="fa-solid fa-clock"></i> ${r.time}</span>
        <div style="display:flex; gap:6px;">
          <button onclick="editRoutine(${r.id})" style="color:var(--primary); background:none; font-size:13px; cursor:pointer;" title="সম্পাদনা করুন"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteRoutine(${r.id})" style="color:var(--danger); background:none; font-size:13px; cursor:pointer;" title="মুছে ফেলুন"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      <h4 class="pci-subject">${r.subject}</h4>
      <p class="pci-topic">${r.topic}</p>
      <div class="pci-footer">
        <span><i class="fa-solid fa-door-open"></i> কক্ষ ${r.room}</span>
        <span>${r.teacher}</span>
      </div>
    </div>
  `).join('');
}

// RENDER ROUTINE CARDS WITH EDIT & DELETE
function filterRoutineDay(day) {
  document.querySelectorAll('#routine-day-tabs .tab-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === day);
  });
  renderRoutine(day);
}

function renderRoutine(day) {
  const container = document.getElementById('routine-cards-container');
  const items = classData.routines.filter(r => r.day === day);
  if (items.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); grid-column: 1/-1;">এই দিনে কোনো পিরিয়ড কার্ড নির্ধারিত নেই।</p>`;
    return;
  }
  container.innerHTML = items.map(r => `
    <div class="period-card-item">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="pci-time"><i class="fa-solid fa-clock"></i> ${r.time}</span>
        <div style="display:flex; gap:8px;">
          <button onclick="editRoutine(${r.id})" style="color:var(--primary); background:none; font-size:14px; cursor:pointer;" title="সম্পাদনা করুন"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteRoutine(${r.id})" style="color:var(--danger); background:none; font-size:14px; cursor:pointer;" title="মুছে ফেলুন"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      <h4 class="pci-subject">${r.subject}</h4>
      <p class="pci-topic">${r.topic}</p>
      <div class="pci-footer mt-3">
        <span><i class="fa-solid fa-door-open"></i> কক্ষ ${r.room}</span>
        <span>${r.teacher}</span>
      </div>
    </div>
  `).join('');
}

// RENDER SYLLABUS CARDS WITH EDIT & DELETE
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
    container.innerHTML = `<p style="color:var(--text-muted); grid-column:1/-1;">এই সময়সীমার জন্য কোনো সিলেবাস কার্ড যোগ করা হয়নি।</p>`;
    return;
  }
  container.innerHTML = items.map(s => `
    <div class="syllabus-card-box">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="badge" style="background:rgba(139,92,246,0.15); color:var(--purple); font-weight:800;">${s.timeframeLabel}</span>
        <div style="display:flex; gap:8px;">
          <button onclick="editSyllabus(${s.id})" style="color:var(--primary); background:none; font-size:14px; cursor:pointer;" title="সম্পাদনা করুন"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteSyllabus(${s.id})" style="color:var(--danger); background:none; font-size:14px; cursor:pointer;" title="মুছে ফেলুন"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      <h4 style="font-size:16px; font-weight:800; margin-top:8px; color:var(--text-main);">${s.subject}: ${s.chapter}</h4>
      <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">🎯 লক্ষ্য: ${s.target}</p>
      
      <div style="margin-top:14px;">
        <div style="display:flex; justify-content:space-between; font-size:11.5px; font-weight:800; color:var(--text-main);">
          <span>সিলেবাস অগ্রগতি</span>
          <span>${s.progress}%</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-fill" style="width:${s.progress}%;"></div>
        </div>
      </div>
    </div>
  `).join('');
}

// RENDER ATTENDANCE CARDS WITH CLASS/SECTION/GROUP FILTERS
function filterAttendanceByClass() {
  renderAttendanceCards();
}

function renderAttendanceCards() {
  const container = document.getElementById('attendance-cards-container');
  const datePicker = document.getElementById('attendance-date-picker');
  if (datePicker && !datePicker.value) datePicker.valueAsDate = new Date();

  const selectedClass = document.getElementById('att-class-select')?.value || 'অষ্টম';
  const selectedSection = document.getElementById('att-section-select')?.value || 'ক';
  const selectedGroup = document.getElementById('att-group-select')?.value || 'সাধারণ';

  const filteredStudents = classData.students.filter(s => 
    (s.className === selectedClass || !s.className) && 
    (s.section === selectedSection || !s.section) && 
    (s.group === selectedGroup || !s.group || selectedGroup === 'সাধারণ')
  );

  if (filteredStudents.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); grid-column:1/-1;">নির্বাচনকৃত <strong>${selectedClass} শ্রেণি (শাখা-${selectedSection}, ${selectedGroup})</strong> এর জন্য কোনো শিক্ষার্থী পাওয়া যায়নি।</p>`;
    return;
  }

  container.innerHTML = filteredStudents.map(s => `
    <div class="attendance-card-box">
      <div class="student-att-header">
        <div class="att-roll-badge">${s.roll}</div>
        <div>
          <strong style="font-size:14px; color:var(--text-main);">${s.name}</strong>
          <span style="display:block; font-size:11px; color:var(--text-muted);">রোল: ${s.roll} | শ্রেণি: ${s.className || selectedClass} (${s.section || selectedSection}) | বিভাগ: ${s.group || selectedGroup}</span>
        </div>
      </div>

      <div class="att-status-buttons">
        <button class="att-btn ${s.attendance === 'Present' ? 'active-present' : ''}" onclick="setStudentAtt('${s.name}', 'Present')">উপস্থিত</button>
        <button class="att-btn ${s.attendance === 'Absent' ? 'active-absent' : ''}" onclick="setStudentAtt('${s.name}', 'Absent')">অনুপস্থিত</button>
        <button class="att-btn ${s.attendance === 'Late' ? 'active-late' : ''}" onclick="setStudentAtt('${s.name}', 'Late')">দেরিতে</button>
      </div>

      <div style="margin-top:10px;">
        <span style="font-size:11px; font-weight:700; color:var(--text-muted);">এনগেজমেন্ট স্টার:</span>
        <div class="star-rating">
          ${[1,2,3,4,5].map(star => `<i class="fa-solid fa-star" style="color:${star <= s.engagement ? '#fbbf24' : '#cbd5e1'}" onclick="setStudentEng('${s.name}', ${star})"></i>`).join('')}
        </div>
      </div>

      <p style="font-size:11.5px; color:var(--text-muted); margin-top:8px;"><strong>মন্তব্য:</strong> ${s.remark}</p>
    </div>
  `).join('');
}

function setStudentAtt(name, status) {
  const st = classData.students.find(x => x.name === name);
  if (st) {
    st.attendance = status;
    saveStorage();
    renderAttendanceCards();
  }
}

function setStudentEng(name, stars) {
  const st = classData.students.find(x => x.name === name);
  if (st) {
    st.engagement = stars;
    saveStorage();
    renderAttendanceCards();
  }
}

function saveAttendance() {
  saveStorage();
  alert('উপস্থিতি ও এনগেজমেন্ট সফলতা সহকারে সংরক্ষণ করা হয়েছে!');
}

// RENDER EXAM CARDS WITH EDIT & DELETE
function filterExamType(type) {
  document.querySelectorAll('#exam-type-tabs .tab-chip').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(type));
  });
  renderExams(type);
}

function renderExams(type) {
  const container = document.getElementById('exams-cards-container');
  const items = type === 'all' ? classData.exams : classData.exams.filter(e => e.type === type);
  container.innerHTML = items.map(e => `
    <div class="exam-card-box">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="badge" style="background:rgba(245,158,11,0.15); color:var(--warning); font-weight:800;">${e.type}</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; font-weight:800; color:var(--primary);">পূর্ণমান: ${e.marks}</span>
          <button onclick="editExam(${e.id})" style="color:var(--primary); background:none; font-size:14px; cursor:pointer;" title="সম্পাদনা করুন"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteExam(${e.id})" style="color:var(--danger); background:none; font-size:14px; cursor:pointer;" title="মুছে ফেলুন"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
      <h4 style="font-size:16px; font-weight:800; margin-top:8px; color:var(--text-main);">${e.subject}</h4>
      <p style="font-size:12px; color:var(--text-muted); margin-top:4px;"><i class="fa-solid fa-calendar-day"></i> তারিখ: ${e.date} (${e.time})</p>
      <p style="font-size:12px; color:var(--text-muted); margin-top:2px;"><i class="fa-solid fa-file-circle-check"></i> কভারেজ: ${e.coverage}</p>
    </div>
  `).join('');
}

// RENDER AI INSIGHTS
function renderAIInsights() {
  const container = document.getElementById('ai-insights-container');
  container.innerHTML = classData.aiInsights.map(ai => `
    <div class="ai-insight-card" style="border-left:4px solid var(--purple);">
      <h4 style="color:var(--purple); font-size:15px; font-weight:800;"><i class="fa-solid fa-brain"></i> ${ai.title}</h4>
      <p style="font-size:13px; margin-top:6px; color:var(--text-main);">${ai.desc}</p>
      <div style="margin-top:10px; padding:10px; background:rgba(139,92,246,0.1); border-radius:8px; font-size:12px; font-weight:700; color:var(--purple);">
        💡 AI সুপারিশকৃত করণীয়: ${ai.action}
      </div>
    </div>
  `).join('');
}

// RENDER HISTORY CARDS
function renderHistory() {
  const container = document.getElementById('history-cards-container');
  container.innerHTML = classData.history.map(h => `
    <div class="history-card-box">
      <div style="display:flex; justify-content:space-between; font-size:11.5px; color:var(--text-muted); font-weight:700;">
        <span>${h.date}</span>
        <span class="badge" style="background:rgba(16,185,129,0.15); color:var(--success);">উপস্থিতি ${h.attendance}</span>
      </div>
      <h4 style="font-size:15px; font-weight:800; margin-top:6px; color:var(--text-main);">${h.subject}</h4>
      <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">${h.remark}</p>
    </div>
  `).join('');
}

// RENDER ALERTS
function renderAlerts() {
  const container = document.getElementById('alerts-container');
  container.innerHTML = classData.alerts.map(a => `
    <div class="interactive-card" style="border-left:4px solid ${a.type === 'urgent' ? 'var(--danger)' : 'var(--warning)'}; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="color:${a.type === 'urgent' ? 'var(--danger)' : 'var(--warning)'}; font-size:15px; font-weight:800;">${a.title}</h4>
        <span style="font-size:11px; color:var(--text-muted); font-weight:700;">${a.time}</span>
      </div>
      <p style="font-size:13px; margin-top:6px; color:var(--text-main);">${a.desc}</p>
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

// ROUTINE MODAL & EDIT
function openAddRoutineModal() {
  editingRoutineId = null;
  document.querySelector('#routine-modal h3').innerHTML = '<i class="fa-solid fa-calendar-plus text-primary"></i> নতুন পিরিয়ড যোগ করুন';
  document.getElementById('m-subject').value = '';
  document.getElementById('m-time').value = '';
  document.getElementById('m-room').value = '১০২';
  document.getElementById('m-topic').value = '';
  document.getElementById('routine-modal').classList.remove('hidden');
}

function editRoutine(id) {
  const item = classData.routines.find(r => r.id === id);
  if (!item) return;
  editingRoutineId = id;
  document.querySelector('#routine-modal h3').innerHTML = '<i class="fa-solid fa-pen-to-square text-primary"></i> পিরিয়ড কার্ড সম্পাদনা করুন';
  document.getElementById('m-day').value = item.day;
  document.getElementById('m-subject').value = item.subject;
  document.getElementById('m-time').value = item.time;
  document.getElementById('m-room').value = item.room;
  document.getElementById('m-topic').value = item.topic;
  document.getElementById('routine-modal').classList.remove('hidden');
}

function closeRoutineModal() { document.getElementById('routine-modal').classList.add('hidden'); }

function saveRoutineModal(e) {
  e.preventDefault();
  const day = document.getElementById('m-day').value;
  const subject = document.getElementById('m-subject').value;
  const time = document.getElementById('m-time').value;
  const room = document.getElementById('m-room').value;
  const topic = document.getElementById('m-topic').value;

  if (editingRoutineId) {
    const item = classData.routines.find(r => r.id === editingRoutineId);
    if (item) {
      item.day = day;
      item.subject = subject;
      item.time = time;
      item.room = room;
      item.topic = topic;
    }
  } else {
    classData.routines.push({
      id: Date.now(),
      day, subject, time, room, topic, teacher: classData.settings.teacherName
    });
  }

  saveStorage();
  closeRoutineModal();
  renderRoutine(day);
  renderOverview();
}

function deleteRoutine(id) {
  if (confirm('আপনি কি এই রুটিন পিরিয়ড কার্ডটি মুছে ফেলতে চান?')) {
    classData.routines = classData.routines.filter(r => r.id !== id);
    saveStorage();
    renderRoutine('রবিবার');
    renderOverview();
  }
}

// SYLLABUS MODAL & EDIT
function openAddSyllabusModal() {
  editingSyllabusId = null;
  document.querySelector('#syllabus-modal h3').innerHTML = '<i class="fa-solid fa-book-bookmark text-purple"></i> নতুন সিলেবাস টার্গেট যোগ';
  document.getElementById('ms-subject').value = '';
  document.getElementById('ms-chapter').value = '';
  document.getElementById('ms-target').value = '';
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function editSyllabus(id) {
  const item = classData.syllabuses.find(s => s.id === id);
  if (!item) return;
  editingSyllabusId = id;
  document.querySelector('#syllabus-modal h3').innerHTML = '<i class="fa-solid fa-pen-to-square text-purple"></i> সিলেবাস টার্গেট সম্পাদনা করুন';
  document.getElementById('ms-timeframe').value = item.timeframe;
  document.getElementById('ms-subject').value = item.subject;
  document.getElementById('ms-chapter').value = item.chapter;
  document.getElementById('ms-target').value = item.target;
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function closeSyllabusModal() { document.getElementById('syllabus-modal').classList.add('hidden'); }

function saveSyllabusModal(e) {
  e.preventDefault();
  const timeframe = document.getElementById('ms-timeframe').value;
  const subject = document.getElementById('ms-subject').value;
  const chapter = document.getElementById('ms-chapter').value;
  const target = document.getElementById('ms-target').value;

  const tfLabels = {
    today: "প্রতিদিনের সিলেবাস", "1week": "আগামী ১ সপ্তাহ", "15days": "আগামী ১৫ দিন",
    "1month": "আগামী ১ মাস", "3months": "আগামী ৩ মাস", "6months": "আগামী ৬ মাস",
    "9months": "আগামী ৯ মাস", "12months": "আগামী ১২ মাস (১ বছর)"
  };

  if (editingSyllabusId) {
    const item = classData.syllabuses.find(s => s.id === editingSyllabusId);
    if (item) {
      item.timeframe = timeframe;
      item.timeframeLabel = tfLabels[timeframe] || timeframe;
      item.subject = subject;
      item.chapter = chapter;
      item.target = target;
    }
  } else {
    classData.syllabuses.push({
      id: Date.now(),
      timeframe,
      timeframeLabel: tfLabels[timeframe] || timeframe,
      subject,
      chapter,
      target,
      progress: 10
    });
  }

  saveStorage();
  closeSyllabusModal();
  renderSyllabus(timeframe);
}

function deleteSyllabus(id) {
  if (confirm('আপনি কি এই সিলেবাস টার্গেট কার্ডটি মুছে ফেলতে চান?')) {
    classData.syllabuses = classData.syllabuses.filter(s => s.id !== id);
    saveStorage();
    renderSyllabus('today');
  }
}

// EXAM MODAL & EDIT
function openAddExamModal() {
  editingExamId = null;
  document.querySelector('#exam-modal h3').innerHTML = '<i class="fa-solid fa-bullseye text-warning"></i> নতুন পরীক্ষা রুটিন কার্ড';
  document.getElementById('me-subject').value = '';
  document.getElementById('me-date').value = '';
  document.getElementById('me-time').value = '১০:০০ AM';
  document.getElementById('me-marks').value = '২০';
  document.getElementById('me-coverage').value = '';
  document.getElementById('exam-modal').classList.remove('hidden');
}

function editExam(id) {
  const item = classData.exams.find(e => e.id === id);
  if (!item) return;
  editingExamId = id;
  document.querySelector('#exam-modal h3').innerHTML = '<i class="fa-solid fa-pen-to-square text-warning"></i> পরীক্ষা রুটিন সম্পাদনা করুন';
  document.getElementById('me-type').value = item.type;
  document.getElementById('me-subject').value = item.subject;
  document.getElementById('me-date').value = item.date;
  document.getElementById('me-time').value = item.time;
  document.getElementById('me-marks').value = item.marks;
  document.getElementById('me-coverage').value = item.coverage;
  document.getElementById('exam-modal').classList.remove('hidden');
}

function closeExamModal() { document.getElementById('exam-modal').classList.add('hidden'); }

function saveExamModal(e) {
  e.preventDefault();
  const type = document.getElementById('me-type').value;
  const subject = document.getElementById('me-subject').value;
  const date = document.getElementById('me-date').value;
  const time = document.getElementById('me-time').value;
  const marks = document.getElementById('me-marks').value;
  const coverage = document.getElementById('me-coverage').value;

  if (editingExamId) {
    const item = classData.exams.find(e => e.id === editingExamId);
    if (item) {
      item.type = type;
      item.subject = subject;
      item.date = date;
      item.time = time;
      item.marks = marks;
      item.coverage = coverage;
    }
  } else {
    classData.exams.push({
      id: Date.now(),
      type, subject, date, time, marks, coverage
    });
  }

  saveStorage();
  closeExamModal();
  renderExams(type);
}

function deleteExam(id) {
  if (confirm('আপনি কি এই পরীক্ষা রুটিন কার্ডটি মুছে ফেলতে চান?')) {
    classData.exams = classData.exams.filter(e => e.id !== id);
    saveStorage();
    renderExams('all');
  }
}

// SETTINGS CONTROL
function saveSettings(e) {
  e.preventDefault();
  classData.settings.school = document.getElementById('cfg-school-name').value;
  classData.settings.teacherName = document.getElementById('cfg-teacher-name').value;
  classData.settings.className = document.getElementById('cfg-class-name').value;
  saveStorage();
  alert('সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!');
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  showSection('overview');
});
