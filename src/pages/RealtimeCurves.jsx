import Sidebar from "../components/Sidebar";
import SelectParameter from "../components/SelectParameter";
import { useState, useEffect } from "react";
import { parameterOptions } from "../components/parameterOptions";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RealtimeCurves = () => {
  const [selectedParameter, setSelectedParameter] = useState(
    parameterOptions[0]
  );

  const [chartData, setChartData] = useState([
    { time: "00:00", score: 200 },
    { time: "01:00", score: 220 },
    { time: "02:00", score: 240 },
    { time: "03:00", score: 220 },
    { time: "04:00", score: 400 },
    { time: "05:00", score: 300 },
    // Add more data as needed...
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new random score
      const newScore = Math.floor(Math.random() * 100) + 200;
      const newChartData = [...chartData];
      newChartData.push({
        time: new Date().toLocaleTimeString(),
        score: newScore,
      });
      // Limit chart data to show only the last 10 data points
      if (newChartData.length > 10) {
        newChartData.shift();
      }
      setChartData(newChartData);
    }, 1000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [chartData]); // Run effect whenever chartData changes
  return (
    <div>
      <Sidebar />
      <div className="ml-12">
        <h1 className="text-2xl font-bold ml-5 pt-8 ">Real-time Curves</h1>
        <SelectParameter
          selectedParameter={selectedParameter}
          setSelectedParameter={setSelectedParameter}
        />
        <div className="ml-6 mt-4 text-xl font-semibold">
          <h1>{selectedParameter.score}</h1>
          <h1>{selectedParameter.unit}</h1>
        </div>
        <div className="mt-10 flex justify-center">
          <LineChart
            width={300}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="score" stroke="#233163" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default RealtimeCurves;
