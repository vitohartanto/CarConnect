import GaugeComponent from "react-gauge-component";
import { useContext } from "react";
import { AppContext } from "../App";

const VehicleSpeed = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  const renameUnit = (value) => {
    return value.toFixed(0) + " km/h";
  };

  return (
    <div className=" my-4 mx-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="mt-3 text-base font-semibold text-center md:text-lg lg:text-xl">
        Vehicle Speed
      </h1>
      <GaugeComponent
        arc={{
          nbSubArcs: 150,
          colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
          width: 0.3,
          padding: 0.003,
        }}
        labels={{
          valueLabel: {
            fontSize: 40,
            formatTextValue: renameUnit,
          },
          tickLabels: {
            type: "outer",
            ticks: [
              { value: 10 },
              { value: 20 },
              { value: 30 },
              { value: 40 },
              { value: 50 },
              { value: 60 },
              { value: 70 },
              { value: 80 },
              { value: 90 },
              { value: 100 },
              { value: 110 },
            ],
            valueConfig: {
              formatTextValue: renameUnit,
            },
          },
        }}
        value={variablesInObject[carId]?.v_vehicleSpeed}
        maxValue={120}
      />
    </div>
  );
};

export default VehicleSpeed;
