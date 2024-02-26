import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeSimpleHigh,
  faWrench,
  faCircleInfo,
  faChartLine,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div>
      <div className="w-12 fixed h-screen bg-[#233163]"></div>
      <div className="flex flex-col text-center text-2xl xl:text-3xl font-bold h-screen justify-evenly items-center">
        <Link
          to="/dashboard"
          className="w-3/4 border-4 rounded-2xl border-[#233163] flex flex-col py-6 ml-12"
        >
          <h1 className="pb-4">Dashboard</h1>
          <FontAwesomeIcon
            className="text-5xl"
            icon={faGaugeSimpleHigh}
            style={{ color: "#233163" }}
          />
        </Link>

        <Link
          to="/details"
          className="w-3/4 border-4 rounded-2xl border-[#233163] flex flex-col py-6 ml-12"
        >
          <h1 className="pb-4">Details</h1>
          <FontAwesomeIcon
            className="text-5xl"
            icon={faCircleInfo}
            style={{ color: "#233163" }}
          />
        </Link>

        <Link
          to="/diagnostics"
          className="w-3/4 border-4 rounded-2xl border-[#233163] flex flex-col py-6 ml-12"
        >
          <h1 className="pb-4">Diagnostics</h1>
          <FontAwesomeIcon
            className="text-5xl"
            icon={faCode}
            style={{ color: "#233163" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
