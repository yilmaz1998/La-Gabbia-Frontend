import React from 'react'
import image from '../bg-image/image.jpg'
import imageMobile from '../bg-image/mobile-image.jpg'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
    <div
      className="absolute inset-0 block md:hidden bg-cover bg-top"
      style={{ backgroundImage: `url(${imageMobile})` }}
    ></div>
    <div
      className="absolute inset-0 hidden md:block bg-cover bg-top"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <h1 className="text-5xl text-white">La Gabbia</h1>
        <p className="text-white">Tap, taste, enjoy.</p>
        
        <div className="flex gap-3 mt-2">
        <Link
            to="/menu"
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
          >
            Menu
          </Link>
          <Link
            to="/admin"
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage