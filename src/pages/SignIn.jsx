import CarConnectLogo from "../Trans_CarConnect.png";
import { useContext, useEffect, useState } from "react";
import { HyperbaseContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import carBackground from "../Car_BG.png";

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
    <div
      className="flex items-center justify-center h-screen px-6 sm:px-12 bg-[#7cadee] bg-cover"
      style={{ backgroundImage: `url(${carBackground})` }}
    >
      <img
        src={CarConnectLogo}
        alt=""
        className="absolute w-24 rounded-[18px]  p-4 lg:p-8 top-8 left-8 lg:w-48"
      />

      <Fade
        cascade
        delay={1e3}
        direction={"up"}
        triggerOnce={true}
        damping={1e-1}
      >
        <form
          action=""
          className="flex flex-col justify-center backdrop-blur-[6px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba( 31, 38, 135, 0.37 )] rounded-[18px] bg-[rgba(255,255,255,0.80)] w-80 lg:w-96 h-[400px] lg:h-[450px] px-6 lg:px-12"
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
              className="rounded-[18px] p-4 bg-[#7cadee] placeholder-[#233163] mb-4 shadow-[inset_5px_5px_15px_#3d5575,inset_-5px_-5px_15px_#bbffff]"
              onChange={onEmailChangeEvent}
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-[18px] p-4 bg-[#7cadee] placeholder-[#233163] mb-4 shadow-[inset_5px_5px_15px_#3d5575,inset_-5px_-5px_15px_#bbffff]"
              onChange={onPasswordChangeEvent}
            />
            <button className="bg-[#7cadee] font-medium shadow-[5px_5px_15px_#3d5575,-5px_-5px_15px_#bbffff] lg:text-lg text-[#233163]] hover:text-[#233163] hover:bg-white hover:border-[#233163] hover:border-2 rounded-[18px] p-4 ">
              Sign In
            </button>
          </div>
        </form>
      </Fade>
    </div>
  );
}

export default SignIn;
