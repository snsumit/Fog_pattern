import React, { useState, useEffect } from 'react';
import './App.css'; // Added CSS file for styling

const App = () => {
  const [activeColumn, setActiveColumn] = useState(0);
  const [direction, setDirection] = useState(1);
  const [colorProgress, setColorProgress] = useState(0); 

  useEffect(() => {
    
    const columnInterval = setInterval(() => {
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
    }, 80); 

   
    const colorInterval = setInterval(() => {
      setColorProgress((prev) => (prev + 1) % 20); // Loop colors every 20 steps
    }, 700);

    return () => {
      clearInterval(columnInterval);
      clearInterval(colorInterval);
    };
  }, [direction]);

  const getColumnColor = (colIndex) => {
    const distance = Math.abs(colIndex - activeColumn);
    if (distance > 4) return 'bg-black';

    
    const greenColors = ['bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'];
    const pinkColors = ['bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900'];
    const blueColors = ['bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'];
    const purpleColors = ['bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900'];

    const allColors = [greenColors, pinkColors, blueColors, purpleColors];

    
    const activePaletteIndex = Math.floor(colorProgress / 5) % allColors.length;
    const currentPalette = allColors[activePaletteIndex];

    const colorIndex = (colorProgress + distance) % currentPalette.length;
    return currentPalette[colorIndex];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`,
                animation: `float ${Math.random() * 10 + 5}s infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

     
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Color Wave Animation
        </h1>

      
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative">
           
            <div className="grid grid-cols-20 grid-rows-15 gap-0 border-8 border-[#1E1E1E] rounded-lg shadow-lg bg-black/90 p-1">
              {Array.from({ length: 15 * 20 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 border-2 border-[#1E1E1E] transition-all duration-100 ${
                    Math.floor(index % 20) >= activeColumn && Math.floor(index % 20) < activeColumn + 5
                      ? getColumnColor(index % 20)
                      : 'bg-black'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-center max-w-md px-4">
          <p className="text-sm">
            Watch as the colors dance across the grid, creating a mesmerizing wave pattern
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
