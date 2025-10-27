import { useState } from "react";
import { motion } from "framer-motion";
import success from "../assets/icons8-success-48.png";
import failure from "../assets/icons8-error-48.png";

// Sequential Background images for the section
import bgImage1 from "../assets/background.jpg";
import bgImage2 from "../assets/background-2.jpg";
import bgImage3 from "../assets/background-3.jpg";
import bgImage4 from "../assets/background-4.jpg";
import bgImage5 from "../assets/background-5.jpg";

// Fallback images for launch patches
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

const launchSectionBackgrounds = [
  bgImage1,
  bgImage2,
  bgImage3,
  bgImage4,
  bgImage5,
];

const ScrollingSectionBackground = () => {
  const totalBackgrounds = launchSectionBackgrounds.length;
  const segmentHeight = 100 / totalBackgrounds;

  return (
    <div className="absolute inset-0 overflow-hidden max-w-screen mx-auto">
      <div className="absolute top-0 left-0 w-full h-full">
        {launchSectionBackgrounds.map((bgSrc, index) => {
          const topPosition = index * segmentHeight;
          return (
            <motion.div
              key={index}
              className="absolute w-full h-full bg-center bg-no-repeat bg-cover opacity-75 transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${bgSrc})`,
                top: `${topPosition}%`,
                height: `${segmentHeight}%`,
              }}
            ></motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default function RecentLaunchHistory({
  launches,
}: RecentLaunchHistoryProps) {
  const [search, setSearch] = useState("");

  const fallbackImages = [
    fallback1,
    fallback2,
    fallback3,
    fallback4,
    fallback5,
  ];
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
    <div className="relative min-h-screen w-full text-white overflow-hidden p-4 sm:p-6 bg-black">
      <ScrollingSectionBackground />
      <div className="absolute inset-0 bg-black opacity-20 z-0 max-w-screen-xl mx-auto"></div>

      <div
        className="absolute inset-0 z-0 max-w-screen-xl mx-auto"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, rgba(0,0,0,1) 100%)",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          Recent Launch History
        </motion.h2>
        <motion.div
          className="flex justify-center mb-6 sm:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Search mission name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 sm:px-6 py-2 sm:py-3 w-full max-w-full sm:max-w-lg rounded-full bg-black/50 backdrop-blur-md text-white border border-gray-700 focus:border-white outline-none transition-all placeholder-gray-400 shadow-[0_0_10px_rgba(139,92,246,0.3)] sm:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          />
        </motion.div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-base sm:text-xl py-6 sm:py-10">
            No launches matching "{search}" found.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
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
                    "0 0 40px rgba(138,43,226,0.6), 0 0 80px rgba(0,191,255,0.4)",
                  borderColor: "rgba(173,216,230,0.8)",
                  backgroundColor: "rgba(0,0,0,0.55)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-600 hover:border-purple-400/70 transition-all duration-500 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.05)]"
              >
                <div className="relative z-10 flex flex-col items-center">
                  <motion.img
                    src={launch.patchSrc}
                    alt={launch.name}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = getRandomFallback())
                    }
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 object-contain drop-shadow-[0_0_20px_rgba(138,43,226,0.6)]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  />
                  <h3 className="text-lg sm:text-xl font-extrabold mb-1 sm:mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-white drop-shadow-lg">
                    {launch.name}
                  </h3>
                  {launch.details && (
                    <p className="text-xs sm:text-sm text-gray-300 text-center italic mb-2 line-clamp-2">
                      {launch.details}
                    </p>
                  )}
                </div>

                <div className="mt-3 sm:mt-4 border-t border-gray-700 pt-3 sm:pt-4 relative z-10">
                  <div className="text-xs sm:text-sm mb-2 text-center text-white font-medium">
                    <span className="font-semibold text-gray-400">DATE :</span>{" "}
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
                      className={`w-8 h-8 sm:w-10 sm:h-10 mb-1 drop-shadow-[0_0_20px_${
                        launch.success
                          ? "rgba(127,255,212,0.6)"
                          : "rgba(255,111,111,0.6)"
                      }]`}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    />
                    <p
                      className={`text-sm sm:text-base font-bold ${
                        launch.success ? "text-[#7FFFD4]" : "text-[#FF6F6F]"
                      } drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                    >
                      {launch.success ? "SUCCESS" : "FAILURE"}
                    </p>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm font-medium">
                    {launch.links?.wikipedia && (
                      <a
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400 transition-colors"
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
