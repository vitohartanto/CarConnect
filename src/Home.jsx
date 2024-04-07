import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeSimpleHigh,
  faCircleInfo,
  faCode,
  faRightFromBracket,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { HyperbaseContext } from "./App";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { car_id } = useParams();
  const hyperbase = useContext(HyperbaseContext);

  const signOut = (e) => {
    e.stopPropagation();
    hyperbase.signOut();
  };

  const backToAvailableCars = () => {
    navigate("/app");
  };

  return (
    <div>
      <div className="w-12 fixed h-screen bg-[#233163] flex flex-col justify-between items-center py-8">
        <button onClick={backToAvailableCars}>
          <FontAwesomeIcon
            className="text-2xl"
            icon={faArrowLeft}
            style={{ color: "#FFF" }}
          />
        </button>
        <button onClick={signOut}>
          <FontAwesomeIcon
            className="text-2xl"
            icon={faRightFromBracket}
            style={{ color: "#FFF" }}
          />
        </button>
      </div>
      <div className="flex flex-col items-center h-screen text-2xl font-bold text-center lg:flex-row lg:px-20 lg:py-12 lg:ml-12 xl:text-3xl justify-evenly">
        <Link
          to={`/app/${car_id}/dashboard`}
          className="lg:h-full w-3/4 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl  bg-[#F1F1FB] hover:bg-[#d5d8de] flex flex-col justify-center py-6 ml-12 lg:mx-10"
        >
          <h1 className="pb-4 lg:text-3xl xl:text-4xl">Dashboard</h1>
          <FontAwesomeIcon
            className="text-5xl lg:text-6xl xl:text-7xl"
            icon={faGaugeSimpleHigh}
            style={{ color: "#233163" }}
          />
        </Link>

        <Link
          to={`/app/${car_id}/details`}
          className="lg:h-full w-3/4 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl  bg-[#F1F1FB] hover:bg-[#d5d8de] flex flex-col justify-center py-6 ml-12 lg:mx-10"
        >
          <h1 className="pb-4 lg:text-3xl xl:text-4xl">Details</h1>
          <FontAwesomeIcon
            className="text-5xl lg:text-6xl xl:text-7xl"
            icon={faCircleInfo}
            style={{ color: "#233163" }}
          />
        </Link>

        <Link
          to={`/app/${car_id}/diagnostics`}
          className="lg:h-full w-3/4 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl  bg-[#F1F1FB] hover:bg-[#d5d8de] flex flex-col justify-center py-6 ml-12 lg:mx-10"
        >
          <h1 className="pb-4 lg:text-3xl xl:text-4xl">Diagnostics</h1>
          <FontAwesomeIcon
            className="text-5xl lg:text-6xl xl:text-7xl"
            icon={faCode}
            style={{ color: "#233163" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
