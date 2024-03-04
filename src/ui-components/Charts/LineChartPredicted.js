import React from "react";
import Chart from "./Chart";

export default function LineChartPredicted({ data, unit = "" }) {
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
      right: "10%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        fontSize: 11,
      },
      ...data.xAxis,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 11,
        formatter: "{value}" + unit,
      },
      axisPointer: {
        snap: true,
      },
      ...data.yAxis,
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: data.pieces,
    },
    series: [
      {
        type: "line",
        smooth: true,
        tooltip: {
          valueFormatter: (value) => value + "$",
        },
        ...data.series,
      },
    ],
  };

  return <Chart option={option} style={{ height: 350 }} />;
}
