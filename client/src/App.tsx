import axios from "axios";
import { useEffect, useState } from "react";
import { useCallback } from "react";

interface ApiResponse {
  message: string;
}

interface User {
  _id: string;
  email: string;
}

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [userMessage, setUserMessage] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(`${API_BASE}/getData`);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData(null);
      setError("Failed to fetch data. Please try again.");
    }
  };

  

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get<User[]>(`${API_BASE}/users`);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, [API_BASE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/addUser`, {
        email,
        password,
      });
      setUserMessage(response.data.message || "User created!");
      setEmail("");
      setPassword("");
      fetchUsers(); // Refresh user list
    } catch (err: unknown) {
      console.error("Error adding user:", err);
      setUserMessage("Failed to add user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex flex-col items-center justify-center p-10 w-screen min-h-screen bg-gray-50">
      <div className="p-6 w-full max-w-xl bg-white shadow-md rounded-xl space-y-6">
        <h1 className="text-2xl font-bold text-center">TuonTaBai - Test Page</h1>

        <button
          onClick={fetchData}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Fetch Data from Backend
        </button>

        {data && <p className="text-green-600">{data.message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">Add New User</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add User
          </button>
          {userMessage && <p className="text-sm text-center">{userMessage}</p>}
        </form>

        <div>
          <h3 className="text-lg font-semibold mt-4">All Users</h3>
          <ul className="list-disc list-inside">
            {users.map((user) => (
              <li key={user._id}>{user.email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
