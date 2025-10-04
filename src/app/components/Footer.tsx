"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaTruck,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import QuoteModal from "./form";
export default function Footer() {
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("");

  const openModal = (source: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };
  return (
            <>
      {/* Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
       <footer className="relative text-[#5A4A42] overflow-hidden bg-white" style={{
        backgroundImage: "url('/map-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
          {/* CTA */}
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
              Ready to move your cargo with SRCC’s reliable and eco-friendly fleet?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button
                onClick={() => openModal("Request a Quote")}
                className="bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
              >
                Request a Quote
              </button>
              <button
                onClick={() => openModal("Book a CNG Truck Now")}
                className="bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
              >
                Book a CNG Truck Now
              </button>
            </div>
          </div>

        {/* Footer Columns */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-14 text-[#5A4A42]">
          {/* About */}
          <div className="flex-1 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <FaTruck className="text-[#F7941E] text-xl" /> SRCC Logistics
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              We provide reliable, safe, and eco-friendly truck transport solutions,
              tailored to meet your business requirements.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex-1 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm sm:text-base">
                <FaPhone className="text-[#F7941E] text-lg" />
                <span>+91-9924304441</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base">
                <FaEnvelope className="text-[#F7941E] text-lg" />
                <a
                  href="mailto:contact@srcc.example.com"
                  className="hover:underline"
                >
                  mohit@srcontainercarriers.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-[#F7941E] text-lg mt-1" />
                <a
                  href="https://www.google.com/maps/place/Suraj+Forwarders+Private+Limited/@23.0246754,72.5655697,17z/data=!3m1!4b1!4m6!3m5!1s0x395e85c3d79b0881:0x3f9576a2646b22dc!8m2!3d23.0246705!4d72.5681446!16s%2Fg%2F11tcmmmdfv!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="https://www.google.com/maps/place/Suraj+Forwarders+Private+Limited/@23.0246754,72.5655697,17z/data=!3m1!4b1!4m6!3m5!1s0x395e85c3d79b0881:0x3f9576a2646b22dc!8m2!3d23.0246705!4d72.5681446!16s%2Fg%2F11tcmmmdfv!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
                  rel="noopener noreferrer"
                  className="hover:underline leading-relaxed"
                >
                  A 204 / 205, Wall Street – II, Opp. Orient Club, Ellis Bridge,
                  Ahmedabad – 380006 (INDIA)
                </a>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex-1 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold">Get in Touch</h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Have questions or want to learn more? Reach out via our contact form or
              details above.
            </p>
            <Link
              href="/contact-us"
              className="inline-block bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
            >
              Contact Us
            </Link>

            {/* Social Media Icons */}
            <div className="flex gap-5 mt-5">
              {[
                { icon: FaFacebook, link: "https://facebook.com" },
                { icon: FaTwitter, link: "https://twitter.com" },
                { icon: FaInstagram, link: "https://instagram.com" },
                { icon: FaLinkedin, link: "https://linkedin.com" },
                { icon: FaYoutube, link: "https://youtube.com" },
              ].map(({ icon: Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#5A4A42] text-2xl transform transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="relative w-full overflow-hidden">
        {/* Bottom Image overlapping the footer content */}
        <div className="w-screen -mt-12 relative">
          <img
            src="/footer-shape.png"
            alt="Footer Bottom Graphic"
            className="w-screen max-w-full h-auto object-cover"
          />

          {/* Truck Animations */}
          <div className="absolute bottom-0 left-0 w-full h-24 overflow-hidden">
            <img
              src="/truck-1.png"
              alt="Truck 1"
              className="absolute bottom-0 w-16 sm:w-20 animate-truck-rtl"
              style={{ animationDelay: "0s" }}
            />
            <img
              src="/truck-2.png"
              alt="Truck 2"
              className="absolute bottom-0 w-20 sm:w-24 animate-truck-ltr"
              style={{ animationDelay: "2s" }}
            />
            <img
              src="/truck-3.png"
              alt="Truck 3"
              className="absolute bottom-0 w-12 sm:w-16 animate-truck-rtl"
              style={{ animationDelay: "5s" }}
            />
          </div>
        </div>
        </div>

          <div className="bg-blue-900 text-gray-200 py-4 flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-12">
          {/* Copyright */}
          <p className="text-center md:text-left text-xs sm:text-sm md:text-base">
            &copy; {new Date().getFullYear()} <span className="font-semibold">SR Container Carriers</span>. 
            Built with care by Suraj Group.
          </p>

          {/* Policy Links */}
          <div className="flex gap-4 mt-2 md:mt-0 text-xs sm:text-sm md:text-base">
            <Link href="/privacy" className="text-gray-200 hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-200 hover:text-white hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>

    </footer>
    
   </>
  );
}
