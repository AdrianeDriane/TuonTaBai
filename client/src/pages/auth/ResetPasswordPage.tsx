import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lock, BookOpen, Eye, EyeOff, RefreshCw, CheckCircle, Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token1, setToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(true);
  const navigate = useNavigate();
  const { tokenFromParams } = useParams();

  // To avoid @typescript-eslint/no-unused-vars
  //TODO: remove later
  console.log(token1);
  useEffect(() => {
    if (!tokenFromParams) {
      setIsValidToken(false);
      setError('Invalid or missing reset token. Please request a new password reset.');
    } else {
      setToken(tokenFromParams);
      // TODO: Validate token with backend
      // validateResetToken(resetToken);
    }
  }, [tokenFromParams]);

  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!passwordValidation.isValid) {
      setError('Please ensure your password meets all requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // await resetPasswordAPI(token, password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      
      // Redirect to login after success
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successfully! Please log in with your new password.' }
        });
      }, 3000);
      
    } catch {
      setError('Failed to reset password. Please try again or request a new reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-primary-light/20 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-lg">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-custom-black mb-4 font-manrope">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 font-sora mb-8">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/forgot-password')}
              className="w-full"
            >
              Request New Reset Link
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-primary-light/20 flex">
      {/* Left Side - Branding */}
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
            Secure Your Account
          </h1>
          <p className="text-xl text-gray-200 font-sora">
            Create a strong password to protect your learning journey with us.
          </p>
        </div>
        
        {/* Security Features */}
        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Password Security</h3>
                <p className="text-sm text-gray-200">Strong encryption protects your data</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Account Protection</h3>
                <p className="text-sm text-gray-200">Advanced security measures in place</p>
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
      {/* Right Side - Reset Password Form */}
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
            {!isSuccess ? (
              <>
                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-custom-black mb-2 font-manrope">
                    Reset Your Password
                  </h2>
                  <p className="text-gray-600 font-sora">
                    Create a new secure password for your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* New Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-custom-black font-sora mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-sora"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  {password && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700 font-sora mb-3">Password Requirements:</p>
                      <div className="space-y-1">
                        <div className={`flex items-center text-xs font-sora ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`} />
                          At least 8 characters
                        </div>
                        <div className={`flex items-center text-xs font-sora ${passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-400'}`} />
                          One uppercase letter
                        </div>
                        <div className={`flex items-center text-xs font-sora ${passwordValidation.hasLower ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasLower ? 'text-green-600' : 'text-gray-400'}`} />
                          One lowercase letter
                        </div>
                        <div className={`flex items-center text-xs font-sora ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}`} />
                          One number
                        </div>
                        <div className={`flex items-center text-xs font-sora ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                          <CheckCircle className={`h-3 w-3 mr-2 ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-gray-400'}`} />
                          One special character
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-custom-black font-sora mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors font-sora"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-1 text-xs text-red-600 font-sora">Passwords do not match</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading || !passwordValidation.isValid || password !== confirmPassword}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
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
                    Password Reset Successfully!
                  </h2>
                  <p className="text-gray-600 font-sora mb-2">
                    Your password has been updated successfully.
                  </p>
                  <p className="text-sm text-gray-500 font-sora mb-8">
                    Redirecting to login page...
                  </p>
                  
                  <Button
                    variant="primary"
                    onClick={handleBackToLogin}
                    className="w-full"
                  >
                    Continue to Login
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}