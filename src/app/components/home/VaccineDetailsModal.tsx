import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Shield, 
  AlertTriangle, 
  Stethoscope, 
  Activity,
  Thermometer,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { VaccineInfo, getVaccineInfo } from '../../data/vaccineInfo';
import { useState, useEffect } from 'react';

interface VaccineDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaccineName: string;
}

export function VaccineDetailsModal({ isOpen, onClose, vaccineName }: VaccineDetailsModalProps) {
  const [vaccineInfo, setVaccineInfo] = useState<VaccineInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && vaccineName) {
      setLoading(true);
      // Simulate fetching from external API
      const timer = setTimeout(() => {
        const info = getVaccineInfo(vaccineName);
        setVaccineInfo(info || null);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, vaccineName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#4A90D9] to-[#67B8E3] p-6 pt-12">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-white/30 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-1/2"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {vaccineInfo?.name || vaccineName}
                    </h2>
                  </div>
                  <p className="text-white/80 text-sm">
                    Comprehensive vaccine information
                  </p>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-20 bg-gray-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : !vaccineInfo ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Information Not Available
                  </h3>
                  <p className="text-gray-500">
                    Detailed information for "{vaccineName}" is not available yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Purpose */}
                  <InfoSection 
                    icon={<Stethoscope className="w-5 h-5" />}
                    title="Purpose of the Vaccine"
                    content={vaccineInfo.purpose}
                    iconBgColor="bg-blue-100"
                    iconColor="text-blue-600"
                  />

                  {/* Common Symptoms */}
                  <InfoSection 
                    icon={<Thermometer className="w-5 h-5" />}
                    title="Common Symptoms After Vaccination"
                    iconBgColor="bg-yellow-100"
                    iconColor="text-yellow-700"
                    items={vaccineInfo.commonSymptoms}
                    itemIcon={<CheckCircle2 className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />}
                  />

                  {/* Serious Symptoms */}
                  <InfoSection 
                    icon={<AlertTriangle className="w-5 h-5" />}
                    title="Serious Symptoms (Seek Immediate Care)"
                    iconBgColor="bg-red-100"
                    iconColor="text-red-600"
                    items={vaccineInfo.seriousSymptoms}
                    itemIcon={<AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
                    alertStyle
                  />

                  {/* Precautions */}
                  <InfoSection 
                    icon={<Activity className="w-5 h-5" />}
                    title="Precautions to Take"
                    iconBgColor="bg-green-100"
                    iconColor="text-green-600"
                    items={vaccineInfo.precautions}
                    itemIcon={<ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />}
                  />

                  {/* When to Consult Doctor */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        When to Consult a Doctor
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {vaccineInfo.whenToConsultDoctor.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <span className="w-2 h-2 mt-2 bg-orange-400 rounded-full flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-xs text-center text-gray-500">
                Information sourced from WHO, CDC, and Ministry of Health & Family Welfare, India
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Reusable Info Section Component
interface InfoSectionProps {
  icon: React.ReactNode;
  title: string;
  content?: string;
  items?: string[];
  itemIcon?: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  alertStyle?: boolean;
}

function InfoSection({ 
  icon, 
  title, 
  content, 
  items, 
  itemIcon,
  iconBgColor, 
  iconColor,
  alertStyle = false 
}: InfoSectionProps) {
  const Component = alertStyle ? 'div' : 'div';
  const componentClass = alertStyle 
    ? 'bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-5 border border-red-100'
    : 'bg-gray-50 rounded-xl p-5';

  return (
    <Component className={componentClass}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
      </div>
      
      {content && (
        <p className="text-gray-700 leading-relaxed">
          {content}
        </p>
      )}
      
      {items && (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-2"
            >
              {itemIcon || <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />}
              <span className="text-gray-700 text-sm leading-relaxed">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </Component>
  );
}
