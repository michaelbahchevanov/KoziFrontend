import React, { useLayoutEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import floorMapImg from './map-floor-3.png'
import './styles.css'
import { Sensor } from '../'
import heatmap from 'heatmapjs'

const CELL_WIDTH = 100 / 32 // 32 cells horizontally, each one of them 100/32% wide
const CELL_HEIGHT = 100 / 14 // 14 cells vertically, each one of them 100/14% wide

export const SensorMap = ({ workingSensors, faultySensors }) => {

  useLayoutEffect(() => {
    let container = document.querySelector('#SensorMap')

    container.querySelector('img').onload = () => {
      console.log({ w: container.scrollWidth, h: container.scrollHeight })

      if (!container.scrollHeight)
        return

      let map = heatmap.create({
        container,
        radius: 320,
        maxOpacity: .4,
        minOpacity: .0,
        gradient: {
          '.0': 'rgb(0,200,255)',
          '.3': 'rgb(0,150,200)',
          '.75': 'rgb(0,100,200)',
          '.85': 'rgb(100,0,250)',
          '1': 'rgb(255,0,0)',
        }
      })


      if (workingSensors) {

        let data = workingSensors.map(s => ({
          x: 20 + (s.loc_x - 1) * CELL_WIDTH / 100 * container.scrollWidth,
          y: 10 + (s.loc_y - 1) * CELL_HEIGHT / 100 * container.scrollHeight,
          value: s.temperature,
        }))

        console.log({ data, w: container.scrollWidth, h: container.scrollHeight, container })

        map.setData({
          data,
        }).setDataMin(24).setDataMax(26)

      }
    }


  })

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col id="SensorMap" xs={11} lg={10} className='p-0'>
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
              faulty={true}
            />
          ))}

          <img className='w-100' src={floorMapImg} alt='Map' />
        </Col>
      </Row>
    </Container>
  )
}
