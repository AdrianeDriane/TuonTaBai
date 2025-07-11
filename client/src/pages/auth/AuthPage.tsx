import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  // Handle Google OAuth callback
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const error = query.get("error");

    if (token) {
      setAccessToken(token);
      setMessage("Login successful via Google!");
      navigate("/dashboard");
    } else if (error) {
      setError(decodeURIComponent(error));
    }
  }, [location, navigate, setAccessToken]);

  const handleRegister = async () => {
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${API_BASE}/auth/register`, 
        { email, password },
        { withCredentials: true }
      );
      setAccessToken(res.data.accessToken);
      setMessage("Registration successful!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  const handleLogin = async () => {
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${API_BASE}/auth/login`, 
        { email, password },
        { withCredentials: true }
      );
      setAccessToken(res.data.accessToken);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Login failed.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
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