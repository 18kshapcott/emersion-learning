# EMeRsion Learning

EMeRsion Learning is a browser-based clinical learning platform designed for PharmD education. It simulates an electronic medical record experience where students actively gather information, identify disease states, develop treatment and monitoring plans, and receive formative feedback.

## Project purpose

The platform is intended to teach clinical reasoning rather than simple fact recall. Students must request patient information, interpret labs and history, identify drug therapy problems, and generate evidence-based care recommendations.

## Current status

This repository is currently a lightweight static web application. The primary implementation is in `index.html`, and the app is hosted via GitHub Pages. The project uses:

- HTML + JavaScript for the front end
- Tailwind CSS for styling
- browser `localStorage` for saved cases and app state
- Google Apps Script for case-loading from a remote source
- structured JSON case objects for faculty-created cases

## Users and workflows

### Student workflow

1. Select a case
2. Enter student name
3. Ask for information from the EMR, patient, or team members
4. Review returned information only when requested
5. Identify primary and secondary disease states
6. Write treatment and monitoring plans
7. Submit care plan
8. Receive scoring and feedback

### Faculty workflow

1. Unlock the faculty tools
2. Generate a new case using an AI prompt or paste a JSON case
3. Build or edit case content
4. Save and import cases into the app
5. Use faculty-friendly metadata for teaching objectives, pearls, and critical elements

## Key product goals

- Teach active information gathering and clinical reasoning
- Encourage authentic pharmacist-style problem solving
- Provide immediate formative feedback
- Support case authoring without requiring a full web app backend
- Track learning behaviors and outcomes for educational research

## High-priority technical debt

The following issues are the most urgent from a technical and maintainability standpoint:

### 1. Monolithic architecture in a single file

The application logic, UI, case definitions, scoring, analytics, and faculty builder are all embedded in `index.html`. This makes the project difficult to maintain, test, and extend.

Priority: highest

Why it matters:
- debugging is harder as logic grows
- feature work becomes riskier
- onboarding new contributors is difficult
- code review and refactoring are more cumbersome

### 2. Fragile data persistence model

The app currently relies heavily on browser `localStorage` and Google Sheets/Apps Script patterns. This is convenient for a prototype, but it creates brittle data handling, weak validation, and limited scalability.

Priority: high

Why it matters:
- no typed schema or validation layer
- data integrity is not guaranteed
- cross-device behavior is inconsistent
- future account-based workflows will require a structural rethink

### 3. No formal backend or authentication model

The app does not yet support structured user accounts, faculty/student roles, or secure data separation.

Priority: high

Why it matters:
- cannot reliably track user-level progress or protected faculty workflows
- difficult to support multi-user use and analytics
- future expansion will require redesign of authentication and authorization

### 4. Weak separation of concerns

Case generation, scoring, query matching, analytics, rendering, and faculty tooling are all tightly coupled in the same document. The app would benefit from a clear separation between:

- domain data
- UI rendering
- scoring rules
- analytics tracking
- case authoring tools

Priority: high

### 5. Missing developer tooling and quality safeguards

There is no visible README, no test suite, no linting strategy, no CI/CD validation, and no structured documentation for case schema or app flows.

Priority: high

Why it matters:
- small changes can break the app without warning
- future contributors cannot confidently modify logic
- research-grade analytics require reproducibility and validation

### 6. Unclear schema governance for case objects

Cases appear to be represented as large nested JSON-like objects with variable fields. Without a formal schema, it becomes easy to produce inconsistent cases or break query logic.

Priority: medium-high

### 7. AI-generated case generation is not yet a durable workflow

AI-assisted generation is useful, but without validation, data cleaning, and schema enforcement, the generated cases may not be consistently usable.

Priority: medium

## Suggested roadmap

### Phase 1: Stabilize and document

- Create a project README and contributor guide
- Document the case schema and required fields
- Identify the key app flows and responsibilities
- Clean up the single-file app into logical sections or modules
- Add basic validation for case objects

### Phase 2: Improve data architecture

- Define a formal case schema
- Introduce a structured backend for case storage
- Separate local prototype storage from production persistence
- Add import/export validation and error handling

### Phase 3: Add authentication and roles

- Student accounts
- Faculty accounts
- Preceptor or admin accounts
- Protected faculty builder and analytics tools

### Phase 4: Analytics and research tooling

- session-level tracking refinement
- learning analytics dashboard
- critical element performance dashboards
- cohort comparison reporting

### Phase 5: Scale for broader educational use

- case library and shared repository
- admin workflows
- faculty collaboration support
- deployment to a more robust app infrastructure

## Recommended next step

The most valuable immediate next action is to break the app out of the monolithic `index.html` structure into a clearer modular architecture while preserving current functionality.

This should be done in parallel with:

- formal case schema definition
- documentation of critical app flows
- a lightweight datastore strategy for future backend migration

## Local development

Because the site is currently a static app, the quickest way to run it is to serve the repository locally or open `index.html` in a browser.

Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Notes

This project sits at the intersection of educational technology and clinical reasoning simulation. The educational value is strong, but the technical foundation will need modernization if the project is to scale beyond a prototype or faculty-managed pilot.

## Repository summary

- App type: static web application
- Current hosting: GitHub Pages
- Main file: `index.html`
- Current data model: JSON-driven cases + browser storage
- Current priority: refactor for maintainability and future scalability

---

This README is intended as a working project reference and roadmap to support future contributors and continued development.
