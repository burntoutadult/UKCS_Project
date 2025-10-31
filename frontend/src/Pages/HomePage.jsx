import React, { useState } from "react";
import "./HomePage.css";

function HomePage() {
  const [Name, setName] = useState("");
  const [EnrollmentID, setEnrollmentID] = useState("");
  const [CertificateLink, setCertificateLink] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setCertificateLink("");
  setError("");

    try {
     const response = await fetch(
  `https://ukcs.netlify.app/api/certificate/${EnrollmentID}?name=${encodeURIComponent(Name)}`
);
// 

      const data = await response.json();

      if (data && data.CertificateLink) {
        setCertificateLink(data.CertificateLink);
      } else {
        setError("Certificate not found!");
      }

    } catch (error) {
      console.error("Error fetching certificate:", error);
      setError("Error fetching certificate!");
    }
  };

  return (
    <div className="homepage">

      <main className="center-box">
        <div className="content">
          <h1>Welcome to UKCS Portal</h1>
          <p>Verify and download your certificates instantly</p>
        
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Certificate issued to"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enrollment ID"
              value={EnrollmentID}
              onChange={(e) => setEnrollmentID(e.target.value)}
            />
            <button type="submit" disabled={!Name || !EnrollmentID}>SUBMIT</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          {CertificateLink && (
            <div className="result">
              <h3>Certificate Found!</h3>
              <div className="button-group">
                <a href={CertificateLink} target="_blank" rel="noopener noreferrer">
                  <button className="view-btn">View Certificate</button>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
