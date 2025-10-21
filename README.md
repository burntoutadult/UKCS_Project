# 📜 Certificate Authenticator – UKCS Portal

## 🎯 Overview
The **UKCS Certificate Authenticator** is a lightweight web application that allows users to verify and download certificates instantly by entering their **Enrollment ID**.

It connects to a **Google Sheet database** containing the certificate details (Name, Enrollment ID, and Certificate Link). If a valid ID is entered, the app automatically opens the certificate and provides an option to download it as a JPEG or PDF.

---

## 🏗️ Tech Stack

### **Frontend**
- React.js
- Bootstrap + Custom CSS

### **Backend**
- Node.js + Express.js
- Google APIs (Sheets API)

### **Database**
- 📊 Google Sheets (acts as a small, simple database)

---

## 📁 Project Structure

```
UKCS_Project/
│
├── backend/
│   ├── server.js                # Express server connecting to Google Sheets
│   ├── credentials.json         # Google Service Account credentials (gitignored)
│   ├── .env                     # Contains your SHEET_ID and other environment vars
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── HomePage.jsx     # Main page for certificate verification
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── HomePage.css         # Styling for homepage
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Features
✅ Verify certificate using Enrollment ID  
✅ Instantly open certificate from Google Drive link  
✅ Option to download certificate  
✅ Error message if certificate not found  
✅ Clean and responsive UI using React and Bootstrap  

---

##  How It Works
1. The **user** enters their **Name** and **Enrollment ID** on the homepage.  
2. The **React frontend** sends a request to the backend (`http://localhost:5000/api/certificate/:EnrollmentID`).  
3. The **Node.js server** fetches data from Google Sheets using the **Google Sheets API**.  
4. If a matching Enrollment ID is found, it returns the **Certificate Link**.  
5. The frontend automatically opens the certificate and displays a download option.  

---

##  Future Enhancements
- Download certificates directly as PDF or JPEG
- Admin dashboard to upload new certificate data
- Email verification and tracking
- Cloud deployment (Google Cloud / Vercel / Render)
---
## 🧑‍💻 Author
**1. Alina Paul**  
🎓 Information Science and Engineering, CMRIT  
📍 2027 Batch

**2. Ankita Sivaramakrishnan**  
🎓 Information Science and Engineering, CMRIT  
📍 2027 Batch

**3. Ami Krishna**  
🎓 Information Science and Engineering, CMRIT  
📍 2027 Batch  

