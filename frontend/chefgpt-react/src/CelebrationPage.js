import React from "react";
import { useRef} from 'react';
import Confetti from "react-confetti";

export function CelebrationPage() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <div>
      <Confetti width={windowSize.current[0]} height={windowSize.current[1]} />
      <div style={wrapperDiv}>
        <h3 style={brandName}>ChefGPT</h3>
        <h1 style={doneText}>You did it!</h1>

        <button style={submitButton} onClick={navigate}>
          Complete Recipe
        </button>
      </div>
    </div>
  );
  function navigate() {
    window.location.href = "/";
  }
}

export default CelebrationPage;

const wrapperDiv = {
  backgroundImage: "linear-gradient(to top right, #FF9505, #4E4187)",
  display: "grid",
  gridGap: "15%",
  placeItems: "center",
  height: "100vh",
};

const doneText = {
  fontSize: "48px",
  color: "black",
  paddingBottom: "0px"
};

const submitButton = {
  border: "none",
  background: "none",
  color: "black",
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
  color: "black",
  fontFamily: "'Trebuchet MS', sans-serif",
};
