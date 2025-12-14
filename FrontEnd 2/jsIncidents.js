// Extended incident data
let incidents = [
  { id:'INC-000', type:'Armed Robbery', loc:'123 Main St', severity:'Critical', status:'In progress', unit:'UNIT-000', time:'10 min ago', description:'Armed robbery reported at convenience store. Suspects fled in vehicle.', reportedBy:'Officer Smith', reportedAt:'2024-01-15 14:30' },
  { id:'INC-001', type:'Vehicle Collision', loc:'Oak St / 5th Ave', severity:'High', status:'Awaiting', unit:'-', time:'18 min ago', description:'Two-vehicle collision with minor injuries. Traffic blocked.', reportedBy:'Dispatch', reportedAt:'2024-01-15 14:22' },
  { id:'INC-002', type:'Medical Emergency', loc:'River Park', severity:'Medium', status:'Resolved', unit:'UNIT-001', time:'30 min ago', description:'Medical emergency - person collapsed. Ambulance responded.', reportedBy:'Citizen Report', reportedAt:'2024-01-15 14:00' },
  { id:'INC-003', type:'Traffic Accident', loc:'Highway 20, Exit 5', severity:'High', status:'In progress', unit:'UNIT-002', time:'45 min ago', description:'Multi-vehicle pileup on highway. Multiple injuries reported.', reportedBy:'Highway Patrol', reportedAt:'2024-01-15 13:45' },
  { id:'INC-004', type:'Fire Alarm', loc:'Downtown Plaza', severity:'Medium', status:'Awaiting', unit:'-', time:'1 hour ago', description:'Fire alarm activated. Building evacuated as precaution.', reportedBy:'Security System', reportedAt:'2024-01-15 13:30' },
  { id:'INC-005', type:'Disturbance', loc:'City Park', severity:'Low', status:'Resolved', unit:'UNIT-000', time:'2 hours ago', description:'Noise complaint. Situation resolved peacefully.', reportedBy:'Citizen Report', reportedAt:'2024-01-15 12:30' }
];

let editingIncidentId = null;

