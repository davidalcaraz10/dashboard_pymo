import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import LoginForm from "./LoginForm";

export default function Navbar() {
  const [loginModal, setLoginModal] = useState(false);

  const openLogin = () => {
    setLoginModal(true);
  };

  const navigation = [
    {title: 'Inscríbete', url: '/'},
    {title: 'Conócenos', url: 'https://pymohub.com/sobre-pymo/'},
    {title: 'Contacto', url: 'https://pymohub.com/contactanos/'}
  ];
  

  return (
    <nav className="container relative flex flex-wrap items-center justify-between mx-auto lg:justify-evenly xl:px-0">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex flex-wrap items-center justify-evenly w-full lg:w-auto">
              <Link href="/">
                <span className="flex items-center">
                  <span>
                    <img src="/src/assets/logo_nombre.svg" alt="PYMO logo" width="50" height="50" className="w-28" />                    
                  </span>
                </span>
              </Link>

              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                <svg
                  className="w-8 h-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  {open && (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  )}
                  {!open && (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                <>
                  {navigation.map((item, index) => (
                    <Link key={index} href="/" className="w-full px-4 py-2 ml-2 text-gray-800 rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                        {item}
                    </Link>
                  ))}
                  <button onClick={openLogin} className="w-2/3 m-auto px-6 py-2 mt-3 text-center text-white font-bold custom-gradient rounded-md lg:ml-5">         
                      Login
                  </button>
                </>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>

      <div className="hidden text-center lg:flex lg:items-center">
        <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
          {navigation.map((menu, index) => (
            <li className="mr-3 nav__item" key={index}>
              <a href={menu.url} target='_blank' className="inline-block px-4 py-2 text-lg font-filson-soft text-gray-800 no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none">
                  {menu.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden mr-3 space-x-4 lg:flex nav__item">
        <button onClick={openLogin} className="px-6 py-2 text-white font-bold custom-gradient rounded-md">
          Login
        </button>
      </div>
        {/* Formulario Login */}
        {loginModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <LoginForm onClose={() => setLoginModal(false)}/>
          </div>
        )}
    </nav>
  )
}