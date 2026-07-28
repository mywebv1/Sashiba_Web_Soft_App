// ১. সেকশন ন্যাভিগেশন
function showSection(sectionId) {
  document
    .querySelectorAll(".content-section")
    .forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(`section-${sectionId}`).classList.remove("hidden");

  document
    .querySelectorAll(".nav-item")
    .forEach((nav) => nav.classList.remove("active"));
  document.getElementById(`nav-${sectionId}`).classList.add("active");
}

// ২. উপস্থিতি চিপ টগল
function toggleSubChip(chip) {
  if (chip.classList.contains("present")) {
    chip.classList.replace("present", "absent");
    chip.innerHTML = '<i class="fa-solid fa-xmark"></i> অনুপস্থিত';
  } else {
    chip.classList.replace("absent", "present");
    chip.innerHTML = '<i class="fa-solid fa-check"></i> উপস্থিত';
  }
  recalculateAllRows();
}

// ৩. অটো পারসেন্টেজ ক্যালকুলেশন
function recalculateAllRows() {
  const rows = document.querySelectorAll("#attendanceTable tbody tr");
  rows.forEach((row) => {
    const chips = row.querySelectorAll(".sub-chip");
    const presentCount = Array.from(chips).filter((c) =>
      c.classList.contains("present"),
    ).length;
    const percent = Math.round((presentCount / chips.length) * 100);

    const percentCell = row.cells[row.cells.length - 3];
    percentCell.innerHTML = `<span class="status-pill present">${percent}%</span>`;
  });
}

// ৪. মডাল কন্ট্রোল
function openAddSubjectModal() {
  document.getElementById("addSubjectModal").classList.remove("hidden");
}
function openDeleteSubjectModal() {
  const select = document.getElementById("deleteSubjectSelect");
  select.innerHTML = "";
  const ths = document.querySelectorAll("#attendanceTable thead th.subj-col");
  ths.forEach((th, idx) => {
    let opt = document.createElement("option");
    opt.value = idx + 2; // রোল ও নাম এর পরে ইনডেক্স
    opt.innerText = th.innerText;
    select.appendChild(opt);
  });
  document.getElementById("deleteSubjectModal").classList.remove("hidden");
}
function openAddStudentModal() {
  document.getElementById("addStudentModal").classList.remove("hidden");
}
function openDeleteStudentModal() {
  const select = document.getElementById("deleteStudentSelect");
  if (!select) return;
  select.innerHTML = "";
  const rows = document.querySelectorAll("#attendanceTable tbody tr");
  rows.forEach((row, idx) => {
    const roll = row.cells[0]?.innerText || "";
    const name = row.cells[1]?.innerText || "";
    let opt = document.createElement("option");
    opt.value = idx;
    opt.innerText = `${roll} - ${name}`;
    select.appendChild(opt);
  });
  document.getElementById("deleteStudentModal").classList.remove("hidden");
}

function confirmDeleteStudentRow() {
  const select = document.getElementById("deleteStudentSelect");
  if (!select) return;
  const index = parseInt(select.value);
  const rows = document.querySelectorAll("#attendanceTable tbody tr");
  if (rows[index]) {
    rows[index].remove();
    recalculateAllRows();
  }
  closeModal("deleteStudentModal");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// ৫. নতুন বিষয় যোগ (X আইকন ছাড়া)
function addNewSubjectColumn() {
  const title = document.getElementById("newSubjectTitleInput").value;
  if (!title) return;

  const table = document.getElementById("attendanceTable");
  const headRow = table.querySelector("thead tr");
  const targetIndex = headRow.cells.length - 3; // 'মোট %' এর আগে

  // হেডার যোগ
  const th = document.createElement("th");
  th.className = "subj-col";
  th.innerText = title;
  headRow.insertBefore(th, headRow.cells[targetIndex]);

  // বডি যোগ
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const td = document.createElement("td");
    td.className = "text-center";
    td.innerHTML = `<span class="sub-chip present" onclick="toggleSubChip(this)"><i class="fa-solid fa-check"></i> উপস্থিত</span>`;
    row.insertBefore(td, row.cells[targetIndex]);
  });

  closeModal("addSubjectModal");
  recalculateAllRows();
  triggerConfetti();
}

// ৬. বিষয় মুছে ফেলা
function confirmDeleteSubject() {
  const index = document.getElementById("deleteSubjectSelect").value;
  const table = document.getElementById("attendanceTable");

  table.querySelectorAll("tr").forEach((row) => {
    row.deleteCell(index);
  });

  closeModal("deleteSubjectModal");
  recalculateAllRows();
}

// ৭. নতুন শিক্ষার্থী যোগ
function saveNewStudent() {
  const roll = document.getElementById("newStuRoll").value;
  const name = document.getElementById("newStuName").value;
  if (!roll || !name) return;

  const table = document
    .getElementById("attendanceTable")
    .querySelector("tbody");
  const subjectCount = document.querySelectorAll(
    "#attendanceTable thead th.subj-col",
  ).length;

  let newRow = table.insertRow();
  newRow.innerHTML = `<td><strong>${roll}</strong></td><td>${name}</td>`;

  for (let i = 0; i < subjectCount; i++) {
    newRow.innerHTML += `<td class="text-center"><span class="sub-chip present" onclick="toggleSubChip(this)"><i class="fa-solid fa-check"></i> উপস্থিত</span></td>`;
  }

  newRow.innerHTML += `<td><span class="status-pill present">100%</span></td><td>⭐⭐⭐⭐⭐</td><td class="no-print"><button class="btn-icon text-danger" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></button></td>`;

  closeModal("addStudentModal");
  recalculateAllRows();
}

function deleteRow(btn) {
  if (confirm("মুছে ফেলতে চান?")) btn.closest("tr").remove();
}

function triggerConfetti() {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
