import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Routguard from './components/routguard/Routguard';
import CreateContact from './components/pages/CreateContact';
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Routguard>
              <Dashboard />
            </Routguard>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateContact/>} />
      </Routes>
    </div>
  );
}

export default App
