import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, BookOpen, ArrowLeft, Clock, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CodeInput } from '../../components/common/CodeInput';
import { useEmailVerification } from '../../hooks/useEmailVerification';

export function VerifyEmailPage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const [hasRequested, setHasRequested] = useState(false);
  const location = useLocation();
  
  const {
    requestVerification,
    verifyCode,
    formatTime,
    clearMessages,
    isVerifying,
    isSending,
    error,
    message,
    timeLeft,
    remainingAttempts,
    isVerified,
    isLockedOut,
  } = useEmailVerification();

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    } else {
      navigate("/signup", { replace: true });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (email && !hasRequested) {
      requestVerification(email);
      setHasRequested(true);
    }
  }, [email, hasRequested, requestVerification]);

  const handleCodeComplete = (enteredCode: string) => {
    setCode(enteredCode);
    clearMessages();
  };

  const handleResendCode = () => {
    if (email) {
      setCode('');
      clearMessages();
      requestVerification(email);
    }
  };

  const goBackToSignup = () => {
    navigate('/signup', { replace: true });
  };

  const canResend = timeLeft === 0 && !isSending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-primary-light/20 flex">
      {/* Left Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-custom-black font-manrope">
                TuonTaBai
              </span>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-custom-black mb-2 font-manrope">
                Verify Your Email
              </h2>
              <p className="text-gray-600 font-sora">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-custom-black font-semibold font-sora mt-1">
                {email}
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-6">
                <CodeInput
                  length={6}
                  onComplete={handleCodeComplete}
                  disabled={isVerifying || isVerified}
                  error={error}
                />

                <Button
                  variant="primary"
                  onClick={() => verifyCode(code)}
                  disabled={code.length !== 6 || isVerifying || isVerified || isLockedOut}
                  className="w-full"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
              </div>

              {/* Timer and Attempts */}
              <div className="flex justify-center space-x-6 text-sm text-gray-600">
                {timeLeft > 0 && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span className="font-sora">
                      Expires in {formatTime(timeLeft)}
                    </span>
                  </div>
                )}
                {remainingAttempts < 5 && (
                  <div className="flex items-center space-x-1">
                    <span className="font-sora">
                      {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} left
                    </span>
                  </div>
                )}
              </div>

              {/* Success Message */}
              {isVerified && (
                <div className="text-center">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-green-600 font-semibold font-sora">
                    Email verified successfully!
                  </p>
                  <p className="text-gray-600 text-sm font-sora mt-1">
                    Redirecting to dashboard...
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && !isVerified && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-sora">{error}</p>
                </div>
              )}

              {/* Success Message for code sent */}
              {message && !isVerified && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 font-sora">{message}</p>
                </div>
              )}

              {/* Resend Code Button */}
              <div className="text-center">
                <p className="text-sm text-gray-600 font-sora mb-3">
                  Didn't receive the code?
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendCode}
                  disabled={!canResend || isVerified}
                  className="min-w-[120px]"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend Code
                    </>
                  )}
                </Button>
              </div>

              {/* Back to Signup */}
              <div className="text-center pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goBackToSignup}
                  className="text-gray-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Signup
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Side - Branding (Same as Signup) */}
      <div className="hidden lg:flex lg:w-1/2 bg-custom-black text-white p-12 flex-col relative overflow-hidden
        justify-between xl:justify-center xl:space-y-20">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full"></div>
        
        {/* Branding Heading Section */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <BookOpen className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold font-manrope">TuonTaBai</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 font-manrope">
            Almost There!
          </h1>
          <p className="text-xl text-gray-200 font-sora">
            Just one more step to secure your account and get started.
          </p>
        </div>
        
        {/* Security Features */}
        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Secure Verification</h3>
                <p className="text-sm text-gray-200">Your account security is our priority</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Quick & Easy</h3>
                <p className="text-sm text-gray-200">Verification takes less than a minute</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-300 font-sora">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}