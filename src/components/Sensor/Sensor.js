import React, { useState, useRef } from 'react';
import '../../fonts/OpenSans-Regular.ttf';
import './sensor.css';
import { Overlay, Popover } from 'react-bootstrap'
import SensorHoverView from './sensorHoverView'

export default function Sensor({
  floor,
  loc_x,
  loc_y,
  cellHeight = 100 / 32,
  cellWidth = 100 / 14,
  temperature = 0.0,
  humidity
}){ 

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleHover = (event) => {
    setShow(true);
    setTarget(event.target);
  };

  const handleClose = (event) => {
    setShow(false);

  };

let faulty = false;

if(!faulty){
  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleHover}
        onMouseLeave={handleClose}
        className='sensor-font sensor'
        style={{
          position: 'absolute',
          left: (loc_x - 1.25) * cellWidth + '%',
          top: (loc_y - 1.25) * cellHeight + '%',
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
        <SensorHoverView show={show} target={target} floor={floor} temperature={temperature} humidity={humidity} loc_x={loc_x} loc_y={loc_y} ref={ref} />
      </div>
    </>
  );
}
else{
  return (
    <>
      <div
        className='sensor-font faulty-sensor'
        style={{
          position: 'absolute',
          left: (loc_x - 1.25) * cellWidth + '%',
          top: (loc_y - 1.25) * cellHeight + '%',
        }}
      >
        <span>!</span>
      </div>
    </>
  );
}
}

