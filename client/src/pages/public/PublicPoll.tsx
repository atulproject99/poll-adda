import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import './PublicPoll.css';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import AuthModal from '../../components/auth/AuthModal';
import { toast } from 'sonner';

const PublicPoll: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { alert: modalAlert } = useModal();
  
  const [poll, setPoll] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await api.get(`/poll/${id}`);
        const pollData = response.data.data;
        setPoll(pollData);

        if (pollData.resultsPublished) {
          const analyticsRes = await api.get(`/analytics/${id}`);
          setAnalytics(analyticsRes.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load poll');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, selectedOption: value } : a);
      }
      return [...prev, { questionId, selectedOption: value }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (poll.responseMode === 'authenticated' && !isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    const requiredQuestions = poll.questions.filter((q: any) => q.required);
    const unansweredRequired = requiredQuestions.filter((q: any) => 
      !answers.find(a => a.questionId === q.question)
    );

    if (unansweredRequired.length > 0) {
      modalAlert({
        title: 'Required Questions',
        message: `Please answer all required questions: ${unansweredRequired.map((q: any) => q.question).join(', ')}`,
        confirmText: 'Okay',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`/responses/${id}`, { answers });
      setIsSubmitted(true);
      toast.success('Response submitted successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit response');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="loading-screen"><Loader2 className="spinner" /> Loading Poll...</div>;

  if (error) return (
    <div className="error-screen container">
      <div className="glass-card error-card">
        <AlertCircle size={48} color="#ef4444" />
        <h2>Oops! {error}</h2>
        <p>The poll you are looking for might have been deleted or is not available.</p>
        <button className="primary-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );

  if (isSubmitted) return (
    <div className="success-screen container">
      <div className="glass-card success-card">
        <CheckCircle2 size={48} color="var(--accent-color)" />
        <h2>Thank You!</h2>
        <p>Your response has been successfully recorded.</p>
        <div className="success-actions">
          <button className="primary-button" onClick={() => navigate('/')}>Explore More Polls</button>
        </div>
      </div>
    </div>
  );

  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date();
  const needsAuth = poll.responseMode === 'authenticated' && !isAuthenticated;

  return (
    <div className="public-poll-page container">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <div className="poll-container glass-card">
        <header className="poll-header">
          <div className="poll-header-content">
            <h1>{poll.title}</h1>
            {poll.description && <p className="description">{poll.description}</p>}
          </div>
          <div className="poll-badges">
            {isExpired ? (
              <span className="badge expired"><AlertCircle size={14} /> Expired</span>
            ) : (
              <span className="badge active"><Clock size={14} /> Live</span>
            )}
            {poll.responseMode === 'authenticated' && (
              <span className="badge auth"><Lock size={14} /> Authenticated Only</span>
            )}
          </div>
        </header>

        {poll.resultsPublished && (
          <div className="results-published-banner">
            <CheckCircle2 size={18} />
            <span>This poll is completed. Viewing final results below.</span>
          </div>
        )}

        {needsAuth ? (
          <div className="auth-required">
            <Lock size={48} />
            <h3>Login Required</h3>
            <p>This poll requires you to be logged in to participate.</p>
            <button className="primary-button" onClick={() => setIsAuthModalOpen(true)}>
              Login to Participate
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="poll-form">
            <div className="questions-list">
              {poll.questions.map((q: any, qIdx: number) => (
                <div key={qIdx} className="question-item">
                  <h3>
                    {q.question} {q.required && <span className="required-star">*</span>}
                  </h3>
                  <div className="options-grid">
                    {q.options.map((opt: any, optIdx: number) => {
                      const qAnalytic = analytics?.analytics.find((a: any) => a.question === q.question);
                      const optAnalytic = qAnalytic?.options.find((o: any) => o.option === opt.value);
                      const percentage = optAnalytic?.percentage || 0;
                      const count = optAnalytic?.count || 0;

                      return (
                        <div key={optIdx} className={`option-wrapper ${poll.resultsPublished ? 'results-view' : ''}`}>
                          <label className="option-label">
                            {!poll.resultsPublished && (
                              <input 
                                type="radio" 
                                name={`q-${qIdx}`}
                                value={opt.value}
                                onChange={() => handleOptionChange(q.question, opt.value)}
                                required={q.required}
                                disabled={isExpired}
                              />
                            )}
                            <span className="option-text">{opt.value}</span>
                            {!poll.resultsPublished && <span className="custom-radio"></span>}
                            {poll.resultsPublished && (
                              <span className="result-percentage">{percentage}%</span>
                            )}
                          </label>
                          {poll.resultsPublished && (
                            <div className="option-result-bar">
                              <div 
                                className="bar-fill" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                              <span className="vote-count">{count} votes</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!poll.resultsPublished && (
              <div className="form-footer">
                <button 
                  type="submit" 
                  className="primary-button submit-btn" 
                  disabled={isSubmitting || isExpired}
                >
                  {isSubmitting ? <Loader2 className="spinner" size={20} /> : (isExpired ? 'Poll Expired' : 'Submit Response')}
                </button>
                {isExpired && <p className="expiry-note">This poll is no longer accepting responses.</p>}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default PublicPoll;
