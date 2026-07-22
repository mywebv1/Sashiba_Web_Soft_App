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
    { id: 1, day: "রবিবার", subject: "গণিত", time: "০৯:০০ - ০৯:৪৫ AM", room: "১০২", topic: "অধ্যায় ৩: বীজগণিতীয় সূত্রাবলি", teacher: "মাগুরিব আলী", phone: "01712345678", alertTime: "10", alertMode: "call_sms", activeNow: true },
    { id: 2, day: "রবিবার", subject: "বাংলা", time: "০৯:৪৫ - ১০:৩০ AM", room: "১০২", topic: "কবিতা: নদীর পাড়ে", teacher: "রহিম স্যার", phone: "01812345679", alertTime: "10", alertMode: "sms", activeNow: false },
    { id: 3, day: "রবিবার", subject: "বিজ্ঞান", time: "১০:৪৫ - ১১:৩০ AM", room: "১০২", topic: "অধ্যায় ৫: আলোক বিজ্ঞান", teacher: "ফাতিমা ম্যাডাম", phone: "01912345670", alertTime: "15", alertMode: "call_sms", activeNow: false },
    { id: 4, day: "সোমবার", subject: "ইংরেজি", time: "০৯:০০ - ০৯:৪৫ AM", room: "১০২", topic: "Grammar: Tense & Voice", teacher: "রফিক স্যার", phone: "01512345671", alertTime: "10", alertMode: "call", activeNow: false },
    { id: 5, day: "সোমবার", subject: "গণিত", time: "০৯:৪৫ - ১০:৩০ AM", room: "১০২", topic: "জ্যামিতি: বৃত্তের ক্ষেত্রফল", teacher: "মাগুরিব আলী", phone: "01712345678", alertTime: "10", alertMode: "call_sms", activeNow: false },
    { id: 6, day: "মঙ্গলবার", subject: "ডিজিটাল প্রযুক্তি", time: "১০:০০ - ১০:৪৫ AM", room: "কম্পিউটার ল্যাব", topic: "পাইথন প্রোগ্রামিং পরিচিতি", teacher: "মাগুরিব আলী", phone: "01712345678", alertTime: "10", alertMode: "call_sms", activeNow: false }
  ],
  syllabuses: [
    {
      id: 1,
      month: "জুলাই",
      term: "half_yearly",
      subject: "গণিত",
      subjectCode: "১০৯",
      chapterName: "অধ্যায় ৩: বীজগণিতীয় রাশি ও সমীকরণ",
      learningOutcomes: "বীজগণিতীয় সূত্রের প্রয়োগ, মান নির্ণয় ও উৎপাদকে বিশ্লেষণ করতে পারবে।",
      status: "running", // not_started, running, completed, revision_needed
      progress: 75,
      priority: "High", // High, Medium, Low
      piIndicator: "PI 8.3.1 (পারদর্শিতা সূচক)",
      requiredClasses: 6,
      totalHours: "৪.৫ ঘণ্টা",
      checklist: [
        { text: "সূত্র ৩.১ বিশ্লেষণ ও উদাহরণ সমাধান", checked: true },
        { text: "অনুশীলনী ৩.২ সমস্যা ১-১০ সমাধান", checked: true },
        { text: "উৎপাদকে বিশ্লেষণ ও সৃজনশীল খতিয়ান", checked: false },
        { text: "শ্রেণি মূল্যায়ন ও কুইজ গ্রহণ", checked: false }
      ],
      resources: { video: "https://youtube.com/watch?v=demo1", note: "বীজগণিত সর্টকাট নোট.pdf", quiz: "কুইজ সেট-১" },
      examHub: { marks: "২০ নম্বর (১ম সাময়িক)", pyq: "২০২৫ ও ২০২৪ বোর্ড প্রশ্নপত্র", teacherNote: "দুর্বল শিক্ষার্থীদের সূত্র রিভিশনে বিশেষ নজর দিতে হবে।" }
    },
    {
      id: 2,
      month: "আগস্ট",
      term: "half_yearly",
      subject: "বিজ্ঞান",
      subjectCode: "১২৭",
      chapterName: "অধ্যায় ৪: পরিবেশ, বল ও গতিবিদ্যা",
      learningOutcomes: "গতির সমীকরণ, বলের প্রভাব ও পরিবেশগত বাস্তুতন্ত্র ব্যাখ্যা করতে পারবে।",
      status: "not_started",
      progress: 20,
      priority: "Medium",
      piIndicator: "PI 8.4.2 (বিজ্ঞান অনুসন্ধান)",
      requiredClasses: 8,
      totalHours: "৬.০ ঘণ্টা",
      checklist: [
        { text: "গতির নিউটনীয় ১ম ও ২য় সূত্র", checked: true },
        { text: "বিজ্ঞান ল্যাব পরীক্ষা ও ঢালু তলের প্রয়োগ", checked: false },
        { text: "পরিবেশের ভারসাম্য ও বাস্তুতন্ত্র পোস্টার", checked: false }
      ],
      resources: { video: "https://youtube.com/watch?v=demo2", note: "গতিবিদ্যা ল্যাব গাইড.pdf", quiz: "বিজ্ঞান কুইজ-২" },
      examHub: { marks: "৩০ নম্বর (অর্ধবার্ষিকী)", pyq: "বিগত ৩ বছরের প্রশ্ন ব্যাংক", teacherNote: "ল্যাব প্র্যাকটিক্যালের আগে সেফটি গাইড প্রদর্শন আবশ্যক।" }
    },
    {
      id: 3,
      month: "সেপ্টেম্বর",
      term: "annual",
      subject: "বাংলা",
      subjectCode: "১০১",
      chapterName: "অধ্যায় ৫: শব্দরূপ, সমাস ও গদ্য নির্মিতি",
      learningOutcomes: "সমাসের প্রকারভেদ নির্ণয় ও মানসম্পন্ন প্রবন্ধ রচনা করতে পারবে।",
      status: "completed",
      progress: 100,
      priority: "Low",
      piIndicator: "PI 8.1.1 (ভাষা ও ব্যাকরণ)",
      requiredClasses: 5,
      totalHours: "৩.৫ ঘণ্টা",
      checklist: [
        { text: "দ্বিগু ও বহুব্রীহি সমাস অনুশীলন", checked: true },
        { text: "সৃজনশীল অনুচ্ছেদ লিখন প্র্যাকটিস", checked: true }
      ],
      resources: { video: "https://youtube.com/watch?v=demo3", note: "সমাস সারণি নোট.pdf", quiz: "বাংলা কুইজ-১" },
      examHub: { marks: "১৫ নম্বর (টিপিক্যাল টেস্ট)", pyq: "বোর্ড স্ট্যান্ডার্ড প্রশ্ন", teacherNote: "সমাসের উদাহরণগুলো বারবার রিভিশন দিতে বলুন।" }
    }
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
  if (name === 'syllabus') renderSyllabus();
  if (name === 'attendance') renderAttendanceCards();
  if (name === 'exams') renderExams('all');
  if (name === 'ai_insights') renderAIInsights();
  if (name === 'history') renderHistory();
  if (name === 'alerts') renderAlerts();

  // Update Top Bar Action Buttons Contextually
  const addBtn = document.getElementById('top-bar-add-btn');
  const attBtn = document.getElementById('top-bar-att-btn');

  if (attBtn) {
    attBtn.style.display = (name === 'attendance') ? 'none' : 'inline-flex';
  }

  if (addBtn) {
    if (name === 'syllabus') {
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> + নতুন সিলেবাস যোগ';
      addBtn.style.display = 'inline-flex';
    } else if (name === 'exams') {
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> + নতুন পরীক্ষা কার্ড যোগ';
      addBtn.style.display = 'inline-flex';
    } else if (name === 'routine' || name === 'overview') {
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> + নতুন রুটিন পিরিয়ড যোগ';
      addBtn.style.display = 'inline-flex';
    } else {
      addBtn.style.display = 'none'; // Hide add button on sections without card addition
    }
  }
}

