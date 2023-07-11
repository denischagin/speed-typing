import React, { FC } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PieDiagramProps {
  data: { name: string; value: number }[];
}

const PieDiagram: FC<PieDiagramProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart
        style={{ fontSize: "18px", fontFamily: "Roboto" }}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="40%"
          innerRadius="30%"
          outerRadius="70%"
          fill="#82ca9d"
          label
        >
          <Cell fill="#82ca9d" />
          <Cell fill="#8884d8" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieDiagram;
