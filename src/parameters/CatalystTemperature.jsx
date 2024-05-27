import GaugeComponent from 'react-gauge-component';
import { useContext } from 'react';
import { AppContext } from '../App';
import PropTypes from 'prop-types';

const CatalystTemperature = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] relative max-h-[220px] max-w-[320px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="w-4/5 mt-3 text-base font-semibold text-center md:text-lg lg:text-xl">
          Catalyst Temperature
        </h1>
      </div>
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 200,
              color: '#EA4228',
              showTick: true,
              tooltip: {
                text: 'Low temperature!',
              },
            },
            {
              limit: 400,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'OK temperature!',
              },
            },
            {
              limit: 600,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'Optimal temperature!',
              },
            },
            {
              limit: 800,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'OK temperature!',
              },
            },
            {
              color: '#EA4228',
              tooltip: {
                text: 'High temperature!',
              },
            },
          ],
        }}
        pointer={{
          color: '#345243',
          length: 0.8,
          width: 15,
          // elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: (value) => value + 'ºC' },
          tickLabels: {
            type: 'outer',
            valueConfig: {
              formatTextValue: (value) => value + 'ºC',
              fontSize: 10,
            },
          },
        }}
        value={variablesInObject[carId]?.v_catalystTemperature}
        minValue={0}
        maxValue={1000}
      />
    </div>
  );
};

CatalystTemperature.propTypes = {
  carId: PropTypes.string,
  children: PropTypes.node,
};

export default CatalystTemperature;
