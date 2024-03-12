import { useContext } from "react";
import { AppContext } from "../App";

const LongTermFuelTrim = ({ children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative w-64 md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="text-center mt-3 w-3/4 text-base md:text-lg lg:text-xl font-semibold">
          Long Term Fuel Trim
        </h1>
      </div>

      <h1 className="px-4 py-2 mb-2 text-center text-base md:text-lg lg:text-xl">
        {variablesInObject.v_longTermFuelTrim} %
      </h1>
    </div>
  );
};

export default LongTermFuelTrim;
