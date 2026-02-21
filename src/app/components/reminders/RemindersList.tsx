import { useStore } from '../../store/useStore';
import { Bell, Calendar, Trash2, CheckCircle, Clock, Plus, X, ChevronDown, Syringe } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

export function RemindersList() {
  const reminders = useStore(state => state.reminders);
  const deleteReminder = useStore(state => state.deleteReminder);
  const addReminder = useStore(state => state.addReminder);
  const familyMembers = useStore(state => state.familyMembers);
  const vaccines = useStore(state => state.vaccines);
  const selectedMemberId = useStore(state => state.selectedMemberId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const [showVaccineDropdown, setShowVaccineDropdown] = useState(false);
  
  const [formData, setFormData] = useState({
    memberId: selectedMemberId || '',
    vaccineId: '',
    reminderDate: '',
    reminderTime: '',
    message: ''
  });

  const memberDropdownRef = useRef<HTMLDivElement>(null);
  const vaccineDropdownRef = useRef<HTMLDivElement>(null);

  // Filter vaccines for selected member
  const memberVaccines = vaccines.filter(v => v.memberId === formData.memberId && v.status === 'upcoming');

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(event.target as Node)) {
        setShowMemberDropdown(false);
      }
      if (vaccineDropdownRef.current && !vaccineDropdownRef.current.contains(event.target as Node)) {
        setShowVaccineDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected member and vaccine
  const selectedMember = familyMembers.find(m => m.id === formData.memberId);
  const selectedVaccine = vaccines.find(v => v.id === formData.vaccineId);

  const handleOpenAddModal = (memberId?: string, vaccineId?: string, vaccineName?: string) => {
    if (memberId && vaccineId) {
      // Pre-fill form with vaccine data
      const defaultDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');
      setFormData({
        memberId,
        vaccineId,
        reminderDate: defaultDate,
        reminderTime: '09:00',
        message: `Reminder: ${vaccineName} vaccination scheduled tomorrow`
      });
    } else {
      // Reset form
      setFormData({
        memberId: selectedMemberId || '',
        vaccineId: '',
        reminderDate: '',
        reminderTime: '',
        message: ''
      });
    }
    setShowAddModal(true);
  };

  const handleSubmit = () => {
    if (!formData.memberId || !formData.vaccineId || !formData.reminderDate || !formData.reminderTime || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    const reminderDateTime = new Date(`${formData.reminderDate}T${formData.reminderTime}`).toISOString();

    addReminder({
      vaccineId: formData.vaccineId,
      memberId: formData.memberId,
      reminderDate: reminderDateTime,
      message: formData.message
    });

    setShowAddModal(false);
    setFormData({
      memberId: selectedMemberId || '',
      vaccineId: '',
      reminderDate: '',
      reminderTime: '',
      message: ''
    });
  };

  // Sort reminders by date
  const sortedReminders = [...reminders].sort((a, b) => 
    new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime()
  );

  // Get all upcoming vaccines grouped by member
  const upcomingVaccines = vaccines
    .filter(v => v.status === 'upcoming')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="h-full pb-24 px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Reminders</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenAddModal()}
            className="w-10 h-10 bg-[#FF6B6B] rounded-full flex items-center justify-center hover:bg-[#e55a5a] transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Upcoming Vaccines Section */}
      {upcomingVaccines.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Syringe className="w-5 h-5 text-[#4CC9F0]" />
            <span>Upcoming Vaccines</span>
          </h3>
          <div className="space-y-3">
            {upcomingVaccines.map((vaccine) => {
              const member = familyMembers.find(m => m.id === vaccine.memberId);
              const hasReminder = reminders.some(r => r.vaccineId === vaccine.id);
              
              return (
                <motion.div
                  key={vaccine.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      hasReminder ? 'bg-green-100' : 'bg-[#4CC9F0]/10'
                    }`}>
                      {hasReminder ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Syringe className="w-5 h-5 text-[#4CC9F0]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{vaccine.vaccineName}</p>
                      <p className="text-xs text-gray-500">
                        {member?.name || 'Unknown'} • Due: {format(new Date(vaccine.dueDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenAddModal(vaccine.memberId, vaccine.id, vaccine.vaccineName)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      hasReminder 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-[#FF6B6B] text-white hover:bg-[#e55a5a]'
                    }`}
                  >
                    {hasReminder ? 'Reminder Set' : 'Set Reminder'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reminders Section */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-[#FF6B6B]" />
          <span>My Reminders</span>
        </h3>
      </div>

      {sortedReminders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600">No Reminders Set</h3>
          <p className="text-sm text-gray-400 max-w-xs mt-2">
            Tap "Set Reminder" on any upcoming vaccine to add a reminder.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {sortedReminders.map((reminder) => {
              const member = familyMembers.find(m => m.id === reminder.memberId);
              const vaccine = vaccines.find(v => v.id === reminder.vaccineId);
              
              return (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group overflow-hidden"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    reminder.notified ? 'bg-gray-300' : 'bg-[#FF6B6B]'
                  }`} />
                  
                  <div className="pl-3 flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-bold text-[#4CC9F0] uppercase tracking-wide">
                          {member?.name || 'Unknown Member'}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          {vaccine?.vaccineName || 'Unknown Vaccine'}
                        </span>
                      </div>
                      
                      <p className="text-gray-800 font-medium mb-3 pr-8">
                        {reminder.message}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-[#FFD166]" />
                          <span>{format(new Date(reminder.reminderDate), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-[#2EC4B6]" />
                          <span>{format(new Date(reminder.reminderDate), 'h:mm a')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-[2rem] w-full max-w-lg p-6 pb-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add Reminder</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Family Member Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Member</label>
                  <div className="relative" ref={memberDropdownRef}>
                    <button
                      onClick={() => {
                        setShowMemberDropdown(!showMemberDropdown);
                        setShowVaccineDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#4CC9F0] transition-colors"
                    >
                      <span className={selectedMember ? 'text-gray-800' : 'text-gray-400'}>
                        {selectedMember?.name || 'Select family member'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMemberDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showMemberDropdown && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto">
                        {familyMembers.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">No family members added</div>
                        ) : (
                          familyMembers.map((member) => (
                            <button
                              key={member.id}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, memberId: member.id, vaccineId: '' }));
                                setShowMemberDropdown(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                formData.memberId === member.id ? 'bg-[#4CC9F0]/10 text-[#4CC9F0]' : ''
                              }`}
                            >
                              {member.name} ({member.relationship})
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vaccine Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vaccine</label>
                  <div className="relative" ref={vaccineDropdownRef}>
                    <button
                      onClick={() => {
                        if (!formData.memberId) {
                          alert('Please select a family member first');
                          return;
                        }
                        setShowVaccineDropdown(!showVaccineDropdown);
                        setShowMemberDropdown(false);
                      }}
                      disabled={!formData.memberId}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#4CC9F0] transition-colors disabled:opacity-50"
                    >
                      <span className={selectedVaccine ? 'text-gray-800' : 'text-gray-400'}>
                        {selectedVaccine?.vaccineName || 'Select vaccine'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showVaccineDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showVaccineDropdown && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto">
                        {memberVaccines.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">No upcoming vaccines</div>
                        ) : (
                          memberVaccines.map((vaccine) => (
                            <button
                              key={vaccine.id}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, vaccineId: vaccine.id }));
                                setShowVaccineDropdown(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                                formData.vaccineId === vaccine.id ? 'bg-[#4CC9F0]/10 text-[#4CC9F0]' : ''
                              }`}
                            >
                              {vaccine.vaccineName}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.reminderDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, reminderDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] focus:border-transparent"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="e.g., Don't forget the vaccination appointment!"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#FF6B6B] text-white rounded-xl font-bold hover:bg-[#e55a5a] transition-colors shadow-lg shadow-red-200 mt-4"
                >
                  Add Reminder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
