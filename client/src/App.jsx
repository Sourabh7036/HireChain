import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CandidateForm from './components/CandidateForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* 🔓 Public Route */}
            <Route path="/login" element={<Login />} />

            {/* 👮 Protected Route for Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Optional: fallback route or default redirect */}
             <Route path="/login" element={<Login />} />
             <Route path="/candidate" element={<CandidateForm />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
