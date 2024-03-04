import React from "react";
import Chart from "./Chart";

export default function BarChart({ data }) {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    itemStyle: {
      borderRadius: [10, 10, 0, 0],
    },
    textStyle: {
      fontSize: 11,
    },
    grid: {
      top: "10%",
      left: "8%",
      right: "20%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          fontSize: 11,
        },
        ...data.xAxis,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          fontSize: 11,
          formatter: "{value}%",
        },
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: "40%",
        tooltip: {
          valueFormatter: (value) => value + "%",
        },
        ...data.series,
      },
    ],
  };

  return <Chart option={option} style={{ height: 350 }} />;
}
