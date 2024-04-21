import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaBell, FaCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { HyperbaseContext } from "../App";
import collections from "../utils/hyperbase/hyperbaseCollections.json";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import carBackground from "../pageRegisteredCars.png";

const RegisteredCars = () => {
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
  }, [hyperbase, hyperbase.isLoading]);

  useEffect(() => {
    if (!carsCollection) return;
    fetchAllCars();
  }, [carsCollection]);

  // const signOut = (e) => {
  //   e.stopPropagation();
  //   hyperbase.signOut();
  // };

  const signOutHandler = async (event) => {
    // Assuming event is passed from an event listener
    event.preventDefault();

    const { value: removed } = await Swal.fire({
      title: "Do you want to Sign Out?",
      background: "rgba(25,25,25,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16db3d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
      color: "#fff",
    });

    // Your remaining code
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
            field: "_id",
            kind: "asc",
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
        console.log("Subscribe cars status open:", e);
      },
      onErrorCallback: (e) => {
        console.log("Subscribe cars status error:", e);
      },
      onCloseCallback: (e) => {
        console.log("Subscribe cars status close:", e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribe(carsCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        console.log("Subscribe cars status message:", e);
      },
    });

    return () => carsCollection.unsubscribe(1000);
  };

  const addCarLicensePlate = async () => {
    const { value: license_plate } = await Swal.fire({
      title: "Enter Car's License Plate",
      inputPlaceholder: "e.g. B 1234 VH",
      input: "text",
      color: "#fff",
      background: "rgba(25,25,25,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#16db3d",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (license_plate) {
      try {
        await carsCollection.insertOne({
          user_id: hyperbase.user._id,
          license_plate,
        });
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const editCarLicensePlate = async (event, id) => {
    event.preventDefault();
    const { value: license_plate_corrected } = await Swal.fire({
      title: "Edit Car's License Plate",
      inputPlaceholder: "e.g. B 1234 VH",
      input: "text",
      color: "#fff",
      background: "rgba(25,25,25,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,

      cancelButtonColor: "#d33",
      confirmButtonColor: "#16db3d",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (license_plate_corrected) {
      try {
        await carsCollection.updateOne(id, {
          license_plate: license_plate_corrected,
        });
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const deleteCarLicensePlate = async (event, id) => {
    // Assuming event is passed from an event listener
    event.preventDefault();

    const { value: removed } = await Swal.fire({
      title: "Delete this?",
      background: "rgba(25,25,25,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16db3d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#fff",
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

  return (
    <div className="">
      <img src={carBackground} alt="" className="fixed w-screen h-screen" />
      <div className="w-12 sm:w-16 lg:w-20 fixed h-screen backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(25,25,25,0.90)] flex items-center justify-between flex-col py-10">
        <button
          onClick={addCarLicensePlate}
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
              style={{ color: "#191919" }}
            />
          </p>
        </button>
      </div>
      <div className="pt-8 ml-12 sm:ml-14 lg:ml-[72px]">
        <div className="flex justify-between mx-5 min-[600px]:mx-10 mb-6 ">
          <input
            type="text"
            className="placeholder-[#191919] px-4 lg:py-4 lg:px-6 py-2 w-32 min-[500px]:w-48 md:w-64 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            placeholder="🔍 Car's license plate"
          />
          <input
            type="text"
            className="placeholder-[#191919] px-4 lg:py-4 lg:px-6 py-2 w-32 min-[500px]:w-48 md:w-64 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            placeholder="🔍 Car's brand"
          />
        </div>
        <h1 className="py-2 w-64 xl:w-96 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
          Registered Cars
        </h1>
        <h2 className="mt-4 py-2 w-[270px] xl:w-[336px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
          Currently, there are 3 Cars
        </h2>

        <div className="flex flex-col flex-grow px-5 mb-6 md:px-12 min-[600px]:flex-row min-[600px]:flex-wrap min-[600px]:justify-start">
          {cars.map((car) => (
            <a
              key={car._id}
              href={`/app/${car._id}`}
              className="mx-2 px-8 py-6 lg:py-8 mt-6 flex flex-col max-w-[300px] min-[600px]:w-[300px] font-medium backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-[#191919] min-[600px]:text-xl xl:text-2xl">
                    {car.license_plate}
                  </h1>
                  <h1 className="text-[#191919]">Mazda</h1>
                </div>

                <div>
                  <FaCircle className="text-[#20F95D]" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <a href={`/app/${car._id}/notifications`} className="relative">
                  <FaBell className="text-[#191919] text-lg w-10 h-10 p-2 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]" />
                  <div className="absolute top-1 left-5 text-[#191919] w-5 h-5 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,0,0,0.90)]">
                    <p className="absolute top-[-1px] left-[6px] text-sm">3</p>
                  </div>
                </a>
                <button
                  className="ml-4 sm:text-xl lg:text-2xl w-10 h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]"
                  onClick={(e) => editCarLicensePlate(e, car._id)}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#191919" }}
                  />
                </button>
                <button
                  className="ml-4 sm:text-xl lg:text-2xl w-10 h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]"
                  onClick={(e) => deleteCarLicensePlate(e, car._id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#191919" }}
                  />
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredCars;
