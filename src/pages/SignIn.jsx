import CarConnectLogo from '../img/LogoCarConnect.png';
import { useContext, useEffect, useState } from 'react';
import { HyperbaseContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import carBackground from '../img/Car_BG.png';
import ImageBackground from '../components/ImageBackground';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignIn() {
  const hyperbase = useContext(HyperbaseContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!hyperbase.isLoading && hyperbase.isSignedIn) {
      navigate('/app', { replace: true });
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

    if (!email || !password) {
      toast.error('Please complete both inputs');
      return;
    }

    try {
      await hyperbase.signIn(email, password);
      toast.success('Login Successful');
      navigate('/app');
    } catch (err) {
      if (err.message.includes('Authentication data not found')) {
        toast.error('Incorrect Email or Password');
        return;
      } else {
        alert(`${err.status}\n${err.message}`);
        return;
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen px-6 bg-center bg-cover sm:px-12">
      <ImageBackground
        src={carBackground}
        hash="|KBglb@[ZiJ89?S$jEkBg3G^Osd;xG$*r?jFX8X8MdpI$*wyogR*NFbbbH=f#8cZRjM{WWs.fkkDcYaKfloyrrofaebIWAS~kVVEXRkWWBWVjFozXRSdV@V@k;nif6axbINbV@o}jZWBX8jFj[o2j]a#babveTkBkBniWo"
      />
      <Fade delay={1e1} triggerOnce={true} damping={1e-1}>
        <img
          src={CarConnectLogo}
          alt=""
          className="absolute w-24 p-4 lg:p-8 top-8 left-8 lg:w-48 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]"
        />
      </Fade>

      <Fade delay={1e2} direction={'up'} triggerOnce={true} damping={1e-1}>
        <form
          action=""
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] w-80 lg:w-96 h-[435px] lg:h-[470px] px-6 lg:px-12"
          onSubmit={onSubmit}
        >
          <h1 className="mb-4 text-2xl font-bold text-left lg:text-3xl lg:mt-8">
            Sign In
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
            <button className=" bg-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.80)] font-medium backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] lg:text-lg text-[#191919] rounded-[18px] p-4 ">
              Sign In
            </button>
            <p className="mt-4 text-center lg:mb-8">
              Not registered yet?{' '}
              <Link to="/register" className="text-[#2a9df2]">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </Fade>
    </div>
  );
}

export default SignIn;
