const IntakeManifoldPressure = ({ children }) => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative">
      {children}
      <div className="flex justify-center">
        <h1 className="text-center mt-3 w-3/4 text-base md:text-lg lg:text-xl font-semibold">
          Intake Manifold Pressure
        </h1>
      </div>
      <h1 className="px-4 py-2 mb-2 text-center text-base md:text-lg lg:text-xl">
        2.22 kPa
      </h1>
    </div>
  );
};

export default IntakeManifoldPressure;
