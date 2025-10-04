"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, source }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) setSubmitted(true);
      else alert("Something went wrong. Please try again.");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  const getTitle = () => {
    if (source === "Get a Quote" || source === "Track Shipment") return "Request a Quote";
    if (source === "Try SRE Lock Free") return "Try SRE Lock Free";
    if (source === "Download Case Study") return "Download Case Study";
    if (source === "Book a CNG Truck Now" || source === "Book CNG Truck") return "Book a CNG Truck";
    return "Contact Us";
  };

  const getButtonText = () => {
    if (loading) return "Sending...";
    if (source === "Try SRE Lock Free") return "Request Free Trial";
    if (source === "Download Case Study") return "Download Now";
    if (source === "Book a CNG Truck Now" || source === "Book CNG Truck") return "Book Now";
    return "Submit";
  };

  const getMessagePlaceholder = () => {
    if (source === "Try SRE Lock Free") return "Any specific requirements for your trial?";
    if (source === "Download Case Study") return "Enter your company or interest";
    if (source === "Book a CNG Truck Now" || source === "Book CNG Truck")
      return "Enter pickup location, date, and any requirements";
    return "Your message";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 mx-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-[#F7941E] transition"
            onClick={() => {
              onClose();
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", message: "" });
            }}
          >
            ✕
          </button>

          {!submitted ? (
            <>
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img src="/logo.png" alt="SRCC Logo" className="h-14 sm:h-16" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-[#F7941E] mb-3 text-center">
                {getTitle()}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Fill in your details and our team will get back to you promptly.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941E] transition shadow-sm placeholder-gray-500"
              />

               <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941E] transition shadow-sm placeholder-gray-500"
              />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941E] transition shadow-sm placeholder-gray-500"
                />
                <textarea
                  name="message"
                  placeholder={getMessagePlaceholder()}
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F7941E] transition shadow-sm resize-none h-28 placeholder-gray-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105"
                >
                  {getButtonText()}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-green-600 text-lg font-semibold mb-2">
                Your request has been received!
              </p>
              <p className="text-gray-600 mb-4">We’ll respond to you soon.</p>
              <button
                onClick={() => {
                  onClose();
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", message: "" });
                }}
                className="bg-[#F7941E] hover:bg-[#5A4A42] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 hover:scale-105"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteModal;
