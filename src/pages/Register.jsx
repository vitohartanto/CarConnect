import CarConnectLogo from "../LogoCarConnect.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import carBackground from "../pageRegister.png";
import ImageBackground from "../components/ImageBackground";
import { Link } from "react-router-dom";
import collections from "../utils/hyperbase/hyperbaseCollections.json";
import toast from "react-hot-toast";
import Hyperbase from "../utils/hyperbase/hyperbase";
import hyperbaseConfig from "../utils/hyperbase/hyperbaseConfig.json";

function Register() {
  const hyperbase = new Hyperbase(
    hyperbaseConfig.base_url,
    hyperbaseConfig.base_ws_url,
    hyperbaseConfig.project_id,
    hyperbaseConfig.token_signup_id,
    hyperbaseConfig.token_signup
  );

  const [usersCollection, setUsersCollection] = useState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (hyperbase.isLoading) return;

    (async () => {
      try {
        await hyperbase.signIn();
        const userCollection = await hyperbase.setCollection(collections.users);
        setUsersCollection(userCollection);
      } catch (err) {
        toast.error(`${err.status}\n${err.message}`);
      }
    })();
  }, [hyperbase.isLoading]);

  const onEmailChangeEvent = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeEvent = (event) => {
    setPassword(event.target.value);
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await usersCollection.insertOne({
        email,
        password,
      });
      toast.success("Register successful!");
      navigate("/signin");
    } catch (err) {
      toast.error(`${err.status}\n${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-6 sm:px-12  bg-cover bg-center">
      <ImageBackground
        src={carBackground}
        hash="[E7Votu5D*W;MJjEyDkC8_R5wJniL~bbNGW=.mn#McaKofpI%#oyo}VsRPjYDOWCbcWWXmaeaKg3"
      />
      <Fade delay={1e1} triggerOnce={true} damping={1e-1}>
        <img
          src={CarConnectLogo}
          alt=""
          className="absolute w-24 p-4 lg:p-8 top-8 left-8 lg:w-48 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]"
        />
      </Fade>

      <Fade delay={1e2} direction={"up"} triggerOnce={true} damping={1e-1}>
        <form
          action=""
          className="flex flex-col justify-center backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] w-80 lg:w-96 h-[435px] lg:h-[470px] px-6 lg:px-12"
          onSubmit={onRegisterSubmit}
        >
          <h1 className="mb-4 text-2xl font-bold text-left lg:text-3xl lg:mt-8">
            Register
          </h1>
          <p className="mb-6 font-normal lg:text-lg">
            Empowering car rental companies with vehicle health monitoring
          </p>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="rounded-[18px] text-[#191919] p-4 bg-[rgba(255,255,255,0.50)] placeholder-[#191919] mb-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              onChange={onEmailChangeEvent}
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-[18px] text-[#191919] p-4 bg-[rgba(255,255,255,0.50)] placeholder-[#191919] backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] mb-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              onChange={onPasswordChangeEvent}
            />
            <button className="bg-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.80)] font-medium backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] lg:text-lg text-[#191919] rounded-[18px] p-4 ">
              Register
            </button>
            <p className="mt-4 text-center">
              Already registered?{" "}
              <Link to="/signin" className="text-[#2a9df2]">
                Sign In here
              </Link>
            </p>
          </div>
        </form>
      </Fade>
    </div>
  );
}

export default Register;
