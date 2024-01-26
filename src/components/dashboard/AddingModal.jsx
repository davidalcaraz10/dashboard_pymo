import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import addInventory from '../../services/addInventory';

export default function AddingModal({onClose, onAdded}) {
  const modalRef = useRef();
  const navigate = useNavigate();
  const [masks, setmasks] = useState(false);
  const [kn95, setkn95] = useState('');
  const [faceShield, setFaceShield] = useState('');
  const [addingError, setAddingError] = useState(false);
  const [addedSuccessfuly, setAddedSuccessfully] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    sendAddingForm();
  };

  const sendAddingForm = async () => {
    const supplies = { masks, kn95, faceShield };
   
    try {
      const data = await addInventory(supplies);
      if (data.success) {
        setAddingError(false);
        setAddedSuccessfully(true);
        onAdded()
      } else {
        setAddingError(true);
      }
    } catch (error) {
      console.log("🚀 ~ sendLoginForm ~ error:", error)
      console.error('Error al intentar agregar suministros:', error);
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
       <Card className='bg-white w-3/5 lg:w-1/3 h-[65vh] overflow-y-auto py-10 lg:p-12 rounded-md' shadow={false} ref={modalRef}>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col w-3/5 max-w-screen-lg'>
            <Typography variant="h4" color="blue-gray" className='text-xl mb-5 font-filson-soft'>
              Agregar suministros
            </Typography>
          </div>
          <form className="mt-8 mb-2 w-3/5 max-w-screen-lg" onSubmit={handleFormSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Cubrebocas
              </Typography>
              <Input
                type='number'
                value={masks}
                onChange={(e) => setmasks(e.target.value)}
                placeholder="Cubrebocas"
                step={50}
                min={0}
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Mascarillas KN95
              </Typography>
              <Input
                type="number"
                value={kn95}
                onChange={(e) => setkn95(e.target.value)}
                placeholder="Kn95"
                step={50}
                min={0}
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Caretas
              </Typography>
              <Input
                type="number"
                value={faceShield}
                onChange={(e) => setFaceShield(e.target.value)}
                placeholder="Caretas"
                step={50}
                min={0}
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            {addingError && (
              <div>
                <p className='text-[#ff2f2f]'>Hubo un error. Por favor intenta de nuevo</p>
              </div>
            )}
            {!addedSuccessfuly ? (
              <div className='flex justify-center'>
                <Button type="submit" className="mt-6 custom-gradient w-26 py-1" fullWidth>
                  Agregar
                </Button>
              </div>
            ) : (
              <Typography color="gray" className="mt-4 text-center font-normal font-agora">
                Suministros añadidos correctamente
              </Typography>
            )}
          </form>
        </div>
      </Card>
    );
}