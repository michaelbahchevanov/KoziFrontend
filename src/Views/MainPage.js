import React from 'react';
import { Spinner } from 'react-bootstrap';

import * as Components from '../components/index';
import { GetSensors } from '../hooks';

export default function MainPage() {
  const { data, loading, error } = GetSensors();

  if (error) return <h1>Something went wrong. Please try again</h1>;

  let workingSensors = [];
  let faultySensors = [];
  let maintenanceSensors = [];

  if (data) {
    workingSensors = data.MeanClimateMeasurements.filter(
      (goodData) =>
        !data.SensorFaults.some(
          (faultySensor) =>
            goodData.loc_x === faultySensor.loc_x &&
            goodData.loc_y === faultySensor.loc_y &&
            goodData.floor === faultySensor.floor
        )
    );

    workingSensors = data.MeanClimateMeasurements.filter(
      (goodData) =>
        !data.SensorMaintenance.some(
          (maintenanceSensor) =>
            goodData.loc_x === maintenanceSensor.loc_x &&
            goodData.loc_y === maintenanceSensor.loc_y &&
            goodData.floor === maintenanceSensor.floor
        )
    );

    maintenanceSensors = data.SensorMaintenance;

    faultySensors = data.SensorFaults;
  }

  return (
    <div>
      {/* Loading spinner */}
      {loading && (
        <div className='d-flex'>
          <Spinner className='mx-auto' animation='border' role='status'>
            {' '}
          </Spinner>
        </div>
      )}

      <Components.SensorMap
        workingSensors={workingSensors}
        faultySensors={faultySensors}
        maintenanceSensors={maintenanceSensors}
      />
      <Components.Widgets workingSensors={workingSensors} />
    </div>
  );
}
