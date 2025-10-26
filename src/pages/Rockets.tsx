import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRockets } from "../api/space";

interface Rocket {
  id: string;
  name: string;
  company: string;
  flickr_images: string[];
}

export default function Rockets() {
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRockets()
      .then(res => setRockets(res.data))
      .catch(err => console.error("Error fetching rockets:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredRockets = rockets.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">SpaceX Rockets</h2>

      <input
        placeholder="Search rocket..."
        className="border bg-gray-900 border-gray-700 rounded p-2 mb-4 w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-center">Loading rockets...</p>
      ) : filteredRockets.length === 0 ? (
        <p className="text-center">No rockets found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRockets.map(rocket => (
            <Link
              key={rocket.id}
              to={`/rockets/${rocket.id}`}
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {rocket.flickr_images?.[0] && (
                <img
                  src={rocket.flickr_images[0]}
                  alt={rocket.name}
                  className="h-52 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{rocket.name}</h3>
                <p className="text-sm opacity-75">{rocket.company}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
