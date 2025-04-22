import React from "react";
import MemoryGrid from "./components/MemoryGrid";
import Dashboard from "./components/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <h1>Virtual Memory Manager</h1>
          <DarkModeToggle />
        </header>

        <main className="app-main">
          <Dashboard />
          <MemoryGrid />
        </main>
      </div>
    </div>
  );
};

export default App;
