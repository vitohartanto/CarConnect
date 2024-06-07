import { useContext } from 'react';
import { AppContext } from '../App';
import PropTypes from 'prop-types';

const FuelSystemStatus = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);

  return (
    <div className=" my-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative min-h-[180px] max-h-[220px] max-w-[320px] flex flex-col justify-center">
      {children}
      <h1 className="px-10 pt-0 pb-0 text-base font-semibold text-center md:text-lg lg:text-xl">
        Fuel System Status
      </h1>
      <h1 className="px-2 pb-3 pt-[20px] text-base font-semibold text-center">
        {variablesInObject[carId]?.v_fuelSystemStatus}

        {/* Closed loop, using oxygen sensor feedback to determine fuel mix */}
      </h1>
    </div>
  );
};

FuelSystemStatus.propTypes = {
  carId: PropTypes.string,
  children: PropTypes.node,
};

export default FuelSystemStatus;
