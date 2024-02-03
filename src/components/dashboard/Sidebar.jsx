
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PymoLogo from "../../assets/logo_nombre_blanco.svg";
import auth from '../../routes/auth';
import { 
  TruckIcon, 
  HomeModernIcon, 
  ListBulletIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";

const links = [
  { name: 'Solicitudes', href: '/dashboard/hospitals', icon: ListBulletIcon },
  { name: 'Almacén', href: '/dashboard/warehouse', icon: HomeModernIcon },
  { name: 'Envíos', href: '/dashboard/shipments', icon: TruckIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = function() {
    auth.logout(() => {
      navigate('/')
    })
  }
  

  return (
    <>
      {/* Sidebar para pantallas grandes */}
      <aside className="hidden md:block absolute top-0 left-0 z-40 w-64 h-screen bg-gray-800 overflow-y-auto">
        <div className="px-3 py-4">
          <Link to={'/dashboard'}>
            <img src={PymoLogo} alt="PYMO logo" className="h-32 m-auto"/>
          </Link>
          <ul className="mt-4 space-y-2">
            {links.map((link) => {
              const isActive = location.pathname === link.href;
              const LinkIcon = link.icon;
              return (
                <li key={link.name}>
                  <Link to={link.href} className={`flex items-center p-2 text-base font-medium rounded-lg dark:text-white ${isActive ? 'bg-gray-900' : 'text-gray-400 hover:bg-gray-700'}`}>
                    <LinkIcon className="mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true"/>
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="absolute bottom-4 w-full px-3">
            <button onClick={handleLogout} className="flex items-center justify-center w-full p-2 text-base font-medium text-left text-gray-400 rounded-lg hover:bg-gray-700 dark:text-white">
              <ArrowLeftOnRectangleIcon className="mr-4 h-6 w-6" aria-hidden="true"/>
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Navbar para pantallas pequeñas */}
      <div className="md:hidden fixed top-0 left-0 z-50 w-full bg-gray-800">
        <div className="flex items-center justify-between px-4">
          <Link to={'/dashboard'}>
            <img src={PymoLogo} alt="PYMO logo" className="h-16"/>
          </Link>
          <nav className="flex">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link key={link.name} to={link.href} className="px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
                  <LinkIcon className="h-6 w-6" aria-hidden="true"/>
                </Link>
              );
            })}
            <button onClick={handleLogout} className="ml-3 p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white">
              <ArrowLeftOnRectangleIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}