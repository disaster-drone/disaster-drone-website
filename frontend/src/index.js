import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import FileClaimsPage from './pages/FileClaimsPage';
import Layout from './components/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Homepage />} />
          <Route index element={<Homepage />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="AboutPage" element={<AboutPage />} />
          <Route path="FileClaimsPage" element={<FileClaimsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
