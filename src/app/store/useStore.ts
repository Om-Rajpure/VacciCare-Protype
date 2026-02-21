import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, addWeeks, addMonths, addYears, isBefore, isAfter, differenceInDays } from 'date-fns';

// Export shallow for use in components
export { shallow } from 'zustand/shallow';

export type UserRole = 'normal_user' | 'asha_worker';

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

export interface UserLocation {
  village: string;
  ward: string;
  gpsCoordinates?: GPSCoordinates;
}

export interface ASHAWorkerProfile {
  name: string;
  district: string;
  block: string;
  phone: string;
  aadhaarNumber: string;
  assignedLocation?: UserLocation;
}

export interface Client {
  id: string;
  ashaWorkerId: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  location?: UserLocation;
  vaccinesTaken: number;
  vaccinesMissed: number;
  vaccinesCompleted: number;
  upcomingVaccines: string[];
}

export interface User {
  id: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  role?: UserRole;
  location?: UserLocation;
  ashaProfile?: ASHAWorkerProfile;
}

export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  birthdate: string;
  gender: 'male' | 'female' | 'other';
  relationship: string;
  age: number;
}

export interface Vaccine {
  id: string;
  vaccineName: string;
  dueDate: string;
  status: 'upcoming' | 'completed' | 'missed';
  memberId: string;
  completedDate?: string;
  notes?: string;
}

export interface Reminder {
  id: string;
  vaccineId: string;
  memberId: string;
  reminderDate: string;
  message: string;
  notified: boolean;
}

interface Store {
  users: User[];
  currentUser: User | null;
  familyMembers: FamilyMember[];
  vaccines: Vaccine[];
  reminders: Reminder[];
  selectedMemberId: string | null;
  clients: Client[];
  
  // Auth actions
  signup: (user: Omit<User, 'id'>) => boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  
  // Role actions
  setRole: (role: UserRole) => void;
  setASHAProfile: (profile: ASHAWorkerProfile) => void;
  
