import React, { useState, useRef } from 'react';
import '../../fonts/OpenSans-Regular.ttf';
import './sensor.css';
import { Overlay, Popover } from 'react-bootstrap'

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
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Title className="text-nowrap" style={{ backgroundColor: "#349CDB", color: "#ffffff" }} as="h3">Sensor Information</Popover.Title>
            <Popover.Content>
              <strong>Floor:</strong> {floor}
              <br />
              <strong>X:</strong> {loc_x + " "}
              <strong>Y:</strong> {loc_y}
              <br />
              <strong>T:</strong> {(Math.round(temperature * 100) / 100).toFixed(1) + ' °C '}
              <strong>H:</strong> {(Math.round(humidity * 100) / 100).toFixed(1)}
            </Popover.Content>
          </Popover>
        </Overlay>
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

