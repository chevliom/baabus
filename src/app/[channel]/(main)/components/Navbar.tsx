// src/components/Navbar.tsx or Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Baabus Logo" className="h-8" />
        <span className="font-bold text-xl text-blue-700">Baabus</span>
        <span className="ml-2 text-xs text-gray-400">BABY CARE PRODUCTS</span>
      </div>
      <nav className="flex items-center space-x-6 text-pink-500 font-medium">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Categories</a>
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Contact Us</a>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="material-icons text-pink-400">shopping_cart</span>
        </button>
        <button>
          <span className="material-icons text-pink-400">favorite_border</span>
        </button>
        <button>
          <span className="material-icons text-pink-400">settings</span>
        </button>
      </div>
    </header>
  );
}
