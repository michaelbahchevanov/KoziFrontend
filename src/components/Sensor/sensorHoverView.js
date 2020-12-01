import React from 'react'
import { Overlay, Popover } from 'react-bootstrap'
export function Sensorhoverview(props) {
    

    return (
        <Overlay
        transition={null}
          show={props.show}
          target={props.target}
          placement="top"
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Title className="text-nowrap" style={{ backgroundColor: "#349CDB", color: "#ffffff" }} as="h3">Sensor Information</Popover.Title>
            <Popover.Content>
              <strong>Floor:</strong> {props.floor}
              <br />
              <strong>X:</strong> {props.loc_x + " "}
              <strong>Y:</strong> {props.loc_y}
              <br />
              <strong>T:</strong> {(Math.round(props.temperature * 100) / 100).toFixed(1) + ' °C '}
              <strong>H:</strong> {(Math.round(props.humidity * 100) / 100).toFixed(1)}
            </Popover.Content>
          </Popover>
        </Overlay>
    )
}

export default Sensorhoverview
