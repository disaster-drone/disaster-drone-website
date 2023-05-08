import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from 'react-router-dom'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf'
import {useState} from 'react'


import Homepage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import FileClaimsPage from './pages/FileClaimsPage'
import LoginPage from './features/auth/LoginPage'
import Teampage from './pages/Teampage'
import Layout from './components/Layout'
import DashLayout from './components/DashLayout'
import UsersList from './features/users/UsersList'
import ClaimsList from './features/claims/ClaimsList'
import SettingsPage from './pages/SettingsPage'
import DocumentPage from './pages/DocumentPage'
import GalleryPage from './pages/GalleryPage'



function App() {

  const [currentCase, setCurrentCase] = useState({})

  return (

      <Routes>
        <Route path='/' element={<Layout />}> {/* This is layout before you login */}
          <Route index element={<LoginPage />} />

          <Route path="dash" element={<DashLayout />}> {/* This is layout after you login */}

            <Route index element={<Homepage />} />
            <Route path="Homepage" element={<Homepage />} />
            <Route path="AboutPage" element={<AboutPage />} />
            <Route path="FileClaimsPage" element={<FileClaimsPage setCurrentCase={setCurrentCase}/>} />
            <Route path="SettingsPage" element={<SettingsPage />} />
            <Route path="DocumentPage" element={<DocumentPage currentCase={currentCase}/>} />
            <Route path="GalleryPage" element={<GalleryPage currentCase={currentCase}/>} />
            <Route path="Teampage" element={<Teampage />} />

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
