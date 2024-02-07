import UpdateRemoveModal from "../components/UpdateRemoveModal";

const MassAirFlow = () => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative">
      <UpdateRemoveModal />
      <h1 className="text-center mt-3  text-base font-semibold">
        Mass Air Flow
      </h1>
      <h1 className="px-4 py-2 mb-2 text-center">0.24 g/s</h1>
    </div>
  );
};

export default MassAirFlow;
