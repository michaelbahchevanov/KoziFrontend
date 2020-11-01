import React from 'react';
import * as Components from '../index';

export default function App() {
  return (
    <div style={{ background: '#EEEEEE' }}>
      <Components.NavigationBar />
      <Components.Widgets/>
      <Components.SensorMap />
      <Components.GraphQLTesting />
    </div>
  );
}
