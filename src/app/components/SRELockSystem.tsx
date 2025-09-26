"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaLock, FaFileInvoice, FaUser } from "react-icons/fa";
import { GiRadarDish } from "react-icons/gi";

type FeatureDetails = {
  subtitle: string;
  content?: string;
  points?: string[];
  image: string;
};

type Feature = {
  title: string;
  description: string;
  details: FeatureDetails;
  icon: React.ComponentType;
  color: string;
};

const features: Feature[] = [
  {
    title: "Real-Time GPS Tracking",
    description:
      "Track shipments live with GPS + IoT devices for location, speed & ETA updates.",
    details: {
      subtitle: "Real-Time Tracking & Visibility",
      content: `Stay in the know 24/7! Our trucks are equipped with cutting-edge GPS trackers and IoT sensors, feeding live data into our centralized platform. Check your container’s location, speed, and ETA anytime. Our dispatch team uses this data to optimize routes and tackle delays proactively.

Plus, SRCC offers a customer portal where you can track active shipments and access historical delivery data – transparency at your fingertips!`,
      image: "/tracking.png",
    },
    icon: GiRadarDish,
    color: "bg-green-600/20 text-green-600",
  },
  {
    title: "Digital Documentation & e-LRs",
    description:
      "Instantly generate Digital Lorry Receipts (LR) & electronic PODs with zero paperwork.",
    details: {
      subtitle: "Digital Documentation & e-LRs",
      content: `Forget lost papers! Our drivers and operations team generate digital LRs and capture electronic Proof of Delivery on handheld devices. You receive your shipment documentation instantly via email or portal.

Faster invoicing, accurate records, and fully contactless – making logistics smoother than ever.`,
      image: "/docs.png",
    },
    icon: FaFileInvoice,
    color: "bg-red-600/20 text-red-600",
  },
  {
    title: "Driver Module",
    description:
      "A mobile app for drivers to manage trips, receive alerts, and handle documents digitally.",
    details: {
      subtitle: "Driver App & Alerts",
      content: `Empowering our drivers with a sleek, mobile-friendly app. They can view trip details, receive instant alerts, upload PODs, and manage documents. Result? Faster deliveries, fewer errors, and a more reliable logistics experience for you.`,
      image: "/driver.png",
    },
    icon: FaUser,
    color: "bg-blue-600/20 text-blue-600",
  },
  {
    title: "SR eLock Digital Security",
    description:
      "IoT-enabled cargo lock for tamper alerts, GPS tracking, and per-shipment rentals.",
    details: {
      subtitle: "SR eLock – Smart Cargo Lock",
      points: [
        "IoT-enabled lock with real-time monitoring",
        "Instant tamper alerts with time & GPS location",
        "Unlock only via secure digital key",
        "Rental option per shipment – perfect for high-value cargo",
        "Integrated with SRCC tracking dashboard",
      ],
      image: "/E-lock.png",
    },
    icon: FaLock,
    color: "bg-yellow-600/20 text-yellow-600",
  },
  {
    title: "Automation & Future Tech",
    description:
      "AI-driven routes, blockchain documentation, and IoT sensors – SRCC stays future-ready.",
    details: {
      subtitle: "Automation & Innovation",
      content: `We’re always innovating! AI-driven route optimization reduces transit times and fuel use, while blockchain documentation ensures data security. Our IoT sensors monitor temperature and shock for sensitive cargo. SRCC is committed to delivering smarter, safer, and faster logistics – today and tomorrow.`,
      image: "/future.png",
    },
    icon: FaTruck,
    color: "bg-purple-600/20 text-purple-600",
  },
];

export default function TechnologyStack() {
  const [openFeature, setOpenFeature] = useState<Feature | null>(null);

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/technology.png"
          alt="SRCC Technology Dashboard"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/60"></div>
      </div>

      <div className="relative z-10">
        {/* Heading + Intro */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Technology-Driven Logistics
          </motion.h2>
          <motion.p
            className="text-gray-200 text-sm sm:text-base md:text-lg max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            At SRCC, we leverage cutting-edge technology to make freight transport smarter, safer, and more efficient. Transparency, security, and real-time control – that’s our promise.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-center text-center group hover:scale-105 hover:bg-white transition-all duration-500 border border-white/20 cursor-pointer`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                onClick={() => setOpenFeature(feature)}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-3 sm:mb-4 ${feature.color} text-xl sm:text-2xl`}
                >
                  <Icon />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <motion.a
            href="/request-demo"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg inline-block transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-red-500 hover:border-red-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Try SRE Lock Free
          </motion.a>
        </div>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {openFeature && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-2 sm:p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-3xl md:max-w-4xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                src={openFeature.details.image}
                alt={openFeature.title}
                className="w-full md:w-48 h-48 object-contain flex-shrink-0"
                animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <div className="flex-1 overflow-auto max-h-[70vh] space-y-3 sm:space-y-4">
                <motion.h3
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {openFeature.title}
                </motion.h3>
                <motion.p
                  className="text-red-600 font-semibold text-sm sm:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {openFeature.details.subtitle}
                </motion.p>
                {openFeature.details.content && (
                  <motion.p
                    className="text-gray-700 text-sm sm:text-base whitespace-pre-line leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {openFeature.details.content}
                  </motion.p>
                )}
                {openFeature.details.points && (
                  <motion.ul
                    className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1 sm:space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {openFeature.details.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </motion.ul>
                )}
                <motion.button
                  onClick={() => setOpenFeature(null)}
                  className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition w-full sm:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
