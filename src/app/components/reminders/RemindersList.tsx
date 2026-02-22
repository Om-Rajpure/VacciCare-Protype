import { useStore } from '../../store/useStore';
import { Bell, Calendar, Trash2, CheckCircle, Clock, Plus, X, ChevronDown, Syringe, AlertTriangle, PartyPopper, UserX } from 'lucide-react';
import { format, differenceInCalendarDays } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

/* ─── helpers ─── */
function getDayDiff(dueDate: string): number {
  // positive = future, negative = overdue
  return differenceInCalendarDays(new Date(dueDate), new Date());
}

function urgencyConfig(dayDiff: number) {
  if (dayDiff < 0) {
    return {
      borderClass: 'border-red-200 bg-red-50',
      badgeClass: 'bg-red-100 text-red-700',
      iconClass: 'text-red-500',
      icon: AlertTriangle,
      label: `${Math.abs(dayDiff)} day${Math.abs(dayDiff) !== 1 ? 's' : ''} overdue`,
    };
  }
  if (dayDiff <= 3) {
    return {
      borderClass: 'border-orange-200 bg-orange-50',
      badgeClass: 'bg-orange-100 text-orange-700',
      iconClass: 'text-orange-500',
      icon: Clock,
      label: dayDiff === 0 ? 'Due today!' : `${dayDiff} day${dayDiff !== 1 ? 's' : ''} left`,
    };
  }
  return {
    borderClass: 'border-gray-100 bg-white',
    badgeClass: 'bg-blue-50 text-blue-600',
    iconClass: 'text-[#4CC9F0]',
    icon: Clock,
    label: `${dayDiff} days left`,
  };
}

