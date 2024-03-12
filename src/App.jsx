import Home from "./Home";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Diagnostics from "./pages/Diagnostics";

import io from "socket.io-client";

import { useEffect, createContext, useRef } from "react";

export const AppContext = createContext();

const App = () => {
  const socket = io();
  const variablesInObjectRef = useRef({}); // Use useRef to maintain value

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
  }, [socket]);

  return (
    <AppContext.Provider value={variablesInObjectRef.current}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/details" element={<Details />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
