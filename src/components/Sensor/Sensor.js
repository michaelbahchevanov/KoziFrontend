import React from 'react';

export default function Sensor({
  floor,
  loc_x,
  loc_y,
  cellHeight = 100 / 32,
  cellWidth = 100 / 14,
  temperature = 0.0,
}) {
  return (
    <>
      <div
        style={{
          height: '60px',
          width: '60px',
          position: 'absolute',
          left: loc_x * cellWidth + '%',
          top: (loc_y - 1) * cellHeight + '%',
          marginTop: '-0.9rem',
          marginLeft: '0.5rem',
          borderRadius: '50%',
          border: 'solid',
          borderColor: 'red',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '9px',
            top: '16px',
          }}
        >
          {temperature.toFixed(1) + '°C'}
        </span>
      </div>
    </>
  );
}
