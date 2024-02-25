import Sidebar from "../components/Sidebar";
import SelectParameter from "../components/SelectParameter";
import { parameterOptions } from "../components/parameterOptions";
import { useState } from "react";

import ApexChart from "../components/ApexChart";

const RealtimeCurves = () => {
  const [selectedParameter, setSelectedParameter] = useState(
    parameterOptions[0]
  );

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
          <h1 className="text-base md:text-lg xl:text-xl">
            {selectedParameter.score}
          </h1>
          <h1 className="text-base md:text-lg xl:text-xl">
            {selectedParameter.unit}
          </h1>
        </div>

        <ApexChart
          selectedParameter={selectedParameter}
          setSelectedParameter={setSelectedParameter}
        />
      </div>
    </div>
  );
};

export default RealtimeCurves;
