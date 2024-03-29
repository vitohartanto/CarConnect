import { useContext } from "react";
import { AppContext } from "../App";

const EngineRPM = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext); // Destructuring variablesInObject from the context object

  return (
    <div className=" my-4 mx-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl relative w-64 md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="text-center mt-3 text-base md:text-lg lg:text-xl font-semibold">
        Engine RPM
      </h1>

      <h1 className="px-4 py-2 mb-2 text-center text-base md:text-lg lg:text-xl">
        {variablesInObject[carId]?.v_engineRpm} RPM
      </h1>
    </div>
  );
};

export default EngineRPM;
