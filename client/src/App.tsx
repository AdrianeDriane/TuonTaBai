import { LandingPage } from "./pages/landing/LandingPage"
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage"
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      <Route path="/login/success" element={<AuthPage />} />
    </Routes>
  )
}

export default App