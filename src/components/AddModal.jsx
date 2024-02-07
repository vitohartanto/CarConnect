import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AddModal = ({ setSelectedComponent }) => {
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
        Lines: {
          enginerpm: "Engine RPM",
          shorttermfueltrim: "Short Term Fuel Trim",
          longtermfueltrim: "Long Term Fuel Trim",
        },
        Numerics: {
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
    // Pass the selected component type back to Dashboard
    setSelectedComponent(parameter);
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
