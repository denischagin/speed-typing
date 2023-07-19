import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BarItem {
  name: string;
  dataKey: string;
  fill: string;
}

interface BarDiagramProps {
  data: any[];
  barList: BarItem[];
  width?: number;
  height?: number;
}

const BarDiagram: FC<BarDiagramProps> = ({
  data,
  barList,
  width = 730,
  height = 250,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={width}
        height={height}
        data={data}
        style={{ fontSize: "17px", fontFamily: "Roboto" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {barList.map(({ dataKey, fill, name }) => (
          <Bar key={dataKey} name={name} dataKey={dataKey} fill={fill} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarDiagram;
