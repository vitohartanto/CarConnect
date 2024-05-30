import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FaBell, FaCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { HyperbaseContext } from '../App';
import collections from '../utils/hyperbase/hyperbaseCollections.json';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import carBackground from '../img/pageRegisteredCars.png';
import { Fade } from 'react-awesome-reveal';
import { v4 as uuidv4 } from 'uuid';
import ImageBackground from '../components/ImageBackground';

const RegisteredCars = () => {
  const hyperbase = useContext(HyperbaseContext);
  const [notificationsCollection, setNotificationsCollection] = useState();
  const [carsCollection, setCarsCollection] = useState();
  const [cars, setCars] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
  const [searchBrand, setSearchBrand] = useState('');
  const [wholeNotifications, setWholeNotifications] = useState([]);
  const [showIssuedOnly, setShowIssuedOnly] = useState(false);

  const onChangeSearchPlateHandler = (event) => {
    setSearchPlate(event.target.value);
  };

  const onChangeSearchBrandHandler = (event) => {
    setSearchBrand(event.target.value);
  };

  const onChangeCheckboxHandler = (event) => {
    setShowIssuedOnly(event.target.checked);
  };

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

  const signOutHandler = async (event) => {
    event.preventDefault();

    const { value: removed } = await Swal.fire({
      title: 'Do you want to Sign Out?',
      background: 'rgba(25,25,25,0.90)',
      backdrop: `rgba(7,193,250,0.1)`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16db3d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sign Out',
      color: '#fff',
    });

    if (removed) {
      try {
        event.stopPropagation();
        hyperbase.signOut();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

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

  const addCarPlateBrand = async () => {
    const { value: plate_brand } = await Swal.fire({
      title: "Enter Car's License Plate and Car's Brand",
      html: `
    <input id="swal-input1" class="swal2-input placeholder-white text-base min-w-[230px]" placeholder="e.g. B 1234 VH">
    <input id="swal-input2" class="swal2-input placeholder-white text-base min-w-[230px]" placeholder="e.g. Toyota, Honda, Mazda">
  `,
      focusConfirm: false,

      preConfirm: () => {
        if (
          document.getElementById('swal-input1').value == '' ||
          document.getElementById('swal-input2').value == ''
        ) {
          return Swal.showValidationMessage('Please complete both inputs');
        }

        return JSON.stringify([
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ]);
      },

      color: '#fff',
      background: 'rgba(25,25,25,0.90)',
      backdrop: `rgba(7,193,250,0.1)`,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#16db3d',
      showCancelButton: true,
    });

    if (plate_brand) {
      try {
        await carsCollection.insertOne({
          user_id: hyperbase.user._id,
          plate_brand,
          is_active: false,
        });
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const editCarPlateBrand = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();
    const { value: plate_brand_corrected } = await Swal.fire({
      title: "Edit Car's License Plate and Car's Brand",
      html: `
    <input id="swal-input3" class="swal2-input placeholder-white text-base min-w-[230px]" placeholder="e.g. B 1234 VH"}>
    <input id="swal-input4" class="swal2-input placeholder-white text-base min-w-[230px]" placeholder="e.g. Toyota, Honda, Mazda">
  `,
      focusConfirm: false,

      preConfirm: () => {
        if (
          document.getElementById('swal-input3').value == '' ||
          document.getElementById('swal-input4').value == ''
        ) {
          return Swal.showValidationMessage('Please complete both inputs');
        }

        return JSON.stringify([
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
        ]);
      },

      color: '#fff',
      background: 'rgba(25,25,25,0.90)',
      backdrop: `rgba(7,193,250,0.1)`,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#16db3d',
      showCancelButton: true,
    });

    if (plate_brand_corrected) {
      try {
        await carsCollection.updateOne(id, {
          plate_brand: plate_brand_corrected,
        });
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const deleteCarPlateBrand = async (event, id) => {
    // Assuming event is passed from an event listener
    event.preventDefault();
    event.stopPropagation();
    const { value: removed } = await Swal.fire({
      title: 'Delete this?',
      background: 'rgba(25,25,25,0.90)',
      backdrop: `rgba(7,193,250,0.1)`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16db3d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      color: '#fff',
    });

    // Your remaining code
    if (removed) {
      try {
        await carsCollection.deleteOne(id);
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const notificationCollection = await hyperbase.setCollection(
          collections.notifications
        );
        unsubscribe = subscribeNotifications(notificationCollection);

        setNotificationsCollection(notificationCollection);
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
    if (!notificationsCollection) return;
    fetchAllNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationsCollection]);

  const displayCountIfFixedFalse = (informationsArray, carId) => {
    let carInfo = informationsArray.filter((info) => info.car_id === carId);
    let carInfoFixedFalse = carInfo.find((info) => info.fixed === false);
    // If carInfoFixedFalse is found, display the false_count property
    if (carInfoFixedFalse) {
      return carInfoFixedFalse.$COUNT;
    } else {
      return null;
    }
  };

  const fetchAllNotifications = async () => {
    try {
      const notifications = await notificationsCollection.findMany({
        fields: ['fixed', 'car_id', '$COUNT'],
        groups: ['car_id', 'fixed'],
      });

      setWholeNotifications(notifications.data);
    } catch (err) {
      alert(`${err.status}\n${err.message}`);
    }
  };

  const subscribeNotifications = (notificationsCollection) => {
    notificationsCollection.subscribe({
      onOpenCallback: (e) => {
        console.log('Subscribe notifications status open:', e);
      },
      onErrorCallback: (e) => {
        console.log('Subscribe notifications status error:', e);
      },
      onCloseCallback: (e) => {
        console.log('Subscribe notifications status close:', e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribeNotifications(notificationsCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        console.log('Subscribe notifications status message:', e);
      },
    });

    return () => notificationsCollection.unsubscribe(1000);
  };

  const filteredCars = cars.filter((car) => {
    const includesSearchPlate = JSON.parse(car.plate_brand)[0]
      .toLowerCase()
      .includes(searchPlate.toLowerCase());
    const includesSearchBrand = JSON.parse(car.plate_brand)[1]
      .toLowerCase()
      .includes(searchBrand.toLowerCase());

    // Step 2: Filter based on the checkbox state
    if (showIssuedOnly) {
      return (
        includesSearchPlate &&
        includesSearchBrand &&
        displayCountIfFixedFalse(wholeNotifications, car._id) >= 1
      );
    } else {
      return includesSearchPlate && includesSearchBrand;
    }
  });

  return (
    <div>
      <ImageBackground
        src={carBackground}
        hash="[D6APKW-hha^XeX8u%jbhfjFp{WUVse:YPoMv#n,R3a{O9jFtTn+nijaWAa{cEa{Z$j[tRbHbFbH"
      />

      <div className="w-12 sm:w-16 lg:w-20 fixed h-screen backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(25,25,25,0.90)] flex items-center justify-between flex-col py-10">
        <Fade
          delay={1e1}
          duration={2000}
          direction={'left'}
          triggerOnce={true}
          damping={1e-1}
        >
          <button
            onClick={addCarPlateBrand}
            className=" relative text-4xl w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]"
            title="Register your car"
          >
            <p className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              +
            </p>
          </button>
          <button
            onClick={signOutHandler}
            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]"
            title="Sign Out"
          >
            <p className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <FontAwesomeIcon
                className="text-base"
                icon={faRightFromBracket}
                style={{ color: '#191919' }}
              />
            </p>
          </button>
        </Fade>
      </div>

      <div className="pt-8 ml-12 sm:ml-14 lg:ml-[72px]">
        <Fade
          delay={1e1}
          duration={2000}
          direction={'down'}
          triggerOnce={true}
          damping={1e-1}
        >
          <div>
            <h2 className="ml-5 mb-4 py-2 w-[280px] sm:w-[350px] xl:w-[400px] text-center px-4 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Welcome, chibarage@gmail.com
            </h2>
          </div>
          <div className="flex justify-between mx-5 min-[600px]:mx-10 mb-6 ">
            <input
              type="text"
              className="placeholder-[#191919] px-4 lg:py-4 lg:px-6 py-2 w-32 min-[500px]:w-48 md:w-64 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
              placeholder="🔍 License plate"
              value={searchPlate}
              onChange={onChangeSearchPlateHandler}
            />
            <input
              type="text"
              className="placeholder-[#191919] px-4 lg:py-4 lg:px-6 py-2 w-32 min-[500px]:w-48 md:w-64 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
              placeholder="🔍 Car's Brand"
              value={searchBrand}
              onChange={onChangeSearchBrandHandler}
            />
          </div>
        </Fade>
        <Fade delay={1e1} direction={'down'} triggerOnce={true} damping={1e-1}>
          <div className="flex flex-col justify-start md:justify-between md:flex-row">
            <h1 className="py-2 flex items-center justify-center mb-4 w-64 lg:w-[240px] xl:w-[320px] text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Registered Cars
            </h1>
            <div className="mb-4 ml-5 w-64 min-[600px]:ml-10 lg:w-[320px]  flex justify-center items-center sm:mr-8 py-2 px-4 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              <input
                type="checkbox"
                className="mr-2"
                checked={showIssuedOnly}
                onChange={onChangeCheckboxHandler}
              />
              <h2 className="inline text-lg font-medium text-center xl:text-xl">
                Show Issued Cars Only
              </h2>
            </div>
          </div>
          <h2 className="mt-4 py-2 w-[270px] xl:w-[336px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Currently, there {filteredCars.length === 1 ? 'is' : 'are'}{' '}
            {filteredCars.length} {filteredCars.length === 1 ? 'Car' : 'Cars'}
          </h2>
        </Fade>

        <Fade delay={1e1} triggerOnce={false} damping={1e-1} duration={2000}>
          <div className="flex flex-col flex-grow px-5 mb-6 md:px-12 min-[600px]:flex-row min-[600px]:flex-wrap min-[600px]:justify-start">
            {filteredCars.map((car) => {
              let parsedPlateBrand = JSON.parse(car.plate_brand);
              return (
                <div
                  key={uuidv4()}
                  onClick={() => (window.location.href = `/app/${car._id}`)}
                  className="hover:cursor-pointer mx-2 px-8 py-6 lg:py-8 mt-6 flex flex-col max-w-[300px] min-[600px]:w-[300px] font-medium backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-[#191919] min-[600px]:text-xl xl:text-2xl">
                        {parsedPlateBrand[0]}
                      </h1>
                      <h1 className="text-[#191919]">{parsedPlateBrand[1]}</h1>
                    </div>

                    <div>
                      <FaCircle
                        className={
                          car.is_active ? 'text-[#20F95D]' : 'text-[#e64040]'
                        }
                        title="isActive"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <a
                      href={`/app/${car._id}/notifications`}
                      className="relative"
                    >
                      <FaBell className="text-[#191919] hover:text-white hover:bg-[rgba(25,25,25,0.90)] text-lg w-10 h-10 p-2 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]" />
                      <div
                        className={
                          displayCountIfFixedFalse(
                            wholeNotifications,
                            car._id
                          ) === null
                            ? 'absolute top-1 left-5 text-[#191919] w-5 h-5 rounded-full  border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-transparent'
                            : 'absolute top-1 left-5 text-[#191919] w-5 h-5 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,0,0,0.90)]'
                        }
                      >
                        <div className="relative">
                          <p className="absolute top-[-1px]  lg:top-0 left-1/2 transform -translate-x-1/2 text-sm">
                            {displayCountIfFixedFalse(
                              wholeNotifications,
                              car._id
                            )}
                          </p>
                        </div>
                      </div>
                    </a>
                    <button
                      className=" hover:bg-[rgba(25,25,25,0.90)] text-[#191919] hover:text-white ml-4 sm:text-xl lg:text-2xl w-10 h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]"
                      onClick={(e) => editCarPlateBrand(e, car._id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="hover:bg-[rgba(25,25,25,0.90)] text-[#191919] hover:text-white ml-4 sm:text-xl lg:text-2xl w-10 h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]"
                      onClick={(e) => deleteCarPlateBrand(e, car._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default RegisteredCars;