  // Client actions
  addClient: (client: Omit<Client, 'id' | 'ashaWorkerId'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Family member actions
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'userId' | 'age'>) => void;
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string) => void;
  selectMember: (id: string) => void;
  
  // Vaccine actions
  updateVaccineStatus: (id: string, status: Vaccine['status'], completedDate?: string, notes?: string) => void;
  checkMissedVaccines: () => void;
  addVaccine: (vaccine: Omit<Vaccine, 'id'>) => void;
  
  // Reminder actions
  addReminder: (reminder: Omit<Reminder, 'id' | 'notified'>) => void;
  markReminderNotified: (id: string) => void;
  deleteReminder: (id: string) => void;
  
  // User actions
  updateUser: (updates: Partial<Omit<User, 'id'>>) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      familyMembers: [],
      vaccines: [],
      reminders: [],
      selectedMemberId: null,
      clients: [],
      
      signup: (userData) => {
        const users = get().users;
        
        // Check if username already exists
        if (users.some(u => u.username === userData.username)) {
          return false;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          ...userData
        };
        
        set({ users: [...users, newUser], currentUser: newUser });
        return true;
      },
      
      login: (username, password) => {
        const users = get().users;
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ currentUser: null, selectedMemberId: null });
      },
      
      setRole: (role) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const updatedUser = { ...currentUser, role };
        
        set(state => ({
          currentUser: updatedUser,
          users: state.users.map(u => u.id === currentUser.id ? updatedUser : u)
        }));
      },
      
      setASHAProfile: (profile) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const updatedUser = { ...currentUser, ashaProfile: profile };
        
        set(state => ({
          currentUser: updatedUser,
          users: state.users.map(u => u.id === currentUser.id ? updatedUser : u)
        }));
      },
      
      addClient: (clientData) => {
        const currentUser = get().currentUser;
        
        // Debug logging
        console.log('Adding client:', { 
          currentUser: currentUser?.id, 
          role: currentUser?.role,
          hasClientData: !!clientData 
        });
        
        if (!currentUser) {
          console.error('Cannot add client: No current user');
          return;
        }
        
        if (currentUser.role !== 'asha_worker') {
          console.error('Cannot add client: User is not an ASHA worker. Role:', currentUser.role);
          return;
        }
        
        const newClient: Client = {
          id: Date.now().toString(),
          ...clientData,
          ashaWorkerId: currentUser.id
        };
        
        console.log('New client created:', newClient);
        
        set(state => ({
          clients: [...state.clients, newClient]
        }));
      },
      
      updateClient: (id, updates) => {
        set(state => ({
          clients: state.clients.map(c => 
            c.id === id ? { ...c, ...updates } : c
          )
        }));
      },
      
      deleteClient: (id) => {
        set(state => ({
          clients: state.clients.filter(c => c.id !== id)
        }));
      },
      
      addFamilyMember: (memberData) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const birthdate = new Date(memberData.birthdate);
        const today = new Date();
        const age = Math.floor((today.getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
        
        const newMember: FamilyMember = {
          id: Date.now().toString(),
          userId: currentUser.id,
          age,
          ...memberData
        };
        
        // Generate vaccination schedule
        const vaccines = generateVaccinationSchedule(newMember);
        
        set(state => ({
          familyMembers: [...state.familyMembers, newMember],
          vaccines: [...state.vaccines, ...vaccines],
          selectedMemberId: newMember.id
        }));
      },
      
      updateFamilyMember: (id, updates) => {
        set(state => ({
          familyMembers: state.familyMembers.map(m => 
            m.id === id ? { ...m, ...updates } : m
          )
        }));
      },
      
      deleteFamilyMember: (id) => {
        set(state => ({
          familyMembers: state.familyMembers.filter(m => m.id !== id),
          vaccines: state.vaccines.filter(v => v.memberId !== id),
          reminders: state.reminders.filter(r => r.memberId !== id),
          selectedMemberId: state.selectedMemberId === id ? null : state.selectedMemberId
        }));
      },
      
      selectMember: (id) => {
        set({ selectedMemberId: id });
      },
      
      updateVaccineStatus: (id, status, completedDate, notes) => {
        set(state => ({
          vaccines: state.vaccines.map(v => 
            v.id === id ? { ...v, status, completedDate, notes } : v
          )
        }));
      },
      
      checkMissedVaccines: () => {
        const today = new Date();
        set(state => {
          let hasChanges = false;
          const newVaccines = state.vaccines.map(v => {
            if (v.status === 'upcoming' && isBefore(new Date(v.dueDate), today)) {
              hasChanges = true;
              return { ...v, status: 'missed' as const };
            }
            return v;
          });
          
          return hasChanges ? { vaccines: newVaccines } : {};
        });
      },
      
      addVaccine: (vaccineData) => {
        const newVaccine: Vaccine = {
          id: `manual-${Date.now()}`,
          ...vaccineData
        };
        
        set(state => ({
          vaccines: [...state.vaccines, newVaccine]
        }));
      },
      
      addReminder: (reminderData) => {
        const newReminder: Reminder = {
          id: Date.now().toString(),
          notified: false,
          ...reminderData
        };
        
        set(state => ({
          reminders: [...state.reminders, newReminder]
        }));
        
        // Schedule browser notification
        const reminderDate = new Date(reminderData.reminderDate);
        const now = new Date();
        const delay = reminderDate.getTime() - now.getTime();
        
        if (delay > 0) {
          setTimeout(() => {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Vaccination Reminder', {
                body: reminderData.message,
                icon: '/vaccine-icon.png'
              });
              get().markReminderNotified(newReminder.id);
            }
          }, delay);
        }
      },
      
      markReminderNotified: (id) => {
        set(state => ({
          reminders: state.reminders.map(r => 
            r.id === id ? { ...r, notified: true } : r
          )
        }));
      },
      
      deleteReminder: (id) => {
        set(state => ({
          reminders: state.reminders.filter(r => r.id !== id)
        }));
      },
      
      updateUser: (updates) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;
        
        const updatedUser = { ...currentUser, ...updates };
        
        set(state => ({
          currentUser: updatedUser,
          users: state.users.map(u => u.id === currentUser.id ? updatedUser : u)
        }));
      }
    }),
    {
      name: 'vaccination-tracker-storage'
    }
  )
);

