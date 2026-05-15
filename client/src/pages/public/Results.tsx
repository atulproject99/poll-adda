import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { CheckCircle2, Users, AlertCircle, Share2, Loader2 } from 'lucide-react';
import './Results.css';
import api from '../../api/axios';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#06b6d4'];

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get(`/analytics/${id}`);
        setData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load results');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  if (isLoading) return <div className="loading-screen"><Loader2 className="spinner" /> Loading Results...</div>;

  if (error) return (
    <div className="error-screen container">
      <div className="glass-card error-card">
        <AlertCircle size={48} color="#ef4444" />
        <h2>Results Not Available</h2>
        <p>The results for this poll haven't been published yet or the poll doesn't exist.</p>
        <button className="primary-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="results-page container">
      <div className="results-container glass-card">
        <header className="results-header">
          <div className="results-header-content">
            <span className="results-tag"><CheckCircle2 size={14} /> Official Results</span>
            <h1>{data?.pollTitle}</h1>
            <p className="summary">Total participation: <strong>{data?.totalResponses}</strong> votes</p>
          </div>
          <button className="icon-btn" title="Share Results">
            <Share2 size={20} />
          </button>
        </header>

        <div className="results-list">
          {data?.analytics.map((q: any, qIdx: number) => (
            <div key={qIdx} className="result-item" data-reveal>
              <h3>{q.question}</h3>
              
              <div className="result-chart-wrapper">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={q.options} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="option" 
                      stroke="var(--text-muted)" 
                      fontSize={12} 
                      width={100}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ backgroundColor: 'var(--surface-color)', border: 'none', borderRadius: '8px' }}
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {q.options.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="result-stats">
                {q.options.sort((a:any, b:any) => b.count - a.count).map((opt: any, optIdx: number) => (
                  <div key={optIdx} className="result-opt-item">
                    <div className="opt-bar-row">
                      <span className="opt-label">{opt.option}</span>
                      <span className="opt-val">{opt.percentage}%</span>
                    </div>
                    <div className="opt-progress">
                      <div 
                        className="opt-progress-fill" 
                        style={{ width: `${opt.percentage}%`, backgroundColor: COLORS[optIdx % COLORS.length] }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <footer className="results-footer">
          <p>This poll was conducted on PollAdda.</p>
          <button className="secondary-button" onClick={() => navigate('/')}>Create Your Own Poll</button>
        </footer>
      </div>
    </div>
  );
};

export default Results;
