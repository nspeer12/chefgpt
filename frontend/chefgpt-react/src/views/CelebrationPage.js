
import React from "react";

export function CelebrationPage() {
    return (
        <div>
          <h1>Celebration Page!</h1>
          <button onClick={navigate}>Do another!</button>
          <button onClick={generateRecipe}>Generate Recipe</button>
        </div>
      );
      function navigate() {
        window.location.href = "/";
      }
      function generateRecipe() {
        console.log("Generating recipe...");
      }
}

export default CelebrationPage;