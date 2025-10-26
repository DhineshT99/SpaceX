import { useState } from "react";
import { motion } from "framer-motion";
import success from "../assets/icons8-success-48.png";
import failure from "../assets/icons8-error-48.png";

import fallback1 from "../assets/fallback-img/fallback-img1.png";
import fallback2 from "../assets/fallback-img/fallback-img2.png";
import fallback3 from "../assets/fallback-img/fallback-img3.png";
import fallback4 from "../assets/fallback-img/fallback-img4.png";
import fallback5 from "../assets/fallback-img/fallback-img5.png";

interface Launch {
  id: string;
  name: string;
  details?: string;
  date_utc: string;
  success: boolean;
  links?: {
    patch?: { small?: string; large?: string };
    article?: string;
    wikipedia?: string;
    webcast?: string;
  };
}

interface RecentLaunchHistoryProps {
  launches: Launch[];
}

export default function RecentLaunchHistory({ launches }: RecentLaunchHistoryProps) {
  const [search, setSearch] = useState("");

  const fallbackImages = [fallback1, fallback2, fallback3, fallback4, fallback5];

  const getRandomFallback = () =>
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  const filtered = launches
    .filter((l) => l.name.toLowerCase().includes(search.toLowerCase()))
    .map((launch) => ({
      ...launch,
      patchSrc:
        launch.links?.patch?.large ||
        launch.links?.patch?.small ||
        getRandomFallback(),
    }));

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden p-6">
      {/* Cosmic animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_60%)] animate-[pulse_10s_infinite_alternate]"></div>
      <div className="absolute inset-0 bg-black opacity-90"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-8 tracking-wide uppercase"
        >
          Recent Launch History
        </motion.h2>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Search mission name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-3 w-full max-w-lg rounded-full bg-gray-900/80 text-white border border-gray-700 focus:border-purple-500 outline-none transition-all placeholder-gray-400 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
          />
        </motion.div>

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
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
                  boxShadow:
                    "0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(236,72,153,0.4)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-gradient-to-tr from-black/80 via-purple-900/60 to-black/70 backdrop-blur-md rounded-3xl p-6 border border-gray-700 hover:border-transparent transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Rotating cosmic overlay */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                >
                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] animate-pulse"></div>
                </motion.div>

                <div className="relative z-10 flex flex-col items-center">
                  <motion.img
                    src={launch.patchSrc}
                    alt={launch.name}
                    onError={(e) => ((e.target as HTMLImageElement).src = getRandomFallback())}
                    className="w-20 h-20 mb-4 object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  />
                  <h3 className="text-xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-white drop-shadow-lg">
                    {launch.name}
                  </h3>
                  {launch.details && (
                    <p className="text-sm text-gray-300 text-center italic mb-2 line-clamp-2">
                      {launch.details}
                    </p>
                  )}
                </div>

                <div className="mt-4 border-t border-gray-700 pt-4 relative z-10">
                  <div className="text-sm mb-3 text-center text-purple-300 font-medium">
                    <span className="font-semibold text-gray-400">DATE —</span>{" "}
                    {new Date(launch.date_utc).toLocaleDateString()}
                  </div>

                  <motion.div
                    className="flex flex-col items-center justify-center mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.img
                      src={launch.success ? success : failure}
                      alt={launch.success ? "Success" : "Failure"}
                      className={`w-10 h-10 mb-1 drop-shadow-[0_0_20px_${
                        launch.success ? "rgba(127,255,212,0.6)" : "rgba(255,111,111,0.6)"
                      }]`}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />
                    <p
                      className={`text-base font-bold ${
                        launch.success ? "text-[#7FFFD4]" : "text-[#FF6F6F]"
                      } drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                    >
                      {launch.success ? "SUCCESS" : "FAILURE"}
                    </p>
                  </motion.div>

                  <div className="flex justify-center gap-4 mt-4 text-sm font-medium">
                    {launch.links?.wikipedia && (
                      <a
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400 transition-colors"
                        aria-label={`Wikipedia page for ${launch.name}`}
                      >
                        Wiki
                      </a>
                    )}
                    {launch.links?.webcast && (
                      <a
                        href={launch.links.webcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400 transition-colors"
                        aria-label={`Webcast for ${launch.name}`}
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
      </div>
    </div>
  );
}
