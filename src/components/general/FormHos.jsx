import { useEffect, useState, useRef } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/20/solid';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import hospitalRegister from '../../services/hospitalRegister';
import uploadDocuments from '../../services/uploadDocuments';

export default function FormHos({onClose}) {
  const modalRef = useRef();
  const [hospitalName, setHospitalName] = useState('');
  const [registeredCases, setRegisteredCases] = useState('');
  const [masksRequired, setMasksRequired] = useState('');
  const [kn95Mask, setKn95Mask] = useState('');
  const [faceShieldRequired, setFaceShieldRequired] = useState('');
  const [addressState, setAddressState] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentUrl, setDocumentUrl] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [registeredFailed, setRegisteredFailed] = useState(false);

  const statesList = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México',
    'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit',
    'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán','Zacatecas'
  ]

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!hospitalName) {
      alert('Por favor, ingrese primero el nombre del hospital.');
      return;
    }
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (['png', 'jpg', 'jpeg', 'pdf'].includes(fileExtension)) {
        const formattedHospitalName = hospitalName.replace(/\s+/g, '_');
        const fileName = `${formattedHospitalName}_identidad_legal.${fileExtension}`;
        const formData = new FormData();
        formData.append('file', file, fileName);
        
        try {
          const response = await uploadDocuments(formData);
          console.log('Archivo subido:', response);
          if(response.success) {
            setSelectedFile(true);
            setDocumentUrl(response.location)
          } else {
            setSelectedFile(false);
          }
        } catch (error) {
          console.error('Error al subir el archivo:', error);
        }
      } else {
        alert('Formato de archivo no admitido');
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    sendFormHos();
  };

  const sendFormHos = async () => {
    const data = {
      hospitalName, 
      registeredCases, 
      masksRequired, 
      kn95Mask, 
      faceShieldRequired, 
      addressState, 
      documentUrl 
    };

      const resp = await hospitalRegister(data);
      console.log("🚀 ~ sendFormHos ~ resp:", resp)
      if(resp.success) {
        setRegisteredSuccess(true);
      }
      
      if(resp.success === false) {
        setRegisteredFailed(true);
      }

  };

    return (
       <Card className='bg-white w-4/5 lg:w-1/3 h-[75vh] overflow-y-auto py-2 lg:p-10 rounded-md' shadow={false} ref={modalRef}>
        <div className='flex justify-end'>
          <button onClick={onClose} className='w-7 h-7 mb-5 mr-4 lg:mr-0'>
            <XMarkIcon/>
          </button>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col w-3/5 max-w-screen-lg'>
            <Typography variant="h4" color="blue-gray" className='text-xl mb-5 font-filson-soft'>
              Registro de hospitales
            </Typography>
            <Typography color="gray" className="font-normal text-slate-500 font-agora">
              Por favor ingresa la información requerida
            </Typography>
          </div>
          <form className="mt-8 mb-2 w-3/5 max-w-screen-lg" onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Nombre del hospital *
              </Typography>
              <Input
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="Nombre del hospital"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                Casos registrados *
              </Typography>
              <Input
                required
                value={registeredCases}
                onChange={(e) => setRegisteredCases(e.target.value)}
                size="lg"
                placeholder="Casos último mes"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                ¿Cuántos cubrebocas necesitan? *
              </Typography>
              <Input
                required
                value={masksRequired}
                onChange={(e) => setMasksRequired(e.target.value)}
                size="lg"
                placeholder="Número de cubrebocas"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                ¿Cuántas mascarillas KN95 necesitan? *
              </Typography>
              <Input
                required
                value={kn95Mask}
                onChange={(e) => setKn95Mask(e.target.value)}
                size="lg"
                placeholder="Número de mascarillas"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                ¿Cuántas caretas necesitan? *
              </Typography>
              <Input
                required
                value={faceShieldRequired}
                onChange={(e) => setFaceShieldRequired(e.target.value)}
                size="lg"
                placeholder="Número de caretas"
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                ¿En qué estado de la república se encuentra el hospital? *
              </Typography>
              <select 
                value={addressState} 
                onChange={(e) => setAddressState(e.target.value)} 
                className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-full"
                required
              >
                <option value="">Seleccione un estado</option>
                {statesList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {hospitalName && (
                <Typography variant="h6" color="blue-gray" className="-mb-3 font-agora">
                  Documento de identidad legal del hospital *
                </Typography>
              )}
              {selectedFile ? (
                <div className='text-green-500 flex items-center'>
                  Archivo cargado con éxito 
                  <CheckIcon className='w-8 h-8 ml-3'/>
                </div>
              ) : (
                hospitalName && (
                  <input
                    required
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileChange}
                    className="border-blue-gray-200 focus:!border-t-gray-900 rounded-xl bg-[#f2f2f2] p-2 w-3/4"
                  />
                )
              )}
            </div>

            {registeredSuccess ? (
              <Typography color="gray" className="mt-4 text-center font-normal font-agora">
                Recibimos tu información. En breve te contactaremos.
              </Typography>
            ): (
              <div className='flex justify-center'>
                <Button type='submit' className="mt-6 custom-gradient w-26 py-1" fullWidth>
                  Enviar
                </Button>
              </div>
            )}
            {registeredFailed && (
              <>
                <Typography className="mt-4 text-center font-normal font-agora text-[#d73333]">
                  Hubo un error en el registro. Inténtalo de nuevo más tarde.
                </Typography>
                <div className='flex justify-center'>
                  <Button type='submit' className="mt-6 custom-gradient w-26 py-1" fullWidth>
                    Enviar
                  </Button>
                </div>
              </>
            )}

          </form>

        </div>
      </Card>
    );
}



