import { useContext } from "react";
import { AppContext } from "../App";

const FuelSystemStatus = ({ children }) => {
  const variablesInObject = useContext(AppContext);

  return (
    <div className=" my-4 mx-6  shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="text-center mt-3  text-base md:text-lg lg:text-xl font-semibold">
        Fuel System Status
      </h1>
      <h1 className="px-4 py-2 text-base md:text-lg lg:text-xl mb-2 text-center">
        {variablesInObject.v_fuelSystemStatus}
        {/* Closed loop, using oxygen sensor feedback to determine fuel mix */}
      </h1>
    </div>
  );
};

export default FuelSystemStatus;
