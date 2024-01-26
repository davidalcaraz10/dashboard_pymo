import { useLocation } from 'react-router-dom';
import Sidebar from "../components/dashboard/Sidebar";
import degradadoAzul from "../assets/degradado_azul.png";
import logoBlanco from "../assets/logo_nombre_blanco.svg";
import Hospitals from "./Hospitals"
import Warehouse from './Warehouse';
import Shipments from './Shipments';

export default function Dashboard() {
  const location = useLocation();

  return (
    <div className='flex h-screen'>
      <Sidebar className="w-64"/>
      <div className="flex-grow">
        {location.pathname === '/dashboard/hospitals' && (
          <Hospitals/>
        )}
        {location.pathname === '/dashboard/warehouse' && (
          <Warehouse/>
        )}
        {location.pathname === '/dashboard/shipments' && (
          <Shipments/>
        )}
        {location.pathname === '/dashboard' && (
          <div className="flex-grow flex items-center justify-center h-screen">
            <div className="relative text-center h-screen w-full">
              <img src={degradadoAzul} alt="Fondo" className="w-full h-full object-cover" />
              <img 
                src={logoBlanco} 
                alt="Dashboard" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                style={{ maxWidth: '80%', maxHeight: '80%' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}