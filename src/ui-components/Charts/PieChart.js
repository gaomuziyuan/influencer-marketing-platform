import React from "react";
import Chart from "./Chart";

export default function PieChart({ data }) {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      type: "scroll",
      top: "center",
      right: "5%",
      orient: "vertical",
      textStyle: {
        fontSize: 11,
      },
    },
    series: [
      {
        name: "Viewer Source",
        type: "pie",
        left: "5%",
        right: "30%",
        radius: ["70%", "62%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 70,
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: data.data,
      },
    ],
  };

  return <Chart option={option} style={{ height: 350 }} />;
}
