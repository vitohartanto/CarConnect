import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { HyperbaseContext } from "../App";
import { IoIosArrowRoundBack } from "react-icons/io";

const Sidebar = ({ children }) => {
  const hyperbase = useContext(HyperbaseContext);
  const { car_id } = useParams();

  const signOut = (e) => {
    e.stopPropagation();
    hyperbase.signOut();
  };

  return (
    <div className="w-12 sm:w-16 lg:w-20 fixed h-screen backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(25,25,25,0.90)] flex items-center justify-between flex-col py-10">
      <div className="mt-8">
        <Link to={`/app/`}>
          <IoIosArrowRoundBack className="text-2xl text-white md:text-3xl" />
        </Link>
        {children}
      </div>
      <button onClick={signOut}>
        <FontAwesomeIcon
          className="mb-8 text-2xl"
          icon={faRightFromBracket}
          style={{ color: "#FFF" }}
        />
      </button>
    </div>
  );
};

export default Sidebar;
