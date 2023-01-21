import React from "react";
import { useState } from "react";

export function HomePage(props) {
  const [inputValue, setInputValue] = useState("Steak Tacos");

  return (
    <div style={wrapperDiv}>
      <h3 style={brandName}>ChefGPT</h3>
      <div style={promptDiv}>
        <h4 style={titleText}>How do I cook...</h4>
        <input
          contentEditable="true"
          style={textInput}
          label="How to Cook"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <h4 style={titleText}>?</h4>
      </div>
      <button style={submitButton} onClick={handleClick}>
        Generate Recipe
      </button>
    </div>
  );
  function handleClick() {
    window.location.href = "/Cook";
  }
  function generateRecipe() {
    console.log("Generating recipe...");
  }
}

const wrapperDiv = {
  backgroundImage: "linear-gradient(to top right, darkcyan, darkslateblue)",
  display: "grid",
  columnGap: "10px",
  placeItems: "center",
  height: "100vh",
};

const brandName = {
  position: "absolute",
  top: "0%",
  left: "0%",
  color: "white",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const promptDiv = {
  display: "inline-block",
  width: "90vh",
};

const titleText = {
  color: "white",
  //transform: "translate(-50%, -50%)",
  fontSize: "54px",
  display: "inline-block",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const submitButton = {
  border: "none",
  background: "none",
  color: "white",
  fontSize: "24px",
  textDecoration: "none",
  borderRadius: "15px",
  cursor: "pointer",
  padding: "0%",
  fontFamily: "'Trebuchet MS', sans-serif",
};

const textInput = {
  border: "none",
  background: "none",
  borderBottom: "2px solid white",
  fontSize: "54px",
  color: "white",
  display: "inline-block",
  width: "40%",
  fontFamily: "'Trebuchet MS', sans-serif",
  placeholderTextColor: "white",
  outline: "none",
};

export default HomePage;
