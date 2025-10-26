import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRocketById } from "../api/space";

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4 text-center">
        <p className="text-base sm:text-lg md:text-xl animate-pulse">
          Loading Rocket Data...
        </p>
      </div>
    );

  if (!rocket)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4 text-center">
        <p className="text-base sm:text-lg md:text-xl text-red-400">
          Rocket not found.
        </p>
      </div>
    );

  const SpecificationCard = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | undefined;
  }) => (
    <div className="bg-gray-800 p-4 sm:p-5 rounded-xl shadow-lg border-t-2 border-gray-700">
      <p className="text-xs sm:text-sm font-light text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-lg sm:text-2xl font-bold text-white">
        {value === undefined ? "N/A" : value}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 sm:px-6 md:px-10 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight text-center md:text-left">
          {rocket.name || "Unnamed Rocket"}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 font-medium text-center md:text-left">
          Detailed overview and specifications
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          <div className="lg:col-span-2">
            {rocket.flickr_images?.[0] ? (
              <img
                src={rocket.flickr_images[0]}
                alt={`${rocket.name} rocket`}
                className="rounded-xl shadow-2xl object-cover w-full h-64 sm:h-80 md:h-96 transition duration-500 hover:scale-[1.01]"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 text-sm sm:text-base">
                Image Not Available
              </div>
            )}
          </div>

          <div className="lg:col-span-1 bg-gray-800 p-5 sm:p-6 rounded-xl shadow-xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 border-b border-gray-700 pb-2">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {rocket.description || "No detailed description available."}
            </p>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 sm:mb-6 border-b border-gray-700 pb-2 sm:pb-3">
          Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <SpecificationCard
            label="Height"
            value={`${rocket.height?.meters ?? "N/A"} m`}
          />
          <SpecificationCard
            label="Diameter"
            value={`${rocket.diameter?.meters ?? "N/A"} m`}
          />
          <SpecificationCard
            label="Mass"
            value={`${rocket.mass?.kg ?? "N/A"} kg`}
          />
          <SpecificationCard
            label="Cost per Launch"
            value={formatCurrency(rocket.cost_per_launch)}
          />
        </div>
      </div>
    </div>
  );
}
