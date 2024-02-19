import Sidebar from "../components/Sidebar";
import SelectParameter from "../components/SelectParameter";
import { parameterOptions } from "../components/parameterOptions";
import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const RealtimeCurves = () => {
  const [selectedParameter, setSelectedParameter] = useState(
    parameterOptions[0]
  );

  const [arr, setArr] = useState(Array.from({ length: 60 }, () => ({ X: 0 })));
  const timeoutRef = useRef(null);

  function validate() {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    setArr((prevState) => [...prevState, { X: randomNumber }].slice(1));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      validate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (timeoutRef.current !== null) {
  //     clearTimeout(timeoutRef.current);
  //   }
  //   let interval = 6000;
  //   let speed = 3000;
  //   for (let i = 0; i < interval; i++) {
  //     timeoutRef.current = setTimeout(() => {
  //       timeoutRef.current = null;
  //       validate();
  //     }, i * speed);
  //   }
  // }, []);

  return (
    <div>
      <Sidebar />
      <div className="ml-12">
        <h1 className="text-2xl md:text-3xl font-bold ml-5 pt-8 ">
          Real-time Curves
        </h1>
        <SelectParameter
          selectedParameter={selectedParameter}
          setSelectedParameter={setSelectedParameter}
        />
        <div className="ml-6 mt-4 text-xl font-semibold">
          <h1>{selectedParameter.score}</h1>
          <h1>{selectedParameter.unit}</h1>
        </div>
        {/* <div className="mt-10 flex justify-center">
          <LineChart
            width={340}
            height={250}
            data={arr}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            animationDuration={0} // Disable animation
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={{ value: "Time", position: "insideBottom", offset: -10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="X" stroke="#8884d8" />
          </LineChart>
        </div> */}

        <h1>test</h1>
      </div>
    </div>
  );
};

export default RealtimeCurves;