function handleTopBarAddCard() {
  const activeNav = document.querySelector('.nav-item.active');
  const activeSectionId = activeNav ? activeNav.id.replace('nav-', '') : 'overview';

  if (activeSectionId === 'syllabus') {
    openAddSyllabusModal();
  } else if (activeSectionId === 'exams') {
    openAddExamModal();
  } else {
    openAddRoutineModal();
  }
}

function updateGlobalContext() {
  const board = document.getElementById('global-board-select')?.value || 'ঢাকা বোর্ড';
  const cls = document.getElementById('global-class-select')?.value || 'অষ্টম';
  const sec = document.getElementById('global-section-select')?.value || 'ক';
  const grp = document.getElementById('global-group-select')?.value || 'সাধারণ';

  classData.settings.board = board;
  classData.settings.className = `${cls} (শাখা-${sec})`;
  classData.settings.group = grp;

  const subtitle = document.getElementById('global-context-subtitle');
  if (subtitle) {
    subtitle.textContent = `${board} | ${cls} শ্রেণি (শাখা-${sec}) | ${grp}`;
  }

  // Also sync live control selectors if visible
  if (document.getElementById('live-board-select')) {
    document.getElementById('live-board-select').value = board;
    document.getElementById('live-class-select').value = cls;
    document.getElementById('live-section-select').value = sec;
    document.getElementById('live-group-select').value = grp;
    if (typeof updateLiveContext === 'function') updateLiveContext();
  }

  // Also sync attendance selectors if visible
  if (document.getElementById('att-class-select')) {
    document.getElementById('att-class-select').value = cls;
    document.getElementById('att-section-select').value = sec;
    document.getElementById('att-group-select').value = grp;
  }

  saveStorage();
  
  // Re-render currently active view with new context
  const activeNav = document.querySelector('.nav-item.active');
  const activeSectionId = activeNav ? activeNav.id.replace('nav-', '') : 'overview';
  showSection(activeSectionId);
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

// RENDER ADAPTIVE VERTICAL TIMELINE ROUTINE (Final v1.0)
function filterRoutineDay(day) {
  document.querySelectorAll('#routine-day-tabs .tab-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === day);
  });
  renderRoutine(day);
}

function renderRoutine(day) {
  const container = document.getElementById('routine-cards-container');
  if (!container) return;
  const items = classData.routines.filter(r => r.day === day);
  if (items.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">এই দিনে কোনো পিরিয়ড বা স্মার্ট কার্ড নির্ধারণ করা হয়নি।</p>`;
    return;
  }

  container.innerHTML = items.map(r => `
    <div class="v-timeline-card ${r.activeNow ? 'status-active' : ''}">
      <div class="vtc-top-bar">
        <span class="vtc-time-badge"><i class="fa-solid fa-clock text-primary"></i> ${r.time} (${r.day})</span>
        <div class="flex-align-center gap-2">
          ${r.activeNow ? '<span class="badge-live-now"><i class="fa-solid fa-circle text-danger fa-pulse"></i> চলমান সেশন</span>' : '<span class="badge" style="background:rgba(100,116,139,0.1); color:var(--text-muted); font-size:10.5px;">আসন্ন</span>'}
          <button onclick="editRoutine(${r.id})" style="color:var(--primary); background:none; font-size:13px;" title="সম্পাদনা"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteRoutine(${r.id})" style="color:var(--danger); background:none; font-size:13px;" title="মুছে ফেলুন"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>

      <div class="mt-2 flex-between flex-wrap gap-2">
        <h4 style="font-size:16px; font-weight:800; color:var(--text-main); margin:0;">
          ${r.subject} <span style="font-size:12px; color:var(--text-muted); font-weight:600;">(কক্ষ: ${r.room})</span>
        </h4>
        <span class="text-xs fw-bold text-primary"><i class="fa-solid fa-user-tie"></i> ${r.teacher} ${r.isSubstitute ? '<span class="badge" style="background:rgba(245,158,11,0.15); color:var(--warning);">সাবস্টিটিউট</span>' : ''}</span>
      </div>

      <p style="font-size:13px; color:var(--text-muted); margin-top:4px; font-weight:600;"><i class="fa-solid fa-book-open"></i> ${r.topic || 'অধ্যায় ও নির্ধারিত পাঠসূচি'}</p>

      <!-- 1. Class Action Buttons (Connected Architecture) -->
      <div class="class-actions-bar mt-3">
        <span class="text-xs fw-bold text-primary mr-1"><i class="fa-solid fa-bolt"></i> অ্যাকশন:</span>
        <button class="btn-action-primary" onclick="startClassSession(${r.id})"><i class="fa-solid fa-play"></i> ▶️ ক্লাস শুরু করুন</button>
        <button class="btn-action-outline" onclick="openLessonPlanModal('${r.subject}', '${r.topic}')"><i class="fa-solid fa-book-reader text-purple"></i> 📖 লেসন প্ল্যান</button>
        <button class="btn-action-outline" onclick="openPresentationModal('${r.subject}')"><i class="fa-solid fa-desktop text-primary"></i> 🖥️ প্রেজেন্টেশন</button>
        <button class="btn-action-outline" onclick="showSection('attendance')"><i class="fa-solid fa-user-check text-success"></i>  উপস্থিতি</button>
      </div>

      <!-- 2. Resources & Syllabus Link Bar -->
      <div class="mt-3 flex-between flex-wrap gap-2" style="background:var(--bg-app); padding:8px 12px; border-radius:8px;">
        <div class="flex-align-center gap-2 flex-wrap">
          <span class="text-xs fw-bold text-muted"><i class="fa-solid fa-folder-open"></i> রিসোর্স:</span>
          <a href="javascript:void(0)" class="resource-pill-btn" onclick="openVideoResource('${r.subject}')"><i class="fa-solid fa-circle-play text-danger"></i> 🎥 ভিডিও</a>
          <a href="javascript:void(0)" class="resource-pill-btn" onclick="openNoteResource('${r.subject}')"><i class="fa-solid fa-file-lines text-primary"></i> 📄 নোট</a>
          <a href="javascript:void(0)" class="resource-pill-btn" onclick="openQuizResource('${r.subject}')"><i class="fa-solid fa-pen-nib text-warning"></i> 📝 কুইজ</a>
          <a href="javascript:void(0)" class="resource-pill-btn" onclick="linkSyllabusModal('${r.subject}')" style="background:rgba(139,92,246,0.15); color:var(--purple);"><i class="fa-solid fa-link"></i> 🔗 সিলেবাস লিংক</a>
        </div>
        <button class="btn-sm btn-white-outline" onclick="showPYQModal('${r.subject}')" style="font-size:10.5px; border-color:var(--border); color:var(--text-main);"><i class="fa-solid fa-clock-rotate-left"></i> 📊 PYQ (বিগত প্রশ্ন)</button>
      </div>

      <!-- 3. AI Insight Banner -->
      <div class="mt-2 flex-between flex-wrap gap-2 text-xs" style="color:var(--text-muted);">
        <span><i class="fa-solid fa-lightbulb text-warning"></i> <strong>AI রিকমেন্ডেশন:</strong> গত ক্লাসের কুইজে ১৫% দুর্বলতা ছিল। ৫ মি. রিভিশন দরকার।</span>
        <span class="fw-bold text-success"><i class="fa-solid fa-chart-line"></i> প্রোগ্রেস: ৭৫%</span>
      </div>
    </div>
  `).join('');

  // Update Daily Summary metrics
  document.getElementById('ds-total-classes').textContent = `${items.length}টি`;
  document.getElementById('ds-done-classes').textContent = `${items.filter(i=>!i.activeNow).length}টি`;
  document.getElementById('ds-pending-classes').textContent = `${items.filter(i=>i.activeNow).length}টি`;
}

