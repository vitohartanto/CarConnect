import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { HyperbaseContext } from "./App";
import collections from "./utils/hyperbase/hyperbaseCollections.json";

function AvailableCars() {
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

  return (
    <div>
      <div className="w-12 fixed h-screen bg-[#233163] flex items-center justify-center ">
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
              <h1 className=" md:text-xl xl:text-2xl">{car.name}</h1>
              <h1 className=" md:text-xl xl:text-2xl">Status: Connected</h1>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AvailableCars;
