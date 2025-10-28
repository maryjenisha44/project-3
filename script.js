const employees = [
  { id: 1, name: "Asha Kumar", role: "Frontend Engineer", dept: "Cloud", email: "asha.kumar@ibm.com", phone: "+91 98765 43210", location: "Bengaluru" },
  { id: 2, name: "Ravi Menon", role: "UI/UX Designer", dept: "Design", email: "ravi.m@ibm.com", phone: "+91 91234 56789", location: "Chennai" },
  { id: 3, name: "Nisha Patel", role: "Frontend Engineer", dept: "Automation", email: "nisha.p@ibm.com", phone: "+91 99876 54321", location: "Hyderabad" },
  { id: 4, name: "Karan Singh", role: "QA Engineer", dept: "Automation", email: "karan.s@ibm.com", phone: "+91 90123 45678", location: "Pune" },
  { id: 5, name: "Maya Rao", role: "Engineering Manager", dept: "Cloud", email: "maya.rao@ibm.com", phone: "+91 90000 11122", location: "Bengaluru" },
  { id: 6, name: "John Doe", role: "DevOps Engineer", dept: "Platform", email: "john.doe@ibm.com", phone: "+91 98888 77766", location: "Mumbai" },
];

const grid = document.getElementById("grid");
const queryInput = document.getElementById("query");
const deptFilter = document.getElementById("deptFilter");
const sortBy = document.getElementById("sortBy");
const countEl = document.getElementById("count");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

function initFilters() {
  const depts = [...new Set(employees.map((e) => e.dept))].sort();
  depts.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    deptFilter.appendChild(opt);
  });
}

function renderCard(emp) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="avatar">${emp.name.split(" ").map(s=>s[0]).join("")}</div>
    <div class="info">
      <p class="name">${emp.name}</p>
      <div class="meta">${emp.role} • ${emp.location}</div>
      <div class="tags">
        <span class="tag">${emp.email}</span>
        <span class="tag">${emp.dept}</span>
      </div>
    </div>
    <div class="actions">
      <button onclick="openModal(${emp.id})">View</button>
    </div>`;
  return card;
}

function renderGrid(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = "<div class='muted'>No employees found.</div>";
  }
  list.forEach((emp) => grid.appendChild(renderCard(emp)));
  countEl.textContent = `${list.length} employee${list.length === 1 ? "" : "s"}`;
}

function openModal(id) {
  const emp = employees.find((e) => e.id === id);
  modalContent.innerHTML = `
    <h2>${emp.name}</h2>
    <p>${emp.role} • ${emp.dept}</p>
    <p><strong>Email:</strong> ${emp.email}</p>
    <p><strong>Phone:</strong> ${emp.phone}</p>
    <p><strong>Location:</strong> ${emp.location}</p>`;
  modal.classList.add("show");
}

closeModal.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

function applyFilters() {
  const q = queryInput.value.toLowerCase();
  const dept = deptFilter.value;
  const sort = sortBy.value;

  let filtered = employees.filter((emp) => {
    const text = [emp.name, emp.role, emp.email].join(" ").toLowerCase();
    return (!q || text.includes(q)) && (!dept || emp.dept === dept);
  });

  filtered.sort((a, b) => a[sort].localeCompare(b[sort]));
  renderGrid(filtered);
}

queryInput.addEventListener("input", applyFilters);
deptFilter.addEventListener("change", applyFilters);
sortBy.addEventListener("change", applyFilters);

initFilters();
applyFilters();
