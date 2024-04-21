import { useContext } from "react";
import { AppContext } from "../App";

const EngineRPM = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext); // Destructuring variablesInObject from the context object

  return (
    <div className=" my-4 mx-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative w-[270px] h-48 md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-start">
      {children}
      <h1 className="absolute top-[40px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-center md:text-lg lg:text-xl">
        Engine RPM
      </h1>

      <h1 className="mt-[80px] pb-[20px] px-4 py-2 text-5xl font-semibold text-center md:text-lg lg:text-xl">
        {variablesInObject[carId]?.v_engineRpm}650 RPM
      </h1>
    </div>
  );
};

export default EngineRPM;
