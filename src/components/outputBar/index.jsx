import React from "react";

import "./styles.css";

const OutputBar = ({ value, label }) => {
  return (
    <>
      <span className="label">
        <strong>{label}:</strong>
      </span>
      <h1 className="output-bar">
        <strong>{value}</strong>
      </h1>
    </>
  );
};

export default OutputBar;
