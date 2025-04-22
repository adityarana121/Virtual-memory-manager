import React, { useEffect, useState } from "react";
import { fetchMemoryBlocks, addMemoryBlock } from "../api/Memory";

interface MemoryBlock {
  id: string;
  address: number;
  frameNumber: number;
  used: boolean;
  process: string | null;
}

const MemoryGrid: React.FC = () => {
  const [blocks, setBlocks] = useState<MemoryBlock[]>([]);
  const [frameNumber, setFrameNumber] = useState(0);
  const [address, setAddress] = useState(0);
  const [used, setUsed] = useState(true);
  const [feedback, setFeedback] = useState("");

  const loadBlocks = async () => {
    const data = await fetchMemoryBlocks();
    if (Array.isArray(data)) {
      setBlocks(data as MemoryBlock[]);
    } else {
      console.error("Invalid data format received from fetchMemoryBlocks");
    }
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await addMemoryBlock({ frameNumber, address, used }) as { pageFault: boolean };
      setFeedback(res.pageFault ? "🚨 Page Fault occurred!" : "✅ Page Hit!");
      loadBlocks();
    } catch {
      setFeedback("❌ Error adding memory block.");
    }
  };

  return (
    <div>
      <div className="memory-input">
        <input
          type="number"
          value={frameNumber}
          onChange={(e) => setFrameNumber(Number(e.target.value))}
          placeholder="Frame Number"
        />
        <input
          type="number"
          value={address}
          onChange={(e) => setAddress(Number(e.target.value))}
          placeholder="Address"
        />
        <label>
          <input
            type="checkbox"
            checked={used}
            onChange={(e) => setUsed(e.target.checked)}
          />
          Used
        </label>
        <button onClick={handleAdd}>Add Memory Block</button>
      </div>

      {feedback && <p className="feedback">{feedback}</p>}

      <div className="memory-grid">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`memory-block ${block.used ? "used" : "free"}`}
          >
            <p>Frame: {block.frameNumber}</p>
            <p>Address: {block.address}</p>
            <p>Status: {block.used ? "Used" : "Free"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGrid;
