// ================== DASHBOARD JS ==================

// Sample transactions (replace with API or DB fetch later)
const transactions = [
  { date: '2025-08-01', desc: 'Salary', type: 'Credit', amount: 25000 },
  { date: '2025-08-03', desc: 'Groceries', type: 'Debit', amount: 2800 },
  { date: '2025-08-05', desc: 'Electricity Bill', type: 'Debit', amount: 1400 },
  { date: '2025-08-07', desc: 'Rent', type: 'Debit', amount: 8000 },
  { date: '2025-08-10', desc: 'Gym Membership', type: 'Debit', amount: 600 }
];

// Utility: format money
function formatMoney(amount) {
  return `R${amount.toLocaleString()}`;
}

// Calculate metrics dynamically
const metrics = {
  totalTransactions: transactions.length,
  accountBalance: transactions.reduce((acc, tx) => {
    return tx.type === "Credit" ? acc + tx.amount : acc - tx.amount;
  }, 0),
  activeProjects: 6 // placeholder
};

// Insert metrics into DOM
document.getElementById("total-transactions").textContent = metrics.totalTransactions;
document.getElementById("account-balance").textContent = formatMoney(metrics.accountBalance);
document.getElementById("active-projects").textContent = metrics.activeProjects;

// Populate transaction table
const tableBody = document.querySelector("#transactions-table tbody");
transactions.forEach(tx => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${tx.date}</td>
    <td>${tx.desc}</td>
    <td class="${tx.type === 'Credit' ? 'credit' : 'debit'}">${tx.type}</td>
    <td class="${tx.type === 'Credit' ? 'credit' : 'debit'}">
      ${tx.type === "Debit" ? "-" : "+"}${formatMoney(tx.amount)}
    </td>
  `;
  tableBody.appendChild(row);
});

// ====== CHART.JS TRANSACTIONS ======
const ctx = document.getElementById("transactionChart").getContext("2d");

const chartData = {
  labels: transactions.map(tx => tx.date),
  datasets: [{
    label: "Credits",
    data: transactions.map(tx => (tx.type === "Credit" ? tx.amount : 0)),
    backgroundColor: "#4CAF50"
  }, {
    label: "Debits",
    data: transactions.map(tx => (tx.type === "Debit" ? tx.amount : 0)),
    backgroundColor: "#FF5252"
  }]
};

const transactionChart = new Chart(ctx, {
  type: "bar",
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#fff" }
      },
      title: {
        display: true,
        text: "Recent Transactions Overview",
        color: "#fff",
        font: { size: 18 }
      }
    },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { color: "#444" } },
      y: { ticks: { color: "#ccc", callback: value => `R${value}` }, grid: { color: "#444" } }
    }
  }
});
