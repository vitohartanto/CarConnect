import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import ThrottlePosition from "../parameters/ThrottlePosition";
import EngineCoolantTemperature from "../parameters/EngineCoolantTemperature";
import EngineRPM from "../parameters/EngineRPM";
import FuelSystemStatus from "../parameters/FuelSystemStatus";
import VehicleSpeed from "../parameters/VehicleSpeed";
import ShortTermFuelTrim from "../parameters/ShortTermFuelTrim";
import LongTermFuelTrim from "../parameters/LongTermFuelTrim";
import IntakeAirTemperature from "../parameters/IntakeAirTemperature";
import OxygenSensorBank1Sensor2 from "../parameters/OxygenSensorBank1Sensor2";
import MassAirFlow from "../parameters/MassAirFlow";
import CatalystTemperature from "../parameters/CatalystTemperature";
import IntakeManifoldPressure from "../parameters/IntakeManifoldPressure";

const UpdateModal = ({
  setSelectedComponents,
  componentObject,
  generateId,
}) => {
  const ParameterMap = {
    fuelsystemstatus: FuelSystemStatus,
    throttleposition: ThrottlePosition,
    enginecoolanttemperature: EngineCoolantTemperature,
    enginerpm: EngineRPM,
    vehiclespeed: VehicleSpeed,
    shorttermfueltrim: ShortTermFuelTrim,
    longtermfueltrim: LongTermFuelTrim,
    intakeairtemperature: IntakeAirTemperature,
    oxygensensorbank1sensor2: OxygenSensorBank1Sensor2,
    massairflow: MassAirFlow,
    catalysttemperature: CatalystTemperature,
    intakemaniholdpressure: IntakeManifoldPressure,
  };

  // Function updateComponentById
  const updateComponentById = (componentId, newComponent, generateId) => {
    setSelectedComponents((prev) => {
      return prev.map((item) => {
        if (item.id === componentId) {
          return { id: generateId(), component: newComponent };
        }
        return item;
      });
    });
  };

  const handleClick = async () => {
    const { value: parameter } = await Swal.fire({
      title: "Update Dashboard",
      position: "bottom",
      icon: "info",
      confirmButtonText: "Update",
      denyButtonText: "Remove",
      color: "#191919",
      background: "rgba(255,255,255,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#16db3d",
      input: "select",

      inputOptions: {
        Strings: {
          fuelsystemstatus: "Fuel System Status",
        },
        Gauges: {
          vehiclespeed: "Vehicle Speed",
          enginecoolanttemperature: "Engine Coolant Temperature",
          throttleposition: "Throttle Position",
          catalysttemperature: "Catalyst Temperature",
        },

        Numerics: {
          enginerpm: "Engine RPM",
          intakeairtemperature: "Intake Air Temperature",
          intakemaniholdpressure: "Intake Manihold Pressure",
          shorttermfueltrim: "Short Term Fuel Trim",
          longtermfueltrim: "Long Term Fuel Trim",
          oxygensensorbank1sensor2: "Oxygen Sensor Bank 1 Sensor 2 Voltage",
          massairflow: "Mass Air Flow",
        },
      },
      inputPlaceholder: "Select a parameter",

      showCancelButton: true,
    });

    console.log(parameter);
    console.log(componentObject.id);
    if (parameter !== undefined) {
      updateComponentById(
        componentObject.id,
        ParameterMap[parameter],
        generateId
      );
    }
  };

  return (
    <>
      <button className="absolute top-3.5 left-3.5" onClick={handleClick}>
        <FontAwesomeIcon
          className="text-lg"
          icon={faPenToSquare}
          style={{ color: "#FFF" }}
        />
      </button>
    </>
  );
};

export default UpdateModal;
