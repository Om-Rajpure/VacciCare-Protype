import { Shield, UserPlus, Calendar, Bell, BookOpen, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface WelcomeGuideProps {
  onClose: () => void;
}

export function WelcomeGuide({ onClose }: WelcomeGuideProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Welcome to VacciTrack!</h2>
                <p className="text-blue-100 text-sm">Your family's vaccination guardian</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              VacciTrack helps you manage your family's vaccinations based on the Indian Universal Immunization Programme. All data is stored securely on your device.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Quick Start Guide</h3>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">1. Add Family Members</h4>
                <p className="text-sm text-gray-600">
                  Click "Add Family Member" and enter details including name, birthdate, gender, and relationship. The system will automatically generate a personalized vaccination schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">2. Track Vaccinations</h4>
                <p className="text-sm text-gray-600">
                  View upcoming vaccines, mark them as completed when administered, and track your family's vaccination progress in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">3. Set Reminders</h4>
                <p className="text-sm text-gray-600">
                  Enable browser notifications and set reminders for upcoming vaccines. You'll receive alerts before due dates so you never miss a vaccination.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">4. Download Vaccination Card</h4>
                <p className="text-sm text-gray-600">
                  Generate a digital vaccination card with QR code containing your family member's complete vaccination history. Export as PDF for offline access.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">5. Learn & Find Centers</h4>
                <p className="text-sm text-gray-600">
                  Explore expert articles about vaccinations, learn about side effect care, and find vaccination centers near you with our searchable database.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-800 mb-3">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Auto-generated schedules based on age</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Missed vaccine detection & alerts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Browser notification reminders</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>QR code & PDF export</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Educational content from doctors</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>Complete offline functionality</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> VacciTrack is a tracking tool. Always consult your pediatrician for medical advice and before making vaccination decisions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
