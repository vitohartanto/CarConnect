import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveModal = ({
  componentObject,
  setSelectedComponents,
  selectedComponents,
}) => {
  // Function removeComponentById
  const removeComponentById = (componentId, array) => {
    let updatedComponents = array.filter((item) => item.id !== componentId);
    setSelectedComponents(updatedComponents);
  };

  const handleClick = async () => {
    const { value: removed } = await Swal.fire({
      title: "Delete this?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#FFF",
      background: "rgba(25,25,25,0.95)",
      backdrop: `rgba(7,193,250,0.1)`,
      confirmButtonColor: "#16db3d",
    });
    console.log(removed);
    console.log(componentObject.id);
    if (removed == true) {
      removeComponentById(componentObject.id, selectedComponents);
    }
  };

  return (
    <div>
      <button className="absolute top-3.5 right-3.5" onClick={handleClick}>
        <FontAwesomeIcon
          className="text-lg"
          icon={faTrash}
          style={{ color: "#FFF" }}
        />
      </button>
    </div>
  );
};

export default RemoveModal;
