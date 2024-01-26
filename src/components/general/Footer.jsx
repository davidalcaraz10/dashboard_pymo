
export default function Footer() {

  return (
    <footer className="w-full">
      <div className="flex flex-col items-center">
        <div className="flex flex-col lg:flex-row justify-center items-start px-12 mb-10">
          <div className="flex flex-col w-1/3">
            <img src="/src/assets/logo_nombre.svg" alt="PYMO logo" width="50" height="50" className="w-28" />                    
            <p className="font-agora w-[330px] md:w-[85%]">
              La solución #1 para crear un impacto corporativo inteligente, sostenible y trazable.
            </p>
            <h3 className="text-lg font-filson-soft text-[#858585] mt-4 md:mt-0">MÁS SOBRE NOSOTROS</h3>
            <div className="flex">
              <a href="https://www.facebook.com/pymohub" target="_blank"><img src="/src/assets/facebook.png" alt="facebook logo" width="30" height="30" className="w-8 mr-3"/></a>
              <a href="https://www.instagram.com/pymohub/" target="_blank"><img src="/src/assets/instagram.png" alt="instagram logo" width="30" height="30" className="w-8 mr-3"/></a>
              <a href="https://twitter.com/pymohub?lang=es" target="_blank"><img src="/src/assets/twitter.png" alt="twitter logo" width="30" height="30" className="w-8 mr-3"/></a>
              <a 
                href="https://www.linkedin.com/company/entrelazando-m%C3%A9xico/?trk=public_profile_topcard-current-company&originalSubdomain=mx" 
                target="_blank"
              >
                <img src="/src/assets/linkedin.png" alt="linkedin logo" width="30" height="30" className="w-8"/>
              </a>
            </div>
          </div>

          <div className="flex flex-col w-1/3 mt-7 md:mt-0">
            <h3 className="text-lg font-filson-soft mb-2">SOLUCIONES</h3>
            <h3 className="text-lg font-filson-soft text-[#858585] mb-1">PARA ONGS</h3>
            <p className="font-agora mb-1 w-[250px]">Productos para tu fundación</p>
            <p className="font-agora mb-1 w-[250px]">Certificado CASE</p>
            <p className="font-agora mb-1">Acceso a TARS</p>
            <p className="font-agora mb-3 w-[250px]">Contacta a Nuestro Equipo</p>
            <h3 className="text-lg font-filson-soft text-[#858585] w-[250px] mb-1">PARA EMPRESAS</h3>
            <p className="font-agora mb-1 w-[250px]">Productos para las empresas</p>
            <p className="font-agora mb-1 w-[250px]">CASE Enterprise</p>
            <p className="font-agora mb-1 w-[250px]">Sé parte de PYMO</p>
          </div>

          <div className="flex flex-col w-1/3">
          <h3 className="text-lg font-filson-soft mb-2">RECURSOS</h3>
            <p className="font-agora mb-1 w-[250px]">Nuestro Marketplace</p>
            <p className="font-agora mb-1">Blog</p>
            <p className="font-agora mb-1 w-[250px]">Sé parte del equipo PYMO</p>
            <p className="font-agora mb-1 w-[250px]">Acceso al Marketplace</p>
            <p className="font-agora mb-1">Contáctanos</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly items-center custom-gradient w-full h-[55px]">
          <p className="font-agora text-white text-sm">© 2023 Todos los Derechos Reservados | PYMO Hub</p>
          <div className="flex">
            <p className="font-agora text-white text-sm mr-3">Aviso de privacidad</p>
            <p className="font-agora text-white text-sm">Política de Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  )
}