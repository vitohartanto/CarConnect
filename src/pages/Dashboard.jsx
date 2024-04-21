import Sidebar from "../components/Sidebar";
import AddModal from "../components/AddModal";
import UpdateModal from "../components/UpdateModal";
import RemoveModal from "../components/RemoveModal";
import { useParams } from "react-router-dom";
import carBackground from "../pageDashboard.png";

import { useState, useEffect } from "react";

const Dashboard = () => {
  // const storedStates = JSON.parse(localStorage.getItem("selectedComponents"));
  const { car_id } = useParams();
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    console.log(selectedComponents);
    // localStorage.setItem(
    //   "selectedComponents",
    //   JSON.stringify(selectedComponents)
    // );
  }, [selectedComponents]);

  // Function generateId
  const generateId = () => {
    return +new Date();
  };

  // Function generateComponentObject
  const generateComponentObject = (id, component) => {
    return {
      id,
      component,
    };
  };

  // Function addComponent
  const addComponent = (component) => {
    const generatedID = generateId();
    const componentObject = generateComponentObject(generatedID, component);
    setSelectedComponents([...selectedComponents, componentObject]);
  };

  return (
    <div className="">
      <img
        src={carBackground}
        alt=""
        className="fixed w-screen h-screen z-[-100]"
      />
      <Sidebar />
      <div className="ml-12 pt-8 pr-8 lg:ml-[72px]">
        <div className="flex items-center justify-between flex-wrap">
          <h1 className="py-2 mb-4 w-48 xl:w-64 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Dashboard
          </h1>
          <h1 className="py-2 mb-4 w-[360px] xl:w-[420px] text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-medium xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Car - AB 1911 TE - Mazda
          </h1>
        </div>
        <div className="flex items-center justify-between mt-4 py-4 min-w-60 min-[600px]:w-[480px] xl:w-[520px] text-left px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
          <h1 className="text-lg font-medium xl:text-xl w-11/12">
            Choose which OBD2 parameters to display
          </h1>
          <AddModal className="ml-4" addComponent={addComponent} />
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center md:flex-row">
          {selectedComponents.map((data) => (
            <div
              key={data.id}
              className="flex justify-center w-11/12 mt-4 md:w-5/12 lg:w-1/3"
            >
              <data.component id={data.id} carId={car_id}>
                <UpdateModal
                  setSelectedComponents={setSelectedComponents}
                  componentObject={data}
                  generateId={generateId}
                />
                <RemoveModal
                  setSelectedComponents={setSelectedComponents}
                  componentObject={data}
                  selectedComponents={selectedComponents}
                />
              </data.component>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
