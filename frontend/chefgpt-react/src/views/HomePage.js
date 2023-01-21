
import React from "react";

export function HomePage() {
  return (
    <div>
      <h1>Home Page!</h1>
      <button onClick={handleClick}>Start Cooking</button>
      <button onClick={generateRecipe}>Generate Recipe</button>
    </div>
  );
  function handleClick() {
    window.location.href = "/Cook";
  }
  function generateRecipe() {
    console.log("Generating recipe...");
  }
}

export default HomePage;


