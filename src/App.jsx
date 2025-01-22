import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeColumn, setActiveColumn] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColumn((prev) => {
        if (prev >= 15 && direction === 1) {
          setDirection(-1);
          return 15;
        } else if (prev <= 0 && direction === -1) {
          setDirection(1);
          return 0;
        }
        return prev + direction;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction]);

  const getColumnColor = (colIndex) => {
    const distance = Math.abs(colIndex - activeColumn);
    if (distance > 4) return 'bg-black';

    const colors = direction === 1
      ? ['bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900']
      : ['bg-green-900', 'bg-green-800', 'bg-green-700', 'bg-green-600', 'bg-green-500'];

    return colors[4-distance];
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="grid grid-cols-20 grid-rows-15 gap-0 border-8 border-[#1E1E1E]">
        {Array.from({ length: 15 * 20 }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 border-2 border-[#1E1E1E] transition-all duration-150 ${
              Math.floor(index % 20) >= activeColumn && Math.floor(index % 20) < activeColumn + 5
                ? getColumnColor(index % 20)
                : 'bg-black'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;
