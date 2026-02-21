import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import {
  User, MapPin, Phone, Shield, Plus, X, Save,
  Users, Calendar, CheckCircle, AlertCircle, Edit2, Trash2, Filter, Navigation, ArrowLeft,
  TrendingUp, Home, Star, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ASHAWorkerProfile, Client } from '../store/useStore';

type ASHAView = 'profile' | 'clients';
type FilterType = 'all' | 'missed' | 'high_priority';

// Seeded dummy clients for realistic demo
const DEMO_CLIENTS: Omit<Client, 'ashaWorkerId'>[] = [
  {
    id: 'demo-1',
    name: 'Sunita Devi',
    age: 0,
    address: 'Ward 4, Rampur Village',
    phone: '9876543210',
    location: { village: 'Rampur', ward: '4' },
    vaccinesTaken: 3,
    vaccinesMissed: 2,
    vaccinesCompleted: 3,
    upcomingVaccines: ['DPT 2', 'OPV 2'],
  },
  {
    id: 'demo-2',
    name: 'Meera Kumari (Infant)',
    age: 0,
    address: 'Ward 7, Laxmipur',
    phone: '9823456780',
    location: { village: 'Laxmipur', ward: '7' },
    vaccinesTaken: 6,
    vaccinesMissed: 0,
    vaccinesCompleted: 6,
    upcomingVaccines: ['MMR 1'],
  },
  {
    id: 'demo-3',
    name: 'Raju Prasad (Child)',
    age: 4,
    address: 'Ward 2, Rampur Village',
    phone: '9911223344',
    location: { village: 'Rampur', ward: '2' },
    vaccinesTaken: 10,
    vaccinesMissed: 3,
    vaccinesCompleted: 10,
    upcomingVaccines: ['Varicella 2', 'DPT Booster 2'],
  },
  {
    id: 'demo-4',
    name: 'Kavita Sharma',
    age: 28,
    address: 'Ward 4, Ghanshyampur',
    phone: '9900112233',
    location: { village: 'Ghanshyampur', ward: '4' },
    vaccinesTaken: 1,
    vaccinesMissed: 4,
    vaccinesCompleted: 1,
    upcomingVaccines: [],
  },
  {
    id: 'demo-5',
    name: 'Anita Patel (Infant)',
    age: 0,
    address: 'Ward 9, Laxmipur',
    phone: '9988776655',
    location: { village: 'Laxmipur', ward: '9' },
    vaccinesTaken: 2,
    vaccinesMissed: 1,
    vaccinesCompleted: 2,
    upcomingVaccines: ['Hepatitis B 1', 'OPV 1'],
  },
  {
    id: 'demo-6',
    name: 'Geeta Misra (Elderly)',
    age: 68,
    address: 'Ward 1, Rampur Village',
    phone: '9870011234',
    location: { village: 'Rampur', ward: '1' },
    vaccinesTaken: 2,
    vaccinesMissed: 0,
    vaccinesCompleted: 2,
    upcomingVaccines: ['Td Booster'],
  },
  {
    id: 'demo-7',
    name: 'Rohan Verma (Child)',
    age: 2,
    address: 'Ward 6, Ghanshyampur',
    phone: '9871234560',
    location: { village: 'Ghanshyampur', ward: '6' },
    vaccinesTaken: 8,
    vaccinesMissed: 2,
    vaccinesCompleted: 8,
    upcomingVaccines: ['Hepatitis A 2'],
  },
];

function getAgeTag(age: number): { label: string; color: string } {
  if (age < 1) return { label: 'Infant', color: 'bg-pink-100 text-pink-700' };
  if (age < 12) return { label: 'Child', color: 'bg-blue-100 text-blue-700' };
  if (age < 60) return { label: 'Adult', color: 'bg-green-100 text-green-700' };
  return { label: 'Elderly', color: 'bg-purple-100 text-purple-700' };
}

function getCompliancePct(client: Client): number {
  const total = client.vaccinesTaken + client.vaccinesMissed;
  if (total === 0) return 100;
  return Math.round((client.vaccinesCompleted / total) * 100);
}

function getUrgencyLevel(client: Client): 'critical' | 'high' | 'moderate' | 'ok' {
  if (client.vaccinesMissed >= 3 || client.age >= 60) return 'critical';
  if (client.vaccinesMissed >= 2) return 'high';
  if (client.vaccinesMissed >= 1) return 'moderate';
  return 'ok';
}

