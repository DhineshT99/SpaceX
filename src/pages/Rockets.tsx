import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { getRockets } from "../api/space";

interface Rocket {
  id: string;
  name: string;
  company: string;
  flickr_images: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Rockets() {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRockets()
      .then((res) => setRockets(res.data))
      .catch((err) => console.error("Error fetching rockets:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRockets = rockets.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 animate-pulse bg-black px-4 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Launching rocket data... 🚀
        </motion.p>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_60%)] animate-[pulse_10s_infinite_alternate]" />
      <div className="absolute inset-0 bg-black opacity-90" />

      <div className="relative px-4 sm:px-6 md:px-8 py-10 max-w-6xl mx-auto z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-8 tracking-wide uppercase"
        >
          SpaceX Rockets
        </motion.h2>

        <motion.input
          type="text"
          placeholder="Search rocket..."
          className="w-full p-3 sm:p-4 mb-6 sm:mb-8 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] 
          text-sm sm:text-base transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {filteredRockets.length === 0 ? (
          <p className="text-center text-gray-400 text-sm sm:text-base">No rockets found.</p>
        ) : (
          <motion.div
            className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredRockets.map((rocket) => (
              <motion.div
                key={rocket.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] 
                transition-shadow flex flex-col"
              >
                <Link to={`/rockets/${rocket.id}`} className="flex flex-col h-full">
                  {/* Image Display */}
                  {rocket.flickr_images?.length > 0 ? (
                    rocket.flickr_images.length === 1 ? (
                      <div className="relative aspect-[4/3] bg-gray-700">
                        <img
                          src={rocket.flickr_images[0]}
                          alt={rocket.name}
                          className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://via.placeholder.com/400x300?text=No+Image")
                          }
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-0.5 aspect-[4/3] bg-gray-700">
                        {rocket.flickr_images.slice(0, 4).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${rocket.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://via.placeholder.com/400x300?text=No+Image")
                            }
                          />
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="relative aspect-[4/3] bg-gray-700 flex items-center justify-center">
                      <img
                        src="https://via.placeholder.com/400x300?text=No+Image"
                        alt="No image available"
                        className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                      />
                    </div>
                  )}

                  {/* Text Section */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{rocket.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{rocket.company}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
