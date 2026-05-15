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
      const { accessToken, user, verifyToken } = response.data.data;

      if (verifyToken) {
        setError('Please verify your email. A code has been sent.');
        // In a real app, we'd navigate to a verification screen here
        return;
      }

      authLogin(accessToken, user);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
      </div>
    </div>
  );
};

export default AuthModal;
