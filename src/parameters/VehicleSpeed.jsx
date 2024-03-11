import GaugeComponent from "react-gauge-component";

const VehicleSpeed = ({ children }) => {
  const renameUnit = (value) => {
    return value.toFixed(0) + " km/h";
  };

  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="text-center mt-3  text-base md:text-lg lg:text-xl font-semibold">
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
        value={20}
        maxValue={120}
      />
    </div>
  );
};

export default VehicleSpeed;
