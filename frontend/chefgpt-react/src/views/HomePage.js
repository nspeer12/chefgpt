
import React from "react";
import { send } from "xstate/lib/actions";

export function HomePage({state, context, send}) {
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
    send("generate_recipe");
  }
}

export default HomePage;


