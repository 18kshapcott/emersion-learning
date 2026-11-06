function readMedicationRows(container, prefix) {
  if (!container) return [];

  return Array.from(container.querySelectorAll("div.border"))
    .map(row => {
      const obj = {};
      row.querySelectorAll("[data-role]").forEach(el => {
        const key = el.getAttribute("data-role");
        const clean = key.replace(`${prefix}-`, "");
        if (el.value !== "") obj[clean] = el.value;
      });
      return obj;
    })
    .filter(item => Object.keys(item).length > 0);
}

function collectCanonicalCaseFromForm() {
  const homeContainer = document.getElementById("homeMedsContainer");
  const inpatientContainer = document.getElementById("inpatientMedsContainer");
  const marContainer = document.getElementById("marContainer");

  const rawCase = {
    schemaVersion: 1,
    id: Date.now(),
    title: document.getElementById("newTitle")?.value || "",
    displayTitle: document.getElementById("newTitle")?.value || "",
    author: document.getElementById("newAuthor")?.value || "",
    institution: document.getElementById("newInstitution")?.value || "",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {
      setting: document.getElementById("newSetting")?.value || "outpatient-community",
      settingOther: document.getElementById("newSettingOther")?.value || "",
      patientName: document.getElementById("newName")?.value || "",
      age: document.getElementById("newAge")?.value || null,
      gender: document.getElementById("newGender")?.value || "",
      raceEthnicity: document.getElementById("newRace")?.value || "",
      insurance: document.getElementById("newInsurance")?.value || "",
      allergies: (document.getElementById("newAllergies")?.value || "")
        .split(",")
        .map(v => v.trim())
        .filter(Boolean),
      immunizations: (document.getElementById("newImmunizations")?.value || "")
        .split(/\n|,/) 
        .map(v => v.trim())
        .filter(Boolean)
    },
    introduction: {
      chiefComplaint: document.getElementById("newCC")?.value || "",
      caseIntro: document.getElementById("newIntro")?.value || "",
      hpi: document.getElementById("newHPI")?.value || ""
    },
    history: {
      pmh: (document.getElementById("newPMH")?.value || "")
        .split(",")
        .map(v => v.trim())
        .filter(Boolean),
      familyHistory: (document.getElementById("newFH")?.value || "")
        .split(",")
        .map(v => v.trim())
        .filter(Boolean),
      socialHistory: {
        maritalStatus: document.getElementById("newMarital")?.value || "",
        children: document.getElementById("newChildren")?.value || "",
        alcohol: document.getElementById("newAlcohol")?.value || "",
        tobacco: document.getElementById("newTobacco")?.value || "",
        caffeine: document.getElementById("newCaffeine")?.value || ""
      },
      functionalStatus: {
        mobility: document.getElementById("newMobility")?.value || "",
        adl: document.getElementById("newADL")?.value || "",
        iadl: document.getElementById("newIADL")?.value || "",
        caregiverSupport: document.getElementById("newCaregiver")?.value || "",
        fallHistory: document.getElementById("newFalls")?.value || "",
        notes: document.getElementById("newFunctionalNotes")?.value || ""
      }
    },
    vitals: {
      bp: document.getElementById("newBP")?.value || "",
      hr: document.getElementById("newHR")?.value || "",
      temp: document.getElementById("newTemp")?.value || "",
      spO2: document.getElementById("newSpO2")?.value || "",
      weightKg: document.getElementById("newWeight")?.value || null,
      heightIn: document.getElementById("newHeight")?.value || null,
      bmi: document.getElementById("newBMI")?.value || null
    },
    intakeOutput: {
      oralIntake: document.getElementById("newOralIntake")?.value || "",
      ivIntake: document.getElementById("newIVIntake")?.value || "",
      urineOutput: document.getElementById("newUrineOutput")?.value || "",
      netBalance: document.getElementById("newNetBalance")?.value || "",
      notes: document.getElementById("newIONotes")?.value || ""
    },
    physicalExam: document.getElementById("newPE")?.value || "",
    medications: {
      home: readMedicationRows(homeContainer, "home-med"),
      inpatient: readMedicationRows(inpatientContainer, "inpatient-med"),
      mar: readMedicationRows(marContainer, "mar")
    },
    labs: [],
    diagnosticImages: {
      ekg: (document.getElementById("newEKG")?.value || "")
        .split(",")
        .map(v => v.trim())
        .filter(Boolean),
      cgm: (document.getElementById("newCGM")?.value || "")
        .split(",")
        .map(v => v.trim())
        .filter(Boolean),
      cxr: (document.getElementById("newCXR")?.value || "")
        .split(",")
        .map(v => v.trim())
        .filter(Boolean)
    },
    interviewFactors: [],
    hints: [],
    criticalElements: [],
    teachingPearls: [],
    primaryProblem: {
      label: document.getElementById("newPrimaryDiagnosis")?.value || "",
      acceptableAnswers: (document.getElementById("diagnosisList")?.value || "")
        .split(/\n|,/) 
        .map(v => v.trim())
        .filter(Boolean),
      expectedPlan: (document.getElementById("primaryPlanExpected")?.value || "")
        .split(/\n/)
        .map(v => v.trim())
        .filter(Boolean),
      planPoints: Number(document.getElementById("primaryPlanPoints")?.value || 0),
      expectedMonitoring: (document.getElementById("primaryMonitorExpected")?.value || "")
        .split(/\n/)
        .map(v => v.trim())
        .filter(Boolean),
      monitoringPoints: Number(document.getElementById("primaryMonitorPoints")?.value || 0)
    },
    secondaryProblems: [],
    scoring: {
      diagnosisWeight: 30,
      planWeight: 40,
      monitoringWeight: 20,
      confidenceWeight: 10
    }
  };

  return normalizeCaseInput(rawCase);
}

