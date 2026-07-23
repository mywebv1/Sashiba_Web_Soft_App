/* ==========================================================================
   SashiBa Student Portal Master JavaScript Engine (v5.0 - Beautified Practice)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. STATE MANAGEMENT =================
  const state = {
    currentLevel: 'ssc',
    currentView: 'home',
    activeSubject: 'physics',
    activeChapter: 3,
    activeSubjectTab: 'overview',
    theme: localStorage.getItem('sashiba_theme') || 'light',
    blueLightShield: false,
    fontScale: 1,

    // Student XP & Level State
    xp: 2450,
    level: 12,
    coins: 1250,
    completedGoals: 3,
    totalGoals: 5,

    // Pomodoro State
    pomoTimeRemaining: 25 * 60,
    pomoTotalTime: 25 * 60,
    pomoInterval: null,
    isPomoRunning: false,
    ambientSound: 'off',

    // Daily Quotes
    quotes: [
      '"জ্ঞান অর্জনের কোনো বিকল্প নেই, আজকের পরিশ্রমই আগামীকালের সাফল্যের ভিত্তি।"',
      '"কঠিন অধ্যবসায় ও ধারাবাহিকতাই সফলতার মূল চাবিকাঠি।"',
      '"প্রতিটি ছোট প্র্যাকটিসই আপনাকে চূড়ান্ত পরীক্ষার কাছাকাছি নিয়ে যায়।"',
      '"যদি আপনি স্বপ্ন দেখতে পারেন, তবে আপনি তা বাস্তবায়নও করতে পারেন।"'
    ],
    quoteIndex: 0,

    // Chat History per Chapter
    chapterDiscussions: {
      physics: [
        { sender: 'সাদিয়া সুলতানা', text: 'নিউটনের ২য় সূত্রের $F=ma$ ম্যাথটিতে $a$ কিভাবে বের করতে হয় কেউ একটু বুঝিয়ে বলবে?', time: '১০:১৫ AM', isMe: false },
        { sender: 'আরিফ আহমেদ', text: 'প্রথমে ভরবেগের পরিবর্তন $\\Delta p$ কে সময় $t$ দিয়ে ভাগ করতে হবে!', time: '১০:১৮ AM', isMe: false },
        { sender: 'রাহাত খান (আপনি)', text: 'হ্যাঁ, বল $F = m \\times \\frac{v - u}{t}$ সূত্রও ব্যবহার করা যাবে।', time: '১০:২০ AM', isMe: true }
      ]
    }
  };

  // SUBJECT DATASETS BY ACADEMIC LEVEL
  const subjectData = {
    ssc: [
      { id: 'physics', name: 'পদার্থবিজ্ঞান', code: '১৭৪', category: 'science', progress: 75, nextLesson: 'অধ্যায় ৩: বল (Force)', color: '#4f46e5', icon: 'fa-atom' },
      { id: 'hmath', name: 'উচ্চতর গণিত', code: '১২৬', category: 'science', progress: 90, nextLesson: 'অধ্যায় ৭: ত্রিকোণমিতি', color: '#7c3aed', icon: 'fa-calculator' },
      { id: 'chemistry', name: 'রসায়ন', code: '১৭৬', category: 'science', progress: 60, nextLesson: 'অধ্যায় ৪: পর্যায় সারণি', color: '#059669', icon: 'fa-flask' },
      { id: 'biology', name: 'জীববিজ্ঞান', code: '১৭৮', category: 'science', progress: 45, nextLesson: 'অধ্যায় ৫: খাদ্য ও পরিপাক', color: '#d97706', icon: 'fa-dna' },
      { id: 'ict', name: 'তথ্য ও যোগাযোগ প্রযুক্তি', code: '১৫৪', category: 'general', progress: 95, nextLesson: 'অধ্যায় ৩: সংখ্যা পদ্ধতি', color: '#0891b2', icon: 'fa-laptop-code' },
      { id: 'bangla', name: 'বাংলা ১ম ও ২য় পত্র', code: '১০১', category: 'general', progress: 80, nextLesson: 'সমাস ও কারক', color: '#e11d48', icon: 'fa-book-bookmark' },
      { id: 'english', name: 'English Grammar', code: '১০৭', category: 'general', progress: 85, nextLesson: 'Transformation of Sentences', color: '#2563eb', icon: 'fa-language' }
    ]
  };

  // AUTO SUGGESTED TOPICS BY CHAPTER
  const autoSuggestedTopics = {
    physics: [
      { tag: 'নিউটনের ২য় গতিসূত্র ($F = ma$)', hot: true },
      { tag: 'ভরবেগের সংরক্ষণ সূত্র', hot: false },
      { tag: 'ঘর্ষণ বল ও ঘর্ষণ গুণাঙ্ক', hot: true },
      { tag: 'মাত্রা ও একক নির্ণয়', hot: false }
    ],
    chemistry: [
      { tag: 'পর্যায় সারণির ইলেকট্রন বিন্যাস', hot: true },
      { tag: 'জারণ-বিজারণ সমতাকরণ', hot: true },
      { tag: 'মোল ও মোলার আয়তন', hot: false }
    ]
  };

  // ================= 2. INITIALIZATION =================
  initTheme();
  initNavigation();
  initLevelSelector();
  initDashboardEvents();
  initSubjectWorkspace();
  initPracticeLab();
  initExamPrep();
  initPomodoroTimer();
  initAiAssistant();
  initSettings();

  // ================= 3. THEME & EYE CARE ENGINE =================
  function initTheme() {
    document.body.className = `mode-${state.theme}`;
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    if (state.theme === 'light') icon.className = 'fa-solid fa-sun';
    else if (state.theme === 'sepia') icon.className = 'fa-solid fa-book-open-reader';
    else icon.className = 'fa-solid fa-moon';
  }

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    if (state.theme === 'light') state.theme = 'sepia';
    else if (state.theme === 'sepia') state.theme = 'dark';
    else state.theme = 'light';

    localStorage.setItem('sashiba_theme', state.theme);
    initTheme();
  });

  const blueLightShield = document.getElementById('blueLightOverlay');
  document.getElementById('blueLightToggleBtn')?.addEventListener('click', () => {
    state.blueLightShield = !state.blueLightShield;
    if (state.blueLightShield) blueLightShield?.classList.add('active');
    else blueLightShield?.classList.remove('active');
  });

  // ================= 4. NAVIGATION ENGINE =================
  function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const view = item.getAttribute('data-view');
        if (view) switchView(view);
      });
    });

    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('active');
    });
  }

  window.switchView = function(viewName) {
    state.currentView = viewName;
    
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) targetPanel.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(nav => {
      if (nav.getAttribute('data-view') === viewName) nav.classList.add('active');
      else nav.classList.remove('active');
    });

    if (viewName === 'subjects') renderSubjectsGrid();
  };

  // ================= 5. GOAL TICK & XP REWARD SYSTEM =================
  window.toggleGoalItem = function(checkbox, xpAmount) {
    const label = checkbox.closest('.goal-item');
    if (checkbox.checked) {
      label.classList.add('done');
      state.xp += xpAmount;
      state.completedGoals = Math.min(state.totalGoals, state.completedGoals + 1);
      showXpToast(`+${xpAmount} XP অর্জিত!`, 'আজকের লক্ষ্য পূরণের জন্য চমৎকার কাজ!');
    } else {
      label.classList.remove('done');
      state.xp = Math.max(0, state.xp - xpAmount);
      state.completedGoals = Math.max(0, state.completedGoals - 1);
    }
    updateXpDisplay();
  };

  function showXpToast(title, subtitle) {
    const toast = document.getElementById('xpRewardToast');
    if (!toast) return;
    toast.querySelector('.xp-title').textContent = title;
    toast.querySelector('.xp-sub').textContent = subtitle;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function updateXpDisplay() {
    const sidebarXp = document.getElementById('sidebarXp');
    const xpVal = document.getElementById('xpVal');
    const goalText = document.getElementById('goalProgressText');
    const goalBadge = document.getElementById('goalPercentBadge');

    if (sidebarXp) sidebarXp.textContent = state.xp.toLocaleString();
    if (xpVal) xpVal.textContent = `XP: ${state.xp.toLocaleString()}`;
    if (goalText) goalText.textContent = `${state.completedGoals}/${state.totalGoals}`;
    if (goalBadge) {
      const pct = Math.round((state.completedGoals / state.totalGoals) * 100);
      goalBadge.textContent = `${pct}% সম্পন্ন`;
    }
  }

  // ================= 6. CLASS LEVEL SELECTOR =================
  function initLevelSelector() {
    const levelPills = document.querySelectorAll('.level-pill');
    levelPills.forEach(pill => {
      pill.addEventListener('click', () => {
        levelPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.currentLevel = pill.getAttribute('data-level');
        if (state.currentView === 'subjects') renderSubjectsGrid();
      });
    });
  }

  // ================= 7. DASHBOARD & MOTIVATIONAL QUOTES =================
  function initDashboardEvents() {
    document.getElementById('nextQuoteBtn')?.addEventListener('click', () => {
      state.quoteIndex = (state.quoteIndex + 1) % state.quotes.length;
      const quoteEl = document.getElementById('dailyQuote');
      if (quoteEl) quoteEl.textContent = state.quotes[state.quoteIndex];
    });
  }

  // ================= 8. MY SUBJECTS & WORKSPACE =================
  function renderSubjectsGrid() {
    const grid = document.getElementById('subjectsGrid');
    if (!grid) return;

    const subjects = subjectData.ssc;
    grid.innerHTML = subjects.map(sub => `
      <div class="subject-card">
        <div class="subject-card-header">
          <div class="subject-icon" style="background: ${sub.color}">
            <i class="fa-solid ${sub.icon}"></i>
          </div>
          <div class="subject-info">
            <h3>${sub.name}</h3>
            <p>বিষয় কোড: ${sub.code}</p>
          </div>
        </div>
        <div class="subject-progress-bar">
          <div class="p-bar-track">
            <div class="p-bar-fill" style="width: ${sub.progress}%; background: ${sub.color}"></div>
          </div>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">অগ্রগতি: ${sub.progress}%</span>
        </div>
        <p style="font-size: 0.8rem; font-weight: 600;"><strong>পরবর্তী পড়া:</strong> ${sub.nextLesson}</p>
        <button class="btn-primary btn-block" onclick="openSubjectWorkspace('${sub.id}')">
          <i class="fa-solid fa-folder-open"></i> অধ্যায়ে প্রবেশ করুন
        </button>
      </div>
    `).join('');
  }

  window.openSubjectWorkspace = function(subjId) {
    state.activeSubject = subjId;
    switchView('subject-inner');
    renderSubjectWorkspaceContent();
  };

  function initSubjectWorkspace() {
    document.getElementById('backToSubjectsBtn')?.addEventListener('click', () => {
      switchView('subjects');
    });

    const subjNavItems = document.querySelectorAll('.subj-nav-item');
    subjNavItems.forEach(item => {
      item.addEventListener('click', () => {
        subjNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        state.activeSubjectTab = item.getAttribute('data-tab');
        renderSubjectWorkspaceContent();
      });
    });
  }

  function renderSubjectWorkspaceContent() {
    const tagsContainer = document.getElementById('autoSuggestedTags');
    const contentArea = document.getElementById('subjTabContent');
    const activeSubjObj = subjectData.ssc.find(s => s.id === state.activeSubject) || subjectData.ssc[0];

    document.getElementById('activeSubjectTitle').textContent = activeSubjObj.name;
    document.getElementById('activeSubjectCode').textContent = `কোড: ${activeSubjObj.code}`;
    document.getElementById('activeSubjectProgressText').textContent = `${activeSubjObj.progress}%`;

    const topics = autoSuggestedTopics[state.activeSubject] || autoSuggestedTopics.physics;
    if (tagsContainer) {
      tagsContainer.innerHTML = topics.map(t => `
        <span class="ast-tag ${t.hot ? 'hot' : ''}">
          <i class="fa-solid ${t.hot ? 'fa-fire' : 'fa-star'}"></i> ${t.tag}
        </span>
      `).join('');
    }

    if (!contentArea) return;

    if (state.activeSubjectTab === 'discussion') {
      renderChapterDiscussionChat(contentArea);
    } else {
      contentArea.innerHTML = `
        <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
          <h3 style="margin-bottom: 1rem;"><i class="fa-solid fa-book text-primary"></i> ${activeSubjObj.name} - অধ্যায় ৩: বল (Force) ও নিউটনের গতিসূত্র</h3>
          <p style="margin-bottom: 1.25rem; color: var(--text-secondary);">যেসব বিষয় যা কোনো বস্তুর ওপর ক্রিয়া করে তার গতির দিক বা অবস্থার পরিবর্তন ঘটায় তাকে বল (Force) বলে। নিউটনের দ্বিতীয় গতিসূত্র অনুযায়ী, বস্তুর ভরবেগের পরিবর্তনের হার তার ওপর প্রযুক্ত বলের সমানুপাতিক।</p>
          <div style="background: var(--bg-input); padding: 1rem; border-radius: var(--radius-md); font-family: monospace; font-size: 1.1rem; margin-bottom: 1.5rem;">
            $$F = m \\times a$$
          </div>
          <button class="btn-primary" onclick="switchView('practice')"><i class="fa-solid fa-pen-clip"></i> এই অধ্যায়ের প্র্যাকটিস সেশন শুরু করুন</button>
        </div>
      `;
    }
  }

  // CHAPTER DISCUSSION CHAT ENGINE
  function renderChapterDiscussionChat(container) {
    const chatList = state.chapterDiscussions[state.activeSubject] || state.chapterDiscussions.physics;
    
    container.innerHTML = `
      <div class="chapter-chat-box">
        <div class="chat-header">
          <i class="fa-solid fa-comments text-primary"></i> 
          <span>অধ্যায়ভিত্তিক যৌথ আলোচনা ও চ্যাট রুম (সহপাঠীদের সাথে)</span>
        </div>
        <div class="chat-messages" id="chapterChatMsgBox">
          ${chatList.map(msg => `
            <div class="chat-msg ${msg.isMe ? 'student-msg' : ''}">
              <div class="msg-avatar">${msg.isMe ? 'র' : msg.sender[0]}</div>
              <div class="msg-body">
                <strong style="display: block; font-size: 0.75rem; margin-bottom: 0.2rem;">${msg.sender} • ${msg.time}</strong>
                <p>${msg.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input-area">
          <input type="text" id="chapterChatInput" placeholder="অধ্যায়ের যেকোনো প্রশ্ন বা মতামত লিখুন...">
          <button class="btn-primary" id="sendChapterChatBtn"><i class="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
    `;

    document.getElementById('sendChapterChatBtn')?.addEventListener('click', sendChapterMessage);
    document.getElementById('chapterChatInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChapterMessage();
    });
  }

  function sendChapterMessage() {
    const input = document.getElementById('chapterChatInput');
    if (!input || !input.value.trim()) return;

    const newMsg = {
      sender: 'রাহাত খান (আপনি)',
      text: input.value.trim(),
      time: 'এখন',
      isMe: true
    };

    if (!state.chapterDiscussions[state.activeSubject]) {
      state.chapterDiscussions[state.activeSubject] = [];
    }
    state.chapterDiscussions[state.activeSubject].push(newMsg);
    input.value = '';

    const container = document.getElementById('subjTabContent');
    renderChapterDiscussionChat(container);

    setTimeout(() => {
      state.chapterDiscussions[state.activeSubject].push({
        sender: 'আরিফ আহমেদ',
        text: 'দারুণ একটি পয়েন্ট তুলে ধরেছ রাহাত! চমৎকার ব্যাখ্যা।',
        time: 'এখন',
        isMe: false
      });
      if (state.activeSubjectTab === 'discussion') {
        renderChapterDiscussionChat(container);
      }
    }, 2000);
  }

  // ================= 9. PRACTICE LAB & GENERATIVE AI QUIZ ENGINE =================
  function initPracticeLab() {
    renderDefaultPracticeQuestions();

    document.getElementById('generateAiQuizBtn')?.addEventListener('click', generateAiQuizQuestions);

    const catCards = document.querySelectorAll('.p-cat-card');
    catCards.forEach(card => {
      card.addEventListener('click', () => {
        catCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const ptype = card.getAttribute('data-ptype');
        filterPracticeCategory(ptype);
      });
    });
  }

  function filterPracticeCategory(ptype) {
    const container = document.getElementById('practiceContainer');
    if (!container) return;

    showXpToast(`🎯 ${ptype.toUpperCase()} ক্যাটাগরি ফিল্টার করা হয়েছে`, 'নিচের প্রশ্নগুলোর অনুশীলন শুরু করুন!');
    renderDefaultPracticeQuestions();
  }

  function renderDefaultPracticeQuestions() {
    const container = document.getElementById('practiceContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="question-card">
        <div class="q-header">
          <span>প্রশ্ন ১: ৫ কেজি ভরের বস্তুর ওপর ১০ নিউটন বল প্রয়োগ করা হলে ত্বরণ কত হবে?</span>
          <span class="badge-pill">পদার্থবিজ্ঞান</span>
        </div>
        <div class="q-options">
          <div class="q-option" onclick="checkAnswer(this, false)">ক) ১ $m/s^2$</div>
          <div class="q-option" onclick="checkAnswer(this, true)">খ) ২ $m/s^2$ (সঠিক উত্তর)</div>
          <div class="q-option" onclick="checkAnswer(this, false)">গ) ৩ $m/s^2$</div>
          <div class="q-option" onclick="checkAnswer(this, false)">ঘ) ৫০ $m/s^2$</div>
        </div>
        <div class="q-actions-bar">
          <button class="btn-outline-sm" onclick="toggleAccordion('hint-1')"><i class="fa-solid fa-lightbulb text-warning"></i> Hint (ইঙ্গিত)</button>
          <button class="btn-outline-sm" onclick="toggleAccordion('exp-1')"><i class="fa-solid fa-book-open text-primary"></i> Explanation</button>
          <button class="btn-outline-sm" onclick="toggleAccordion('sol-1')"><i class="fa-solid fa-user-ninja text-success"></i> Teacher Solution</button>
        </div>
        
        <div id="hint-1" class="q-accordion-content">
          <strong>💡 ইঙ্গিত:</strong> নিউটনের দ্বিতীয় সূত্র $F = ma$ ব্যবহার করুন। এখানে $F = 10N$ এবং $m = 5kg$।
        </div>
        <div id="exp-1" class="q-accordion-content">
          <strong>📖 ব্যাখ্যা:</strong> সূত্রানুসারে $a = \\frac{F}{m} = \\frac{10}{5} = 2 m/s^2$।
        </div>
        <div id="sol-1" class="q-accordion-content">
          <strong>👨‍🏫 শিক্ষকের সমাধান:</strong> সঠিক উত্তর (খ)। সরল সমীকরণ সরাসরি প্রয়োগ যোগ্য।
        </div>
      </div>
    `;
  }

  // GENERATIVE AI QUIZ GENERATOR FUNCTION
  function generateAiQuizQuestions() {
    const classVal = document.getElementById('aiQuizClass').value;
    const subjVal = document.getElementById('aiQuizSubject').value;
    const topicVal = document.getElementById('aiQuizTopic').value || 'সাধারণ সিলেবাস';
    const typeVal = document.getElementById('aiQuizType').value;
    const countVal = parseInt(document.getElementById('aiQuizCount').value, 10);

    const container = document.getElementById('practiceContainer');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 2rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 2px dashed var(--primary); box-shadow: var(--shadow-md);">
        <i class="fa-solid fa-wand-magic-sparkles fa-spin text-primary" style="font-size: 3.5rem; margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 900;">✨ Gemini AI আপনার জন্য ${countVal}টি কাস্টম কুইজ তৈরি করছে...</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.4rem;">শ্রেণি: ${classVal.toUpperCase()} | বিষয়: ${subjVal.toUpperCase()} | টপিক: "${topicVal}"</p>
      </div>
    `;

    setTimeout(() => {
      let generatedHtml = '';

      for (let i = 1; i <= countVal; i++) {
        if (typeVal === 'mcq') {
          generatedHtml += `
            <div class="question-card">
              <div class="q-header">
                <span>প্রশ্ন ${i}: ${topicVal} সম্পর্কিত বহুনির্বাচনী প্রশ্ন #${i}</span>
                <span class="badge-pill">${subjVal.toUpperCase()} • MCQ</span>
              </div>
              <div class="q-options">
                <div class="q-option" onclick="checkAnswer(this, false)"><i class="fa-regular fa-circle"></i> ক) বিকল্প উত্তর A</div>
                <div class="q-option" onclick="checkAnswer(this, true)"><i class="fa-regular fa-circle"></i> খ) সঠিক বিকল্প B (Gemini AI Verified)</div>
                <div class="q-option" onclick="checkAnswer(this, false)"><i class="fa-regular fa-circle"></i> গ) বিকল্প উত্তর C</div>
                <div class="q-option" onclick="checkAnswer(this, false)"><i class="fa-regular fa-circle"></i> ঘ) বিকল্প উত্তর D</div>
              </div>
              <div class="q-actions-bar">
                <button class="btn-outline-sm" onclick="toggleAccordion('ai-hint-${i}')"><i class="fa-solid fa-lightbulb text-warning"></i> AI Hint</button>
                <button class="btn-outline-sm" onclick="toggleAccordion('ai-exp-${i}')"><i class="fa-solid fa-book-open text-primary"></i> AI Explanation</button>
              </div>
              <div id="ai-hint-${i}" class="q-accordion-content">
                <strong>💡 Gemini Hint:</strong> মূল সূত্রের গাণিতিক সম্পর্কটি মনে করার চেষ্টা করুন।
              </div>
              <div id="ai-exp-${i}" class="q-accordion-content">
                <strong>📖 Gemini Explanation:</strong> সঠিক উত্তর (খ)। কারণ এটি অধ্যায়ের মূল সূত্রের সাথে পুরোপুরি সামঞ্জস্যপূর্ণ।
              </div>
            </div>
          `;
        } else if (typeVal === 'one-word') {
          generatedHtml += `
            <div class="question-card">
              <div class="q-header">
                <span>প্রশ্ন ${i}: ${topicVal} এর একক বা মূল সংজ্ঞার নাম কী?</span>
                <span class="badge-pill">${subjVal.toUpperCase()} • এক কথায় উত্তর</span>
              </div>
              <div class="written-answer-box">
                <input type="text" id="shortAnsInput_${i}" class="form-control" placeholder="এখানে আপনার উত্তর এক কথায় লিখুন...">
                <button class="btn-primary btn-sm" onclick="checkShortAnswer(${i}, 'নিউটন')"><i class="fa-solid fa-check"></i> উত্তর মেলান</button>
              </div>
              <div id="shortAnsFeedback_${i}"></div>
            </div>
          `;
        } else {
          generatedHtml += `
            <div class="question-card">
              <div class="q-header">
                <span>প্রশ্ন ${i}: ${topicVal} এর মূল নীতিটি সংক্ষেপে ব্যাখ্যা করো এবং একটি বাস্তব উদাহরণ দাও।</span>
                <span class="badge-pill">${subjVal.toUpperCase()} • ${typeVal.toUpperCase()}</span>
              </div>
              <div class="written-answer-box">
                <textarea id="writtenInput_${i}" class="written-textarea" placeholder="আপনার বিস্তারিত উত্তর বা ব্যাখ্যা এখানে লিখুন..."></textarea>
                <button class="btn-primary" onclick="evaluateWrittenAnswerWithAi(${i})">
                  <i class="fa-solid fa-robot"></i> 🤖 AI দ্বারা আমার উত্তর মূল্যায়ন করুন (Evaluate Answer)
                </button>
              </div>
              <div id="aiEvalResult_${i}"></div>
            </div>
          `;
        }
      }

      container.innerHTML = generatedHtml;
      showXpToast('✨ AI কুইজ সফলভাবে জেনারেট হয়েছে!', `${countVal}টি প্রশ্ন তৈরি করা হয়েছে। পরীক্ষা দিন!`);
    }, 1500);
  }

  window.checkShortAnswer = function(qId, correctAnswer) {
    const input = document.getElementById(`shortAnsInput_${qId}`);
    const feedback = document.getElementById(`shortAnsFeedback_${qId}`);
    if (!input || !feedback) return;

    if (input.value.trim().length > 0) {
      feedback.innerHTML = `
        <div class="ai-eval-result-card">
          <div class="ai-eval-header">
            <span><i class="fa-solid fa-circle-check"></i> উত্তর যাচাই সম্পন্ন</span>
          </div>
          <p><strong>আপনার উত্তর:</strong> "${input.value.trim()}"</p>
          <p><strong>সঠিক উত্তর:</strong> "${correctAnswer}"</p>
        </div>
      `;
      showXpToast('+১৫ XP', 'এক কথায় উত্তর সম্পন্ন হয়েছে!');
      state.xp += 15;
      updateXpDisplay();
    }
  };

  window.evaluateWrittenAnswerWithAi = function(qId) {
    const textarea = document.getElementById(`writtenInput_${qId}`);
    const resultBox = document.getElementById(`aiEvalResult_${qId}`);
    if (!textarea || !resultBox) return;

    if (!textarea.value.trim()) {
      alert('অনুগ্রহ করে উত্তরের ঘরে কিছু লিখুন!');
      return;
    }

    resultBox.innerHTML = `
      <div style="padding: 1rem; color: var(--primary); font-weight: 700;">
        <i class="fa-solid fa-robot fa-spin"></i> Gemini AI আপনার উত্তরটি মূল্যায়ন করছে...
      </div>
    `;

    setTimeout(() => {
      resultBox.innerHTML = `
        <div class="ai-eval-result-card">
          <div class="ai-eval-header">
            <span><i class="fa-solid fa-award"></i> Gemini AI Evaluation Report: ৮.৫ / ১০</span>
            <span class="badge-pill">অসাধারণ প্রচেষ্টা!</span>
          </div>
          <p><strong>মূল্যায়ন সারসংক্ষেপ:</strong> আপনি অধ্যায়ের মূল নীতি ও সূত্রটি সঠিক লিখেছেন। তবে বাস্তব উদাহরণের ক্ষেত্রে এককের উল্লেখ যুক্ত করলে পূর্ণ ১০ নম্বর পেতেন।</p>
          <p style="color: var(--success); font-size: 0.8rem;"><strong>উপস্থিত কি-ওয়ার্ড:</strong> $F=ma$, গতিসূত্র, বল।</p>
        </div>
      `;
      showXpToast('+৩০ XP', 'AI উত্তর মূল্যায়ন সম্পন্ন হয়েছে!');
      state.xp += 30;
      updateXpDisplay();
    }, 1800);
  };

  window.checkAnswer = function(element, isCorrect) {
    const options = element.parentElement.querySelectorAll('.q-option');
    options.forEach(o => o.classList.remove('correct', 'wrong'));
    if (isCorrect) {
      element.classList.add('correct');
      showXpToast('+২০ XP', 'সঠিক উত্তর নির্বাচিত হয়েছে!');
      state.xp += 20;
      updateXpDisplay();
    } else {
      element.classList.add('wrong');
    }
  };

  window.toggleAccordion = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active');
  };

  // ================= 10. EXAM PREP ENGINE =================
  function initExamPrep() {
    renderExamsGrid();
  }

  function renderExamsGrid() {
    const grid = document.getElementById('examsGrid');
    if (!grid) return;

    grid.innerHTML = `
      <div class="exam-card">
        <h4>সাধারণ গণিত SSC পূর্ণাঙ্গ মডেল টেস্ট - ০০১</h4>
        <p style="font-size: 0.8rem; color: var(--text-muted);">মোট নম্বর: ৫০ | সময়: ৩০ মিনিট</p>
        <button class="btn-primary btn-block" onclick="startExamModal()"><i class="fa-solid fa-pen-to-square"></i> পরীক্ষা শুরু করুন</button>
      </div>
    `;
  }

  window.startExamModal = function() {
    document.getElementById('examModal')?.classList.add('active');
  };
  window.closeModal = function(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
  };

  document.getElementById('cancelExamBtn')?.addEventListener('click', () => closeModal('examModal'));
  document.getElementById('submitExamBtn')?.addEventListener('click', () => {
    closeModal('examModal');
    document.getElementById('examResultModal')?.classList.add('active');
  });

  // ================= 11. POMODORO & AMBIENT SOUND =================
  function initPomodoroTimer() {
    const pomoTimerDisplay = document.getElementById('pomoTimer');
    const timerDisplayMini = document.getElementById('timerDisplayMini');

    document.getElementById('pomoStartBtn')?.addEventListener('click', () => {
      if (state.isPomoRunning) {
        clearInterval(state.pomoInterval);
        state.isPomoRunning = false;
        document.getElementById('pomoStartBtn').innerHTML = '<i class="fa-solid fa-play"></i> শুরু করুন';
      } else {
        state.isPomoRunning = true;
        document.getElementById('pomoStartBtn').innerHTML = '<i class="fa-solid fa-pause"></i> বিরতি দিন';
        state.pomoInterval = setInterval(() => {
          if (state.pomoTimeRemaining > 0) {
            state.pomoTimeRemaining--;
            updateTimerDisplay();
          } else {
            clearInterval(state.pomoInterval);
            alert('🎉 পমোদোরো সেশন সফলভাবে সম্পন্ন হয়েছে!');
          }
        }, 1000);
      }
    });

    document.getElementById('pomoResetBtn')?.addEventListener('click', () => {
      clearInterval(state.pomoInterval);
      state.isPomoRunning = false;
      state.pomoTimeRemaining = state.pomoTotalTime;
      updateTimerDisplay();
      if (document.getElementById('pomoStartBtn')) {
        document.getElementById('pomoStartBtn').innerHTML = '<i class="fa-solid fa-play"></i> শুরু করুন';
      }
    });

    function updateTimerDisplay() {
      const mins = Math.floor(state.pomoTimeRemaining / 60).toString().padStart(2, '0');
      const secs = (state.pomoTimeRemaining % 60).toString().padStart(2, '0');
      const str = `${mins}:${secs}`;
      if (pomoTimerDisplay) pomoTimerDisplay.textContent = str;
      if (timerDisplayMini) timerDisplayMini.textContent = str;
      const focusClock = document.getElementById('focusTimerDisplay');
      if (focusClock) focusClock.textContent = str;
    }

    document.getElementById('launchFocusModeBtn')?.addEventListener('click', () => {
      document.getElementById('focusModeOverlay')?.classList.add('active');
    });
    document.getElementById('closeFocusModeBtn')?.addEventListener('click', () => {
      document.getElementById('focusModeOverlay')?.classList.remove('active');
    });
  }

  window.toggleAmbientSound = function(soundType, buttonEl) {
    document.querySelectorAll('.btn-sound-opt').forEach(b => b.classList.remove('active'));
    buttonEl.classList.add('active');
    state.ambientSound = soundType;
    if (soundType !== 'off') {
      showXpToast('🎧 ব্যাকগ্রাউন্ড সাউন্ড সক্রিয়', `${soundType.toUpperCase()} রিলেক্সিং ফোকাস সাউন্ড চলছে...`);
    }
  };

  // ================= 12. AI ASSISTANT =================
  function initAiAssistant() {
    document.getElementById('aiSendBtn')?.addEventListener('click', handleAiQuery);
    document.getElementById('quickAiBtn')?.addEventListener('click', () => {
      const val = document.getElementById('quickAiInput')?.value;
      if (val) {
        switchView('ai-assistant');
        setAiPrompt(val);
      }
    });
  }

  window.setAiPrompt = function(promptText) {
    const input = document.getElementById('aiChatInput');
    if (input) {
      input.value = promptText;
      handleAiQuery();
    }
  };

  function handleAiQuery() {
    const input = document.getElementById('aiChatInput');
    const msgBox = document.getElementById('aiChatMessages');
    if (!input || !input.value.trim() || !msgBox) return;

    const userText = input.value.trim();
    msgBox.innerHTML += `
      <div class="chat-msg student-msg">
        <div class="msg-avatar">র</div>
        <div class="msg-body"><p>${userText}</p></div>
      </div>
    `;
    input.value = '';

    setTimeout(() => {
      msgBox.innerHTML += `
        <div class="chat-msg ai-msg">
          <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="msg-body">
            <p><strong>SashiBa AI Tution Result:</strong></p>
            <p>"${userText}" প্রশ্নটির সহজ বিশ্লেষণ হলো: নিউটনের গতিসূত্র অনুসারে বল হলো বস্তুর ভর ও ত্বরণের গুণফল ($F = ma$)। নিয়মিত গাণিতিক অনুশীলনে এই টপিক সহজ হয়ে উঠবে।</p>
          </div>
        </div>
      `;
      msgBox.scrollTop = msgBox.scrollHeight;
    }, 1200);
  }

  // ================= 13. SETTINGS ENGINE =================
  function initSettings() {
    document.querySelectorAll('.theme-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.theme = btn.getAttribute('data-theme');
        localStorage.setItem('sashiba_theme', state.theme);
        initTheme();
      });
    });

    document.getElementById('fontIncBtn')?.addEventListener('click', () => {
      state.fontScale += 0.05;
      document.documentElement.style.setProperty('--font-scale', state.fontScale);
      document.getElementById('fontValDisplay').textContent = `${Math.round(state.fontScale * 100)}%`;
    });
    document.getElementById('fontDecBtn')?.addEventListener('click', () => {
      if (state.fontScale > 0.85) {
        state.fontScale -= 0.05;
        document.documentElement.style.setProperty('--font-scale', state.fontScale);
        document.getElementById('fontValDisplay').textContent = `${Math.round(state.fontScale * 100)}%`;
      }
    });
  }

});
