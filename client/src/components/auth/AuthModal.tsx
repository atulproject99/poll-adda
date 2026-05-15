import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './AuthModal.css';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthFormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<'auth' | 'verify'>('auth');
  const [verifyData, setVerifyData] = useState<{ email: string; verifyToken: string } | null>(null);
  const [verifyCode, setVerifyCode] = useState('1111');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema)
  });

  if (!isOpen) return null;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const requestData = { ...data };
      if (!isLogin) delete requestData.confirmPassword;

      const response = await api.post(endpoint, requestData);
      const { accessToken, user, verifyToken, email } = response.data.data;

      if (verifyToken) {
        setVerifyData({ email: email || data.email, verifyToken });
        setStep('verify');
        return;
      }

      authLogin(accessToken, user);
      onClose();
      resetState();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyData) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/verify-email', {
        email: verifyData.email,
        verifyToken: verifyData.verifyToken,
        code: verifyCode
      });

      const { accessToken, user } = response.data.data;
      authLogin(accessToken, user);
      onClose();
      resetState();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsLogin(true);
    setStep('auth');
    setVerifyData(null);
    setVerifyCode('1111');
    setError(null);
    reset();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    reset();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal glass-card">
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {step === 'auth' ? (
          <>
            <div className="auth-tabs">
              <button
                className={`tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{isLogin ? 'Enter your details to login' : 'Fill in the form to get started'}</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              {!isLogin && (
                <div className="input-group">
                  <label><UserIcon size={16} /> Full Name</label>
                  <input
                    {...register('name')}
                    placeholder="John Doe"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name.message as string}</span>}
                </div>
              )}

              <div className="input-group">
                <label><Mail size={16} /> Email Address</label>
                <input
                  {...register('email')}
                  placeholder="john@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email.message as string}</span>}
              </div>

              <div className="input-group">
                <label><Lock size={16} /> Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="••••••••"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="field-error">{errors.password.message as string}</span>}
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label><Lock size={16} /> Confirm Password</label>
                  <input
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="field-error">{errors.confirmPassword.message as string}</span>}
                </div>
              )}

              <button type="submit" className="primary-button submit-btn" disabled={isLoading}>
                {isLoading ? <Loader2 className="spinner" size={20} /> : (isLogin ? 'Login' : 'Register')}
              </button>
            </form>

            <p className="auth-footer">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button type="button" onClick={toggleMode}>
                {isLogin ? 'Register now' : 'Login here'}
              </button>
            </p>
          </>
        ) : (
          <div className="verify-step">
            <div className="auth-header">
              <h2>Verify Email</h2>
              <p>Enter the 4-digit code sent to <strong>{verifyData?.email}</strong></p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={onVerify} className="auth-form">
              <div className="input-group">
                <label>Verification Code</label>
                <div className="otp-container">
                  <input
                    type="text"
                    maxLength={4}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="0000"
                    style={{ textAlign: 'center', letterSpacing: '1rem', fontSize: '1.5rem' }}
                  />
                </div>
              </div>

              <button type="submit" className="primary-button submit-btn" disabled={isLoading}>
                {isLoading ? <Loader2 className="spinner" size={20} /> : 'Verify & Continue'}
              </button>

              <button type="button" className="secondary-button" style={{ marginTop: '1rem', width: '100%' }} onClick={() => setStep('auth')}>
                Back to Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
