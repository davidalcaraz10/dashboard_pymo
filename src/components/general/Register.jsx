import { useState } from "react";
import FormHos from "./FormHos";

export default function Register() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <section className="w-full h-auto bg-[#0c0f31] mb-8 mt-5 md:mt-1">
      <div className="flex flex-col items-center p-16">
        <div className="text-center">
          <h2 className="font-filson-soft text-white text-5xl font-bold">Registra tu hospital</h2>
        </div>
        <div className="text-center mt-16 w-11/12 md:w-3/5">
          <h2 className="font-filson-soft text-white text-2xl">
          El orden de entrega de los insumos será definido de acuerdo al número de casos COVID de cada hospital y a los insumos disponibles para su entrega.
          </h2>
        </div>
        <div className="text-center mt-16">
          <button onClick={openModal} className="px-6 py-2 text-white text-2xl font-bold custom-gradient rounded-md">
            Registrarse
          </button>
        </div>
      </div>

      {/* Formulario para hospitales */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
          <FormHos onClose={() => setModalOpen(false)}/>
        </div>
      )}

    </section>
  )
}