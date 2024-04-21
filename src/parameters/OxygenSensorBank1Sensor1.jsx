import { useContext } from "react";
import { AppContext } from "../App";

const OxygenSensorBank1Sensor1 = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4  backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative w-64 md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="w-3/4 mt-3 text-base font-semibold text-center md:text-lg lg:text-xl">
          Oxygen Sensor Bank 1 Sensor 1
        </h1>
      </div>
      <h1 className="px-4 py-2 mb-2 text-base text-center md:text-lg lg:text-xl">
        {variablesInObject[carId]?.v_oxygenSensorBank1Sensor1} V
      </h1>
    </div>
  );
};

export default OxygenSensorBank1Sensor1;
