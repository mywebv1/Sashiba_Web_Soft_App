/**
 * EduOS Presentation Architect - Core Engine
 */

// ১. কার্ড টগল লজিক (Accordion)
function toggleCard(header) {
  const card = header.parentElement;
  const allCards = document.querySelectorAll(".pro-card");

  allCards.forEach((c) => {
    if (c !== card) c.classList.remove("active");
  });

  card.classList.toggle("active");
}

// ২. প্রেজেন্টেশন স্টেট
let state = {
  slides: [],
  currentIdx: 0,
};

// ৩. এআই জেনারেশন সিমুলেশন
document.getElementById("btnGenerate").addEventListener("click", async () => {
  const overlay = document.getElementById("aiOverlay");
  const status = document.getElementById("aiStatus");
  const progress = document.getElementById("progressFill");
  const pct = document.getElementById("pct");

  overlay.classList.remove("hidden");

  const steps = [
    { m: "প্রতিষ্ঠান ও বোর্ড তথ্য বিশ্লেষণ হচ্ছে...", p: 20 },
    { m: "NCTB কারিকুলাম ম্যাপিং করা হচ্ছে...", p: 45 },
    { m: "স্লাইড সিকোয়েন্স ও কন্টেন্ট তৈরি হচ্ছে...", p: 75 },
    { m: "ভিজ্যুয়াল এলিমেন্ট ও কুইজ জেনারেট হচ্ছে...", p: 95 },
    { m: "পাঠ পরিকল্পনা একদম প্রস্তুত!", p: 100 },
  ];

  for (let step of steps) {
    status.innerText = step.m;
    progress.style.width = step.p + "%";
    pct.innerText = step.p + "%";
    await new Promise((r) => setTimeout(r, 1000));
  }

  // ডামি ডাটা জেনারেশন
  state.slides = [
    {
      title: "স্বাগতম",
      body: "ডিজিটাল পাঠ পরিকল্পনায় আপনাদের স্বাগতম। আজকের বিষয়: পরিবেশ বিজ্ঞান।",
    },
    {
      title: "শিখনফল",
      body: "১. পরিবেশের উপাদানগুলো বলতে পারবে।<br>২. দূষণের কারণ ব্যাখ্যা করতে পারবে।",
    },
    {
      title: "মূল আলোচনা",
      body: "পরিবেশ মূলত দুই প্রকার: প্রাকৃতিক ও সামাজিক।",
    },
    { title: "মূল্যায়ন", body: "কুইজ: পরিবেশের মূল উপাদান কয়টি?" },
  ];

  state.currentIdx = 0;
  renderSlide();

  setTimeout(() => overlay.classList.add("hidden"), 500);
});

// ৪. স্লাইড রেন্ডারিং
function renderSlide() {
  const container = document.getElementById("slideRenderer");
  const slide = state.slides[state.currentIdx];

  container.innerHTML = `
        <div class="animate-slide">
            <h1 class="slide-title">${slide.title}</h1>
            <p class="slide-body">${slide.body}</p>
        </div>
    `;

  document.getElementById("curr").innerText = state.currentIdx + 1;
  document.getElementById("total").innerText = state.slides.length;
}

// ৫. নেভিগেশন
function changeSlide(dir) {
  let newIdx = state.currentIdx + dir;
  if (newIdx >= 0 && newIdx < state.slides.length) {
    state.currentIdx = newIdx;
    renderSlide();
  }
}

// কীবোর্ড কন্ট্রোল
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === "ArrowLeft") changeSlide(-1);
});
