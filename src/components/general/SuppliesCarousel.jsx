import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import cubrebocasImage from '../../assets/cubrebocas.png';
import kn95Image from '../../assets/kn95.png';
import caretaImage from '../../assets/careta.png';

const carouselData = [
  {
    image: cubrebocasImage,
    title: 'Cubrebocas',
    text: 'Es una barrera facial ligera y desechable que cubre la boca y la nariz. Está diseñado para reducir la propagación de gotas respiratorias que podrían contener partículas virales.'
  },
  {
    image: kn95Image,
    title: 'Mascarilla KN95',
    text: 'Están diseñadas para filtrar al menos el 95% de las partículas suspendidas en el aire, incluidos virus y bacterias. Las mascarillas KN95 son ajustadas al rostro y cuentan con un eficiente sistema de filtración.'
  },
  {
    image: caretaImage,
    title: 'Caretas',
    text: 'Las caretas están diseñadas para proteger contra salpicaduras, gotas y aerosoles. Son una barrera física y se utilizan en combinación con otros equipos de protección personal.'
  }
];


export default function SuppliesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? carouselData.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === carouselData.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative bg-gray-50">
      <div className="w-4/5 h-[80vh] relative overflow-hidden bg-gray-50 mx-auto">
        {carouselData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex transition-transform ease-in-out duration-1000 ${
              index === currentSlide
                ? 'translate-x-0'
                : 'translate-x-full'
            }`}
          >
            <div className="w-full md:w-1/2 h-full flex justify-center items-center">
              <img src={slide.image} alt={slide.title} className="object-contain p-4 md:h-full" />
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center bg-white p-4">
              <h2 className="text-2xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg focus:outline-none z-10"
        onClick={prevSlide}
      >
        <ChevronLeftIcon className="h-8 w-8 text-gray-800" />
      </button>
      <button 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg focus:outline-none z-10"
        onClick={nextSlide}
      >
        <ChevronRightIcon className="h-8 w-8 text-gray-800" />
      </button>
    </div>
  );
}