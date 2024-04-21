import Sidebar from "../components/Sidebar";

import ThrottlePosition from "../parameters/ThrottlePosition";
import EngineCoolantTemperature from "../parameters/EngineCoolantTemperature";
import EngineRPM from "../parameters/EngineRPM";
import FuelSystemStatus from "../parameters/FuelSystemStatus";
import VehicleSpeed from "../parameters/VehicleSpeed";
import ShortTermFuelTrim from "../parameters/ShortTermFuelTrim";
import LongTermFuelTrim from "../parameters/LongTermFuelTrim";
import IntakeAirTemperature from "../parameters/IntakeAirTemperature";
// import OxygenSensorBank1Sensor1 from "../parameters/OxygenSensorBank1Sensor1";
// import OxygenSensorBank2Sensor2 from "../parameters/OxygenSensorBank2Sensor2";
import MassAirFlow from "../parameters/MassAirFlow";
import CatalystTemperature from "../parameters/CatalystTemperature";
// import FuelType from "../parameters/FuelType";
// import EngineOilTemperature from "../parameters/EngineOilTemperature";
import IntakeManifoldPressure from "../parameters/IntakeManifoldPressure";
import { useParams } from "react-router-dom";
import carBackground from "../pageParametersList.png";

const ParametersList = () => {
  const { car_id } = useParams();
  return (
    <div>
      <img
        src={carBackground}
        alt=""
        className="fixed w-screen h-screen z-[-100] bg-center"
      />
      <Sidebar />
      <div className="ml-12 pt-8 pr-8">
        <h1 className="py-2 mb-4 w-64 xl:w-64 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
          Parameters List
        </h1>
        {/* engine rpm */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <EngineRPM carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Engine RPM</span> stands for
              &quot;Revolutions Per Minute&quot; and refers to how many times
              the engine&apos;s crankshaft rotates in one minute.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : 600 – 900
              at idle if the engine is heated up. If the idle is higher than
              1000, it indicates a problem, the engine being cold or temporary
              RPM increase.
            </h2>
          </div>
        </div>
        {/* vehicle speed */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4 ">
            <VehicleSpeed carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Vehicle Speed</span> indicates how
              quickly the vehicle is traveling along the road. The unit is in
              kilometers per hour.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Varies by
              vehicle speed.
            </h2>
          </div>
        </div>
        {/* engine coolant temperature */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <EngineCoolantTemperature carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Engine coolant temperature</span>{" "}
              refers to the temperature of the coolant fluid that circulates
              through the engine&apos;s cooling system to regulate its
              temperature.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Between
              90°C - 104°C.
            </h2>
          </div>
        </div>
        {/* throttle position */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <ThrottlePosition carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Throttle Position</span> refers to
              how much the throttle valve in the engine&apos;s intake system is
              open. Simply, the position of the throttle in percentage.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Between
              0-100%, with 0% indicating that the throttle valve is fully closed
              and 100% indicating that the throttle valve is fully open.
            </h2>
          </div>
        </div>
        {/* intake air temperature */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <IntakeAirTemperature carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">
                Intake Air Temperature (IAT)
              </span>{" "}
              refers to the temperature of the air as it enters the
              engine&apos;s intake system.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Varies by
              engine and load. The engine control module (ECM) uses the
              information from the IAT sensor to adjust the air/fuel mixture and
              ignition timing, which affects the engine&apos;s performance and
              fuel efficiency.
            </h2>
          </div>
        </div>
        {/* intake manifold pressure */}
        <div className="flex flex-col items-center justify-center mt-10 mb-10 md:flex-row">
          <div className="ml-4">
            <IntakeManifoldPressure carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Intake Manifold Pressure</span> is
              the air pressure inside the intake manifold of an engine.
              It&apos;s crucial for the engine&apos;s performance because it
              determines how much air gets into the engine cylinders for
              combustion.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Varies by
              engine and load.
            </h2>
          </div>
        </div>
        {/* fuel system status */}
        <div className="flex flex-col items-center justify-center mt-6 lg:flex-row">
          <div className="ml-4">
            <FuelSystemStatus carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10">
            <h2 className="mb-2 font-semibold">
              The Fuel System Status can be operated in open loop or closed
              loop.
            </h2>
            <h2>
              <span className="font-semibold ">Open Loop</span> : In open loop,
              the brain of the vehicle&apos;s engine management system, ECU
              (Engine Control Unit) controls the engine using preset fuel and
              ignition maps without feedback from oxygen sensors. This mode is
              used during cold starts, warm-up, and heavy acceleration.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Closed Loop</span> : In closed
              loop, the ECU adjusts fuel delivery based on oxygen sensor
              feedback. This mode is active during normal driving conditions
              when the engine is warmed up and operating optimally.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Closed
              loop, operating in closed loop mode is more efficient and results
              in lower emissions, as it allows the ECM to fine-tune the fuel
              delivery based on real-time feedback from the oxygen sensor(s).
            </h2>
          </div>
        </div>

        {/* short term fuel trim */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <ShortTermFuelTrim carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Short-Term Fuel Trim (STFT)</span>{" "}
              is like a real-time adjustment made by a car&apos;s system to
              ensure the engine gets the right amount of fuel for efficient and
              clean combustion.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : The optimal
              value is in single-digit numbers, preferably under ± 5%. Anything
              more than ± 10% is a problem.
            </h2>
          </div>
        </div>
        {/* long term fuel trim */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <LongTermFuelTrim carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Long-Term Fuel Trim (LTFT)</span>{" "}
              is similar to Short-Term Fuel Trim (STFT), but it&apos;s like a
              memory function in the car&apos;s computer. While STFT makes
              immediate adjustments for efficient combustion, LTFT remembers
              these adjustments over time, helping the engine maintain
              consistent performance and cleanliness in the long run.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : The optimal
              value is in single-digit numbers, preferably under ± 5%. Anything
              more than ± 10% is a problem.
            </h2>
          </div>
        </div>

        {/* oxygen sensor bank 1 sensor 1 */}
        {/* <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <OxygenSensorBank1Sensor1 />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">
                Oxygen Sensor Bank 1 Sensor 1
              </span>
              , The data from this sensor helps the ECU determine the ideal
              air-fuel ratio by measuring the oxygen content in the exhaust
              gases before they are treated by the catalytic converter.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Between
              0.1V - 0.9V for a properly functioning sensor.
            </h2>
          </div>
        </div> */}
        {/* oxygen sensor bank 2 sensor 2 */}
        {/* <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <OxygenSensorBank2Sensor2 />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">
                Oxygen Sensor Bank 2 Sensor 2
              </span>
              , The data from this sensor helps the ECU determine if the
              catalytic converter is effectively reducing harmful emissions by
              measuring the remaining oxygen content in the exhaust gases after
              they have been treated by the catalytic converter.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Between
              0.1V - 0.9V for a properly functioning sensor.
            </h2>
          </div>
        </div> */}
        {/* catalyst temperature */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <CatalystTemperature carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Catalyst Temperature</span> refers
              to the temperature of the catalytic converter in a vehicle&apos;s
              exhaust system.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Between
              200°C - 800°C. To function properly, the catalytic converter must
              reach a certain temperature, typically around 400°C - 600°C.
            </h2>
          </div>
        </div>
        {/* mass air flow */}
        <div className="flex flex-col items-center justify-center mt-10 md:flex-row">
          <div className="ml-4">
            <MassAirFlow carId={car_id} />
          </div>
          <div className="mx-6 my-4 text-base text-justify md:text-lg xl:text-xl sm:mx-10 md:ml-3 md:mr-10">
            <h2>
              <span className="font-semibold">Mass Air Flow (MAF)</span>{" "}
              measures how much air is flowing into the engine at any given
              moment. This information is crucial for the Engine Control Unit
              (ECU) to calculate the correct amount of fuel needed for efficient
              combustion.
            </h2>
            <h2 className="mt-2">
              <span className="font-semibold">Optimal Value</span> : Varies by
              engine and load.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParametersList;
