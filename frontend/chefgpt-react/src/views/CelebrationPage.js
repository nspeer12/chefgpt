import React from "react";

export function CelebrationPage() {
  return (
    <div style={wrapperDiv}>
      <h3 style={brandName}>ChefGPT</h3>
      <h1 style={doneText}>Celebration Page!</h1>
      <button style={submitButton} onClick={navigate}>
        Do another!
      </button>
    </div>
  );
  function navigate() {
    window.location.href = "/";
  }
}

export default CelebrationPage;

const wrapperDiv = {
  backgroundImage: "linear-gradient(to top right, darkcyan, darkslateblue)",
  display: "grid",
  gridGap: "15%",
  placeItems: "center",
  height: "100vh",
};

const doneText = {
  fontSize: "48px",
  color: "white",
};

const submitButton = {
  border: "none",
  background: "none",
  color: "white",
  fontSize: "24px",
  textDecoration: "none",
  borderRadius: "15px",
  cursor: "pointer",
  paddingTop: "0%",
};

const brandName = {
  position: "absolute",
  top: "0%",
  left: "0%",
  color: "white",
  fontFamily: "'Trebuchet MS', sans-serif"
}
