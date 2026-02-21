import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Thermometer, Droplet, Activity, AlertTriangle, CheckCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";

interface Symptom {
  id: string;
  icon: any;
  label: string;
  color: string;
}

export default function SideEffectsScreen() {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms: Symptom[] = [
    { id: "fever", icon: Thermometer, label: "Fever", color: "from-[#fc8181] to-[#f56565]" },
    { id: "rashes", icon: Droplet, label: "Rashes", color: "from-[#ffccd5] to-[#f8b4d8]" },
    { id: "vomiting", icon: Activity, label: "Vomiting", color: "from-[#ffd4a3] to-[#f6ad55]" },
    { id: "loose", icon: Droplet, label: "Loose Motion", color: "from-[#a8d8ea] to-[#6b9bd1]" },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const careGuides = {
    fever: {
      title: "Fever After Vaccination",
      common: "Mild fever (up to 100.4°F) is common and usually appears within 24 hours",
      tips: [
        "Keep baby hydrated with breast milk or water",
        "Dress in light, comfortable clothing",
        "Give paracetamol if prescribed by doctor",
        "Use lukewarm sponge bath if needed",
      ],
      warning: "If fever exceeds 102°F or lasts more than 48 hours",
    },
    rashes: {
      title: "Skin Rashes",
      common: "Small red bumps or rashes at injection site are normal",
      tips: [
        "Keep the area clean and dry",
        "Apply cool compress if irritated",
        "Avoid applying creams without doctor's advice",
        "Dress baby in soft, breathable fabrics",
      ],
      warning: "If rashes spread rapidly or baby shows breathing difficulty",
    },
    vomiting: {
      title: "Vomiting",
      common: "Occasional vomiting may occur within first 24 hours",
      tips: [
        "Continue breastfeeding in small amounts",
        "Keep baby upright after feeding",
        "Watch for signs of dehydration",
        "Avoid solid foods if baby refuses",
      ],
      warning: "If vomiting is persistent or baby appears dehydrated",
    },
    loose: {
      title: "Loose Motion",
      common: "Mild diarrhea can occur after rotavirus vaccine",
      tips: [
        "Continue breastfeeding frequently",
        "Give ORS if prescribed",
        "Monitor diaper output",
        "Maintain good hygiene",
      ],
      warning: "If diarrhea is severe, bloody, or lasts more than 2 days",
    },
  };

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
        <h2 className="text-white mb-2">Side Effect Care Guide</h2>
        <p className="text-white/90 text-sm">Select symptoms to see care tips</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Symptom Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-[#2d3748] mb-4">Select Symptoms</h3>
          <div className="grid grid-cols-2 gap-4">
            {symptoms.map((symptom) => {
              const Icon = symptom.icon;
              const isSelected = selectedSymptoms.includes(symptom.id);

              return (
                <motion.button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-4 rounded-2xl transition-all ${
                    isSelected
                      ? "bg-gradient-to-br shadow-lg border-2 border-[#6b9bd1]"
                      : "bg-gray-50 shadow-md"
                  } ${isSelected ? symptom.color : ""}`}
                >
                  <Icon className={`w-8 h-8 mb-2 ${isSelected ? "text-white" : "text-gray-600"}`} />
                  <p className={`text-sm ${isSelected ? "text-white" : "text-gray-700"}`}>
                    {symptom.label}
                  </p>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[#48bb78]" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Care Guides */}
        <AnimatePresence>
          {selectedSymptoms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <Accordion.Root type="multiple" className="space-y-4">
                {selectedSymptoms.map((symptomId) => {
                  const guide = careGuides[symptomId as keyof typeof careGuides];

                  return (
                    <Accordion.Item
                      key={symptomId}
                      value={symptomId}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <Accordion.Header>
                        <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                          <span className="text-[#2d3748]">{guide.title}</span>
                          <span className="text-gray-400">▼</span>
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content className="px-6 pb-6">
                        {/* Common Reaction */}
                        <div className="bg-[#e8f4f8] rounded-xl p-4 mb-4">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-5 h-5 text-[#6b9bd1] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-700">{guide.common}</p>
                            </div>
                          </div>
                        </div>

                        {/* Care Tips */}
                        <div className="mb-4">
                          <h4 className="text-[#2d3748] mb-3 text-sm">Safe Home Care Tips</h4>
                          <ul className="space-y-2">
                            {guide.tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#48bb78] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warning */}
                        <div className="bg-[#fff5f5] border-l-4 border-[#fc8181] rounded-xl p-4">
                          <h4 className="text-[#2d3748] mb-2 text-sm">⚠️ When to Visit Doctor</h4>
                          <p className="text-sm text-gray-700">{guide.warning}</p>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  );
                })}
              </Accordion.Root>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#fc8181] to-[#f56565] rounded-2xl shadow-lg p-6 mt-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Phone className="w-6 h-6 text-white" />
            <h3 className="text-white">Emergency Helpline</h3>
          </div>
          <p className="text-white/90 text-sm mb-4">
            For severe reactions, contact immediately
          </p>
          <button className="w-full bg-white text-[#fc8181] py-3 rounded-xl hover:bg-gray-50 transition-colors">
            Call 1800-XXX-XXXX
          </button>
        </motion.div>
      </div>
    </div>
  );
}
