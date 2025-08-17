const projects = [
  {
    name: "Urban Tower Project",
    status: "In Progress",
    pv: 8, ev: 7.8, ac: 8.2,
    cv: -0.4, sv: -0.2,
    cpi: 0.95, spi: 0.98,
    eac: 12.63,
    cpiData: [0.98, 0.97, 0.96, 0.95],
    spiData: [1.00, 0.99, 0.98, 0.98]
  },
  {
    name: "Highway Expansion",
    status: "Planning",
    pv: 3, ev: 2.5, ac: 2.7,
    cv: -0.2, sv: -0.5,
    cpi: 0.93, spi: 0.83,
    eac: 26.88,
    cpiData: [0.95, 0.94, 0.93, 0.93],
    spiData: [0.90, 0.87, 0.85, 0.83]
  },
  {
    name: "Residential Complex",
    status: "Completed",
    pv: 8, ev: 8, ac: 7.9,
    cv: 0.1, sv: 0,
    cpi: 1.01, spi: 1.0,
    eac: 7.92,
    cpiData: [1.00, 1.01, 1.01, 1.01],
    spiData: [1.00, 1.00, 1.00, 1.00]
  }
];

// Mobile Menu Toggle 
const burger = document.querySelector('.burger'); 
const navLinks = document.querySelector('.nav-links'); 
 
burger.addEventListener('click', () => { 
    navLinks.classList.toggle('active'); 
    burger.classList.toggle('toggle'); 
}); 
 
// Smooth Scroll 
document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
    anchor.addEventListener('click', function (e) { 
        e.preventDefault(); 
        document.querySelector(this.getAttribute('href')).scrollIntoView({ 
            behavior: 'smooth' 
        }); 
    }); 
}); 
 
// EVA Chart Previews using Chart.js (Trend Analysis for CPI/SPI) 
function createEvaChart(elementId, cpiData, spiData) { 
    const ctx = document.getElementById(elementId).getContext('2d'); 
    new Chart(ctx, { 
        type: 'line', 
        data: { 
            labels: ['Month 1', 'Month 2', 'Month 3', 'Current'], 
            datasets: [ 
                { 
                    label: 'CPI', 
                    data: cpiData, 
                    borderColor: '#ff6200', 
                    fill: false, 
                    tension: 0.1 
                }, 
                { 
                    label: 'SPI', 
                    data: spiData, 
                    borderColor: '#28a745', 
                    fill: false, 
                    tension: 0.1 
                } 
            ] 
        }, 
        options: { 
            scales: { 
                y: { 
                    beginAtZero: false, 
                    min: 0.5, 
                    max: 1.5, 
                    title: { display: true, text: 'Index' } 
                }, 
                x: { title: { display: true, text: 'Time' } } 
            }, 
            plugins: { 
                legend: { display: true } 
            } 
        } 
    }); 
} 

function renderProjectCards() {
  const container = document.getElementById("summaries-container");
  projects.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Status: ${p.status}<br>
      PV: $${p.pv}M<br>
      EV: $${p.ev}M<br>
      AC: $${p.ac}M<br>
      CV: $${p.cv}M<br>
      SV: $${p.sv}M<br>
      CPI: ${p.cpi}<br>
      SPI: ${p.spi}<br>
      EAC: $${p.eac}M</p>
      <canvas class="eva-chart" id="eva-${index}"></canvas>
      <button onclick="viewSummary('${p.name}')">View Details</button>
    `;
    container.appendChild(card);

    // Draw chart
    createEvaChart(`eva-${index}`, p.cpiData, p.spiData);
  });
}

// Call after DOM loads
document.addEventListener("DOMContentLoaded", renderProjectCards);

// Initialize EVA Trend Charts 
createEvaChart('eva-urban', [0.98, 0.97, 0.96, 0.95], [1.00, 0.99, 0.98, 0.98]); 
createEvaChart('eva-highway', [0.95, 0.94, 0.93, 0.93], [0.90, 0.87, 0.85, 0.83]); 
createEvaChart('eva-residential', [1.00, 1.01, 1.01, 1.01], [1.00, 1.00, 1.00, 1.00]); 
 
// Add Forecasting Indicators 
function addForecastingIndicator() { 
    const cards = document.querySelectorAll('.summary-card'); 
    cards.forEach(card => { 
        const eacText = card.querySelector('p').textContent.match(/EAC: \$([\d.]+)M/)[1]; 
        const budgetText = card.querySelector('p').textContent.match(/PV: \$([\d.]+)M/)[1]; 
        const eac = parseFloat(eacText); 
        const budget = parseFloat(budgetText); 
        const indicator = document.createElement('div'); 
        indicator.className = 'forecasting-indicator'; 
        if (eac <= budget) { 
            indicator.classList.add('on-track'); 
        } else if (eac <= budget * 1.05) { 
            indicator.classList.add('warning'); 
        } else { 
            indicator.classList.add('critical'); 
        } 
        card.appendChild(indicator); 
    }); 
} 
addForecastingIndicator(); 
 
// View Summary Function 
function viewSummary(projectName) { 
    alert(`Viewing EVA details for ${projectName}. Access trend analysis, forecasting, and detailed EVM metrics with integrations.`); 
} 
 
// Form Submission 
document.getElementById('contact-form').addEventListener('submit', function (e) { 
    e.preventDefault(); 
    alert('Thank you for your message! We’ll contact you to schedule an EVA demo.'); 
    this.reset(); 
});
