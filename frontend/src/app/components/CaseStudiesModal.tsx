"use client";

import { useState } from "react";
import { FileText, Download, Mail, X } from "lucide-react";

interface CaseStudiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CaseStudy {
  file: string;
  title: string;
}

export default function CaseStudiesModal({ isOpen, onClose }: CaseStudiesModalProps) {
  const [email, setEmail] = useState("");
  const [pdf, setPdf] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [pdfTouched, setPdfTouched] = useState(false);
  const [source, setSource] = useState("website");
  const fileName = pdf.split("/").pop() || "file.pdf";


const caseStudies: CaseStudy[] = [
  { file: "/case-studies/SRCC-AIVision-website-flyer.pdf", title: "AI Vision Technology" },
  { file: "/case-studies/SRCC-CNG-Website-Flyer-Design.pdf", title: "CNG Fleet Management" },
  { file: "/case-studies/SRCC-Tipper-Case-Study-Website-Flyer.pdf", title: "Tipper Operations" },
];


  // ----------------- Validation -----------------
  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (email.length > 100) return "Email must be less than 100 characters";

    const [localPart, domain] = email.split("@");
    if (!domain || domain.length < 3) return "Please enter a valid email domain";

    const blockedDomains = [
      "tempmail.com", "mailinator.com", "example.com", "fake.com",
      "dummy.com", "test.com"
    ];
    if (domain && blockedDomains.includes(domain.toLowerCase())) return "Please use a real email address";

    return "";
  };

  const validatePdf = (pdf: string) => {
    if (!pdf.trim()) return "Please select a case study";
    return "";
  };

  // ----------------- Handlers -----------------
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailTouched) setEmailError(validateEmail(e.target.value));
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPdf(e.target.value);
    if (pdfTouched) setPdfError(validatePdf(e.target.value));
  };

  const handlePdfBlur = () => {
    setPdfTouched(true);
    setPdfError(validatePdf(pdf));
  };

  const handleClose = () => {
    onClose();
    setEmail("");
    setPdf("");
    setEmailError("");
    setPdfError("");
    setEmailTouched(false);
    setPdfTouched(false);
  };
  const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://srccweb.s3-website.ap-south-1.amazonaws.com/api/send-lead"
    : "http://localhost:3001/api/send-lead";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const emailValidation = validateEmail(email);
  const pdfValidation = validatePdf(pdf);
  setEmailTouched(true);
  setPdfTouched(true);
  setEmailError(emailValidation);
  setPdfError(pdfValidation);
  if (emailValidation || pdfValidation) return;

  setIsSubmitting(true);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pdf, source }),
    });
    const data = await res.json();
    console.log("API Response:", data);
  } catch (err) {
    console.error("Error sending lead:", err);
  }

  // Trigger download
  const downloadFile = (filePath: string) => {
    const link = document.createElement("a");
    const fileName = filePath.split("/").pop() || "file.pdf";
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (pdf === "all") {
    caseStudies.forEach((study, i) => {
      setTimeout(() => downloadFile(study.file), i * 500);
    });
  } else {
    downloadFile(pdf);
  }

  setIsSubmitting(false); // ✅ reset after download
  handleClose();
};



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="absolute inset-0 backdrop-blur-md bg-black/20"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F7941E] flex items-center justify-center flex-shrink-0">
              <FileText className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Download Case Study</h2>
              <p className="text-xs text-slate-300">Get insights into our solutions</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`
                  w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2
                  ${emailError && emailTouched ? 'border-red-500' : 'border-slate-200'}
                  bg-white text-gray-800 placeholder-gray-500
                  ${emailError && emailTouched ? 'focus:border-red-500 focus:ring-red-50' : 'focus:border-[#F7941E] focus:ring-orange-50'}
                  focus:ring-2 outline-none transition-all
                `}
              />
            </div>
            {emailError && emailTouched && (
              <p className="text-red-500 text-xs mt-1.5">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Case Study
            </label>
            <div className="relative">
              <Download className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <select
                value={pdf}
                onChange={handlePdfChange}
                onBlur={handlePdfBlur}
                className={`
                  w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border-2
                  ${pdfError && pdfTouched ? 'border-red-500' : 'border-slate-200'}
                  bg-white text-gray-800 placeholder-gray-500
                  ${pdfError && pdfTouched ? 'focus:border-red-500 focus:ring-red-50' : 'focus:border-[#F7941E] focus:ring-orange-50'}
                  focus:ring-2 outline-none transition-all appearance-none cursor-pointer
                `}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                }}
              >
                <option value="">Choose a case study...</option>
                {caseStudies.map((study) => (
                  <option key={study.file} value={study.file}>
                    {study.title}
                  </option>
                ))}
                <option value="all">All Case Studies (ZIP)</option>
              </select>
            </div>
            {pdfError && pdfTouched && (
              <p className="text-red-500 text-xs mt-1.5">{pdfError}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#F7941E] to-orange-600 text-white font-semibold py-2.5 text-sm rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download Now</span>
              </>
            )}
          </button>

          <p className="text-xs text-center text-slate-500 pt-1">
            We respect your privacy and data security
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}