import { useEffect, useState } from "react";
import { getHistory } from "../api/space";

interface SpaceEvent {
  id: string;
  title: string;
  details: string;
  event_date_utc: string;
  links?: {
    article?: string;
  };
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

  if (loading) return <div className="p-6 text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">SpaceX History</h2>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-gray-400">No events found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200"
            >
              <h3 className="font-semibold text-xl">{event.title}</h3>
              <p className="text-sm text-gray-400">
                {new Date(event.event_date_utc).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-300">{event.details}</p>

              {event.links?.article && (
                <a
                  href={event.links.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline mt-3 inline-block"
                >
                  Read more →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
