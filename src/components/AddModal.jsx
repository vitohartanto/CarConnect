import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import ThrottlePosition from '../parameters/ThrottlePosition';
import EngineCoolantTemperature from '../parameters/EngineCoolantTemperature';
import EngineRPM from '../parameters/EngineRPM';
import FuelSystemStatus from '../parameters/FuelSystemStatus';
import VehicleSpeed from '../parameters/VehicleSpeed';
import ShortTermFuelTrim from '../parameters/ShortTermFuelTrim';
import LongTermFuelTrim from '../parameters/LongTermFuelTrim';
import IntakeAirTemperature from '../parameters/IntakeAirTemperature';
import OxygenSensorBank1Sensor2 from '../parameters/OxygenSensorBank1Sensor2';
import MassAirFlow from '../parameters/MassAirFlow';
import CatalystTemperature from '../parameters/CatalystTemperature';
import IntakeManifoldPressure from '../parameters/IntakeManifoldPressure';
import PropTypes from 'prop-types';

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
    oxygensensorbank1sensor2: OxygenSensorBank1Sensor2,
    massairflow: MassAirFlow,
    catalysttemperature: CatalystTemperature,
    intakemaniholdpressure: IntakeManifoldPressure,
  };
  const handleClick = async () => {
    const { value: parameter } = await Swal.fire({
      title: 'Add Dashboard',

      position: 'bottom',
      icon: 'info',

      confirmButtonText: 'Add',
      color: '#191919',
      background: 'rgba(255,255,255,0.90)',
      backdrop: `rgba(7,193,250,0.1)`,

      cancelButtonColor: '#d33',
      confirmButtonColor: '#16db3d',
      input: 'select',

      inputOptions: {
        Strings: {
          fuelsystemstatus: 'Fuel System Status',
        },
        Gauges: {
          vehiclespeed: 'Vehicle Speed',
          enginecoolanttemperature: 'Engine Coolant Temperature',
          throttleposition: 'Throttle Position',
          catalysttemperature: 'Catalyst Temperature',
        },

        Numerics: {
          enginerpm: 'Engine RPM',
          intakeairtemperature: 'Intake Air Temperature',
          intakemaniholdpressure: 'Intake Manihold Pressure',
          shorttermfueltrim: 'Short Term Fuel Trim',
          longtermfueltrim: 'Long Term Fuel Trim',
          oxygensensorbank1sensor2: 'Oxygen Sensor Bank 1 Sensor 2 Voltage',
          massairflow: 'Mass Air Flow',
        },
      },
      inputPlaceholder: 'Select a parameter',
      showCancelButton: true,
    });
    console.log(parameter);
    if (parameter) {
      addComponent(ParameterMap[parameter]);
    }
  };

  return (
    <>
      <button
        className="basis-8 sm:basis-10 relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]"
        onClick={handleClick}
      >
        <p className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          +
        </p>
      </button>
    </>
  );
};

AddModal.propTypes = {
  addComponent: PropTypes.func,
};

export default AddModal;
