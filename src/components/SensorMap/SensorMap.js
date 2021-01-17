import React, { useState } from 'react';
import {
  Row,
  Col,
  Container,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import './styles.css';
import { Sensor } from '../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { useToggleState } from '../../hooks/useToggleState';
import { Heatmap } from '../Heatmap/Heatmap';
import { getFloorConfig } from './floorConfigs';

const LOCAL_KEY_SHOW_HEATMAP = 'PREFERENCES_SHOW_HEATMAP';

export const SensorMap = ({
  workingSensors,
  faultySensors,
  maintenanceSensors,
}) => {
  const heatmapPrefence =
    localStorage.getItem(LOCAL_KEY_SHOW_HEATMAP) !== 'false';

  let [showHeatMap, toggleHeatmap] = useToggleState(heatmapPrefence);
  let [displayFloor, setDisplayFloor] = useState(null);

  let allfloors = [...workingSensors, ...faultySensors, ...maintenanceSensors]
    .map((sensor) => sensor.floor)
    .sort((a, b) => Math.sign(a - b));
  let floors = new Set(allfloors);

  if (displayFloor === null && allfloors[0] !== undefined)
    setDisplayFloor(allfloors[0]);

  let floorConfig = getFloorConfig(displayFloor);

  const cellWidth = 100 / floorConfig.dimX; // 32 cells horizontally, each one of them 100/32% wide
  const cellHeight = 100 / floorConfig.dimY; // 14 cells vertically, each one of them 100/14% wide

  workingSensors = workingSensors.filter(
    (sensor) => sensor.floor === displayFloor
  );
  faultySensors = faultySensors.filter(
    (sensor) => sensor.floor === displayFloor
  );
  maintenanceSensors = maintenanceSensors.filter(
    (sensor) => sensor.floor === displayFloor
  );

  let heatmapDatapoints = workingSensors.map((s) => ({
    xPercent: (s.loc_x - 1) * cellWidth,
    yPercent: (s.loc_y - 1) * cellHeight,
    value: s.temperature,
  }));

  const toggleHeatmapClick = () => {
    localStorage.setItem(LOCAL_KEY_SHOW_HEATMAP, !showHeatMap);
    toggleHeatmap();
  };

  return (
    <>
      <Container fluid>
        {/* Buttons */}
        <Row className='mt-n4 pb-3'>
          <Col xs={1} ls={2}></Col>
          <Col xs='auto'>
            <Button variant='outline-primary' onClick={toggleHeatmapClick}>
              <FontAwesomeIcon icon={faFire} size='2x' className='pr-1' />
              <span>Heatmap</span>
            </Button>
          </Col>
          <Col>
            <ToggleButtonGroup
              className='h-100'
              value={displayFloor}
              onChange={setDisplayFloor}
              name='floorSelectionGroup'
            >
              {[...floors].map((floor) => (
                <ToggleButton
                  value={floor}
                  variant='outline-primary'
                  className='d-flex align-items-center'
                  key={floor}
                >
                  {' '}
                  {floor}{' '}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Col>
        </Row>

        {/* Sensor Map */}
        <Row className='justify-content-center'>
          <Col xs={0} lg={1}></Col>
          <Col className='p-0'>
            {/* Heatmap */}
            {showHeatMap && <Heatmap data={heatmapDatapoints} />}

            {/* Working sensors */}
            {workingSensors.map((sensor) => (
              <Sensor
                key={[sensor.loc_x, sensor.loc_y, sensor.floor].join('-')}
                {...sensor}
                cellHeight={cellHeight}
                cellWidth={cellWidth}
              />
            ))}

            {/* Faulty sensors */}
            {faultySensors.map((sensor) => (
              <Sensor
                key={[sensor.loc_x, sensor.loc_y, sensor.floor].join('-')}
                {...sensor}
                cellHeight={cellHeight}
                cellWidth={cellWidth}
                faulty={true}
              />
            ))}

            {/* Maintenance sensors */}
            {maintenanceSensors.map((sensor) => (
              <Sensor
                key={[sensor.loc_x, sensor.loc_y, sensor.floor].join('-')}
                {...sensor}
                cellHeight={cellHeight}
                cellWidth={cellWidth}
                maintenance={true}
              />
            ))}

            <img
              className='w-100 floor-map'
              id='wp'
              src={floorConfig.map}
              alt='Map of the floor'
            />
          </Col>
          <Col xs={0} lg={1}></Col>
        </Row>
      </Container>
      <div></div>
    </>
  );
};
