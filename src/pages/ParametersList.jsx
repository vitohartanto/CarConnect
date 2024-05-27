import Sidebar from '../components/Sidebar';
import ThrottlePosition from '../parameters/ThrottlePosition';
import EngineCoolantTemperature from '../parameters/EngineCoolantTemperature';
import EngineRPM from '../parameters/EngineRPM';
import FuelSystemStatus from '../parameters/FuelSystemStatus';
import VehicleSpeed from '../parameters/VehicleSpeed';
import ShortTermFuelTrim from '../parameters/ShortTermFuelTrim';
import LongTermFuelTrim from '../parameters/LongTermFuelTrim';
import IntakeAirTemperature from '../parameters/IntakeAirTemperature';
import OxygenSensorBank1Sensor2 from '../parameters/OxygenSensorBank1Sensor2';
import MassAirFlow from '../parameters/MassAirFlow';
import CatalystTemperature from '../parameters/CatalystTemperature';
import IntakeManifoldPressure from '../parameters/IntakeManifoldPressure';
import { useParams } from 'react-router-dom';
import carBackground from '../pageParametersList.png';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Fade } from 'react-awesome-reveal';
import { useContext, useState, useEffect } from 'react';
import { HyperbaseContext } from '../App';
import collections from '../utils/hyperbase/hyperbaseCollections.json';

import {
  descEngineRPMHandler,
  descVehicleSpeedHandler,
  descEngineCoolantTemperatureHandler,
  descThrottlePositionHandler,
  descIntakeAirTemperatureHandler,
  descIntakeManifoldPressureHandler,
  descFuelSystemStatusHandler,
  descShortTermFuelTrimHandler,
  descLongTermFuelTrimHandler,
  descOxygenSensorBank1Sensor2Handler,
  descCatalystTemperatureHandler,
  descMassAirFlowHandler,
} from '../utils/descriptionsHandler';

import ImageBackground from '../components/ImageBackground';

const ParametersList = () => {
  const { car_id } = useParams();
  const hyperbase = useContext(HyperbaseContext);
  const [carsCollection, setCarsCollection] = useState();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const carCollection = await hyperbase.setCollection(collections.cars);
        unsubscribe = subscribe(carCollection);

        setCarsCollection(carCollection);
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hyperbase, hyperbase.isLoading]);

  useEffect(() => {
    if (!carsCollection) return;
    fetchAllCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carsCollection]);

  const fetchAllCars = async () => {
    try {
      const cars = await carsCollection.findMany({
        orders: [
          {
            field: '_id',
            kind: 'asc',
          },
        ],
      });
      setCars(cars.data);
    } catch (err) {
      alert(`${err.status}\n${err.message}`);
    }
  };

  const subscribe = (carsCollection) => {
    carsCollection.subscribe({
      onOpenCallback: (e) => {
        console.log('Subscribe cars status open:', e);
      },
      onErrorCallback: (e) => {
        console.log('Subscribe cars status error:', e);
      },
      onCloseCallback: (e) => {
        console.log('Subscribe cars status close:', e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribe(carsCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        console.log('Subscribe cars status message:', e);
      },
    });

    return () => carsCollection.unsubscribe(1000);
  };

  let foundedCar = cars.find((car) => car._id === car_id);
  const plate = foundedCar ? JSON.parse(foundedCar.plate_brand)[0] : '';
  const brand = foundedCar ? JSON.parse(foundedCar.plate_brand)[1] : '';

  return (
    <div>
      <ImageBackground
        src={carBackground}
        hash="[A7x,{V@qZ-C9WWBO,V@DOsn$-Jjt+s9MvpIv0R+pysqX:j[iuVsNDbbjGWA#FS2b_jFcDoLVXso"
      />
      <Sidebar />
      <div className="ml-12 pt-8 pr-8 lg:ml-[72px]">
        <Fade delay={1e1} direction={'down'} triggerOnce={true} damping={1e-1}>
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-2 mb-4 w-64 xl:w-72 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Parameters List
            </h1>
            <h1 className="py-2 mb-4 w-[280px] xl:w-[420px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Car - {plate} - {brand}
            </h1>
          </div>
        </Fade>

        <Fade delay={1e1} triggerOnce={false} damping={1e-1} duration={1500}>
          <h1 className="py-2 mb-4 mt-4 w-72 xl:w-72 min-[600px]:ml-10 text-center px-4 ml-5 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Basic Engine Parameters
          </h1>

          {/* engine rpm */}

          <div className="ml-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
            <EngineRPM carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descEngineRPMHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </EngineRPM>
            <VehicleSpeed carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descVehicleSpeedHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </VehicleSpeed>
            <EngineCoolantTemperature carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descEngineCoolantTemperatureHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </EngineCoolantTemperature>
            <ThrottlePosition carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descThrottlePositionHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </ThrottlePosition>
            <IntakeAirTemperature carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descIntakeAirTemperatureHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </IntakeAirTemperature>
            <IntakeManifoldPressure carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descIntakeManifoldPressureHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </IntakeManifoldPressure>
          </div>

          <h1 className="py-2 mb-4 mt-4 w-72 xl:w-72 min-[600px]:ml-10 text-center px-4 ml-5 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Fuel System Parameters
          </h1>

          <div className="ml-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
            <FuelSystemStatus carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descFuelSystemStatusHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </FuelSystemStatus>
            <ShortTermFuelTrim carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descShortTermFuelTrimHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </ShortTermFuelTrim>
            <LongTermFuelTrim carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descLongTermFuelTrimHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </LongTermFuelTrim>
          </div>

          <h1 className="py-2 mb-4 mt-4 w-72 xl:w-72 min-[600px]:ml-10 text-center px-4 ml-5 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Oxygen Sensor
          </h1>
          <div className="ml-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
            <OxygenSensorBank1Sensor2 carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descOxygenSensorBank1Sensor2Handler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </OxygenSensorBank1Sensor2>
          </div>

          <h1 className="py-2 mb-4 mt-4 w-72 xl:w-72 min-[600px]:ml-10 text-center px-4 ml-5 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Catalyst Parameter
          </h1>
          <div className="ml-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
            <CatalystTemperature carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descCatalystTemperatureHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </CatalystTemperature>
          </div>

          <h1 className="py-2 mb-4 mt-4 w-72 xl:w-72 min-[600px]:ml-10 text-center px-4 ml-5 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Miscellaneous Parameter
          </h1>
          <div className="mb-6 ml-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
            <MassAirFlow carId={car_id}>
              <button
                className="text-white absolute top-3.5 right-3.5"
                onClick={descMassAirFlowHandler}
              >
                <BsFillQuestionCircleFill className="text-2xl" />
              </button>
            </MassAirFlow>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ParametersList;
