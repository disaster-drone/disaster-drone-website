import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from 'react-router-dom'


import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import FileClaimsPage from './pages/FileClaimsPage'
import LoginPage from './features/auth/LoginPage'
import Layout from './components/Layout'
import DashLayout from './components/DashLayout'
import UsersList from './features/users/UsersList'
import ClaimsList from './features/claims/ClaimsList'
import SettingsPage from './pages/SettingsPage'
import DocumentPage from './pages/DocumentPage'
import GalleryPage from './pages/GalleryPage';



function App() {
  return (

      <Routes>
        <Route path='/' element={<Layout />}> {/* This is layout before you login */}
          <Route index element={<LoginPage />} />

          <Route path="dash" element={<DashLayout />}> {/* This is layout after you login */}

            <Route index element={<Homepage />} />
            <Route path="Homepage" element={<Homepage />} />
            <Route path="AboutPage" element={<AboutPage />} />
            <Route path="FileClaimsPage" element={<FileClaimsPage />} />
            <Route path="SettingsPage" element={<SettingsPage />} />
            <Route path="DocumentPage" element={<DocumentPage />} />
            <Route path="GalleryPage" element={<GalleryPage/>} />

            <Route path="users">
              <Route index element={<UsersList />} />
            </Route>

            <Route path="claims">
              <Route index element={<ClaimsList />} />
            </Route>


            
          </Route> {/* End Dash */}

        </Route> {/* End Layout */}

      </Routes>
  );
}

export default App;
