import { useEffect, useState } from "react";
import moment from "moment";
import getHospitals from "../services/getHospitals";
import getInventory from '../services/getInventory';
import getAssignments from "../services/getAssignments";
import AllocateSupplies from "../components/dashboard/AllocateSuppliesModal";

export default function Hospitals() {
  const [allHospitalsInfo, setAllHospitalInfo] = useState({ data: [] });
  const [inventoryData, setInventoryData] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [activeHospitalId, setActiveHospitalId] = useState(null);
  const [hospitalViability, setHospitalViability] = useState([]);
  const [openAllocateModal, setOpenAllocateModal] = useState(null);
  const [actualHospital, setActualHospital] = useState({});
  const [assignments, setAssignments] = useState([]);

  useEffect (() => {
    getAllHospitals();
    getTotalInventory();
  }, []);

  useEffect(() => {
    if (allHospitalsInfo.data.length > 0 && inventoryData.length > 0) {
      calculateViability();
    }
    checkAssignments();
  }, [allHospitalsInfo, inventoryData])
  

  const getTotalInventory = async () => {
    try {
      const resp = await getInventory();
      if(resp.success) {
        setInventoryData(resp.rows);
      }
    } catch (error) {
        console.log('hubo un error', error);
    }
  }

  // Calcula a que hospital se le puede suministrar la cantidad de materiales que necesita
  const calculateViability = () => {
    const totalAvailable = inventoryData.reduce((acc, item) => {
      acc[item.type] = item.available_quantity;
      return acc;
    }, {});

    const viabilityData = allHospitalsInfo.data.map(hospital => {
      const isViable = hospital.num_face_masks <= (totalAvailable['face_masks'] || 0) &&
                       hospital.num_kn95_masks <= (totalAvailable['kn95_masks'] || 0) &&
                       hospital.num_face_shields <= (totalAvailable['face_shield'] || 0);
  
      return {
        hospital_id: hospital.hospital_id,
        isViable
      };
    });
  
    setHospitalViability(viabilityData);
  };

  const toggleDropdown = (hospitalId) => {
    if (openDropdownId === hospitalId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(hospitalId);
    }
  };

  const getAllHospitals = async function() {
    const hospitalsInfo = await getHospitals();
    hospitalsInfo.data.sort((a, b) => b.number_of_cases - a.number_of_cases);
    setAllHospitalInfo(hospitalsInfo);
  }

  const checkAssignments = async () => {
    const allAssignments = await Promise.all(
      allHospitalsInfo.data.map(hospital =>
        getAssignments(hospital.hospital_id)
      )
    );

    const assignmentsByHospital = allAssignments.reduce((acc, current, index) => {
      const hospitalId = allHospitalsInfo.data[index].hospital_id;
      acc[hospitalId] = current.success && current.data.length > 0;
      return acc;
    }, {});

    setAssignments(assignmentsByHospital);
  };

  const toggleActiveHospital = (hospitalId) => {
    setActiveHospitalId(activeHospitalId === hospitalId ? null : hospitalId);
  };

  const modalAllocateSupplies = (hospital) => {
    setOpenAllocateModal(true);
    setActualHospital(hospital);
  } 

  const renderHospitalDetails = (hospital) => {
    const detailsToRender = {
      'Ubicación': hospital.address,
      'Número de Casos (último mes)': hospital.number_of_cases,
      'Número de Mascarillas': hospital.num_face_masks,
      'Número de Caretas': hospital.num_face_shields,
      'Número de Mascarillas KN95': hospital.num_kn95_masks,
      'Fecha de Registro': moment(hospital.registered_date).format('DD/MM/YYYY'),
      'Fecha de Solicitud': moment(hospital.request_date).format('DD/MM/YYYY'),
    };
    const showAllocateButton = !assignments[hospital.hospital_id];
    return (
      <div className="max-h-[calc(100vh-100px)] overflow-y-auto rounded-md">
        <div className="flex w-full justify-end mt-2">
        {showAllocateButton && (
          <button 
            onClick={() => modalAllocateSupplies(hospital)}  
            className="bg-[#5C7DF3] w-26p px-3 py-1 mb-2 rounded-md text-white font-bold"
          >
            Asignar Suministros
          </button>
        )}
        </div>
        <table className="min-w-full">
          <tbody className="divide-y divide-gray-200">
            {Object.entries(detailsToRender).map(([key, value], index) => (
              <tr key={key} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-agora">
                  {key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-agora">
                  {value}
                </td>
              </tr>
            ))}
            <tr className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-agora">
                Documento Identidad Legal
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <a href={hospital.legal_identity} target="_blank" rel="noopener noreferrer" className="text-[#1D22DC] font-bold font-agora">
                  Ver documento
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderHospitalRow = (hospital) => {
    // Encuentra la viabilidad y la asignación de este hospital
    const viability = hospitalViability.find(v => v.hospital_id === hospital.hospital_id) || {};
    const hasAssignment = assignments[hospital.hospital_id];

    // Decide qué texto mostrar
    let statusText;
    if (hasAssignment) {
      statusText = <span className="ml-5 text-blue-600 text-sm">Asignado</span>;
    } else if (viability.isViable !== undefined) {
      statusText = viability.isViable
        ? <span className="ml-5 text-green-600 text-sm">Viable</span>
        : <span className="ml-5 text-red-600 text-sm">Recursos insuficientes</span>;
    }

    return (
      <div key={hospital.hospital_id} className="border rounded-md mb-4">
        <button
          onClick={() => toggleActiveHospital(hospital.hospital_id)}
          className={`text-xl font-filson-soft font-semibold w-full text-left p-4 rounded-md 
            ${activeHospitalId === hospital.hospital_id ? 'custom-gradient text-white' : 'bg-white text-black'}`}
        >
          {hospital.name}
          {statusText}
        </button>
        {activeHospitalId === hospital.hospital_id && renderHospitalDetails(hospital)}
      </div>
    );
  };

  // Render del componente
  return (
    <section className="flex flex-col items-start md:pl-64 pt-16 h-screen overflow-y-auto">
      <div className="flex justify-start pl-24">
        <h1 className="text-black font-filson-soft text-3xl">Solicitudes de Hospitales</h1>
      </div>
      <div className="flex justify-start pl-24 pt-2">
        <p className="text-gray-400">
          Las solicitudes se muestran conforme al mayor número de casos registrados el último mes.
        </p>
      </div>
      <div className="flex justify-start pl-24 pt-2">
        <p className="text-gray-400 text-sm">
          *Las refrencias 'Viable' o 'Recursos insuficientes' indican si se cuenta con la cantidad de suministros suficientes o no de acuerdo a la necesidad de cada hospital.
        </p>
      </div>

      <div className="pl-24 w-full mt-6">
        <div className="bg-slate-100 rounded-md flex flex-col justify-center w-11/12 p-6">
          {allHospitalsInfo.data.map(renderHospitalRow)}
        </div>
      </div>
      {openAllocateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
          <AllocateSupplies 
            hospital={actualHospital} 
            inventory={inventoryData}
            assignmentsReload={() => checkAssignments()} 
            onClose={() => setOpenAllocateModal(false)}
          />
        </div>
      )}
    </section>
  );
}