function addHomeMedRow() {
  const container = document.getElementById("homeMedsContainer");
  const row = document.createElement("div");
  row.className = "border border-gray-600 rounded p-3 mb-3 space-y-2";
  row.innerHTML = `
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Medication name" data-role="home-med-name">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Dose" data-role="home-med-dose">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Frequency" data-role="home-med-frequency">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Route" data-role="home-med-route">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Start date (YYYY-MM-DD)" data-role="home-med-startDate">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Therapy duration (e.g. 3 months)" data-role="home-med-therapyDuration">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Duration unit (days, months, years)" data-role="home-med-therapyDurationUnit">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Indication" data-role="home-med-indication">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Status (active, discontinued, etc.)" data-role="home-med-status">
  `;
  container.appendChild(row);
}

function addInpatientMedRow() {
  const container = document.getElementById("inpatientMedsContainer");
  const row = document.createElement("div");
  row.className = "border border-gray-600 rounded p-3 mb-3 space-y-2";
  row.innerHTML = `
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Medication name" data-role="inpatient-med-name">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Dose" data-role="inpatient-med-dose">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Frequency" data-role="inpatient-med-frequency">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Route" data-role="inpatient-med-route">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Start date (YYYY-MM-DD)" data-role="inpatient-med-startDate">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Therapy duration (e.g. 3 days)" data-role="inpatient-med-therapyDuration">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Duration unit (days, months, years)" data-role="inpatient-med-therapyDurationUnit">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Indication" data-role="inpatient-med-indication">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Status (active, discontinued, etc.)" data-role="inpatient-med-status">
  `;
  container.appendChild(row);
}

function addLabRow() {
  const container = document.getElementById("labsContainer");
  const row = document.createElement("div");
  row.className = "border border-gray-600 rounded p-3 mb-3 space-y-2";
  row.innerHTML = `
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Lab name (e.g., LDL)" data-role="lab-name">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Current value" data-role="lab-value">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Unit" data-role="lab-unit">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Reference range" data-role="lab-referenceRange">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Date (YYYY-MM-DD)" data-role="lab-date">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Category (lipid, renal, endocrine, etc.)" data-role="lab-category">
    <textarea class="w-full p-2 bg-gray-700 rounded" placeholder='Prior trend, one per line as: YYYY-MM-DD, value, unit' data-role="lab-trend"></textarea>
  `;
  container.appendChild(row);
}

function addMarRow() {
  const container = document.getElementById("marContainer");
  if (!container) return;

  const row = document.createElement("div");
  row.className = "border border-gray-600 rounded p-3 mb-3 space-y-2";
  row.innerHTML = `
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Medication name" data-role="mar-medicationName">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Dose" data-role="mar-dose">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Route" data-role="mar-route">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Scheduled time" data-role="mar-scheduledTime">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Administered at (HH:MM)" data-role="mar-administeredAt">
    <select class="w-full p-2 bg-gray-700 rounded" data-role="mar-status">
      <option value="">Status</option>
      <option value="given">Given</option>
      <option value="missed">Missed</option>
      <option value="held">Held</option>
      <option value="delayed">Delayed</option>
    </select>
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Administered by" data-role="mar-administeredBy">
    <input class="w-full p-2 bg-gray-700 rounded" placeholder="Last admin date" data-role="mar-lastAdministeredDate">
    <textarea class="w-full p-2 bg-gray-700 rounded" placeholder="Notes" data-role="mar-notes"></textarea>
  `;
  container.appendChild(row);
}

