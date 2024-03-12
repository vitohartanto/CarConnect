import Sidebar from "../components/Sidebar";
import AddModal from "../components/AddModal";
import UpdateModal from "../components/UpdateModal";
import RemoveModal from "../components/RemoveModal";
// import React from "react";

import { useState, useEffect } from "react";

const Dashboard = () => {
  // const storedStates = JSON.parse(localStorage.getItem("selectedComponents"));

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
      <Sidebar>
        <AddModal addComponent={addComponent} />
      </Sidebar>
      <div className="ml-12">
        <h1 className="text-2xl md:text-3xl font-bold ml-5 sm:ml-10 pt-8">
          Dashboard
        </h1>
        <h1 className="text-lg md:text-xl font-medium ml-5 sm:ml-10 pt-2">
          Click the + button to add the dashboard card
        </h1>
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center">
          {selectedComponents.map((data) => (
            <div
              key={data.id}
              className="mt-4 flex justify-center w-11/12 md:w-5/12 lg:w-1/3"
            >
              <data.component id={data.id}>
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
              {/* {data.component ? (
                
              ) : (
                ""
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
