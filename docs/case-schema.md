# Case JSON Schema

This document defines the canonical structure for a case used in EMeRsion Learning. The goal is to move from ad hoc JSON blobs toward a stable, validated schema that supports the student workflow, faculty editing, AI generation, and future backend storage.

## Goals

- Keep case authoring structured and predictable
- Support both student-facing and faculty-facing fields
- Preserve educational logic for scoring and hints
- Allow AI-generation pipelines to produce consistent output
- Make it easy to migrate to a database-backed model later

## High-level shape

```json
{
  "id": 123,
  "title": "ASCVD Prevention",
  "displayTitle": "ASCVD Prevention",
  "author": "Kyle Shapcott",
  "institution": "University at Buffalo",
  "createdAt": "2026-10-24T00:00:00Z",
  "updatedAt": "2026-10-24T00:00:00Z",
  "status": "active",
  "metadata": {
    "setting": "outpatient-community",
    "settingOther": "",
    "patientName": "Margaret O'Donnell",
    "age": 67,
    "gender": "female",
    "raceEthnicity": "White",
    "insurance": "Commercial",
    "allergies": ["Penicillin"],
    "immunizations": ["Influenza 2024", "COVID-19 booster 2024"]
  },
  "introduction": {
    "chiefComplaint": "No complaints. Presented for yearly physical.",
    "caseIntro": "The patient presents for a routine follow-up visit.",
    "hpi": "The patient reports no acute symptoms."
  },
  "history": {
    "pmh": ["Hypertension", "Type 2 diabetes mellitus", "Hyperlipidemia"],
    "familyHistory": ["Father MI at 58"],
    "socialHistory": {
      "maritalStatus": "Married",
      "children": "2 children",
      "alcohol": "Occasional wine",
      "tobacco": "Never",
      "caffeine": "1 cup coffee/day"
    },
    "functionalStatus": {
      "mobility": "Independent",
      "adl": "Independent",
      "iadl": "Independent",
      "caregiverSupport": "Spouse assists occasionally",
      "fallHistory": "None",
      "notes": "No limitations noted"
    }
  },
  "vitals": {
    "bp": "146/88",
    "hr": "82",
    "temp": "98.6",
    "spO2": "98%",
    "weightKg": 77.1,
    "heightIn": 64,
    "bmi": 29.6
  },
  "intakeOutput": {
    "oralIntake": "Normal",
    "ivIntake": "None",
    "urineOutput": "Normal",
    "netBalance": "0",
    "notes": "No fluid restrictions"
  },
  "physicalExam": "No acute distress; exam otherwise unremarkable.",
  "medications": {
    "home": [
      {"name": "Metformin", "dose": "1000 mg", "frequency": "BID", "route": "PO"},
      {"name": "Lisinopril", "dose": "20 mg", "frequency": "Daily", "route": "PO"},
      {"name": "Amlodipine", "dose": "5 mg", "frequency": "Daily", "route": "PO"}
    ],
    "inpatient": []
  },
  "labs": [
    {"name": "LDL", "value": "142", "unit": "mg/dL", "referenceRange": "<100"},
    {"name": "HDL", "value": "38", "unit": "mg/dL", "referenceRange": ">40"},
    {"name": "Triglycerides", "value": "210", "unit": "mg/dL", "referenceRange": "<150"},
    {"name": "A1c", "value": "8.2", "unit": "%", "referenceRange": "<5.7"},
    {"name": "eGFR", "value": "78", "unit": "mL/min/1.73m²", "referenceRange": ">60"}
  ],
  "diagnosticImages": {
    "ekg": [],
    "cgm": [],
    "cxr": []
  },
  "interviewFactors": [
    {
      "label": "Medication Adherence",
      "question": "Do you take your medications every day?",
      "response": "Yes, I take them every day.",
      "category": "medication"
    },
    {
      "label": "Diet Patterns",
      "question": "What does your diet look like?",
      "response": "Mostly frozen meals with limited fruits and vegetables.",
      "category": "social"
    }
  ],
  "hints": [
    {
      "order": 1,
      "text": "Consider cardiovascular risk factors.",
      "visibleToStudent": true
    }
  ],
  "criticalElements": [
    {
      "id": "cv-risk-factors",
      "text": "Past medical history and laboratory values support elevated ASCVD risk.",
      "points": 2
    }
  ],
  "teachingPearls": [
    "ASCVD risk is elevated in patients with diabetes, elevated LDL, and low HDL.",
    "Primary prevention can justify statin therapy when risk factors are present."
  ],
  "primaryProblem": {
    "label": "ASCVD risk",
    "acceptableAnswers": ["ascvd risk", "elevated ascvd risk", "statin indication"],
    "expectedPlan": [
      "Start a moderate-intensity statin",
      "Optimize lifestyle measures"
    ],
    "planPoints": 3,
    "expectedMonitoring": [
      "Recheck lipid panel in 4-12 weeks",
      "Monitor for adverse effects"
    ],
    "monitoringPoints": 2
  },
  "secondaryProblems": [
    {
      "label": "Hyperlipidemia",
      "acceptableAnswers": ["hyperlipidemia", "elevated cholesterol"],
      "expectedPlan": ["Address LDL lowering"],
      "planPoints": 1,
      "expectedMonitoring": ["Repeat LDL"],
      "monitoringPoints": 1
    }
  ],
  "scoring": {
    "diagnosisWeight": 30,
    "planWeight": 40,
    "monitoringWeight": 20,
    "confidenceWeight": 10
  }
}
```

