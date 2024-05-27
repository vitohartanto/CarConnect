import { useContext } from 'react';
import { AppContext } from '../App';
import PropTypes from 'prop-types';

const EngineRPM = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext); // Destructuring variablesInObject from the context object

  return (
    <div className=" my-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative min-h-[180px] max-h-[220px] max-w-[320px] flex flex-col justify-center">
      {children}
      <h1 className="pb-[20px] text-base font-semibold text-center md:text-lg lg:text-xl">
        Engine RPM
      </h1>

      <h1 className="px-2 pt-[20px] text-5xl font-semibold text-center">
        {variablesInObject[carId]?.v_engineRpm}650 RPM
      </h1>
    </div>
  );
};

EngineRPM.propTypes = {
  carId: PropTypes.string,
  children: PropTypes.node,
};

export default EngineRPM;
