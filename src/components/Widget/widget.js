import React from "react";
import "./widget.css";

const widget = (props) => {
  return (
    <div className="widget">
      <h1 className="value">{props.temp}</h1>
      <p className="description">Temp</p>
    </div>
  );
};

export default widget;