## Field definitions

### Root fields

- `id`: unique integer identifier for the case.
- `title`: case title displayed to students.
- `displayTitle`: optional UI-friendly version that may include formatting or labels.
- `author`: faculty or creator of the case.
- `institution`: institution or school.
- `createdAt`, `updatedAt`: ISO timestamps for revision tracking.
- `status`: case lifecycle status such as `draft`, `active`, `archived`.

### `metadata`

Student- and faculty-facing descriptive data.

Required:
- `setting`
- `patientName`
- `age`
- `gender`
- `insurance`

Optional:
- `raceEthnicity`
- `allergies`
- `immunizations`
- `settingOther`

### `introduction`

- `chiefComplaint`: the symptom or reason for visit.
- `caseIntro`: narrative intro for the patient scenario.
- `hpi`: history of present illness.

### `history`

- `pmh`: past medical history array
- `familyHistory`: list of family-related conditions
- `socialHistory`: object
- `functionalStatus`: object

### `vitals`

Student-facing tests and assessment data, such as BP, HR, temp, and weight.

### `intakeOutput`

For fluid balance details and nutrition-related interventions.

### `medications`

- `home`: list of regular home medications
- `inpatient`: inpatient medication orders or active therapy

Each medication item should include:
- `name`
- `dose`
- `frequency`
- `route`
- `therapyDuration` (future field, optional)

### `labs`

Array of observed tests. Each item should include:
- `name`
- `value`
- `unit`
- `referenceRange`
- `category` (optional)

This is intended to replace loosely structured lab objects and inconsistent naming across cases.

### `diagnosticImages`

- `ekg`
- `cgm`
- `cxr`

Each may be a string or array of strings depending on how many images are linked.

### `interviewFactors`

Question-answer pairs that represent patient, caregiver, or healthcare-team interview data.

Each item should include:
- `label`
- `question`
- `response`
- `category`

### `hints`

Case-level hints used to guide student reasoning.

Each item should include:
- `order`
- `text`
- `visibleToStudent`

### `criticalElements`

Educational objectives that must be identified by the learner.

Each item should include:
- `id`
- `text`
- `points`

### `teachingPearls`

Narrative educational explanation shown after student submission.

### `primaryProblem` and `secondaryProblems`

These define the expected answer structure for the learner’s diagnosis and care plan.

Each item should include:
- `label`
- `acceptableAnswers`
- `expectedPlan`
- `planPoints`
- `expectedMonitoring`
- `monitoringPoints`

## Validation rules

A valid case should satisfy the following:

- `id` must be unique.
- `title` must be non-empty.
- `metadata.patientName` should be present.
- `metadata.setting` should be one of the approved settings.
- `primaryProblem` must exist.
- `labs` should be a list when present.
- `medications.home` and `medications.inpatient` should be arrays.
- `criticalElements` should align with educator expectations.

## Recommended future schema evolution

To support long-term growth, we recommend adding a formal schema version:

```json
{
  "schemaVersion": 1,
  "case": { ... }
}
```

This makes migration, validation, and versioned upgrades easier.

## Next implementation steps

1. Add a validator utility that checks required fields.
2. Normalize incoming AI-generated JSON to this schema.
3. Ensure all case-building inputs map to this schema.
4. Save cases only in this structure in the database layer.

## Summary

The project needs a canonical case representation to reduce inconsistency, improve faculty case authoring, and support a proper backend. This schema is the foundation for future migration away from ad hoc static HTML data models.
