import React from "react";
import { gql, useQuery } from '@apollo/client';
import "./widget.css";

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
const widget = () => {
  const { data, loading, error } = useQuery(GET_SENSORS);
  var avgTemp =          
  (
    data.MeanClimateMeasurements.reduce(
      (a, b) => a + b.temperature,
      0
    ) / data.MeanClimateMeasurements.length
  ).toFixed(1) || 0;

  var avgHum =   (
    data.MeanClimateMeasurements.reduce(
      (a, b) => a + b.humidity,
      0
    ) / data.MeanClimateMeasurements.length
  ).toFixed(1) || 0;


  if (error) return <p>ERROR</p>;
  if (loading) return <p>Loading</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div>
    <div className="widget">
      <h1 className="value">{avgTemp}°C</h1>
      <p className="description">Avg.Temp</p>
    </div>
    <div className="widget">
      <h1 className="value">{avgHum}%</h1>
      <p className="description">Avg.Hum</p>
    </div>
    </div>
  );
};

export default widgets;
