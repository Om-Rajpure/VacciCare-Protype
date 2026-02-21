import { useStore } from '../../store/useStore';
import { Calendar, Clock, AlertCircle, Bell, CheckCircle, Plus, X, Info } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VaccineDetailsModal } from './VaccineDetailsModal';

export function UpcomingVaccines() {
  const [showReminderForm, setShowReminderForm] = useState<string | null>(null);
  const [reminderDays, setReminderDays] = useState(1);
  const [showAddVaccine, setShowAddVaccine] = useState(false);
  const [showVaccineDetails, setShowVaccineDetails] = useState(false);
  const [selectedVaccineName, setSelectedVaccineName] = useState('');
  const [newVaccine, setNewVaccine] = useState({
    name: '',
    dueDate: ''
  });
  
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const vaccines = useStore(state => state.vaccines);
  const familyMembers = useStore(state => state.familyMembers);
  const addReminder = useStore(state => state.addReminder);
  const updateVaccineStatus = useStore(state => state.updateVaccineStatus);
  
  // Get the addVaccine function from store
  const addVaccine = useStore(state => state.addVaccine);
  
  const member = familyMembers.find(m => m.id === selectedMemberId);
  const memberVaccines = vaccines
    .filter(v => v.memberId === selectedMemberId)
    .filter(v => v.status === 'upcoming' || v.status === 'missed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const handleSetReminder = (vaccine: typeof memberVaccines[0]) => {
    if (!member) return;
    
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + reminderDays);
    
    const message = `Reminder: ${member.name}'s ${vaccine.vaccineName} vaccine is ${
      vaccine.status === 'missed' ? 'overdue' : 'due soon'
    }.`;
    
    addReminder({
      vaccineId: vaccine.id,
      memberId: member.id,
      reminderDate: reminderDate.toISOString(),
      message
    });
    
    setShowReminderForm(null);
    
    // Request notification permission if not granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const handleMarkCompleted = (vaccineId: string) => {
    updateVaccineStatus(vaccineId, 'completed', new Date().toISOString());
  };

  const handleAddVaccine = () => {
    if (!newVaccine.name || !newVaccine.dueDate || !selectedMemberId) {
      return;
    }

    // Add the new vaccine
    addVaccine({
      vaccineName: newVaccine.name,
      dueDate: new Date(newVaccine.dueDate).toISOString(),
      status: 'upcoming',
      memberId: selectedMemberId
    });

    setNewVaccine({ name: '', dueDate: '' });
    setShowAddVaccine(false);
  };

  const handleVaccineNameClick = (vaccineName: string) => {
    setSelectedVaccineName(vaccineName);
    setShowVaccineDetails(true);
  };

  if (!member) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Select a family member to view schedule</p>
      </div>
    );
  }

  const missedVaccines = memberVaccines.filter(v => v.status === 'missed');
  const upcomingVaccines = memberVaccines.filter(v => v.status === 'upcoming');

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Schedule</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddVaccine(true)}
            className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
            title="Add Vaccine"
          >
            <Plus className="w-4 h-4 text-blue-600" />
          </button>
          <div className="w-10 h-10 bg-[#FFD166]/10 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#FFD166]" />
          </div>
        </div>
      </div>

      {missedVaccines.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-2">
                Missed Vaccines Detected ({missedVaccines.length})
              </h3>
              <p className="text-sm text-red-700 mb-3">
                These vaccines are overdue. Please consult your doctor to schedule catch-up vaccination.
              </p>
              <div className="space-y-2">
                {missedVaccines.slice(0, 3).map((vaccine) => (
                  <div key={vaccine.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{vaccine.vaccineName}</p>
                      <p className="text-xs text-red-600">
                        Due: {format(new Date(vaccine.dueDate), 'dd MMM yyyy')}
                        ({Math.abs(differenceInDays(new Date(), new Date(vaccine.dueDate)))} days overdue)
                      </p>
                    </div>
                    <button
                      onClick={() => handleMarkCompleted(vaccine.id)}
                      className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Mark Done
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 mb-3">Upcoming Vaccinations</h3>
        
        {upcomingVaccines.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-400" />
            <p>No upcoming vaccines scheduled</p>
            <button
              onClick={() => setShowAddVaccine(true)}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              Add a vaccine
            </button>
          </div>
        ) : (
          upcomingVaccines.slice(0, 5).map((vaccine) => {
            const daysUntil = differenceInDays(new Date(vaccine.dueDate), new Date());
            const isNearby = daysUntil >= 0 && daysUntil <= 7;
            
            return (
              <div
                key={vaccine.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isNearby
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{vaccine.vaccineName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className={`w-4 h-4 ${isNearby ? 'text-yellow-600' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isNearby ? 'text-yellow-700' : 'text-gray-600'}`}>
                        {format(new Date(vaccine.dueDate), 'dd MMM yyyy')}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isNearby
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {daysUntil === 0
                          ? 'Today'
                          : daysUntil === 1
                          ? 'Tomorrow'
                          : daysUntil > 0
                          ? `In ${daysUntil} days`
                          : `${Math.abs(daysUntil)} days ago`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowReminderForm(vaccine.id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Set Reminder"
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMarkCompleted(vaccine.id)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="Mark as Completed"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleVaccineNameClick(vaccine.vaccineName)}
                      className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                      title="View Vaccine Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {showReminderForm === vaccine.id && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-gray-300">
                    <p className="text-sm text-gray-700 mb-2">Set reminder for:</p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={reminderDays}
                        onChange={(e) => setReminderDays(parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-sm text-gray-600">days before due date</span>
                      <button
                        onClick={() => handleSetReminder(vaccine)}
                        className="ml-auto px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Set
                      </button>
                      <button
                        onClick={() => setShowReminderForm(null)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {upcomingVaccines.length > 5 && (
        <p className="text-sm text-gray-500 mt-4 text-center">
          + {upcomingVaccines.length - 5} more vaccines scheduled
        </p>
      )}

      {/* Add Vaccine Modal */}
      <AnimatePresence>
        {showAddVaccine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddVaccine(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Add Vaccine</h2>
                <button
                  onClick={() => setShowAddVaccine(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vaccine Name</label>
                  <input
                    type="text"
                    value={newVaccine.name}
                    onChange={(e) => setNewVaccine(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Polio, MMR, Hepatitis A"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newVaccine.dueDate}
                    onChange={(e) => setNewVaccine(prev => ({ ...prev, dueDate: e.target.value }))}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleAddVaccine}
                  disabled={!newVaccine.name || !newVaccine.dueDate}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  Add Vaccine
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vaccine Details Modal */}
      <VaccineDetailsModal
        isOpen={showVaccineDetails}
        onClose={() => setShowVaccineDetails(false)}
        vaccineName={selectedVaccineName}
      />
    </div>
  );
}
