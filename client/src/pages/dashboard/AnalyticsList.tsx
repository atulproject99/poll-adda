import React, { useEffect, useState } from 'react';
import { 
  Search, 
  ArrowRight,
  MessageSquare,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';
import '../dashboard/MyPolls.css'; // Reuse MyPolls CSS
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const AnalyticsList: React.FC = () => {
  const [polls, setPolls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log('Real-time analytics list update!');
      fetchPolls();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <div className="loading-state">Loading poll analytics...</div>;

  return (
    <div className="my-polls-container">
      <div className="page-header" data-reveal>
        <div>
          <h2>Poll Analytics</h2>
          <p>Select a poll to view detailed participation and result data.</p>
        </div>
      </div>

      <div className="polls-filters glass-card">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search polls by title..." />
        </div>
      </div>

      <div className="polls-grid">
        {polls.length > 0 ? polls.map((poll) => (
          <div key={poll._id} className="glass-card poll-card">
            <div className="poll-card-header">
              <span className={`status-tag ${poll.isPublished ? 'published' : 'draft'}`}>
                {poll.isPublished ? 'Published' : 'Draft'}
              </span>
              <span className="meta-item">
                <MessageSquare size={14} />
                {poll.questions?.length || 0} Questions
              </span>
            </div>

            <h3 className="poll-title">{poll.title}</h3>
            
            <div className="poll-meta">
              <div className="meta-item">
                <Users size={14} />
                <span>{poll.responsesCount || 0} Responses</span>
              </div>
              <div className="meta-item">
                <Clock size={14} />
                <span>{poll.expiresAt ? new Date(poll.expiresAt).toLocaleDateString() : 'No expiry'}</span>
              </div>
            </div>

            <div className="poll-card-footer">
              <Link to={`/dashboard/analytics/${poll._id}`} className="primary-button full-width">
                View Full Analytics <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
            </div>
          </div>
        )) : (
          <div className="empty-state glass-card">
            <AlertCircle size={48} />
            <h3>No Polls Found</h3>
            <p>Create your first poll to start seeing analytics!</p>
            <Link to="/dashboard/create" className="primary-button">Create Poll</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsList;
