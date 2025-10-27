import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLaunches } from "../api/space";
import fallbackImg1 from "../assets/fallback-img/fallback-img1.png";
import fallbackImg2 from "../assets/fallback-img/fallback-img2.png";
import fallbackImg3 from "../assets/fallback-img/fallback-img3.png";
import fallbackImg4 from "../assets/fallback-img/fallback-img4.png";
import fallbackImg5 from "../assets/fallback-img/fallback-img5.png";

interface Launch {
  id: string;
  name: string;
  rocket?: string;
  date_utc: string;
  details?: string;
  links?: {
    patch?: { small?: string };
  };
}

const fallbackImages = [fallbackImg1, fallbackImg2, fallbackImg3, fallbackImg4, fallbackImg5];

export default function Launches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const res = await getLaunches();
        setLaunches(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch launches:", err);
        setError("Failed to load launches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  const filteredLaunches = launches.filter((l) =>
    l.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getFallbackImage = () => fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 animate-pulse bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_60%)] animate-[pulse_10s_infinite_alternate]"></div>
        <div className="absolute inset-0 bg-black opacity-90"></div>
        Loading cosmic launches...
      </div>
    );

  if (error) return <div className="p-6 text-red-400 text-center">{error}</div>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_60%)] animate-[pulse_10s_infinite_alternate]"></div>
      <div className="absolute inset-0 bg-black opacity-90"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-8 tracking-wide uppercase"
        >
          SpaceX Launches
        </motion.h2>

        <motion.input
          type="text"
          placeholder="Search launches..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full p-3 mb-8 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
        />

        {filteredLaunches.length === 0 ? (
          <p className="text-center text-gray-400">No launches found.</p>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
          >
            {filteredLaunches.map((launch) => (
              <motion.div
                key={launch.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-5 border border-gray-700 hover:border-white transition-all shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <img
                  src={launch.links?.patch?.small || getFallbackImage()}
                  alt={launch.name}
                  className="w-full h-48 object-contain bg-black mb-4"
                  onError={(e) => (e.currentTarget.src = getFallbackImage())}
                />
                <h3 className="text-2xl font-semibold mb-1">{launch.name}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Date: {new Date(launch.date_utc).toLocaleDateString()}
                </p>
                <p className="text-gray-300 mb-3 line-clamp-3">
                  {launch.details || "No details available."}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
