import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<AuthPage />} />
    <Route path="/signup" element={<AuthPage />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
