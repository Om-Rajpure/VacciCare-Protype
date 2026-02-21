import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { 
  User, MapPin, Phone, Shield, Plus, X, Save, 
  Users, Calendar, CheckCircle, AlertCircle, Edit2, Trash2, Filter, Navigation, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ASHAWorkerProfile, Client } from '../store/useStore';

type ASHAView = 'profile' | 'clients';

type FilterType = 'all' | 'missed' | 'high_priority';

export function ASHAWorkerDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<ASHAView>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const currentUser = useStore(state => state.currentUser);
  const setASHAProfile = useStore(state => state.setASHAProfile);
  const clients = useStore(state => state.clients);
  const addClient = useStore(state => state.addClient);
  const deleteClient = useStore(state => state.deleteClient);
  const logout = useStore(state => state.logout);
  
  const handleLogout = () => {
    logout();
    navigate('/onboarding');
  };
  
  const ashaProfile = currentUser?.ashaProfile;
  
  const [profileForm, setProfileForm] = useState<ASHAWorkerProfile>({
    name: ashaProfile?.name || '',
    district: ashaProfile?.district || '',
    block: ashaProfile?.block || '',
    phone: ashaProfile?.phone || currentUser?.phone || '',
    aadhaarNumber: ashaProfile?.aadhaarNumber || '',
    assignedLocation: ashaProfile?.assignedLocation || { village: '', ward: '' }
  });

  const [clientForm, setClientForm] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    village: '',
    ward: '',
    vaccinesTaken: 0,
    vaccinesMissed: 0,
    vaccinesCompleted: 0,
    upcomingVaccines: [] as string[]
  });

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    if (!navigator.geolocation) {
      setIsGettingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setProfileForm(prev => ({
          ...prev,
          assignedLocation: {
            ...prev.assignedLocation,
            village: prev.assignedLocation?.village || '',
            ward: prev.assignedLocation?.ward || '',
            gpsCoordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }
        }));
        setIsGettingLocation(false);
      },
      () => {
        setIsGettingLocation(false);
      }
    );
  };

  const handleSaveProfile = () => {
    setASHAProfile(profileForm);
    setIsEditing(false);
  };

  const handleAddClient = () => {
    if (!clientForm.name || !clientForm.age || !clientForm.address) return;
    
    addClient({
      name: clientForm.name,
      age: parseInt(clientForm.age),
      address: clientForm.address,
      phone: clientForm.phone,
      location: clientForm.village || clientForm.ward ? {
        village: clientForm.village,
        ward: clientForm.ward
      } : undefined,
      vaccinesTaken: clientForm.vaccinesTaken,
      vaccinesMissed: clientForm.vaccinesMissed,
      vaccinesCompleted: clientForm.vaccinesCompleted,
      upcomingVaccines: clientForm.upcomingVaccines
    });
    
    setClientForm({
      name: '',
      age: '',
      address: '',
      phone: '',
      village: '',
      ward: '',
      vaccinesTaken: 0,
      vaccinesMissed: 0,
      vaccinesCompleted: 0,
      upcomingVaccines: []
    });
    setShowAddClient(false);
  };

  const myClients = clients.filter(c => c.ashaWorkerId === currentUser?.id);
  
  const filteredClients = useMemo(() => {
    let result = myClients;
    
    const ashaLocation = ashaProfile?.assignedLocation;
    // Only filter by location if ASHA worker has set their assigned location
    if (ashaLocation?.village || ashaLocation?.ward) {
      result = result.filter((client: Client) => {
        const clientLocation = client.location;
        // Show clients even if they don't have a location set (or show them regardless)
        // This allows ASHA workers to see all their clients when they haven't set location yet
        if (!clientLocation) return true; // Changed from false to true to show clients without location
        
        const villageMatch = !ashaLocation.village || 
          clientLocation.village?.toLowerCase() === ashaLocation.village.toLowerCase();
        const wardMatch = !ashaLocation.ward || 
          clientLocation.ward?.toLowerCase() === ashaLocation.ward.toLowerCase();
        
        return villageMatch && wardMatch;
      });
    }
    
    if (activeFilter === 'missed') {
      result = result.filter((c: Client) => c.vaccinesMissed > 0);
    } else if (activeFilter === 'high_priority') {
      result = result.filter((c: Client) => c.vaccinesMissed > 0 || c.age > 60);
    }
    
    return result;
  }, [myClients, ashaProfile?.assignedLocation, activeFilter]);

  const totalClients = filteredClients.length;
  const totalVaccinesTaken = filteredClients.reduce((sum, c) => sum + c.vaccinesTaken, 0);
  const totalVaccinesMissed = filteredClients.reduce((sum, c) => sum + c.vaccinesMissed, 0);
  const totalVaccinesCompleted = filteredClients.reduce((sum, c) => sum + c.vaccinesCompleted, 0);

  return (
    <div className="min-h-screen bg-[#F7FBFF] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-teal-500 shadow-lg rounded-b-[2rem] relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLogout}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                title="Back to Role Selection"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-white">
                  <h1 className="text-xl font-bold">VacciTrack</h1>
                  <p className="text-xs text-white/80">ASHA Worker Dashboard</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setActiveView('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'profile' 
                  ? 'bg-white text-green-700' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <User className="w-4 h-4 inline-block mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveView('clients')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeView === 'clients' 
                  ? 'bg-white text-green-700' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Users className="w-4 h-4 inline-block mr-2" />
              Clients
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeView === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6">
              <div className="flex items-center space-x-3 text-white">
                <User className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">ASHA Worker Profile</h2>
                  <p className="text-green-100 text-sm">Manage your profile details</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileForm.district}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, district: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your district"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Block</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileForm.block}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, block: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your block"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                      disabled={!isEditing}
                      maxLength={10}
                      placeholder="Enter phone number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileForm.aadhaarNumber}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, aadhaarNumber: e.target.value.replace(/\D/g, '') }))}
                      disabled={!isEditing}
                      maxLength={12}
                      placeholder="Enter Aadhaar number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Assigned Area
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Village/Area</label>
                        <input
                          type="text"
                          value={profileForm.assignedLocation?.village || ''}
                          onChange={(e) => setProfileForm(prev => ({
                            ...prev,
                            assignedLocation: {
                              village: e.target.value,
                              ward: prev.assignedLocation?.ward || ''
                            }
                          }))}
                          placeholder="Enter assigned village/area"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Ward Number</label>
                        <input
                          type="text"
                          value={profileForm.assignedLocation?.ward || ''}
                          onChange={(e) => setProfileForm(prev => ({
                            ...prev,
                            assignedLocation: {
                              village: prev.assignedLocation?.village || '',
                              ward: e.target.value
                            }
                          }))}
                          placeholder="Enter ward number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isGettingLocation}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Navigation className={`w-4 h-4 ${isGettingLocation ? 'animate-spin' : ''}`} />
                        <span>{isGettingLocation ? 'Getting Location...' : 'Get GPS Location'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'clients' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{totalClients}</p>
                    <p className="text-xs text-gray-500">Total Clients</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{totalVaccinesCompleted}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{totalVaccinesTaken}</p>
                    <p className="text-xs text-gray-500">Taken</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{totalVaccinesMissed}</p>
                    <p className="text-xs text-gray-500">Missed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('missed')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center space-x-1 ${
                    activeFilter === 'missed'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Missed Vaccines</span>
                </button>
                <button
                  onClick={() => setActiveFilter('high_priority')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center space-x-1 ${
                    activeFilter === 'high_priority'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>High Priority</span>
                </button>
              </div>
            </div>

            {/* Add Client Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Client List</h3>
              <button
                onClick={() => setShowAddClient(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client</span>
              </button>
            </div>

            {/* Client List */}
            {filteredClients.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Clients Found</h3>
                <p className="text-gray-500 mb-6">
                  {myClients.length === 0 
                    ? 'Start adding clients to track their vaccination status'
                    : 'No clients match the current filter criteria'
                  }
                </p>
                {myClients.length === 0 && (
                  <button
                    onClick={() => setShowAddClient(true)}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
                  >
                    Add Your First Client
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Taken</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Missed</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredClients.map((client: Client) => (
                        <tr key={client.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <User className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{client.name}</p>
                                <p className="text-xs text-gray-500">{client.phone || 'No phone'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{client.age} years</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">{client.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              {client.vaccinesTaken}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              client.vaccinesMissed > 0 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {client.vaccinesMissed}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              {client.vaccinesCompleted}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => deleteClient(client.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddClient(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Add New Client</h2>
                <button
                  onClick={() => setShowAddClient(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter client name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={clientForm.age}
                    onChange={(e) => setClientForm(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter age"
                    min="0"
                    max="150"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea
                    value={clientForm.address}
                    onChange={(e) => setClientForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter address"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                    placeholder="Enter phone number"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Village/Area</label>
                    <input
                      type="text"
                      value={clientForm.village}
                      onChange={(e) => setClientForm(prev => ({ ...prev, village: e.target.value }))}
                      placeholder="Enter village"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                    <input
                      type="text"
                      value={clientForm.ward}
                      onChange={(e) => setClientForm(prev => ({ ...prev, ward: e.target.value }))}
                      placeholder="Enter ward"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vaccines Taken</label>
                    <input
                      type="number"
                      value={clientForm.vaccinesTaken}
                      onChange={(e) => setClientForm(prev => ({ ...prev, vaccinesTaken: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Missed</label>
                    <input
                      type="number"
                      value={clientForm.vaccinesMissed}
                      onChange={(e) => setClientForm(prev => ({ ...prev, vaccinesMissed: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Completed</label>
                    <input
                      type="number"
                      value={clientForm.vaccinesCompleted}
                      onChange={(e) => setClientForm(prev => ({ ...prev, vaccinesCompleted: parseInt(e.target.value) || 0 }))}
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddClient}
                  disabled={!clientForm.name || !clientForm.age || !clientForm.address}
                  className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  Add Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
