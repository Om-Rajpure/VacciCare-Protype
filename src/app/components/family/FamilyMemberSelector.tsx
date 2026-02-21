import { useStore } from '../../store/useStore';
import { Users, ChevronDown, UserPlus } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';

interface FamilyMemberSelectorProps {
  onAddMember: () => void;
}

export function FamilyMemberSelector({ onAddMember }: FamilyMemberSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const allFamilyMembers = useStore(state => state.familyMembers);
  const currentUserId = useStore(state => state.currentUser?.id);
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const selectMember = useStore(state => state.selectMember);
  
  // Memoize the filtered family members to prevent unnecessary recalculations
  const familyMembers = useMemo(() => {
    return allFamilyMembers.filter(m => m.userId === currentUserId);
  }, [allFamilyMembers, currentUserId]);
  
  const selectedMember = familyMembers.find(m => m.id === selectedMemberId);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-select first member if none selected and members exist
  useEffect(() => {
    if (!selectedMemberId && familyMembers.length > 0) {
      selectMember(familyMembers[0].id);
    }
  }, [selectedMemberId, familyMembers.length]); // Only depend on length, not the entire array

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2.5 bg-white/95 backdrop-blur-sm border-0 shadow-sm rounded-full hover:shadow-md transition-all min-w-[220px]"
      >
        <div className="w-9 h-9 bg-[#4CC9F0]/10 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-[#4CC9F0]" />
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm font-bold text-gray-800 leading-tight">
            {selectedMember?.name || 'Select Member'}
          </div>
          {selectedMember && (
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
              {selectedMember.age}y • {selectedMember.relationship}
            </div>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-64 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          {familyMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => {
                selectMember(member.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                member.id === selectedMemberId ? 'bg-blue-50' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                member.id === selectedMemberId ? 'bg-blue-600' : 'bg-gray-200'
              }`}>
                <Users className={`w-4 h-4 ${
                  member.id === selectedMemberId ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-800">{member.name}</div>
                <div className="text-xs text-gray-500">
                  {member.age} years • {member.relationship}
                </div>
              </div>
            </button>
          ))}
          
          <button
            onClick={() => {
              onAddMember();
              setIsOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 border-t border-gray-200 hover:bg-gray-50 transition-colors text-blue-600"
          >
            <UserPlus className="w-5 h-5" />
            <span className="text-sm font-medium">Add New Member</span>
          </button>
        </div>
      )}
    </div>
  );
}