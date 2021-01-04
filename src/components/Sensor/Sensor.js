import React, { useState, useRef } from 'react'
import '../../fonts/OpenSans-Regular.ttf'
import './sensor.css'
import SensorHoverView from './sensorHoverView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

export default function Sensor({
  floor,
  loc_x,
  loc_y,
  faulty,
  fault_code,
  maintenance,
  cellHeight = 100 / 32,
  cellWidth = 100 / 14,
  temperature = 0.0,
  humidity
}) {

  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const handleHover = (event) => {
    setShow(true)
    setTarget(event.target)
  }

  const handleClose = (event) => {
    setShow(false)
  }

  if (maintenance) {
    return (
      <>
        <div
          ref={ref}
          onMouseEnter={handleHover}
          onMouseLeave={handleClose}
          className='sensor maintenance-sensor'
          style={{
            left: (loc_x - 1.25) * cellWidth + '%',
            top: (loc_y - 1.25) * cellHeight + '%',
            width: cellWidth + '%',
            height: cellHeight + '%',
          }}
        >
          <span>
            <FontAwesomeIcon style={{ color: "black" }} icon={faTools} size="3x" />
          </span>
          <SensorHoverView
            handleOverlayClose={handleClose}
            show={show}
            maintenance={true}
            target={target}
            floor={floor}
            fault_code=''
            loc_x={loc_x}
            loc_y={loc_y}
          />
        </div>
      </>
    )
  }

  else if (faulty) {
    return (
      <>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleClose}
          className='sensor faulty-sensor'
          style={{
            position: 'absolute',
            left: (loc_x - 1.25) * cellWidth + '%',
            top: (loc_y - 1.25) * cellHeight + '%',
            width: cellWidth + '%',
            height: cellHeight + '%',
          }}
        >
          <span>!</span>
          <SensorHoverView
            handleOverlayClose={handleClose}
            show={show}
            target={target}
            floor={floor}
            fault_code={fault_code}
            loc_x={loc_x}
            loc_y={loc_y}
          />
        </div>
      </>
    )
  } else {
    return (


      <>
        <div
          ref={ref}
          onMouseEnter={handleHover}
          onMouseLeave={handleClose}
          className='sensor working-sensor'
          style={{
            left: (loc_x - 1.25) * cellWidth + '%',
            top: (loc_y - 1.25) * cellHeight + '%',
            width: cellWidth + '%',
            height: cellHeight + '%',
          }}
        >
          <span>{temperature.toFixed(1) + '°C'}</span>
          <SensorHoverView
            handleOverlayClose={handleClose}
            show={show}
            target={target}
            floor={floor}
            maintenance={false}
            temperature={temperature}
            fault_code=''
            humidity={humidity}
            loc_x={loc_x}
            loc_y={loc_y}
          />
        </div>
      </>
    )
  }
}
