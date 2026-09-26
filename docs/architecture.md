# EmergencyDPI - System Architecture

## 1. Architecture Overview

EmergencyDPI follows a modular client-server architecture designed to separate the user interface, application logic, authentication, and data storage.

The system is built around controlled access to emergency health information rather than exposing medical data directly through the patient's QR code.


                    
Users         
                                          
    Patient              
    Doctor / Responder   
    Hospital             
                    
                               
                               
                    
  Frontend         
    EmergencyDPI Web UI 
                    
                               
  HTTPS / API
                        
                               
                    
 Backend        
    Authentication       
    Authorization         
    Access Requests      
    Consent Management   
    Emergency Access     
    Audit Logging       
                    
                               
                            
    
 Database       
                                          
    User Profiles        
    Emergency Data       
    Access Requests      
    Consent Records      
    Audit Logs           
                



## 2. Main Components

### Frontend

The frontend provides the user interface for patients, doctors/responders, and healthcare organizations.

Main responsibilities include:

* User authentication interface
* Patient emergency profile
* QR generation/scanning interface
* Access request interface
* Consent interface
* Emergency access interface
* Access history and audit display


### Backend

The backend acts as the central security and business-logic layer.

It is responsible for:

* Authentication
* User and role verification
* Authorization
* Patient data access
* Access requests
* Consent management
* Temporary access
* Emergency/break-glass access
* Audit logging

The backend ensures that protected patient information is not exposed simply because someone has identified a patient or scanned their QR code.


### Database

The database stores the information required by the platform.

Conceptually, the system may contain:

Users
   
Patients
Doctors / Responders
Hospital Users

Emergency Profiles

Access Requests

Consent Records

Temporary Access Records

Audit Logs

The exact database structure may change during implementation.


## 3. QR-Based Identification

The EmergencyDPI QR code is designed to identify a patient's emergency profile rather than directly store sensitive medical information.

QR Code
  |
Secure Patient Reference
  |
Backend Verification
  |
Access Request Process
  |
Authorized Information


This prevents the QR code itself from becoming a direct container for sensitive medical information.


## 4. Access Control Flow

EmergencyDPI uses a layered access process:

User Authentication
        |
Role Verification
        |
Authorization
        |
Patient Identification
        |
Information Request
        |
Consent / Emergency Authorization
        |
Minimum Necessary Information
        |
Temporary Access
        |
Audit Logging
        |
Access Expiry

Each stage provides an additional layer of control before protected information is displayed.

## 5. Normal Access Flow

When the patient is able to provide consent:


Patient
   EmergencyDPI QR

Responder
    Authenticate
   
Backend
    Create access request

Patient
   Approve / Deny
   
Backend
   Verify authorization
   
Responder
   Temporary access
   
Critical Information

Only the information authorized by the access process is made available.

## 6. Emergency / Break-Glass Flow

If the patient cannot provide consent during an emergency, the system can support a controlled emergency-access process.


Patient unavailable
        |
Responder authentication
        |
Emergency access request
        |
Reason recorded
        |
Critical information accessed
        |
Access logged
        |
Access expires


Emergency access should remain auditable rather than bypassing all security controls.



## 7. Security Principles

EmergencyDPI is designed around the following principles:

### Authentication

Users must authenticate before accessing protected functionality.

### Role-Based Authorization

Different users have different permissions based on their role.

### Minimum Necessary Access

Responders should receive only the information required for the emergency use case.

### Consent

Patients can control access to their information when they are able to provide consent.

### Time-Limited Access

Access can automatically expire after the authorized period.

### Auditability

Important access events are recorded for transparency and accountability.

### Secure Identification

The QR code is intended to identify a patient profile without directly exposing sensitive medical information.


## 8. Scalability

The architecture separates the frontend, backend, and data layer so that each component can be expanded independently.

This allows the platform to potentially support:

* More patients
* More healthcare organizations
* More responders
* Additional emergency information categories
* Mobile applications
* Healthcare-system integrations
* Advanced authentication and verification



