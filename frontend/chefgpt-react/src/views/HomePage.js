import React from "react";

import { send } from "xstate/lib/actions";

export function HomePage({state, context, send}) {

  return (
    <div style={wrapperDiv}>
      <h3 style={brandName}>ChefGPT</h3>
      <div style={promptDiv}>
        <h4 style={titleText}>How to Cook... </h4>
        <input
          contenteditable="true"
          style={textInput}
          label="How to Cook"
          placeholder={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
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
    send("generate_recipe");
  }
}

const wrapperDiv = {
  backgroundImage: "linear-gradient(to top right, darkcyan, darkslateblue)",
  display: "grid",
  gridGap: "15%",
  placeItems: "center",
  height: "100vh",
};

const brandName = {
  position: "absolute",
  top: "0%",
  left: "0%",
  color: "white",
  fontFamily: "'Trebuchet MS', sans-serif"
}

const promptDiv = {
  display: "inline-block",
  width: "90vh",
};

const titleText = {
  color: "white",
  //transform: "translate(-50%, -50%)",
  fontSize: "54px",
  display: "inline-block",
  fontFamily: "'Trebuchet MS', sans-serif"
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
  fontFamily: "'Trebuchet MS', sans-serif"
};

const textInput = {
  border: "none",
  background: "none",
  borderBottom: "2px solid white",
  fontSize: "54px",
  color: "white",
  display: "inline-block",
  width: "45%",
  fontFamily: "'Trebuchet MS', sans-serif"
};

export default HomePage;
