import React from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import floorMapImg from './map-floor-3.svg'
import './styles.css'
import { Sensor } from '../'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { useToggleState } from '../../hooks/useToggleState'
import { Heatmap } from '../Heatmap/Heatmap'

const CELL_WIDTH = 100 / 32 // 32 cells horizontally, each one of them 100/32% wide
const CELL_HEIGHT = 100 / 14 // 14 cells vertically, each one of them 100/14% wide

const LOCAL_KEY_SHOW_HEATMAP = 'PREFERENCES_SHOW_HEATMAP'

export const SensorMap = ({ workingSensors, faultySensors }) => {

  const heatmapPrefence = localStorage.getItem(LOCAL_KEY_SHOW_HEATMAP) !== "false"

  let [showHeatMap, toggleHeatmap] = useToggleState(heatmapPrefence)

  let heatmapDatapoints = workingSensors.map(s => ({
    xPercent: (s.loc_x - 1) * CELL_WIDTH,
    yPercent: (s.loc_y - 1) * CELL_HEIGHT,
    value: s.temperature,
  }))


  const toggleHeatmapClick = () => {
    localStorage.setItem(LOCAL_KEY_SHOW_HEATMAP, !showHeatMap)
    toggleHeatmap()
  }

  return (
    <Container fluid>

      {/* Buttons */}
      <Row className='justify-content-center mt-n4 pb-3' >
        <Col xs={11} lg={10}>
          <Button variant="outline-primary" onClick={toggleHeatmapClick}>
            <FontAwesomeIcon icon={faFire} size="2x" className="pr-1" />
            Heatmap
          </Button>
        </Col>
      </Row>

      {/* Sensor Map */}
      <Row className='justify-content-center'>
        <Col xs={11} lg={10} className='p-0'>

          {/* Heatmap */}
          {showHeatMap && <Heatmap data={heatmapDatapoints} />}

          {/* Working sensors */}
          {workingSensors.map((sensor) => (
            <Sensor key={[sensor.loc_x, sensor.loc_y, sensor.floor].join("-")}
              {...sensor}
              cellHeight={CELL_HEIGHT}
              cellWidth={CELL_WIDTH}
            />
          ))}

          {/* Faulty sensors */}
          {faultySensors.map((sensor) => (
            <Sensor key={[sensor.loc_x, sensor.loc_y, sensor.floor].join("-")}
              {...sensor}
              cellHeight={CELL_HEIGHT}
              cellWidth={CELL_WIDTH}
              faulty={true}
            />
          ))}

          <img className='w-100' class="floor-map" src={floorMapImg} alt='Map of the floor' />
        </Col>
      </Row>
    </Container>
  )
}
