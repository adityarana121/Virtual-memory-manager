import React, { useState } from 'react';
import MemoryGrid from '../components/MemoryGrid';
import Dashboard from '../components/Dashboard';
import DarkModeToggle from '../components/DarkModeToggle';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageFault, setPageFault] = useState<boolean | null>(null);

  const handleLoadPage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/load', { method: 'POST' });
      const data = await res.json();

      // Show page fault status
      setPageFault(data.pageFault); // true or false
      setTimeout(() => setPageFault(null), 2000); // Hide after 2s
    } catch (err) {
      console.error("Error loading page:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      await fetch('http://localhost:5000/reset', { method: 'POST' });
      setPageFault(null);
    } catch (err) {
      console.error("Error resetting:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>Virtual Memory Manager</h1>
      <DarkModeToggle />

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleLoadPage} disabled={isLoading}>
          🚀 Load Page
        </button>
        <button onClick={handleReset} disabled={isLoading} style={{ marginLeft: '1rem' }}>
          🔄 Reset Memory
        </button>
      </div>

      {/* Show Page Fault Status */}
      {pageFault !== null && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            backgroundColor: pageFault ? '#ff4d4f' : '#52c41a',
            color: 'white',
            fontWeight: 'bold',
            display: 'inline-block'
          }}
        >
          {pageFault ? '❌ Page Fault Occurred!' : '✅ No Page Fault'}
        </div>
      )}

      <Dashboard />
      <MemoryGrid />
    </div>
  );
};

export default Home;
