import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerificationService } from '../services/verificationService';
import axios from 'axios';

export function useEmailVerification() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [isVerified, setIsVerified] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const navigate = useNavigate();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft]);

  const requestVerification = async (email: string) => {
    setIsSending(true);
    setError('');
    setMessage('');
    
    try {
      const response = await VerificationService.requestVerification(email);
      setVerificationToken(response.token);
      setTimeLeft(response.expiresIn);
      setRemainingAttempts(5); // Reset attempts
      setMessage('Verification code sent to your email');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 429) {
          setIsLockedOut(true);
          setError('You’ve made too many attempts. Please try again later.');
          return;
        }

        if (err.response?.status === 400) {
          setError(err.response.data?.message || 'Invalid verification code');
          return;
        }

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async (code: string) => {
    if (isVerifying || isVerified) return;

    if (!verificationToken) {
      setError('No verification token available');
      return;
    }

    setIsVerifying(true);
    setError('');
    setMessage('');
    
    try {
      const response = await VerificationService.verifyCode(verificationToken, code);
      
      if (response.success) {
        setIsVerified(true);
        setMessage('Email verified successfully!');
        
        // Redirect to dashboard after successful verification
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 3000);
      } else {
        setError(response.message);

        if (response.token) {
          setVerificationToken(response.token);
        }

        if (response.remainingAttempts !== undefined) {
          setRemainingAttempts(response.remainingAttempts);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const clearMessages = () => {
    setError('');
    setMessage('');
  };

  return {
    requestVerification,
    verifyCode,
    formatTime,
    clearMessages,
    error,
    message,
    timeLeft,
    remainingAttempts,
    isVerified,
    hasToken: !!verificationToken,
    isLockedOut,
    isVerifying,
    isSending,
  };
}