import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListTodo, 
  BarChart3, 
  CheckCircle2, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import './Sidebar.css';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { logout } = useAuth();
  const { confirm } = useModal();

  const handleLogout = () => {
    confirm({
      title: 'Logout Confirmation',
      message: 'Are you sure you want to logout from your account?',
      confirmText: 'Logout',
      type: 'danger',
      onConfirm: () => logout(),
    });
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Poll', path: '/dashboard/create', icon: PlusCircle },
    { name: 'My Polls', path: '/dashboard/polls', icon: ListTodo },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Published', path: '/dashboard/published', icon: CheckCircle2 },
    // { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar glass-card ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <div className="logo">Poll<span>Adda</span></div>}
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={isCollapsed ? item.name : ''}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-item" onClick={handleLogout} title={isCollapsed ? 'Logout' : ''}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
