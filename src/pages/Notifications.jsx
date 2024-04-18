import Sidebar from "../components/Sidebar";
import { FaWrench } from "react-icons/fa";

const Notifications = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-12">
        <h1 className="pt-8 ml-5 text-2xl font-bold md:text-3xl xl:text-4xl sm:ml-10">
          Notifications
        </h1>
        <h1 className="mt-6 ml-5 text-2xl font-bold md:text-3xl xl:text-4xl">
          Example:
        </h1>
        <div className="mx-4 mt-4">
          <div className="shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-4 py-4 rounded-2xl flex justify-center items-center">
            <FaWrench className="text-[#233163] text-3xl w-2/5 mr-2" />
            <div>
              <h2 className="text-sm font-medium">
                Engine Coolant Temperature is out of optimal range
              </h2>
              <p className="mt-2 text-xs">19 April 2024 08:35:21</p>
            </div>
          </div>
          <div className="shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-4 py-4 rounded-2xl flex justify-center items-center">
            <FaWrench className="text-[#233163] text-3xl w-2/5 mr-2" />
            <div>
              <h2 className="text-sm font-medium">
                Short Term Fuel Trim problem has been fixed
              </h2>
              <p className="mt-2 text-xs">17 April 2024 12:32:12</p>
            </div>
          </div>
          <div className="shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-4 py-4 rounded-2xl flex justify-center items-center">
            <FaWrench className="text-[#233163] text-3xl w-2/5 mr-2" />
            <div>
              <h2 className="text-sm font-medium">
                Short Term Fuel Trim is out of optimal range
              </h2>
              <p className="mt-2 text-xs">19 April 2024 08:35:21</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
