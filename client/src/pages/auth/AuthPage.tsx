import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Google Login Token Handler
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setMessage("Login successful!");
      navigate("/dashboard");
    }
  }, [location, navigate]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Registration successful!");
      navigate("/dashboard");
    } catch {
      setMessage("Registration failed.");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch {
      setMessage("Login failed.");
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

      {message && <p className="mt-4 text-black font-medium">{message}</p>}
    </div>
  );
};
