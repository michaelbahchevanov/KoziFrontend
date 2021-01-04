import { gql, useQuery } from '@apollo/client'
import React from "react"
import { Spinner } from 'react-bootstrap'

import * as Components from "../components/index"

const GET_SENSORS = gql`
  {
    MeanClimateMeasurements {
      floor
      loc_x
      loc_y
      temperature
      humidity
    },
    SensorFaults {
      id
      loc_x
      loc_y
      floor
      timestamp
      fault_code
    }
  }
  
`

export default function MainPage() {

  const { data, loading, error } = useQuery(GET_SENSORS, {
    pollInterval: 10_000
  })

  if (error) return <h1>Something went wrong. Please try again</h1>

  let workingSensors = []
  let faultySensors = []


  if (data) {
    workingSensors = data.MeanClimateMeasurements.filter(goodData => !data.SensorFaults.some(
      faultySensor => goodData.loc_x === faultySensor.loc_x && goodData.loc_y === faultySensor.loc_y && goodData.floor === faultySensor.floor
    ))
    faultySensors = data.SensorFaults
  }

  return (
    <div>

      {/* Loading spinner */}
      {loading && <div className="d-flex">
        <Spinner className="mx-auto" animation="border" role="status"> </Spinner>
      </div>}

      <Components.SensorMap workingSensors={workingSensors} faultySensors={faultySensors} />
      <Components.Widgets workingSensors={workingSensors} />
    </div>
  )
}
