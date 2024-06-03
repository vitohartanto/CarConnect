import React, { useEffect } from 'react';
import {
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  TileLayer,
  FeatureGroup,
  useMap,
} from 'react-leaflet';
import { IoIosArrowRoundBack } from 'react-icons/io';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useState } from 'react';
import collections from '../utils/hyperbase/hyperbaseCollections.json';
import { HyperbaseContext } from '../App';
import { useContext } from 'react';

const DynamicMap = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);

  return null;
};

const Location = () => {
  const hyperbase = useContext(HyperbaseContext);
  const [carsCollection, setCarsCollection] = useState();
  const [obdCollection, setObdCollection] = useState();
  const [cars, setCars] = useState([]);
  const [obd, setObd] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const carCollection = await hyperbase.setCollection(collections.cars);
        unsubscribe = subscribe(carCollection);
        console.log(carCollection);
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
      console.log(cars.data);
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

  // OBD COLLECTION

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const obdDataCollection = await hyperbase.setCollection(
          collections.obd_data
        );
        unsubscribe = subscribeObd(obdDataCollection);
        console.log(obdDataCollection);
        setObdCollection(obdDataCollection);
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
    if (!obdCollection) return;
    fetchAllLocations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obdCollection]);

  const fetchAllLocations = async (car_id) => {
    try {
      const obdDatas = await obdCollection.findMany({
        fields: ['latitude', 'longitude', 'car_id', '_id'],
        filters: [{ field: 'car_id', op: '=', value: car_id }],
        orders: [{ field: '_id', kind: 'asc' }],
        limit: 1,
      });
      console.log(obdDatas.data);
      setObd(obdDatas.data);
    } catch (err) {
      alert(`${err.status}\n${err.message}`);
    }
  };

  const subscribeObd = (obdCollection) => {
    obdCollection.subscribe({
      onOpenCallback: (e) => {
        console.log('Subscribe obd status open:', e);
      },
      onErrorCallback: (e) => {
        console.log('Subscribe obd status error:', e);
      },
      onCloseCallback: (e) => {
        console.log('Subscribe obd status close:', e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribeObd(obdCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        console.log('Subscribe obd status message:', e);
      },
    });

    return () => obdCollection.unsubscribe(1000);
  };

  const fetchLocationsForAllCars = async () => {
    for (const car of cars) {
      await fetchAllLocations(car._id);
    }
  };

  useEffect(() => {
    fetchLocationsForAllCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obdCollection]);

  const carsLocation = [
    {
      _id: '123',
      car_plate: 'AB 1911 TE',
      car_brand: 'Mazda Sedan 2',
      coordinates: [-7.698259, 110.433832],
    },
    {
      _id: '234',
      car_plate: 'AD 1933 YA',
      car_brand: 'Mazda CX-5',
      coordinates: [-7.696242, 110.435832],
    },
    {
      _id: '456789',
      car_plate: 'AB 1345 UB',
      car_brand: 'Honda Brio',
      coordinates: [-7.698226, 110.436832],
    },
  ];

  let uniqueCars = [
    ...new Map(
      carsLocation.map((item) => [
        item.car_plate,
        {
          ...item,
          coordinates: carsLocation
            .filter(({ car_plate }) => car_plate === item.car_plate)
            .map(({ coordinates }) => coordinates),
        },
      ])
    ).values(),
  ];

  // Collect all coordinates for setting bounds
  const bounds = carsLocation.map((carLocation) => carLocation.coordinates);

  const backToRegisteredCarsHandler = async (event) => {
    // Assuming event is passed from an event listener
    event.preventDefault();

    const { value: back } = await Swal.fire({
      title: 'Back to Registered Cars List?',
      background: 'rgba(25,25,25,0.90)',
      backdrop: `rgba(7,193,250,0.1)`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16db3d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, bring me back!',
      color: '#fff',
    });

    // Your remaining code
    if (back) {
      try {
        event.stopPropagation();
        navigate('/app/');
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };
  return (
    <div>
      <div className="z-[100] w-12 sm:w-16 lg:w-20 fixed h-screen backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(25,25,25,0.90)] flex items-center justify-between flex-col py-10">
        <button
          title="Back to Registered Cars"
          onClick={backToRegisteredCarsHandler}
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]">
            <IoIosArrowRoundBack className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
          </div>
        </button>
      </div>
      <div className="ml-12 sm:ml-16 lg:ml-20">
        <MapContainer
          center={[51.51, -0.09]}
          zoom={8}
          style={{ height: '100vh' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <DynamicMap bounds={bounds} />

          <LayersControl position="topright">
            {uniqueCars.map((uniqueCar) => (
              <LayersControl.Overlay
                key={uniqueCar.car_plate}
                checked
                name={uniqueCar.car_plate}
              >
                <FeatureGroup>
                  {uniqueCar.coordinates.map((latlng, index) => (
                    <Marker key={index} position={latlng}>
                      <Popup>
                        {uniqueCar.car_plate} <br />
                        {uniqueCar.car_brand} <br />
                        Coordinates: {latlng[0]}, {latlng[1]}
                      </Popup>
                    </Marker>
                  ))}
                </FeatureGroup>
              </LayersControl.Overlay>
            ))}
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default Location;
