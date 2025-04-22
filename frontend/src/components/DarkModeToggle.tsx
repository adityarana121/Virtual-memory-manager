import { useEffect, useState } from "react";
import "./DarkModeToggle.css";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <div className="toggle-container">
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider round"></span>
      </label>
      <span className="mode-label">{darkMode ? "Dark Mode" : "Light Mode"}</span>
    </div>
  );
}

export default DarkModeToggle;
