export const INITIAL_PATIENT = {
  name: "Alex Sharma",
  age: 32,
  gender: "Male",
  dob: "1994-08-14",
  bloodGroup: "O- Neg",
  bloodDonorStatus: "Universal Donor (Rare)",
  organDonor: "Registered Donor",
  dpiId: "91-4421-8890-3321",
  abhaAddress: "alex.sharma@abdm",
  phone: "+91 98765-11002",
  city: "Metro Health District",
  insurancePolicy: "Universal Health Shield #UH-8921-X",
  qrPayload: "DPI-AUTH://ID:91-4421-8890-3321?NAME=ALEX+SHARMA&BLOOD=O_NEG&EMERGENCY=ACTIVE",
  isIdLocked: false,
  allergies: [
    {
      id: "alg-1",
      allergen: "Penicillin & Beta-Lactam Antibiotics",
      severity: "CRITICAL / ANAPHYLACTIC RISK",
      reaction: "Severe laryngeal edema, acute bronchospasm, anaphylactic shock",
      clinicalNote: "Contraindicated for all Amoxicillin/Ampicillin variants. Epinephrine required immediately on exposure.",
      verifiedBy: "City General Hospital - Dept of Immunology"
    },
    {
      id: "alg-2",
      allergen: "Sulfa-based Antimicrobials",
      severity: "MODERATE",
      reaction: "Severe dermatological urticaria and generalized rash",
      clinicalNote: "Avoid Bactrim, Sulfamethoxazole",
      verifiedBy: "Metro Health Clinic"
    },
    {
      id: "alg-3",
      allergen: "NSAIDs (Aspirin, Ibuprofen)",
      severity: "MILD / SENSITIVITY",
      reaction: "Gastric distress, bronchospastic cough",
      clinicalNote: "Acetaminophen/Paracetamol tolerated",
      verifiedBy: "Dr. Rahul Sharma"
    }
  ],
  chronicConditions: [
    {
      condition: "Asthma (Moderate Persistent)",
      diagnosed: "2016",
      treatment: "Albuterol Inhaler (PRN) + Budesonide",
      status: "Active"
    },
    {
      condition: "Type 1 Diabetes Mellitus",
      diagnosed: "2019",
      treatment: "Basal-Bolus Insulin Regimen",
      status: "Monitored via CGM (Freestyle Libre)"
    }
  ],
  medications: [
    {
      name: "Insulin Glargine (Lantus)",
      dosage: "18 Units Sub-Q",
      frequency: "Once daily at bedtime",
      indication: "Type 1 Diabetes"
    },
    {
      name: "Albuterol Sulfate HFA Inhaler",
      dosage: "90 mcg/actuation",
      frequency: "2 puffs every 4-6 hrs PRN wheezing",
      indication: "Acute Bronchospasm"
    },
    {
      name: "Budesonide / Formoterol",
      dosage: "160/4.5 mcg",
      frequency: "1 inhalation twice daily",
      indication: "Asthma Controller"
    }
  ],
  surgeries: [
    {
      procedure: "Emergency Laparoscopic Appendectomy",
      date: "Oct 2021",
      hospital: "City General Hospital",
      surgeon: "Dr. K. Mehta"
    },
    {
      procedure: "Right Distal Tibia Open Reduction & Internal Fixation",
      date: "Jun 2018",
      hospital: "Memorial Trauma Institute",
      surgeon: "Dr. S. Nair"
    }
  ],
  emergencyContacts: [
    {
      id: "ec-1",
      name: "Priya Sharma",
      relation: "Spouse",
      phone: "+91 98765-43210",
      isPrimary: true,
      address: "B-402, Green Avenue, Sector 14"
    },
    {
      id: "ec-2",
      name: "Vikram Sharma",
      relation: "Brother",
      phone: "+91 98111-22334",
      isPrimary: false,
      address: "12/A, Civil Lines, Central District"
    }
  ]
};

export const MOCK_PROVIDER = {
  hospitalName: "City General Hospital",
  department: "Emergency Trauma & Resuscitation Center, Bay 3",
  facilityId: "HOSP-CGH-DEL-04",
  accreditation: "NABH / JCI Accredited Level 1 Trauma Facility",
  doctorName: "Dr. Rahul Sharma",
  specialization: "Chief of Emergency & Trauma Medicine",
  licenseNumber: "MCI-REG-884920-VERIFIED",
  npiNumber: "1841920492",
  emrNode: "CGH-DELHI-EMR-04",
  hipaaCertified: true,
  sessionPurposeDefault: "Emergency Room Trauma Triage & Resuscitation",
  ipAddress: "10.244.18.52 (Hospital Intranet Encrypted Gateway)",
  publicKeyFingerprint: "SHA256:7e:9b:31:f4:c9:02:88:a1:09:ef:5a:33"
};

