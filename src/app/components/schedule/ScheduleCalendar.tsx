import { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useStore, Vaccine } from '../../store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Clock, X } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format as formatDate } from 'date-fns';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export function ScheduleCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'missed'>('all');
  
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const vaccines = useStore(state => state.vaccines);
  const familyMembers = useStore(state => state.familyMembers);
  const updateVaccineStatus = useStore(state => state.updateVaccineStatus);
  
  const member = familyMembers.find(m => m.id === selectedMemberId);
  
  const events = useMemo(() => {
    if (!member) return [];
    
    return vaccines
      .filter(v => v.memberId === selectedMemberId)
      .filter(v => {
        if (filter === 'all') return true;
        return v.status === filter;
      })
      .map(v => {
        let color = '#4CC9F0'; // Default/Upcoming (Blue/Teal)
        if (v.status === 'completed') color = '#2EC4B6'; // Green
        if (v.status === 'missed') color = '#FF6B6B'; // Red
        if (v.status === 'upcoming') color = '#FFD166'; // Yellow/Orange
        
        return {
          id: v.id,
          title: v.vaccineName,
          start: new Date(v.dueDate),
          end: new Date(v.dueDate),
          resource: v,
          color,
        };
      });
  }, [vaccines, selectedMemberId, filter]);

  const eventStyleGetter = (event: any) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '8px',
        opacity: 0.9,
        color: event.resource.status === 'upcoming' ? '#333' : '#fff',
        border: '0px',
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: '500',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }
    };
  };

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event);
  };

  const handleMarkCompleted = () => {
    if (selectedEvent) {
      updateVaccineStatus(selectedEvent.resource.id, 'completed', new Date().toISOString());
      setSelectedEvent(null);
    }
  };

  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
        <div className="bg-blue-100 p-6 rounded-full mb-4">
          <Calendar className="w-12 h-12 text-[#4CC9F0]" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">No Family Member Selected</h3>
        <p className="text-gray-500 mt-2">Please select a family member from the home screen to view their schedule.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4 pb-24">
      {/* Filter Chips */}
      <div className="flex space-x-2 overflow-x-auto py-2 px-1 scrollbar-hide">
        {(['all', 'upcoming', 'completed', 'missed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${
              filter === f
                ? 'bg-[#2EC4B6] text-white shadow-md transform scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div className="flex-1 bg-white rounded-3xl shadow-lg p-4 overflow-hidden border border-gray-100">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '65vh' }}
          views={['month', 'agenda']}
          defaultView={Views.MONTH}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          popup
          toolbar={true}
          className="rounded-xl font-sans text-sm"
        />
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                selectedEvent.resource.status === 'completed' ? 'bg-green-100 text-green-600' :
                selectedEvent.resource.status === 'missed' ? 'bg-red-100 text-red-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {selectedEvent.resource.status === 'completed' ? <CheckCircle className="w-8 h-8" /> :
                 selectedEvent.resource.status === 'missed' ? <AlertCircle className="w-8 h-8" /> :
                 <Clock className="w-8 h-8" />}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-1">{selectedEvent.title}</h3>
              <p className="text-sm text-gray-500 mb-6">
                Due: {formatDate(selectedEvent.start, 'MMMM d, yyyy')}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    selectedEvent.resource.status === 'completed' ? 'bg-green-100 text-green-700' :
                    selectedEvent.resource.status === 'missed' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {selectedEvent.resource.status}
                  </span>
                </div>

                {selectedEvent.resource.status !== 'completed' && (
                  <button
                    onClick={handleMarkCompleted}
                    className="w-full py-3 bg-[#2EC4B6] hover:bg-[#25a094] text-white rounded-xl font-bold shadow-lg shadow-teal-200 transition-all active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Mark as Completed</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
