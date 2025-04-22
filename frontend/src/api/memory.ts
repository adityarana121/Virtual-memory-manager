const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchMemoryBlocks = async () => {
    const response = await fetch('http://localhost:5000/api/memory-blocks');
    return await response.json();
  };
  

export const addMemoryBlock = async (block: {
  frameNumber: number;
  used: boolean;
  address: number;
}) => {
  const res = await fetch(`${API_URL}/memory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(block),
  });

  return res.json(); // should include { memoryBlock, pageFault }
};
