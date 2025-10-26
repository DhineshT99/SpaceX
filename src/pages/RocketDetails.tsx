import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRocketById } from "../api/space";

interface Rocket {
  name: string;
  description: string;
  flickr_images: string[];
  height: { meters: number };
  diameter: { meters: number };
  mass: { kg: number };
  cost_per_launch: number;
}

export default function RocketDetails() {
  const { id } = useParams<{ id: string }>();
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRocket = async () => {
      try {
        const res = await getRocketById(id);
        setRocket(res.data);
      } catch (error) {
        console.error("Failed to fetch rocket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRocket();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!rocket) return <p className="text-center mt-10">Rocket not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {rocket.flickr_images?.[0] && (
        <img
          src={rocket.flickr_images[0]}
          alt={rocket.name || "Rocket Image"}
          className="rounded-lg mb-6 mx-auto"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{rocket.name}</h1>
      <p className="mb-4">{rocket.description}</p>
      <div className="bg-gray-900 text-white rounded-lg p-4">
        <p>Height: {rocket.height?.meters ?? "N/A"} m</p>
        <p>Diameter: {rocket.diameter?.meters ?? "N/A"} m</p>
        <p>Mass: {rocket.mass?.kg ?? "N/A"} kg</p>
        <p>Cost per Launch: ${rocket.cost_per_launch?.toLocaleString() ?? "N/A"}</p>
      </div>
    </div>
  );
}
