import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../routes/auth';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import loginService from '../../services/login';

export default function LoginForm({onClose}) {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    sendLoginForm();
  };

  const sendLoginForm = async () => {
    console.log('Enviando formulario de login');
  
    const credentials = {
      username,
      password
    };
   
    try {
      const data = await loginService(credentials);
      if (data.success) {
        console.log('Respuesta del servicio de login:', data);
        auth.login(() => {
          navigate('/dashboard'); // Redirige al usuario al Dashboard
        });
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.log("🚀 ~ sendLoginForm ~ error:", error)
      console.error('Error al intentar iniciar sesión:', error);
    }
  };

  // Cierra el modal con un click fuera
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
       <Card className='bg-white w-3/5 lg:w-1/3 h-[55vh] overflow-y-auto py-10 lg:p-12 rounded-md' shadow={false} ref={modalRef}>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col w-3/5 max-w-screen-lg'>
            <Typography variant="h4" color="blue-gray" className='text-xl mb-5 font-filson-soft'>
              Login
            </Typography>
          </div>
          <form className="mt-8 mb-2 w-3/5 max-w-screen-lg" onSubmit={handleFormSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Usuario
              </Typography>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="name@mail.com"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Contraseña
              </Typography>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {loginError && (
              <div>
                <p className='text-[#ff2f2f]'>Credenciales incorrectas. Por favor intenta de nuevo</p>
              </div>
            )}
            <div className='flex justify-center'>
              <Button type="submit" className="mt-6 custom-gradient w-26 py-1" fullWidth>
                Iniciar sesión
              </Button>
            </div>
          </form>

        </div>
      </Card>
    );
}