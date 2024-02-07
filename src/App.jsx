import Home from "./Home";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Diagnostics from "./pages/Diagnostics";
import RealtimeCurves from "./pages/RealtimeCurves";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diagnostics" element={<Diagnostics />} />
        <Route path="/realtime-curves" element={<RealtimeCurves />} />
      </Routes>
    </Router>
  );
};

export default App;
