




// Demo data
const units = [
{ id: 'UNIT-000', type:'Police', label:'Police - Sector 3', status:'Resolved', icon:'' },
{ id: 'UNIT-001', type:'Ambulance', label:'Ambulance - Main', status:'On call', icon:'' },
{ id: 'UNIT-002', type:'Tow', label:'Tow - East', status:'Available', icon:'' },
{ id: 'UNIT-003', type:'Fire', label:'Fire - Station 1', status:'Responding', icon:'' }
];

const incidents = [
{ id:'INC-000', type:'Armed Robbery', loc:'123 Main St', severity:'Critical', status:'In progress', unit:'UNIT-000', time:'10 min ago' },
{ id:'INC-001', type:'Vehicle Collision', loc:'Oak St / 5th Ave', severity:'High', status:'Awaiting', unit:'-', time:'18 min ago' },
{ id:'INC-002', type:'Medical', loc:'River Park', severity:'Medium', status:'Resolved', unit:'UNIT-001', time:'30 min ago' }
];

// Render units
function renderUnits(){
const el = document.getElementById('unitsList');
el.innerHTML = '';
units.forEach(u => {
const div = document.createElement('div');
div.className = 'unit';
div.innerHTML = `
<div class="meta">
<div style="width:46px;height:34px;background:#f1f5f9;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px">${u.icon}</div>
<div>
<div style="font-weight:700">${u.id}</div>
<div class="small">${u.label}</div>
</div>
</div>
<div class="controls">
<span class="badge ${u.status==='Resolved' ? 'badge-resolved' : u.status==='On call' ? 'badge-oncall' : ''}">${u.status}</span>
<div style="margin-top:6px;display:flex;gap:6px;justify-content:flex-end">
<button class="small-btn" onclick="messageUnit('${u.id}')">Msg</button>
<button class="small-btn" onclick="assignUnit('${u.id}')">Assign</button>
<button class="danger-btn" onclick="toggleResolve('${u.id}')">Toggle</button>
</div>
</div>
`;
el.appendChild(div);
});
}

// Render incidents table
function renderIncidents(filterSeverity = 'all'){
const tbody = document.getElementById('incTable');
tbody.innerHTML = '';
const list = incidents.filter(i => filterSeverity==='all' ? true : i.severity === filterSeverity);
list.forEach(i => {
const tr = document.createElement('tr');
tr.innerHTML = `
<td>${i.id}</td>
<td>${i.type}</td>
<td>${i.loc}</td>
<td style="font-weight:700;color:${i.severity==='Critical'? 'var(--danger)' : i.severity==='High' ? 'var(--warn)' : i.severity==='Medium' ? 'var(--ok)' : 'var(--muted)'}">${i.severity}</td>
<td>${i.status}</td>
<td>${i.unit}</td>
<td>${i.time}</td>
<td>
<button class="filter" onclick="viewIncident('${i.id}')">View</button>
<button class="filter" onclick="resolveIncident('${i.id}')">Resolve</button>
</td>
`;
tbody.appendChild(tr);
});

// update active count
const activeCount = incidents.filter(x => x.status !== 'Resolved').length;
document.getElementById('activeInc').textContent = activeCount;
document.getElementById('highPri').textContent = incidents.filter(x=> x.severity==='Critical' || x.severity==='High').length;
}

// Small interactions
function addDemoIncident(){
const id = 'INC-' + Math.floor(Math.random()*900 + 100);
const types = ['Traffic','Medical','Fire','Robbery','Collision'];
const locs = ['5th Ave','Oak St','Highway 20','Downtown','River Park'];
const sev = ['Low','Medium','High','Critical'];
const newInc = {
id,
type: types[Math.floor(Math.random()*types.length)],
loc: locs[Math.floor(Math.random()*locs.length)],
severity: sev[Math.floor(Math.random()*sev.length)],
status: 'New',
unit: '-',
time: 'just now'
};
incidents.unshift(newInc);
renderIncidents(document.getElementById('severityFilter').value);
}

function viewIncident(id){
const inc = incidents.find(i=>i.id===id);
alert(`${inc.id} — ${inc.type}\nLocation: ${inc.loc}\nSeverity: ${inc.severity}\nStatus: ${inc.status}`);
}

function resolveIncident(id){
const inc = incidents.find(i=>i.id===id);
if(!inc) return;
inc.status = 'Resolved';
renderIncidents(document.getElementById('severityFilter').value);
}

function messageUnit(id){ alert('Message sent to '+id); }
function assignUnit(id){ alert('Assign dialog for '+id); }
function toggleResolve(id){
const u = units.find(x=>x.id===id);
if(!u) return;
u.status = (u.status==='Resolved') ? 'On call' : 'Resolved';
renderUnits();
}
function messageAll(){ alert('Message to all units'); }
function recallAll(){ alert('Recall broadcast sent'); }

function openDispatch(){ alert('Open dispatch modal'); }
function openAlerts(){ alert('Open alerts panel'); }

function applyFilter(){
const v = document.getElementById('severityFilter').value;
renderIncidents(v);
}

// OPEN FORM (from button or Quick Actions)
function openCreate() {
  document.getElementById("createReportModal").classList.remove("hidden");
}

// Wait for DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', function() {
  // Initial render
  renderUnits();
  renderIncidents();
  
  // Attach event listener for Create Report button
  const createReportBtn = document.getElementById("createReportBtn");
  if (createReportBtn) {
    createReportBtn.onclick = openCreate;
  }
});

// Expose a tiny keyboard demo: press "n" to add incident
document.addEventListener('keydown', e => {
if(e.key === 'n') addDemoIncident();
});

// CLOSE FORM
function closeCreateReport() {
  document.getElementById("createReportModal").classList.add("hidden");
}

// SAVE REPORT (you can expand this)
function submitReport() {
  const type = document.getElementById("repType").value;
  const location = document.getElementById("repLocation").value;
  const severity = document.getElementById("repSeverity").value;
  const desc = document.getElementById("repDesc").value;

  if (!type || !location) {
    alert("Please fill all required fields.");
    return;
  }

  alert("Report saved!");

  closeCreateReport();
}



function openOfficerInfo() {
  document.getElementById("officerInfoModal").classList.remove("hidden");
}

function closeOfficerInfo() {
  document.getElementById("officerInfoModal").classList.add("hidden");
}

function saveOfficerInfo() {
  const name = document.getElementById("officerName").value;
  const badge = document.getElementById("badgeNumber").value;
  const notes = document.getElementById("officerNotes").value;

  // You can store it or attach it to reports later
  console.log("Officer Info Saved:", { name, badge, notes });

  closeOfficerInfo();
}
