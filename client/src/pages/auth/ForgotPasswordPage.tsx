import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, BookOpen, ArrowLeft, RefreshCw, CheckCircle, Lock } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // await forgotPasswordAPI(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsEmailSent(true);
    } catch {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-primary-light/20 flex">
      {/* Left Side - Forgot Password Form */}
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
            {!isEmailSent ? (
              <>
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-custom-black mb-2 font-manrope">
                    Forgot Password?
                  </h2>
                  <p className="text-gray-600 font-sora">
                    No worries! Enter your email and we'll send you reset instructions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-custom-black font-sora mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-sora"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 font-sora">{error}</p>
                  </div>
                )}

                {/* Back to Login */}
                <div className="mt-6 text-center pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToLogin}
                    className="text-gray-600"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Success State */}
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-custom-black mb-4 font-manrope">
                    Check Your Email
                  </h2>
                  <p className="text-gray-600 font-sora mb-2">
                    We've sent password reset instructions to:
                  </p>
                  <p className="text-custom-black font-semibold font-sora mb-6">
                    {email}
                  </p>
                  <p className="text-sm text-gray-500 font-sora mb-8">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={handleResendEmail}
                      className="w-full"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Send Another Email
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBackToLogin}
                      className="w-full text-gray-600"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Right Side - Branding */}
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
            Secure Password Reset
          </h1>
          <p className="text-xl text-gray-200 font-sora">
            Your account security is our top priority. We'll help you get back in safely.
          </p>
        </div>
        
        {/* Security Features */}
        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Secure Process</h3>
                <p className="text-sm text-gray-200">Encrypted reset links with time limits</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Email Verification</h3>
                <p className="text-sm text-gray-200">Reset links sent only to verified emails</p>
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