import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Eye,
  Share2,
  Loader2
} from 'lucide-react';
import './DashboardHome.css';
import api from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { io } from 'socket.io-client';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentPolls, setRecentPolls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, pollsRes] = await Promise.all([
          api.get('/poll/stats'),
          api.get('/poll/user/all')
        ]);
        setStats(statsRes.data.data);
        setRecentPolls(pollsRes.data.data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // Socket.io for live updates
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');
    
    socket.on('response-update', () => {
      console.log('Real-time dashboard update!');
      fetchData();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const statsConfig = [
    { title: 'Total Polls', value: stats?.totalPolls || 0, icon: BarChart3, color: '#8b5cf6' },
    { title: 'Active Polls', value: stats?.activePolls || 0, icon: Clock, color: '#3b82f6' },
    { title: 'Total Responses', value: stats?.totalResponses || 0, icon: Users, color: '#10b981' },
    { title: 'Published Results', value: stats?.publishedPolls || 0, icon: CheckCircle2, color: '#ec4899' },
  ];

  if (isLoading) return <div className="loading-screen"><Loader2 className="spinner" /> Loading Dashboard...</div>;

  return (
    <div className="dashboard-home">
      <div className="stats-grid">
        {statsConfig.map((stat, i) => (
          <div key={i} className="glass-card stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-title">{stat.title}</span>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="recent-polls-section glass-card">
          <div className="section-header">
            <h3>Recent Polls</h3>
            <button className="primary-button small" onClick={() => navigate('/dashboard/create')}>
              <Plus size={18} /> Create New
            </button>
          </div>

          <div className="polls-table-wrapper">
            <table className="polls-table">
              <thead>
                <tr>
                  <th>Poll Title</th>
                  <th>Status</th>
                  <th>Responses</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPolls.length > 0 ? recentPolls.map(poll => (
                  <tr key={poll._id}>
                    <td>
                      <div className="poll-title-cell">
                        <span className="title">{poll.title}</span>
                        <span className="expiry">{poll.expiresAt ? new Date(poll.expiresAt).toLocaleDateString() : 'No expiry'}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${poll.isPublished ? 'published' : 'draft'}`}>
                        {poll.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>{poll.responsesCount || 0}</td>
                    <td>{new Date(poll.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-btns">
                        <Link to={`/poll/${poll._id}`} className="icon-btn" title="View"><Eye size={18} /></Link>
                        <button 
                          className="icon-btn" 
                          title="Share"
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/poll/${poll._id}`);
                            toast.success('Link copied to clipboard');
                          }}
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No polls created yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="quick-actions glass-card">
          <h3>Quick Actions</h3>
          <div className="actions-list">
            <button className="action-item" onClick={() => navigate('/dashboard/create')}>
              <div className="action-icon"><Plus size={20} /></div>
              <span>Create New Poll</span>
            </button>
            <button className="action-item" onClick={() => navigate('/dashboard/polls')}>
              <div className="action-icon"><BarChart3 size={20} /></div>
              <span>Manage My Polls</span>
            </button>
            <button className="action-item" onClick={() => navigate('/dashboard/settings')}>
              <div className="action-icon"><Users size={20} /></div>
              <span>Profile Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
