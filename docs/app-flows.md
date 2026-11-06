# App flows

This document describes the exact operational flows in EMeRsion Learning so future developers can understand how the app works without reverse-engineering the whole single-page HTML file.

## 1. Landing flow

User opens the app and sees:

- case selector/search box
- student name field
- faculty unlock controls
- start case button

### Inputs

- `caseSearch`: free-text filter for case names
- `caseSelect`: dropdown of available cases
- `studentName`: student identity

### Actions

- Select case
- Enter name
- Press `Start Case`

### Result

The app loads the selected case and reveals the question panel, hint button, and the case data display.

## 2. Student information gathering flow

After case started, student enters a query in the input box such as:

- PMH
- Medications
- A1c
- LDL
- Functional status
- Insurance
- Family history
- Urine output

### Backend behavior

The app attempts to match the query to known lab, interview, patient history, or medication concepts.

The app does the following:

- normalize the query text
- compare against a concept map and lab map
- classify the request into a category
- return matching value(s) if present
- record query metadata for analytics

### Example logic

- Query includes `A1c` → match endocrine lab data
- Query includes `LDL` → match lipid result
- Query includes `PMH` → read relevant past medical history
- Query includes `functional status` → return ADL/mobility data

### Analytics captured

- total queries
- query sequence
- categories used
- vague queries
- failed queries
- first time to key elements such as lab, med review, PMH review

## 3. Hint flow

Students can request a hint during the case.

### Behavior

- hint button becomes available once the case is started
- each hint reveals the next educational clue
- hint usage is tracked as part of analytics

### Purpose

Hints model preceptor guidance and are designed to support learning without giving away the answer immediately.

## 4. Diagnosis and care plan flow

Once the learner has gathered enough information, they move to the diagnosis section and enter:

- primary disease state
- primary plan
- primary monitoring plan
- secondary disease states
- secondary plans
- secondary monitoring
- confidence level

### Actions

- Submit care plan using `Submit Care Plan`

### Result

The app evaluates the submitted answer against expected diagnosis and plan data, then displays feedback.

## 5. Feedback flow

After submission, the student sees:

- score summary
- critical elements review
- plan recommendations
- monitoring recommendations
- teaching pearls
- optional SOAP note generation

This is the formative assessment component of the app.

## 6. Faculty unlock flow

Faculty must enter a password to unlock case-builder functions.

### Actions

- Enter faculty password
- Press `Unlock Case Builder`

### Result

The faculty section becomes enabled, allowing:

- AI case generation
- case import
- case cloning
- case authoring
- saving cases

## 7. AI case generation flow

Faculty enters:

- disease state topic
- difficulty
- optional case instructions

### Trigger

Press `Generate AI Case`

### Expected behavior

- AI prompt is generated from inputs
- external AI service is used to generate JSON output
- returned JSON is pasted into the app
- user presses `Load AI Case`

### Current implementation note

This is a semi-automated workflow, not a fully integrated backend pipeline yet.

## 8. Case builder and save flow

Faculty can manually create or edit a case by filling fields such as:

- case title
- author
- institution
- demographics
- PMH
- meds
- labs
- vitals
- functional status
- interview factors
- hints
- critical elements
- teaching pearls
- primary and secondary diagnosis fields

### Trigger

Press `Save Case`

### Result

Case is persisted in local storage or loaded through the Google Apps Script workflow.

## 9. Import/clone flow

Faculty may:

- import a JSON file
- paste JSON into a textarea
- clone existing case data into a working copy

These functions exist to reduce authoring friction and enable iterative case design.

## 10. Research analytics flow

The app records student interactions and uses them as learning analytics.

### Data captured

- student name
- case name
- session ID
- start and end time
- duration
- query categories
- hint use
- vague and failed queries
- diagnosis accuracy
- care plan score
- critical elements missed/obtained
- time to first key event

This data supports the historical cohort comparison and learning analytics research described in the project summary.

## Summary of the real user journey

The actual app flow is:

1. User lands on the case selection screen.
2. User chooses a case and enters name.
3. User asks for patient information via free text.
4. App matches those requests against structured data.
5. User transitions to diagnosis and plan entry.
6. App scores and provides feedback.
7. Faculty can author or generate cases through a separate unlockable interface.

This is a strong educational workflow, but the technical implementation is tightly coupled to a single-page HTML structure.
