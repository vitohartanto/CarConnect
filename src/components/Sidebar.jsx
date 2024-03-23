import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { HyperbaseContext } from "../App";

const Sidebar = ({ children }) => {
  const hyperbase = useContext(HyperbaseContext);

  const signOut = (e) => {
    e.stopPropagation();
    hyperbase.signOut();
  };

  return (
    <div className="w-12 fixed h-screen bg-[#233163] flex flex-col items-center justify-between">
      {/* <div className="mt-8"></div> */}
      <div className="mt-8">
        <Link to="/">
          <FontAwesomeIcon
            className="md:text-xl"
            icon={faHouse}
            style={{ color: "#ffffff" }}
          />
        </Link>
        {children}
      </div>
      <button onClick={signOut}>
        <FontAwesomeIcon
          className="text-2xl mb-8"
          icon={faRightFromBracket}
          style={{ color: "#FFF" }}
        />
      </button>
    </div>
  );
};

export default Sidebar;
