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
  const [selectedComponent, setSelectedComponent] = useState(null);
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "fuelsystemstatus":
        return <FuelSystemStatus />;
      case "throttleposition":
        return <ThrottlePosition />;
      case "enginecoolanttemperature":
        return <EngineCoolantTemperature />;
      case "enginerpm":
        return <EngineRPM />;
      case "vehiclespeed":
        return <VehicleSpeed />;
      case "shorttermfueltrim":
        return <ShortTermFuelTrim />;
      case "longtermfueltrim":
        return <LongTermFuelTrim />;
      case "intakeairtemperature":
        return <IntakeAirTemperature />;
      case "oxygensensorbank1sensor1":
        return <OxygenSensorBank1Sensor1 />;
      case "oxygensensorbank2sensor2":
        return <OxygenSensorBank2Sensor2 />;
      case "massairflow":
        return <MassAirFlow />;
      case "catalysttemperature":
        return <CatalystTemperature />;
      case "fueltype":
        return <FuelType />;
      case "engineoiltemperature":
        return <EngineOilTemperature />;
      case "intakemaniholdpressure":
        return <IntakeManifoldPressure />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <Sidebar>
        <AddModal setSelectedComponent={setSelectedComponent} />
      </Sidebar>
      <div className="ml-12">
        <h1 className="text-2xl font-bold ml-5 pt-8">Dashboard</h1>
        {renderSelectedComponent()}
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
