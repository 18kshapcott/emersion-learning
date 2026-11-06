const MASTER_CASE_TEMPLATE = {
  schemaVersion: 1,
  id: null,
  title: "",
  displayTitle: "",
  author: "",
  institution: "",
  status: "active",
  createdAt: "",
  updatedAt: "",
  metadata: {
    setting: "outpatient-community",
    settingOther: "",
    patientName: "",
    age: null,
    gender: "",
    raceEthnicity: "",
    insurance: "",
    allergies: [],
    immunizations: []
  },
  introduction: {
    chiefComplaint: "",
    caseIntro: "",
    hpi: ""
  },
  history: {
    pmh: [],
    familyHistory: [],
    socialHistory: {
      maritalStatus: "",
      children: "",
      alcohol: "",
      tobacco: "",
      caffeine: ""
    },
    functionalStatus: {
      mobility: "",
      adl: "",
      iadl: "",
      caregiverSupport: "",
      fallHistory: "",
      notes: ""
    }
  },
  vitals: {
    bp: "",
    hr: "",
    temp: "",
    spO2: "",
    weightKg: null,
    heightIn: null,
    bmi: null
  },
  intakeOutput: {
    oralIntake: "",
    ivIntake: "",
    urineOutput: "",
    netBalance: "",
    notes: ""
  },
  physicalExam: "",
  medications: {
    home: [],
    inpatient: [],
    mar: []
  },
  labs: [],
  diagnosticImages: {
    ekg: [],
    cgm: [],
    cxr: []
  },
  interviewFactors: [],
  hints: [],
  criticalElements: [],
  teachingPearls: [],
  primaryProblem: {
    label: "",
    acceptableAnswers: [],
    expectedPlan: [],
    planPoints: 0,
    expectedMonitoring: [],
    monitoringPoints: 0
  },
  secondaryProblems: [],
  scoring: {
    diagnosisWeight: 30,
    planWeight: 40,
    monitoringWeight: 20,
    confidenceWeight: 10
  }
};

function normalizeCaseInput(rawCase = {}) {
  const base = JSON.parse(JSON.stringify(MASTER_CASE_TEMPLATE));
  return {
    ...base,
    ...rawCase,
    metadata: { ...base.metadata, ...(rawCase.metadata || {}) },
    introduction: { ...base.introduction, ...(rawCase.introduction || {}) },
    history: {
      ...base.history,
      ...(rawCase.history || {}),
      socialHistory: {
        ...base.history.socialHistory,
        ...((rawCase.history && rawCase.history.socialHistory) || {})
      },
      functionalStatus: {
        ...base.history.functionalStatus,
        ...((rawCase.history && rawCase.history.functionalStatus) || {})
      }
    },
    vitals: { ...base.vitals, ...(rawCase.vitals || {}) },
    intakeOutput: { ...base.intakeOutput, ...(rawCase.intakeOutput || {}) },
    medications: {
      ...base.medications,
      ...(rawCase.medications || {})
    },
    diagnosticImages: {
      ...base.diagnosticImages,
      ...(rawCase.diagnosticImages || {})
    },
    primaryProblem: {
      ...base.primaryProblem,
      ...(rawCase.primaryProblem || {})
    },
    scoring: {
      ...base.scoring,
      ...(rawCase.scoring || {})
    }
  };
}

window.MASTER_CASE_TEMPLATE = MASTER_CASE_TEMPLATE;
window.normalizeCaseInput = normalizeCaseInput;
