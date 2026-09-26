# EmergencyDPI

> A consent-controlled emergency health identity system designed to provide verified emergency responders with limited and temporary access to critical patient information.

## 🚑 Overview

EmergencyDPI is a hackathon project focused on improving access to essential patient information during emergency situations.

In an emergency, a patient may be unconscious, unable to communicate, or unable to provide important medical information. EmergencyDPI aims to address this problem by allowing authorized responders to access verified and relevant emergency health information through a controlled system.

The core idea is to provide **the right information, to the right person, for the right amount of time**, while keeping patient privacy and consent at the center of the system.

The system is being developed as a Minimum Viable Product (MVP) for the hackathon.

---

## 🎯 Problem Statement

During emergency situations, healthcare and emergency responders may not have immediate access to important information about a patient, such as:

- Blood group
- Allergies
- Existing medical conditions
- Current medications
- Emergency contacts
- Important medical history

At the same time, medical information is highly sensitive and should not be freely accessible.

EmergencyDPI explores a system where emergency responders can obtain **verified, relevant information for a limited period**, rather than receiving unrestricted access to a patient's complete medical history.

---

## 💡 Proposed Solution

EmergencyDPI provides a consent-controlled mechanism for sharing emergency medical information.

The system is designed around the following principles:

- **Consent-controlled access**
- **Verified patient information**
- **Limited information exposure**
- **Temporary access**
- **Role-based access**
- **Secure authentication**
- **Privacy-focused design**
- **Auditability of access**

The exact implementation of these features may evolve as the MVP is developed.

---

## 👥 Team

| Team Member | Responsibility |
|---|---|
| Sampath | Frontend |
| Gagan | Backend |
| Khushbu | UI/UX |
| Adithya | Git/GitHub & Integration |
| Dhanush | Database |
| Safa | Backend |

---

## 🛠️ Tech Stack

### Frontend
- React

### Backend
- FastAPI

### Database
- PostgreSQL

### Version Control
- Git
- GitHub

### Development Tools
- Visual Studio Code
- GitHub Desktop / Git CLI

> The technology stack may be updated as the project develops.

---

## 🏗️ Project Architecture

                ┌─────────────────────┐
                │      Frontend       │
                │       React         │
                └──────────┬──────────┘
                           │
                           │ API Requests
                           ▼
                ┌─────────────────────┐
                │       Backend       │
                │       FastAPI       │
                └──────────┬──────────┘
                           │
                           │ Database Queries
                           ▼
                ┌─────────────────────┐
                │      Database       │
                │     PostgreSQL      │
                └─────────────────────┘