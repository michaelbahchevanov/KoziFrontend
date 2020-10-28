import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import floorMapImg from './map-floor-3.png';
import sensorImg from './sensor.png';
import './styles.css';

const GET_SENSORS = gql`
  {
    MeanClimateMeasurements {
      floor
      loc_x
      loc_y
      temperature
      humidity
    }
  }
`;
const CELL_WIDTH = 100 / 32; // 32 cells horizontally, each one of them 100/32% wide
const CELL_HEIGHT = 100 / 14; // 14 cells vertically, each one of them 100/14% wide

export const SensorMap = () => {
  const { data, loading, error } = useQuery(GET_SENSORS);

  if (error) return <p>ERROR</p>;
  if (loading) return <p>Loading</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Container className='my-3 p-0'>
      <Row>
        <Col className='p-0'>
          {data.MeanClimateMeasurements.map((s) => (
            <div key={s.floor + '-' + s.loc_x + '-' + s.loc_y}>
              <img
                className='sensor'
                src={sensorImg}
                style={{
                  position: 'absolute',
                  width: CELL_WIDTH + '%',
                  height: CELL_HEIGHT + '%',
                  left: (s.loc_x - 1) * CELL_WIDTH + '%',
                  top: (s.loc_y - 1) * CELL_HEIGHT + '%',
                }}
                alt='Sensor'
              />
              <span
                className='sensor-measurement'
                style={{
                  position: 'absolute',
                  left: s.loc_x * CELL_WIDTH + '%',
                  top: (s.loc_y - 1) * CELL_HEIGHT + '%',
                }}
              >
                {s.temperature.toFixed(1)}
              </span>
            </div>
          ))}
          <img className='w-100' src={floorMapImg} alt='Map' />
        </Col>
      </Row>
    </Container>
  );
};
