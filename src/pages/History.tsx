import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getHistory } from "../api/space";

interface SpaceEvent {
  id: string;
  title: string;
  details: string;
  event_date_utc: string;
  links?: { article?: string };
}

export default function History() {
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setEvents(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch SpaceX history:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = events.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 animate-pulse text-center px-4">
        <p className="text-base sm:text-lg md:text-xl">Loading cosmic data...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 sm:p-6 text-red-400 text-center text-sm sm:text-base">
        {error}
      </div>
    );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_60%)] animate-[pulse_10s_infinite_alternate]" />
      <div className="absolute inset-0 bg-black opacity-90" />

      <div className="relative px-4 sm:px-6 md:px-8 py-10 max-w-5xl mx-auto z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 tracking-wide uppercase"
        >
          SpaceX Cosmic History
        </motion.h2>

        {/* Search bar */}
        <motion.input
          type="text"
          placeholder="Search cosmic events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full p-2.5 sm:p-3 rounded-lg mb-6 sm:mb-8 bg-gray-900 text-gray-300 border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-white 
          text-sm sm:text-base focus:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
        />

        {/* Empty state */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-sm sm:text-base">
            No cosmic events found.
          </p>
        ) : (
          <motion.div
            layout
            className="space-y-4 sm:space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {filtered.map((event) => (
              <motion.div
                key={event.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 sm:p-5 
                border border-gray-700 hover:border-white transition-all 
                shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-lg sm:text-2xl font-semibold mb-1">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-2">
                  {new Date(event.event_date_utc).toLocaleDateString()}
                </p>
                <p className="text-sm sm:text-base text-gray-300 mb-3 leading-relaxed">
                  {event.details}
                </p>
                {event.links?.article && (
                  <a
                    href={event.links.article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-medium text-transparent bg-clip-text 
                    bg-gradient-to-r from-white via-white to-gray-200 
                    hover:from-red-400 hover:via-pink-400 hover:to-red-400 
                    text-sm sm:text-base transition-all duration-500"
                  >
                    Read more →
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
