import UpdateRemoveModal from "../components/UpdateRemoveModal";

const IntakeAirTemperature = () => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative">
      <UpdateRemoveModal />
      <h1 className="text-center mt-3  text-base font-semibold">
        Intake Air Temperature
      </h1>
      <h1 className="px-4 py-2 mb-2 text-center">12.92 °C</h1>
    </div>
  );
};

export default IntakeAirTemperature;
