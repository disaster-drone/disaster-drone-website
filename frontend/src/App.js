import { Routes, Route } from 'react-router-dom';


import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import FileClaimsPage from './pages/FileClaimsPage';
import ClosedClaimsPage from './pages/ClosedClaimsPage';
import LoginPage from './pages/LoginPage';
import Login from './features/auth/Login';
import Layout from './components/Layout';
import DashLayout from './components/DashLayout';



function App() {
  return (

      <Routes>
        <Route path='/' element={<Layout />}> {/* This is layout before you login */}
          <Route path="LoginPage" element={<LoginPage />} />
        </Route>

        <Route path="dash" element={<DashLayout />}> {/* This is layout after you login */}
          <Route index element={<Homepage />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="AboutPage" element={<AboutPage />} />
          <Route path="FileClaimsPage" element={<FileClaimsPage />} />
          <Route path="ClosedClaimsPage" element={<ClosedClaimsPage />} />
        </Route>

      </Routes>
  );
}

export default App;
