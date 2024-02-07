import Sidebar from "../components/Sidebar";
import ThrottlePosition from "../parameters/ThrottlePosition";
import EngineCoolantTemperature from "../parameters/EngineCoolantTemperature";
import EngineRPM from "../parameters/EngineRPM";
import FuelSystemStatus from "../parameters/FuelSystemStatus";
import VehicleSpeed from "../parameters/VehicleSpeed";
import ShortTermFuelTrim from "../parameters/ShortTermFuelTrim";
import LongTermFuelTrim from "../parameters/LongTermFuelTrim";
import IntakeAirTemperature from "../parameters/IntakeAirTemperature";
import OxygenSensorBank1Sensor1 from "../parameters/OxygenSensorBank1Sensor1";
import OxygenSensorBank2Sensor2 from "../parameters/OxygenSensorBank2Sensor2";
import MassAirFlow from "../parameters/MassAirFlow";
import CatalystTemperature from "../parameters/CatalystTemperature";
import FuelType from "../parameters/FuelType";
import EngineOilTemperature from "../parameters/EngineOilTemperature";
import IntakeManifoldPressure from "../parameters/IntakeManifoldPressure";
import AddModal from "../components/AddModal";

import { useState } from "react";

const Dashboard = () => {
  const [selectedComponents, setSelectedComponents] = useState([]);

  const addComponent = (component) => {
    setSelectedComponents([...selectedComponents, component]);
  };

  // const updateComponent = (index, component) => {
  //   let updatedComponents = [...selectedComponents];
  //   updatedComponents[index] = component;
  //   setSelectedComponents(updatedComponents);
  // };

  const renderSelectedComponents = () => {
    return selectedComponents.map((Component, index) => (
      <div key={index} className="mt-4">
        <Component />
      </div>
    ));
  };

  return (
    <div className="">
      <Sidebar>
        <AddModal addComponent={addComponent} />
      </Sidebar>
      <div className="ml-12">
        <h1 className="text-2xl font-bold ml-5 pt-8">Dashboard</h1>
        {renderSelectedComponents()}
        <ThrottlePosition />
        <EngineCoolantTemperature />
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
        <IntakeManifoldPressure />
      </div>
    </div>
  );
};

export default Dashboard;
