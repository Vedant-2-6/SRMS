import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Vedant Sharma',
    rollNo: '10001',
    email: 'vedant@example.com',
    contactNumber: '1234567890',
    secondaryContactNumber: '0987654321',
    emergencyContact: '9876543210',
    address: '123 Main Street, City, Country',
    profilePicture: null,
    profileBanner: null,
    semester: '6th',
  });

  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Fetch profile data from the backend (use mock data for now)
    // Replace with actual API call
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profilePicture: URL.createObjectURL(file) });
  };

  // const handleProfileBannerChange = (e) => {
  //   const file = e.target.files[0];
  //   setProfile({ ...profile, profileBanner: URL.createObjectURL(file) });
  // };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle password change (API call)
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSave = () => {
    // Save updated profile data (API call)
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally, reset the profile to the original values
  };

  return (
      <div className="profile-management container">
        <h1>Profile Management</h1>
        {/*<div className="profile-banner">*/}
        {/*  {profile.profileBanner ? (*/}
        {/*      <img src={profile.profileBanner} alt="Profile Banner" />*/}
        {/*  ) : (*/}
        {/*      <img src="default-banner.png" alt="Default Banner" />*/}
        {/*  )}*/}
        {/*  {editMode && (*/}
        {/*      <input type="file" name="profileBanner" onChange={handleProfileBannerChange} />*/}
        {/*  )}*/}
        {/*</div>*/}
        <div className="profile-details">
          <div className="profile-picture">
            {profile.profilePicture ? (
                <img src={profile.profilePicture} alt="Profile" />
            ) : (
                <img src="default-profile.png" alt="Default Profile" />
            )}
            {editMode && (
                <input type="file" name="profilePicture" onChange={handleProfilePictureChange} />
            )}
          </div>
          <div className="profile-info">
            <div className="profile-field">
              <label>Name:</label>
              <span>{profile.name}</span>
            </div>

            <div className="profile-field">
              <label>Roll Number:</label>
              <span>{profile.rollNo}</span>
            </div>

            <div className="profile-field">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>

            <div className="profile-field">
              <label>Contact Number:</label>
              <input
                  type="text"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleInputChange}
                  disabled={!editMode}
              />
            </div>

            <div className="profile-field">
              <label>Secondary Contact Number:</label>
              <input
                  type="text"
                  name="secondaryContactNumber"
                  value={profile.secondaryContactNumber}
                  onChange={handleInputChange}
                  disabled={!editMode}
              />
            </div>

            <div className="profile-field">
              <label>Emergency Contact:</label>
              <input
                  type="text"
                  name="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!editMode}
              />
            </div>

            <div className="profile-field">
              <label>Address:</label>
              <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  disabled={!editMode}
              ></textarea>
            </div>

            <div className="profile-field">
              <label>Semester:</label>
              <span>{profile.semester}</span>
            </div>

            {editMode && (
                <div className="password-change">
                  <label>New Password:</label>
                  <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <label>Confirm Password:</label>
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <button onClick={handlePasswordChange}>Change Password</button>
                </div>
            )}

            {editMode ? (
                <div className="edit-actions">
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <button onClick={handleEdit}>Edit Profile</button>
            )}
            <button className="back-button" onClick={() => navigate('/student/dashboard')}>
              Back
            </button>
          </div>
        </div>

      </div>
  );
};

export default Profile;
