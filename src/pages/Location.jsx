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
  const navigate = useNavigate();
  const publicFacilities = [
    {
      _id: '123',
      name: 'town hall',
      typology: 'office',
      coordinates: [-7.698259, 110.433832],
    },
    {
      _id: '234',
      name: 'town hall 2',
      typology: 'sports',
      coordinates: [-7.696242, 110.435832],
    },
    {
      _id: '456789',
      name: 'town hall',
      typology: 'office',
      coordinates: [-7.698226, 110.436832],
    },
  ];

  let uniquePublicFacilities = [
    ...new Map(
      publicFacilities.map((item) => [
        item.typology,
        {
          ...item,
          coordinates: publicFacilities
            .filter(({ typology }) => typology === item.typology)
            .map(({ coordinates }) => coordinates),
        },
      ])
    ).values(),
  ];

  // Collect all coordinates for setting bounds
  const bounds = publicFacilities.map((facility) => facility.coordinates);

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
      <div className="ml-12 sm:ml-16 sm:ml-20">
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
            {uniquePublicFacilities.map((facility) => (
              <LayersControl.Overlay
                key={facility.typology}
                checked
                name={facility.typology}
              >
                <FeatureGroup>
                  {facility.coordinates.map((latlng, index) => (
                    <Marker key={index} position={latlng}>
                      <Popup>
                        AB 1911 TE <br />
                        Mazda Sedan 2 <br />
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
