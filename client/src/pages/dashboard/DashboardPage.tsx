import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
      <button 
        onClick={handleLogout}
        className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-semibold"
      >
        Logout
      </button>
    </div>
  );
};