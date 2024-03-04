import React, { useEffect } from "react";
import Chart from "./Chart";

export default function LineChart({ data, chosenTime }) {
  const option = {
    tooltip: {
      trigger: "axis",
      scaleSize: 300,
    },
    textStyle: {
      fontSize: 11,
    },
    grid: {
      top: "15%",
      left: "5%",
      right: "15%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        fontSize: 11,
      },
      ...data[chosenTime].xAxis,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 11,
        formatter: "{value}",
      },
      axisPointer: {
        snap: true,
      },
      ...data[chosenTime].yAxis,
    },
    series: [
      {
        type: "line",
        smooth: true,
        tooltip: {
          valueFormatter: (value) => value,
        },
        ...data[chosenTime].series,
      },
    ],
  };

  return <Chart option={option} style={{ height: 420 }} />;
}
