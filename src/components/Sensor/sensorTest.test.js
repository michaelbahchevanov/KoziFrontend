import React from 'react';
import ReactDOM from 'react-dom';
import Sensor from './Sensor'



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sensor />, div);
});
