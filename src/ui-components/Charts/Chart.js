import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

export default function Chart({ option, style }) {
  const theme = useSelector((state) => state.theme);

  return <ReactECharts option={option} theme={theme} style={style} />;
}
