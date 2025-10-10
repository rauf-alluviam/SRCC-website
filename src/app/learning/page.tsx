"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
const videos = [
  {
    title: "What's the difference between a tipper and flatbed?",
    url: "https://youtu.be/3fbNs2yloow",
    id: "3fbNs2yloow",
  },
  {
    title: "How to prepare your place for tipper unloading?",
    url: "https://youtu.be/6L5p1Oos-d0",
    id: "6L5p1Oos-d0",
  },
  {
    title: "How to use the customer login for Alvision EXIM",
    url: "https://youtu.be/X_QVBPN_8ag",
    id: "X_QVBPN_8ag",
  },
  {
    title: "How does the SR E Lock secure my cargo?",
    url: "https://youtu.be/_Sdrba1YM1E",
    id: "_Sdrba1YM1E",
  },
  {
    title: "What happens if there's Container damage & how to react to it?",
    url: "https://youtu.be/_v_O3rl2Pvs",
    id: "_v_O3rl2Pvs",
  },
  {
    title: "How does SRCC help with compliance?",
    url: "https://youtu.be/vRv7DR6Cllo",
    id: "vRv7DR6Cllo",
  },
  {
    title: "Types of Container damage, Price associated with it.",
    url: "https://youtu.be/bijU8MT5GMA",
    id: "bijU8MT5GMA",
  },
  {
    title: "How to keep your factory floor ground clean for no Type damage (RTRB)",
    url: "https://youtu.be/oo1O6fKdyE0",
    id: "oo1O6fKdyE0",
  },
  {
    title: "How to safeguard yourself from container damage?",
    url: "https://youtu.be/tEWZefQNeyg",
    id: "tEWZefQNeyg",
  },
  {
    title: "How to open a shipping container safely?",
    url: "https://youtu.be/0-jEjFkLjE0",
    id: "0-jEjFkLjE0",
  },
];

export default function LearningCenter() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#5A4A42] py-10 px-4 sm:px-6 md:px-12 lg:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10"
      >
        Customer Learning Center
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {videos.map((video, index) => (
          <motion.a
            key={index}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="relative bg-white rounded-xl shadow-md overflow-hidden group transition hover:shadow-2xl"
          >
         <div className="relative w-full aspect-video">
            <Image
              src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Play Icon Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }} // desktop hover
              whileTap={{ opacity: 1, scale: 1 }}   // mobile tap
              className="absolute inset-0 flex items-center justify-center bg-[#F7941E]/25 sm:bg-transparent sm:group-hover:bg-[#F7941E]/25"
            >
              <FaPlay className="text-white text-3xl sm:text-4xl md:text-5xl drop-shadow-lg" />
            </motion.div>
          </div>

            {/* Video Title with Animated Underline */}
            <div className="p-4">
              <h3 className="font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-[#5A4A42] group-hover:text-[#F7941E] relative transition-all">
                {video.title}
                <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#F7941E] transition-all group-hover:w-full rounded-full"></span>
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </main>
  );
}