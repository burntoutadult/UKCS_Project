// const express = require("express");
// const { google } = require("googleapis");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const SHEET_ID = process.env.SPREADSHEET_ID; // Your Google Sheet ID
// const RANGE = "Primary_Page!A:C"; // Columns: Name | EnrollmentID | CertificateLink

// // Modern Google authentication (no deprecated keyFile or credentials)
// const auth = new google.auth.GoogleAuth({
//     credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   },
//   scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
// });

// // API route to get certificate by EnrollmentID and Name
// // Example URL: /api/certificate/1CR23IS011?name=Alina%20Paul
// app.get("/api/certificate/:EnrollmentID", async (req, res) => {
//   const enrollmentID = req.params.EnrollmentID;
//   const name = req.query.name;

//   if (!name) {
//     return res.status(400).json({ error: "Name query parameter is required" });
//   }

//   try {
//     // Get authenticated client
//     const client = await auth.getClient();
//     const sheets = google.sheets({ version: "v4", auth: client });

//     // Fetch rows from the sheet
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: SHEET_ID,
//       range: RANGE,
//     });

//     const rows = response.data.values || [];

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "No data found in sheet" });
//     }

//     // Skip header row
//     const dataRows = rows.slice(1);

//     // Find row where BOTH Name and EnrollmentID match
//     const record = dataRows.find(
//       (row) =>
//         (row[0] || "").trim().toLowerCase() === name.trim().toLowerCase() &&
//         (row[1] || "").trim() === enrollmentID.trim()
//     );

//     if (!record) {
//       return res.status(404).json({ error: "Certificate not found or Name/ID mismatch" });
//     }

//     const [Name, EnrollmentID, CertificateLink] = record;

//     res.json({
//       Name,
//       EnrollmentID,
//       CertificateLink,
//     });
//   } catch (err) {
//     console.error("Error fetching data from Google Sheets:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(express.json());

const SHEET_ID = process.env.SPREADSHEET_ID; // Google Sheet ID
const RANGE = "Primary_Page!A:C"; // Columns: Name | EnrollmentID | CertificateLink

// Google Sheets authentication using environment variables
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

// API route to fetch certificate by EnrollmentID and Name
// Example: /api/certificate/1CR23IS011?name=Alina%20Paul
app.get("/api/certificate/:EnrollmentID", async (req, res) => {
  const enrollmentID = req.params.EnrollmentID;
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return res.status(404).json({ error: "No data found in sheet" });
    }

    // Skip header row
    const dataRows = rows.slice(1);

    // Find row where BOTH Name and EnrollmentID match
    const record = dataRows.find(
      (row) =>
        (row[0] || "").trim().toLowerCase() === name.trim().toLowerCase() &&
        (row[1] || "").trim() === enrollmentID.trim()
    );

    if (!record) {
      return res.status(404).json({ error: "Certificate not found or Name/ID mismatch" });
    }

    const [Name, EnrollmentID, CertificateLink] = record;

    res.json({ Name, EnrollmentID, CertificateLink });
  } catch (err) {
    console.error("Error fetching data from Google Sheets:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

