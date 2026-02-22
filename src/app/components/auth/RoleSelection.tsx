import { useStore } from '../../store/useStore';
import { User, HeartHandshake, ArrowRight } from 'lucide-react';

interface RoleSelectionProps {
  onComplete: () => void;
}

export function RoleSelection({ onComplete }: RoleSelectionProps) {
  const setRole = useStore(state => state.setRole);

  const handleSelectRole = (role: 'normal_user' | 'asha_worker') => {
    setRole(role);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2EC4B6] rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose how you want to use VacciCare</p>
        </div>

        <div className="space-y-4">
          {/* Normal User Option */}
          <button
            onClick={() => handleSelectRole('normal_user')}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#2EC4B6] hover:bg-[#2EC4B6]/5 transition-all group text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-[#2EC4B6]/20 transition-colors">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Normal User</h3>
                <p className="text-sm text-gray-500">Track vaccinations for your family</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#2EC4B6] transition-colors" />
            </div>
          </button>

          {/* ASHA Worker Option */}
          <button
            onClick={() => handleSelectRole('asha_worker')}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-[#4CC9F0] hover:bg-[#4CC9F0]/5 transition-all group text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-[#4CC9F0]/20 transition-colors">
                <HeartHandshake className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">ASHA Worker</h3>
                <p className="text-sm text-gray-500">Manage client vaccinations in your area</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#4CC9F0] transition-colors" />
            </div>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <span>Select a role to continue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