export const READINESS_CHECKLIST = [
  { id: 'blood', label: 'O- Neg Universal Blood Group Verified', score: 25, max: 25, status: 'complete', detail: 'Immunohematology Cross-Match Confirmed' },
  { id: 'allergies', label: 'Critical Penicillin Anaphylaxis Warning Logged', score: 25, max: 25, status: 'complete', detail: 'Contraindicated for all beta-lactam antibiotics' },
  { id: 'contacts', label: '2 Next-of-Kin Emergency Contacts Connected', score: 20, max: 20, status: 'complete', detail: 'Priya Sharma (Spouse) + Vikram Sharma (Brother)' },
  { id: 'organ', label: 'National Organ Donor Registry ID Active', score: 15, max: 15, status: 'complete', detail: 'Registry Token #OD-88194' },
  { id: 'vault', label: 'Sovereign Cryptographic Vault Active', score: 11, max: 15, status: 'warning', detail: 'Annual biometric key rotation due in 14 days' }
];

export const TOTAL_READINESS_SCORE = 96; // 96%


export const AVAILABLE_SCOPES = [
  {
    id: "vitals",
    label: "Live Vitals & Telemetry",
    desc: "Real-time streaming ECG sinus rhythm, SpO2, arterial blood pressure, and respiratory rate from field EMT monitors.",
    category: "Critical Emergency",
    defaultSelected: true,
    requiredForEmergency: true,
    riskLevel: "Low (Ephemeral Stream)"
  },
  {
    id: "allergies",
    label: "Critical Drug Allergies & ADR Alerts",
    desc: "Anaphylaxis alerts, contraindications, verified adverse drug reactions, and immunological alerts.",
    category: "Critical Emergency",
    defaultSelected: true,
    requiredForEmergency: true,
    riskLevel: "Low (Safety Essential)"
  },
  {
    id: "medications",
    label: "Active Prescriptions & Regimens",
    desc: "Current medications, insulin dosing, anticoagulant therapy status, and recent pharmaceutical dispenses.",
    category: "Clinical Care",
    defaultSelected: true,
    requiredForEmergency: false,
    riskLevel: "Medium (Personal Health Record)"
  },
  {
    id: "history",
    label: "Surgical, Trauma & Implants History",
    desc: "Past operational reports, orthopedic hardware/pacemaker implants, previous anesthesia records.",
    category: "Clinical Care",
    defaultSelected: true,
    requiredForEmergency: false,
    riskLevel: "Medium (Historical Records)"
  },
  {
    id: "labs",
    label: "Recent Diagnostic Labs & Imaging",
    desc: "Complete blood count, arterial blood gas, cross-match history, recent CT/X-ray reports (30 days).",
    category: "Extended Diagnostics",
    defaultSelected: false,
    requiredForEmergency: false,
    riskLevel: "High (Full Diagnostic Export)"
  },
  {
    id: "genomic",
    label: "Pharmacogenomic Markers & Sensitivity",
    desc: "High-risk CYP2C19, HLA-B*5701 sensitivity, and metabolic enzyme clearance profiles.",
    category: "Specialized",
    defaultSelected: false,
    requiredForEmergency: false,
    riskLevel: "High (Strict Consent Only)"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "15:02:14",
    relativeTime: "12 mins ago",
    actor: "Ambulance EMT-07 (Paramedic Unit)",
    institution: "Metro Emergency Dispatch",
    action: "NFC Field Tap & Emergency Medical Summary Queried",
    scopeAccessed: ["bloodGroup", "allergies", "emergencyContacts"],
    status: "SUCCESS",
    statusColor: "emerald",
    verifiedSignature: "EDPI-SIG-88192a"
  },
  {
    id: "log-2",
    timestamp: "15:05:40",
    relativeTime: "9 mins ago",
    actor: "City General Hospital ER Triage",
    institution: "City General Hospital",
    action: "Emergency Inbound Pre-Notification Received",
    scopeAccessed: ["emergencyProtocol"],
    status: "VERIFIED",
    statusColor: "blue",
    verifiedSignature: "CGH-PUBKEY-0091b"
  },
  {
    id: "log-3",
    timestamp: "15:08:22",
    relativeTime: "6 mins ago",
    actor: "Alex Sharma (Patient Biometric Device)",
    institution: "EmergencyDPI Sovereign Vault",
    action: "Emergency Access Alert Dispatched to Patient Handset",
    scopeAccessed: ["securityTelemetry"],
    status: "DISPATCHED",
    statusColor: "slate",
    verifiedSignature: "DPI-ALERT-PUSH-33"
  }
];
