import { Activity, ArrowLeft, ArrowRight, ChartColumnIncreasing, LucideIndentIncrease } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const MyTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const scoreItem = payload.find(
    (item) => item.dataKey === "score"
  );

  return (
    <div className="bg-[#1f1235] px-3 py-2 rounded-lg border border-white/10 shadow-lg">
      <p className="text-sm text-purple-300">Accuracy</p>
      <p className="text-lg font-bold text-white">
        {scoreItem?.value}%
      </p>
    </div>
  );
};
const PerformanceGraph = ({ data = [] }) => {
  return (
    <div className=" glass p-5 rounded-2xl border border-white/10 w-full h-full focus:outline-none focus-visible:outline-none">
      <h3 className="text-white font-semibold mb-3 flex  gap-3 items-center">
        <ChartColumnIncreasing className="w-5 h-5 text-purple-400" /> Performance Trend
      </h3>

      <div className=" h-[calc(100%-30px)]">
        <ResponsiveContainer width="100%" height="100%" >
        <LineChart data={data} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10"  vertical={true}
  horizontal={true}  />
          <XAxis
           dataKey="xIndex"     
      tickLine={false}
      axisLine={{ stroke: "#9ca3af",strokeWidth: 1 }}
     padding={{right:20,left:0}}
     
    tickFormatter={(value) => value} // keep uniqueness
  tick={{ fontSize: 0 }} 
    />
          <YAxis stroke="#9ca3af" domain={[0, 100]}   />
          <Tooltip  shared={false} content={MyTooltip}/>
          <Line
            type="monotone"
            dataKey="score"
            stroke="#a855f7"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
       
      </ResponsiveContainer>
      </div>
      <p className="relative flex items-center justify-center bottom-4 tracking-widest">Last 10 Question <ArrowRight className="w-15 h-4 scale-x-400"/></p>
    </div>
  );
};

export default PerformanceGraph;