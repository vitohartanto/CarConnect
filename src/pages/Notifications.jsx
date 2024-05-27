import Sidebar from '../components/Sidebar';
import { FaWrench } from 'react-icons/fa';
import carBackground from '../img/pageNotifications.png';
import { Fade } from 'react-awesome-reveal';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import collections from '../utils/hyperbase/hyperbaseCollections.json';
import { HyperbaseContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
import { showFormattedDate } from '../utils/additionalFunctions';
import { FaBell } from 'react-icons/fa';
import { descHowDoesTheNotificationWorkHandler } from '../utils/descriptionsHandler';
import { FaCheckCircle } from 'react-icons/fa';
import ImageBackground from '../components/ImageBackground';

const Notifications = () => {
  let notificationsResponseDummy = [
    {
      v_car_id: 456,
      v_id: uuidv4(),
      v_notifications: 'Short Term Fuel Trim is out of optimal range',
      v_timestamp: '2024-04-25 16:30:47.154876Z',
      v_fixed: false,
      v_update_at: '2024-04-25 16:30:47.154876Z',
    },

    {
      v_car_id: 268,
      v_id: uuidv4(),
      v_notifications: 'Long Term Fuel Trim is out of optimal range',
      v_fixed: true,
      v_timestamp: '2024-04-19 16:30:47.154876Z',
      v_updated_at: '2024-04-21 16:30:47.154876Z',
    },
  ];

  const [notificationsDummy, setNotificationsDummy] = useState(
    notificationsResponseDummy
  );
  const [notificationsCollection, setNotificationsCollection] = useState();
  const [notificationsReal, setNotificationsReal] = useState([]);

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

  const fetchAllNotifications = async () => {
    try {
      const notifications = await notificationsCollection.findMany({
        orders: [
          {
            field: '_id',
            kind: 'desc',
          },
        ],
        filters: [
          {
            field: 'car_id',
            op: '=',
            value: car_id,
          },
        ],
      });

      setNotificationsReal(notifications.data);
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

  let foundedCar = cars.find((car) => car._id === car_id);
  const plate = foundedCar ? JSON.parse(foundedCar.plate_brand)[0] : '';
  const brand = foundedCar ? JSON.parse(foundedCar.plate_brand)[1] : '';

  const alreadyFixedDummyHandler = (id) => {
    const currentDate = new Date();
    // Toggle the fixed status of the notification with the given id
    const updatedNotifications = notificationsDummy.map((notif) => {
      if (notif.v_id === id) {
        return { ...notif, v_fixed: !notif.v_fixed, v_updated_at: currentDate };
      }
      return notif;
    });
    setNotificationsDummy(updatedNotifications);
  };

  const handleRefresh = () => {
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href;
  };

  const alreadyFixedRealHandler = async (id) => {
    const currentDate = new Date();
    try {
      await notificationsCollection.updateOne(id, {
        fixed: true,
        fixed_at: currentDate,
      });
      await fetchAllNotifications();
      handleRefresh();
    } catch (err) {
      alert(`${err.status}\n${err.message}`);
    }
  };

  return (
    <div>
      <ImageBackground
        src={carBackground}
        hash="[F9j}|NxE1kCE2jZxWkC5AxatmX9}@WYNbjFcaR+rqt6I.xDR+W=xao#ozWqZ~NGtls.tRofV@Rj"
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
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-2 mb-4 w-64 xl:w-72 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Notifications
            </h1>
            <h1 className="py-2 mb-4 w-[280px] xl:w-[420px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Car - {plate} - {brand}
            </h1>
          </div>

          <div className="ml-5 min-[600px]:ml-10 flex mb-6 items-center">
            <button
              onClick={descHowDoesTheNotificationWorkHandler}
              className="mr-4 flex items-center px-4 py-2 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            >
              <FaBell className="min-w-6 text-[#191919] text-2xl" />
              <h1 className="text-[#191919] ml-3 font-medium">
                How do we detect?
              </h1>
            </button>
            <h1 className="text-lg xl:text-xl xl:w-72 px-4 py-2 w-48 min-[532px]:w-64 text-center font-medium  backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Active Issues: (Sample)
            </h1>
          </div>
        </Fade>
        <Fade delay={1e1} duration={2000} triggerOnce={true} damping={1e-1}>
          <div className="mx-4 sm:mx-10 ">
            {notificationsDummy
              .filter((notif) => !notif.v_fixed)
              .map((notif) => {
                return (
                  <div
                    key={notif.v_id}
                    className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FaWrench className="basis-12 text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-4 lg:mx-6" />
                      <div className="px-2">
                        <h2 className="text-sm font-medium md:text-base lg:text-lg">
                          {notif.v_notifications}
                        </h2>
                        <p className="mt-2 text-xs md:text-sm lg:text-base">
                          {showFormattedDate(notif.v_timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-2 basis-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]">
                      <button
                        className="flex items-center flex-col justify-center sm:flex-row"
                        onClick={() => alreadyFixedDummyHandler(notif.v_id)}
                      >
                        <FaCheckCircle className="text-[#191919] text-4xl sm:mr-2" />
                        <h1 className="text-[#191919] text-xs sm:text-sm md:text-base">
                          Already Fixed
                        </h1>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <h1 className="mt-6 text-lg xl:text-xl xl:w-72 px-4 py-2 w-48 min-[532px]:w-64  text-center font-medium ml-5 sm:ml-10 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Inactive Issues: (Sample)
          </h1>
          <div className="mx-4 sm:mx-10 ">
            {notificationsDummy
              .filter((notif) => notif.v_fixed)
              .map((notif) => {
                return (
                  <div
                    key={uuidv4()}
                    className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FaWrench className="basis-12 text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-4 lg:mx-6" />
                      <div className="px-2">
                        <h2 className="text-sm font-medium md:text-base lg:text-lg">
                          {notif.v_notifications}
                        </h2>
                        <p className="mt-2 text-xs md:text-sm lg:text-base">
                          {showFormattedDate(notif.v_timestamp)}
                        </p>
                        <p className="mt-2 text-xs font-medium md:text-sm lg:text-base">
                          Fixed at {showFormattedDate(notif.v_updated_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Fade>

        <Fade
          delay={1e1}
          duration={2000}
          direction={'up'}
          triggerOnce={true}
          damping={1e-1}
        >
          <h1 className="mt-6 text-lg xl:text-xl xl:w-64 px-4 py-2 w-56 text-center font-medium ml-5 sm:ml-10 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Real Active Issues:
          </h1>
          <div className="mx-4 sm:mx-10 mb-6">
            {notificationsReal
              .filter((notif) => !notif.fixed)
              .map((notif) => {
                return (
                  <div
                    key={notif._id}
                    className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FaWrench className="basis-12 text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-4 lg:mx-6" />
                      <div className="px-2">
                        <h2 className="text-sm font-medium md:text-base lg:text-lg">
                          {notif.notifications}
                        </h2>
                        <p className="mt-2 text-xs md:text-sm lg:text-base">
                          {showFormattedDate(notif.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-2 basis-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]">
                      <button
                        className="flex items-center flex-col justify-center sm:flex-row"
                        onClick={() => alreadyFixedRealHandler(notif._id)}
                      >
                        <FaCheckCircle className="text-[#191919] text-4xl sm:mr-2" />
                        <h1 className="text-[#191919] text-xs sm:text-sm md:text-base">
                          Already Fixed
                        </h1>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <h1 className="mt-6 text-lg xl:text-xl xl:w-72 px-4 py-2 w-48 min-[532px]:w-64  text-center font-medium ml-5 sm:ml-10 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            Real Inactive Issues:
          </h1>
          <div className="mx-4 sm:mx-10 mb-6">
            {notificationsReal
              .filter((notif) => notif.fixed)
              .map((notif) => {
                return (
                  <div
                    key={uuidv4()}
                    className="mt-4 lg:mt-6 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)] px-4 py-4 md:py-6 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FaWrench className="basis-12 text-[#FFF] text-3xl md:text-4xl lg:text-5xl w-16 mr-4 lg:mx-6" />
                      <div className="px-2">
                        <h2 className="text-sm font-medium md:text-base lg:text-lg">
                          {notif.notifications}
                        </h2>
                        <p className="mt-2 text-xs md:text-sm lg:text-base">
                          {showFormattedDate(notif.timestamp)}
                        </p>
                        <p className="mt-2 text-xs font-medium md:text-sm lg:text-base">
                          Fixed at {showFormattedDate(notif.fixed_at)}
                        </p>
                      </div>
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

export default Notifications;
