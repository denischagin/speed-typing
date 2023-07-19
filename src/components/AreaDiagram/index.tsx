import React, { FC, SVGProps } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const GradientComponentDefault = (
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
    </linearGradient>
  </defs>
);

export interface AreaItem {
  dataKey: string;
  name: string;
  stroke: string;
  fill: string;
  strokeWidth?: number;
  fillOpacity?: number;
}

interface AreaDiagramProps {
  data: any[];
  areaList: AreaItem[];
  DefsComponent?: JSX.Element;
}

const AreaDiagram: FC<AreaDiagramProps> = ({
  data,
  areaList,
  DefsComponent: GradientComponent = GradientComponentDefault,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={1000}
        height={250}
        data={data}
        style={{ fontSize: "18px", fontFamily: "Roboto" }}
        margin={{ top: 40, right: 30, left: 0, bottom: 40 }}
      >
        {GradientComponent}
        <XAxis dataKey="index" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {areaList.map(
          ({
            dataKey,
            fill,
            name,
            stroke,
            fillOpacity = 1,
            strokeWidth = 2,
          }) => (
            <Area
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              name={name}
              stroke={stroke}
              strokeWidth={strokeWidth}
              fillOpacity={fillOpacity}
              fill={fill}
            />
          )
        )}
        <Area
          type="monotone"
          dataKey="printSpeedLetterPerMinute"
          name="скорость печати - символы в минуту"
          stroke="#8884d8"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="printSpeedWordsPerMinute"
          name="скорость печати - слова в минуту"
          stroke="#82ca9d"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaDiagram;
