import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { User, Lock, Mail, Phone, Save, LogOut, Trash2, Users, MapPin, Navigation } from 'lucide-react';
import type { User as UserType, FamilyMember, UserLocation, GPSCoordinates } from '../../store/useStore';

export function ProfileSettings() {
  // Access store values
  const currentUser = useStore((state) => state.currentUser);
  const updateUser = useStore((state) => state.updateUser);
  const logout = useStore((state) => state.logout);
  const allFamilyMembers = useStore((state) => state.familyMembers);
  const deleteFamilyMember = useStore((state) => state.deleteFamilyMember);
  
  // Filter family members in the component
  const familyMembers = (allFamilyMembers || []).filter((m: FamilyMember) => m.userId === currentUser?.id);

  const [isEditing, setIsEditing] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    village: currentUser?.location?.village || '',
    ward: currentUser?.location?.ward || '',
    latitude: currentUser?.location?.gpsCoordinates?.latitude?.toString() || '',
    longitude: currentUser?.location?.gpsCoordinates?.longitude?.toString() || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Update formData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        village: currentUser.location?.village || '',
        ward: currentUser.location?.ward || '',
        latitude: currentUser.location?.gpsCoordinates?.latitude?.toString() || '',
        longitude: currentUser.location?.gpsCoordinates?.longitude?.toString() || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

const handleGetLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }));
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleSave = () => {
    if (!updateUser) return;
    
    setError('');
    setSuccess('');

    if (!formData.username || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate location fields - required for normal users
    if (!formData.village || !formData.ward) {
      setError('Please fill in your location details (Village/Area and Ward)');
      return;
    }

    const updates: Partial<UserType> = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      location: {
        village: formData.village,
        ward: formData.ward,
        gpsCoordinates: formData.latitude && formData.longitude ? {
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude)
        } : undefined
      }
    };

    // If changing password
    if (formData.newPassword) {
      if (formData.currentPassword !== currentUser?.password) {
        setError('Current password is incorrect');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }

      (updates as any).password = formData.newPassword;
    }

    updateUser(updates);
    setSuccess('Profile updated successfully!');
    setIsEditing(false);
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleDeleteMember = (memberId: string) => {
    if (deleteFamilyMember) {
      deleteFamilyMember(memberId);
    }
    setShowDeleteConfirm(null);
  };

  // Return a fallback UI if no user is logged in
  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
        <div className="text-center py-8">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No User Logged In</h2>
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center space-x-3 text-white">
          <User className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <p className="text-purple-100 text-sm">Manage your account and family</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Account Information */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Account Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
<button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      username: currentUser.username || '',
                      email: currentUser.email || '',
                      phone: currentUser.phone || '',
                      village: currentUser.location?.village || '',
                      ward: currentUser.location?.ward || '',
                      latitude: currentUser.location?.gpsCoordinates?.latitude?.toString() || '',
                      longitude: currentUser.location?.gpsCoordinates?.longitude?.toString() || '',
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                    setError('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

<div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                  disabled={!isEditing}
                  maxLength={10}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {/* Location Fields */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location Details
              </h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Village/Area/Ward *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.village}
                      onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your village/area/ward"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Ward Number</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => setFormData(prev => ({ ...prev, ward: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Enter ward number (optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">GPS Coordinates</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.latitude}
                      onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Latitude"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <input
                      type="text"
                      value={formData.longitude}
                      onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Longitude"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={isGettingLocation}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
                        title="Get current location"
                      >
                        <Navigation className={`w-5 h-5 ${isGettingLocation ? 'animate-spin' : ''}`} />
                      </button>
                    )}
                  </div>
                  {locationError && (
                    <p className="text-xs text-red-500 mt-1">{locationError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Click the navigation button to auto-detect your GPS coordinates
                  </p>
                </div>
              </div>
            </div>

            {isEditing && (
              <>
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Change Password (Optional)</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Family Members */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Family Members</h3>
          
          {familyMembers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No family members added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{member.name}</p>
                      <p className="text-sm text-gray-500">
                        {member.age} years • {member.relationship} • {member.gender}
                      </p>
                    </div>
                  </div>
                  
                  {showDeleteConfirm === member.id ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-red-600 mr-2">Delete this member?</span>
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(member.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-full justify-center"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
