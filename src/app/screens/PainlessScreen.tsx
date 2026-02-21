import { useNavigate } from "react-router";
import { ArrowLeft, Syringe, Check, X, DollarSign, MapPin } from "lucide-react";
import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";

export default function PainlessScreen() {
  const navigate = useNavigate();

  const comparison = [
    {
      feature: "Pain Level",
      regular: "Moderate to High",
      painless: "Minimal to None",
      regularGood: false,
      painlessGood: true,
    },
    {
      feature: "Swelling",
      regular: "Common",
      painless: "Rare",
      regularGood: false,
      painlessGood: true,
    },
    {
      feature: "Fever",
      regular: "Frequent",
      painless: "Less Common",
      regularGood: false,
      painlessGood: true,
    },
    {
      feature: "Cost",
      regular: "₹0-500",
      painless: "₹2000-5000",
      regularGood: true,
      painlessGood: false,
    },
    {
      feature: "Availability",
      regular: "Widely Available",
      painless: "Limited Centers",
      regularGood: true,
      painlessGood: false,
    },
  ];

  const hospitals = [
    {
      name: "Apollo Hospitals",
      location: "Jubilee Hills, Hyderabad",
      distance: "1.2 km",
      price: "₹3,500",
    },
    {
      name: "Rainbow Children's Hospital",
      location: "Banjara Hills, Hyderabad",
      distance: "2.5 km",
      price: "₹4,200",
    },
    {
      name: "Yashoda Hospitals",
      location: "Secunderabad, Hyderabad",
      distance: "4.2 km",
      price: "₹3,800",
    },
  ];

  const faqs = [
    {
      question: "What makes painless vaccines different?",
      answer:
        "Painless vaccines use acellular technology with purified antigens, causing less inflammation and discomfort. They contain fewer side effects while providing the same immunity protection.",
    },
    {
      question: "Are painless vaccines as effective?",
      answer:
        "Yes! Painless vaccines are equally effective in building immunity. They're approved by WHO and recommended by pediatricians worldwide. The only difference is reduced side effects.",
    },
    {
      question: "Which vaccines are available in painless versions?",
      answer:
        "Most commonly: DTaP (painless DTP), IPV (painless Polio), Hib, and PCV. These are the vaccines that typically cause more discomfort in their regular forms.",
    },
    {
      question: "Is the higher cost worth it?",
      answer:
        "Many parents find it worthwhile for reduced crying, fever, and swelling. It also means less stress for both baby and parents. However, regular vaccines are equally effective if budget is a concern.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-white mb-2">Painless Vaccines</h2>
        <p className="text-white/90 text-sm">Complete information & comparison</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-[#c7f0db] to-[#a8e6cf] rounded-3xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              <Syringe className="w-6 h-6 text-[#48bb78]" />
            </div>
            <div>
              <h3 className="text-[#2d3748] mb-2">What are Painless Vaccines?</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Painless vaccines use advanced acellular technology that reduces side effects like fever, pain, and swelling while providing the same immunity protection.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-[#2d3748] mb-4">Regular vs Painless</h3>

          <div className="space-y-3">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-3 pb-3 border-b border-gray-200">
              <div className="text-sm text-gray-600">Feature</div>
              <div className="text-sm text-gray-600 text-center">Regular</div>
              <div className="text-sm text-gray-600 text-center">Painless</div>
            </div>

            {/* Comparison Rows */}
            {comparison.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-3 items-center py-2"
              >
                <div className="text-sm text-[#2d3748]">{item.feature}</div>
                <div className="flex items-center justify-center space-x-1">
                  {item.regularGood ? (
                    <Check className="w-4 h-4 text-[#48bb78]" />
                  ) : (
                    <X className="w-4 h-4 text-[#fc8181]" />
                  )}
                  <span className="text-xs text-gray-600">{item.regular}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  {item.painlessGood ? (
                    <Check className="w-4 h-4 text-[#48bb78]" />
                  ) : (
                    <X className="w-4 h-4 text-[#fc8181]" />
                  )}
                  <span className="text-xs text-gray-600">{item.painless}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cost Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-[#f6ad55]" />
            <h3 className="text-[#2d3748]">Cost Breakdown</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-[#e8f4f8] rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Regular Vaccines (Full Schedule)</p>
              <p className="text-2xl text-[#2d3748]">₹500 - ₹1,500</p>
            </div>
            <div className="bg-[#fff5e6] rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Painless Vaccines (Full Schedule)</p>
              <p className="text-2xl text-[#2d3748]">₹8,000 - ₹15,000</p>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-4">
            * Prices vary by hospital and location. Contact hospitals for accurate pricing.
          </p>
        </motion.div>

        {/* Hospitals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#2d3748]">Available at</h3>
            <button
              onClick={() => navigate("/centers")}
              className="text-[#6b9bd1] text-sm hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-[#2d3748] text-sm">{hospital.name}</h4>
                  <span className="text-[#48bb78]">{hospital.price}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{hospital.location}</span>
                  <span className="text-gray-400">•</span>
                  <span>{hospital.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-[#2d3748] mb-4">Frequently Asked Questions</h3>

          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                    <span className="text-[#2d3748] text-sm pr-4">{faq.question}</span>
                    <span className="text-gray-400 text-sm flex-shrink-0">▼</span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-5 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#6b9bd1] to-[#5a8bc1] rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-white mb-2">Need More Information?</h3>
          <p className="text-white/90 text-sm mb-4">
            Consult with your pediatrician to make the best choice for your baby
          </p>
          <button className="w-full bg-white text-[#6b9bd1] py-3 rounded-xl hover:bg-gray-50 transition-colors">
            Talk to a Doctor
          </button>
        </motion.div>
      </div>
    </div>
  );
}
