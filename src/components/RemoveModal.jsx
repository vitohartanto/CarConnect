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
      confirmButtonColor: "#233163",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#233163",
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
          style={{ color: "#233163" }}
        />
      </button>
    </div>
  );
};

export default RemoveModal;
