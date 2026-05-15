import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  LogOut,
  Camera
} from 'lucide-react';
import './Settings.css';
import { useAuth } from '../../context/AuthContext';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="settings-container">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>Manage your account settings and preferences.</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-nav glass-card">
          <button className="settings-nav-item active"><User size={18} /> Profile</button>
          <button className="settings-nav-item"><Lock size={18} /> Security</button>
          <button className="settings-nav-item"><Bell size={18} /> Notifications</button>
          <button className="settings-nav-item"><Globe size={18} /> Preferences</button>
          <div className="nav-divider"></div>
          <button className="settings-nav-item delete" onClick={logout}><LogOut size={18} /> Logout</button>
        </div>

        <div className="settings-content">
          <section className="glass-card settings-section">
            <h3>Profile Information</h3>
            <div className="profile-upload">
              <div className="avatar-preview">
                <User size={40} />
                <button className="upload-badge"><Camera size={16} /></button>
              </div>
              <div className="upload-info">
                <h4>Your Avatar</h4>
                <p>JPG or PNG. Max size of 800K</p>
              </div>
            </div>

            <form className="settings-form">
              <div className="input-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={user?.name} placeholder="John Doe" />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" defaultValue={user?.email} placeholder="john@example.com" readOnly />
                </div>
              </div>
              <div className="input-group">
                <label>Bio</label>
                <textarea placeholder="Tell us a bit about yourself..." rows={4}></textarea>
              </div>
              <button type="button" className="primary-button">Save Changes</button>
            </form>
          </section>

          <section className="glass-card settings-section">
            <h3>Account Security</h3>
            <div className="security-item">
              <div className="security-info">
                <h4>Change Password</h4>
                <p>Update your password to keep your account secure.</p>
              </div>
              <button className="secondary-button small">Update</button>
            </div>
            <div className="security-item">
              <div className="security-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account.</p>
              </div>
              <button className="secondary-button small">Enable</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
