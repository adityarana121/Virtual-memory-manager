import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [totalFrames] = useState(100);
  const [usedFrames, setUsedFrames] = useState(0);
  const [pageFaultRate, setPageFaultRate] = useState(0);

  useEffect(() => {
    // Simulate data
    const used = Math.floor(Math.random() * 100);
    const pageFault = (Math.random() * 0.4 + 0.1).toFixed(2); // 0.10 - 0.50
    setUsedFrames(used);
    setPageFaultRate(parseFloat(pageFault));
  }, []);

  const memoryUsage = ((usedFrames / totalFrames) * 100).toFixed(1);

  return (
    <div className="dashboard">
      <div className="stat-box">
        <h3>Memory Usage</h3>
        <p>{memoryUsage}%</p>
      </div>
      <div className="stat-box">
        <h3>Used Frames</h3>
        <p>{usedFrames} / {totalFrames}</p>
      </div>
      <div className="stat-box">
        <h3>Page Fault Rate</h3>
        <p>{(pageFaultRate * 100).toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default Dashboard;
