// ======= TRANSACTIONS JS ======= //

// Grab DOM elements
const addBtn = document.getElementById("add-transaction-btn");
const modal = document.getElementById("transaction-form-modal");
const closeBtn = modal.querySelector(".close-btn");
const form = document.getElementById("transaction-form");
const tableBody = document.querySelector("#transactions-table tbody");
const summaryCredits = document.getElementById("summary-credits");
const summaryDebits = document.getElementById("summary-debits");
const summaryBalance = document.getElementById("summary-balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editIndex = null; // Track editing

// ===== Helpers =====
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ===== Show Modal =====
addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// ===== Close Modal =====
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  form.reset();
  editIndex = null;
});

// ===== Submit Form =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!date || !description || isNaN(amount)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const transaction = { date, description, amount, type };

  if (editIndex !== null) {
    // Edit existing transaction
    transactions[editIndex] = transaction;
  } else {
    // Add new transaction
    transactions.push(transaction);
  }

  saveTransactions();
  renderTable();
  modal.classList.add("hidden");
  form.reset();
  editIndex = null;
});

// ===== Render Table =====
function renderTable() {
  tableBody.innerHTML = "";

  transactions.forEach((t, index) => {
    const row = document.createElement("tr");
    row.classList.add("fade-in");

    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.description}</td>
      <td class="${t.type === "credit" ? "text-green" : "text-red"}">
        ${formatCurrency(t.amount)}
      </td>
      <td>${t.type}</td>
      <td>
        <button class="edit-btn" data-index="${index}">✏️</button>
        <button class="delete-btn" data-index="${index}">🗑️</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Attach Edit/Delete Listeners
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      editIndex = btn.dataset.index;
      const t = transactions[editIndex];
      document.getElementById("date").value = t.date;
      document.getElementById("description").value = t.description;
      document.getElementById("amount").value = t.amount;
      document.getElementById("type").value = t.type;
      modal.classList.remove("hidden");
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      if (confirm("Are you sure you want to delete this transaction?")) {
        transactions.splice(idx, 1);
        saveTransactions();
        renderTable();
      }
    });
  });

  updateSummary();
}

// ===== Update Summary =====
function updateSummary() {
  let credits = 0,
    debits = 0;

  transactions.forEach((t) => {
    if (t.type === "credit") credits += t.amount;
    else debits += t.amount;
  });

  const balance = credits - debits;

  summaryCredits.textContent = formatCurrency(credits);
  summaryDebits.textContent = formatCurrency(debits);
  summaryBalance.textContent = formatCurrency(balance);
}

// ===== Initial Render =====
renderTable();

