
import React from "react";

import * as Components from "../components/index";


export default function MainPage() {
  return (
    <div style={{ background: '#e2ddd975' }}>
      <Components.SensorMap />
      <Components.Widgets/>
    </div>
  );
}
