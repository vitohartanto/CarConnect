import Sidebar from "../components/Sidebar";
import { DtcContext } from "../App";
import { useContext } from "react";

function Diagnostics() {
  const dtcResponse = useContext(DtcContext);

  // let dtcResponse = [
  //   ("P0104", "Mass or Volume Air Flow Circuit Intermittent"),
  //   ("B0003", ""),
  //   ("C0123", ""),
  // ];

  // let dtcResponseStr = JSON.stringify(dtcResponse);

  // console.log(dtcResponse);

  return (
    <div>
      <Sidebar />
      <div className="ml-12">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold ml-5 sm:ml-10 pt-8">
          Diagnostic Trouble Code (DTC)
        </h1>
        <div className="lg:flex">
          <div className="flex flex-col p-4 lg:p-8 lg:ml-8 self-center">
            <h1 className="xl:pt-14 md:pt-10 text-center font-bold text-2xl md:text-3xl mt-4">
              Example
            </h1>
            <table className="md:mt-4 xl:mt-4 text-[#233163] text-center text-base md:text-lg xl:text-xl m-auto">
              <thead className="border-t-2  border-b-2 border-[#233163]">
                <tr>
                  <th>
                    <h1 className="text-lg md:text-xl xl:text-2xl font-semibold px-4 py-2">
                      DTC
                    </h1>
                  </th>
                  <th>
                    <h1 className="text-lg md:text-xl xl:text-2xl font-semibold px-4 py-2">
                      Description
                    </h1>
                  </th>
                </tr>
              </thead>
              <tbody className="text-base md:text-lg xl:text-xl">
                <tr>
                  <td className="px-4 py-2">P0104</td>
                  <td className="px-4 py-2">
                    Mass or Volume Air Flow Circuit Intermittent
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">B0003</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mx-5 sm:mx-10 self-center">
            <h2 className="my-5 text-justify text-base md:text-lg xl:text-xl">
              <span className="font-semibold">DTC</span> is a code generated by
              a vehicle&apos;s onboard diagnostic system (OBD) to indicate a
              specific problem or malfunction within the vehicle&apos;s systems.
            </h2>
            <h2 className="text-justify text-base md:text-lg xl:text-xl">
              <span className="font-semibold">If the DTC is empty,</span> it
              means your vehicle is working fine.
            </h2>
            <h2 className="mt-5 text-justify text-base md:text-lg xl:text-xl">
              <span className="font-semibold">
                If the DTC is filled (e.g., line 1),
              </span>{" "}
              the description field explains the Diagnostic Trouble Code.
            </h2>
            <h2 className="my-5 text-justify text-base md:text-lg xl:text-xl">
              <span className="font-semibold">
                If the DTC is not empty but the description field (e.g., line 2)
                contains nothing,
              </span>{" "}
              it indicates an unknown error code, likely a vehicle-specific DTC.
            </h2>
          </div>
        </div>

        <div className="p-4 mb-10">
          <h1 className="xl:mt-10 md:mt-10 text-center font-bold text-2xl md:text-3xl">
            Your Car&apos;s DTC
          </h1>
          <table className="md:mt-4 xl:mt-4 text-[#233163] text-center text-base md:text-lg xl:text-xl m-auto">
            <thead className="border-t-2  border-b-2 border-[#233163]">
              <tr>
                <th>
                  <h1 className="text-lg md:text-xl xl:text-2xl font-semibold px-4 py-2">
                    DTC
                  </h1>
                </th>
                <th>
                  <h1 className="text-lg md:text-xl xl:text-2xl font-semibold px-4 py-2">
                    Description
                  </h1>
                </th>
              </tr>
            </thead>
            <tbody className="text-base md:text-lg xl:text-xl">
              <tr>
                <td></td>
                <td>{dtcResponse}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Diagnostics;
