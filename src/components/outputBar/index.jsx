import React from "react";

import "./styles.css";

const OutputBar = ({ value }) => {
  return (
    <h1 className="output-bar">
      <strong>{value}</strong>
    </h1>
  );
};

export default OutputBar;
