import React, { Fragment } from "react";
import { gql, useQuery } from "@apollo/client";

import { Row, Col, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const GET_SENSORS = gql`
{
    MeanClimateMeasurements {
      floor loc_x loc_y temperature humidity
    }
  }
`;


const Launches = () => {
    const { data, loading, error } = useQuery(GET_SENSORS);
  
    if (error) return <p>ERROR</p>;
    // if (loading) return <p>Loading</p> 
    if (!data) return <p>Not found</p>;
  
    return (
        <Container>
            <Row className="mt-4">
                <Col className="col-12 d-flex justify-content-center text-center my-5">
                    <h1>Temperature: &nbsp;
                    {
                        (data.MeanClimateMeasurements.reduce((a, b) => a + b.temperature, 0) / data.MeanClimateMeasurements.length).toFixed(2) || 0
                    }°C
                     </h1>
                </Col>
            </Row>
            <Row>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Location X</th>
                            <th>Location Y</th>
                            <th>Temprature</th>
                            <th>Humidity</th>
                        </tr>
                    </thead>
                    <tbody >
                        {data.MeanClimateMeasurements.map(x => (
                            <tr key={`${x.loc_x} ${x.loc_y}`}>

                                <td>{x.loc_x}</td>
                                <td>{x.loc_y}</td>
                                <td>{x.temperature.toFixed(2)}</td>
                                <td>{x.humidity.toFixed(2)}</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
  };
  
  export default Launches;