import GaugeComponent from "react-gauge-component";
import UpdateRemoveModal from "../components/UpdateRemoveModal";

const ThrottlePosition = ({ selectedComponents }) => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative">
      <UpdateRemoveModal selectedComponent={selectedComponents} />
      <h1 className="text-center mt-3  text-base font-semibold">
        Throttle Position
      </h1>
      <GaugeComponent
        className=""
        arc={{
          subArcs: [
            {
              limit: 20,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 40,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 100,
              color: "#5BE12C",
              showTick: true,
            },
          ],
        }}
        value={70}
      />
    </div>
  );
};

export default ThrottlePosition;
