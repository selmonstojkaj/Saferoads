// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Line chart
  const incidentsCtx = document.getElementById('incidentsChart');
  if (incidentsCtx) {
    new Chart(incidentsCtx, {
      type: 'line',
      data: {
        labels: ['Nov 26', 'Nov 27', 'Nov 28', 'Nov 29', 'Nov 30'],
        datasets: [{
          label: 'Incidents',
          data: [32, 54, 40, 64, 48],
          borderColor: '#1e88e5',
          backgroundColor: 'rgba(30, 136, 229, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Pie chart
  const pieCtx = document.getElementById('pieChart');
  if (pieCtx) {
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Traffic', 'Construction', 'Other'],
        datasets: [{
          data: [45, 16, 39],
          backgroundColor: ['#1e88e5', '#43a047', '#fb8c00']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Bar chart
  const barCtx = document.getElementById('barChart');
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Main Street', 'Highway Exit 20', 'Oak Street Bridge'],
        datasets: [{
          label: 'Incidents',
          data: [64, 32, 48],
          backgroundColor: '#1e88e5'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // Report modal handlers
  let modal = document.getElementById('reportModal')
  let btn = document.querySelector('button:nth-of-type(1)')
  let span = document.querySelector('.close')
  let saveBtn = document.getElementById('saveReport')
  let reportText = document.getElementById('reportText')

  //modal open
  if (btn) {
    btn.onclick = function() {
      modal.style.display = 'block'
    }
  }

  //modal close
  if (span) {
    span.onclick = function() {
      modal.style.display = 'none'
    }
  }

  //close modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }

  //save report
  if (saveBtn) {
    saveBtn.onclick = function() {
        let report = reportText.value.trim();
        if(report){
            alert('Report saved: ' + report);
            reportText.value = '';
            modal.style.display = 'none';
        } else{
            alert('Please enter a report before saving.');
        }
    }
  }
});


  