import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { HyperbaseContext } from "./App";
import collections from "./utils/hyperbase/hyperbaseCollections.json";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AvailableCars = () => {
  const hyperbase = useContext(HyperbaseContext);

  const [carsCollection, setCarsCollection] = useState();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (hyperbase.isLoading) return;

    (async () => {
      try {
        const carCollections = await hyperbase.newCollection(collections.cars);
        setCarsCollection(carCollections);
        const cars = await carCollections.findMany();
        setCars(cars.data);
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
        return;
      }
    })();
  }, [hyperbase, hyperbase.isLoading]);

  const signOut = (e) => {
    e.stopPropagation();
    hyperbase.signOut();
  };

  const addCarLicencePlate = async () => {
    const { value: licence_plate } = await Swal.fire({
      title: "Enter Car's Licence Plate",
      inputPlaceholder: "e.g. B 1234 VH",
      input: "text",
      color: "#233163",
      background: "#F1F1FB",

      cancelButtonColor: "#d33",
      confirmButtonColor: "#233163",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    console.log(licence_plate);
    setCars([...cars, { licence_plate }]);
  };

  const editCarLicencePlate = async () => {
    const { value: licence_plate_corrected } = await Swal.fire({
      title: "Edit Car's Licence Plate",
      inputPlaceholder: "e.g. B 1234 VH",
      input: "text",
      color: "#233163",
      background: "#F1F1FB",

      cancelButtonColor: "#d33",
      confirmButtonColor: "#233163",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });
    console.log(licence_plate_corrected);
    // setCars([...cars, { licence_plate }]);
  };

  const deleteCarLicencePlate = async () => {
    const { value: removed } = await Swal.fire({
      title: "Delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#233163",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#233163",
    });
    // console.log(removed);
    // if (removed == true) {
    //   removeComponentById(componentObject.id, selectedComponents);
    // }
  };

  // const removeComponentById = (componentId, array) => {
  //   let updatedComponents = array.filter((item) => item.id !== componentId);
  //   setSelectedComponents(updatedComponents);
  // };

  return (
    <div>
      <div className="w-12 fixed h-screen bg-[#233163] flex items-center justify-between flex-col py-10">
        <button onClick={addCarLicencePlate} className="text-4xl text-white">
          +
        </button>
        <button onClick={signOut}>
          <FontAwesomeIcon
            className="text-2xl"
            icon={faRightFromBracket}
            style={{ color: "#FFF" }}
          />
        </button>
      </div>
      <div className="ml-12 ">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold  pt-8 ml-12">
          Available Cars
        </h1>
        <div className="px-6 md:px-12">
          {cars.map((car) => (
            <a
              key={car._id}
              href={`/app/${car._id}`}
              className="shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] px-8 py-4 lg:py-8 rounded-2xl mt-6 flex justify-between font-medium w-full"
            >
              <h1 className=" md:text-xl xl:text-2xl">{car.licence_plate}</h1>
              <div>
                <button
                  className="mx-4 sm:text-xl lg:text-2xl"
                  onClick={editCarLicencePlate}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#233163" }}
                  />
                </button>
                <button
                  className="mx-4 sm:text-xl lg:text-2xl"
                  onClick={deleteCarLicencePlate}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#233163" }}
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

export default AvailableCars;
