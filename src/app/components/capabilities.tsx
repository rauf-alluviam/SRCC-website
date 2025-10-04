"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    title: "Container Transport",
    description:
      "Across all major Gujarat ports including Khodiyar, Sanand, Hazira, Mundra, Pipavav, Dashrath, Morbi.",
    img: "/ship.jpg",
  },
  {
    title: "OEM + AutoMove Transport",
    description:
      "Dedicated service for Tier 1 suppliers; includes ICER & CNG fleet for automotive-grade movement.",
    img: "/OEM.jpg",
  },
  {
    title: "Tipper Movement",
    description:
      "Hydraulic tippers (20ft, 40ft) with 239° tilt — unloads cargo 40% faster.",
    img: "/tipper2.png",
  },
  {
    title: "Air Cargo Movement",
    description:
      "Boleros, ICERs for secure regional and last-mile cargo moves.",
    img: "/Air.jpg",
  },
];

export default function CapabilitiesPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative w-full py-20 bg-gray-100">
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#5A4A42] mb-4">
          Our Capabilities
        </h2>
        <p className="text-gray-700 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
          Efficient, reliable, and safe transport solutions across Gujarat and
          beyond.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="relative w-full h-[288px] overflow-hidden rounded-xl shadow-lg cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(active === i ? null : i)} 
          >
            
            <motion.img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: active === i ? 1 : 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4 transition-opacity duration-700 ease-in-out"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white text-sm max-w-md">
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
