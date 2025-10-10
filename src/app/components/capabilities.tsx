"use client";
import { motion, AnimatePresence } from "framer-motion";
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
    img: "/tippper2.png",
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
    <section className="relative w-full py-16 sm:py-20 bg-gray-100">
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 sm:mb-20">
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#5A4A42] mb-3">
          Our Capabilities
        </h2>
        <p className="text-gray-600 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
          Efficient, reliable, and safe transport solutions across Gujarat and beyond.
        </p>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden sm:grid max-w-7xl mx-auto px-3 grid-cols-2 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="relative w-full h-96 overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <motion.div
              initial={{ opacity: 0 }}
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

      {/* MOBILE SLIDER */}
      <div className="sm:hidden relative w-full overflow-x-auto no-scrollbar px-4">
        <div className="flex space-x-6 snap-x snap-mandatory pb-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-[85%] snap-center rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              whileTap={{ scale: 0.98 }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <motion.img
                src={service.img}
                alt={service.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center transition-transform duration-700 ease-in-out"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>

                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-200 text-sm leading-relaxed backdrop-blur-sm"
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="text-gray-300 text-xs mt-2 text-right italic">
                  {active === i ? "Tap to collapse" : "Tap to read more"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
