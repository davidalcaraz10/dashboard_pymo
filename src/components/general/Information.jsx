import Paciente from '../../assets/paciente.png';
import Pastillas from '../../assets/pastillas.png';

export default function Information() {
  return (
    <div className="flex flex-col items-center h-auto p-8 mt-8">
      <div>
        <h2 className="text-4xl font-filson-soft">Información de utilidad para hospitales</h2>
      </div>
      <div className="flex flex-col md:flex-row p-12">
        <div className="flex flex-col items-center bg-gray-100 p-16 mr-4 rounded-lg w-4/5 mb-5 md:mb-0">
          <img src={Paciente} alt="paciente covid" className="rounded-xl w-4/5"/>
          <p className="font-agora text-xl mb-3 mt-5">La lucha contra la pandemia COVID-19 debe incluir atención de enfermedades crónicas: OPS</p>
          <a 
            href="https://coronavirus.onu.org.mx/la-lucha-contra-la-pandemia-covid-19-debe-incluir-atencion-de-enfermedades-cronicas-ops"
            className="text-xl font-bold"
            target="_blank"
          >
            Leer más
          </a>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-16 rounded-lg w-4/5">
          <img src={Pastillas} alt="medicamentos" className="rounded-xl w-4/5"/>
          <p className="font-agora text-xl mb-3 mt-5">La OMS suspende tratamientos con hidroxicoloroquina contra la COVID-19 ante posibles riesgos a la salud</p>
          <a 
            href="https://coronavirus.onu.org.mx/la-oms-suspende-tratamientos-con-hidroxicoloroquina-contra-la-covid-19-ante-posibles-riesgos-a-la-salud?fbclid=IwAR1bDnAqo0A5lBEzKNWybAFve4vYqUseUko73IJPWh9M61PGhdfFAokfgO4"
            className="text-xl font-bold"
            target="_blank"
          >
            Leer más
          </a>
        </div>
      </div>
    </div>
  )
}