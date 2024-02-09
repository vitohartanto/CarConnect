import Select from "react-select";
import { parameterOptions } from "./parameterOptions";

const SelectParameter = ({ selectedParameter, setSelectedParameter }) => {
  // Function handleChange
  const handleChange = (selectedOption) => {
    setSelectedParameter(selectedOption);
    console.log(selectedOption);
  };
  return (
    <div className="text-[#233163]">
      <Select
        className="basic-single w-60 mt-2 ml-5 text-base font-medium text-[#233163] border-[#233163]"
        classNamePrefix="select"
        value={selectedParameter}
        options={parameterOptions}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectParameter;