// Generate vaccination schedule based on Indian Universal Immunization Programme
function generateVaccinationSchedule(member: FamilyMember): Vaccine[] {
  const vaccines: Vaccine[] = [];
  const birthdate = new Date(member.birthdate);
  const today = new Date();
  
  const scheduleTemplate: Array<{name: string; weeks?: number; days?: number; months?: number; years?: number}> = [
    // At birth
    { name: 'BCG', weeks: 0, days: 0 },
    { name: 'OPV 0', weeks: 0, days: 0 },
    { name: 'Hepatitis B (Birth dose)', weeks: 0, days: 0 },
    
    // 6 weeks
    { name: 'DPT 1', weeks: 6, days: 0 },
    { name: 'OPV 1', weeks: 6, days: 0 },
    { name: 'Hepatitis B 1', weeks: 6, days: 0 },
    { name: 'Hib 1', weeks: 6, days: 0 },
    { name: 'Rotavirus 1', weeks: 6, days: 0 },
    { name: 'PCV 1', weeks: 6, days: 0 },
    
    // 10 weeks
    { name: 'DPT 2', weeks: 10, days: 0 },
    { name: 'OPV 2', weeks: 10, days: 0 },
    { name: 'Hepatitis B 2', weeks: 10, days: 0 },
    { name: 'Hib 2', weeks: 10, days: 0 },
    { name: 'Rotavirus 2', weeks: 10, days: 0 },
    { name: 'PCV 2', weeks: 10, days: 0 },
    
    // 14 weeks
    { name: 'DPT 3', weeks: 14, days: 0 },
    { name: 'OPV 3', weeks: 14, days: 0 },
    { name: 'Hepatitis B 3', weeks: 14, days: 0 },
    { name: 'Hib 3', weeks: 14, days: 0 },
    { name: 'Rotavirus 3', weeks: 14, days: 0 },
    { name: 'PCV 3', weeks: 14, days: 0 },
    
    // 9 months
    { name: 'MMR 1', months: 9 },
    { name: 'Typhoid Conjugate Vaccine', months: 9 },
    
    // 12 months
    { name: 'Hepatitis A 1', months: 12 },
    
    // 16-24 months
    { name: 'DPT Booster 1', months: 18 },
    { name: 'OPV Booster', months: 18 },
    { name: 'MMR 2', months: 18 },
    { name: 'Varicella 1', months: 18 },
    { name: 'Hepatitis A 2', months: 18 },
    
    // 4-6 years
    { name: 'DPT Booster 2', years: 5 },
    { name: 'Varicella 2', years: 5 },
    
    // 10 years
    { name: 'Td', years: 10 },
    
    // 16 years
    { name: 'Td Booster', years: 16 }
  ];
  
  scheduleTemplate.forEach((template, index) => {
    let dueDate: Date;
    
    if (template.weeks !== undefined) {
      dueDate = addWeeks(birthdate, template.weeks);
      if (template.days && template.days > 0) {
        dueDate = addDays(dueDate, template.days);
      }
    } else if (template.months !== undefined) {
      dueDate = addMonths(birthdate, template.months);
    } else if (template.years !== undefined) {
      dueDate = addYears(birthdate, template.years);
    } else {
      return;
    }
    
    // Determine status
    let status: Vaccine['status'] = 'upcoming';
    if (isBefore(dueDate, today)) {
      status = 'missed';
    }
    
    vaccines.push({
      id: `${member.id}-vaccine-${index}-${Date.now()}`,
      vaccineName: template.name,
      dueDate: dueDate.toISOString(),
      status,
      memberId: member.id
    });
  });
  
  return vaccines;
}