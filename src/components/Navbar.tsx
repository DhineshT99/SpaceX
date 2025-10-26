import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; 
import spaceXlogo from "../assets/space-x logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Rockets", to: "/rockets" },
    { name: "Launches", to: "/launches" },
    { name: "History", to: "/history" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm border-b border-gray-700/50 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={spaceXlogo}
            alt="SpaceX Logo"
            className="h-8 w-auto filter brightness-150"
          />
        </Link>

        {/* Toggle button (visible only on mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-semibold text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="group relative transition-colors duration-300 hover:text-gray-400"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-white text-sm uppercase tracking-widest font-semibold bg-black/80 rounded-lg p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={() => setIsOpen(false)} // close menu after click
              className="hover:text-gray-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
