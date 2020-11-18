import React from 'react';
import * as Components from '../index';

export default function App() {
  return (
    <div style={{ background: '#e2ddd975' }}>
      <Components.NavigationBar />
      <Components.SensorMap />
      <Components.Widgets/>
    </div>
  );
}
