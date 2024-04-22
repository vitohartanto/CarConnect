import Sidebar from "../components/Sidebar";
import { FaWrench, FaHeart } from "react-icons/fa";
import carBackground from "../pageNotifications.png";
import { Fade } from "react-awesome-reveal";

const Notifications = () => {
  return (
    <div>
      <img
        src={carBackground}
        alt=""
        className="fixed w-screen h-screen z-[-100]"
      />
      <Sidebar />
      <div className="ml-12 pt-8 pr-8 lg:ml-[72px]">
        <Fade
          delay={1e1}
          duration={2000}
          direction={"down"}
          triggerOnce={true}
          damping={1e-1}
        >
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-2 mb-4 w-64 xl:w-72 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Notifications
            </h1>
            <h1 className="py-2 mb-4 w-[280px] xl:w-[420px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Car - AB 1911 TE - Mazda
            </h1>
          </div>
        </Fade>
        <h1 className="mt-6 ml-5 text-2xl font-bold sm:ml-10 md:text-3xl xl:text-4xl">
          Example:
        </h1>
        <div className="mx-4 sm:mx-10 ">
          <div className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6 flex justify-start items-center">
            <FaWrench className="text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-2 lg:mx-6" />
            <div>
              <h2 className="text-sm font-medium md:text-base lg:text-lg">
                Engine Coolant Temperature is out of optimal range
              </h2>
              <p className="mt-2 text-xs md:text-sm lg:text-base">
                19 April 2024 08:35:21
              </p>
            </div>
          </div>
          <div className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6  flex justify-start items-center">
            <FaHeart className="text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-2 lg:mx-6" />
            <div>
              <h2 className="text-sm font-medium md:text-base lg:text-lg">
                Short Term Fuel Trim problem has been fixed
              </h2>
              <p className="mt-2 text-xs md:text-sm lg:text-base">
                17 April 2024 12:32:12
              </p>
            </div>
          </div>
          <div className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6 flex justify-start items-center">
            <FaWrench className="text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-2 lg:mx-6" />
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
