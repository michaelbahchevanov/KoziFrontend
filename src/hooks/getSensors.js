import { gql, useQuery } from '@apollo/client'

export const GET_SENSORS = gql`
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
    },
    SensorMaintenance {
      loc_x,
      loc_y,
      floor,
    }
  }
`

export const GetSensors = () => {
  const { data, loading, error, refetch } = useQuery(GET_SENSORS, {
  })

  return { data, loading, error, refetch }
}


