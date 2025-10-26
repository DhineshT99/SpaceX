import { useEffect, useState } from "react";
import { getLaunches } from "../api/space";

interface Launch {
  id: string;
  name: string;
  rocket?: string;
  date_utc: string;
  details?: string;
  links?: {
    patch?: {
      small?: string;
    };
  };
}

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

  if (loading) return <div className="p-6 text-gray-400">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">SpaceX Launches</h2>

      <input
        type="text"
        placeholder="Search launches..."
        value={search}
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredLaunches.length === 0 ? (
        <p className="text-gray-400">No launches found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLaunches.map((launch) => (
            <div
              key={launch.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
            >
              {launch.links?.patch?.small ? (
                <img
                  src={launch.links.patch.small}
                  alt={launch.name}
                  className="w-full h-48 object-contain bg-black"
                />
              ) : (
                <div className="w-full h-48 bg-gray-900 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div className="p-4">
                <h3 className="font-semibold text-lg">{launch.name}</h3>
                <p className="text-sm text-gray-400">
                  Rocket: {launch.rocket || "N/A"}
                </p>
                <p className="text-sm mt-1 text-gray-400">
                  Date: {new Date(launch.date_utc).toLocaleDateString()}
                </p>
                <p className="text-gray-300 mt-2 line-clamp-3">
                  {launch.details || "No details available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
