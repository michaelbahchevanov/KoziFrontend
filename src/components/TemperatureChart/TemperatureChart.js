import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Spinner } from 'react-bootstrap'

// Until Rechart gets their fix together this is the only way to import from there
import * as Recharts from 'recharts/umd/Recharts'
const { XAxis, YAxis, Tooltip, Area, CartesianGrid, ComposedChart } = Recharts


const GET_QUERY = gql`
    query GetTemperature($start: String $end: String $floor:Int! $loc_x: Int! $loc_y:Int! ){
        AllTemperatureMeasurements(start: $start stop: $end floor: $floor loc_x: $loc_x loc_y: $loc_y){
            value
            datetime
            is_valid
        }
    }
`

const epochToShortDateTime = epoch => new Date(epoch).toLocaleString('en-GB')

export default function TemperatureChart({ start, stop, floor, loc_x, loc_y }) {

    const { data, loading, error } = useQuery(GET_QUERY, {
        variables: { start, stop, floor, loc_x, loc_y },
        pollInterval: 10_000,
    })

    if (loading) {
        return <div className="d-flex">
            <Spinner className="mx-auto" animation="border" role="status"> </Spinner>
        </div>
    }

    if (error) return <p>Something went wrong. Please try again.</p>

    const datapoints = data.AllTemperatureMeasurements.map(d => ({
        ...d,
        time: new Date(d.datetime).getTime(),
        temperature: d.value,
    }))

    return (
        <Recharts.ResponsiveContainer width="95%" height={700}>
            <ComposedChart data={datapoints} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="time" type='number'
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={epochToShortDateTime}
                />
                <YAxis domain={['dataMin - 1', 'auto']} unit='°C' />

                <Tooltip labelFormatter={epochToShortDateTime} />
                <Area type="monotone" dataKey="temperature" stroke="#009DDC" fill="#009DDC" unit="°C" />
            </ComposedChart>
        </Recharts.ResponsiveContainer>

    )
}