function renderMedications(caseData) {
  const meds = caseData.medications || {};
  const home = meds.home || [];
  const inpatient = meds.inpatient || [];
  const mar = meds.mar || [];

  const homeHtml = home.length
    ? home.map(m => `
        <div class="border border-slate-700 rounded p-3">
          <div><strong>${m.name || "Medication"}</strong> — ${m.dose || ""} ${m.frequency || ""}</div>
          <div class="text-sm text-slate-300">
            Route: ${m.route || "—"} |
            Started: ${m.startDate || "—"} |
            Duration: ${m.therapyDuration || "—"} ${m.therapyDurationUnit || ""}
          </div>
          <div class="text-sm text-slate-300">Indication: ${m.indication || "—"}</div>
        </div>
      `).join("")
    : "<p class='text-slate-400'>No home medications recorded.</p>";

  const inpatientHtml = inpatient.length
    ? inpatient.map(m => `
        <div class="border border-slate-700 rounded p-3">
          <div><strong>${m.name || "Medication"}</strong> — ${m.dose || ""} ${m.frequency || ""}</div>
          <div class="text-sm text-slate-300">
            Route: ${m.route || "—"} |
            Started: ${m.startDate || "—"} |
            Duration: ${m.therapyDuration || "—"} ${m.therapyDurationUnit || ""}
          </div>
          <div class="text-sm text-slate-300">Indication: ${m.indication || "—"}</div>
        </div>
      `).join("")
    : "";

  const marHtml = mar.length
    ? mar.map(row => `
        <div class="border border-slate-700 rounded p-3">
          <div><strong>${row.medicationName || "Medication"}</strong> — ${row.dose || ""}</div>
          <div class="text-sm text-slate-300">
            Scheduled: ${row.scheduledTime || "—"} |
            Administered: ${row.administeredAt || "—"} |
            Status: ${row.status || "—"}
          </div>
          <div class="text-sm text-slate-300">Notes: ${row.notes || "—"}</div>
        </div>
      `).join("")
    : "";

  return `
    <div class="space-y-4">
      <h3 class="font-bold text-lg">Medication data</h3>
      <div class="space-y-3">
        <h4 class="font-semibold text-md">Home medications</h4>
        ${homeHtml}
      </div>

      ${inpatient.length ? `
        <div class="space-y-3">
          <h4 class="font-semibold text-md">Inpatient medication orders</h4>
          ${inpatientHtml}
        </div>
      ` : ""}

      ${mar.length ? `
        <div class="space-y-3">
          <h4 class="font-semibold text-md">Medication Administration Record (MAR)</h4>
          ${marHtml}
        </div>
      ` : ""}
    </div>
  `;
}

function renderLabs(caseData) {
  const labs = caseData.labs || [];

  return `
    <div class="space-y-3">
      <h3 class="font-bold text-lg">Labs and diagnostics</h3>
      ${labs.map(lab => `
        <div class="border border-slate-700 rounded p-3">
          <div class="font-semibold">${lab.name || "Lab"}</div>
          <div class="text-sm text-slate-300">
            ${lab.value || "—"} ${lab.unit || ""} |
            Ref: ${lab.referenceRange || "—"} |
            Date: ${lab.date || "—"}
          </div>
          ${lab.trend && lab.trend.length ? `
            <div class="mt-2 text-sm text-slate-300">
              Trend:
              ${lab.trend.map(t => `${t.date}: ${t.value} ${t.unit || ""}`).join(" | ")}
            </div>
          ` : ""}
        </div>
      `).join("") || "<p class='text-slate-400'>No labs recorded.</p>"}
    </div>
  `;
}

window.readMedicationRows = readMedicationRows;
window.collectCanonicalCaseFromForm = collectCanonicalCaseFromForm;
window.addHomeMedRow = addHomeMedRow;
window.addInpatientMedRow = addInpatientMedRow;
window.addLabRow = addLabRow;
window.addMarRow = addMarRow;
window.renderMedications = renderMedications;
window.renderLabs = renderLabs;
