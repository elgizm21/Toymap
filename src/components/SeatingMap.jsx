import React, { useEffect, useState } from 'react';
import { Stage, Layer, Circle, Text, Group } from 'react-konva';

export default function SeatingMap({ tables, assignments, highlightTableId }) {
  const [stageSize, setStageSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    function onResize() {
      const w = Math.min(window.innerWidth * 0.9, 1000);
      const h = Math.min(window.innerHeight * 0.5, 500);
      setStageSize({ width: w, height: h });
    }
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        style={{ backgroundColor: '#f9fafb' }}
      >
        <Layer>
          {tables.map(t => {
            // bu masada kimlər əyləşir
            const seated = Object.entries(assignments)
              .filter(([_, tableId]) => tableId === t.id)
              .map(([guest]) => guest);

            const isOccupied = seated.length > 0;
            const isHighlighted = highlightTableId === t.id;

            return (
              <Group key={t.id}>
                <Circle
                  x={t.x}
                  y={t.y}
                  radius={30}
                  fill={
                    isHighlighted
                      ? '#ec4899'       // vurğulanmış: pink-500
                      : isOccupied
                      ? '#34D399'      // yaşıl
                      : '#E5E7EB'      // boz
                  }
                  stroke="#374151"
                  strokeWidth={isHighlighted ? 4 : 2}
                />
                <Text
                  text={t.id}
                  x={t.x - 8}
                  y={t.y - 8}
                  fontSize={16}
                  fontStyle="bold"
                  fill="#1F2937"
                />
                {seated.map((guest, i) => (
                  <Text
                    key={guest}
                    text={guest}
                    x={t.x + 40}
                    y={t.y - 20 + i * 18}
                    fontSize={14}
                    fill="#374151"
                  />
                ))}
              </Group>
            );
          })}
        </Layer>
      </Stage>
      {tables.length === 0 && (
        <p className="p-6 text-center text-gray-500">
          Hələ heç bir masa əlavə edilməyib.
        </p>
      )}
    </div>
  );
}
