import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import floorMapImg from './map-floor-3.png'
import './styles.css'
import { Sensor } from '../'
import heatmap from 'heatmapjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { useToggleState } from '../../hooks/useToggleState'

const CELL_WIDTH = 100 / 32 // 32 cells horizontally, each one of them 100/32% wide
const CELL_HEIGHT = 100 / 14 // 14 cells vertically, each one of them 100/14% wide

const LOCAL_KEY_SHOW_HEATMAP = 'PREFERENCES_SHOW_HEATMAP'

export const SensorMap = ({ workingSensors, faultySensors }) => {

  const savedPreference = localStorage.getItem(LOCAL_KEY_SHOW_HEATMAP) || "true"

  const heatmapPrefence = "true" === savedPreference.toLowerCase()

  let [showHeatMap, toggleHeatmap] = useToggleState(heatmapPrefence)

  const loadHeatmap = () => {

    let container = document.querySelector('#SensorMap')

    if (!workingSensors || !showHeatMap)
      return

    const load = () => {

      let map = heatmap.create({
        container,
        radius: mapImage.scrollWidth / 5,
        maxOpacity: .4,
        minOpacity: .0,
        blur: 1,
        gradient: {
          '.0': 'rgb(0,255,255)',
          '.2': 'rgb(0,200,200)',
          '.4': 'rgb(0,150,150)',
          '.6': 'rgb(0,100,200)',
          '.8': 'rgb(150,0,250)',
          '1': 'rgb(255,0,0)',
        }
      })


      let data = workingSensors.map(s => ({
        x: 20 + (s.loc_x - 1) * CELL_WIDTH / 100 * container.scrollWidth,
        y: 10 + (s.loc_y - 1) * CELL_HEIGHT / 100 * container.scrollHeight,
        value: s.temperature,
      }))
      let maxValue = Math.max(...data.map(d => d.value))
      let minValue = Math.min(...data.map(d => d.value))

      map.setData({
        data,
      }).setDataMin(minValue).setDataMax(maxValue)
    }

    let mapImage = container.querySelector('img#MapImage')

    mapImage.complete ? load() : mapImage.onload = load

    return () => {
      let heatmap = document.querySelector('#SensorMap canvas')
      if (heatmap) heatmap.remove()
    }
  }

  useEffect(loadHeatmap)


  const toggleHeatmapClick = () => {
    localStorage.setItem(LOCAL_KEY_SHOW_HEATMAP, !showHeatMap)
    toggleHeatmap()
  }

  return (
    <Container fluid>
      <Row className='justify-content-center mt-n4 pb-3' >
        <Col xs={11} lg={10}>
          <Button variant="outline-primary" onClick={toggleHeatmapClick}>
            <FontAwesomeIcon icon={faFire} size="2x" className="pr-1" />
            Heatmap
          </Button>
        </Col>
      </Row>
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

          <img id="MapImage" className='w-100' src={floorMapImg} alt='Map' />
        </Col>
      </Row>
    </Container>
  )
}
