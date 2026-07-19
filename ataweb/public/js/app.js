document.addEventListener('DOMContentLoaded', () => {
  // Theme Manager
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile Hamburger Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  hamburgerBtn.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '70px';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.backgroundColor = 'var(--bg-navbar)';
    navMenu.style.padding = '20px';
    navMenu.style.borderBottom = '1px solid var(--border-color)';
    navMenu.style.gap = '12px';
  });

  // Smooth scroll active navigation highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Dynamic Portfolio Rendering
  let portfolioData = {};

  async function loadPortfolioData() {
    try {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error('Data fetch failed');
      portfolioData = await res.json();
      
      renderBio(portfolioData.bio);
      renderSocials(portfolioData.socialLinks, portfolioData.contactInfo);
      renderServices(portfolioData.services);
      renderSkills(portfolioData.skills);
      renderProjects(portfolioData.projects);
      renderExperience(portfolioData.experience);

      // Trigger skills animations once rendered
      setTimeout(animateSkills, 300);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    }
  }

  // 1. Render Bio Info
  function renderBio(bio) {
    if (!bio) return;
    document.getElementById('heroName').textContent = bio.name;
    document.getElementById('heroTitle').textContent = `${bio.degreeShort} | ${bio.title}`;

    // Smart image layout
    const wrapper = document.getElementById('heroImageWrapper');
    const img1 = document.getElementById('profileImage');
    const img2 = document.getElementById('profileImage2');
    const has1 = bio.profileImage && bio.profileImage.trim() !== '';
    const has2 = bio.profileImage2 && bio.profileImage2.trim() !== '';

    if (has1 && has2) {
      img1.src = bio.profileImage;
      img2.src = bio.profileImage2;
      img2.style.display = '';
      wrapper.classList.remove('single-image', 'no-image');
    } else if (has1) {
      img1.src = bio.profileImage;
      img2.style.display = 'none';
      wrapper.classList.add('single-image');
      wrapper.classList.remove('no-image');
    } else if (has2) {
      img1.style.display = 'none';
      img2.src = bio.profileImage2;
      img2.style.display = '';
      img2.classList.add('hero-image');
      img2.classList.remove('hero-image-secondary');
      wrapper.classList.add('single-image');
      wrapper.classList.remove('no-image');
    } else {
      img1.style.display = 'none';
      img2.style.display = 'none';
      wrapper.classList.add('no-image');
      wrapper.classList.remove('single-image');
    }

    document.getElementById('aboutBio').textContent = bio.aboutBengali;
    document.getElementById('detailDegree').textContent = bio.degree;
    document.getElementById('footerBio').textContent = bio.aboutBengali.substring(0, 120) + '...';
    
    // Stats
    document.getElementById('statExp').textContent = bio.experienceYears || '৩+';
    document.getElementById('statProjects').textContent = bio.completedProjects || '৫০+';
    document.getElementById('statClients').textContent = bio.happyClients || '৩০+';
  }

  // 2. Render Social Links
  function renderSocials(links, contactInfo) {
    if (!links) return;
    
    // Contact Section Links
    document.getElementById('contactEmail').textContent = links.email;
    document.getElementById('contactPhone').textContent = links.phone;
    document.getElementById('contactWhatsapp').textContent = links.whatsapp;
    
    // WhatsApp Redirect
    const whatsappCard = document.getElementById('whatsappCardBtn');
    if (whatsappCard) {
      whatsappCard.addEventListener('click', () => {
        window.open(`https://wa.me/${links.whatsapp}`, '_blank');
      });
    }

    // Footer contact info
    document.getElementById('footerPhone').textContent = links.phone;
    document.getElementById('footerEmail').textContent = links.email;

    // Footer address
    const footerAddr = document.getElementById('footerAddress');
    if (footerAddr && contactInfo) {
      footerAddr.textContent = contactInfo.address || 'ঢাকা, বাংলাদেশ';
    }

    // Footer Social Links
    const footerSocials = document.getElementById('footerSocials');
    footerSocials.innerHTML = '';

    const socialIcons = {
      github: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
      linkedin: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
      facebook: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
    };

    for (const [key, value] of Object.entries(links)) {
      if (socialIcons[key]) {
        const a = document.createElement('a');
        a.href = value;
        a.target = '_blank';
        a.className = 'social-icon';
        a.innerHTML = socialIcons[key];
        footerSocials.appendChild(a);
      }
    }
  }

  // Helper for SVG icons
  function getIconSvg(iconName) {
    const icons = {
      cpu: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`,
      layers: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polygon points="2 17 12 22 22 17"></polygon><polygon points="2 12 12 17 22 12"></polygon></svg>`,
      layout: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
      tool: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
      terminal: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
    };
    return icons[iconName] || icons['cpu'];
  }

  // 3. Render Services
  function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    if (!services || services.length === 0) {
      grid.innerHTML = '<div style="text-align: center; grid-column: 1/-1; padding: 40px;">কোনো সার্ভিস পাওয়া যায়নি।</div>';
      return;
    }
    grid.innerHTML = '';
    services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.innerHTML = `
        <div class="service-icon">
          ${getIconSvg(service.icon)}
        </div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
      `;
      grid.appendChild(card);
    });
  }

  // 4. Render Skills
  function renderSkills(skills) {
    const grid = document.getElementById('skillsGrid');
    if (!skills || skills.length === 0) {
      grid.innerHTML = '<div style="text-align: center; grid-column: 1/-1; padding: 40px;">কোনো স্কিল পাওয়া যায়নি।</div>';
      return;
    }
    grid.innerHTML = '';
    skills.forEach(category => {
      const card = document.createElement('div');
      card.className = 'skills-card';
      
      let itemsHtml = '';
      category.items.forEach(skill => {
        itemsHtml += `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-percentage en">${skill.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${skill.level}"></div>
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <h3 class="skills-category-title">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="color:var(--secondary);">
            <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          ${category.category}
        </h3>
        ${itemsHtml}
      `;
      grid.appendChild(card);
    });
  }

  // Animate progress bars
  function animateSkills() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
      const level = fill.getAttribute('data-level');
      fill.style.width = level + '%';
    });
  }

  // 5. Render Projects (with modal trigger)
  function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!projects || projects.length === 0) {
      grid.innerHTML = '<div style="text-align: center; grid-column: 1/-1; padding: 40px;">কোনো প্রজেক্ট পাওয়া যায়নি।</div>';
      return;
    }
    grid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', project.category);
      
      const toolsHtml = project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('');
      const imgPath = project.image || '/images/project-placeholder.jpg';

      card.innerHTML = `
        <div class="project-image-box">
          <span class="project-category-tag en">${project.category}</span>
          <img src="${imgPath}" alt="${project.title}" class="project-img" onerror="this.src='https://via.placeholder.com/350x200/0b1a2e/ffffff?text=${encodeURIComponent(project.title)}'">
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tools">${toolsHtml}</div>
          <button class="project-link en" data-project-id="${project.id}" style="background:none;border:none;cursor:pointer;color:var(--primary);font-weight:600;padding:0;font-size:14px;">বিস্তারিত দেখুন &rarr;</button>
        </div>
      `;
      card.querySelector('[data-project-id]').addEventListener('click', () => openProjectModal(project));
      grid.appendChild(card);
    });

    // Implement filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Render Experience
  function renderExperience(experience) {
    const container = document.getElementById('experienceTimeline');
    if (!experience || experience.length === 0) {
      container.innerHTML = '<div style="text-align: center; padding: 40px;">কোনো কাজের অভিজ্ঞতা পাওয়া যায়নি।</div>';
      return;
    }
    container.innerHTML = '';
    experience.forEach(exp => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-role">${exp.role}</span>
            <span class="timeline-company">${exp.company}</span>
            <span class="timeline-period en">${exp.period}</span>
          </div>
          <p class="timeline-desc">${exp.description}</p>
        </div>
      `;
      container.appendChild(item);
    });
  }

  // Project Modal
  function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const gallery = document.getElementById('modalGallery');
    const tags = document.getElementById('modalTags');
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDesc');
    const tools = document.getElementById('modalTools');
    const videoWrapper = document.getElementById('modalVideoWrapper');
    const videoFrame = document.getElementById('modalVideo');

    // Gallery
    gallery.innerHTML = '';
    const images = (project.gallery && project.gallery.length > 0) ? project.gallery : (project.image ? [project.image] : []);
    images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = project.title;
      if (images.length === 1) img.classList.add('full-width');
      gallery.appendChild(img);
    });

    tags.innerHTML = `<span class="modal-tag">${project.category}</span>`;
    title.textContent = project.title;
    desc.textContent = project.description;

    // Tools
    tools.innerHTML = (project.tools || []).map(t => `<span class="modal-tool-tag">${t}</span>`).join('');

    // Video
    if (project.videoUrl && project.videoUrl.trim() !== '') {
      videoFrame.src = project.videoUrl;
      videoWrapper.style.display = '';
    } else {
      videoFrame.src = '';
      videoWrapper.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const projectModal = document.getElementById('projectModal');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      projectModal.classList.remove('active');
      document.getElementById('modalVideo').src = '';
      document.body.style.overflow = '';
    });
  }
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.getElementById('modalVideo').src = '';
        document.body.style.overflow = '';
      }
    });
  }

  // Contact Form — real API submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.className = 'form-status';
    formStatus.textContent = 'বার্তা পাঠানো হচ্ছে...';
    formStatus.style.display = 'block';
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('formName').value,
          email: document.getElementById('formEmail').value,
          phone: document.getElementById('formPhone').value,
          subject: document.getElementById('formSubject').value,
          message: document.getElementById('formMessage').value
        })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। শীঘ্রই যোগাযোগ করা হবে!';
        contactForm.reset();
      } else {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'সমস্যা হয়েছে। আবার চেষ্টা করুন।';
      }
    } catch(err) {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'সার্ভার কানেকশন সমস্যা। পরে আবার চেষ্টা করুন।';
    }
  });

  // Init
  loadPortfolioData();
});
