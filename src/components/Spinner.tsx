import React from "react";

import "../App.css";

const Spinner: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading..</p>
    </div>
  );
};

export default Spinner;
