import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Registerpj } from "./pages/Registerpj"; 
import { Home_app } from "./pages/Home_app";
import { Marketplace } from "./pages/Marketplace";
import { ContractDetails } from "./pages/ContractDetails";
import { Contracts } from "./pages/Contracts";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Notifications } from "./pages/Notifications";
import { Simulation } from "./pages/Simulation";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="size-full bg-white max-w-md mx-auto relative">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerpj" element={<Registerpj />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home_app /> {/* <-- Agora usa a tela correta */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <ProtectedRoute>
                <Simulation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contract/:id"
            element={
              <ProtectedRoute>
                <ContractDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contracts"
            element={
              <ProtectedRoute>
                <Contracts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster position="top-center" richColors />
      </div>
    </BrowserRouter>
  );
}
