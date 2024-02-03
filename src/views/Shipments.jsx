import { useEffect, useState } from "react";
import generalAssignments from "../services/generalAssignments";
import getHospitals from "../services/getHospitals";
import setShipment from "../services/setShipment";
import getShipments from "../services/getAllShipments";

export default function Shipments() {
  const [assignments, setAssignments] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospitalAssignments, setHospitalAssignments] = useState({});
  const [activeView, setActiveView] = useState('assignments');
  const [shipmentError, setShipmentError] = useState(null);
  const [hospitalShipments, setHospitalShipments] = useState({});

  const getAssignments = async () => {
    const resp = await generalAssignments();
    setAssignments(resp.assignments);
  }

  const getAllShipments = async () => {
    const resp = await getShipments();
    setShipments(resp.shipments);
  }

  const getAllHospitals = async () => {
    const resp = await getHospitals();
    setHospitals(resp.data)
  }

  useEffect(() => {
    getAssignments();
    getAllHospitals();
    getAllShipments();
  }, []);

  // Agrupa las asignaciones
  useEffect(() => {
    const groupAssignmentsByHospital = () => {
      const grouped = assignments.reduce((acc, assignment) => {
        if (!acc[assignment.hospital_id]) {
          acc[assignment.hospital_id] = [];
        }
        acc[assignment.hospital_id].push(assignment);
        return acc;
      }, {});
  
      setHospitalAssignments(grouped);
    };
  
    if (assignments.length > 0 && hospitals.length > 0) {
      groupAssignmentsByHospital();
    }
  }, [assignments, hospitals]);

  const hospitalsWithShipments = new Set(shipments.map(shipment => shipment.hospital_id));

  // Agrupa los envíos
  useEffect(() => {
    const groupShipmentsByHospital = () => {
      const grouped = shipments.reduce((acc, shipment) => {
        if (!acc[shipment.hospital_id]) {
          acc[shipment.hospital_id] = {
            hospitalName: shipment.hospital_name,
            hospitalAddress: shipment.hospital_address,
            shipments: []
          };
        }
        acc[shipment.hospital_id].shipments.push(shipment);
        return acc;
      }, {});
    
      setHospitalShipments(grouped);
    };
    
    if (shipments.length > 0) {
      groupShipmentsByHospital();
    }
  }, [shipments]);
  
  // Genera un envío
  async function handleShipment(hospitalId) {
    const assignmentsToShip = hospitalAssignments[hospitalId];
    assignmentsToShip.forEach(async (assignment) => {
      const shipmentData = {
        assignment_id: assignment.assignment_id,
        delivery_date: new Date().toISOString(),
        delivered_quantity: assignment.assigned_quantity,
      };
      try {
        const resp = await setShipment(shipmentData);
        if(resp.success) {
          alert('envío generado correctamente');
          window.location.reload();
        }
      } catch (error) {
        setShipmentError(true)
        console.error('Error al realizar el envío:', error);
      }
    });
  }

  const getItemName = (itemId) => {
    const itemNames = {
      1: 'Cubrebocas',
      2: 'Mascarilla KN95',
      3: 'Careta'
    };
    return itemNames[itemId] || 'Suministro Desconocido';
  };

  const itemRename = (itemType) => {
    const itemRenames = {
      'face_masks': 'Cubrebocas',
      'kn95_masks': 'Mascarilla KN95',
      'face_shield': 'Careta'
    };
    return itemRenames[itemType] || 'Suministro Desconocido';
  }
  
  // Renderiza las asignaciones por hospital
  const renderAssignments = () => {
    const hospitalsReverse = hospitals
      .filter(hospital => hospitalAssignments[hospital.hospital_id] && hospitalAssignments[hospital.hospital_id].length > 0)
      .reverse();
    return (
      <div className="md:pl-24 w-10/12 rounded-md bg-gray-50 my-4 mx-auto">
        {hospitalsReverse.filter(hospital => hospitalAssignments[hospital.hospital_id] && hospitalAssignments[hospital.hospital_id].length > 0).map((hospital) => {
          const hospitalAssigns = hospitalAssignments[hospital.hospital_id];
          const hospitalHasShipment = hospitalsWithShipments.has(hospital.hospital_id);
          return (
            <div key={hospital.hospital_id} className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-filson-soft py-3 mr-4">{hospital.name}</h2>
                {!hospitalHasShipment && (
                  <button 
                    onClick={() => handleShipment(hospital.hospital_id)} 
                    className="custom-gradient px-2 h-8 mr-4 rounded-md text-white font-filson-soft font-semibold"
                  >
                    Hacer envío
                  </button>
                )}
              </div>
              <table className="min-w-full divide-y divide-gray-300 rounded-md">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Suministro
                    </th>
                    <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad Asignada
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hospitalAssigns.map((assignment) => (
                    <tr key={assignment.assignment_id}>
                      <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getItemName(assignment.item_id)}
                      </td>
                      <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assignment.assigned_quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  };

  // Cambia la vista activa
  const toggleView = (view) => {
    setActiveView(view);
  }

  // Renderiza los envíos
  const renderShipments = () => {
    return Object.values(hospitalShipments).map(hospital => (
      <div key={hospital.hospitalName} className="md:pl-24 w-10/12 rounded-md bg-gray-50 my-4 mx-auto">
        <h2 className="text-xl font-filson-soft py-3 mr-4">{hospital.hospitalName}</h2>
        <table className="min-w-full divide-y divide-gray-300 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Suministro
              </th>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad Asignada
              </th>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de Envío
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hospital.shipments.map((shipment, index) => (
              <tr key={index}>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {itemRename(shipment.item_type)}
                </td>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {shipment.delivered_quantity}
                </td>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hospital.hospitalAddress}
                </td>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(shipment.delivery_date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  // Renderizado condicional basado en la vista activa
  const renderActiveView = () => {
    if (activeView === 'assignments') {
      return renderAssignments();
    } else if (activeView === 'shipments') {
      return renderShipments();
    }
  };
  
  return (
    <section className="flex flex-col items-start md:pl-64 pt-16 h-screen overflow-y-auto">
      <div className="flex justify-start pl-24">
        <h1 className="text-black font-filson-soft text-3xl">Envío y asignación de suministros</h1>
      </div>

      <div className="flex pl-24 w-10/12 mt-12">
        <button 
          onClick={() => toggleView('assignments')}
          className={`mr-4 rounded-md text-white font-bold font-filson-soft py-1 px-3 ${activeView === 'assignments' ? 'bg-[#5C7DF3]' : 'bg-gray-300'}`}
        >
          Asignaciones
        </button>
        <button 
          onClick={() => toggleView('shipments')}
          className={`rounded-md text-white font-bold font-filson-soft py-1 px-3 ${activeView === 'shipments' ? 'bg-[#5C7DF3]' : 'bg-gray-300'}`}
        >
          Envíos
        </button>
      </div>
      {renderActiveView()} 
    
    </section>
  )
}