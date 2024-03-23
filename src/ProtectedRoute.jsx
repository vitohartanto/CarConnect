import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HyperbaseContext } from "./App";

function ProtectedRoute() {
  const hyperbase = useContext(HyperbaseContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hyperbase.isLoading && !hyperbase.isSignedIn) {
      navigate("/signin", { replace: true });
    }
  }, [hyperbase.isLoading, hyperbase.isSignedIn, navigate]);

  return <Outlet />;
}

export default ProtectedRoute;
