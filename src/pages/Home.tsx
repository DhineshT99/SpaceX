import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLaunches } from "../api/space";
import { Link } from "react-router-dom";
import RecentLaunchHistory from "./RecentLaunchHistory";
import spaceXIntroVideo from "../assets/videos/SpaceXintro.mp4"; 

interface Launch {
  id: string;
  name: string;
  details?: string;
  date_utc: string;
  success: boolean;
  links: {
    patch?: { small?: string; large?: string };
    article?: string;
    wikipedia?: string;
    webcast?: string;
  };
}

export default function Home() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLaunches()
      .then((res) => setLaunches(res.data.reverse().slice(0, 40)))
      .catch(() => setError("Failed to fetch launches."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
        <motion.div
          className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
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

        <motion.div
          className="mt-8 text-xl sm:text-2xl font-semibold text-center bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent"
          animate={{
            backgroundPositionX: ["0%", "200%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% auto" }}
        >
          Loading the Cosmos...
        </motion.div>
      </div>
    );

  if (error)
    return (
      <p className="text-center pt-24 text-red-500 text-lg px-4">
        {error} Please check the API status.
      </p>
    );

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <section className="relative h-[80vh] sm:h-[70vh] flex flex-col-reverse sm:flex-col items-end sm:items-start pb-10 sm:pb-20 overflow-hidden w-screen">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-75"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={spaceXIntroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 p-4 sm:p-10 max-w-7xl mx-auto w-full text-center sm:text-left">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing space technology
          </motion.h1>
          <motion.p
            className="text-sm sm:text-lg md:text-xl mt-4 text-gray-300 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            From Earth to Mars and beyond — Explore SpaceX missions, rockets, and
            discoveries.
          </motion.p>
          <motion.div
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center sm:justify-start gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
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
                className="px-6 sm:px-8 py-2 sm:py-3 block rounded-full bg-transparent border border-gray-400 text-gray-100 font-semibold tracking-wide transition-all duration-300"
              >
                Explore Launches
              </Link>
            </motion.div>

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
                className="px-6 sm:px-8 py-2 sm:py-3 block rounded-full bg-transparent border border-gray-400 text-gray-100 font-semibold tracking-wide transition-all duration-300"
              >
                View Rockets
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="p-4 sm:p-10 max-w-7xl mx-auto">
            <RecentLaunchHistory launches={launches} />
      </section>
    </div>
  );
}