# EmergencyDPI — Zero-Trust Emergency Health Access Protocol

Interactive Single-Page React + Vite + Tailwind CSS frontend designed with clean, clinical hospital Stitch aesthetic (pure white background, soft hospital blue cards `#f0f6ff`, professional clinical blue `#0066cc`, emergency red, and success green).

---

## 🚀 Live Demo Server

Run the frontend from this directory with `npm run dev`.

---

## 🏥 Clinical Hackathon Demo Walkthrough

Use the top interactive stepper or in-page action buttons to follow the full flow:

1. **Step 1: Patient Home / Dashboard (`/`)**
   - View Alex Sharma's National Health DPI Card (ABHA-style) with chip, QR code, and blood type **O- Neg (Universal Donor)**.
   - Test the **Sovereign Vault Freeze** toggle to lock/unlock identity queries.
   - Click **"Simulate EMT Emergency Scan"** or **"View Emergency QR"** to launch emergency mode.

2. **Step 2: First Responder Emergency Mode**
   - High-urgency paramedic interface with live ECG sinus rhythm telemetry canvas, fluctuating pulse (104 bpm), SpO2 (97%), and blood pressure.
   - High-contrast allergy alert banner warning of **Penicillin Anaphylaxis** (contraindicated drugs).
   - Test the **1-Click Call SOS** button to simulate dial link to next-of-kin Priya Sharma (+91 98765-43210).
   - Click **"Launch Hospital Access Request Portal (Step 3)"**.

3. **Step 3: Hospital Access Request Portal**
   - Persona: **Dr. Rahul Sharma** (Chief of Trauma Medicine @ City General Hospital, Verified MCI Credential).
   - Select granular clinical scopes: Live Vitals, Critical Allergies, Active Prescriptions, Surgical History, Diagnostics, or Pharmacogenomics.
   - Choose session duration (15 minutes fast-track, 1 hour, 4 hours, 24 hours).
   - Click **"Transmit Consent Request to Patient (Step 4)"**.

4. **Step 4: Patient Consent & Approval Screen**
   - Simulates patient receiving an instant high-priority push authorization alert.
   - Shows doctor credentials, verified hospital badges, and auto-expire countdown timer.
   - Patient can review requested scopes and toggle individual data fields on or off to redact sensitive information.
   - Test **"Deny Request"** with reason selection or click **"Authorize & Grant Ephemeral Access"** with animated biometric fingerprint verification.

5. **Step 5: Active Access Timer & Immutable Audit Trail**
   - Live working countdown timer (15:00 counting down every second with progress bar).
   - Real-time audit log stream showing cryptographically verified transactions.
   - Test **"Simulate Doctor Querying Blood & ECG Telemetry"** to append live query logs.
   - Press the big red **"🚨 KILL-SWITCH: REVOKE ACCESS IMMEDIATELY"** button to permanently terminate access, shut down the telemetry feed, and verify immediate status revocation in the audit trail.
   - Click **"Restart Full Demo"** or **"Reset Demo"** in the top navbar anytime to return to a clean slate.

---

## 🛠 Tech Stack

- **React 18 + Vite 6**
- **Tailwind CSS 3** with custom clinical theme extension (`hospital` and `clinical` color tokens)
- **Lucide React Icons**
- **Hardware-accelerated ECG canvas/SVG animation** with live lead sweep
