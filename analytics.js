// ===== Transactions Over Time Chart =====
const ctx1 = document.getElementById('transactionsChart').getContext('2d');
const transactionsChart = new Chart(ctx1, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Transactions',
      data: [120, 150, 100, 180, 160, 200],
      borderColor: '#00bcd4',
      backgroundColor: 'rgba(0,188,212,0.2)',
      tension: 0.4,
      fill: true,
      pointRadius: 5
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  }
});

// ===== Account Balance Chart =====
const ctx2 = document.getElementById('balanceChart').getContext('2d');
const balanceChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Balance (R)',
      data: [35000, 42000, 38000, 45000, 48000, 50000],
      backgroundColor: '#00bcd4'
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
      x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  }
});

