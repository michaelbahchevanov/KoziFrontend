import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import floorMapImg from './map-floor-3.png';
import './styles.css';
import { Sensor } from '../';

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
  const { data, loading, error } = useQuery(GET_SENSORS, {
    pollInterval: 30000
  });

  if (error) return <p>ERROR</p>;
  if (loading) return <p>Loading</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Container className='my-3 p-0'>
      <Row>
        <Col className='p-0'>
          {data.MeanClimateMeasurements.map((sensor) => (
            <Sensor
              {...sensor}
              cellHeight={CELL_HEIGHT}
              cellWidth={CELL_WIDTH}
            />
          ))}
          <img className='w-100' src={floorMapImg} alt='Map' />
        </Col>
      </Row>
    </Container>
  );
};
