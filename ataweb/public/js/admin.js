document.addEventListener('DOMContentLoaded', () => {
  // Global States
  let adminPassword = sessionStorage.getItem('admin_pass') || '';
  let portfolioData = null;

  // DOM Elements - Auth & Layouts
  const authContainer = document.getElementById('authContainer');
  const adminLayout = document.getElementById('adminLayout');
  const loginForm = document.getElementById('loginForm');
  const adminPasswordInput = document.getElementById('adminPassword');
  const logoutBtn = document.getElementById('logoutBtn');

  // DOM Elements - Sidebar & Tabs
  const menuButtons = document.querySelectorAll('.menu-btn');
  const tabContents = document.querySelectorAll('.panel-tab-content');
  const pageTitle = document.getElementById('pageTitle');

  // Check auth on load
  if (adminPassword) {
    verifyPassword(adminPassword);
  } else {
    showAuthScreen();
  }

  // Handle Login Form Submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pass = adminPasswordInput.value;
    const success = await verifyPassword(pass);
    if (success) {
      sessionStorage.setItem('admin_pass', pass);
      adminPassword = pass;
    } else {
      showToast('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।', 'error');
    }
  });

  // Handle Logout
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('admin_pass');
    adminPassword = '';
    showAuthScreen();
    showToast('লগআউট করা হয়েছে।', 'success');
  });

  // Verify passcode with backend
  async function verifyPassword(pass) {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass })
      });
      if (res.ok) {
        showAdminDashboard();
        loadData();
        return true;
      }
      return false;
    } catch (err) {
      showToast('সার্ভার কানেকশন এরর!', 'error');
      return false;
    }
  }

  function showAuthScreen() {
    authContainer.style.display = 'flex';
    adminLayout.style.display = 'none';
  }

  function showAdminDashboard() {
    authContainer.style.display = 'none';
    adminLayout.style.display = 'grid';
  }

  // Tab Manager
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      menuButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      tabContents.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('id') === targetTab) {
          tab.classList.add('active');
        }
      });
      pageTitle.textContent = btn.textContent.trim();
    });
  });

  // Toast Notification Manager
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Load Portfolio Data from Server
  async function loadData() {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Data read error');
      portfolioData = await res.json();
      
      populateBioForm(portfolioData.bio);
      populateSocialsForm(portfolioData.socialLinks);
      renderSkillsBuilder(portfolioData.skills);
      renderServicesList(portfolioData.services);
      renderProjectsList(portfolioData.projects);
      renderExperienceList(portfolioData.experience);
    } catch (err) {
      showToast('ডাটা লোড করতে সমস্যা হয়েছে!', 'error');
    }
  }

  // Save Portfolio Data to Server
  async function savePortfolioData() {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword
        },
        body: JSON.stringify({ portfolioData })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        showToast('সংরক্ষণ সফল হয়েছে!', 'success');
        return true;
      } else {
        showToast(result.message || 'সংরক্ষণ ব্যর্থ হয়েছে!', 'error');
        return false;
      }
    } catch (err) {
      showToast('সংরক্ষণে সার্ভার এরর!', 'error');
      return false;
    }
  }

  // Helper function for uploading images
  async function handleImageUpload(fileInput, imgPreviewElement, hiddenInput) {
    const file = fileInput.files[0];
    if (!file) return;

    try {
      showToast('ছবি আপলোড হচ্ছে...', 'success');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-admin-password': adminPassword,
          'x-file-name': file.name
        },
        body: file
      });
      const result = await res.json();
      if (res.ok && result.success) {
        imgPreviewElement.src = result.url;
        hiddenInput.value = result.url;
        showToast('ছবি আপলোড সম্পন্ন হয়েছে!', 'success');
      } else {
        showToast(result.message || 'আপলোড ব্যর্থ হয়েছে!', 'error');
      }
    } catch (err) {
      showToast('ছবি আপলোড সার্ভার এরর!', 'error');
    }
  }


  /* ==========================================================================
     1. BIO FORM LOGIC
     ========================================================================== */
  const bioForm = document.getElementById('bioForm');
  const bioProfileImageInput = document.getElementById('bioProfileImageInput');
  const bioProfileImagePreview = document.getElementById('bioProfileImagePreview');
  const bioProfileImageUrl = document.getElementById('bioProfileImageUrl');
  const bioProfileImageInput2 = document.getElementById('bioProfileImageInput2');
  const bioProfileImagePreview2 = document.getElementById('bioProfileImagePreview2');
  const bioProfileImageUrl2 = document.getElementById('bioProfileImageUrl2');

  function populateBioForm(bio) {
    if (!bio) return;
    document.getElementById('bioName').value = bio.name || '';
    document.getElementById('bioEnglishName').value = bio.englishName || '';
    document.getElementById('bioTitle').value = bio.title || '';
    document.getElementById('bioDegree').value = bio.degree || '';
    document.getElementById('bioDegreeShort').value = bio.degreeShort || '';
    document.getElementById('bioExpYears').value = bio.experienceYears || '';
    document.getElementById('bioCompletedProjects').value = bio.completedProjects || '';
    document.getElementById('bioHappyClients').value = bio.happyClients || '';
    document.getElementById('bioAboutBengali').value = bio.aboutBengali || '';
    document.getElementById('bioAboutEnglish').value = bio.aboutEnglish || '';
    bioProfileImageUrl.value = bio.profileImage || '';
    bioProfileImagePreview.src = bio.profileImage || '/images/avatar.png';
    bioProfileImageUrl2.value = bio.profileImage2 || '';
    bioProfileImagePreview2.src = bio.profileImage2 || '/images/avatar.png';
  }

  bioProfileImageInput.addEventListener('change', () => {
    handleImageUpload(bioProfileImageInput, bioProfileImagePreview, bioProfileImageUrl);
  });

  bioProfileImageInput2.addEventListener('change', () => {
    handleImageUpload(bioProfileImageInput2, bioProfileImagePreview2, bioProfileImageUrl2);
  });

  bioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    portfolioData.bio = {
      name: document.getElementById('bioName').value,
      englishName: document.getElementById('bioEnglishName').value,
      title: document.getElementById('bioTitle').value,
      degree: document.getElementById('bioDegree').value,
      degreeShort: document.getElementById('bioDegreeShort').value,
      profileImage: bioProfileImageUrl.value,
      profileImage2: bioProfileImageUrl2.value,
      experienceYears: document.getElementById('bioExpYears').value,
      completedProjects: document.getElementById('bioCompletedProjects').value,
      happyClients: document.getElementById('bioHappyClients').value,
      aboutBengali: document.getElementById('bioAboutBengali').value,
      aboutEnglish: document.getElementById('bioAboutEnglish').value
    };
    savePortfolioData();
  });

  /* ==========================================================================
     2. SOCIAL LINKS LOGIC
     ========================================================================== */
  const socialsForm = document.getElementById('socialsForm');

  function populateSocialsForm(links) {
    if (!links) return;
    document.getElementById('socialEmail').value = links.email || '';
    document.getElementById('socialPhone').value = links.phone || '';
    document.getElementById('socialWhatsapp').value = links.whatsapp || '';
    document.getElementById('socialGithub').value = links.github || '';
    document.getElementById('socialLinkedin').value = links.linkedin || '';
    document.getElementById('socialFacebook').value = links.facebook || '';
  }

  socialsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    portfolioData.socialLinks = {
      email: document.getElementById('socialEmail').value,
      phone: document.getElementById('socialPhone').value,
      whatsapp: document.getElementById('socialWhatsapp').value,
      github: document.getElementById('socialGithub').value,
      linkedin: document.getElementById('socialLinkedin').value,
      facebook: document.getElementById('socialFacebook').value
    };
    savePortfolioData();
  });

  /* ==========================================================================
     3. SKILLS BUILDER LOGIC (Dynamic Nested DOM Builder)
     ========================================================================== */
  const skillsGroupsContainer = document.getElementById('skillsGroupsContainer');
  const btnAddSkillGroup = document.getElementById('btnAddSkillGroup');
  const btnSaveSkills = document.getElementById('btnSaveSkills');

  function renderSkillsBuilder(skills = []) {
    skillsGroupsContainer.innerHTML = '';
    skills.forEach((group, groupIdx) => {
      createSkillGroupDOM(group.category, group.items, groupIdx);
    });
  }

  function createSkillGroupDOM(categoryName = '', items = [], groupIdx) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'item-row skill-group-element';
    groupDiv.style.flexDirection = 'column';
    groupDiv.style.alignItems = 'stretch';
    groupDiv.style.gap = '15px';
    groupDiv.setAttribute('data-index', groupIdx);

    // Group Header
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.gap = '20px';
    headerDiv.innerHTML = `
      <div style="flex-grow:1;">
        <label class="form-label" style="margin-bottom:4px;">স্কিল গ্রুপ টাইটেল</label>
        <input type="text" class="form-control skill-group-title" value="${categoryName}" placeholder="যেমন: হার্ডওয়্যার ও ইলেকট্রনিক্স" required>
      </div>
      <button type="button" class="btn-delete btn-delete-group" style="align-self:flex-end; padding: 10px 14px;">গ্রুপ মুছুন</button>
    `;

    // Skills Items List
    const itemsListDiv = document.createElement('div');
    itemsListDiv.className = 'skills-items-container';
    itemsListDiv.style.display = 'flex';
    itemsListDiv.style.flexDirection = 'column';
    itemsListDiv.style.gap = '10px';
    itemsListDiv.style.marginTop = '10px';
    itemsListDiv.style.paddingLeft = '20px';
    itemsListDiv.style.borderLeft = '2px solid var(--border)';

    items.forEach(item => {
      addSkillItemDOM(itemsListDiv, item.name, item.level);
    });

    // Add Skill Button
    const btnAddSkill = document.createElement('button');
    btnAddSkill.type = 'button';
    btnAddSkill.className = 'btn-add-item';
    btnAddSkill.style.alignSelf = 'flex-start';
    btnAddSkill.style.marginTop = '10px';
    btnAddSkill.textContent = '+ স্কিল যোগ করুন';
    btnAddSkill.addEventListener('click', () => {
      addSkillItemDOM(itemsListDiv, '', 80);
    });

    groupDiv.appendChild(headerDiv);
    groupDiv.appendChild(itemsListDiv);
    groupDiv.appendChild(btnAddSkill);

    // Event listener to delete group
    headerDiv.querySelector('.btn-delete-group').addEventListener('click', () => {
      if (confirm('আপনি কি এই সম্পূর্ণ স্কিল গ্রুপটি মুছতে চান?')) {
        groupDiv.remove();
      }
    });

    skillsGroupsContainer.appendChild(groupDiv);
  }

  function addSkillItemDOM(container, name = '', level = 80) {
    const itemRow = document.createElement('div');
    itemRow.className = 'skill-item-element';
    itemRow.style.display = 'flex';
    itemRow.style.gap = '15px';
    itemRow.style.alignItems = 'center';
    itemRow.innerHTML = `
      <input type="text" class="form-control skill-item-name" value="${name}" placeholder="স্কিলের নাম (যেমন: PCB Design)" style="flex:2;" required>
      <input type="number" class="form-control skill-item-level" value="${level}" placeholder="দক্ষতা %" min="0" max="100" style="flex:1;" required>
      <button type="button" class="btn-delete btn-delete-item" style="padding: 10px 14px;">&times;</button>
    `;

    itemRow.querySelector('.btn-delete-item').addEventListener('click', () => {
      itemRow.remove();
    });

    container.appendChild(itemRow);
  }

  btnAddSkillGroup.addEventListener('click', () => {
    createSkillGroupDOM('', [], skillsGroupsContainer.children.length);
  });

  btnSaveSkills.addEventListener('click', () => {
    const scrapedSkills = [];
    const groups = document.querySelectorAll('.skill-group-element');
    
    groups.forEach(group => {
      const categoryTitle = group.querySelector('.skill-group-title').value.trim();
      const itemElements = group.querySelectorAll('.skill-item-element');
      const items = [];

      itemElements.forEach(el => {
        const name = el.querySelector('.skill-item-name').value.trim();
        const level = parseInt(el.querySelector('.skill-item-level').value) || 0;
        if (name) {
          items.push({ name, level });
        }
      });

      if (categoryTitle && items.length > 0) {
        scrapedSkills.push({ category: categoryTitle, items });
      }
    });

    portfolioData.skills = scrapedSkills;
    savePortfolioData();
  });


  /* ==========================================================================
     4. SERVICES LOGIC (Modal edit + CRUD list)
     ========================================================================== */
  const servicesContainer = document.getElementById('servicesContainer');
  const btnAddService = document.getElementById('btnAddService');
  const serviceModal = document.getElementById('serviceModal');
  const serviceEditForm = document.getElementById('serviceEditForm');
  const btnSaveServiceModal = document.getElementById('btnSaveServiceModal');
  const btnCloseServiceModal = document.getElementById('btnCloseServiceModal');
  const btnCancelServiceModal = document.getElementById('btnCancelServiceModal');
  const btnSaveServices = document.getElementById('btnSaveServices');

  function renderServicesList(services = []) {
    servicesContainer.innerHTML = '';
    services.forEach((service, idx) => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <div>
          <div class="item-info-title">${service.title}</div>
          <div class="item-info-desc">আইকন: ${service.icon} | বিবরণ: ${service.description}</div>
        </div>
        <div class="item-controls">
          <button class="btn-edit" onclick="openServiceEditModal(${idx})">এডিট</button>
          <button class="btn-delete" onclick="deleteService(${idx})">মুছুন</button>
        </div>
      `;
      servicesContainer.appendChild(row);
    });
  }

  window.openServiceEditModal = function(idx) {
    const service = portfolioData.services[idx];
    document.getElementById('modalServId').value = idx;
    document.getElementById('modalServTitle').value = service.title;
    document.getElementById('modalServIcon').value = service.icon;
    document.getElementById('modalServDesc').value = service.description;
    
    document.getElementById('serviceModalTitle').textContent = 'সার্ভিস এডিট';
    serviceModal.classList.add('active');
  };

  window.deleteService = function(idx) {
    if (confirm('আপনি কি এই সার্ভিসটি মুছতে চান?')) {
      portfolioData.services.splice(idx, 1);
      renderServicesList(portfolioData.services);
      showToast('সার্ভিস সরানো হয়েছে (তালিকা সেভ করতে ভুলবেন না)', 'success');
    }
  };

  btnAddService.addEventListener('click', () => {
    document.getElementById('modalServId').value = '-1';
    document.getElementById('modalServTitle').value = '';
    document.getElementById('modalServIcon').value = 'cpu';
    document.getElementById('modalServDesc').value = '';
    
    document.getElementById('serviceModalTitle').textContent = 'নতুন সার্ভিস যোগ';
    serviceModal.classList.add('active');
  });

  function closeServiceModal() {
    serviceModal.classList.remove('active');
  }
  btnCloseServiceModal.addEventListener('click', closeServiceModal);
  btnCancelServiceModal.addEventListener('click', closeServiceModal);

  btnSaveServiceModal.addEventListener('click', () => {
    if (!serviceEditForm.checkValidity()) {
      serviceEditForm.reportValidity();
      return;
    }
    const idx = parseInt(document.getElementById('modalServId').value);
    const title = document.getElementById('modalServTitle').value;
    const icon = document.getElementById('modalServIcon').value;
    const description = document.getElementById('modalServDesc').value;

    const serviceObj = { id: title.toLowerCase().replace(/\s+/g, '-'), title, icon, description };

    if (idx === -1) {
      // Add new
      portfolioData.services.push(serviceObj);
    } else {
      // Edit
      portfolioData.services[idx] = serviceObj;
    }

    closeServiceModal();
    renderServicesList(portfolioData.services);
    showToast('সার্ভিস তালিকায় যুক্ত হয়েছে', 'success');
  });

  btnSaveServices.addEventListener('click', () => {
    savePortfolioData();
  });


  /* ==========================================================================
     5. PROJECTS LOGIC (Modal edit + Image uploads + CRUD list)
     ========================================================================== */
  const projectsContainer = document.getElementById('projectsContainer');
  const btnAddProject = document.getElementById('btnAddProject');
  const projectModal = document.getElementById('projectModal');
  const projectEditForm = document.getElementById('projectEditForm');
  const btnSaveProjectModal = document.getElementById('btnSaveProjectModal');
  const btnCloseProjectModal = document.getElementById('btnCloseProjectModal');
  const btnCancelProjectModal = document.getElementById('btnCancelProjectModal');
  const modalProjImageInput = document.getElementById('modalProjImageInput');
  const modalProjPreview = document.getElementById('modalProjPreview');
  const modalProjImageUrl = document.getElementById('modalProjImageUrl');
  const btnSaveProjects = document.getElementById('btnSaveProjects');

  function renderProjectsList(projects = []) {
    projectsContainer.innerHTML = '';
    projects.forEach((proj, idx) => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <div style="display:flex; gap:15px; align-items:center;">
          <img src="${proj.image || '/images/project-placeholder.jpg'}" style="width:50px; height:50px; border-radius:4px; object-fit:cover;">
          <div>
            <div class="item-info-title">${proj.title}</div>
            <div class="item-info-desc">ক্যাটাগরি: ${proj.category} | টুলস: ${proj.tools.join(', ')}</div>
          </div>
        </div>
        <div class="item-controls">
          <button class="btn-edit" onclick="openProjectEditModal(${idx})">এডিট</button>
          <button class="btn-delete" onclick="deleteProject(${idx})">মুছুন</button>
        </div>
      `;
      projectsContainer.appendChild(row);
    });
  }

  window.openProjectEditModal = function(idx) {
    const proj = portfolioData.projects[idx];
    document.getElementById('modalProjId').value = idx;
    document.getElementById('modalProjTitle').value = proj.title;
    document.getElementById('modalProjCategory').value = proj.category;
    document.getElementById('modalProjLink').value = proj.link || '';
    document.getElementById('modalProjTools').value = proj.tools.join(', ');
    document.getElementById('modalProjDesc').value = proj.description;
    modalProjImageUrl.value = proj.image || '';
    modalProjPreview.src = proj.image || '/images/project-placeholder.jpg';

    document.getElementById('projectModalTitle').textContent = 'প্রজেক্ট এডিট';
    projectModal.classList.add('active');
  };

  window.deleteProject = function(idx) {
    if (confirm('আপনি কি এই প্রজেক্টটি মুছতে চান?')) {
      portfolioData.projects.splice(idx, 1);
      renderProjectsList(portfolioData.projects);
      showToast('প্রজেক্ট সরানো হয়েছে (তালিকা সেভ করতে ভুলবেন না)', 'success');
    }
  };

  btnAddProject.addEventListener('click', () => {
    document.getElementById('modalProjId').value = '-1';
    document.getElementById('modalProjTitle').value = '';
    document.getElementById('modalProjCategory').value = 'iot';
    document.getElementById('modalProjLink').value = '';
    document.getElementById('modalProjTools').value = '';
    document.getElementById('modalProjDesc').value = '';
    modalProjImageUrl.value = '';
    modalProjPreview.src = '/images/project-placeholder.jpg';

    document.getElementById('projectModalTitle').textContent = 'নতুন প্রজেক্ট যোগ করুন';
    projectModal.classList.add('active');
  });

  modalProjImageInput.addEventListener('change', () => {
    handleImageUpload(modalProjImageInput, modalProjPreview, modalProjImageUrl);
  });

  function closeProjectModal() {
    projectModal.classList.remove('active');
  }
  btnCloseProjectModal.addEventListener('click', closeProjectModal);
  btnCancelProjectModal.addEventListener('click', closeProjectModal);

  btnSaveProjectModal.addEventListener('click', () => {
    if (!projectEditForm.checkValidity()) {
      projectEditForm.reportValidity();
      return;
    }
    const idx = parseInt(document.getElementById('modalProjId').value);
    const title = document.getElementById('modalProjTitle').value;
    const category = document.getElementById('modalProjCategory').value;
    const link = document.getElementById('modalProjLink').value || '#';
    const tools = document.getElementById('modalProjTools').value.split(',').map(s => s.trim()).filter(Boolean);
    const description = document.getElementById('modalProjDesc').value;
    const image = modalProjImageUrl.value;

    const projectObj = {
      id: idx === -1 ? Date.now() : portfolioData.projects[idx].id,
      title,
      category,
      description,
      image,
      tools,
      link
    };

    if (idx === -1) {
      portfolioData.projects.push(projectObj);
    } else {
      portfolioData.projects[idx] = projectObj;
    }

    closeProjectModal();
    renderProjectsList(portfolioData.projects);
    showToast('প্রজেক্ট তালিকায় যুক্ত হয়েছে', 'success');
  });

  btnSaveProjects.addEventListener('click', () => {
    savePortfolioData();
  });


  /* ==========================================================================
     6. EXPERIENCE LOGIC (Modal edit + CRUD list)
     ========================================================================== */
  const experienceContainer = document.getElementById('experienceContainer');
  const btnAddExperience = document.getElementById('btnAddExperience');
  const experienceModal = document.getElementById('experienceModal');
  const experienceEditForm = document.getElementById('experienceEditForm');
  const btnSaveExperienceModal = document.getElementById('btnSaveExperienceModal');
  const btnCloseExperienceModal = document.getElementById('btnCloseExperienceModal');
  const btnCancelExperienceModal = document.getElementById('btnCancelExperienceModal');
  const btnSaveExperience = document.getElementById('btnSaveExperience');

  function renderExperienceList(experience = []) {
    experienceContainer.innerHTML = '';
    experience.forEach((exp, idx) => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.innerHTML = `
        <div>
          <div class="item-info-title">${exp.role} @ ${exp.company}</div>
          <div class="item-info-desc">সময়কাল: ${exp.period} | বিবরণ: ${exp.description.substring(0, 100)}...</div>
        </div>
        <div class="item-controls">
          <button class="btn-edit" onclick="openExperienceEditModal(${idx})">এডিট</button>
          <button class="btn-delete" onclick="deleteExperience(${idx})">মুছুন</button>
        </div>
      `;
      experienceContainer.appendChild(row);
    });
  }

  window.openExperienceEditModal = function(idx) {
    const exp = portfolioData.experience[idx];
    document.getElementById('modalExpId').value = idx;
    document.getElementById('modalExpRole').value = exp.role;
    document.getElementById('modalExpCompany').value = exp.company;
    document.getElementById('modalExpPeriod').value = exp.period;
    document.getElementById('modalExpDesc').value = exp.description;
    
    document.getElementById('experienceModalTitle').textContent = 'কাজের অভিজ্ঞতা এডিট';
    experienceModal.classList.add('active');
  };

  window.deleteExperience = function(idx) {
    if (confirm('আপনি কি এই কাজের অভিজ্ঞতা মুছতে চান?')) {
      portfolioData.experience.splice(idx, 1);
      renderExperienceList(portfolioData.experience);
      showToast('অভিজ্ঞতা সরানো হয়েছে (তালিকা সেভ করতে ভুলবেন না)', 'success');
    }
  };

  btnAddExperience.addEventListener('click', () => {
    document.getElementById('modalExpId').value = '-1';
    document.getElementById('modalExpRole').value = '';
    document.getElementById('modalExpCompany').value = '';
    document.getElementById('modalExpPeriod').value = '';
    document.getElementById('modalExpDesc').value = '';
    
    document.getElementById('experienceModalTitle').textContent = 'নতুন অভিজ্ঞতা যোগ';
    experienceModal.classList.add('active');
  });

  function closeExperienceModal() {
    experienceModal.classList.remove('active');
  }
  btnCloseExperienceModal.addEventListener('click', closeExperienceModal);
  btnCancelExperienceModal.addEventListener('click', closeExperienceModal);

  btnSaveExperienceModal.addEventListener('click', () => {
    if (!experienceEditForm.checkValidity()) {
      experienceEditForm.reportValidity();
      return;
    }
    const idx = parseInt(document.getElementById('modalExpId').value);
    const role = document.getElementById('modalExpRole').value;
    const company = document.getElementById('modalExpCompany').value;
    const period = document.getElementById('modalExpPeriod').value;
    const description = document.getElementById('modalExpDesc').value;

    const experienceObj = { role, company, period, description };

    if (idx === -1) {
      portfolioData.experience.push(experienceObj);
    } else {
      portfolioData.experience[idx] = experienceObj;
    }

    closeExperienceModal();
    renderExperienceList(portfolioData.experience);
    showToast('অভিজ্ঞতা তালিকায় যুক্ত হয়েছে', 'success');
  });

  btnSaveExperience.addEventListener('click', () => {
    savePortfolioData();
  });
});
