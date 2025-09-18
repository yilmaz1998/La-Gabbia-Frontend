import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from 'react-redux';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50 flex items-center justify-between px-4 h-16">
      <Link to={"/menu"} className='flex gap-1 text-xl'>
        <IoFastFoodOutline />La Gabbia
      </Link>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="relative text-white font-bold focus:outline-none"
      >
        <GiHamburgerMenu className='text-2xl' />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 block h-3 w-3 rounded-full bg-red-500"></span>
        )}
      </button>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 md:w-84 bg-gray-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-500 z-40`}
      >
        <div className="mt-12 flex flex-col px-12 space-y-2 text-2xl">
          <Link
            to="/menu"
            onClick={() => setSidebarOpen(false)}
            className="px-2 py-2 hover:bg-gray-800 rounded"
          >
            Menu
          </Link>
          <Link
            to="/cart"
            onClick={() => setSidebarOpen(false)}
            className="px-2 py-2 hover:bg-gray-800 rounded flex items-center gap-2"
          >
            Cart {cartItemCount > 0 && <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header