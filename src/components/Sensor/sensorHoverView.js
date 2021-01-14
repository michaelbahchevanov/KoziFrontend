import React, { useState } from 'react'
import { Overlay, Popover, Row, Button, Modal, ToggleButtonGroup, ToggleButton, Col } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import { GET_SENSORS } from '../../hooks/getSensors'
import TemperatureChart from '../TemperatureChart/TemperatureChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

export function Sensorhoverview(props) {

  const [show, setShow] = useState(false)
  const [chartStartTime, setChartStartTime] = useState('-1d')

  const handleClose = () => setShow(false)

  const handleShow = () => {
    setShow(true)
    props.handleOverlayClose()
  }

  const mutationQuery = gql`
    mutation {
      SetMaintenanceMode(
        input: {
          loc_x:${props.loc_x}, 
          loc_y:${props.loc_y}, 
          floor:${props.floor}, 
          isInMaintenance:${!props.maintenance}
        }
      )
    }
    `

  const [toggleMaintenance] = useMutation(mutationQuery, {
    refetchQueries: [
      { query: GET_SENSORS }
    ]
  })


  if (props.fault_code === '') {
    return (
      <>
        <Overlay
          transition={null}
          show={props.show}
          target={props.target}
          placement='top'
          containerPadding={20}
        >
          <Popover id='popover-contained'>
            <Popover.Title
              className='text-nowrap'
              style={{ backgroundColor: '#349CDB', color: '#ffffff' }}
              as='h3'
            >
              Sensor Information
          </Popover.Title>
            <Popover.Content>
              <strong>Floor:</strong> {props.floor}
              <br />
              <strong>X:</strong> {props.loc_x + ' '}
              <strong>Y:</strong> {props.loc_y}
              <br />
              <strong>T:</strong>{' '}
              {(Math.round(props.temperature * 100) / 100).toFixed(1) + ' °C '}
              <strong>H:</strong>{' '}
              {(Math.round(props.humidity * 100) / 100).toFixed(1)}%
                <Row className="justify-content-center">
                <Button variant="outline-primary" className="mt-2" onClick={handleShow}>
                  Details
                  </Button>
              </Row>
            </Popover.Content>
          </Popover>
        </Overlay>

        <Modal show={show} animation={false} size="xl" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Details for Sensor ({props.loc_x}, {props.loc_y}) on floor {props.floor}</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Row>
              {global.user && (
                <Col xs="auto">
                  <Button variant="outline-warning" onClick={() => toggleMaintenance({})}>
                    <FontAwesomeIcon size="2x" className="pr-1" icon={faTools} />
                    <span>Turn maintenance {props.maintenance ? "off" : "on"}</span>
                  </Button>
                </Col>
              )}
              <Col xs="auto">
                <ToggleButtonGroup name="durationBtnGroup">
                  <ToggleButton onClick={() => setChartStartTime('-1d')} >1 Day</ToggleButton>
                  <ToggleButton onClick={() => setChartStartTime('-3d')} >3 Day</ToggleButton>
                  <ToggleButton onClick={() => setChartStartTime('-7d')} >7 Days</ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <TemperatureChart start={chartStartTime} floor={props.floor} loc_x={props.loc_x} loc_y={props.loc_y} />
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

      </>
    )
  } else {
    return (
      <Overlay
        transition={null}
        show={props.show}
        target={props.target}
        placement='top'
        containerPadding={20}
      >
        <Popover id='popover-contained'>
          <Popover.Title
            className='text-nowrap'
            style={{ backgroundColor: '#C12D3F', color: '#ffffff' }}
            as='h3'
          >
            Sensor Information
          </Popover.Title>
          <Popover.Content>
            <strong>An unexpected error occured:</strong>
            <br />
            {DisplayErrorCode(props.fault_code)}
          </Popover.Content>
        </Popover>
      </Overlay>
    )
  }
}




function DisplayErrorCode(error) {
  switch (error) {
    case 'ERROR_TEMPERATURE_OUT_OF_RANGE':
      return 'Temperature was unreasonably high or low'

    case 'ERROR_TEMPERATURE_DIFFERENCE_MORE_THAN_2_CELSIUS':
      return 'Temperature changed abruptly'

    case 'ERROR_NOT_ENOUGH_VALID_ENTRIES':
      return 'Sensor did not send enough temperature measurements'
    default:
      return 'Unknown error...'
  }
}

export default Sensorhoverview
