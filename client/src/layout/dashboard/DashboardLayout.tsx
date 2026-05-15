import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Menu, User, Bell } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/dashboard/create') return 'Create Poll';
    if (path === '/dashboard/polls') return 'My Polls';
    if (path.includes('/dashboard/analytics')) return 'Analytics';
    if (path === '/dashboard/published') return 'Published Polls';
    if (path === '/dashboard/settings') return 'Settings';
    return 'Dashboard';
  };


  if (isLoading) return <div className="loading-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="dashboard-container">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(true)}>
              <Menu size={24} />
            </button>
            <h1>{getPageTitle()}</h1>
          </div>
          
          <div className="header-right">
            <button className="header-action-btn"><Bell size={20} /></button>
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{user?.name}</span>
                <span className="user-role">Poll Creator</span>
              </div>
              <div className="user-avatar">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setIsMobileOpen(false)}>
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <Sidebar isCollapsed={false} setIsCollapsed={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
