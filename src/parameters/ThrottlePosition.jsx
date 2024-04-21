import GaugeComponent from "react-gauge-component";
import { useContext } from "react";
import { AppContext } from "../App";

const ThrottlePosition = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 mx-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="mt-3 text-base font-semibold text-center md:text-lg lg:text-xl">
        Throttle Position
      </h1>
      <GaugeComponent
        className=""
        arc={{
          subArcs: [
            {
              limit: 10,
              color: "#5BE12C",
              showTick: true,
            },
            {
              limit: 20,
              color: "#5BE12C",
              showTick: true,
            },
            {
              limit: 30,
              color: "#fcf403",
              showTick: true,
            },
            {
              limit: 40,
              color: "#fcf403",
              showTick: true,
            },
            {
              limit: 50,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 70,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 80,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 90,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 100,
              color: "#EA4228",
              showTick: true,
            },
          ],
        }}
        value={variablesInObject[carId]?.v_throttlePosition}
      />
    </div>
  );
};

export default ThrottlePosition;
