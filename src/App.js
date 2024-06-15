import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    const resizeHandler = () => {
      if (!document.fullscreenElement && window.innerWidth < 768) {
        setFullscreen(false);
      }
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []); // Add an empty dependency array to ensure this effect runs once on mount

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((error) => {
          console.error("Error attempting to enable fullscreen:", error);
        });
      } else {
        console.error("Fullscreen is not supported in this browser.");
      }
      setFullscreen(true);
    }
  };

  return (
    <div className={`App ${fullscreen ? "fullscreen-active" : ""}`}>
      <div className="button">
        {!fullscreen && (
          <button className="fullscreen-button" onClick={toggleFullscreen}>
            Full Screen
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
