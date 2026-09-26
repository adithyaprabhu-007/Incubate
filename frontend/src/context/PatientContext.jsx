import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PATIENT } from '../data/mockData';

const STORAGE_KEY = 'emergencyDpiPatient';
const PatientContext = createContext(null);

function readStoredPatient() {
  try {
    const storedPatient = window.localStorage.getItem(STORAGE_KEY);
    if (!storedPatient) return INITIAL_PATIENT;

    const parsedPatient = JSON.parse(storedPatient);
    if (!parsedPatient || typeof parsedPatient !== 'object' || Array.isArray(parsedPatient)) {
      return INITIAL_PATIENT;
    }

    return { ...INITIAL_PATIENT, ...parsedPatient };
  } catch {
    return INITIAL_PATIENT;
  }
}

export function PatientProvider({ children }) {
  const [patient, setPatient] = useState(readStoredPatient);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(patient));
    } catch {
      // Storage may be unavailable in restricted browser contexts.
    }
  }, [patient]);

  const updatePatient = (updates) => {
    setPatient((currentPatient) => (
      typeof updates === 'function'
        ? updates(currentPatient)
        : { ...currentPatient, ...updates }
    ));
  };

  const resetDemo = () => {
    setPatient({ ...INITIAL_PATIENT });
  };

  return (
    <PatientContext.Provider value={{ patient, updatePatient, resetDemo }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
}