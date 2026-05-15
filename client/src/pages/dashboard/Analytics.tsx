import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from 'recharts';
import { Users, BarChart3, PieChart as PieIcon, RefreshCcw, Loader2, Globe, Lock } from 'lucide-react';
import { toast } from 'sonner';
import './Analytics.css';
import api from '../../api/axios';
import { io } from 'socket.io-client';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#06b6d4'];

const Analytics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get(`/analytics/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch analytics', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = async () => {
    setIsUpdating(true);
    try {
      const response = await api.patch(`/poll/${id}/toggle-results`);
      toast.success(response.data.message);
      // Re-fetch to get updated poll info (like resultsPublished)
      // Actually we need the poll data too, but fetchAnalytics only returns stats.
      // Let's modify the service to return poll metadata or just update local state.
      setData((prev: any) => ({ ...prev, resultsPublished: !prev.resultsPublished }));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update visibility');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    // Socket.io for live updates
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');
    
    socket.on('response-update', (payload: any) => {
      if (payload.pollId === id) {
        console.log('Real-time update received!');
        fetchAnalytics();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  if (isLoading) return <div className="loading-screen"><Loader2 className="spinner" /> Loading Analytics...</div>;

  return (
    <div className="analytics-container">
      <div className="page-header">
        <div>
          <h2>{data?.pollTitle} Analytics</h2>
          <p>Real-time insights and participation data.</p>
        </div>
        <div className="header-actions">
          <button 
            className={`secondary-button ${data?.resultsPublished ? 'published' : ''}`} 
            onClick={handleToggleVisibility}
            disabled={isUpdating}
          >
            {isUpdating ? <Loader2 className="spinner" size={16} /> : (
              data?.resultsPublished ? <Globe size={18} /> : <Lock size={18} />
            )}
            {data?.resultsPublished ? 'Results Published' : 'Publish Results'}
          </button>
          <button className="secondary-button" onClick={fetchAnalytics}>
            <RefreshCcw size={18} /> Refresh
          </button>
        </div>
      </div>

      <div className="analytics-summary">
        <div className="glass-card summary-card">
          <div className="summary-icon"><Users size={24} /></div>
          <div className="summary-info">
            <span className="label">Total Responses</span>
            <h3 className="value">{data?.totalResponses}</h3>
          </div>
        </div>
        {/* Add more summary cards if needed */}
      </div>

      <div className="charts-grid">
        {data?.analytics.map((q: any, idx: number) => (
          <div key={idx} className="glass-card chart-card">
            <div className="chart-header">
              <h3>{q.question}</h3>
              <div className="chart-actions">
                <BarChart3 size={18} className="active" />
                <PieIcon size={18} />
              </div>
            </div>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={q.options}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="option" 
                    stroke="var(--text-muted)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="var(--text-muted)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 15, 15, 0.8)', 
                      backdropFilter: 'blur(10px)',
                      borderColor: 'var(--glass-border)',
                      borderRadius: '12px',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                    }}
                    itemStyle={{ color: 'var(--primary-color)' }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)', radius: 4 }}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[6, 6, 0, 0]}
                    activeBar={{ 
                      fill: 'var(--primary-color)', 
                      stroke: 'white', 
                      strokeWidth: 2,
                      filter: 'drop-shadow(0 0 8px var(--primary-glow))'
                    }}
                  >
                    {q.options.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="options-stats">
              {q.options.map((opt: any, optIdx: number) => (
                <div key={optIdx} className="opt-stat-item">
                  <div className="opt-info">
                    <span className="opt-name">{opt.option}</span>
                    <span className="opt-count">{opt.count} votes</span>
                  </div>
                  <div className="progress-bg">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${opt.percentage}%`, 
                        backgroundColor: COLORS[optIdx % COLORS.length] 
                      }}
                    ></div>
                  </div>
                  <span className="opt-percentage">{opt.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
