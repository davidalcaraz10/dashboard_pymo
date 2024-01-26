
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
      <aside id="default-sidebar" className="absolute top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link to={'/dashboard'}>
                  <img 
                    src={PymoLogo}
                    alt="PYMO logo"
                    className="h-32 m-auto"
                  />
                </Link>
              </li>
              {links.map((link) => {
                const LinkIcon = link.icon;
                const isActive = location.pathname === link.href;
                return(
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center p-2 rounded-lg dark:text-white group 
                      ${isActive ? 'custom-gradient text-white' : 'text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <LinkIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
                    <span className="ms-3 font-filson-soft">{link.name}</span>
                  </Link>
                )
              })}
            </ul>
            <div className="absolute bottom-2 w-11/12">
              <button onClick={handleLogout} 
                className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white 
              hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500"/>
                <span className="ms-3">Cerrar sesión</span>
              </button>
            </div>
        </div>
      </aside>
    </>
  )
}
