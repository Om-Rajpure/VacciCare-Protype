import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from './store/useStore';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { RoleSelection } from './components/auth/RoleSelection';
import { AddFamilyMember } from './components/family/AddFamilyMember';
import { FamilyMemberSelector } from './components/family/FamilyMemberSelector';
import { VaccinationCard } from './components/home/VaccinationCard';
import { VaccinationProgress } from './components/home/VaccinationProgress';
import { UpcomingVaccines } from './components/home/UpcomingVaccines';
import { WelcomeGuide } from './components/home/WelcomeGuide';
import { EducationHub } from './components/education/EducationHub';
import { VaccinationCenters } from './components/centers/VaccinationCenters';
import { ProfileSettings } from './components/profile/ProfileSettings';
import { ScheduleCalendar } from './components/schedule/ScheduleCalendar';
import { RemindersList } from './components/reminders/RemindersList';
import { Navigation } from './components/layout/Navigation';
import { Chatbot } from './components/chatbot/Chatbot';
import { ASHAWorkerDashboard } from './screens/ASHAWorkerDashboard';
import { Shield, Bell, Plus, Heart, ArrowLeft, LogOut } from 'lucide-react';

function App() {
  const navigate = useNavigate();
  const [authView, setAuthView] = useState<'login' | 'signup' | 'role_selection'>('login');
  const [activeView, setActiveView] = useState<'home' | 'schedule' | 'centers' | 'education' | 'reminders' | 'profile'>('home');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  
  const currentUser = useStore(state => state.currentUser);
  const checkMissedVaccines = useStore(state => state.checkMissedVaccines);
  const selectedMemberId = useStore(state => state.selectedMemberId);
  const allFamilyMembers = useStore(state => state.familyMembers);
  const logout = useStore(state => state.logout);
  
  // Memoize filtered family members to prevent unnecessary re-renders
  const familyMembers = useMemo(() => {
    return allFamilyMembers.filter(m => m.userId === currentUser?.id);
  }, [allFamilyMembers, currentUser?.id]);

  // Check if user needs to select role
  const needsRoleSelection = currentUser && !currentUser.role;
  const isASHAWorker = currentUser?.role === 'asha_worker';

  // Handle logout - navigate to role selection
  const handleLogout = () => {
    logout();
    navigate('/onboarding');
  };

  // Prevent back button from going to auth pages after login
  useEffect(() => {
    if (currentUser && currentUser.role) {
      // Replace current history state to prevent going back to auth pages
      window.history.replaceState(null, '', '/');
    }
  }, [currentUser?.role]);

  // Check for missed vaccines on mount and periodically
  useEffect(() => {
    if (currentUser) {
      checkMissedVaccines();
      const interval = setInterval(checkMissedVaccines, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Show welcome guide for first-time users
  useEffect(() => {
    if (currentUser && familyMembers.length === 0) {
      const hasSeenWelcome = localStorage.getItem(`welcome_seen_${currentUser.id}`);
      if (!hasSeenWelcome) {
        setShowWelcome(true);
      }
    }
  }, [currentUser, familyMembers.length]);

  const handleCloseWelcome = () => {
    if (currentUser) {
      localStorage.setItem(`welcome_seen_${currentUser.id}`, 'true');
    }
    setShowWelcome(false);
  };

  const handleRequestNotifications = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  // Not logged in
  if (!currentUser) {
    if (authView === 'role_selection') {
      return <RoleSelection onComplete={() => setAuthView('login')} />;
    }
    return authView === 'login' ? (
      <Login onSwitchToSignup={() => setAuthView('signup')} onLoginSuccess={() => setAuthView('role_selection')} />
    ) : (
      <Signup onSwitchToLogin={() => setAuthView('login')} onSignupSuccess={() => setAuthView('role_selection')} />
    );
  }

  // Show role selection if user doesn't have a role yet
  if (needsRoleSelection) {
    return <RoleSelection onComplete={() => {
      // Force re-render to check role again
      window.location.reload();
    }} />;
  }

  // Show ASHA Worker Dashboard if user is ASHA worker
  if (isASHAWorker) {
    return <ASHAWorkerDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#F7FBFF] pb-24">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#2EC4B6] to-[#4CC9F0] shadow-lg rounded-b-[2rem] relative z-10">
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
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-[#2EC4B6]" />
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold">VacciTrack</h1>
                <p className="text-xs text-white/80">Family Health Guardian</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
               {activeView === 'home' && familyMembers.length > 0 && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                >
                  <Plus className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
          
          {/* Family Member Selector (visible on Home and Schedule) */}
          {(activeView === 'home' || activeView === 'schedule') && (
            <div className="mt-6">
              <FamilyMemberSelector onAddMember={() => setShowAddMember(true)} />
            </div>
          )}
        </div>
      </header>

      {/* Notification Permission Banner */}
      {notificationPermission === 'default' && (
        <div className="mx-4 mt-4 bg-[#FFD166]/20 border border-[#FFD166] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-yellow-700" />
            <p className="text-xs font-medium text-yellow-800">
              Enable notifications for reminders
            </p>
          </div>
          <button
            onClick={handleRequestNotifications}
            className="px-3 py-1.5 bg-[#FFD166] text-yellow-900 rounded-lg text-xs font-bold shadow-sm"
          >
            Enable
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeView === 'home' && (
          <>
            {/* Dashboard Grid */}
            {selectedMemberId ? (
              <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
                {/* Left Column */}
                <div className="space-y-6">
                  <VaccinationProgress />
                  
                  {/* Illustration for Child Care */}
                  <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[#4CC9F0]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-8 h-8 text-[#4CC9F0]" fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Healthy & Happy!</h3>
                      <p className="text-sm text-gray-500">Keep up the great work tracking vaccinations.</p>
                    </div>
                  </div>

                  <VaccinationCard />
                </div>

                {/* Right Column */}
                <div className="mt-6 lg:mt-0">
                  <UpcomingVaccines />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] shadow-lg p-12 text-center mt-10 border border-gray-100">
                <div className="w-24 h-24 bg-[#F7FBFF] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-[#2EC4B6]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome to VacciTrack
                </h2>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                  No records yet — add your first family member to start tracking!
                </p>
                <button
                  onClick={() => setShowAddMember(true)}
                  className="px-8 py-4 bg-[#2EC4B6] text-white rounded-xl font-bold hover:bg-[#25a094] transition-all shadow-lg shadow-teal-200"
                >
                  Add Family Member
                </button>
              </div>
            )}
          </>
        )}

        {activeView === 'schedule' && <ScheduleCalendar />}
        {activeView === 'reminders' && <RemindersList />}
        {activeView === 'education' && <EducationHub />}
        {activeView === 'centers' && <VaccinationCenters />}
        {activeView === 'profile' && <ProfileSettings />}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeView={activeView} onViewChange={setActiveView} />

      {/* Add Family Member Modal */}
      {showAddMember && (
        <AddFamilyMember onClose={() => setShowAddMember(false)} />
      )}

      {/* Welcome Guide Modal */}
      {showWelcome && (
        <WelcomeGuide onClose={handleCloseWelcome} />
      )}

      {/* Floating Chatbot Widget */}
      <Chatbot />
    </div>
  );
}

export default App;
