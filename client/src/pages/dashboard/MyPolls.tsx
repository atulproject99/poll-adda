import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  BarChart3, 
  Trash2, 
  Share2, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import './MyPolls.css';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { io } from 'socket.io-client';
import { useModal } from '../../context/ModalContext';

const MyPolls: React.FC = () => {
  const [polls, setPolls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const { confirm } = useModal();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await api.get('/poll/user/all');
        setPolls(response.data.data);
      } catch (error) {
        console.error('Failed to fetch polls', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolls();

    // Socket.io for live updates
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');
    
    socket.on('response-update', () => {
      console.log('Real-time polls update!');
      fetchPolls();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = async (id: string) => {
    confirm({
      title: 'Delete Poll',
      message: 'Are you sure you want to delete this poll? This action cannot be undone.',
      confirmText: 'Delete',
      type: 'danger',
      onConfirm: async () => {
        try {
          await api.delete(`/poll/${id}`);
          setPolls(polls.filter(p => p._id !== id));
          toast.success('Poll deleted successfully');
        } catch (error) {
          console.error('Failed to delete poll', error);
          toast.error('Failed to delete poll');
        }
      }
    });
  };

  const handlePublish = async (id: string) => {
    try {
      await api.patch(`/poll/${id}/publish`);
      setPolls(polls.map(p => p._id === id ? { ...p, isPublished: true } : p));
    } catch (error) {
      console.error('Failed to publish poll', error);
    }
  };

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || 
      (statusFilter === 'Published' && poll.isPublished) || 
      (statusFilter === 'Draft' && !poll.isPublished);
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <div className="loading-state">Loading your polls...</div>;

  return (
    <div className="my-polls-container">
      <div className="page-header">
        <div>
          <h2>My Polls</h2>
          <p>Manage and track your active and past polls.</p>
        </div>
        <Link to="/dashboard/create" className="primary-button">
          <Plus size={18} /> Create New Poll
        </Link>
      </div>

      <div className="polls-filters glass-card">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search polls by title..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <select 
            className="secondary-button small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      <div className="polls-grid">
        {filteredPolls.length > 0 ? filteredPolls.map((poll) => (
          <div key={poll._id} className="glass-card poll-card">
            <div className="poll-card-header">
              <span className={`status-tag ${poll.isPublished ? 'published' : 'draft'}`}>
                {poll.isPublished ? 'Published' : 'Draft'}
              </span>
              <div className="poll-actions-dropdown">
                <button className="icon-btn small"><MoreVertical size={16} /></button>
                <div className="dropdown-menu">
                  <Link to={`/poll/${poll._id}`}><Eye size={14} /> View Poll</Link>
                  <Link to={`/dashboard/analytics/${poll._id}`}><BarChart3 size={14} /> Analytics</Link>
                  {!poll.isPublished && (
                    <button onClick={() => handlePublish(poll._id)}><CheckCircle2 size={14} /> Publish</button>
                  )}
                  <button onClick={() => handleDelete(poll._id)} className="delete-text"><Trash2 size={14} /> Delete</button>
                </div>
              </div>
            </div>

            <h3 className="poll-title">{poll.title}</h3>
            <p className="poll-desc">{poll.description || 'No description provided.'}</p>

            <div className="poll-meta">
              <div className="meta-item">
                <BarChart3 size={14} />
                <span>{poll.responsesCount || 0} Responses</span>
              </div>
              <div className="meta-item">
                <Clock size={14} />
                <span>{poll.expiresAt ? new Date(poll.expiresAt).toLocaleDateString() : 'No expiry'}</span>
              </div>
            </div>

            <div className="poll-card-footer">
              <Link to={`/dashboard/analytics/${poll._id}`} className="secondary-button small full-width">
                View Results
              </Link>
              <button 
                className="icon-btn small" 
                title="Share Link"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/poll/${poll._id}`);
                  toast.success('Link copied to clipboard');
                }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        )) : (
          <div className="empty-state glass-card">
            <AlertCircle size={48} />
            <h3>No Polls Found</h3>
            <p>You haven't created any polls yet. Start by creating your first one!</p>
            <Link to="/dashboard/create" className="primary-button">Create Poll</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPolls;
