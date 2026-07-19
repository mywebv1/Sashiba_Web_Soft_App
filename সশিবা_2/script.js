/**
 * সশিবা স্মার্ট শিক্ষা বাতায়ন - পূর্ণাঙ্গ লজিক
 */

// ১. ডাইনামিক কন্টেন্ট ডাটাবেস
const dashboardContents = {
  teacher: {
    intro:
      "শিক্ষকদের পাঠদান আধুনিক করতে আমাদের অটোমেটেড ডিজিটাল টুলস ব্যবহার করুন।",
    features: [
      "লেসন প্ল্যান জেনারেটর",
      "অটোমেটেড প্রশ্নপত্র",
      "মূল্যায়ন রিপোর্ট",
    ],
  },
  student: {
    intro:
      "শিক্ষার্থীদের জন্য আধুনিক কারিকুলাম ভিত্তিক লার্নিং ম্যাটেরিয়ালস এবং গাইডলাইন।",
    features: ["ইন্টারেক্টিভ ভিডিও", "নোটস ও কুইজ", "প্রস্তুতিমূলক পরীক্ষা"],
  },
  info: {
    intro:
      "নতুন কারিকুলাম অনুযায়ী প্রতিটি বিষয়ের মূল ধারণা এবং বিস্তারিত রিসোর্স।",
    features: ["নির্ভুল তথ্যমালা", "শিখনফল বিশ্লেষণ", "সহায়ক ফাইল"],
  },
};

// ২. টাইপিং অ্যানিমেশন ডাটা
const phrases = [
  { text: "স্মার্ট শিক্ষা বাতায়ন", colorClass: "phrase-color-1" },
  {
    text: "স্মার্ট শিক্ষা বাতায়নে আপনাকে স্বাগতম",
    colorClass: "phrase-color-2",
  },
  {
    text: "স্মার্ট শিক্ষার নতুন অভিজ্ঞতায় আপনাকে স্বাগতম",
    colorClass: "phrase-color-3",
  },
];

let pIdx = 0,
  cIdx = 0,
  isDeleting = false;
const typeEl = document.getElementById("typewriter-text");

function handleTyping() {
  const current = phrases[pIdx];
  typeEl.className = current.colorClass;
  const fullText = current.text;

  typeEl.innerText = isDeleting
    ? fullText.substring(0, cIdx - 1)
    : fullText.substring(0, cIdx + 1);
  cIdx += isDeleting ? -1 : 1;

  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && cIdx === fullText.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && cIdx === 0) {
    isDeleting = false;
    pIdx = (pIdx + 1) % phrases.length;
    speed = 500;
  }

  setTimeout(handleTyping, speed);
}

// ৩. থিম টগল
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.getElementById("mode-btn").innerText =
    document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

// ৪. হোম পেজে ফিরে আসা
function showHome() {
  document.getElementById("home-page").classList.remove("hidden");
  document.getElementById("dashboard-page").classList.add("hidden");
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active-nav"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ৫. ড্যাশবোর্ড কন্ট্রোল
function openDashboard(subName, cat) {
  document.getElementById("home-page").classList.add("hidden");
  document.getElementById("dashboard-page").classList.remove("hidden");
  document.getElementById("dash-title").innerText = subName;

  // মেনু হাইলাইট লজিক
  document
    .querySelectorAll(".nav-link")
    .forEach((l) => l.classList.remove("active-nav"));
  if (cat === "teacher")
    document.getElementById("nav-teacher").classList.add("active-nav");
  if (cat === "student")
    document.getElementById("nav-student").classList.add("active-nav");
  if (cat === "info")
    document.getElementById("nav-info").classList.add("active-nav");

  // সাইডবার জেনারেট
  const sidebar = document.getElementById("sidebar-list");
  sidebar.innerHTML = `
        <div class="chapter-link chapter-active" onclick="loadContent('১ম অধ্যায়', '${cat}')">১ম অধ্যায়: আলোচনা</div>
        <div class="chapter-link" onclick="loadContent('২য় অধ্যায়', '${cat}')">২য় অধ্যায়: বিস্তারিত পাঠ</div>
        <div class="chapter-link" onclick="loadContent('৩য় অধ্যায়', '${cat}')">৩য় অধ্যায়: মূল্যায়ন</div>
    `;

  loadContent("১ম অধ্যায়", cat);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadContent(ch, cat) {
  const data = dashboardContents[cat] || dashboardContents["info"];
  document.getElementById("dash-intro").innerText = `${ch} - ${data.intro}`;

  const featureBox = document.getElementById("dash-features");
  featureBox.innerHTML = data.features
    .map(
      (f) => `
        <div class="flex items-start gap-4 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
            <div class="text-3xl">💡</div>
            <div><h4 class="text-xl font-bold">${f}</h4><p class="text-sm opacity-60">বিস্তারিত কন্টেন্ট শীঘ্রই আসবে।</p></div>
        </div>
    `,
    )
    .join("");

  document.querySelectorAll(".chapter-link").forEach((el) => {
    el.classList.remove("chapter-active");
    if (el.innerText.includes(ch)) el.classList.add("chapter-active");
  });
}

// ৬. সার্চ
function triggerSearch() {
  const query = document.getElementById("main-search").value.trim();
  if (query) openDashboard(query, "info");
}

// ৭. ইনিশিয়ালাইজেশন
window.addEventListener("load", () => {
  // সাব-টাইটেল সফট রিভিল
  setTimeout(
    () => document.getElementById("subtitle").classList.add("reveal-active"),
    100,
  );
  // টাইপিং শুরু
  handleTyping();
});

document.getElementById("main-search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") triggerSearch();
});
