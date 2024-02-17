const OxygenSensorBank2Sensor2 = ({ children }) => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="text-center mt-3 w-3/4 text-base md:text-lg lg:text-xl font-semibold">
          Oxygen Sensor Bank 2 Sensor 2
        </h1>
      </div>
      <h1 className="px-4 py-2 mb-2 text-center text-base md:text-lg lg:text-xl">
        0.4 V
      </h1>
    </div>
  );
};

export default OxygenSensorBank2Sensor2;