// Render incidents table
function renderIncidents(filterSeverity = 'all', filterStatus = 'all', searchTerm = '') {
  const tbody = document.getElementById('incidentsTableBody');
  tbody.innerHTML = '';
  
  let filtered = incidents.filter(i => {
    const severityMatch = filterSeverity === 'all' || i.severity === filterSeverity;
    const statusMatch = filterStatus === 'all' || i.status === filterStatus;
    const searchMatch = searchTerm === '' || 
      i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.loc.toLowerCase().includes(searchTerm.toLowerCase());
    
    return severityMatch && statusMatch && searchMatch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center;padding:40px;color:var(--muted)">
          <i class="fa-solid fa-inbox" style="font-size: 48px; display: block; margin-bottom: 12px; opacity: 0.5;"></i>
          <div style="font-size: 16px; font-weight: 600; margin-bottom: 6px;">No incidents found</div>
          <div style="font-size: 13px; opacity: 0.8;">Try adjusting your filters or search terms</div>
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(i => {
    const tr = document.createElement('tr');
    const severityIcon = i.severity === 'Critical' ? 'fa-solid fa-circle-exclamation' : 
                        i.severity === 'High' ? 'fa-solid fa-triangle-exclamation' :
                        i.severity === 'Medium' ? 'fa-solid fa-circle-info' : 'fa-solid fa-circle';
    const statusIcon = i.status === 'New' ? 'fa-solid fa-circle' :
                      i.status === 'In progress' ? 'fa-solid fa-spinner' :
                      i.status === 'Resolved' ? 'fa-solid fa-check-circle' : 'fa-solid fa-clock';
    const statusClass = i.status.toLowerCase().replace(' ', '-');
    
    tr.innerHTML = `
      <td style="font-weight:700; color: var(--accent);">${i.id}</td>
      <td><strong>${i.type}</strong></td>
      <td><i class="fa-solid fa-location-dot" style="color: var(--muted); margin-right: 6px;"></i>${i.loc}</td>
      <td><span class="severity-badge severity-${i.severity.toLowerCase()}"><i class="${severityIcon}"></i>${i.severity}</span></td>
      <td><span class="status-badge status-${statusClass}"><i class="${statusIcon}"></i>${i.status}</span></td>
      <td>${i.unit === '-' ? '<span style="color: var(--muted);">—</span>' : i.unit}</td>
      <td><i class="fa-solid fa-clock" style="color: var(--muted); margin-right: 6px;"></i>${i.time}</td>
      <td>
        <div class="actions-group">
          <button class="view-detail-btn" onclick="viewIncidentDetail('${i.id}')">
            <i class="fa-solid fa-eye"></i> View
          </button>
          <button class="filter" onclick="editIncidentById('${i.id}')">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
          <button class="filter" onclick="resolveIncident('${i.id}')">
            <i class="fa-solid fa-check"></i> Resolve
          </button>
          <button class="filter danger-btn" onclick="deleteIncident('${i.id}')">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update stats
  updateStats();
}

// Update statistics
function updateStats() {
  document.getElementById('totalIncidents').textContent = incidents.length;
  document.getElementById('activeIncidents').textContent = incidents.filter(x => x.status !== 'Resolved').length;
  document.getElementById('criticalIncidents').textContent = incidents.filter(x => x.severity === 'Critical').length;
  document.getElementById('resolvedToday').textContent = incidents.filter(x => x.status === 'Resolved').length;
}

// Filter incidents
function filterIncidents() {
  const severity = document.getElementById('severityFilter').value;
  const status = document.getElementById('statusFilter').value;
  const search = document.getElementById('searchInput').value;
  renderIncidents(severity, status, search);
}

// Clear filters
function clearFilters() {
  document.getElementById('severityFilter').value = 'all';
  document.getElementById('statusFilter').value = 'all';
  document.getElementById('searchInput').value = '';
  renderIncidents();
}

// View incident detail
function viewIncidentDetail(id) {
  const inc = incidents.find(i => i.id === id);
  if (!inc) return;

  const content = document.getElementById('incidentDetailContent');
  const severityIcon = inc.severity === 'Critical' ? 'fa-solid fa-circle-exclamation' : 
                      inc.severity === 'High' ? 'fa-solid fa-triangle-exclamation' :
                      inc.severity === 'Medium' ? 'fa-solid fa-circle-info' : 'fa-solid fa-circle';
  const statusIcon = inc.status === 'New' ? 'fa-solid fa-circle' :
                    inc.status === 'In progress' ? 'fa-solid fa-spinner' :
                    inc.status === 'Resolved' ? 'fa-solid fa-check-circle' : 'fa-solid fa-clock';
  const statusClass = inc.status.toLowerCase().replace(' ', '-');
  
  content.innerHTML = `
    <div class="incident-detail">
      <h3><i class="fa-solid fa-circle-exclamation"></i> ${inc.id}</h3>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-tag"></i> Type:</div>
        <div class="detail-value"><strong>${inc.type}</strong></div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-location-dot"></i> Location:</div>
        <div class="detail-value">${inc.loc}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-exclamation-triangle"></i> Severity:</div>
        <div class="detail-value"><span class="severity-badge severity-${inc.severity.toLowerCase()}"><i class="${severityIcon}"></i>${inc.severity}</span></div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-clock"></i> Status:</div>
        <div class="detail-value"><span class="status-badge status-${statusClass}"><i class="${statusIcon}"></i>${inc.status}</span></div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-users"></i> Assigned Unit:</div>
        <div class="detail-value">${inc.unit === '-' ? '<span style="color: var(--muted);">Not assigned</span>' : inc.unit}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-user"></i> Reported By:</div>
        <div class="detail-value">${inc.reportedBy || 'Unknown'}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-calendar"></i> Reported At:</div>
        <div class="detail-value">${inc.reportedAt || inc.time}</div>
      </div>
      <div class="detail-row">
        <div class="detail-label"><i class="fa-solid fa-file-lines"></i> Description:</div>
        <div class="detail-value">${inc.description || '<span style="color: var(--muted);">No description provided</span>'}</div>
      </div>
    </div>
  `;
  document.getElementById('incidentDetailModal').classList.remove('hidden');
}

// Close incident detail
function closeIncidentDetail() {
  document.getElementById('incidentDetailModal').classList.add('hidden');
}

// Open create incident modal
function openCreateIncident() {
  editingIncidentId = null;
  const titleEl = document.getElementById('modalTitle');
  titleEl.innerHTML = '<i class="fa-solid fa-plus"></i><span>Create New Incident</span>';
  document.getElementById('incType').value = '';
  document.getElementById('incLocation').value = '';
  document.getElementById('incSeverity').value = 'Medium';
  document.getElementById('incStatus').value = 'New';
  document.getElementById('incUnit').value = '';
  document.getElementById('incDescription').value = '';
  document.getElementById('createIncidentModal').classList.remove('hidden');
}

// Close create incident modal
function closeCreateIncident() {
  document.getElementById('createIncidentModal').classList.add('hidden');
  editingIncidentId = null;
}

// Edit incident by ID
function editIncidentById(id) {
  const inc = incidents.find(i => i.id === id);
  if (!inc) return;

  editingIncidentId = id;
  const titleEl = document.getElementById('modalTitle');
  titleEl.innerHTML = '<i class="fa-solid fa-pen"></i><span>Edit Incident</span>';
  document.getElementById('incType').value = inc.type;
  document.getElementById('incLocation').value = inc.loc;
  document.getElementById('incSeverity').value = inc.severity;
  document.getElementById('incStatus').value = inc.status;
  document.getElementById('incUnit').value = inc.unit === '-' ? '' : inc.unit;
  document.getElementById('incDescription').value = inc.description || '';
  document.getElementById('createIncidentModal').classList.remove('hidden');
}

// Save incident
function saveIncident() {
  const type = document.getElementById('incType').value.trim();
  const location = document.getElementById('incLocation').value.trim();
  const severity = document.getElementById('incSeverity').value;
  const status = document.getElementById('incStatus').value;
  const unit = document.getElementById('incUnit').value.trim() || '-';
  const description = document.getElementById('incDescription').value.trim();

  if (!type || !location) {
    alert('Please fill in all required fields (Type and Location).');
    return;
  }

  if (editingIncidentId) {
    // Update existing
    const inc = incidents.find(i => i.id === editingIncidentId);
    if (inc) {
      inc.type = type;
      inc.loc = location;
      inc.severity = severity;
      inc.status = status;
      inc.unit = unit;
      inc.description = description;
    }
  } else {
    // Create new
    const id = 'INC-' + String(incidents.length).padStart(3, '0');
    incidents.unshift({
      id,
      type,
      loc: location,
      severity,
      status,
      unit,
      time: 'just now',
      description,
      reportedBy: 'Current User',
      reportedAt: new Date().toLocaleString()
    });
  }

  closeCreateIncident();
  filterIncidents();
}

// Resolve incident
function resolveIncident(id) {
  const inc = incidents.find(i => i.id === id);
  if (!inc) return;
  
  if (confirm(`Mark incident ${id} as resolved?`)) {
    inc.status = 'Resolved';
    filterIncidents();
  }
}

// Delete incident
function deleteIncident(id) {
  const inc = incidents.find(i => i.id === id);
  if (!inc) return;
  
  if (confirm(`Are you sure you want to delete incident ${id}? This action cannot be undone.`)) {
    incidents = incidents.filter(i => i.id !== id);
    filterIncidents();
  }
}

// Add demo incident
function addDemoIncident() {
  const id = 'INC-' + String(incidents.length).padStart(3, '0');
  const types = ['Traffic Accident', 'Medical Emergency', 'Fire Alarm', 'Robbery', 'Vehicle Collision', 'Disturbance'];
  const locs = ['5th Ave', 'Oak St', 'Highway 20', 'Downtown', 'River Park', 'City Center'];
  const sev = ['Low', 'Medium', 'High', 'Critical'];
  const statuses = ['New', 'In progress', 'Awaiting'];
  
  const newInc = {
    id,
    type: types[Math.floor(Math.random() * types.length)],
    loc: locs[Math.floor(Math.random() * locs.length)],
    severity: sev[Math.floor(Math.random() * sev.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    unit: '-',
    time: 'just now',
    description: 'Demo incident created for testing purposes.',
    reportedBy: 'System',
    reportedAt: new Date().toLocaleString()
  };
  
  incidents.unshift(newInc);
  filterIncidents();
}

// Export incidents
function exportIncidents() {
  const dataStr = JSON.stringify(incidents, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'incidents-export-' + new Date().toISOString().split('T')[0] + '.json';
  link.click();
  URL.revokeObjectURL(url);
}

// Edit incident from detail modal
function editIncident() {
  const modal = document.getElementById('incidentDetailModal');
  const content = document.getElementById('incidentDetailContent');
  const idMatch = content.innerHTML.match(/INC-\d+/);
  if (idMatch) {
    closeIncidentDetail();
    editIncidentById(idMatch[0]);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderIncidents();
  
  // Close modals when clicking outside
  window.onclick = function(event) {
    const detailModal = document.getElementById('incidentDetailModal');
    const createModal = document.getElementById('createIncidentModal');
    if (event.target == detailModal) {
      closeIncidentDetail();
    }
    if (event.target == createModal) {
      closeCreateIncident();
    }
  };
});