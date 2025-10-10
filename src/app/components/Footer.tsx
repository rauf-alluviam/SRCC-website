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
import CaseStudiesModal from "../components/CaseStudiesModal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("");
  const [isCaseStudiesModalOpen, setIsCaseStudiesModalOpen] = useState(false);

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
      <CaseStudiesModal
        isOpen={isCaseStudiesModalOpen}
        onClose={() => setIsCaseStudiesModalOpen(false)}
      />

      <footer 
        className="relative text-[#5A4A42] overflow-hidden bg-white" 
        style={{
          backgroundImage: "url('/map-pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
          {/* CTA */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 px-2 leading-tight">
              Ready to move your cargo with SRCC's reliable and eco-friendly fleet?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <button
                onClick={() => openModal("Book a CNG Truck Now")}
                className="w-full sm:w-auto bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-6 sm:px-8 py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
              >
                Book a CNG Truck Now
              </button>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10 lg:gap-14 text-[#5A4A42]">
            {/* About */}
            <div className="flex-1 space-y-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2">
                <FaTruck className="text-[#F7941E] text-lg sm:text-xl" /> 
                SRCC Logistics
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">
                We provide reliable, safe, and eco-friendly truck transport solutions,
                tailored to meet your business requirements.
              </p>

              {/* Buttons under description */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => setIsCaseStudiesModalOpen(true)}
                  className="w-full sm:w-auto bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
                >
                  Download Case Study
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex-1 space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold">Contact Information</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <FaPhone className="text-[#F7941E] text-base sm:text-lg flex-shrink-0" />
                  <a href="tel:+919924304441" className="hover:underline">
                    +91-9924304441
                  </a>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                  <FaEnvelope className="text-[#F7941E] text-base sm:text-lg flex-shrink-0" />
                  <a
                    href="mailto:mohit@srcontainercarriers.com"
                    className="hover:underline break-all"
                  >
                    mohit@srcontainercarriers.com
                  </a>
                </li>
                {/* Locations Section */}
                <li className="flex items-start gap-3 sm:gap-4 text-xs sm:text-sm">
                  <FaMapMarkerAlt className="text-[#F7941E] text-lg sm:text-xl mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    {/* Section Heading */}
                    <h4 className="text-[#5A4A42] font-semibold text-sm sm:text-base mb-1">
                      Where We Are
                    </h4>

                    {/* Head Office */}
                    <div className="leading-relaxed text-xs sm:text-sm">
                      <span className="font-semibold text-[#5A4A42]">Head Office:</span>
                      <a
                        href="https://maps.app.goo.gl/z6BfrtJSdYqBveaF7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#5A4A42] hover:underline block"
                      >
                        A 204 / 205, Wall Street – II, Opp. Orient Club, Ellis Bridge, Ahmedabad – 380006 (INDIA)
                      </a>
                    </div>

                    {/* Divider */}
                    <hr className="border-gray-300" />

                    {/* ICD Office */}
                    <div className="leading-relaxed text-xs sm:text-sm">
                      <span className="font-semibold text-[#5A4A42]">ICD Office:</span>
                      <a
                        href="https://maps.app.goo.gl/dxJaHPMHhJPDEed78"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#5A4A42] hover:underline block"
                      >
                        Krishna Plaza, ICD Khodiyar,Opp. Gate No-2 Sarkhej-Gandhinagar Highway,Ahmedabad-382421
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div className="flex-1 space-y-3">
              <h3 className="text-base sm:text-lg md:text-xl font-bold">Get in Touch</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                Have questions or want to learn more? Reach out via our contact form or
                details above.
              </p>
              {/* <Link
                href="/contact-us"
                className="inline-block w-full sm:w-auto text-center bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
              >
                Contact Us
              </Link> */}

              {/* Social Media Icons */}
              <div className="flex gap-4 sm:gap-5 mt-4 sm:mt-5">
                {[
                  { icon: FaLinkedin, link: "https://www.linkedin.com/company/sr-container-carriers/" },
                  { icon: FaYoutube, link: "https://www.youtube.com/@SRContainerCarriers-i9t" },
                ].map(({ icon: Icon, link }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#5A4A42] text-xl sm:text-2xl transform transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50">
          {/* Factory/Industrial Image - Full Width */}
          <div className="w-full relative -mt-4 sm:-mt-8">
            <img
              src="/factory.png"
              alt="Industrial Factory Landscape"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "300px", minHeight: "150px" }}
            />

            {/* Truck Animations */}
            <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 md:h-24 overflow-hidden">
              <img
                src="/truck-1.png"
                alt="Truck 1"
                className="absolute bottom-0 w-12 sm:w-16 md:w-20 animate-truck-rtl"
                style={{ animationDelay: "0s" }}
              />
              <img
                src="/truck-2.png"
                alt="Truck 2"
                className="absolute bottom-0 w-14 sm:w-20 md:w-24 animate-truck-ltr"
                style={{ animationDelay: "2s" }}
              />
              <img
                src="/truck-3.png"
                alt="Truck 3"
                className="absolute bottom-0 w-10 sm:w-12 md:w-16 animate-truck-rtl"
                style={{ animationDelay: "5s" }}
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-900 text-gray-200 py-3 sm:py-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 px-4 sm:px-6 lg:px-8">
          {/* Copyright */}
          <p className="text-center md:text-left text-xs sm:text-sm leading-relaxed">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">SR Container Carriers</span>.
            <span className="hidden sm:inline"> Built with care by Suraj Group.</span>
            <span className="block sm:hidden text-center mt-1">Built with care by Suraj Group.</span>
          </p>

          {/* Policy Links */}
          <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
            <Link 
              href="/privacy" 
              className="text-gray-200 hover:text-white hover:underline whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-200 hover:text-white hover:underline whitespace-nowrap"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}