export function RemindersList() {
  const reminders = useStore(state => state.reminders);
  const deleteReminder = useStore(state => state.deleteReminder);
  const addReminder = useStore(state => state.addReminder);
  const familyMembers = useStore(state => state.familyMembers);
  const vaccines = useStore(state => state.vaccines);
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const currentUser = useStore(state => state.currentUser);

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

  // Filter vaccines for modal dropdown (upcoming only for the member)
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

  const selectedMember = familyMembers.find(m => m.id === formData.memberId);
  const selectedVaccine = vaccines.find(v => v.id === formData.vaccineId);

  // Filter to only current user's family members
  const userMembers = familyMembers.filter(m => m.userId === currentUser?.id);

  // ── SMART upcoming vaccines list ──────────────────────────────────────────
  // Include upcoming (pending) AND missed/overdue — exclude completed
  const actionableVaccines = vaccines
    .filter(v => {
      const isUserMember = userMembers.some(m => m.id === v.memberId);
      return isUserMember && v.status !== 'completed';
    })
    .sort((a, b) => {
      const dA = getDayDiff(a.dueDate);
      const dB = getDayDiff(b.dueDate);
      // Overdue first (most negative = most overdue), then nearest upcoming
      return dA - dB;
    });

  const handleOpenAddModal = (memberId?: string, vaccineId?: string, vaccineName?: string, dueDate?: string) => {
    if (memberId && vaccineId) {
      // Pre-fill with vaccine data; suggest the due date at 9 AM as reminder date
      const suggestedDate = dueDate
        ? format(new Date(dueDate), 'yyyy-MM-dd')
        : format(new Date(), 'yyyy-MM-dd');

      setFormData({
        memberId,
        vaccineId,
        reminderDate: suggestedDate,
        reminderTime: '09:00',
        message: `Reminder: Schedule ${vaccineName} vaccination`
      });
    } else {
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
    setFormData({ memberId: selectedMemberId || '', vaccineId: '', reminderDate: '', reminderTime: '', message: '' });
  };

  // Sort user's manually set reminders by date
  const sortedReminders = [...reminders]
    .filter(r => userMembers.some(m => m.id === r.memberId))
    .sort((a, b) => new Date(a.reminderDate).getTime() - new Date(b.reminderDate).getTime());

  /* ── RENDER ── */
  return (
    <div className="h-full pb-28 px-4 pt-4">

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Reminders</h2>
          <p className="text-xs text-gray-400 mt-0.5">Upcoming &amp; overdue vaccines for your family</p>
        </div>
        <button
          onClick={() => handleOpenAddModal()}
          className="w-10 h-10 bg-[#2F80ED] rounded-full flex items-center justify-center hover:bg-[#2568c5] transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* ── NO FAMILY MEMBERS ── */}
      {userMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <UserX className="w-10 h-10 text-blue-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No family members yet</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Add a family member from the Home screen to automatically generate their vaccination schedule.
          </p>
        </div>
      ) : actionableVaccines.length === 0 ? (
        /* ── ALL VACCINATIONS COMPLETE ── */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <PartyPopper className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">All Vaccinations Complete! 🎉</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Your family's vaccination schedule is fully up to date. Great work!
          </p>
        </div>
      ) : (
        <>
          {/* ══════════════════════════════════
              VACCINE REMINDER CARDS
              (overdue → urgent → upcoming)
          ══════════════════════════════════ */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Syringe className="w-4 h-4" />
              <span>Vaccine Schedule</span>
              <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                {actionableVaccines.length}
              </span>
            </h3>

            <div className="space-y-3">
              {actionableVaccines.map((vaccine, idx) => {
                const member = userMembers.find(m => m.id === vaccine.memberId);
                const hasReminder = reminders.some(r => r.vaccineId === vaccine.id);
                const dayDiff = getDayDiff(vaccine.dueDate);
                const urgency = urgencyConfig(dayDiff);
                const UrgencyIcon = urgency.icon;

                return (
                  <motion.div
                    key={vaccine.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`rounded-xl p-4 border shadow-sm transition-shadow hover:shadow-md ${urgency.borderClass}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Left icon */}
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${hasReminder ? 'bg-green-100' : urgency.badgeClass
                        }`}>
                        {hasReminder
                          ? <CheckCircle className="w-5 h-5 text-green-600" />
                          : <UrgencyIcon className={`w-5 h-5 ${urgency.iconClass}`} />
                        }
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-gray-800 text-sm leading-tight">{vaccine.vaccineName}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              For: <span className="font-medium text-gray-700">{member?.name ?? 'Unknown'}</span>
                            </p>
                          </div>
                          {/* Urgency badge */}
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0 flex items-center gap-1 ${urgency.badgeClass}`}>
                            <UrgencyIcon className="w-3 h-3" />
                            {urgency.label}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Due: {format(new Date(vaccine.dueDate), 'dd MMM yyyy')}</span>
                          </div>

                          {/* Set / Update Reminder button */}
                          <button
                            onClick={() => handleOpenAddModal(vaccine.memberId, vaccine.id, vaccine.vaccineName, vaccine.dueDate)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${hasReminder
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-[#2F80ED] text-white hover:bg-[#2568c5]'
                              }`}
                          >
                            {hasReminder ? '✓ Reminder Set' : 'Set Reminder'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════
              SAVED REMINDERS LIST
          ══════════════════════════════════ */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#FF6B6B]" />
              <span>Saved Reminders</span>
              {sortedReminders.length > 0 && (
                <span className="ml-auto bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {sortedReminders.length}
                </span>
              )}
            </h3>

            {sortedReminders.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Bell className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-sm font-medium text-gray-500">No saved reminders yet</p>
                <p className="text-xs text-gray-400 mt-1">Tap "Set Reminder" on any vaccine above</p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {sortedReminders.map((reminder) => {
                    const member = userMembers.find(m => m.id === reminder.memberId);
                    const vaccine = vaccines.find(v => v.id === reminder.vaccineId);
                    const isPast = new Date(reminder.reminderDate) < new Date();

                    return (
                      <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className={`relative rounded-2xl p-4 border shadow-sm group overflow-hidden ${isPast ? 'bg-gray-50 border-gray-100' : 'bg-white border-gray-100'
                          }`}
                      >
                        {/* Left accent bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${isPast ? 'bg-gray-300' : 'bg-[#FF6B6B]'
                          }`} />

                        <div className="pl-3 flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-1.5 mb-1">
                              <span className="text-xs font-bold text-[#2F80ED]">
                                {member?.name ?? 'Unknown Member'}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="text-xs text-gray-500 truncate">
                                {vaccine?.vaccineName ?? 'Unknown Vaccine'}
                              </span>
                              {isPast && (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">Sent</span>
                              )}
                            </div>

                            <p className="text-sm font-medium text-gray-800 mb-2 pr-8 leading-snug">
                              {reminder.message}
                            </p>

                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                <span>{format(new Date(reminder.reminderDate), 'dd MMM yyyy')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3.5 h-3.5 text-[#2EC4B6]" />
                                <span>{format(new Date(reminder.reminderDate), 'h:mm a')}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteReminder(reminder.id)}
                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── ADD REMINDER MODAL (unchanged logic) ── */}
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
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Set Reminder</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Family Member */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Family Member</label>
                  <div className="relative" ref={memberDropdownRef}>
                    <button
                      onClick={() => { setShowMemberDropdown(!showMemberDropdown); setShowVaccineDropdown(false); }}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#2F80ED] transition-colors"
                    >
                      <span className={selectedMember ? 'text-gray-800' : 'text-gray-400'}>
                        {selectedMember?.name || 'Select family member'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMemberDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showMemberDropdown && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto">
                        {userMembers.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">No family members added</div>
                        ) : (
                          userMembers.map(member => (
                            <button
                              key={member.id}
                              onClick={() => { setFormData(p => ({ ...p, memberId: member.id, vaccineId: '' })); setShowMemberDropdown(false); }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${formData.memberId === member.id ? 'bg-blue-50 text-[#2F80ED]' : ''}`}
                            >
                              {member.name} ({member.relationship})
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vaccine */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vaccine</label>
                  <div className="relative" ref={vaccineDropdownRef}>
                    <button
                      onClick={() => {
                        if (!formData.memberId) { alert('Please select a family member first'); return; }
                        setShowVaccineDropdown(!showVaccineDropdown);
                        setShowMemberDropdown(false);
                      }}
                      disabled={!formData.memberId}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#2F80ED] transition-colors disabled:opacity-50"
                    >
                      <span className={selectedVaccine ? 'text-gray-800' : 'text-gray-400'}>
                        {selectedVaccine?.vaccineName || 'Select vaccine'}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showVaccineDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showVaccineDropdown && (
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto">
                        {memberVaccines.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">No upcoming vaccines for this member</div>
                        ) : (
                          memberVaccines.map(v => (
                            <button
                              key={v.id}
                              onClick={() => { setFormData(p => ({ ...p, vaccineId: v.id })); setShowVaccineDropdown(false); }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${formData.vaccineId === v.id ? 'bg-blue-50 text-[#2F80ED]' : ''}`}
                            >
                              {v.vaccineName}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Date</label>
                  <input
                    type="date"
                    value={formData.reminderDate}
                    onChange={e => setFormData(p => ({ ...p, reminderDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Time</label>
                  <input
                    type="time"
                    value={formData.reminderTime}
                    onChange={e => setFormData(p => ({ ...p, reminderTime: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="e.g., Don't forget the vaccination appointment!"
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2F80ED] resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-[#2F80ED] text-white rounded-xl font-bold hover:bg-[#2568c5] transition-colors shadow-lg shadow-blue-200 mt-4"
                >
                  Save Reminder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
