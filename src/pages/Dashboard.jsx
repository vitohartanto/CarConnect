import Sidebar from "../components/Sidebar";
// import ThrottlePosition from "../parameters/ThrottlePosition";
// import EngineCoolantTemperature from "../parameters/EngineCoolantTemperature";
// import EngineRPM from "../parameters/EngineRPM";
// import FuelSystemStatus from "../parameters/FuelSystemStatus";
// import VehicleSpeed from "../parameters/VehicleSpeed";
// import ShortTermFuelTrim from "../parameters/ShortTermFuelTrim";
// import LongTermFuelTrim from "../parameters/LongTermFuelTrim";
// import IntakeAirTemperature from "../parameters/IntakeAirTemperature";
// import OxygenSensorBank1Sensor1 from "../parameters/OxygenSensorBank1Sensor1";
// import OxygenSensorBank2Sensor2 from "../parameters/OxygenSensorBank2Sensor2";
// import MassAirFlow from "../parameters/MassAirFlow";
// import CatalystTemperature from "../parameters/CatalystTemperature";
// import FuelType from "../parameters/FuelType";
// import EngineOilTemperature from "../parameters/EngineOilTemperature";
// import IntakeManifoldPressure from "../parameters/IntakeManifoldPressure";

import AddModal from "../components/AddModal";
import UpdateModal from "../components/UpdateModal";
import RemoveModal from "../components/RemoveModal";

import { useState, useEffect } from "react";

const Dashboard = () => {
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    console.log(selectedComponents);
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
        <h1 className="text-2xl font-bold ml-5 pt-8">Dashboard</h1>
        <h1 className="text-lg font-medium ml-5 pt-2">
          Click the + button to add the dashboard card
        </h1>
        {selectedComponents.map((data) => (
          <div key={data.id} className="mt-4">
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
          </div>
        ))}
        {/* <ThrottlePosition /> */}
        {/* <EngineCoolantTemperature />
        <EngineRPM />
        <FuelSystemStatus />
        <VehicleSpeed />
        <ShortTermFuelTrim />
        <LongTermFuelTrim />
        <IntakeAirTemperature />
        <OxygenSensorBank1Sensor1 />
        <OxygenSensorBank2Sensor2 />
        <MassAirFlow />
        <CatalystTemperature />
        <FuelType />
        <EngineOilTemperature />
        <IntakeManifoldPressure /> */}
      </div>
    </div>
  );
};

export default Dashboard;
