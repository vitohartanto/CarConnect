import { useContext } from 'react';
import { AppContext } from '../App';
import PropTypes from 'prop-types';

const LongTermFuelTrim = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative min-h-[180px] max-h-[220px] max-w-[320px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="pb-[20px] text-base font-semibold text-center md:text-lg lg:text-xl">
          Long Term Fuel Trim
        </h1>
      </div>

      <h1 className="pt-[20px] text-5xl font-semibold text-center">
        {variablesInObject[carId]?.v_longTermFuelTrim} %
      </h1>
    </div>
  );
};

LongTermFuelTrim.propTypes = {
  carId: PropTypes.string,
  children: PropTypes.node,
};

export default LongTermFuelTrim;
