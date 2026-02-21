import { useState } from 'react';
import { MapPin, Phone, Clock, Star, Search, Filter } from 'lucide-react';
import { vaccinationCenters } from '../../data/educationData';

export function VaccinationCenters() {
  const [searchCity, setSearchCity] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'painless' | 'standard' | 'both'>('all');

  const cities = Array.from(new Set(vaccinationCenters.map(c => c.city))).sort();

  const filteredCenters = vaccinationCenters.filter(center => {
    const matchesCity = !searchCity || center.city.toLowerCase() === searchCity.toLowerCase();
    const matchesType = filterType === 'all' || center.type === filterType || (filterType === 'both' && center.type === 'both');
    return matchesCity && matchesType;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
        <div className="flex items-center space-x-3 text-white">
          <MapPin className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Vaccination Centers</h2>
            <p className="text-green-100 text-sm">Find trusted centers near you</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by City</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="both">Both (Painless & Standard)</option>
                <option value="painless">Painless Only</option>
                <option value="standard">Standard Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredCenters.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No centers found matching your criteria</p>
            <button
              onClick={() => {
                setSearchCity('');
                setFilterType('all');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCenters.map((center) => (
              <div key={center.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{center.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{center.area}, {center.city}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{center.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      center.type === 'both'
                        ? 'bg-green-100 text-green-700'
                        : center.type === 'painless'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {center.type === 'both' ? 'Painless & Standard' : center.type === 'painless' ? 'Painless Available' : 'Standard Only'}
                    </span>
                    <span className="text-sm text-gray-500 mt-2">{center.distance}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2 text-gray-700">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <span>{center.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <span>{center.timings}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                  <a
                    href={`tel:${center.phone}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(center.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <strong>Note:</strong> Information shown is for reference only. Please call ahead to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Confirm vaccine availability</li>
            <li>Book an appointment</li>
            <li>Verify current timings and fees</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
