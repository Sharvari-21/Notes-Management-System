import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import NotesListPage from './pages/NotesListPage';
import CreateNotePage from './pages/CreateNotePage';
import EditNotePage from './pages/EditNotePage';
import NoteDetailPage from './pages/NoteDetailPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen relative z-10">
          <Navbar />

          <main className="flex-1">
            <Routes>

              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <NotesListPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateNotePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditNotePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/note/:id"
                element={
                  <ProtectedRoute>
                    <NoteDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="page-container flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <h1 className="text-6xl font-display text-amber-400 mb-4">
                      404
                    </h1>
                    <p className="text-stone-400 text-lg">
                      This page doesn't exist.
                    </p>
                  </div>
                }
              />

            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}