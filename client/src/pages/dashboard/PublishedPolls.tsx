import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  BarChart3, 
  Share2, 
  Clock, 
  CheckCircle2, 
} from 'lucide-react';
import '../dashboard/MyPolls.css'; // Reuse MyPolls CSS
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { io } from 'socket.io-client';

const PublishedPolls: React.FC = () => {
  const [polls, setPolls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await api.get('/poll/user/all');
        // Filter for published only
        const publishedOnly = response.data.data.filter((p: any) => p.isPublished);
        setPolls(publishedOnly);
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
      console.log('Real-time published polls update!');
      fetchPolls();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <div className="loading-state">Loading published polls...</div>;

  return (
    <div className="my-polls-container">
      <div className="page-header">
        <div>
          <h2>Published Polls</h2>
          <p>View and manage your publicly available polls.</p>
        </div>
        <Link to="/dashboard/create" className="primary-button">
          <Plus size={18} /> Create New Poll
        </Link>
      </div>

      <div className="polls-filters glass-card">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search published polls..." />
        </div>
      </div>

      <div className="polls-grid">
        {polls.length > 0 ? polls.map((poll) => (
          <div key={poll._id} className="glass-card poll-card">
            <div className="poll-card-header">
              <span className="status-tag published">Published</span>
              <div className="poll-actions-dropdown">
                <button className="icon-btn small"><MoreVertical size={16} /></button>
                <div className="dropdown-menu">
                  <Link to={`/poll/${poll._id}`}><Eye size={14} /> View Poll</Link>
                  <Link to={`/dashboard/analytics/${poll._id}`}><BarChart3 size={14} /> Analytics</Link>
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
            <CheckCircle2 size={48} />
            <h3>No Published Polls</h3>
            <p>You haven't published any polls yet.</p>
            <Link to="/dashboard/polls" className="primary-button">Go to My Polls</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishedPolls;
