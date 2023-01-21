
import React from "react";

export function CelebrationPage() {
    return (
        <div>
          <h1>Celebration Page!</h1>
          <button onClick={navigate}>Do another!</button>
          
        </div>
      );
      function navigate() {
        window.location.href = "/";
      }
      
}

export default CelebrationPage;