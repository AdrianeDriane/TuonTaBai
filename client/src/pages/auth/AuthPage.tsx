import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import type { AxiosError } from "axios";
import { getFingerprint } from "../../utils/getFingerprint";
import { useAuth } from "../../hooks/useAuth"; // Add this import

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  // Handle Google OAuth callback
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const error = query.get("error");

    if (token) {
      setToken(token);
      setMessage("Login successful via Google!");
      navigate("/dashboard", { replace: true });
    } else if (error) {
      if (error === "fingerprint_error") {
        setError("Authentication failed. Please try again.");
      } else {
        setError(decodeURIComponent(error));
      }
    }
  }, [location, navigate, setToken]); 

  const handleRegister = async () => {
    try {
      const fingerprint = await getFingerprint();
      const res = await axios.post(`${API_BASE}/auth/register`, { email, password, fingerprint });
      
      setToken(res.data.token);
      setMessage("Registration successful!");
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleLogin = async () => {
    try {
      const fingerprint = await getFingerprint();
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password, fingerprint });
      
      setToken(res.data.token);
      setMessage("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Login failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const fingerprint = await getFingerprint();
      window.location.href = `${API_BASE}/auth/google?fp=${fingerprint}`;
    } catch (err) {
      console.error("Error getting fingerprint:", err);
      setError("Failed to initialize Google login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 p-6">
      <h1 className="text-2xl font-bold">Auth</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded w-64"
      />

      <div className="space-x-4">
        <button onClick={handleRegister} className="px-4 py-2 bg-green-500 text-white rounded">
          Register
        </button>
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
        <button onClick={handleGoogleLogin} className="px-4 py-2 bg-red-500 text-white rounded">
          Sign in with Google
        </button>
      </div>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  );
};