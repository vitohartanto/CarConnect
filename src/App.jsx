import { useEffect, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Diagnostics from "./pages/Diagnostics";
import SignIn from "./SignIn";
import useHyperbase from "./hooks/useHyperbase";
import ProtectedRoute from "./ProtectedRoute";
import AvailableCars from "./AvailableCars";
import collections from "./utils/hyperbase/hyperbaseCollections.json";

export const HyperbaseContext = createContext();
export const AppContext = createContext();
export const DtcContext = createContext();

const App = () => {
  const [variablesInObject, setVariablesInObject] = useState({});
  const [dtcResponse, setDtcResponse] = useState(null);
  const hyperbase = useHyperbase();

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const obdDataCollection = await hyperbase.setCollection(
          collections.obd_data
        );

        unsubscribe = subscribeObdData(obdDataCollection);
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [hyperbase.isLoading, hyperbase.isSignedIn]);

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const dtcDataCollection = await hyperbase.setCollection(
          collections.dtc_data
        );

        unsubscribe = subscribeDtcData(dtcDataCollection);
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [hyperbase.isLoading, hyperbase.isSignedIn]);

  useEffect(() => {
    console.log("Percobaan Melihat variablesInObject");
    console.log(variablesInObject);
  }, [variablesInObject]);

  const subscribeObdData = (obdDataCollection) => {
    obdDataCollection.subscribe({
      onOpenCallback: (e) => {
        console.log("Subscribe obdData status open:", e);
      },
      onErrorCallback: (e) => {
        console.log("Subscribe obdData status error:", e);
      },
      onCloseCallback: (e) => {
        console.log("Subscribe obdData status close:", e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribeObdData(obdDataCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        const parsedData = JSON.parse(e.data);
        if (parsedData.kind === "insert_one") {
          const d = parsedData.data;
          setVariablesInObject({
            [d.car_id]: {
              v_fuelSystemStatus: d.fuel_system_status,
              v_engineRpm: d.engine_rpm,
              v_vehicleSpeed: d.vehicle_speed,
              v_throttlePosition: d.throttle_position,
              v_engineCoolantTemperature: d.engine_coolant_temperature,
              v_shortTermFuelTrim: d.short_term_fuel_trim,
              v_longTermFuelTrim: d.long_term_fuel_trim,
              v_intakeAirTemperature: d.intake_air_temperature,
              v_massAirFlow: d.mass_air_flow,
              v_catalystTemperature: d.catalyst_temperature,
              v_intakeManifoldPressure: d.intake_manifold_pressure,
              v_timestamp: d.timestamp,
            },
          });
        }
      },
    });

    return () => obdDataCollection.unsubscribe(1000);
  };

  const subscribeDtcData = (dtcDataCollection) => {
    dtcDataCollection.subscribe({
      onOpenCallback: (e) => {
        console.log("Subscribe dtcData status open:", e);
      },
      onErrorCallback: (e) => {
        console.log("Subscribe dtcData status error:", e);
      },
      onCloseCallback: (e) => {
        console.log("Subscribe dtcData status close:", e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribeDtcData(dtcDataCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        const parsedData = JSON.parse(e.data);
        if (parsedData.kind === "insert_one") {
          const d = parsedData.data;
          setDtcResponse({
            v_car_id: d.car_id,
            v_value: d.value,
            v_timestamp: d.timestamp,
          });
        }
      },
    });

    return () => dtcDataCollection.unsubscribe(1000);
  };

  return (
    <HyperbaseContext.Provider value={hyperbase}>
      <AppContext.Provider value={variablesInObject}>
        <DtcContext.Provider value={dtcResponse}>
          <Router>
            <Routes>
              <Route path="/" exact element={<Navigate to="/app" replace />} />
              <Route path="/signin" exact element={<SignIn />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/app" exact element={<AvailableCars />} />
                <Route path="/app/:car_id/" exact element={<Home />} />
                <Route
                  path="/app/:car_id/dashboard"
                  exact
                  element={<Dashboard />}
                />
                <Route
                  path="/app/:car_id/details"
                  exact
                  element={<Details />}
                />
                <Route
                  path="/app/:car_id/diagnostics"
                  exact
                  element={<Diagnostics />}
                />
              </Route>
            </Routes>
          </Router>
        </DtcContext.Provider>
      </AppContext.Provider>
    </HyperbaseContext.Provider>
  );
};

export default App;
