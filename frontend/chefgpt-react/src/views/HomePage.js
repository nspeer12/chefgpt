
import React from "react";

export function HomePage() {
  return (
    <div>
      <h1>Home Page!</h1>
      <button onClick={handleClick}>Start Cooking</button>
    </div>
  );
  function handleClick() {
    window.location.href = "/Cook";
  }
}

export default HomePage;


