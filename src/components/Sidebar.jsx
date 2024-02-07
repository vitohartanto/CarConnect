import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ children }) => {
  return (
    <div className="w-12 fixed h-screen bg-[#233163] flex flex-col items-center">
      <div className="mt-8"></div>
      <Link to="/">
        <FontAwesomeIcon
          className=""
          icon={faHouse}
          style={{ color: "#ffffff" }}
        />
      </Link>
      {children}
    </div>
  );
};

export default Sidebar;
