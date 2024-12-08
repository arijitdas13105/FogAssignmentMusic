import React, { useEffect, useState } from "react";

const GRID_ROWS = 15;
const GRID_COLUMNS = 20;

const Rain = () => {
  const [drops, setDrops] = useState([]);
  const [colorSetIndex, setColorSetIndex] = useState(0);

  const colorSets = [
    ["#ff0044", "#ff2244", "#ff4466", "#ff6688", "#ff88aa", "#ffaaee"], // First color set
    ["#0044ff", "#2266ff", "#4488ff", "#66aaff", "#88ccff", "#aadfff"], // Second color set
    ["#44ff00", "#66ff22", "#88ff44", "#aaff66", "#ccff88", "#eeffaa"], // Third color set
  ];

  useEffect(() => {
    // Change color set periodically
    const colorChangeInterval = setInterval(() => {
      setColorSetIndex((prevIndex) => (prevIndex + 1) % colorSets.length);
    }, 2500); // Change color every 5 seconds

    return () => clearInterval(colorChangeInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops((prevDrops) => {
        // Update all existing drops
        const updatedDrops = prevDrops
          .map((drop) => ({
            ...drop,
            trail: [
              ...drop.trail,
              drop.trail[drop.trail.length - 1] + 1, // Extend the trail downward
            ].slice(-6), // Limit trail length to 6 blocks
          }))
          .filter((drop) => drop.trail[0] < GRID_ROWS); // Remove drops that have exited the grid

        // Randomly add new drops
        if (Math.random() < 0.3) {
          const newDrops = [];
          for (let col = 0; col < GRID_COLUMNS; col++) {
            if (Math.random() < 0.2) {
              newDrops.push({
                column: col,
                trail: [0], // Start with a single block at the top
              });
            }
          }
          return [...updatedDrops, ...newDrops];
        }

        return updatedDrops;
      });
    }, 50); // Adjust animation speed

    return () => clearInterval(interval);
  }, []);

  const getTrailColor = (trailIndex) => {
    const currentColors = colorSets[colorSetIndex]; // Get active color set
    return currentColors[trailIndex] || currentColors[currentColors.length - 1];
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div
        className="grid border border-gray-700"
        style={{
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
          gap: "2px",
          width: "80%",
          height: "80%",
        }}
      >
        {Array.from({ length: GRID_ROWS * GRID_COLUMNS }).map((_, index) => {
          const row = Math.floor(index / GRID_COLUMNS);
          const column = index % GRID_COLUMNS;

          // Find all drops in the current cell
          const cellDrops = drops.filter(
            (drop) => drop.column === column && drop.trail.includes(row)
          );

          // Determine the color based on the most prominent trail index
          const trailIndex = Math.max(
            ...cellDrops.map((drop) => drop.trail.indexOf(row)),
            -1
          );

          return (
            <div
              key={index}
              className="w-full h-full border border-gray-700"
              style={{
                backgroundColor:
                  trailIndex >= 0 ? getTrailColor(trailIndex) : "transparent",
                transition: "background-color 0.1s",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Rain;