const urgencyConfig = {
  critical: { border: 'border-l-4 border-red-500', badge: 'bg-red-100 text-red-700', label: '🔴 Critical' },
  high: { border: 'border-l-4 border-orange-500', badge: 'bg-orange-100 text-orange-700', label: '🟠 High Priority' },
  moderate: { border: 'border-l-4 border-yellow-400', badge: 'bg-yellow-100 text-yellow-700', label: '🟡 Overdue' },
  ok: { border: 'border-l-4 border-green-400', badge: 'bg-green-100 text-green-700', label: '🟢 Up to Date' },
};

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
    name: ashaProfile?.name || 'Radha Devi',
    district: ashaProfile?.district || 'Varanasi',
    block: ashaProfile?.block || 'Rampur Block',
    phone: ashaProfile?.phone || currentUser?.phone || '9876500000',
    aadhaarNumber: ashaProfile?.aadhaarNumber || '',
    assignedLocation: ashaProfile?.assignedLocation || { village: 'Rampur', ward: '4' }
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
    if (!navigator.geolocation) { setIsGettingLocation(false); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setProfileForm(prev => ({
          ...prev,
          assignedLocation: {
            ...prev.assignedLocation,
            village: prev.assignedLocation?.village || '',
            ward: prev.assignedLocation?.ward || '',
            gpsCoordinates: { latitude: position.coords.latitude, longitude: position.coords.longitude }
          }
        }));
        setIsGettingLocation(false);
      },
      () => setIsGettingLocation(false)
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
      location: clientForm.village || clientForm.ward ? { village: clientForm.village, ward: clientForm.ward } : undefined,
      vaccinesTaken: clientForm.vaccinesTaken,
      vaccinesMissed: clientForm.vaccinesMissed,
      vaccinesCompleted: clientForm.vaccinesCompleted,
      upcomingVaccines: clientForm.upcomingVaccines
    });
    setClientForm({ name: '', age: '', address: '', phone: '', village: '', ward: '', vaccinesTaken: 0, vaccinesMissed: 0, vaccinesCompleted: 0, upcomingVaccines: [] });
    setShowAddClient(false);
  };

  const myClients = useMemo(() => {
    const stored = clients.filter(c => c.ashaWorkerId === currentUser?.id);
    // Merge with demo data for realistic display
    const demoWithId: Client[] = DEMO_CLIENTS.map(d => ({ ...d, ashaWorkerId: currentUser?.id || '' }));
    const allIds = new Set(stored.map(c => c.id));
    const mergedDemo = demoWithId.filter(d => !allIds.has(d.id));
    return [...stored, ...mergedDemo];
  }, [clients, currentUser?.id]);

  const filteredClients = useMemo(() => {
    let result = myClients;
    if (activeFilter === 'missed') result = result.filter(c => c.vaccinesMissed > 0);
    else if (activeFilter === 'high_priority') result = result.filter(c => c.vaccinesMissed >= 2 || c.age >= 60);
    return result;
  }, [myClients, activeFilter]);

  const totalClients = myClients.length;
  const overdueCount = myClients.filter(c => c.vaccinesMissed > 0).length;
  const highPriorityCount = myClients.filter(c => c.vaccinesMissed >= 2 || c.age >= 60).length;
  const recentlyVaccinated = myClients.filter(c => c.vaccinesCompleted > 0 && c.vaccinesMissed === 0).length;
  const totalVaccinesCompleted = myClients.reduce((sum, c) => sum + c.vaccinesCompleted, 0);

  // Area breakdown
  const areaMap: Record<string, { total: number; overdue: number }> = {};
  myClients.forEach(c => {
    const area = c.location?.village || 'Unknown';
    if (!areaMap[area]) areaMap[area] = { total: 0, overdue: 0 };
    areaMap[area].total++;
    if (c.vaccinesMissed > 0) areaMap[area].overdue++;
  });

  return (
    <div className="min-h-screen bg-[#F7FBFF] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-teal-500 shadow-lg rounded-b-[2rem] relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLogout}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                title="Logout"
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
            {ashaProfile?.name && (
              <div className="text-right text-white">
                <p className="text-xs text-white/70">Logged in as</p>
                <p className="text-sm font-semibold">{ashaProfile.name}</p>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="mt-6 flex space-x-2">
            <button
              onClick={() => setActiveView('profile')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeView === 'profile' ? 'bg-white text-green-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <User className="w-4 h-4 inline-block mr-2" />Profile
            </button>
            <button
              onClick={() => setActiveView('clients')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeView === 'clients' ? 'bg-white text-green-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <Users className="w-4 h-4 inline-block mr-2" />Clients
              <span className="ml-2 bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full">{totalClients}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* ─── PROFILE VIEW ─── */}
        {activeView === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-9 h-9 text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold">{profileForm.name || 'ASHA Worker'}</h2>
                    <p className="text-green-100 text-sm">{profileForm.district} District · {profileForm.block}</p>
                    <p className="text-white/70 text-xs mt-1">📞 {profileForm.phone}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                      <Edit2 className="w-4 h-4" /><span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                      <button onClick={handleSaveProfile} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Save className="w-4 h-4" /><span>Save</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Full Name', key: 'name' as const, icon: User },
                    { label: 'District', key: 'district' as const, icon: MapPin },
                    { label: 'Block', key: 'block' as const, icon: MapPin },
                    { label: 'Phone', key: 'phone' as const, icon: Phone },
                  ].map(({ label, key, icon: Icon }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm[key] as string}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, [key]: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  ))}

                  {isEditing && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center"><MapPin className="w-4 h-4 mr-2" />Assigned Area</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={profileForm.assignedLocation?.village || ''}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, assignedLocation: { village: e.target.value, ward: prev.assignedLocation?.ward || '' } }))}
                          placeholder="Village/Area"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={profileForm.assignedLocation?.ward || ''}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, assignedLocation: { village: prev.assignedLocation?.village || '', ward: e.target.value } }))}
                          placeholder="Ward Number"
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  )}
                </div>
              </div>
            </div>

            {/* Area Summary Analytics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">Area Summary Analytics</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(areaMap).map(([area, data]) => {
                  const pct = data.total > 0 ? Math.round(((data.total - data.overdue) / data.total) * 100) : 100;
                  return (
                    <div key={area}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                          <Home className="w-3.5 h-3.5 text-gray-400" />
                          <span>{area}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{data.total} households</span>
                          {data.overdue > 0 && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{data.overdue} overdue</span>
                          )}
                          <span className="text-xs font-bold text-green-700">{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${pct < 50 ? 'bg-red-500' : pct < 80 ? 'bg-orange-400' : 'bg-green-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── CLIENTS VIEW ─── */}
        {activeView === 'clients' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
                    <p className="text-xs text-gray-500">Overdue</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{highPriorityCount}</p>
                    <p className="text-xs text-gray-500">High Priority</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{recentlyVaccinated}</p>
                    <p className="text-xs text-gray-500">Up to Date</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Vaccinations Card */}
            <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Total Vaccines Administered</p>
                  <p className="text-4xl font-bold">{totalVaccinesCompleted}</p>
                  <p className="text-white/70 text-xs mt-1">across {totalClients} registered clients</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex space-x-2">
                {[
                  { key: 'all' as FilterType, label: 'All', activeClass: 'bg-green-600 text-white' },
                  { key: 'missed' as FilterType, label: 'Overdue', activeClass: 'bg-red-600 text-white' },
                  { key: 'high_priority' as FilterType, label: 'High Risk', activeClass: 'bg-orange-500 text-white' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${activeFilter === f.key ? f.activeClass : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Client Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Client List <span className="text-sm text-gray-400 font-normal">({filteredClients.length})</span>
              </h3>
              <button
                onClick={() => setShowAddClient(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" /><span>Add Client</span>
              </button>
            </div>

            {/* Client Cards */}
            {filteredClients.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Clients Found</h3>
                <p className="text-gray-500">No clients match the current filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredClients.map((client: Client, idx: number) => {
                  const urgency = getUrgencyLevel(client);
                  const cfg = urgencyConfig[urgency];
                  const ageTag = getAgeTag(client.age);
                  const compliance = getCompliancePct(client);

                  return (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`bg-white rounded-xl shadow-sm ${cfg.border} p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${urgency === 'critical' ? 'bg-red-500' : urgency === 'high' ? 'bg-orange-500' : urgency === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                            {client.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 flex-wrap gap-1">
                              <p className="font-semibold text-gray-800 text-sm">{client.name}</p>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ageTag.color}`}>{ageTag.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>{cfg.label}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{client.address}</span>
                            </p>
                            {client.phone && (
                              <p className="text-xs text-gray-500 flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{client.phone}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <button onClick={() => deleteClient(client.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Compliance bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">Compliance</span>
                          <span className={`text-xs font-bold ${compliance < 50 ? 'text-red-600' : compliance < 80 ? 'text-orange-600' : 'text-green-600'}`}>{compliance}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${compliance < 50 ? 'bg-red-500' : compliance < 80 ? 'bg-orange-400' : 'bg-green-500'}`}
                            style={{ width: `${compliance}%` }}
                          />
                        </div>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">✓ {client.vaccinesCompleted} done</span>
                          {client.vaccinesMissed > 0 && (
                            <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full">⚠ {client.vaccinesMissed} missed</span>
                          )}
                          {client.upcomingVaccines.length > 0 && (
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              <Clock className="w-2.5 h-2.5 inline" /> {client.upcomingVaccines.length} upcoming
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                <button onClick={() => setShowAddClient(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Client Name *', key: 'name' as const, type: 'text', placeholder: 'Full name' },
                  { label: 'Age *', key: 'age' as const, type: 'number', placeholder: 'Age in years' },
                  { label: 'Phone', key: 'phone' as const, type: 'tel', placeholder: 'Phone number' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <input
                      type={type}
                      value={clientForm[key] as string}
                      onChange={(e) => setClientForm(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea
                    value={clientForm.address}
                    onChange={(e) => setClientForm(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Full address"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
                    <input type="text" value={clientForm.village} onChange={(e) => setClientForm(prev => ({ ...prev, village: e.target.value }))} placeholder="Village" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ward</label>
                    <input type="text" value={clientForm.ward} onChange={(e) => setClientForm(prev => ({ ...prev, ward: e.target.value }))} placeholder="Ward #" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Vaccines Taken', key: 'vaccinesTaken' as const },
                    { label: 'Missed', key: 'vaccinesMissed' as const },
                    { label: 'Completed', key: 'vaccinesCompleted' as const },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-700 mb-2">{label}</label>
                      <input
                        type="number"
                        value={clientForm[key]}
                        onChange={(e) => setClientForm(prev => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  ))}
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
