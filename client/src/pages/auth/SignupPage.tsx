import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, BookOpen, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { useAuthActions } from '../../hooks/useAuthActions';

export function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const {
    handleRegister,
    handleGoogleLogin,
    isLoading,
    error,
    message,
  } = useAuthActions();

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    return errors;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) errors.terms = 'You must agree to the terms and conditions';
    
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      errors.password = `Password must have: ${passwordErrors.join(', ')}`;
    }
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      handleRegister(email, password);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', valid: password.length >= 8 },
    { text: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { text: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { text: 'One number', valid: /\d/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-primary-light/20 flex">
      {/* Left Side - Signup Form */}
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
              <h2 className="text-2xl font-bold text-custom-black mb-2 font-manrope">
                Create Account
              </h2>
              <p className="text-gray-600 font-sora">
                Join thousands of students learning smarter
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
                icon={<Mail className="h-4 w-4" />}
                error={validationErrors.email}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                  placeholder="Create a strong password"
                  icon={<Lock className="h-4 w-4" />}
                  error={validationErrors.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {password && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2 font-sora">
                    Password requirements:
                  </p>
                  <ul className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <li key={index} className="flex items-center text-sm font-sora">
                        <CheckCircle 
                          className={`h-4 w-4 mr-2 ${req.valid ? 'text-green-500' : 'text-gray-300'}`} 
                        />
                        <span className={req.valid ? 'text-green-700' : 'text-gray-500'}>
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="relative">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm your password"
                  icon={<Lock className="h-4 w-4" />}
                  error={validationErrors.confirmPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="space-y-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-600 font-sora">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {validationErrors.terms && (
                  <p className="text-sm text-red-500 font-sora">{validationErrors.terms}</p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-sora">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 font-sora">{message}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
                showArrow={!isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-sora">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-sora">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={goToLogin}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
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
            Start Learning Today
          </h1>
          <p className="text-xl text-gray-200 font-sora">
            Transform any content into personalized study materials with AI.
          </p>
        </div>

        {/* Features Section */}
        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Multiple Formats</h3>
                <p className="text-sm text-gray-200">PDFs, Videos, Images & More</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-manrope">Instant Results</h3>
                <p className="text-sm text-gray-200">Get notes & flashcards in seconds</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-300 font-sora">
              Trusted by 2,000+ students worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}