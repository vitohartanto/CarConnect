import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const descEngineRPMHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Engine RPM</strong>",
    icon: "info",
    html: `
      <h2>
      <b>Engine RPM</b> stands for
      &quot;Revolutions Per Minute&quot; and refers to how many times
      the engine&apos;s crankshaft rotates in one minute.
    </h2>
    <br />
    <h2 className="mt-2">
      <b>Optimal Value</b> : 600 – 900 RPM
      at idle if the engine is heated up. If the idle is higher than
      1000, it indicates a problem, the engine being cold or temporary
      RPM increase.
    </h2>
      `,
    focusConfirm: false,
    confirmButtonText: `
       Okay
      `,
  });
};

const descVehicleSpeedHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Vehicle Speed</strong>",
    icon: "info",
    html: `
    <h2>
    <b>Vehicle Speed</b> indicates how
    quickly the vehicle is traveling along the road. The unit is in
    kilometers per hour.
  </h2>
  <br />
  <h2 className="mt-2">
    <b>Optimal Value</b> : Varies by
    vehicle speed.
  </h2>
        `,
    focusConfirm: false,
    confirmButtonText: `
         Okay
        `,
  });
};

const descEngineCoolantTemperatureHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Engine Coolant Temperature</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};

const descThrottlePositionHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Throttle Position</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descIntakeAirTemperatureHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Intake Air Temperature</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descIntakeManifoldPressureHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Intake Manifold Pressure</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descFuelSystemStatusHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Fuel System Status</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descShortTermFuelTrimHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Short Term Fuel Trim</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descLongTermFuelTrimHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Long Term Fuel Trim</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descOxygenSensorBank1Sensor2Handler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Oxygen Sensor Bank 1 Sensor 2 Voltage</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descCatalystTemperatureHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Catalyst Temperature</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};
const descMassAirFlowHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Mass Air Flow</strong>",
    icon: "info",
    html: `
          <h2>
          <b>Engine RPM</b> stands for
          &quot;Revolutions Per Minute&quot; and refers to how many times
          the engine&apos;s crankshaft rotates in one minute.
        </h2>
        <br />
        <h2 className="mt-2">
          <b>Optimal Value</b> : 600 – 900 RPM
          at idle if the engine is heated up. If the idle is higher than
          1000, it indicates a problem, the engine being cold or temporary
          RPM increase.
        </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};

export {
  descEngineRPMHandler,
  descVehicleSpeedHandler,
  descEngineCoolantTemperatureHandler,
  descThrottlePositionHandler,
  descCatalystTemperatureHandler,
  descFuelSystemStatusHandler,
  descIntakeAirTemperatureHandler,
  descIntakeManifoldPressureHandler,
  descLongTermFuelTrimHandler,
  descMassAirFlowHandler,
  descOxygenSensorBank1Sensor2Handler,
  descShortTermFuelTrimHandler,
};
