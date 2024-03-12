import "./App.css";
import { useEffect, createContext, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";

import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Diagnostics from "./pages/Diagnostics";

export const AppContext = createContext();
export const DtcContext = createContext();

const App = () => {
  const socket = io();
  const variablesInObjectRef = useRef({});
  const [dtcResponse, setDtcResponse] = useState(null);

  useEffect(() => {
    socket.on("data", (msg) => {
      let carData = JSON.parse(msg);
      variablesInObjectRef.current = {
        // Update variablesInObjectRef.current
        v_fuelSystemStatus: carData["varFuelSystemStatus"],
        v_engineRpm: parseInt(carData["varEngineRpm"]),
        v_vehicleSpeed: parseInt(carData["varVehicleSpeed"]),
        v_throttlePosition: parseInt(carData["varThrottlePosition"]),
        v_engineCoolantTemperature: parseInt(
          carData["varEngineCoolantTemperature"]
        ),
        v_shortTermFuelTrim: parseInt(carData["varShortTermFuelTrim"]),
        v_longTermFuelTrim: parseInt(carData["varLongTermFuelTrim"]),
        v_intakeAirTemperature: parseInt(carData["varIntakeAirTemperature"]),
        v_oxygenSensorBank1Sensor1: parseInt(
          carData["varOxygenSensorBank1Sensor1"]
        ),
        v_oxygenSensorBank2Sensor2: parseInt(
          carData["varOxygenSensorBank2Sensor2"]
        ),
        v_massAirFlow: parseInt(carData["varMassAirFlow"]),
        v_catalystTemperature: parseInt(carData["varCatalystTemperature"]),
        v_fuelType: carData["varFuelType"],
        v_engineOilTemperature: parseInt(carData["varEngineOilTemperature"]),
        v_intakeManifoldPressure: parseInt(
          carData["varIntakeManifoldPressure"]
        ),
      };
    });

    socket.on("dtcData", (faultCodes) => {
      setDtcResponse(faultCodes);
    });
  }, [socket]);

  return (
    <AppContext.Provider value={variablesInObjectRef.current}>
      <DtcContext.Provider value={dtcResponse}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details" element={<Details />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
          </Routes>
        </Router>
      </DtcContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
