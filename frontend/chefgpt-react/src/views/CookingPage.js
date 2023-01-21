
import React from "react";

export function CookingPage() {
  return (
    <div>
      <h1>Cooking Page!</h1>
      <button onClick={handleClick}>Yay, you did it!</button>
    </div>
  );
  function handleClick() {
    window.location.href = "/Celebrate";
  }
}

export default CookingPage;