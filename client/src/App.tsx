import { LandingPage } from "./pages/landing/LandingPage"
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      <Route path="/login/success" element={<LoginPage />} />
    </Routes>
  )
}

export default App