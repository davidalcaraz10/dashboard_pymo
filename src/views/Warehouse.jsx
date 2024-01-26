import { useEffect, useState } from 'react';
import AddingModal from '../components/dashboard/AddingModal';
import getInventory from '../services/getInventory';

export default function Warehouse() {
  const [openModal, setOpenModal] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    getTotalInventory();
  }, [])

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

  // Asigna nombre dependiendo el tipo de suministro
  const translateType = (type) => {
    switch (type) {
      case 'face_masks':
        return 'Cubrebocas';
      case 'kn95_masks':
        return 'Mascarillas KN95';
      case 'face_shield':
        return 'Caretas';
      default:
        return type;
    }
  };


  return (
    <section className="flex flex-col items-start md:pl-64 pt-16">
      <div className="flex justify-start pl-24">
        <h1 className="text-black font-filson-soft text-3xl">Almacén y Suministros</h1>
      </div>

      <div className="relavite w-full mt-12">
        <button
          onClick={() => setOpenModal(true)} 
          className="absolute right-24 top-40 custom-gradient rounded-md text-white font-bold py-1 px-2">
          Agregar
        </button>
      </div>

      {openModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <AddingModal onClose={() => setOpenModal(false)} onAdded={getTotalInventory}/>
          </div>
        )}

      <div className="pl-24 w-10/12 mt-12">
        <table className="min-w-full divide-y divide-gray-300 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Suministro
              </th>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad Disponible
              </th>
              <th className="font-filson-soft px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventoryData.map((item) => (
              <tr key={item.item_id}>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {translateType(item.type)}
                </td>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.available_quantity}
                </td>
                <td className="font-agora px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.total_quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </section>
  )
}