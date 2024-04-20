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
      <Sidebar>
        <AddModal addComponent={addComponent} />
      </Sidebar>
      <div className="ml-12">
        <h1 className="pt-8 ml-5 text-2xl font-bold md:text-3xl xl:text-4xl sm:ml-10">
          Dashboard
        </h1>
        <h1 className="pt-2 ml-5 text-lg font-medium md:text-xl xl:text-2xl sm:ml-10">
          Click the + button to add the dashboard card
        </h1>
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
