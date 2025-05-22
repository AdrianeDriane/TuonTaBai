import { LandingPage } from "./pages/landing/LandingPage"
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App