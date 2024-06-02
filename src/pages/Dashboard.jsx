import Sidebar from '../components/Sidebar';
import AddModal from '../components/AddModal';
import UpdateModal from '../components/UpdateModal';
import RemoveModal from '../components/RemoveModal';
import { useParams } from 'react-router-dom';
import carBackground from '../img/pageDashboard.png';
import { Fade } from 'react-awesome-reveal';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { HyperbaseContext } from '../App';
import collections from '../utils/hyperbase/hyperbaseCollections.json';
import ImageBackground from '../components/ImageBackground';

const Dashboard = () => {
  const hyperbase = useContext(HyperbaseContext);
  // const storedStates = JSON.parse(localStorage.getItem("selectedComponents"));
  const { car_id } = useParams();
  const [selectedComponents, setSelectedComponents] = useState([]);
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

  // useEffect(() => {
  //   console.log(selectedComponents);
  //   // localStorage.setItem(
  //   //   "selectedComponents",
  //   //   JSON.stringify(selectedComponents)
  //   // );
  // }, [selectedComponents]);

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

  // Function generateId
  const generateId = () => {
    return +new Date();
  };

  // Function generateComponentObject
  const generateComponentObject = (id, component) => {
    return {
      id,
      component,
    };
  };

  // Function addComponent
  const addComponent = (component) => {
    const generatedID = generateId();
    const componentObject = generateComponentObject(generatedID, component);
    setSelectedComponents([...selectedComponents, componentObject]);
  };

  let foundedCar = cars.find((car) => car._id === car_id);
  const plate = foundedCar ? JSON.parse(foundedCar.plate_brand)[0] : '';
  const brand = foundedCar ? JSON.parse(foundedCar.plate_brand)[1] : '';

  return (
    <div className="">
      <ImageBackground
        src={carBackground}
        hash="[B9R*AD3TLvg#YM_Zzbw8wWTxbY6-=Kit,n3?II9wIibMJjDsXX.r_X,Rkoe%iI.nNZ$NGVsxaS~"
      />
      <Sidebar />
      <div className="ml-12 pt-8 pr-8 lg:ml-[72px]">
        <Fade
          delay={1e1}
          duration={2000}
          direction={'down'}
          triggerOnce={true}
          damping={1e-1}
        >
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="py-2 mb-4 w-48 xl:w-64 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Dashboard
            </h1>
            <h1 className="py-2 mb-4 w-[280px] xl:w-[420px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Car - {plate} - {brand}
            </h1>
          </div>

          <div className="flex items-center justify-between mt-4 py-4 min-w-60 min-[600px]:w-[480px] xl:w-[520px] text-left px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            <h1 className="w-11/12 text-lg font-medium xl:text-xl">
              Choose which OBD2 parameters to display
            </h1>
            <AddModal className="ml-4" addComponent={addComponent} />
          </div>
        </Fade>
        <div className="grid grid-cols-1 gap-6 ml-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {selectedComponents.map((data) => (
            <data.component key={data.id} id={data.id} carId={car_id}>
              <UpdateModal
                setSelectedComponents={setSelectedComponents}
                componentObject={data}
                generateId={generateId}
              />
              <RemoveModal
                setSelectedComponents={setSelectedComponents}
                componentObject={data}
                selectedComponents={selectedComponents}
              />
            </data.component>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
