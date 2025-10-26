import { Link } from "react-router-dom";
// Assuming 'spaceXlogo' is the correct import path for the image file
import spaceXlogo  from "../assets/space-x logo.png";

export default function Navbar() {
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Rockets", to: "/rockets" },
    { name: "Launches", to: "/launches" },
    { name: "History", to: "/history" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700/50">
      {/* SpaceX Logo - using an img for proper logo display */}
      <Link to="/" className="flex items-center">
        <img
          src={spaceXlogo}
          alt="SpaceX Logo"
          className="h-8 w-auto filter invert brightness-150" 
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8 text-sm uppercase tracking-widest font-semibold text-white">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="group relative transition-colors duration-300 hover:text-gray-400"
          >
            {item.name}
            {/* Animated underline */}
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        ))}
      </div>
    </nav>
  );
}