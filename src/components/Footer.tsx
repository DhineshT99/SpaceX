import { Link } from "react-router-dom";

export default function Footer() {
  const footerItems = [
    { name: "CAREERS", path: "/careers" },
    { name: "UPDATES", path: "/updates" },
    { name: "PRIVACY POLICY", path: "/privacy-policy" },
    { name: "SUPPLIERS", path: "/suppliers" },
  ];

  return (
    <footer className="w-full py-8 bg-black border-t border-gray-700/50 flex flex-col items-center">
      <div
        className="
          flex flex-wrap justify-center items-center 
          gap-4 sm:gap-6 md:gap-8 
          text-xs sm:text-sm uppercase tracking-widest font-semibold text-white mb-4
          px-4 text-center
        "
      >
        {footerItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="transition-colors duration-300 hover:text-gray-400"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <p className="text-xs sm:text-sm text-gray-500 font-normal text-center">
        &copy; 2025 SpaceX
      </p>
    </footer>
  );
}
