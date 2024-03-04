import React from "react";
import "./SumNumCard.scss";
import Counter from "../../ui-components/Counter";
import { summaryNums } from "../../mockData/mockData";

export default function SumNumCard({ sumNumItem }) {
  return (
    <div className="sum-num-card-container">
      <div>
        <p className="sum-num-title">{sumNumItem.title}</p>
        <div className="sum-num-wrapper">
          <span className="sum-num-data">
            <Counter
              to={summaryNums[sumNumItem.dataKey]}
              toFixedVal={sumNumItem.toFixedVal ? sumNumItem.toFixedVal : 0}
            />
          </span>
          <span className="sum-num-unit">
            {sumNumItem.unit && sumNumItem.unit}
          </span>
        </div>
      </div>
      <div
        className="sum-num-icon-container"
        style={{ backgroundColor: sumNumItem.iconColor }}
      >
        <img src={sumNumItem.iconSrc} />
      </div>
    </div>
  );
}
