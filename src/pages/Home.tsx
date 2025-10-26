import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLaunches } from "../api/space";
import bgImage1 from "../assets/background.jpg";
import bgImage2 from "../assets/background-2.jpg";
import bgImage3 from "../assets/background-3.jpg";
import bgImage4 from "../assets/background-4.jpg";
import bgImage5 from "../assets/background-5.jpg";
import { Link } from "react-router-dom";

interface Launch {
  id: string;
  name: string;
  details?: string;
  date_utc: string;
  success: boolean;
  links: {
    patch: { small: string };
    article: string;
    wikipedia: string;
    webcast: string;
  };
}

export default function Home() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentBg, setCurrentBg] = useState(0);

  const bgImages = [bgImage1, bgImage2, bgImage3, bgImage4, bgImage5];
  console.log(bgImages);

  // Fetch launches
  useEffect(() => {
    getLaunches()
      .then((res) => setLaunches(res.data.reverse().slice(0, 40)))
      .catch(() => setError("Failed to fetch launches."))
      .finally(() => setLoading(false));
  }, []);

  // Background image looping shuffle/fade
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 7000); // Change every 7s
    return () => clearInterval(interval);
  }, []);

  const filtered = launches.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

if (loading)
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      {/* Outer pulse ring */}
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Spinning gradient ring */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-t-white-400 border-r-transparent border-b-transparent border-l-white-600"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Text shimmer effect */}
      <motion.div
        className="mt-8 text-2xl font-semibold bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent"
        animate={{
          backgroundPositionX: ["0%", "200%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% auto",
        }}
      >
        Loading the Cosmos...
      </motion.div>
    </div>
  );


  if (error)
    return (
      <p className="text-center pt-24 text-red-500 text-lg">
        {error} Please check the API status.
      </p>
    );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pt-16">
      {/* === HERO SECTION === */}
      <section className="relative h-[80vh] flex items-end pb-20 overflow-hidden">
        {/* Background Image Slideshow: UPDATED SRC HERE */}
        <AnimatePresence mode="wait">
          {bgImages.map((src, index) =>
            index === currentBg ? (
              <motion.img
                key={src}
                src={src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 w-full h-full object-cover -z-10 brightness-75"
              />
            ) : null
          )}
        </AnimatePresence>

        {/* Dark Overlay (Can be added here if needed, but 'brightness-75' on the image serves a similar purpose) */}

        {/* Text Content */}
        <div className="relative z-10 p-10 max-w-7xl mx-auto w-full">
          <motion.h1
            className="text-7xl md:text-8xl font-extrabold leading-tight uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing space technology
          </motion.h1>
          <motion.p
            className="text-xl mt-4 text-gray-300 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            From Earth to Mars and beyond — explore SpaceX missions, rockets,
            and discoveries.
          </motion.p>
          <motion.div
            className="mt-10 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* === Explore Launches Button === */}
            <motion.div
              whileHover={{
                scale: 1.06,
                background:
                  "linear-gradient(135deg, rgba(230,230,230,0.9), rgba(60,60,60,0.9))",
                color: "#000000",
                boxShadow: "0 0 18px rgba(200,200,200,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="rounded-full overflow-hidden"
            >
              <Link
                to="/launches"
                className="px-8 py-3 block rounded-full bg-transparent border border-gray-400 text-gray-100 font-semibold tracking-wide transition-all duration-300"
              >
                Explore Launches
              </Link>
            </motion.div>

            {/* === View Rockets Button === */}
            <motion.div
              whileHover={{
                scale: 1.06,
                background:
                  "linear-gradient(135deg, rgba(230,230,230,0.9), rgba(60,60,60,0.9))",
                color: "#000000",
                boxShadow: "0 0 18px rgba(200,200,200,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="rounded-full overflow-hidden"
            >
              <Link
                to="/rockets"
                className="px-8 py-3 block rounded-full border border-gray-400 text-gray-100 font-semibold tracking-wide transition-all duration-300"
              >
                View Rockets
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* === LAUNCH HISTORY === */}
      <section className="p-10 max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl font-bold mb-10 text-center uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Recent Launch History
        </motion.h2>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search mission name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-3 w-full max-w-lg rounded-full bg-gray-900/80 text-white border border-gray-700 focus:border-blue-400 outline-none transition-all placeholder-gray-500 shadow-xl"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-xl py-10">
            No launches matching "{search}" found.
          </p>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filtered.map((launch) => (
              <motion.div
                key={launch.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(96,165,250,0.5)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 border border-gray-800 hover:border-blue-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <motion.img
                    src={launch.links.patch.small || "/fallback.png"}
                    alt={launch.name}
                    className="w-20 h-20 mx-auto mb-4 object-contain drop-shadow-xl filter brightness-110"
                    whileHover={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <h3 className="text-xl font-bold mb-2 text-center text-blue-400">
                    {launch.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 h-12 overflow-hidden text-ellipsis text-center">
                    {launch.details || "No mission description available."}
                  </p>
                </div>

                <div className="mt-4 border-t border-gray-700 pt-4">
                  <div className="text-sm mb-3 text-center">
                    <span className="font-semibold text-gray-400">Date:</span>{" "}
                    {new Date(launch.date_utc).toLocaleDateString()}
                  </div>
                  <div
                    className={`text-base font-bold text-center ${
                      launch.success ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {launch.success ? "✅ SUCCESS" : "❌ FAILURE"}
                  </div>
                  <div className="flex justify-center gap-4 mt-4 text-sm font-medium">
                    {launch.links.wikipedia && (
                      <a
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        Wiki
                      </a>
                    )}
                    {launch.links.webcast && (
                      <a
                        href={launch.links.webcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        Webcast
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
