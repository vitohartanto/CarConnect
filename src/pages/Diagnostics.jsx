import Sidebar from "../components/Sidebar";
import { DtcContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import carBackground from "../pageDiagnostics.png";
import { FaCode } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import {
  descWhatIsDTCHandler,
  descWhyIsMyDTCEmpty,
} from "../utils/descriptionsHandler";
import { Fade } from "react-awesome-reveal";
import { HyperbaseContext } from "../App";
import collections from "../utils/hyperbase/hyperbaseCollections.json";
import { useParams } from "react-router-dom";

function Diagnostics() {
  const dtcResponse = useContext(DtcContext);

  const { car_id } = useParams();
  const hyperbase = useContext(HyperbaseContext);
  const [carsCollection, setCarsCollection] = useState();
  const [cars, setCars] = useState([]);

  // let dtcResponse = {
  //   v_car_id: 456,
  //   v_value: [
  //     ["P0104", "Mass or Volume Air Flow Circuit Intermittent"],
  //     ["B0003", ""],
  //     ["C0123", ""],
  //   ],
  //   v_timestamp: "2024-04-07 16:30:47.154876Z",
  // };

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

  let foundedCar = cars.find((car) => car._id === car_id);
  const plate = foundedCar ? JSON.parse(foundedCar.plate_brand)[0] : "";
  const brand = foundedCar ? JSON.parse(foundedCar.plate_brand)[1] : "";

  return (
    <div>
      <img
        src={carBackground}
        alt=""
        className="fixed w-screen h-screen z-[-100]"
      />
      <Sidebar />
      <div className="ml-12  pt-8 pr-8 lg:ml-[72px]">
        <Fade
          delay={1e1}
          duration={2000}
          direction={"down"}
          triggerOnce={true}
          damping={1e-1}
        >
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="py-2 mb-4 w-32 xl:w-64 text-center px-4 ml-5 min-[600px]:ml-10 text-2xl font-bold xl:text-3xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              DTC
            </h1>
            <h1 className="py-2 mb-4 w-[280px] xl:w-[420px] text-center px-4 ml-5 min-[600px]:ml-10 text-lg font-medium xl:text-xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
              Car - {plate} - {brand}
            </h1>
          </div>

          <div className="ml-5 min-[600px]:ml-10 flex mb-6">
            <button
              onClick={descWhatIsDTCHandler}
              className="mr-4 flex items-center px-4 py-2 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            >
              <FaCode className="min-w-6 text-[#191919] text-2xl" />
              <h1 className="text-[#191919] ml-3 font-medium">What is DTC?</h1>
            </button>
            <button
              onClick={descWhyIsMyDTCEmpty}
              className="flex items-center px-4 py-2 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            >
              <BsFillQuestionCircleFill className="min-w-6 text-[#191919] text-2xl" />
              <h1 className="text-[#191919] ml-3 font-medium">
                Why is my DTC empty?
              </h1>
            </button>
          </div>
        </Fade>

        <Fade
          delay={1e1}
          duration={2000}
          direction={"up"}
          triggerOnce={true}
          damping={1e-1}
        >
          <div className="max-w-[640px] pb-10 md:mt-10 p-4 ml-5 min-[600px]:ml-10 mb-10 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
            <h1 className="text-2xl font-bold text-center  md:text-3xl">
              Your Car&apos;s DTC
            </h1>
            <table className="md:mt-4 xl:mt-4 text-[#fff] text-center text-base md:text-lg xl:text-xl m-auto">
              <thead className="border-t-2  border-b-2 border-[#fff]">
                <tr>
                  <th>
                    <h1 className="px-4 py-2 text-lg font-semibold md:text-xl xl:text-2xl">
                      DTC
                    </h1>
                  </th>
                  <th>
                    <h1 className="px-4 py-2 text-lg font-semibold md:text-xl xl:text-2xl">
                      Description
                    </h1>
                  </th>
                </tr>
              </thead>
              <tbody className="text-base md:text-lg xl:text-xl">
                {dtcResponse &&
                  dtcResponse.v_value.map((dtcArray) => {
                    return (
                      <tr key={uuidv4()}>
                        <td className="p-2">{dtcArray[0]}</td>
                        <td className="p-2">{dtcArray[1]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Diagnostics;
