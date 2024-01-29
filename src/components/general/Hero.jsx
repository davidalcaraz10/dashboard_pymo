import { useEffect, useState } from "react";
import FormHos from "./FormHos";
import Vacuna from '../../assets/vacuna.jpeg'

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <section className="flex flex-col items-center justify-evenly md:flex-row md:justify-center h-full md:h-[70vh] w-full mb-10 md:mb-2">
      <div className="flex flex-col items-start md:items-center justify-center w-[85%] md:w-2/5 pl-4">
        <h1 className="font-filson-soft font-extrabold text-4xl lg:text-5xl mb-5">En tiempos difíciles, la solidaridad marca la diferencia.</h1>
        <p className="font-agora text-xl mb-5">
        Juntos, equipamos a los héroes de la salud con los recursos que necesitan para salvar vidas.
        </p>

        <div className="w-full flex justify-start">
          <button onClick={openModal} className="px-6 py-2 text-white font-bold custom-gradient rounded-md">
            Inscribirse
          </button>
        </div>
      </div>

      {/* Formulario para hospitales */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
          <FormHos onClose={() => setModalOpen(false)}/>
        </div>
      )}

      <div className="flex justify-center items-center w-3/4 md:w-2/4 mt-7 md:mt-0">
        <img src={Vacuna} alt="vacunación" className="rounded-lg w-[80vw] lg:w-[35vw]"/>
      </div>
    </section>
  )
}