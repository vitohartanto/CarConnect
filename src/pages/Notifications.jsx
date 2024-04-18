import Sidebar from "../components/Sidebar";
import { FaWrench, FaHeart } from "react-icons/fa";

const Notifications = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-12">
        <h1 className="pt-8 ml-5 text-2xl font-bold md:text-3xl xl:text-4xl sm:ml-10">
          Notifications
        </h1>
        <h1 className="mt-6 ml-5 text-2xl font-bold sm:ml-10 md:text-3xl xl:text-4xl">
          Example:
        </h1>
        <div className="mx-4 sm:mx-10 ">
          <div className="mt-4 lg:mt-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-4 py-4 md:py-6 rounded-2xl flex justify-start items-center">
            <FaWrench className="text-[#233163] text-3xl md:text-4xl lg:text-5xl w-16 mr-2 lg:mx-6" />
            <div>
              <h2 className="text-sm font-medium md:text-base lg:text-lg">
                Engine Coolant Temperature is out of optimal range
              </h2>
              <p className="mt-2 text-xs md:text-sm lg:text-base">
                19 April 2024 08:35:21
              </p>
            </div>
          </div>
          <div className="mt-4 lg:mt-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-4 py-4 md:py-6 rounded-2xl flex justify-start items-center">
            <FaHeart className="text-[#233163] text-3xl md:text-4xl lg:text-5xl w-16 mr-2 lg:mx-6" />
            <div>
              <h2 className="text-sm font-medium md:text-base lg:text-lg">
                Short Term Fuel Trim problem has been fixed
              </h2>
              <p className="mt-2 text-xs md:text-sm lg:text-base">
                17 April 2024 12:32:12
              </p>
            </div>
          </div>
          <div className="mt-4 lg:mt-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-4 py-4 md:py-6 rounded-2xl flex justify-start items-center">
            <FaWrench className="text-[#233163] text-3xl md:text-4xl lg:text-5xl w-16 mr-2 lg:mx-6" />
            <div>
              <h2 className="text-sm font-medium md:text-base lg:text-lg">
                Short Term Fuel Trim is out of optimal range
              </h2>
              <p className="mt-2 text-xs md:text-sm lg:text-base">
                17 April 2024 08:35:21
              </p>
            </div>
          </div>
        </div>
        <h1 className="mt-6 ml-5 text-2xl font-bold lg:mt-10 sm:ml-10 md:text-3xl xl:text-4xl">
          Real Notifications:
        </h1>
      </div>
    </div>
  );
};

export default Notifications;
