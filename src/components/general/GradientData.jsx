
export default function GradientData() {
  return (
    <section className="w-full h-auto custom-gradient mb-8 mt-5 md:mt-1">
      <div className="flex flex-col items-center p-12">
        <div className="text-center">
          <h2 className="font-filson-soft text-white text-3xl">Nuestro impacto en números</h2>
        </div>
        <div className="flex flex-col md:flex-row md:justify-evenly w-full mt-12 ">
          <div className="flex flex-col items-center mb-12">
            <p className="font-filson-soft text-[#c37141] text-5xl">+30 M</p>
            <p className="font-filson-soft text-white text-2xl">Pesos Recaudados</p>
          </div>
          <div className="flex flex-col items-center mb-12">
            <p className="font-filson-soft text-[#c37141] text-5xl">+200 K</p>
            <p className="font-filson-soft text-white text-2xl">Donantes</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-filson-soft text-[#c37141] text-5xl">+50</p>
            <p className="font-filson-soft text-white text-2xl">Hospitales Apoyados</p>
          </div>
        </div>
      </div>
    </section>
  )
}