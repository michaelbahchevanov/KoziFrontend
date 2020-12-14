import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './widgets.css';

const Widgets = ({ workingSensors }) => {
  var avgTemp =
    (
      workingSensors.reduce((a, b) => a + b.temperature, 0) /
      workingSensors.length
    ).toFixed(1) || 0;

  var avgHum =
    (
      workingSensors.reduce((a, b) => a + b.humidity, 0) / workingSensors.length
    ).toFixed(1) || 0;

  return (
    <Container>
      <Row lg='8' xl='7' className='justify-content-center'>
        <Col className='widget '>
          <h1 className='value'>{workingSensors.length}</h1>
          <p className='description'>Active sensors</p>
        </Col>
        <Col className='widget'>
          <h1 className='value'>{avgTemp}°C</h1>
          <p className='description'>Avg.Temp</p>
        </Col>
        <Col className='widget'>
          <h1 className='value'>{avgHum}%</h1>
          <p className='description'>Avg.Hum</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Widgets;
