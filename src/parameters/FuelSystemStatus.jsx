import { useContext } from "react";
import { AppContext } from "../App";

const FuelSystemStatus = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);

  return (
    <div className=" my-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="mt-3 text-base font-semibold text-center md:text-lg lg:text-xl">
        Fuel System Status
      </h1>
      <h1 className="px-4 py-2 mb-2 text-base text-center md:text-lg lg:text-xl">
        {variablesInObject[carId]?.v_fuelSystemStatus}
        {/* Closed loop, using oxygen sensor feedback to determine fuel mix */}
      </h1>
    </div>
  );
};

export default FuelSystemStatus;
