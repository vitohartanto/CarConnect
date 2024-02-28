import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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

const AddModal = ({ addComponent }) => {
  const ParameterMap = {
    fuelsystemstatus: FuelSystemStatus,
    throttleposition: ThrottlePosition,
    enginecoolanttemperature: EngineCoolantTemperature,
    enginerpm: EngineRPM,
    vehiclespeed: VehicleSpeed,
    shorttermfueltrim: ShortTermFuelTrim,
    longtermfueltrim: LongTermFuelTrim,
    intakeairtemperature: IntakeAirTemperature,
    oxygensensorbank1sensor1: OxygenSensorBank1Sensor1,
    oxygensensorbank2sensor2: OxygenSensorBank2Sensor2,
    massairflow: MassAirFlow,
    catalysttemperature: CatalystTemperature,
    fueltype: FuelType,
    engineoiltemperature: EngineOilTemperature,
    intakemaniholdpressure: IntakeManifoldPressure,
  };
  const handleClick = async () => {
    const { value: parameter } = await Swal.fire({
      title: "Add Dashboard",
      background: "#F1F1FB",
      position: "bottom",
      icon: "info",
      confirmButtonColor: "#233163",
      confirmButtonText: "Add",
      color: "#233163",
      input: "select",
      cancelButtonColor: "#d33",
      inputOptions: {
        Strings: {
          fuelsystemstatus: "Fuel System Status",
          fueltype: "Fuel Type",
        },
        Gauges: {
          vehiclespeed: "Vehicle Speed",
          throttleposition: "Throttle Position",
          enginecoolanttemperature: "Engine Coolant Temperature",
          catalysttemperature: "Catalyst Temperature",
          engineoiltemperature: "Engine Oil Temperature",
        },

        Numerics: {
          enginerpm: "Engine RPM",
          shorttermfueltrim: "Short Term Fuel Trim",
          longtermfueltrim: "Long Term Fuel Trim",
          intakeairtemperature: "Intake Air Temperature",
          oxygensensorbank1sensor1: "Oxygen Sensor Bank 1 Sensor 1",
          oxygensensorbank2sensor2: "Oxygen Sensor Bank 2 Sensor 2",
          massairflow: "Mass Air Flow",
          intakemaniholdpressure: "Intake Manihold Pressure",
        },
      },
      inputPlaceholder: "Select a parameter",
      showCancelButton: true,
    });
    console.log(parameter);
    if (parameter) {
      addComponent(ParameterMap[parameter]);
    }
  };

  return (
    <div>
      <button className="text-white text-3xl mt-6" onClick={handleClick}>
        +
      </button>
    </div>
  );
};

export default AddModal;
