import GaugeComponent from "react-gauge-component";
import { useContext } from "react";
import { AppContext } from "../App";

const EngineCoolantTemperature = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 mx-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="w-4/5 mt-3 text-base font-semibold text-center md:text-lg lg:text-xl">
          Engine Coolant Temperature
        </h1>
      </div>
      <GaugeComponent
        className=""
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 50,
              color: "#EA4228",
              showTick: true,
              tooltip: {
                text: "Too low temperature!",
              },
            },
            {
              limit: 80,
              color: "#EA4228",
              showTick: true,
              tooltip: {
                text: "Low temperature!",
              },
            },
            {
              limit: 90,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              limit: 104,
              color: "#5BE12C",
              showTick: true,
              tooltip: {
                text: "Optimal temperature!",
              },
            },
            {
              limit: 114,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              color: "#EA4228",
              tooltip: {
                text: "High temperature!",
              },
            },
          ],
        }}
        pointer={{
          color: "#345243",
          length: 0.8,
          width: 15,
          // elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: (value) => value + "ºC" },
          tickLabels: {
            type: "outer",
            valueConfig: {
              formatTextValue: (value) => value + "ºC",
              fontSize: 10,
            },
          },
        }}
        value={variablesInObject[carId]?.v_engineCoolantTemperature}
        minValue={50}
        maxValue={150}
      />
    </div>
  );
};

export default EngineCoolantTemperature;
