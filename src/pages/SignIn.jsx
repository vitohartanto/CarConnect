import CarConnectLogo from "./Trans_CarConnect.png";
import { useContext, useEffect, useState } from "react";
import { HyperbaseContext } from "../App";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const hyperbase = useContext(HyperbaseContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!hyperbase.isLoading && hyperbase.isSignedIn) {
      navigate("/app", { replace: true });
    }
  }, [hyperbase.isLoading, hyperbase.isSignedIn, navigate]);

  const onEmailChangeEvent = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeEvent = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await hyperbase.signIn(email, password);
    } catch (err) {
      alert(`${err.status}\n${err.message}`);
      return;
    }
    navigate("/app");
  };

  return (
    <div className="flex items-center justify-center h-screen px-6 sm:px-12">
      <img
        src={CarConnectLogo}
        alt=""
        className="absolute w-24 top-8 left-8 lg:w-32"
      />
      <form
        action=""
        className="flex flex-col justify-center  shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl w-80 lg:w-96 h-[400px] lg:h-[450px] px-6 lg:px-12"
        onSubmit={onSubmit}
      >
        <h1 className="mt-6 mb-4 text-2xl font-bold text-left lg:text-3xl lg:mt-0">
          Sign In
        </h1>
        <p className="mb-6 font-normal lg:text-lg">
          Empowering car rental companies with vehicle health monitoring
        </p>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="rounded-2xl p-4 border-[#9C9CA8] border-2 mb-4"
            onChange={onEmailChangeEvent}
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-2xl p-4 border-[#9C9CA8] border-2 mb-4"
            onChange={onPasswordChangeEvent}
          />
          <button className="bg-[#233163] lg:text-lg text-white hover:text-[#233163] hover:bg-white hover:border-[#233163] hover:border-2 rounded-2xl p-4 ">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
