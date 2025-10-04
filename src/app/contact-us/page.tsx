"use client";

import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";


export default function ContactPage() {
  return (
    <section className="w-full bg-white text-gray-900" style={{ colorScheme: "light" }}>
      {/* Hero Section with Map */}
      <div className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.180394893153!2d72.56079577490377!3d23.031523216036885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f523f14d2f%3A0xb0c7c1457e7d88a7!2sA%20204%2F205%2C%20Wall%20Street%20-%20II%2C%20Opp.%20Orient%20Club,+Ellis%20Bridge,+Ahmedabad%20-%20380006%20(INDIA)!5e0!3m2!1sen!2sin!4v1695500000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-bold drop-shadow-lg"
          >
            Get In Touch With Us
          </motion.h1>
          <button
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Suraj+Forwarders+Private+Limited/@23.0246754,72.5655697,17z",
                "_blank"
              )
            }
            className="mt-4 md:mt-6 px-5 py-2 md:px-6 md:py-3 bg-[#F7941E] hover:bg-[#5A4A42] text-white text-sm md:text-base font-semibold rounded-lg shadow-md transition"
          >
            View Large
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 py-12 px-4 sm:px-6 lg:px-8">
        {/* Contact Form */}
        <div
          className="bg-white text-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg"
          style={{ colorScheme: "light" }} 
        >
          <div className="flex items-center gap-2 text-[#F7941E] text-xs sm:text-sm font-medium underline underline-offset-4 mb-2">
            <span>Send Us Mail</span>
            <Image src="/conatct-truck.png" alt="truck" width={20} height={20} />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Feel Free To{" "}
            <span className="underline decoration-[#F7941E]">Write</span>
          </h2>
          <p className="mb-6 text-gray-600 text-sm sm:text-base">
            We’re here to assist you with logistics, support, or inquiries. Fill in the form and we’ll get back to you shortly.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7941E] outline-none text-sm sm:text-base transition shadow-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7941E] outline-none text-sm sm:text-base transition shadow-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7941E] outline-none text-sm sm:text-base transition shadow-sm"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7941E] outline-none text-sm sm:text-base transition shadow-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Your Request"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F7941E] outline-none text-sm sm:text-base transition shadow-sm"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 border border-gray-300 rounded-xl h-28 sm:h-32 focus:ring-2 focus:ring-[#F7941E] outline-none text-sm sm:text-base transition shadow-sm"
            ></textarea>
            <button className="w-full px-6 py-3 bg-[#F7941E] hover:bg-[#5A4A42] text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-5">
          {/* Phone */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-white shadow-lg p-5 rounded-2xl">
            <div className="bg-[#F7941E] p-4 rounded-lg text-white text-lg">
              <FaPhone />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base">Have any question?</p>
              <p className="text-gray-600 text-sm sm:text-base">+91 9924304441</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-white shadow-lg p-5 rounded-2xl">
            <div className="bg-[#F7941E] p-4 rounded-lg text-white text-lg">
              <FaEnvelope />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base">Write us email</p>
              <p className="text-gray-600 text-sm sm:text-base">mohit@srcontainercarriers.com</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4 bg-white shadow-lg p-5 rounded-2xl">
            <div className="bg-[#F7941E] p-4 rounded-lg text-white text-lg">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base">Headquarters</p>
              <p className="text-gray-600 text-sm sm:text-base">
                <a
                  href="https://www.google.com/maps/place/Suraj+Forwarders+Private+Limited/@23.0246754,72.5655697,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  A 204 / 205, Wall Street – II, Opp. Orient Club, Ellis Bridge, Ahmedabad – 380006 (INDIA)
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