// RENDER SMART SYLLABUS CARDS (Final v1.0 Accordion Glass Cards)
let currentSyllableMonth = 'all';
let currentSyllableStatus = 'all';
let currentSyllablePriority = 'all';
let currentSyllableTerm = 'all';
let currentSyllableSearch = '';

function filterSyllabusMonth(m) {
  currentSyllableMonth = m;
  document.querySelectorAll('#syllabus-month-chips .month-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(m) || (m==='all' && btn.textContent==='সব মাস'));
  });
  renderSyllabus();
}
function filterSyllabusByStatus(st) { currentSyllableStatus = st; renderSyllabus(); }
function filterSyllabusByPriority(pr) { currentSyllablePriority = pr; renderSyllabus(); }
function filterSyllabusTerm(tm) { currentSyllableTerm = tm; renderSyllabus(); }
function searchSyllabusCards(q) { currentSyllableSearch = q.toLowerCase(); renderSyllabus(); }

function renderSyllabus() {
  const container = document.getElementById('syllabus-cards-container');
  if (!container) return;

  let items = classData.syllabuses;
  if (currentSyllableMonth !== 'all') items = items.filter(s => s.month === currentSyllableMonth);
  if (currentSyllableStatus !== 'all') items = items.filter(s => s.status === currentSyllableStatus);
  if (currentSyllablePriority !== 'all') items = items.filter(s => s.priority === currentSyllablePriority);
  if (currentSyllableTerm !== 'all') items = items.filter(s => s.term === currentSyllableTerm);
  if (currentSyllableSearch) {
    items = items.filter(s => 
      s.subject.toLowerCase().includes(currentSyllableSearch) ||
      (s.chapterName && s.chapterName.toLowerCase().includes(currentSyllableSearch)) ||
      (s.learningOutcomes && s.learningOutcomes.toLowerCase().includes(currentSyllableSearch))
    );
  }

  if (items.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:30px;">কোনো মানানসই সিলেবাস অধ্যায় বা কার্ড পাওয়া যায়নি।</p>`;
    return;
  }

  const statusLabels = { not_started: "⚪ শুরু হয়নি", running: "🟢 চলছে", completed: "💙 সম্পন্ন", revision_needed: "🔴 রিভিশন বাকি" };

  container.innerHTML = items.map(s => `
    <div class="glass-chapter-card" id="gcc-card-${s.id}">
      <div class="gcc-header" onclick="toggleChapterAccordion(${s.id})">
        <div class="flex-align-center gap-3">
          <button class="btn-icon-circle" style="width:28px; height:28px;"><i class="fa-solid fa-chevron-down" id="acc-icon-${s.id}"></i></button>
          <div>
            <div class="flex-align-center gap-2">
              <span class="status-tag ${s.status}">${statusLabels[s.status] || 'চলছে'}</span>
              <span class="priority-tag ${s.priority}">${s.priority} Priority</span>
              <span class="badge" style="background:rgba(139,92,246,0.1); color:var(--purple); font-size:10.5px;">মাস: ${s.month || 'জুলাই'}</span>
            </div>
            <h4 style="font-size:15px; font-weight:800; color:var(--text-main); margin-top:4px;">
              ${s.chapterName || s.chapter} <span style="font-size:12px; color:var(--primary);">(${s.subject})</span>
            </h4>
          </div>
        </div>

        <div class="flex-align-center gap-4">
          <div style="text-align:right;">
            <div class="text-xs font-bold text-muted">প্রোগ্রেস</div>
            <div class="text-sm font-extrabold text-primary">${s.progress}%</div>
          </div>
          <div style="width:100px;">
            <div class="progress-bar-wrap" style="height:6px;"><div class="progress-fill bg-purple" style="width:${s.progress}%;"></div></div>
          </div>
          <div class="flex-gap-center" onclick="event.stopPropagation()">
            <button onclick="editSyllabus(${s.id})" style="color:var(--primary); background:none; font-size:13px;" title="সম্পাদনা"><i class="fa-solid fa-pen-to-square"></i></button>
            <button onclick="deleteSyllabus(${s.id})" style="color:var(--danger); background:none; font-size:13px;" title="মুছে ফেলুন"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>

      <div class="gcc-body" id="gcc-body-${s.id}">
        <!-- Learning Outcome & PI Indicator -->
        <div class="flex-between flex-wrap gap-2 mb-3">
          <div>
            <strong class="text-xs text-primary display-block mb-1"><i class="fa-solid fa-bullseye"></i> শিখনফল (Learning Outcome):</strong>
            <p style="font-size:12.5px; color:var(--text-main); font-weight:600; margin:0;">${s.learningOutcomes || 'শিক্ষার্থীরা ধারণা অর্জন করতে পারবে।'}</p>
          </div>
          <div class="text-right">
            <span class="badge" style="background:rgba(16,185,129,0.12); color:var(--success); font-size:11px; font-weight:700;"><i class="fa-solid fa-award"></i> ${s.piIndicator || 'PI 8.3.1'}</span>
            <div class="text-xs text-muted mt-1">প্রয়োজনীয় সময়: <strong>${s.requiredClasses || 6}টি ক্লাস (${s.totalHours || '৪ ঘণ্টা'})</strong></div>
          </div>
        </div>

        <!-- Topic Checklist -->
        <div class="topic-checklist-box mt-3">
          <div class="flex-between text-xs fw-bold mb-2">
            <span><i class="fa-solid fa-list-check text-purple"></i> টপিকভিত্তিক স্মার্ট চেকলিস্ট</span>
            <span class="text-muted">টিক চিহ্ন দিন</span>
          </div>
          ${s.checklist ? s.checklist.map((item, idx) => `
            <label class="checklist-item ${item.checked ? 'checked' : ''}">
              <input type="checkbox" ${item.checked ? 'checked' : ''} onchange="toggleChecklistItem(${s.id}, ${idx})">
              <span>${item.text}</span>
            </label>
          `).join('') : '<p class="text-xs text-muted">কোনো চেকলিস্ট নির্ধারিত নেই।</p>'}
        </div>

        <!-- Resources & Exam Hub Grid -->
        <div class="resources-exam-hub-grid">
          <div class="hub-box">
            <h6><i class="fa-solid fa-folder-open text-primary"></i> লার্নিং রিসোর্স</h6>
            <div class="flex-gap-center flex-wrap">
              <a href="${s.resources?.video || '#'}" target="_blank" class="resource-pill-btn"><i class="fa-solid fa-play text-danger"></i> 🎥 ভিডিও লেকচার</a>
              <a href="#" onclick="alert('নোট ডাউনলোড হচ্ছে...')" class="resource-pill-btn"><i class="fa-solid fa-file-pdf text-primary"></i> 📄 লেকচার নোট</a>
              <a href="#" onclick="alert('কুইজ চালু হচ্ছে...')" class="resource-pill-btn"><i class="fa-solid fa-pen-nib text-warning"></i> 📝 অনলাইন কুইজ</a>
            </div>
          </div>

          <div class="hub-box">
            <h6><i class="fa-solid fa-square-poll-vertical text-warning"></i> পরীক্ষা প্রস্তুতি (Exam Hub)</h6>
            <div class="text-xs color-text-muted">
              <div><strong>মান বণ্টন:</strong> ${s.examHub?.marks || '২০ নম্বর'}</div>
              <div><strong>বিগত প্রশ্ন:</strong> ${s.examHub?.pyq || '২০২৫ বোর্ড প্রশ্ন'}</div>
              <div class="text-danger fw-bold mt-1"><strong>শিক্ষকের নোট:</strong> ${s.examHub?.teacherNote || 'রিভিশন দেওয়া জরুরি।'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Update Summary Analytics
  const total = classData.syllabuses.length;
  const completed = classData.syllabuses.filter(s=>s.status==='completed').length;
  const pending = total - completed;
  document.getElementById('syll-stat-completed').textContent = `${completed}টি অধ্যায়`;
  document.getElementById('syll-stat-pending').textContent = `${pending}টি অধ্যায়`;
  const avgProgress = Math.round(classData.syllabuses.reduce((acc, curr) => acc + (curr.progress||0), 0) / (total || 1));
  document.getElementById('syll-stat-coverage').textContent = `${avgProgress}%`;
  document.getElementById('syll-total-percent').textContent = `${avgProgress}% সম্পন্ন`;
  document.getElementById('syll-total-progress-fill').style.width = `${avgProgress}%`;
}

// TOGGLE ACCORDION
function toggleChapterAccordion(id) {
  const body = document.getElementById(`gcc-body-${id}`);
  const icon = document.getElementById(`acc-icon-${id}`);
  if (body) {
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
  }
  if (icon) {
    icon.className = body.style.display === 'none' ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down';
  }
}

// TOGGLE CHECKLIST & CONFETTI ANIMATION
function toggleChecklistItem(syllabusId, itemIdx) {
  const item = classData.syllabuses.find(s => s.id === syllabusId);
  if (item && item.checklist && item.checklist[itemIdx]) {
    item.checklist[itemIdx].checked = !item.checklist[itemIdx].checked;
    
    // Recalculate progress
    const checkedCount = item.checklist.filter(c => c.checked).length;
    item.progress = Math.round((checkedCount / item.checklist.length) * 100);
    if (item.progress === 100) item.status = 'completed';
    else if (item.progress > 0) item.status = 'running';

    saveStorage();
    renderSyllabus();

    if (item.checklist[itemIdx].checked) {
      showConfettiToast("🎉 চমৎকার! টপিক সম্পন্ন হয়েছে (+প্রোগ্রেস যুক্ত হয়েছে)");
    }
  }
}

function showConfettiToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'confetti-toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// CLASS ACTIONS CONNECTED ARCHITECTURE HANDLERS
function startClassSession(routineId) {
  alert(`🚀 পিরিয়ড #${routineId} লাইভ ক্লাস সেশন সফলভাবে শুরু হয়েছে! লেসন প্ল্যান ও প্রেজেন্টেশন অটো-লোড হচ্ছে...`);
  showSection('live_control');
}
function openLessonPlanModal(subject, topic) {
  alert(`📖 [${subject}] লেসন প্ল্যান:\n- টপিক: ${topic}\n- পদ্ধতি: প্রেজেন্টেশন ও ব্ল্যাকবোর্ড প্র্যাকটিস\n- সময়: ৪৫ মিনিট`);
}
function openPresentationModal(subject) {
  alert(`🖥️ [${subject}] ইন্টারঅ্যাক্টিভ প্রেজেন্টেশন স্লাইড সেশন প্রস্তুত করা হচ্ছে...`);
}
function linkSyllabusModal(subject) {
  showSection('syllabus');
  searchSyllabusCards(subject);
}
function switchRoleView(role) {
  alert(`👤 রোল পরিবর্তন করা হয়েছে: ${role.toUpperCase()} ভিউ একটিভ!`);
}

function openAddSyllabusModal() {
  editingSyllabusId = null;
  document.querySelector('#syllabus-modal h3').innerHTML = '<i class="fa-solid fa-book-bookmark text-purple"></i> নতুন ১২ মাসের বাৎসরিক মাস্টার সিলেবাস যোগ';
  if (document.getElementById('ms-timeframe')) document.getElementById('ms-timeframe').value = '12months';
  if (document.getElementById('ms-subject')) document.getElementById('ms-subject').value = 'গণিত';
  if (document.getElementById('ms-subject-code')) document.getElementById('ms-subject-code').value = '১০৯';
  if (document.getElementById('ms-weekly-plan')) document.getElementById('ms-weekly-plan').value = '১ম-৩য় মাস: অধ্যায় ১-৪ (মৌলিক ধারণা ও ১ম সাময়িক)';
  if (document.getElementById('ms-exam-schedule')) document.getElementById('ms-exam-schedule').value = '১ম সাময়িক (মার্চ): ২০ নম্বর | অর্ধবার্ষিকী (জুন): ৫০ নম্বর | ৩য় সাময়িক (সেপ্টেম্বর): ২০ নম্বর | বার্ষিকী (ডিসেম্বর): ১০০ নম্বর';
  if (document.getElementById('ms-periods')) document.getElementById('ms-periods').value = '৬';
  if (document.getElementById('ms-duration')) document.getElementById('ms-duration').value = '১ ঘণ্টা';
  if (document.getElementById('ms-ref-books')) document.getElementById('ms-ref-books').value = 'NCTB বোর্ড অনুমোদিত মূল বই (২০২৬)';
  if (document.getElementById('ms-target')) document.getElementById('ms-target').value = 'বীজগণিতীয় সূত্রের সঠিক প্রয়োগ ও মান নির্ণয় শিখবে';
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function editSyllabus(id) {
  const item = classData.syllabuses.find(s => s.id === id);
  if (!item) return;
  editingSyllabusId = id;
  document.querySelector('#syllabus-modal h3').innerHTML = '<i class="fa-solid fa-pen-to-square text-purple"></i> ১২ মাসের বাৎসরিক সিলেবাস সম্পাদনা';
  document.getElementById('ms-timeframe').value = item.timeframe || '12months';
  if (document.getElementById('ms-subject')) document.getElementById('ms-subject').value = item.subject || 'গণিত';
  if (document.getElementById('ms-subject-code')) document.getElementById('ms-subject-code').value = item.subjectCode || '১০৯';
  
  // Set multi-selected chapters
  const chapterSelect = document.getElementById('ms-chapter');
  if (chapterSelect) {
    const selectedList = Array.isArray(item.chapters) ? item.chapters : [item.chapter];
    Array.from(chapterSelect.options).forEach(opt => {
      opt.selected = selectedList.includes(opt.value);
    });
  }

  if (document.getElementById('ms-working-days')) document.getElementById('ms-working-days').value = item.workingDays || '১৮০টি মোট কার্যদিবস (বছরে)';
  if (document.getElementById('ms-holidays')) document.getElementById('ms-holidays').value = item.holidays || '৮৫ দিন মোট ছুটি (সরকারি ও উৎসব)';
  if (document.getElementById('ms-weekly-plan')) document.getElementById('ms-weekly-plan').value = item.weeklyPlan || '১ম-৩য় মাস: অধ্যায় ১-৪ (মৌলিক ধারণা ও ১ম সাময়িক)';
  if (document.getElementById('ms-exam-schedule')) document.getElementById('ms-exam-schedule').value = item.examSchedule || '১ম সাময়িক (মার্চ): ২০ নম্বর | অর্ধবার্ষিকী (জুন): ৫০ নম্বর | ৩য় সাময়িক (সেপ্টেম্বর): ২০ নম্বর | বার্ষিকী (ডিসেম্বর): ১০০ নম্বর';
  if (document.getElementById('ms-periods')) document.getElementById('ms-periods').value = item.periodsNeeded || '৬';
  if (document.getElementById('ms-start-date')) document.getElementById('ms-start-date').value = item.startDate || '2026-07-25';
  if (document.getElementById('ms-start-time')) document.getElementById('ms-start-time').value = item.startTime || '০৯:০০ AM';
  if (document.getElementById('ms-duration')) document.getElementById('ms-duration').value = item.duration || '১ ঘণ্টা';
  if (document.getElementById('ms-next-class')) document.getElementById('ms-next-class').value = item.nextClass || 'পরবর্তী বিষয়: বিজ্ঞান (১০:০০ AM - ১১:০০ AM)';
  if (document.getElementById('ms-ref-books')) document.getElementById('ms-ref-books').value = item.refBooks || '';
  document.getElementById('ms-target').value = item.target || '';
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function closeSyllabusModal() { document.getElementById('syllabus-modal').classList.add('hidden'); }

function saveSyllabusModal(e) {
  e.preventDefault();
  const timeframe = document.getElementById('ms-timeframe').value;
  const subject = document.getElementById('ms-subject').value;
  const subjectCode = document.getElementById('ms-subject-code')?.value || '১০৯';
  
  // Extract all multi-selected chapters
  const chapterSelect = document.getElementById('ms-chapter');
  const selectedChapters = chapterSelect ? Array.from(chapterSelect.selectedOptions).map(opt => opt.value) : ['অধ্যায় ১: বীজগণিতীয় রাশি ও সূত্র'];
  const primaryChapter = selectedChapters.join(', ');

  const workingDays = document.getElementById('ms-working-days')?.value || '১৮০টি মোট কার্যদিবস (বছরে)';
  const holidays = document.getElementById('ms-holidays')?.value || '৮৫ দিন মোট ছুটি (সরকারি ও উৎসব)';
  const weeklyPlan = document.getElementById('ms-weekly-plan')?.value || '১২ মাসের বিষয়ভিত্তিক রোডম্যাপ';
  const examSchedule = document.getElementById('ms-exam-schedule')?.value || '১ম সাময়িক, অর্ধবার্ষিকী ও বার্ষিকী পরীক্ষা';
  const periodsNeeded = document.getElementById('ms-periods')?.value || '৬';
  const startDate = document.getElementById('ms-start-date')?.value || '২০২৬-০৭-২৫';
  const startTime = document.getElementById('ms-start-time')?.value || '০৯:০০ AM';
  const duration = document.getElementById('ms-duration')?.value || '১ ঘণ্টা';
  const nextClass = document.getElementById('ms-next-class')?.value || 'পরবর্তী বিষয়: বিজ্ঞান (১০:০০ AM - ১১:০০ AM)';
  const refBooks = document.getElementById('ms-ref-books')?.value || 'NCTB বোর্ড বই';
  const target = document.getElementById('ms-target').value;

  const tfLabels = {
    today: "প্রতিদিনের সিলেবাস", "1week": "আগামী ১ সপ্তাহ", "15days": "আগামী ১৫ দিন",
    "1month": "আগামী ১ মাস", "3months": "আগামী ৩ মাস", "6months": "আগামী ৬ মাস",
    "9months": "আগামী ৯ মাস", "12months": "১২ মাসের বাৎসরিক মাস্টার সিলেবাস"
  };

  if (editingSyllabusId) {
    const item = classData.syllabuses.find(s => s.id === editingSyllabusId);
    if (item) {
      item.timeframe = timeframe;
      item.timeframeLabel = tfLabels[timeframe] || timeframe;
      item.subject = subject;
      item.subjectCode = subjectCode;
      item.chapter = primaryChapter;
      item.chapters = selectedChapters;
      item.workingDays = workingDays;
      item.holidays = holidays;
      item.weeklyPlan = weeklyPlan;
      item.examSchedule = examSchedule;
      item.periodsNeeded = periodsNeeded;
      item.startDate = startDate;
      item.startTime = startTime;
      item.duration = duration;
      item.nextClass = nextClass;
      item.refBooks = refBooks;
      item.target = target;
    }
  } else {
    classData.syllabuses.push({
      id: Date.now(),
      timeframe,
      timeframeLabel: tfLabels[timeframe] || timeframe,
      subject,
      subjectCode,
      chapter: primaryChapter,
      chapters: selectedChapters,
      workingDays,
      holidays,
      weeklyPlan,
      examSchedule,
      periodsNeeded,
      startDate,
      startTime,
      duration,
      nextClass,
      refBooks,
      target,
      progress: 10
    });
  }

  saveStorage();
  closeSyllabusModal();
  renderSyllabus(timeframe);
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
  const board = classData.settings.board || 'ঢাকা বোর্ড';
  const className = classData.settings.className || 'অষ্টম (শাখা-ক)';
  const group = classData.settings.group || 'সাধারণ';

  container.innerHTML = classData.history.map(h => `
    <div class="history-card-box">
      <div style="display:flex; justify-content:space-between; font-size:11.5px; color:var(--text-muted); font-weight:700;">
        <span>${h.date} | ${board}</span>
        <span class="badge" style="background:rgba(16,185,129,0.15); color:var(--success);">উপস্থিতি ${h.attendance}</span>
      </div>
      <h4 style="font-size:15px; font-weight:800; margin-top:6px; color:var(--text-main);">${h.subject}</h4>
      <p style="font-size:11.5px; color:var(--primary); font-weight:700; margin-top:2px;"><i class="fa-solid fa-graduation-cap"></i> শ্রেণি: ${h.class || className} | বিভাগ: ${group}</p>
      <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">${h.remark}</p>
    </div>
  `).join('');
}

// RENDER ALERTS
function renderAlerts() {
  const container = document.getElementById('alerts-container');
  const board = classData.settings.board || 'ঢাকা বোর্ড';
  const className = classData.settings.className || 'অষ্টম (শাখা-ক)';
  const group = classData.settings.group || 'সাধারণ';

  container.innerHTML = classData.alerts.map(a => `
    <div class="interactive-card" style="border-left:4px solid ${a.type === 'urgent' ? 'var(--danger)' : 'var(--warning)'}; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h4 style="color:${a.type === 'urgent' ? 'var(--danger)' : 'var(--warning)'}; font-size:15px; font-weight:800;">${a.title}</h4>
        <span style="font-size:11px; color:var(--text-muted); font-weight:700;">${a.time} | ${board}</span>
      </div>
      <p style="font-size:11.5px; color:var(--text-muted); font-weight:700; margin-top:2px;">শ্রেণি: ${className} | বিভাগ: ${group}</p>
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

// LIVE CONTROL CONTEXT UPDATE & RANDOMIZER
function updateLiveContext() {
  const board = document.getElementById('live-board-select')?.value || 'ঢাকা বোর্ড';
  const cls = document.getElementById('live-class-select')?.value || 'অষ্টম';
  const sec = document.getElementById('live-section-select')?.value || 'ক';
  const grp = document.getElementById('live-group-select')?.value || 'সাধারণ';

  const summary = document.getElementById('live-context-summary');
  if (summary) {
    summary.textContent = `শ্রেণি: ${cls} | শাখা: ${sec} | বিভাগ: ${grp} | বোর্ড: ${board}`;
  }

  const meta = document.getElementById('random-student-meta');
  if (meta) {
    meta.textContent = `শ্রেণি: ${cls} (${sec}) | ${grp} | ${board}`;
  }
}

function pickRandomStudent() {
  const cls = document.getElementById('live-class-select')?.value || 'অষ্টম';
  const sec = document.getElementById('live-section-select')?.value || 'ক';
  const grp = document.getElementById('live-group-select')?.value || 'সাধারণ';
  const board = document.getElementById('live-board-select')?.value || 'ঢাকা বোর্ড';

  const filtered = classData.students.filter(s => 
    (s.className === cls || !s.className) && 
    (s.section === sec || !s.section) && 
    (s.group === grp || !s.group || grp === 'সাধারণ')
  );

  const students = filtered.length > 0 ? filtered : classData.students;
  const picked = students[Math.floor(Math.random() * students.length)];
  
  document.getElementById('random-student-name').textContent = `🎯 রোল ${picked.roll}: ${picked.name}`;
  const meta = document.getElementById('random-student-meta');
  if (meta) {
    meta.textContent = `শ্রেণি: ${picked.className || cls} (${picked.section || sec}) | বিভাগ: ${picked.group || grp} | বোর্ড: ${board}`;
  }
}

// ROUTINE MODAL, EDIT & AUTOMATED TEACHER ALERT SIMULATION
function openAddRoutineModal() {
  editingRoutineId = null;
  document.querySelector('#routine-modal h3').innerHTML = '<i class="fa-solid fa-calendar-plus text-primary"></i> নতুন পিরিয়ড যোগ করুন';
  if (document.getElementById('m-subject')) document.getElementById('m-subject').value = 'গণিত';
  if (document.getElementById('m-time-text')) document.getElementById('m-time-text').value = '১০:০০ - ১০:৪৫';
  if (document.getElementById('m-time-ampm')) document.getElementById('m-time-ampm').value = 'AM';
  if (document.getElementById('m-room')) document.getElementById('m-room').value = '১০২';
  if (document.getElementById('m-topic')) document.getElementById('m-topic').value = '';
  if (document.getElementById('m-teacher')) document.getElementById('m-teacher').value = classData.settings.teacherName || '';
  if (document.getElementById('m-phone')) document.getElementById('m-phone').value = '01751095560';
  document.getElementById('routine-modal').classList.remove('hidden');
}

function editRoutine(id) {
  const item = classData.routines.find(r => r.id === id);
  if (!item) return;
  editingRoutineId = id;
  document.querySelector('#routine-modal h3').innerHTML = '<i class="fa-solid fa-pen-to-square text-primary"></i> পিরিয়ড কার্ড সম্পাদনা করুন';
  document.getElementById('m-day').value = item.day;
  
  if (document.getElementById('m-subject')) document.getElementById('m-subject').value = item.subject || 'গণিত';
  
  // Parse time and AM/PM
  const fullTime = item.time || '১০:০০ - ১০:৪৫ AM';
  const isPM = fullTime.toUpperCase().includes('PM');
  const cleanTime = fullTime.replace(/AM|PM/gi, '').trim();

  if (document.getElementById('m-time-text')) document.getElementById('m-time-text').value = cleanTime;
  if (document.getElementById('m-time-ampm')) document.getElementById('m-time-ampm').value = isPM ? 'PM' : 'AM';

  document.getElementById('m-room').value = item.room || '১০২';
  document.getElementById('m-topic').value = item.topic || '';
  if (document.getElementById('m-teacher')) document.getElementById('m-teacher').value = item.teacher || '';
  if (document.getElementById('m-phone')) document.getElementById('m-phone').value = item.phone || '';
  if (document.getElementById('m-alert-time')) document.getElementById('m-alert-time').value = item.alertTime || '10';
  if (document.getElementById('m-alert-mode')) document.getElementById('m-alert-mode').value = item.alertMode || 'call_sms';
  document.getElementById('routine-modal').classList.remove('hidden');
}

function closeRoutineModal() { document.getElementById('routine-modal').classList.add('hidden'); }

function saveRoutineModal(e) {
  e.preventDefault();
  const day = document.getElementById('m-day').value;
  const subject = document.getElementById('m-subject').value;
  
  const timeText = document.getElementById('m-time-text')?.value || '১০:০০ - ১০:৪৫';
  const timeAmPm = document.getElementById('m-time-ampm')?.value || 'AM';
  const time = `${timeText} ${timeAmPm}`;

  const room = document.getElementById('m-room').value;
  const topic = document.getElementById('m-topic').value;
  const teacher = document.getElementById('m-teacher')?.value || classData.settings.teacherName;
  const phone = document.getElementById('m-phone')?.value || '01751095560';
  const alertTime = document.getElementById('m-alert-time')?.value || '10';
  const alertMode = document.getElementById('m-alert-mode')?.value || 'call_sms';

  if (editingRoutineId) {
    const item = classData.routines.find(r => r.id === editingRoutineId);
    if (item) {
      item.day = day;
      item.subject = subject;
      item.time = time;
      item.room = room;
      item.topic = topic;
      item.teacher = teacher;
      item.phone = phone;
      item.alertTime = alertTime;
      item.alertMode = alertMode;
    }
  } else {
    classData.routines.push({
      id: Date.now(),
      day, subject, time, room, topic, teacher, phone, alertTime, alertMode
    });
  }

  saveStorage();
  closeRoutineModal();
  renderRoutine(day);
  renderOverview();
  
  // Show notification feedback
  alert(`✅ পিরিয়ড কার্ড সফলভাবে সংরক্ষিত হয়েছে!\n\n📌 বিষয়: ${subject} (${time})\n📞 শিক্ষক ${teacher} (${phone})-এর মোবাইলে ক্লাস শুরুর ${alertTime} মিনিট পূর্বে অটোমেটিক রিমাইন্ডার কল ও SMS সেট করা হলো।`);
}

// REAL-TIME FUNCTIONAL TEST SIMULATOR FOR AUTOMATED VOICE CALL & SMS
function triggerTestTeacherAlert(teacherName, phone, subject, time, room) {
  const isWebSpeechAvailable = 'speechSynthesis' in window;
  const messageText = `আসসালামু আলাইকুম ${teacherName} স্যার। আপনার ${subject} বিষয়ের ক্লাসটি কিছুক্ষণের মধ্যে কক্ষ ${room}-এ শুরু হতে যাচ্ছে। দয়া করে ক্লাসে উপস্থিত হোন।`;

  // 1. Trigger Visual Interactive Banner
  const alertBanner = document.createElement('div');
  alertBanner.style.position = 'fixed';
  alertBanner.style.bottom = '20px';
  alertBanner.style.right = '20px';
  alertBanner.style.background = '#1e293b';
  alertBanner.style.color = '#ffffff';
  alertBanner.style.padding = '18px 24px';
  alertBanner.style.borderRadius = '14px';
  alertBanner.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
  alertBanner.style.zIndex = '9999';
  alertBanner.style.borderLeft = '5px solid #10b981';
  alertBanner.style.maxWidth = '380px';
  alertBanner.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
      <span style="color:#10b981; font-weight:800; font-size:13px;"><i class="fa-solid fa-phone-volume fa-bounce"></i> অটোমেটিক টিচার স্মার্ট কল সিমুলেটর</span>
      <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">&times;</button>
    </div>
    <div style="font-size:13px; margin-bottom:6px;"><strong>প্রাপক:</strong> ${teacherName} (${phone})</div>
    <div style="font-size:12px; color:#cbd5e1; background:rgba(255,255,255,0.08); padding:8px; border-radius:6px; font-style:italic;">
      "${messageText}"
    </div>
    <div style="margin-top:10px; font-size:11px; color:#10b981; font-weight:700;">
      📲 SMS প্রদেয়: [সফলভাবে প্রেক্ষিত] | 📞 ভয়েস রিডিং: [সক্রিয়]
    </div>
  `;
  document.body.appendChild(alertBanner);

  // 2. Play Audio Speech Synthesis Voice Alert (Functional Voice Reminding)
  if (isWebSpeechAvailable) {
    window.speechSynthesis.cancel(); // Reset any previous audio
    const speech = new SpeechSynthesisUtterance(messageText);
    speech.lang = 'bn-BD'; // Bengali language voice synthesis
    speech.rate = 0.9;
    speech.pitch = 1.0;
    window.speechSynthesis.speak(speech);
  }

  setTimeout(() => {
    if (alertBanner.parentElement) alertBanner.remove();
  }, 12000);
}

// REAL-TIME AUTOMATED BACKGROUND SCHEDULE MONITOR (EVERY 10 SECONDS)
let triggeredAlertsCache = {};

function checkRoutineScheduleAlerts() {
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();

  classData.routines.forEach(r => {
    if (!r.time) return;
    
    // Parse time string e.g. "06:30 PM" or "১০:০০ - ১০:৪৫ AM"
    const timeMatch = r.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!timeMatch) return;

    let h = parseInt(timeMatch[1], 10);
    let m = parseInt(timeMatch[2], 10);
    const ampm = timeMatch[3] ? timeMatch[3].toUpperCase() : '';

    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;

    const alertMinutesBefore = parseInt(r.alertTime || '10', 10);
    
    // Target alert time
    let targetAlertMinutes = (h * 60 + m) - alertMinutesBefore;
    if (targetAlertMinutes < 0) targetAlertMinutes += 24 * 60;

    const nowTotalMinutes = currentHours * 60 + currentMinutes;

    // Check if current time matches target alert time window (within 2 mins)
    const diff = Math.abs(nowTotalMinutes - targetAlertMinutes);
    const cacheKey = `${r.id}_${now.toDateString()}_${h}_${m}`;

    if (diff <= 1 && !triggeredAlertsCache[cacheKey]) {
      triggeredAlertsCache[cacheKey] = true;
      triggerTestTeacherAlert(
        r.teacher || 'শিক্ষক',
        r.phone || '01700000000',
        r.subject || 'বিষয়',
        r.time,
        r.room || '১০২'
      );
    }
  });
}

function deleteRoutine(id) {
  if (confirm('আপনি কি এই রুটিন পিরিয়ড কার্ডটি মুছে ফেলতে চান?')) {
    classData.routines = classData.routines.filter(r => r.id !== id);
    saveStorage();
    renderRoutine('রবিবার');
    renderOverview();
  }
}

// SYLLABUS MODAL & EDIT WITH ACADEMIC MASTER PLAN FIELDS
function openAddSyllabusModal() {
  editingSyllabusId = null;
  document.querySelector('#syllabus-modal h3').innerHTML = '<i class="fa-solid fa-book-bookmark text-purple"></i> নতুন সিলেবাস ও লেসন প্ল্যান যোগ';
  if (document.getElementById('ms-subject')) document.getElementById('ms-subject').value = 'গণিত';
  if (document.getElementById('ms-subject-code')) document.getElementById('ms-subject-code').value = '১০৯';
  if (document.getElementById('ms-chapter')) document.getElementById('ms-chapter').value = '';
  if (document.getElementById('ms-weekly-plan')) document.getElementById('ms-weekly-plan').value = '';
  if (document.getElementById('ms-periods')) document.getElementById('ms-periods').value = '৬';
  if (document.getElementById('ms-ref-books')) document.getElementById('ms-ref-books').value = 'NCTB বোর্ড বই ও ল্যাব প্র্যাকটিক্যাল গাইড';
  if (document.getElementById('ms-target')) document.getElementById('ms-target').value = '';
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function editSyllabus(id) {
  const item = classData.syllabuses.find(s => s.id === id);
  if (!item) return;
  editingSyllabusId = id;
  document.querySelector('#syllabus-modal h3').innerHTML = '<i class="fa-solid fa-pen-to-square text-purple"></i> সিলেবাস ও ১২ মাসের মাস্টার প্ল্যান সম্পাদনা';
  document.getElementById('ms-timeframe').value = item.timeframe || 'today';
  if (document.getElementById('ms-subject')) document.getElementById('ms-subject').value = item.subject || 'গণিত';
  if (document.getElementById('ms-subject-code')) document.getElementById('ms-subject-code').value = item.subjectCode || '১০৯';
  
  // Set multi-selected chapters
  const chapterSelect = document.getElementById('ms-chapter');
  if (chapterSelect) {
    const selectedList = Array.isArray(item.chapters) ? item.chapters : [item.chapter];
    Array.from(chapterSelect.options).forEach(opt => {
      opt.selected = selectedList.includes(opt.value);
    });
  }

  if (document.getElementById('ms-working-days')) document.getElementById('ms-working-days').value = item.workingDays || '১৮০টি মোট কার্যদিবস (বছরে)';
  if (document.getElementById('ms-holidays')) document.getElementById('ms-holidays').value = item.holidays || '৮৫ দিন মোট ছুটি (সরকারি ও উৎসব)';
  if (document.getElementById('ms-weekly-plan')) document.getElementById('ms-weekly-plan').value = item.weeklyPlan || '';
  if (document.getElementById('ms-periods')) document.getElementById('ms-periods').value = item.periodsNeeded || '৬';
  if (document.getElementById('ms-start-date')) document.getElementById('ms-start-date').value = item.startDate || '2026-07-25';
  if (document.getElementById('ms-start-time')) document.getElementById('ms-start-time').value = item.startTime || '০৯:০০ AM';
  if (document.getElementById('ms-duration')) document.getElementById('ms-duration').value = item.duration || '১ ঘণ্টা';
  if (document.getElementById('ms-next-class')) document.getElementById('ms-next-class').value = item.nextClass || 'পরবর্তী বিষয়: বিজ্ঞান (১০:০০ AM - ১১:০০ AM)';
  if (document.getElementById('ms-ref-books')) document.getElementById('ms-ref-books').value = item.refBooks || '';
  document.getElementById('ms-target').value = item.target || '';
  document.getElementById('syllabus-modal').classList.remove('hidden');
}

function closeSyllabusModal() { document.getElementById('syllabus-modal').classList.add('hidden'); }

function saveSyllabusModal(e) {
  e.preventDefault();
  const timeframe = document.getElementById('ms-timeframe').value;
  const subject = document.getElementById('ms-subject').value;
  const subjectCode = document.getElementById('ms-subject-code')?.value || '১০৯';
  
  // Extract all multi-selected chapters
  const chapterSelect = document.getElementById('ms-chapter');
  const selectedChapters = chapterSelect ? Array.from(chapterSelect.selectedOptions).map(opt => opt.value) : ['অধ্যায় ১: বীজগণিতীয় রাশি ও সূত্র'];
  const primaryChapter = selectedChapters.join(', ');

  const workingDays = document.getElementById('ms-working-days')?.value || '১৮০টি মোট কার্যদিবস (বছরে)';
  const holidays = document.getElementById('ms-holidays')?.value || '৮৫ দিন মোট ছুটি (সরকারি ও উৎসব)';
  const weeklyPlan = document.getElementById('ms-weekly-plan')?.value || '১২ মাসের বিষয়ভিত্তিক রোডম্যাপ';
  const periodsNeeded = document.getElementById('ms-periods')?.value || '৬';
  const startDate = document.getElementById('ms-start-date')?.value || '২০২৬-০৭-২৫';
  const startTime = document.getElementById('ms-start-time')?.value || '০৯:০০ AM';
  const duration = document.getElementById('ms-duration')?.value || '১ ঘণ্টা';
  const nextClass = document.getElementById('ms-next-class')?.value || 'পরবর্তী বিষয়: বিজ্ঞান (১০:০০ AM - ১১:০০ AM)';
  const refBooks = document.getElementById('ms-ref-books')?.value || 'NCTB বোর্ড বই';
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
      item.subjectCode = subjectCode;
      item.chapter = primaryChapter;
      item.chapters = selectedChapters;
      item.workingDays = workingDays;
      item.holidays = holidays;
      item.weeklyPlan = weeklyPlan;
      item.periodsNeeded = periodsNeeded;
      item.startDate = startDate;
      item.startTime = startTime;
      item.duration = duration;
      item.nextClass = nextClass;
      item.refBooks = refBooks;
      item.target = target;
    }
  } else {
    classData.syllabuses.push({
      id: Date.now(),
      timeframe,
      timeframeLabel: tfLabels[timeframe] || timeframe,
      subject,
      subjectCode,
      chapter: primaryChapter,
      chapters: selectedChapters,
      workingDays,
      holidays,
      weeklyPlan,
      periodsNeeded,
      startDate,
      startTime,
      duration,
      nextClass,
      refBooks,
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

// AUTOMATIC SUBJECT CODE AUTO-FILLER
function autoFillSubjectCode(subject) {
  const codeMap = {
    'গণিত': '১০৯', 'বাংলা': '১০১', 'ইংরেজি': '১০৭', 'বিজ্ঞান': '১২৭',
    'ডিজিটাল প্রযুক্তি': '১৩১', 'ইতিহাস ও সামাজিক বিজ্ঞান': '১৫০',
    'পদার্থবিজ্ঞান': '১৩৬', 'রসায়ন': '১৩৭', 'জীববিজ্ঞান': '১৩৮',
    'উচ্চতর গণিত': '১২৬', 'হিসাববিজ্ঞান': '১৪৬', 'ব্যবসায় উদ্যোগ': '১৪৩'
  };
  const codeSelect = document.getElementById('ms-subject-code');
  if (codeSelect && codeMap[subject]) {
    codeSelect.value = codeMap[subject];
  }
}

// INITIALIZATION & GLOBAL ESC KEY LISTENER FOR BACK NAVIGATION / MODAL CLOSE
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  showSection('overview');
  
  // Start automated background schedule monitor (runs every 5 seconds)
  checkRoutineScheduleAlerts();
  setInterval(checkRoutineScheduleAlerts, 5000);
});

// ESC KEY HANDLER: ESC PRESS CLOSES OPEN MODALS OR NAVIGATES BACK
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    // Check if any modal is currently visible
    const routineModal = document.getElementById('routine-modal');
    const syllabusModal = document.getElementById('syllabus-modal');
    const examModal = document.getElementById('exam-modal');

    let modalClosed = false;

    if (routineModal && !routineModal.classList.contains('hidden')) {
      closeRoutineModal();
      modalClosed = true;
    }
    if (syllabusModal && !syllabusModal.classList.contains('hidden')) {
      closeSyllabusModal();
      modalClosed = true;
    }
    if (examModal && !examModal.classList.contains('hidden')) {
      closeExamModal();
      modalClosed = true;
    }

    // If no modal was open, ESC key navigates back to main home/overview
    if (!modalClosed) {
      const activeNav = document.querySelector('.nav-item.active');
      const activeSectionId = activeNav ? activeNav.id.replace('nav-', '') : 'overview';
      if (activeSectionId !== 'overview') {
        showSection('overview');
      } else {
        goHome();
      }
    }
  }
});
