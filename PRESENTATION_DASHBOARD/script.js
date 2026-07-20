/**
 * Core AI Generation Engine - Updated for EduOS PRO
 */

let presentationState = {
  currentIndex: 0,
  totalSlides: 0,
  data: [],
};

const aiModal = document.getElementById("aiModal");
const progressBar = document.getElementById("aiProgressFill");
const statusText = document.getElementById("aiStatus");
const pctText = document.getElementById("pctText");

document.getElementById("btnGenerate").addEventListener("click", async () => {
  // প্রসেস শুরু
  aiModal.classList.remove("hidden");

  const steps = [
    { msg: "শিক্ষা প্রতিষ্ঠান ও বোর্ড তথ্য যাচাই করা হচ্ছে...", p: 15 },
    { msg: "কারিকুলাম ও শিখনফল ম্যাপিং করা হচ্ছে...", p: 35 },
    {
      msg: "সিলেক্টেড ভিজ্যুয়াল কন্টেন্ট (Diagrams/Images) তৈরি হচ্ছে...",
      p: 60,
    },
    { msg: "এআই কুইজ ও প্রশ্নব্যাংক জেনারেট করা হচ্ছে...", p: 85 },
    { msg: "প্রেজেন্টেশন লেআউট ও কালার গ্রেডিং সম্পন্ন!", p: 100 },
  ];

  for (let step of steps) {
    statusText.innerText = step.msg;
    progressBar.style.width = step.p + "%";
    pctText.innerText = step.p + "%";
    await new Promise((r) => setTimeout(r, 1200));
  }

  // ডাইনামিক স্লাইড ডাটা (নতুন সিকোয়েন্স অনুযায়ী)
  presentationState.data = [
    {
      title: "মূল শিরোনাম: আজকের পাঠ",
      type: "cover",
      content: "ডিজিটাল পাঠ পরিকল্পনা | ২০২৪ শিক্ষাবর্ষ",
      notes: "শিক্ষার্থীদের শুভেচ্ছা জানান।",
      time: "০২ মি.",
    },
    {
      title: "শিখনফল (Learning Outcomes)",
      type: "list",
      items: ["বিষয়বস্তুর মূল ধারণা বুঝবে", "বাস্তব প্রয়োগ ব্যাখ্যা করবে"],
      notes: "আজকের ক্লাসের উদ্দেশ্য বুঝিয়ে বলুন।",
      time: "০৩ মি.",
    },
    {
      title: "মূল আলোচনা ও ডায়াগ্রাম",
      type: "content",
      content: "এখানে এআই জেনারেটেড টেক্সট এবং ভিজ্যুয়াল চিত্র প্রদর্শিত হবে।",
      notes: "স্লাইডের চিত্রটি ব্যাখ্যা করুন।",
      time: "১০ মি.",
    },
    {
      title: "মূল্যায়ন ও কুইজ",
      type: "quiz",
      content: "১. নিচের কোনটি সঠিক উত্তর?<br>২. বিষয়টি ব্যাখ্যা কর।",
      notes: "সঠিক উত্তরের জন্য অপেক্ষা করুন এবং ফিডব্যাক দিন।",
      time: "০৫ মি.",
    },
  ];

  presentationState.totalSlides = presentationState.data.length;

  setTimeout(() => {
    aiModal.classList.add("hidden");
    renderSlide(0);
  }, 500);
});

function renderSlide(index) {
  if (index < 0 || index >= presentationState.totalSlides) return;

  presentationState.currentIndex = index;
  const slide = presentationState.data[index];
  const surface = document.getElementById("slideRenderer");

  surface.innerHTML = `
        <div class="animate-fade">
            <span class="slide-tag">Slide ${index + 1} | EduOS PRO</span>
            <h1 class="slide-title">${slide.title}</h1>
            <div class="slide-body">
                ${slide.content || ""}
                ${slide.items ? `<ul>${slide.items.map((i) => `<li><i class="fas fa-check-circle"></i> ${i}</li>`).join("")}</ul>` : ""}
            </div>
            <div class="slide-meta">
                <span><i class="fas fa-clock"></i> সময়: ${slide.time}</span>
                <span><i class="fas fa-brain"></i> AI এনহ্যান্সড</span>
            </div>
        </div>
    `;

  document.getElementById("currIdx").innerText = index + 1;
  document.getElementById("totalIdx").innerText = presentationState.totalSlides;
}

function navSlide(direction) {
  renderSlide(presentationState.currentIndex + direction);
}
