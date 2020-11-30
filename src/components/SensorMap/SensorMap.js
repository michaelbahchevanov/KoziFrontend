import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import floorMapImg from './map-floor-3.png';
import './styles.css';
import { Sensor } from '../';

const CELL_WIDTH = 100 / 32; // 32 cells horizontally, each one of them 100/32% wide
const CELL_HEIGHT = 100 / 14; // 14 cells vertically, each one of them 100/14% wide

export const SensorMap = ({workingSensors, faultySensors}) => {
  
  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col xs={11} lg={10} className='p-0'>
          {workingSensors.map((sensor) => (
            <Sensor key={[sensor.loc_x, sensor.loc_y, sensor.floor].join("-")}
              {...sensor}
              cellHeight={CELL_HEIGHT}
              cellWidth={CELL_WIDTH}
            />
          ))}

          {faultySensors.map((sensor) => (
            <Sensor key={[sensor.loc_x, sensor.loc_y, sensor.floor].join("-")}
              {...sensor}
              cellHeight={CELL_HEIGHT}
              cellWidth={CELL_WIDTH}
              faulty = {true}
            />
          ))}

          <img className='w-100' src={floorMapImg} alt='Map' />
        </Col>
      </Row>
    </Container>
  );
};
