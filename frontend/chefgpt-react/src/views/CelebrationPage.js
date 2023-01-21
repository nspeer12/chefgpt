
import React from "react";

export function CelebrationPage() {
    return (
        <div>
          <h1>Celebration Page!</h1>
          <button onClick={handleClick}>Do another!</button>
        </div>
      );
      function handleClick() {
        window.location.href = "/";
      }
}

export default CelebrationPage;