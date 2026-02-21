import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { MapPin, Phone, Star, Navigation, Award } from "lucide-react";
import { motion } from "motion/react";

interface Center {
  id: number;
  name: string;
  distance: string;
  rating: number;
  address: string;
  phone: string;
  painless: boolean;
}

export default function CentersScreen() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [showResults, setShowResults] = useState(false);

  const centers: Center[] = [
    {
      id: 1,
      name: "Apollo Hospitals",
      distance: "1.2 km",
      rating: 4.8,
      address: "Jubilee Hills, Hyderabad",
      phone: "+91 40 2345 6789",
      painless: true,
    },
    {
      id: 2,
      name: "Rainbow Children's Hospital",
      distance: "2.5 km",
      rating: 4.9,
      address: "Banjara Hills, Hyderabad",
      phone: "+91 40 3456 7890",
      painless: true,
    },
    {
      id: 3,
      name: "Kamineni Hospitals",
      distance: "3.8 km",
      rating: 4.6,
      address: "LB Nagar, Hyderabad",
      phone: "+91 40 4567 8901",
      painless: false,
    },
    {
      id: 4,
      name: "Yashoda Hospitals",
      distance: "4.2 km",
      rating: 4.7,
      address: "Secunderabad, Hyderabad",
      phone: "+91 40 5678 9012",
      painless: true,
    },
  ];

  const handleSearch = () => {
    if (state && district) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfd] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#6b9bd1] to-[#5a8bc1] px-6 pt-12 pb-8 rounded-b-[2rem] shadow-lg">
        <h2 className="text-white mb-2">Vaccination Centers</h2>
        <p className="text-white/90 text-sm">Find nearby centers</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Search Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-[#2d3748] mb-4">Search Location</h3>

          {/* State Dropdown */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm mb-2 block">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-4 bg-[#f7fafc] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6b9bd1] transition-all"
            >
              <option value="">Select State</option>
              <option value="telangana">Telangana</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>

          {/* District Dropdown */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm mb-2 block">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-4 bg-[#f7fafc] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6b9bd1] transition-all"
            >
              <option value="">Select District</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="rangareddy">Rangareddy</option>
              <option value="medchal">Medchal</option>
              <option value="sangareddy">Sangareddy</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!state || !district}
            className="w-full bg-[#6b9bd1] text-white py-4 rounded-2xl shadow-lg hover:bg-[#5a8bc1] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <MapPin className="w-5 h-5" />
            <span>Search Centers</span>
          </button>
        </motion.div>

        {/* Map Preview */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-200 rounded-2xl shadow-md h-40 mb-6 overflow-hidden relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#6b9bd1] mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Map Preview</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#2d3748]">{centers.length} Centers Found</h3>
              <button className="flex items-center space-x-1 text-[#6b9bd1] text-sm">
                <Navigation className="w-4 h-4" />
                <span>Sort by distance</span>
              </button>
            </div>

            {centers.map((center, index) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-[#2d3748] mb-1">{center.name}</h4>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-[#f6ad55] fill-current" />
                      <span className="text-sm text-gray-600">{center.rating}</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{center.distance}</span>
                    </div>
                  </div>
                  {center.painless && (
                    <div className="bg-gradient-to-r from-[#48bb78] to-[#38a169] text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
                      <Award className="w-3 h-3" />
                      <span>Painless</span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <p className="text-gray-600 text-sm mb-4">{center.address}</p>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-[#6b9bd1] text-white py-3 rounded-xl hover:bg-[#5a8bc1] transition-colors flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="flex-1 bg-[#e8f4f8] text-[#6b9bd1] py-3 rounded-xl hover:bg-[#d0e8f0] transition-colors flex items-center justify-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span>Navigate</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-[#a8d8ea] to-[#6b9bd1] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-[#2d3748] mb-2">Find Nearby Centers</h3>
            <p className="text-gray-600 text-sm">
              Select your location to see vaccination centers near you
            </p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
