import React, { useState } from 'react';
import { X } from 'lucide-react';

function calculateAge(dob) {
  if (!dob) return '';

  const birthDate = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return '';

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) age -= 1;
  return age >= 0 ? age : '';
}

const inputClassName = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#0066cc] focus:ring-2 focus:ring-blue-100';

export default function EditPatientProfileModal({ patient, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: patient.name ?? '',
    phone: patient.phone ?? '',
    dob: patient.dob ?? '',
    gender: patient.gender ?? '',
    bloodGroup: patient.bloodGroup ?? '',
    city: patient.city ?? ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...formData, age: calculateAge(formData.dob) });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onCancel}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 id="edit-profile-title" className="text-base font-bold text-slate-900 font-heading">
              Edit Patient Profile
            </h2>
            <p className="mt-1 text-xs text-slate-500">Update the personal details in your emergency profile.</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close profile editor"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
              Full legal name
              <input className={inputClassName} name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Phone number
              <input className={inputClassName} name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Date of birth
              <input className={inputClassName} name="dob" type="date" value={formData.dob} onChange={handleChange} required />
              <span className="mt-1 block font-normal text-slate-500">Age: {calculateAge(formData.dob)} years</span>
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Gender
              <select className={inputClassName} name="gender" value={formData.gender} onChange={handleChange}>
                {!['Male', 'Female', 'Non-binary', 'Prefer not to say'].includes(formData.gender) && (
                  <option value={formData.gender}>{formData.gender || 'Select gender'}</option>
                )}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </label>
            <label className="text-xs font-semibold text-slate-700">
              Blood group
              <input className={inputClassName} name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
            </label>
            <label className="text-xs font-semibold text-slate-700 sm:col-span-2">
              Address / location
              <input className={inputClassName} name="city" value={formData.city} onChange={handleChange} required />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#0066cc] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#0284c7]"
            >
              Save Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}