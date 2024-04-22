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
    <b>Engine coolant temperature</b> 
    refers to the temperature of the coolant fluid that circulates
    through the engine&apos;s cooling system to regulate its
    temperature.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Between
    90°C - 104°C.
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
    <b>Throttle Position</b> refers to
    how much the throttle valve in the engine&apos;s intake system is
    open. Simply, the position of the throttle in percentage.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Between
    0-100%, with 0% indicating that the throttle valve is fully closed
    and 100% indicating that the throttle valve is fully open.
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
    <b>
      Intake Air Temperature (IAT)
    </b>
    refers to the temperature of the air as it enters the
    engine&apos;s intake system.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Varies by
    engine and load. The engine control module (ECM) uses the
    information from the IAT sensor to adjust the air/fuel mixture and
    ignition timing, which affects the engine&apos;s performance and
    fuel efficiency.
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
    <b>Intake Manifold Pressure</b> is
    the air pressure inside the intake manifold of an engine.
    It&apos;s crucial for the engine&apos;s performance because it
    determines how much air gets into the engine cylinders for
    combustion.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Varies by
    engine and load.
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
    <b>
    The Fuel System Status can be operated in open loop or closed
    loop.
  </b>
  <br />
  <br />
  <h2>
    <b>Open Loop</b> : In open loop,
    the brain of the vehicle&apos;s engine management system, ECU
    (Engine Control Unit) controls the engine using preset fuel and
    ignition maps without feedback from oxygen sensors. This mode is
    used during cold starts, warm-up, and heavy acceleration.
  </h2>
  <br />
  <h2>
    <b>Closed Loop</b> : In closed
    loop, the ECU adjusts fuel delivery based on oxygen sensor
    feedback. This mode is active during normal driving conditions
    when the engine is warmed up and operating optimally.
  </h2>
  <br />
  <h2 className="mt-2">
    <b>Optimal Value</b> : Closed
    loop, operating in closed loop mode is more efficient and results
    in lower emissions, as it allows the ECM to fine-tune the fuel
    delivery based on real-time feedback from the oxygen sensor(s).
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
    <bShort-Term Fuel Trim (STFT)</b> 
    is like a real-time adjustment made by a car&apos;s system to
    ensure the engine gets the right amount of fuel for efficient and
    clean combustion.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : The optimal
    value is in single-digit numbers, preferably under ± 5%. Anything
    more than ± 10% is a problem.
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
    <b>Long-Term Fuel Trim (LTFT)</b> 
    is similar to Short-Term Fuel Trim (STFT), but it&apos;s like a
    memory function in the car&apos;s computer. While STFT makes
    immediate adjustments for efficient combustion, LTFT remembers
    these adjustments over time, helping the engine maintain
    consistent performance and cleanliness in the long run.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : The optimal
    value is in single-digit numbers, preferably under ± 5%. Anything
    more than ± 10% is a problem.
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
    <b>
      Oxygen Sensor Bank 1 Sensor 1
    </b>
    , The data from this sensor helps the ECU determine the ideal
    air-fuel ratio by measuring the oxygen content in the exhaust
    gases before they are treated by the catalytic converter.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Between
    0.1V - 0.9V for a properly functioning sensor.
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
    <b>Catalyst Temperature</b> refers
    to the temperature of the catalytic converter in a vehicle&apos;s
    exhaust system.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Between
    200°C - 800°C. To function properly, the catalytic converter must
    reach a certain temperature, typically around 400°C - 600°C.
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
    <b>Mass Air Flow (MAF)</b>
    measures how much air is flowing into the engine at any given
    moment. This information is crucial for the Engine Control Unit
    (ECU) to calculate the correct amount of fuel needed for efficient
    combustion.
  </h2>
  <br />
  <h2>
    <b>Optimal Value</b> : Varies by
    engine and load.
  </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};

const descWhatIsDTCHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Diagnostic Trouble Codes (DTC)</strong>",
    icon: "info",
    html: `
    <h2>
              <b>DTC</b> is a code generated by
              a vehicle&apos;s onboard diagnostic system (OBD) to indicate a
              specific problem or malfunction within the vehicle&apos;s systems.
            </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};

const descWhyIsMyDTCEmpty = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Congratulations!</strong>",
    icon: "success",
    html: `
    <h2>
              <b>If the DTC is empty,</b> it
              means your vehicle is working fine.
            </h2>
          `,
    focusConfirm: false,
    confirmButtonText: `
           Okay
          `,
  });
};

const descHowDoesTheNotificationWorkHandler = () => {
  Swal.fire({
    color: "#FFF",
    background: "rgba(25,25,25,0.95)",
    backdrop: `rgba(7,193,250,0.1)`,
    confirmButtonColor: "#16db3d",
    title: "<strong>Detection's Workflow</strong>",
    icon: "info",
    html: `
    <h2>
    <b>Detection</b> takes place by seeing whether the value is <b>consistently not in the optimal value range for 10 times in a row</b>.
    <br />
    <br />
    There are 3 parameters to be detected:
    <br />
    <b>Short Term Fuel Trim</b>
    <br />
    (-10 % to +10 %)<br />
    <b>Long Term Fuel Trim</b>
    <br />
    (-10 % to +10 %)<br />
    <b>Oxygen Sensor Bank 1 Sensor 2</b>
    <br />
    (0.1 V to 0.9 V)
    <br />
    <br />
    <b>If there is non-optimal parameter,</b> system will throw notifications to the Notifications Page.
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
  descWhatIsDTCHandler,
  descWhyIsMyDTCEmpty,
  descHowDoesTheNotificationWorkHandler,
};
