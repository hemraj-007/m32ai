//import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Courses from './pages/Courses';
import CoursePage from './pages/CoursePage';
import { Toaster } from 'react-hot-toast';
import WelcomePage from './pages/WelcomePage';

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: '',
          style: {
            background: '#333',
            color: '#fff',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '16px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<WelcomePage />} /> {/* 👈 Set WelcomePage */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CoursePage />} />
      </Routes>
    </>
  );
};

export default App
