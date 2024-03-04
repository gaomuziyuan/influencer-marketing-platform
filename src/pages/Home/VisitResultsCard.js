import React, { useEffect, useState } from "react";
import "./VisitResultsCard.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LineChart from "../../ui-components/Charts/LineChart";
import { visitResults } from "../../mockData/mockData";

export default function VisitResultsCard() {
  const [period, setPeriod] = useState("yesterday");

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="visit-results-container">
      <div className="visit-title-wrapper">
        <p className="visit-title">Visit Results</p>
        <div>
          <span>Time Period</span>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={period}
            onChange={handleChange}
            className="visit-period-select"
          >
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </Select>
        </div>
      </div>
      <LineChart data={visitResults} chosenTime={period} />
    </div>
  );
}
