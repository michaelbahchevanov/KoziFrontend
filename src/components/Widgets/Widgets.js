import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './widgets.css';

const Widgets = ({ workingSensors }) => {
  var avgTemp =
    workingSensors.reduce((a, b) => a + b.temperature, 0) /
      workingSensors.length || 0;

  var avgHum =
    workingSensors.reduce((a, b) => a + b.humidity, 0) /
      workingSensors.length || 0;

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col sm='5' className='widget'>
          <h1 className='value'>{workingSensors.length}</h1>
          <p className='description'>Active sensors</p>
        </Col>
        <Col sm='5' className='widget'>
          <h1 className='value'>{avgTemp.toFixed(1)}°C</h1>
          <p className='description'>Avg.Temp</p>
        </Col>
        <Col sm='5' className='widget'>
          <h1 className='value'>{avgHum.toFixed(1)}%</h1>
          <p className='description'>Avg.Hum</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Widgets;
