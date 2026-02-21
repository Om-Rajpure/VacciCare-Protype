import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Shield, Calendar, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    icon: Shield,
    title: "Track Vaccines Easily",
    description: "Keep all vaccination records in one place with automatic reminders",
    color: "from-[#a8d8ea] to-[#6b9bd1]",
  },
  {
    icon: Calendar,
    title: "Get Doctor-Verified Guidance",
    description: "Access expert advice and verified medical information for your baby",
    color: "from-[#ffccd5] to-[#f8b4d8]",
  },
  {
    icon: Bell,
    title: "Never Miss a Dose Again",
    description: "Receive timely notifications and reminders for upcoming vaccinations",
    color: "from-[#c7f0db] to-[#a8e6cf]",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Skip Button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            {/* Icon */}
            <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center mb-8 shadow-2xl`}>
              <Icon className="w-24 h-24 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-center mb-4 text-[#2d3748]">
              {slide.title}
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600 leading-relaxed">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-[#6b9bd1]"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#6b9bd1] text-white py-4 rounded-2xl shadow-lg hover:bg-[#5a8bc1] transition-colors flex items-center justify-center space-x-2"
        >
          <span>{currentSlide === slides.length - 1 ? "Get Started" : "Next"}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
