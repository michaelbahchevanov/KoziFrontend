import React, { useState } from 'react'
import { Overlay, Popover, Col, Row, Button, Modal } from 'react-bootstrap'
import { useAuthenticatedUser } from '../../hooks'
import { gql, useMutation } from '@apollo/client'


export function Sensorhoverview(props) {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const user = useAuthenticatedUser()

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

  const [toggleMaintenance, { data }] = useMutation(mutationQuery)


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
              {(Math.round(props.humidity * 100) / 100).toFixed(1)}
              {true && (
                <Row className="justify-content-center">
                  <Button variant="primary" className="mt-2" onClick={handleShow}>
                    Advanced
                  </Button>
                </Row>
              )}
            </Popover.Content>
          </Popover>
        </Overlay>
        {true && (
          <Modal show={show} animation={false} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Advanced settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="warning" onClick={() => toggleMaintenance({})}>
                Toggle maintenance {props.maintenance ? "off" : "on"}
              </Button>
            </Modal.Body>
          </Modal>
        )}
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
