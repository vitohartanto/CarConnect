import GaugeComponent from "react-gauge-component";
import { useContext } from "react";
import { AppContext } from "../App";

const CatalystTemperature = ({ children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="text-center mt-3 w-4/5 text-base md:text-lg lg:text-xl font-semibold">
          Catalyst Temperature
        </h1>
      </div>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 200,
              color: "#EA4228",
              showTick: true,
              tooltip: {
                text: "Low temperature!",
              },
            },
            {
              limit: 400,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              limit: 600,
              color: "#5BE12C",
              showTick: true,
              tooltip: {
                text: "Optimal temperature!",
              },
            },
            {
              limit: 800,
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
        value={variablesInObject.v_catalystTemperature}
        minValue={0}
        maxValue={1000}
      />
    </div>
  );
};

export default CatalystTemperature;
