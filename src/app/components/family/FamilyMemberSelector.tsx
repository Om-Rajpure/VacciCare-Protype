import { useStore } from '../../store/useStore';
import { Users, ChevronDown, UserPlus, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { differenceInDays } from 'date-fns';

interface FamilyMemberSelectorProps {
  onAddMember: () => void;
}

const AVATAR_COLORS = [
  'bg-[#4CC9F0]', 'bg-[#2EC4B6]', 'bg-[#f6ad55]',
  'bg-[#fc8181]', 'bg-[#b794f4]', 'bg-[#68d391]',
];

function getAgeTag(age: number): { label: string; color: string } {
  if (age < 1) return { label: 'Infant', color: 'bg-pink-100 text-pink-600' };
  if (age < 5) return { label: 'Toddler', color: 'bg-blue-100 text-blue-600' };
  if (age < 18) return { label: 'Child', color: 'bg-indigo-100 text-indigo-600' };
  if (age < 60) return { label: 'Adult', color: 'bg-green-100 text-green-600' };
  return { label: 'Elderly', color: 'bg-purple-100 text-purple-600' };
}

export function FamilyMemberSelector({ onAddMember }: FamilyMemberSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allFamilyMembers = useStore(state => state.familyMembers);
  const allVaccines = useStore(state => state.vaccines);
  const currentUserId = useStore(state => state.currentUser?.id);
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const selectMember = useStore(state => state.selectMember);

  const familyMembers = useMemo(() =>
    allFamilyMembers.filter(m => m.userId === currentUserId),
    [allFamilyMembers, currentUserId]
  );

  const selectedMember = familyMembers.find(m => m.id === selectedMemberId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedMemberId && familyMembers.length > 0) {
      selectMember(familyMembers[0].id);
    }
  }, [selectedMemberId, familyMembers.length]);

  // Compute compliance and overdue for selected member badge display
  const getMemberStats = (memberId: string) => {
    const memberVaccines = allVaccines.filter(v => v.memberId === memberId);
    const total = memberVaccines.length;
    const completed = memberVaccines.filter(v => v.status === 'completed').length;
    const missed = memberVaccines.filter(v => v.status === 'missed').length;
    const today = new Date();
    const maxOverdue = missed > 0
      ? Math.max(...memberVaccines.filter(v => v.status === 'missed').map(v => differenceInDays(today, new Date(v.dueDate))))
      : 0;
    const compliance = total > 0 ? Math.round((completed / total) * 100) : 100;
    return { total, completed, missed, compliance, maxOverdue };
  };

  if (familyMembers.length === 0) {
    return (
      <button
        onClick={onAddMember}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        <span>Add Family Member</span>
      </button>
    );
  }

  const selectedStats = selectedMember ? getMemberStats(selectedMember.id) : null;
  const selectedAgeTag = selectedMember ? getAgeTag(selectedMember.age) : null;
  const selectedAvatarColor = selectedMember ? AVATAR_COLORS[familyMembers.indexOf(selectedMember) % AVATAR_COLORS.length] : AVATAR_COLORS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2.5 bg-white/95 backdrop-blur-sm border-0 shadow-sm rounded-full hover:shadow-md transition-all min-w-[240px]"
      >
        {/* Avatar circle */}
        <div className={`w-9 h-9 ${selectedAvatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
          {selectedMember?.name.charAt(0) || '?'}
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center space-x-1.5">
            <div className="text-sm font-bold text-gray-800 leading-tight">
              {selectedMember?.name || 'Select Member'}
            </div>
            {selectedAgeTag && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${selectedAgeTag.color}`}>
                {selectedAgeTag.label}
              </span>
            )}
            {selectedStats && selectedStats.missed > 0 && (
              <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
            )}
          </div>
          {selectedMember && selectedStats && (
            <div className="flex items-center space-x-2 mt-0.5">
              <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                {selectedMember.age}y · {selectedMember.relationship}
              </div>
              <span className={`text-[10px] font-bold ${selectedStats.compliance < 60 ? 'text-red-500' : selectedStats.compliance < 85 ? 'text-orange-500' : 'text-green-600'}`}>
                {selectedStats.compliance}%
              </span>
            </div>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-200 min-w-[260px]">
          {familyMembers.map((member, idx) => {
            const stats = getMemberStats(member.id);
            const ageTag = getAgeTag(member.age);
            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const isSelected = member.id === selectedMemberId;

            return (
              <button
                key={member.id}
                onClick={() => { selectMember(member.id); setIsOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${avatarColor} ${isSelected ? 'ring-2 ring-offset-1 ring-blue-400' : ''}`}>
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-gray-800">{member.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${ageTag.color}`}>{ageTag.label}</span>
                    {stats.missed > 0 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-red-100 text-red-600 flex items-center space-x-0.5">
                        <AlertCircle className="w-2.5 h-2.5" />
                        <span>{stats.missed} overdue</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-xs text-gray-500">{member.age} yrs · {member.relationship}</span>
                    <span className={`text-[10px] font-bold ${stats.compliance < 60 ? 'text-red-500' : stats.compliance < 85 ? 'text-orange-500' : 'text-green-600'}`}>
                      {stats.compliance}% compliance
                    </span>
                  </div>
                </div>
              </button>
            );
          })}

          <button
            onClick={() => { onAddMember(); setIsOpen(false); }}
            className="w-full flex items-center space-x-3 px-4 py-3 border-t border-gray-200 hover:bg-gray-50 transition-colors text-blue-600"
          >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Add New Member</span>
          </button>
        </div>
      )}
    </div>
  );
}