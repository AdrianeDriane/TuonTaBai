import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Lock, BookOpen, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  
  const {
    handleLogin,
    handleGoogleLogin,
    isLoading,
    error,
    message,
  } = useAuthActions();

  // Handle Google OAuth callback
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const error = query.get('error');

    if (token) {
      setToken(token);
      navigate('/dashboard', { replace: true });
    } else if (error) {
      // Handle error from OAuth
    }
  }, [location, navigate, setToken]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-white to-primary-light/20 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-custom-black text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <BookOpen className="h-10 w-10 text-white" />
            <span className="text-3xl font-bold font-manrope">TuonTaBai</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 font-manrope">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-200 font-sora">
            Continue your learning journey with AI-powered study materials.
          </p>
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Active Users</span>
            </div>
            <div className="flex -space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                />
              ))}
            </div>
            <p className="text-sm text-gray-200">
              Join 2,000+ students transforming their study experience
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
                Sign In
              </h2>
              <p className="text-gray-600 font-sora">
                Access your study materials and continue learning
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
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter your password"
                  icon={<Lock className="h-4 w-4" />}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600 font-sora">
                    Remember me
                  </span>
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary/80 font-sora">
                  Forgot password?
                </a>
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
                {isLoading ? 'Signing In...' : 'Sign In'}
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
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={goToSignup}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}