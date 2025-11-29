import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DonationProvider } from './context/DonationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import RecipientDashboard from './pages/RecipientDashboard';
import LogisticsDashboard from './pages/LogisticsDashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <DonationProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['Admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/donor"
                  element={
                    <ProtectedRoute allowedRoles={['Donor']}>
                      <DonorDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/recipient"
                  element={
                    <ProtectedRoute allowedRoles={['Recipient']}>
                      <RecipientDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/logistics"
                  element={
                    <ProtectedRoute allowedRoles={['Logistics']}>
                      <LogisticsDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Notification />
          </div>
        </BrowserRouter>
      </DonationProvider>
    </AuthProvider>
  );
}

export default App;
